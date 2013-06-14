package gx.realtime.authorizer;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.CredentialStore;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.java6.auth.oauth2.FileCredentialStore;
import com.google.api.client.extensions.java6.auth.oauth2.VerificationCodeReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.extensions.java6.auth.oauth2.GooglePromptReceiver;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.DriveScopes;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;

/**
 * Sample authorizer class that uses a GooglePromptReceiver.
 */
public class GooglePromptAuthorizer implements AuthorizerInterface
{
    /**
     * Client secrets of installed app.
     */
    private final String CLIENT_SECRETS_FILE = "client_secrets.json";
    /**
     * Global configuration of Google Cloud Storage OAuth 2.0 scope.
     */
    private final ArrayList<String> SCOPES = new ArrayList<>();
    /**
     * Global instance of the JSON factory.
     */
    private final JsonFactory JSON_FACTORY = new JacksonFactory();
    /**
     * Global instance of the HTTP transport.
     */
    private HttpTransport HTTP_TRANSPORT;
    /**
     * Location of the credential file of the user.
     */
    private String CREDENTIAL_FILE;

    private static Logger logger = LogManager.getLogger(GooglePromptAuthorizer.class);

    /**
     * Obtains credentials using the preferred authorization method.
     *
     * @return
     * @throws Exception
     */
    @Override
    public Credential authorize() throws Exception
    {
        SCOPES.add(DriveScopes.DRIVE);
        CREDENTIAL_FILE = System.getProperty("user.home") + "/.credentials/oauth2.json";
        HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();

        // load client secrets
        InputStream s = new FileInputStream(CLIENT_SECRETS_FILE);
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, s);

        // Authorize
        Credential credential = authorizeUser(clientSecrets);

        // Get token
        credential.refreshToken();
        logger.debug("Access token: {}", credential.getAccessToken());
        logger.debug("Expires in {} seconds", credential.getExpiresInSeconds());
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

}
