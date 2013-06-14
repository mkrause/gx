package gx.realtime.authorizer;

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
public class ServiceAccountAuthorizer implements AuthorizerInterface
{
    /**
     * E-mail address of the service account.
     */
    private final String SERVICE_ACCOUNT_EMAIL = "289978787145-qoafq30a0i1qou5eul1hvepc99jnglua@developer.gserviceaccount.com";
    /**
     * Private key of the service account.
     */
    private final String PRIVATE_KEY_FILE = "key.p12";
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

    private static Logger logger = LogManager.getLogger(ServiceAccountAuthorizer.class);

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
        HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();

        // Authorize
        Credential credential = authorizeServiceAccount();
        
        // Get token
        credential.refreshToken();
        logger.debug("Access token: {}", credential.getAccessToken());
        logger.debug("Expires in {} seconds", credential.getExpiresInSeconds());
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

}
