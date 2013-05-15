package main;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import gx.browserchannel.BrowserChannel;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.CredentialStore;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.java6.auth.oauth2.FileCredentialStore;
import com.google.api.client.extensions.java6.auth.oauth2.VerificationCodeReceiver;
import com.google.api.client.googleapis.extensions.java6.auth.oauth2.GooglePromptReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import gx.realtime.RealtimeMessageHandler;

public class BrowserChannelTest
{
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
    private static final JsonFactory JSON_FACTORY = new JacksonFactory();
    /**
     * Global instance of the HTTP transport.
     */
    private static HttpTransport HTTP_TRANSPORT;
    /**
     * Location of the credential file of the user.
     */
    private static String CREDENTIAL_FILE;
    
    private static Logger logger = LogManager.getLogger(BrowserChannelTest.class);

    public static void main(String[] args)
    {
        try {
            SCOPES.add(DriveScopes.DRIVE);
            CREDENTIAL_FILE = System.getProperty("user.home") + "/.credentials/oauth2.json";
            HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();            

            // load client secrets
            InputStream s = new FileInputStream(CLIENT_SECRETS_FILE);
            GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, s);
            long appId = getAppId(clientSecrets);

            // Authorize
            Credential credential = USE_SERVICE_ACCOUNT ? authorizeServiceAccount() : authorizeUser(clientSecrets);
            
            // Get token
            credential.refreshToken();
            String accessToken = credential.getAccessToken();
            logger.debug("Access token: {}", accessToken);
            logger.debug("Expires in {} seconds", credential.getExpiresInSeconds());

            Drive service = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
                    .setApplicationName(APP_NAME).build();
            
            // Add file
            //addRealtimeFile(service);

            // Get file ID
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
            
            logger.debug("FileID: {}", fileId);
            logger.debug("FileName: {}", fileName);
            
            if(fileId == null)
                throw new Exception("No Realtime file found");

            BrowserChannel channel = new BrowserChannel(credential);
            channel.addMessageHandler(new RealtimeMessageHandler());
            channel.initialize(fileId);

            channel.connect();
            channel.openDeltaChannel();
            channel.openForwardChannel();
            channel.openBackwardChannel();

            System.out.println("done");
            System.exit(0);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        System.exit(1);
    }

    // Build service account credential.
    private static Credential authorizeServiceAccount() throws Exception {
        GoogleCredential credential = new GoogleCredential.Builder()
                .setTransport(HTTP_TRANSPORT)
                .setJsonFactory(JSON_FACTORY)
                .setServiceAccountId(SERVICE_ACCOUNT_EMAIL)
                .setServiceAccountScopes(SCOPES)
                .setServiceAccountPrivateKeyFromP12File(new java.io.File(PRIVATE_KEY_FILE))
                .build();
        
      return credential;
    }

    /** Authorizes the installed application to access user's protected data. */
    private static Credential authorizeUser(GoogleClientSecrets clientSecrets) throws Exception {
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
    
    private static long getAppId(GoogleClientSecrets clientSecrets) throws Exception {

        String clientId = clientSecrets.getDetails().getClientId();
        String[] parts = clientId.split("-");
        
        if(parts.length != 2)
            return -1;
        
        return Long.parseLong(parts[0]);
    }

    // Add Realtime file
    private static void addRealtimeFile(Drive service) throws IOException
    {
        File body = new File();
        body.setTitle("GxFile");
        body.setDescription("A Realtime Gx file");
        body.setMimeType(APP_MIME_TYPE);
        service.files().insert(body).execute();
    }
}
