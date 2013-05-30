package gx.browserchannel;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import gx.browserchannel.message.*;
import gx.browserchannel.util.ConnectionFactory;
import gx.util.RandomUtils;
import gx.browserchannel.util.URLQueryBuilder;
import gx.browserchannel.util.URLWithQuery;
import gx.realtime.custom.SaveRevisionResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;

/**
 * A Java port of the JavaScript implementation of BrowserChannel.
 * TODO: implement functions in quickstart/js/gx.browserchannel.js
 *
 * @author Erik
 */
public class BrowserChannel
{
    private static Logger logger = LogManager.getLogger(BrowserChannel.class);
    int retries = 1;
    private int channelVersion = 8;
    private String baseUrl;
    private String path;
    private String clientVersion = "1";
    private URLWithQuery forwardChannelUri;
    private State state = State.INIT;
    private ChannelRequest forwardChannelRequest;
    private int nextRid;
    private int lastArrayId;
    private boolean useChunked;
    private List<? extends Queue<String>> outgoingMaps;
    // Non-JS-BrowserChannel compliant parameters
    private long lastSequenceTimestamp = -1L;
    private long lastSequenceNumber = 0L;
    private String channelSessionId;
    private JsonFactory jfactory = new JsonFactory();
    private List<MessageHandler> handlers = new ArrayList<MessageHandler>();
    private Map<String, String> extraParams = new HashMap<String, String>();
    private Thread backwardChannel;
    private HttpURLConnection backwardChannelConnection;
    private boolean isClosed = true;

    public BrowserChannel()
    {
        outgoingMaps = new LinkedList<LinkedList<String>>();
        nextRid = (int) Math.floor(Math.random() * 100000);
        logger.info("Initialized");
    }

    public URLQueryBuilder getDefaultParamBuilder()
    {
        URLQueryBuilder q = new URLQueryBuilder()
                .put("VER", Integer.toString(channelVersion))
                .put("lsq", Long.toString(lastSequenceNumber))
                .put("RID", Integer.toString(nextRid++))
                .put("t", "" + retries);
        q.putAll(extraParams);

        return q;
    }

    public SaveRevisionResponse sendMessage(SaveMessage message)
    {
        HttpURLConnection connection;
        URLWithQuery url;

        ObjectMapper mapper = new ObjectMapper();
        String msg;
        try {
            msg = mapper.writeValueAsString(message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }

        logger.debug("Sending forward message");

        try {
            URLQueryBuilder queryBuilder = new URLQueryBuilder();
            queryBuilder.putAll(extraParams);

            url = new URLWithQuery(baseUrl + "/save", queryBuilder);
            logger.debug("Url: {}", url.getURL().toString());
            logger.debug("Msg: {}", msg);

            connection = ConnectionFactory.createConnection(url, "POST");
            byte[] binaryMsg = msg.getBytes("UTF-8");
            connection.setRequestProperty("Content-Length", String.valueOf(binaryMsg.length));
            connection.getOutputStream().write(binaryMsg);

            Reader in = new NormalizedJsonReader(connection.getInputStream());

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

        HttpURLConnection connection;
        URLWithQuery url;

        try {
            URLQueryBuilder queryBuilder = getDefaultQueryBuilder();
            queryBuilder.put("CVER", clientVersion).put("zx", RandomUtils.getRandomHexAlphaNumeric());

            url = new URLWithQuery(baseUrl + path, queryBuilder);

            connection = ConnectionFactory.createConnection(url, "POST");
            connection.setRequestProperty("Content-Length", "0");
            connection.getOutputStream().write(new byte[0]);

            logger.debug("Sent request, reading input");
            Reader in = new NormalizedJsonReader(connection.getInputStream());

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
                lastSequenceNumber = m.getLastArrayId();
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

        URL url;
        try {
            url = new URLWithQuery(baseUrl + path, params.build()).getURL();
        } catch (MalformedURLException e) {
            logger.error("MalformedURLException: " + e.getMessage());
            e.printStackTrace();
            return;
        }

        try {
            backwardChannelConnection = (HttpURLConnection) url.openConnection();
            NormalizedJsonReader in = new NormalizedJsonReader(backwardChannelConnection.getInputStream(), true);

            logger.debug(url);
            logger.debug("Getting NOOP every 30 seconds from Google, connection is reset after 1 minute");
            while (!isClosed && in.nextChunk()) {
                JsonParser jParser = jfactory.createParser(in);
                ObjectMapper mapper = new ObjectMapper();
                jParser.setCodec(mapper);

                Message[] messages = jParser.readValueAs(Message[].class);
                for (Message m : messages) {
                    lastSequenceNumber = Math.max(lastSequenceNumber, m.getLastArrayId());
                    lastSequenceTimestamp = Math.max(lastSequenceTimestamp, m.getTimestamp());
                    if (m instanceof NoopMessage) {
                        logger.debug("NOOP");
                    } else {
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

    private void ensureBackwardChannel()
    {
        if(backwardChannel == null)
            backwardChannel = new Thread()
            {
                public void run() {
                    while(!isClosed) openBackwardChannel();
                }
            };

        if(!isClosed || backwardChannel.isAlive())
            return;

        isClosed = false;
        backwardChannel.start();
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

    private String dequeueOutgoingMaps()
    {
        // TODO: implement dequeueing
        return "";
    }

    private boolean okToMakeRequest()
    {
        return true;
    }

    public void disconnect()
    {
        logger.info("disconnect()");

        // TODO: send disconnect request

        isClosed = true;
        if(backwardChannelConnection != null)
            backwardChannelConnection.disconnect();

        waitForClosed();
    }

    public void send(Message message)
    {
        // TODO Auto-generated method stub
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
        return !backwardChannel.isAlive() && isClosed;
    }

    public void waitForClosed()
    {
        while(!isClosed());
    }

    public State getState()
    {
        return state;
    }

    /**
     * Gets the Uri used for the connection that sends data to the server.
     *
     * @return {goog.Uri} The forward channel URI.
     */
    public URLWithQuery getForwardChannelUri(String path)
    {
        return createDataUri(null, path);
    }

    /**
     * Creates a data Uri applying logic for secondary hostprefix, port
     * overrides, and versioning.
     *
     * @return {goog.Uri} The data URI.
     */
    private URLWithQuery createDataUri(String hostPrefix, String path)
    {
        String hostName;
        if (hostPrefix != null) {
            hostName = hostPrefix + "." + baseUrl;
        } else {
            hostName = baseUrl;
        }

        // Set up parameters
        Map<String, String> parameters = new HashMap<String, String>();

        // Add the protocol version to the URI.
        parameters.put("VER", Integer.toString(this.channelVersion));

        // Add the reconnect parameters.
        // TODO: track additional parameters for reconnecting purposes, if necessary
        // this.addAdditionalParams_(uri);

        URLWithQuery urlq = null;
        try {
            urlq = new URLWithQuery(new URL(hostName + path), parameters);
        } catch (MalformedURLException e) {
            logger.error("createDataUri: MalformedURLException");
            e.printStackTrace();
        }

        return urlq;
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
}
