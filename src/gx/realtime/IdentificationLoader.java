package gx.realtime;

import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Class used to load identifying information about this client from a
 * configuration file.
 */
public class IdentificationLoader
{
    private static final String DEFAULT_CLIENT_SECRETS_FILE = "client_secrets.json";

    private String clientSecretsFile;
    private GoogleClientSecrets clientSecrets;
    private JsonFactory jsonFactory;

    /**
     * Build an instance using the default configuration.
     */
    public static IdentificationLoader usingDefault() throws IOException
    {
        return new IdentificationLoader(DEFAULT_CLIENT_SECRETS_FILE);
    }
    
    public IdentificationLoader(String clientSecretsFile) throws IOException
    {
        this.clientSecretsFile = clientSecretsFile;
        jsonFactory = new JacksonFactory();
        
        InputStream fis = new FileInputStream(clientSecretsFile);
        clientSecrets = GoogleClientSecrets.load(jsonFactory, fis);
    }

    public String getClientId()
    {
        return clientSecrets.getDetails().getClientId();
    }
    
    public long getAppId()
    {
        String[] parts = getClientId().split("-");

        if (parts.length != 2)
            return -1;

        return Long.parseLong(parts[0]);
    }
}
