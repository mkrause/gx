package gx.browserchannel;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import gx.browserchannel.message.*;
import gx.browserchannel.util.ConnectionFactory;
import gx.browserchannel.util.URLQueryBuilder;
import gx.browserchannel.util.URLWithQuery;
import gx.realtime.custom.SaveRevisionResponse;
import gx.util.RandomUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * A Java port of the JavaScript implementation of BrowserChannel.
 */
public class BrowserChannel
{
    private static Logger logger = LogManager.getLogger(BrowserChannel.class);
    int retries = 1;
    private int channelVersion = 8;
    private String baseUrl;
    private String path;
    private String clientVersion = "1";
    private int nextRid;
    private boolean useChunked = true;
    private LinkedBlockingQueue<SaveMessage> outgoingMessages;
    // Non-JS-BrowserChannel compliant parameters
    private long lastSequenceTimestamp = -1L;
    private long lastSequenceNumber = 0L;
    private String channelSessionId;
    private JsonFactory jfactory = new JsonFactory();
    private List<MessageHandler> handlers = new ArrayList<>();
    private Map<String, String> extraParams = new HashMap<>();
    /**
     * Thread to handle client-server communication
     */
    private ForwardChannelThread forwardChannel;
    /**
     * Thread to handle server-client communication
     */
    private Thread backwardChannel;
    private boolean pendingClosed = true;

    /**
     * Current revision number, used to properly send save messages.
     */
    private int revision = -1;

    /**
     * Constructor of the BrowserChannel object
     *
     * @param currentRevision current revision
     */
    public BrowserChannel(int currentRevision)
    {
        outgoingMessages = new LinkedBlockingQueue<>();
        nextRid = (int) Math.floor(Math.random() * 100000);
        revision = currentRevision;
        logger.info("Initialized");
    }

    protected SaveRevisionResponse send(SaveMessage message)
    {
        // Set the current revision number
        message.setRequestNumber(revision);

        ObjectMapper mapper = new ObjectMapper();
        String msg;
        try {
            logger.debug("Sending message {}", message);
            msg = mapper.writeValueAsString(message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }

        logger.debug("Sending forward message");

        try {
            URLQueryBuilder queryBuilder = new URLQueryBuilder();
            queryBuilder.putAll(extraParams);

            URLWithQuery url = new URLWithQuery(baseUrl + "/save", queryBuilder);
            logger.debug("Url: {}", url.getURL().toString());
            logger.debug("Msg: {}", msg);

            Reader in = ConnectionFactory.createJsonReader(url, msg);

            // Parse response
            JsonParser jParser = jfactory.createParser(in);
            jParser.setCodec(mapper);
            SaveRevisionResponse response = jParser.readValueAs(SaveRevisionResponse.class);
            logger.debug("Received revision response: {}", response.getRevision());

            in.close();

            // Return the new revision
            return response;
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public void openForwardChannel()
    {
        logger.info("Forward Channel (POST)");

        URLWithQuery url;

        try {
            URLQueryBuilder queryBuilder = getDefaultQueryBuilder();
            queryBuilder.put("CVER", clientVersion).put("zx", RandomUtils.getRandomHexAlphaNumeric());

            url = new URLWithQuery(baseUrl + path, queryBuilder);

            logger.debug("Sent request, reading input");
            Reader in = ConnectionFactory.createJsonReader(url, "");

            // Parse response
            JsonParser jParser = jfactory.createParser(in);
            ObjectMapper mapper = new ObjectMapper();
            jParser.setCodec(mapper);
            Message[] messages = jParser.readValueAs(Message[].class);

            // Process messages
            for (Message m : messages) {
                if (m instanceof SessionMessage) {
                    channelSessionId = ((SessionMessage) m).getId();
                    logger.debug("Received channelSessionId {}", channelSessionId);
                } else {
                    logger.debug("Received event {}", m);
                    // Pass message to handlers
                    fireEvent(new MessageEvent(this, m));
                }
                lastSequenceNumber = Math.max(lastSequenceNumber, m.getLastArrayId());
            }
            in.close();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        logger.debug("channelSessionId: {}", channelSessionId);
        logger.debug("lastSequenceNumber: {}", lastSequenceNumber);
    }

    /**
     * Custom method to try opening a backward channel
     */
    private void openBackwardChannel()
    {
        logger.info("openBackwardChannel (GET)");
        URLQueryBuilder params = getDefaultQueryBuilder();
        params.put("SID", channelSessionId).put("AID", lastSequenceNumber)
                .put("CI", useChunked ? 1 : 0).put("TYPE", "xmlhttp")
                .put("zx", RandomUtils.getRandomHexAlphaNumeric()).put("RID", "rpc");

        URLWithQuery u2;
        try {
            u2 = new URLWithQuery(baseUrl + path, params.build());
        } catch (MalformedURLException e) {
            logger.error("MalformedURLException: " + e.getMessage());
            e.printStackTrace();
            return;
        }

        try {
            NormalizedJsonReader in = ConnectionFactory.createJsonReader(u2, true);

            logger.debug("Getting NOOP every 30 seconds from Google, connection is reset after 1 minute");
            while (in.nextChunk()) {
                Message[] messages = parseMessageChunk(in);
                for (Message m : messages) {
                    lastSequenceNumber = Math.max(lastSequenceNumber, m.getLastArrayId());
                    lastSequenceTimestamp = Math.max(lastSequenceTimestamp, m.getTimestamp());
                    if (!(m instanceof NoopMessage)) {
                        // Pass message to handlers
                        fireEvent(new MessageEvent(this, m));
                    }
                }
            }
            in.close();
        } catch (IOException e) {
            logger.error("IOException: " + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * Parses a JSON chunk received by the backward channel into a list of Messages.
     * @param in
     * @return
     * @throws IOException
     */
    private Message[] parseMessageChunk(NormalizedJsonReader in) throws IOException
    {
        JsonParser jParser = jfactory.createParser(in);
        ObjectMapper mapper = new ObjectMapper();
        jParser.setCodec(mapper);

        return jParser.readValueAs(Message[].class);
    }

    private void ensureBackwardChannel()
    {
        if (backwardChannel == null) {
            backwardChannel = new Thread()
            {
                public void run()
                {
                    while (!pendingClosed) openBackwardChannel();
                }
            };
        }

        if (!pendingClosed || backwardChannel.isAlive())
            return;

        pendingClosed = false;
        backwardChannel.start();
    }

    private void ensureForwardChannel()
    {
        if (forwardChannel == null) {
            forwardChannel = new ForwardChannelThread(this, outgoingMessages);
        }

        if (forwardChannel.isAlive())
            return;

        forwardChannel.start();
    }

    public void connect(String baseUrl)
    {
        this.baseUrl = baseUrl;
        logger.info("connect()");

        this.path = "/bind";

        // Test the connection quality, does not actually seem to do anything else
        connectTest("/test");
        openForwardChannel();
        ensureBackwardChannel();
        ensureForwardChannel();
    }

    public void connectTest(String testPath)
    {
        try {
            logger.info("Get Host Prefixes");
            URLQueryBuilder queryBuilder = getDefaultQueryBuilder()
                    .put("MODE", "init")
                    .put("zx", RandomUtils.getRandomHexAlphaNumeric());

            URL url = new URLWithQuery(baseUrl + testPath, queryBuilder).getURL();
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null)
                logger.debug(line);
            reader.close();

            // TODO: decode / store optional host prefixes

            logger.info("Buffering Proxy Test");
            queryBuilder = getDefaultQueryBuilder()
                    .put("TYPE", "xmlhttp")
                    .put("zx", RandomUtils.getRandomHexAlphaNumeric());

            url = new URLWithQuery(baseUrl + testPath, queryBuilder).getURL();
            connection = (HttpURLConnection) url.openConnection();
            reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            while ((line = reader.readLine()) != null)
                logger.debug(line);
            reader.close();

            // TODO: set useChunk from the testConnection

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void prepareClose()
    {
        pendingClosed = true;
    }

    public void disconnect()
    {
        logger.info("Disconnect");
        prepareClose();

        // Send disconnect request to server
        try {
            URLQueryBuilder queryBuilder = getDefaultQueryBuilder()
                    .put("TYPE", "terminate")
                    .put("SID", channelSessionId)
                    .put("zx", RandomUtils.getRandomHexAlphaNumeric());

            URL url = new URLWithQuery(baseUrl + path, queryBuilder).getURL();
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.getInputStream().close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        waitForClosed();
    }

    public void addMessageHandler(MessageHandler handler)
    {
        handlers.add(handler);
    }

    public void removeMessageHandler(MessageHandler handler)
    {
        handlers.remove(handler);
    }

    private void fireEvent(MessageEvent event)
    {
        // TODO: fire in separate thread?
        for (MessageHandler handler : handlers)
            handler.receive(event);
    }

    public boolean isClosed()
    {
        return !backwardChannel.isAlive();
    }

    public void waitForClosed()
    {
        while (!isClosed()) ;
    }

    public void addExtraParameter(String key, String value)
    {
        extraParams.put(key, value);
    }

    public void removeExtraParameter(String key)
    {
        extraParams.remove(key);
    }

    /**
     * Returns an URLQueryBuilder containing the default parameters for this BrowserChannel
     *
     * @return
     */
    public URLQueryBuilder getDefaultQueryBuilder()
    {
        return new URLQueryBuilder()
                .putAll(extraParams)
                .put("VER", Integer.toString(channelVersion))
                .put("lsq", Long.toString(lastSequenceTimestamp))
                .put("RID", Integer.toString(nextRid++))
                .put("t", "" + retries);
    }

    public void queue(SaveMessage message)
    {
        outgoingMessages.add(message);
    }

    public void processResponse(SaveRevisionResponse response)
    {
        logger.error("Received new revision number: {}", response.getRevision());
        revision = response.getRevision();
    }
}
