package channel.browser;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.json.JsonFactory;

import channel.Channel;
import channel.Message;
import channel.MessageHandler;
import channel.browser.util.URLWithQuery;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * A Java port of the JavaScript implementation of BrowserChannel.
 * TODO: implement functions in quickstart/js/browserchannel.js
 * 
 * @author Erik
 */
public class BrowserChannel implements Channel
{
    private Credential credentials;
    private int channelVersion = 8;
    private String baseUrl = "https://drive.google.com/otservice";
    private String modelId;
    private Session session;
    private static Logger logger = LogManager.getLogger(BrowserChannel.class);
    private String path;
    private String clientVersion;
    private URLWithQuery forwardChannelUri;
    private State state;
    private ChannelRequest forwardChannelRequest;
    private int nextRid;
    private int lastArrayId;
    private List<? extends Queue<String>> outgoingMaps;

    public BrowserChannel(Credential credentials)
    {
        this.credentials = credentials;
        outgoingMaps = new LinkedList<LinkedList<String>>();
    }
    
    @Override
    public void initialize(String driveFileId)
    {
        this.modelId = getModelId(driveFileId);
        this.session = getSession();
        System.out.println("SessionID: " + session.getId());
        System.out.println("Initialized");
    }
    
    @Override
    public void connect()
    {
        logger.info("connect()");

        this.path = "/bind";

        //path = channelPath;
        //this.extraParams = extraParams

        // Test the connection quality, does not actually seem to do anything else
        connectTest("/test");
    }

    /**
     * Establishes a new channel session with the the server.
     * @private
     */
    private void open() {
        nextRid = (int) Math.floor(Math.random() * 100000);

        int rid = nextRid++;

        ChannelRequest request = createChannelRequest(this, "", rid);
//        request.setExtraHeaders(this.extraHeaders);
        String requestText = this.dequeueOutgoingMaps();
        URLWithQuery uri = this.forwardChannelUri.clone();
        uri.setParameterValue("RID", Integer.toString(rid));
        if(this.clientVersion != null) {
            uri.setParameterValue("CVER", this.clientVersion);
        }

        request.xmlHttpPost(uri, requestText);
        this.forwardChannelRequest = request;
    }

    private ChannelRequest createChannelRequest(BrowserChannel browserChannel, String sessionId, int rid) {
        return new ChannelRequest(browserChannel, sessionId, rid, 0);
    }

    public void connectTest(String testPath) {
        // Check if the handler says it"s ok to make a request
        //handler.okToMakeRequest()
    }

    public void connectChannel() {
        this.forwardChannelUri = getForwardChannelUri(path);
        ensureForwardChannel();
    }

    private void ensureForwardChannel()
    {
        if(this.forwardChannelRequest != null) {
            // connection in process - no need to start a new request
            return;
        }

        startForwardChannel();
    }

    private void startForwardChannel()
    {
        logger.info("startForwardChannel");

        if(!okToMakeRequest()) {
            return;
        } else if(state == State.INIT) {
            open();
            state = State.OPENING;
        } else if (this.state == State.OPENED) {
            if(outgoingMaps.size() == 0) {
                logger.debug("startForwardChannel returned: nothing to send");

                return;
            }

            if(forwardChannelRequest != null) {
                logger.info("startForwardChannel returned: connection already in progress");
            }

            makeForwardChannelRequest();
            logger.debug("startForwardChannel finished, sent request");
        }
    }

    private void makeForwardChannelRequest()
    {
        int rid;
        String requestText;

        rid = this.nextRid++;
        requestText = dequeueOutgoingMaps();

        URLWithQuery uri = forwardChannelUri.clone();

        uri.setParameterValue("SID", this.session.getId());
        uri.setParameterValue("RID", Integer.toString(rid));
        uri.setParameterValue("AID", Integer.toString(this.lastArrayId));
        //addAdditionalParams(uri);

        ChannelRequest request = createChannelRequest(this, session.getId(), rid);

        //request.setExtraHeaders(this.extraHeaders);

        request.xmlHttpPost(uri, requestText);
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

    @Override
    public void disconnect()
    {
        logger.info("disconnect()");

        // TODO: Cancel outstanding requests
    }

    @Override
    public void send(Message message)
    {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void addMessageHandler(MessageHandler handler)
    {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void removeMessageHandler(MessageHandler handler)
    {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void isClosed()
    {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void getState()
    {
        // TODO Auto-generated method stub

    }
    
    private String getModelId(String driveFileId)
    {
        JsonFactory jsonFactory = credentials.getJsonFactory();
        if(jsonFactory == null)
            return null;
        
        // Set up parameters
        Map<String, String> parameters = new HashMap<String, String>();
        parameters.put("id", driveFileId);
        parameters.put("access_token", credentials.getAccessToken());
        
        try
        {
            // Create connection
            URLWithQuery urlq = new URLWithQuery(new URL(baseUrl + "/modelid"), parameters);
            HttpURLConnection connection = (HttpURLConnection) urlq.getURL().openConnection();
            InputStream in = new SkipGarbageInputStream(connection.getInputStream());
    
            // Parse response
            Model mid = jsonFactory.fromInputStream(in, Model.class);
            in.close();
            return mid.getId();
        }
        catch (IOException e)
        {
            return null;
        }
    }
    
    private Session getSession()
    {
        JsonFactory jsonFactory = credentials.getJsonFactory();
        if(jsonFactory == null || modelId == null)
            return null;
        
        // Set up parameters
        Map<String, String> parameters = new HashMap<String, String>();
        parameters.put("id", modelId);
        parameters.put("access_token", credentials.getAccessToken());
        
        try
        {
            // Create connection
            URLWithQuery urlq = new URLWithQuery(new URL(baseUrl + "/gs"), parameters);
            HttpURLConnection connection = (HttpURLConnection) urlq.getURL().openConnection();
            InputStream in = new SkipGarbageInputStream(connection.getInputStream());
    
            // Parse response
            Session session = jsonFactory.fromInputStream(in, Session.class);
            in.close();
            return session;
        }
        catch (IOException e)
        {
            return null;
        }        
    }
    
    private void getHostPrefixes()
    {
//        // Test channel
//        System.out.println("Get Host Prefixes");
//        int version = 8;
//        String mode = "init";
//        long lastSequenceNumber = -1;
//        String random = "5z7qn2t4bnz7";
//        int retries = 1;
//        url = new URL(baseURL + "/test?id=" + modelId + "&access_token=" + accessToken + "&sid=" + sessionId + "&VER=" + version + "&lsq=" + lastSequenceNumber + "&MODE=" + mode + "&zx=" + random + "&t=" + retries);
//        connection = (HttpURLConnection) url.openConnection();
//        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
//        String line;
//        while((line = reader.readLine()) != null)
//            System.out.println(line);
//        reader.close();
    }
    
    private void bufferingProxyTest()
    {
//        // Test chunking channel
//        System.out.println("Buffering Proxy Test (11111: first chunk, 2: second chunk)");
//        String type = "xmlhttp";
//        random = "0h7we2q4bnv9";
//        url = new URL(baseURL + "/test?id=" + modelId + "&access_token=" + accessToken + "&sid=" + sessionId + "&VER=" + version + "&lsq=" + lastSequenceNumber + "&TYPE=" + type + "&zx=" + random + "&t=" + retries);
//        connection = (HttpURLConnection) url.openConnection();
//        InputStreamReader stream = new InputStreamReader(connection.getInputStream());
//        int character;
//        while((character = stream.read()) != -1)
//            System.out.print(String.valueOf((char)character));
//        System.out.println();
    }
    
    private void delta()
    {
//        // Delta channel
//        System.out.println("Channel delta");
//        int startRevision = revision + 1;
//        url = new URL(baseURL + "/delta?id=" + modelId + "&access_token=" + accessToken + "&sid=" + sessionId + "&startRev=" + startRevision);
//        connection = (HttpURLConnection) url.openConnection();
//        reader = new BufferedReader(new InputStreamReader(new SkipGarbageInputStream(connection.getInputStream())));
//        while((line = reader.readLine()) != null)
//            System.out.println(line);
//        reader.close();
    }

    /**
     * Gets the Uri used for the connection that sends data to the server.
     * @return {goog.Uri} The forward channel URI.
     */
    public URLWithQuery getForwardChannelUri(String path)
    {
        return createDataUri(null, path);
    }

    /**
     * Creates a data Uri applying logic for secondary hostprefix, port
     * overrides, and versioning.
     * @return {goog.Uri} The data URI.
     */
    private URLWithQuery createDataUri(String hostPrefix, String path) {
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
            urlq = new URLWithQuery(new URL(baseUrl + path), parameters);
        } catch (MalformedURLException e) {
            logger.error("createDataUri: MalformedURLException");
            e.printStackTrace();
        }

        return urlq;
    }
}
