package channel.browser;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.json.JsonFactory;

import channel.Channel;
import channel.Message;
import channel.MessageHandler;
import channel.browser.util.URLWithQuery;

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
    
    public BrowserChannel(Credential credentials)
    {
        this.credentials = credentials;
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
        // TODO Auto-generated method stub
        
    }

    @Override
    public void disconnect()
    {
        // TODO Auto-generated method stub
        
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
}
