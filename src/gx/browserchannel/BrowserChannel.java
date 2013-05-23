package gx.browserchannel;

import gx.browserchannel.message.*;
import gx.browserchannel.util.URLQueryBuilder;
import gx.browserchannel.util.URLWithQuery;

import gx.browserchannel.util.ConnectionFactory;
import gx.browserchannel.util.RandomUtils;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;

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
    private List<? extends Queue<String>> outgoingMaps;
    // Non-JS-BrowserChannel compliant parameters
    private long lastSequenceNumber = 0L;
    private String channelSessionId;
    private JsonFactory jfactory = new JsonFactory();
    private List<MessageHandler> handlers = new ArrayList<MessageHandler>();
    private Map<String, String> extraParams = new HashMap<String, String>();

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

    public void openForwardChannel()
    {
        logger.info("Forward Channel (POST)");

        HttpURLConnection connection;
        URLWithQuery url;

        try {
            URLQueryBuilder queryBuilder = getDefaultQueryBuilder();
            queryBuilder.put("CVER", clientVersion).put("zx", RandomUtils.getRandomString());

            url = new URLWithQuery(baseUrl + "/bind", queryBuilder);

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
            for(Message m : messages) {
                if(m instanceof SessionMessage) {
                    channelSessionId = ((SessionMessage)m).getId();
                } else {
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
    public void openBackwardChannel()
    {
        // TODO: retrieve this value from the testConnection
        int CI = 0; // are we chunked?

        logger.info("openBackwardChannel (GET)");
        // String urlParameters = "id=" + modelId + "&access_token=" + getAccessToken() + "&sid=" + session.getId() + "&VER=" + channelVersion + "&lsq=" + lastSequenceNumber + "&RID=" + RID + "&SID=" + channelSessionId + "&AID=" + AID + "&CI=" + CI + "&TYPE=" + type + "&zx=" + RandomUtils.getRandomString() + "&t=" + retries;
        URLQueryBuilder params = getDefaultQueryBuilder();
        params.put("SID", channelSessionId).put("AID", lastSequenceNumber)
                .put("CI", CI).put("TYPE", "xmlhttp")
                .put("zx", RandomUtils.getRandomString()).put("RID", "rpc");

        URL url;
        try {
            url = new URLWithQuery(baseUrl + "/bind", params.build()).getURL();
        } catch (MalformedURLException e) {
            logger.error("MalformedURLException: " + e.getMessage());
            e.printStackTrace();
            return;
        }

        try {
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            NormalizedJsonReader in = new NormalizedJsonReader(connection.getInputStream(), true);

            logger.debug("Getting NOOP every 30 seconds from Google, connection is reset after 1 minute");
            while(in.nextChunk()) {
                JsonParser jParser = jfactory.createParser(in);
                ObjectMapper mapper = new ObjectMapper();
                jParser.setCodec(mapper);

                Message[] messages = jParser.readValueAs(Message[].class);
                for(Message m : messages) {
                    if(m instanceof NoopMessage) {
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

    public void connect(String baseUrl)
    {
        this.baseUrl = baseUrl;
        logger.info("connect()");

        this.path = "/bind";

        // Test the connection quality, does not actually seem to do anything else
        connectTest("/test");
    }

    /**
     * Establishes a new channel session with the the server.
     *
     * @private
     */
    private void open()
    {
        int rid = nextRid++;

        ChannelRequest request = createChannelRequest(this, "", rid);
        String requestText = this.dequeueOutgoingMaps();
        URLWithQuery uri = this.forwardChannelUri.clone();
        uri.setParameterValue("RID", Integer.toString(rid));
        if (this.clientVersion != null) {
            uri.setParameterValue("CVER", this.clientVersion);
        }

        request.xmlHttpPost(uri, requestText);
        this.forwardChannelRequest = request;
    }

    private ChannelRequest createChannelRequest(BrowserChannel browserChannel, String sessionId, int rid)
    {
        return new ChannelRequest(browserChannel, sessionId, rid, 0);
    }

    public void connectTest(String testPath)
    {
        logger.info("Get Host Prefixes");
        String mode = "init";
        try {
            URLQueryBuilder queryBuilder = getDefaultQueryBuilder()
                .put("MODE", mode)
                .put("zx", RandomUtils.getRandomString());

            URL url = new URLWithQuery(baseUrl + testPath, queryBuilder).getURL();
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null)
                logger.debug(line);
            reader.close();
            // TODO: decode / store optional host prefixes
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

//    public void connectChannel()
//    {
//        this.forwardChannelUri = getForwardChannelUri(path);
//        ensureForwardChannel();
//    }
//
//    private void ensureForwardChannel()
//    {
//        if (this.forwardChannelRequest != null) {
//            // connection in process - no need to start a new request
//            return;
//        }
//
//        startForwardChannel();
//    }

//    private void startForwardChannel()
//    {
//        logger.info("startForwardChannel");
//
//        String RID = "66172";
//        int clientVersion = 1;
//        String random = "i9dw6xv4b81e";
//        byte[] rawData = new byte[0];
//        //String urlParameters = "id=" + modelId + "&access_token=" + getAccessToken() + "&sid=" + sessionInfo.getSessionId() + "&VER=" + channelVersion + "&lsq=" + lastSequenceNumber + "&RID=" + RID + "&CVER=" + clientVersion + "&zx=" + random + "&t=" + retries;
//        String urlParameters = "";
//        try {
//            URL url = new URL(baseUrl + "/bind?" + urlParameters);
//            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//            connection.setDoOutput(true);
//            connection.setDoInput(true);
//            connection.setInstanceFollowRedirects(false);
//            connection.setRequestMethod("POST");
//            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
//            connection.setRequestProperty("charset", "utf-8");
//            connection.setRequestProperty("Content-Length", "0");
//            connection.setUseCaches(false);
//            connection.getOutputStream().write(rawData);
//            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
//            StringBuffer response = new StringBuffer();
//            String line;
//            while ((line = reader.readLine()) != null)
//                response.append(line);
//            reader.close();
//            logger.debug("forwardChannel response: {}", response.toString());
//        } catch (MalformedURLException e) {
//            e.printStackTrace();
//        } catch (ProtocolException e) {
//            e.printStackTrace();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        // TODO: do something with the response?
//    }

//    private void makeForwardChannelRequest()
//    {
//        int rid;
//        String requestText;
//
//        rid = this.nextRid++;
//        requestText = dequeueOutgoingMaps();
//
//        URLWithQuery uri = forwardChannelUri.clone();
//
//        uri.setParameterValue("SID", sessionInfo.getSessionId());
//        uri.setParameterValue("RID", Integer.toString(rid));
//        uri.setParameterValue("AID", Integer.toString(this.lastArrayId));
//        //addAdditionalParams(uri);
//
//        ChannelRequest request = createChannelRequest(this, sessionInfo.getSessionId(), rid);
//
//        //request.setExtraHeaders(this.extraHeaders);
//
//        request.xmlHttpPost(uri, requestText);
//    }

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

        // TODO: Cancel outstanding requests
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
        for(MessageHandler handler : handlers)
            handler.receive(event);
    }

    public void isClosed()
    {
        // TODO Auto-generated method stub

    }

    public State getState()
    {
        return state;
    }

//    private void getHostPrefixes()
//    {
//        // Test channel
//        System.out.println("Get Host Prefixes");
//        int version = 8;
//        String mode = "init";
//        long lastSequenceNumber = -1;
//        String random = "5z7qn2t4bnz7";
//        int retries = 1;
//        url = new URL(baseURL + "/test?id=" + modelId + "&access_token=" + getAccessToken() + "&sid=" + sessionId + "&VER=" + version + "&lsq=" + lastSequenceNumber + "&MODE=" + mode + "&zx=" + random + "&t=" + retries);
//        connection = (HttpURLConnection) url.openConnection();
//        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
//        String line;
//        while((line = reader.readLine()) != null)
//            System.out.println(line);
//        reader.close();
//    }

//    private void bufferingProxyTest()
//    {
//        // Test chunking channel
//        System.out.println("Buffering Proxy Test (11111: first chunk, 2: second chunk)");
//        String type = "xmlhttp";
//        random = "0h7we2q4bnv9";
//        url = new URL(baseURL + "/test?id=" + modelId + "&access_token=" + getAccessToken() + "&sid=" + sessionId + "&VER=" + version + "&lsq=" + lastSequenceNumber + "&TYPE=" + type + "&zx=" + random + "&t=" + retries);
//        connection = (HttpURLConnection) url.openConnection();
//        InputStreamReader stream = new InputStreamReader(connection.getInputStream());
//        int character;
//        while((character = stream.read()) != -1)
//            System.out.print(String.valueOf((char)character));
//        System.out.println();
//    }

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
     * @return
     */
    public URLQueryBuilder getDefaultQueryBuilder()
    {
        return new URLQueryBuilder()
            .putAll(extraParams)
            .put("VER", Integer.toString(channelVersion))
            .put("lsq", Long.toString(lastSequenceNumber))
            .put("RID", Integer.toString(nextRid++))
            .put("t", "" + retries);
    }
}
