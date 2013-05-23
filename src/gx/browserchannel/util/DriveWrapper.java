package gx.browserchannel.util;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.CredentialStore;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.java6.auth.oauth2.FileCredentialStore;
import com.google.api.client.extensions.java6.auth.oauth2.VerificationCodeReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.extensions.java6.auth.oauth2.GooglePromptReceiver;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import gx.browserchannel.BrowserChannel;
import gx.browserchannel.NormalizedJsonReader;
import gx.browserchannel.util.URLWithQuery;
import gx.realtime.RealtimeMessageHandler;
import gx.realtime.Session;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class DriveWrapper {
    /**
     * Indicates whether to use the service account.
     */
    private static final boolean USE_SERVICE_ACCOUNT = false;
    /**
     * E-mail address of the service account.
     */
    private static final String SERVICE_ACCOUNT_EMAIL = "289978787145-qoafq30a0i1qou5eul1hvepc99jnglua@developer.gserviceaccount.com";
    /**
     * Private key of the service account.
     */
    private static final String PRIVATE_KEY_FILE = "key.p12";
    /**
     * Client secrets of installed app.
     */
    private static final String CLIENT_SECRETS_FILE = "client_secrets.json";
    /**
     * Application name.
     */
    private static final String APP_NAME = "Realtime-Gx/1.0";
    /**
     * Mime type of documents created and accessed by this application.
     */
    private static final String APP_MIME_TYPE = "application/vnd.google-apps.drive-sdk";
    /**
     * Global configuration of Google Cloud Storage OAuth 2.0 scope.
     */
    private static final ArrayList<String> SCOPES = new ArrayList<String>();
    /**
     * Global instance of the JSON factory.
     */
    private static final com.google.api.client.json.JsonFactory JSON_FACTORY = new JacksonFactory();
    /**
     * Global instance of the HTTP transport.
     */
    private HttpTransport HTTP_TRANSPORT;
    /**
     * Location of the credential file of the user.
     */
    private String CREDENTIAL_FILE;

    //private static Logger logger = LogManager.getLogger(BrowserChannelTest.class);

    private long appId;
    
    // Properties for realtime loader
    private String channelUrl = "https://drive.google.com/otservice";
    private String fileId;
    private String modelId;
    private Session session;
    private Credential credential;
    private JsonFactory jfactory;
    private BrowserChannel channel;

    public DriveWrapper(Credential credential){
    	this.credential = credential;
    	jfactory = new JsonFactory();
    }
    
    public void connect() {
        try {

            Drive service = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
                    .setApplicationName(APP_NAME).build();

            // Fetch information
            fileId = getFileId(service);
            modelId = retrieveModelId(fileId);
            session = createSession();
            
            // TODO: build document model according to session.snapshot

            // Create channel
            channel = new BrowserChannel();
            channel.addMessageHandler(new RealtimeMessageHandler());
            channel.addExtraParameter("id", modelId);
            channel.addExtraParameter("access_token", credential.getAccessToken());
            channel.addExtraParameter("sid", session.getSessionId());
            //logger.debug("Initialized BrowserChannel");
            
            // Open channel
            channel.connect(channelUrl);
            channel.openForwardChannel();
            channel.openBackwardChannel();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String retrieveModelId(String driveFileId)
    {
        // Set up parameters
        Map<String, String> parameters = new HashMap<String, String>();
        parameters.put("id", driveFileId);
        parameters.put("access_token", credential.getAccessToken());

        try {
            // Create connection
            URLWithQuery urlq = new URLWithQuery(new URL(channelUrl + "/modelid"), parameters);
            HttpURLConnection connection = (HttpURLConnection) urlq.getURL().openConnection();
            Reader in = new NormalizedJsonReader(connection.getInputStream());

            // Parse response
            JsonParser jParser = jfactory.createParser(in);
            ObjectMapper mapper = new ObjectMapper();
            jParser.setCodec(mapper);
            ModelResponse response = jParser.readValueAs(ModelResponse.class);
            in.close();
            return response.getModelId();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private Session createSession()
    {
        // Set up parameters
        Map<String, String> parameters = new HashMap<String, String>();
        parameters.put("id", modelId);
        parameters.put("access_token", credential.getAccessToken());

        try {
            // Create connection
            URLWithQuery urlq = new URLWithQuery(new URL(channelUrl + "/gs"), parameters);
            HttpURLConnection connection = (HttpURLConnection) urlq.getURL().openConnection();
            Reader in = new NormalizedJsonReader(connection.getInputStream());

            // Parse response
            JsonParser jParser = jfactory.createParser(in);
            ObjectMapper mapper = new ObjectMapper();
            jParser.setCodec(mapper);
            Session message = jParser.readValueAs(Session.class);
            in.close();
            return message;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Retrieve a suitable file to open our browserchannel with
     *
     * @param service
     * @return
     * @throws Exception
     */
    private String getFileId(Drive service) throws Exception
    {
        String fileName = null;
        String fileId = null;
        FileList files = service.files().list().execute();
        for (File file : files.getItems()) {
            if (file.getMimeType().equals(APP_MIME_TYPE + "." + appId)) {
                fileId = file.getId();
                fileName = file.getTitle();
                break;
            }
        }

        //logger.debug("FileID: {}", fileId);
        //logger.debug("FileName: {}", fileName);

        if (fileId == null) {
            throw new Exception("No Realtime file found");
            // Add file
//            fileId = addRealtimeFile(service);
        }

        return fileId;
    }

    /**
     * Obtains credentials using the preferred authorization method.
     *
     * @return
     * @throws Exception
     */
    private Credential authorize() throws Exception
    {
        SCOPES.add(DriveScopes.DRIVE);
        CREDENTIAL_FILE = System.getProperty("user.home") + "/.credentials/oauth2.json";
        HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();

        // load client secrets
        InputStream s = new FileInputStream(CLIENT_SECRETS_FILE);
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, s);
        appId = getAppId(clientSecrets);

        // Authorize
        Credential credential = USE_SERVICE_ACCOUNT ? authorizeServiceAccount() : authorizeUser(clientSecrets);

        // Get token
        credential.refreshToken();
        //logger.debug("Access token: {}", credential.getAccessToken());
        //logger.debug("Expires in {} seconds", credential.getExpiresInSeconds());
        return credential;
    }

    // Build service account credential.
    private Credential authorizeServiceAccount() throws Exception
    {
        GoogleCredential credential = new GoogleCredential.Builder()
                .setTransport(HTTP_TRANSPORT)
                .setJsonFactory(JSON_FACTORY)
                .setServiceAccountId(SERVICE_ACCOUNT_EMAIL)
                .setServiceAccountScopes(SCOPES)
                .setServiceAccountPrivateKeyFromP12File(new java.io.File(PRIVATE_KEY_FILE))
                .build();

        return credential;
    }

    /**
     * Authorizes the installed application to access user's protected data.
     */
    private Credential authorizeUser(GoogleClientSecrets clientSecrets) throws Exception
    {
        // set up file credential store
        //CredentialStore credentialStore = new MemoryCredentialStore();
        CredentialStore credentialStore = new FileCredentialStore(new java.io.File(CREDENTIAL_FILE), JSON_FACTORY);

        // set up authorization code flow
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES).setCredentialStore(credentialStore).build();

        // authorize
        VerificationCodeReceiver receiver = new GooglePromptReceiver();
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }

    private long getAppId(GoogleClientSecrets clientSecrets) throws Exception
    {

        String clientId = clientSecrets.getDetails().getClientId();
        String[] parts = clientId.split("-");

        if (parts.length != 2)
            return -1;

        return Long.parseLong(parts[0]);
    }

    // Add Realtime file
    private static String addRealtimeFile(Drive service) throws IOException
    {
        File body = new File();
        body.setTitle("GxFile");
        body.setDescription("A Realtime Gx file");
        body.setMimeType(APP_MIME_TYPE);
        service.files().insert(body).execute();
        return body.getId();
    }
    
    private static class ModelResponse
    {
        @JsonProperty("modelId")
        private String modelId;

        public String getModelId()
        {
            return modelId;
        }
    }
    
    public BrowserChannel getChannel(){
    	return channel;
    }
}
