package gx.realtime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.auth.oauth2.Credential;
import gx.browserchannel.NormalizedJsonReader;
import gx.browserchannel.util.URLWithQuery;
import gx.realtime.authorizer.AuthorizerInterface;

import java.io.IOException;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

/**
 * Top-level loader for the realtime API.
 */
public class RealtimeLoader
{
    private static final String CHANNEL_URL = "https://drive.google.com/otservice";
    
    // Callback interfaces
    public interface OnDocumentLoadedCallback {
        void onFileLoaded(Document doc);
    }
    public interface InitializeModelCallback {
        void initializeModel(Model model);
    }
    public interface HandleErrorsCallback {
        void handleErrors(Exception e);
    }
    
    private RealtimeOptions options;
    private JsonFactory jfactory = new JsonFactory();
    private String accessToken;
    private Document doc;
    
    private static class ModelResponse
    {
        @JsonProperty("modelId")
        private String modelId;

        public String getModelId() {
            return modelId;
        }
    }

    /**
     * Return the URL for the channel to the Drive server.
     * @return String
     */
    public static String getChannelUrl()
    {
        return CHANNEL_URL;
    }
    
    /**
     * Construct a new loader, with the given options.
     * @param options
     */
    public RealtimeLoader(RealtimeOptions options)
    {
        this.options = options;
    }

    /**
     * Return the document after it has been loaded, or null if
     * we have not loaded any document yet.
     * @return Document
     */
    public Document getDocument()
    {
        return doc;
    }
    
    /**
     * Return the OAuth access token, or null if none was yet loaded.
     * @return String
     */
    public String getToken()
    {
        return accessToken;
    }
    
    private String retrieveModelId(Credential cred, String docId)
    {
        accessToken = cred.getAccessToken();
        
        // Set up parameters
        Map<String, String> parameters = new HashMap<>();
        parameters.put("id", docId);
        parameters.put("access_token", accessToken);

        try {
            // Create connection
            URLWithQuery urlq = new URLWithQuery(new URL(CHANNEL_URL + "/modelid"), parameters);
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

    private Session createSession(Credential cred, String modelId) {
        // Set up parameters
        Map<String, String> parameters = new HashMap<>();
        parameters.put("id", modelId);
        parameters.put("access_token", cred.getAccessToken());

        try {
            // Create connection
            URLWithQuery urlq = new URLWithQuery(new URL(CHANNEL_URL + "/gs"), parameters);
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

    private Document buildDocument(Credential cred, String docId){
        String modelId = retrieveModelId(cred, docId);
        Session session = createSession(cred, modelId);

        Document doc = new Document(cred, session);
        return doc;
    }
    
    /**
     *
     * @param cred
     * @param docId
     * @param onLoaded
     * @param initializeFn
     * @param errorFn
     */
    private void load(
        Credential cred,
        String docId,
        OnDocumentLoadedCallback onLoaded,
        InitializeModelCallback initializeFn,
        HandleErrorsCallback errorFn
    )
    {
        doc = buildDocument(cred, docId);
        
        options.getInitializeModel().initializeModel(doc.getModel());
        options.getOnFileLoaded().onFileLoaded(doc);
    }
    
    /**
     * Main method to start the Realtime process.
     */
    public void start()
    {
        AuthorizerInterface authorizer = options.getAuthorizer();
        
        Credential cred;
        try {
            cred = authorizer.authorize();
        } catch (Exception e) {
            System.out.println("Authorization failed");
            e.printStackTrace();
            return;
        }
        
        load(
            cred,
            options.getDocId(),
            options.getOnFileLoaded(),
            options.getInitializeModel(),
            options.getHandleErrors()
        );
    }
}
