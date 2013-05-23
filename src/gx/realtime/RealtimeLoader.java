package gx.realtime;

import com.google.api.client.auth.oauth2.Credential;
import gx.browserchannel.util.DriveWrapper;

/**
 * Top-level loader for the realtime API.
 */
public class RealtimeLoader {
    
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

    public RealtimeLoader(RealtimeOptions options) {
        this.options = options;
    }

    /**
     * To avoid global states, the token will not be saved in this static class.
     * If we need the token anyway, it is advised to save it in the Document, and add a getToken() function to the Document class.
     * @return
     */
    @Deprecated
    public static String getToken(){
        return null;
    }

    private static Document getDocument(Credential cred, String docId){
        DriveWrapper service = new DriveWrapper(cred);
        service.connect();
        //retrieve document from google api?

        //TODO
        return null;
    }
    
    public void load(
        Credential cred,
        String docId,
        OnDocumentLoadedCallback onLoaded,
        InitializeModelCallback initializeFn,
        HandleErrorsCallback errorFn
    ) {
        Document doc = getDocument(cred, docId);
    }
    
    public void start() {
        Authorizer authorizer = new Authorizer();
        
        Credential cred;
        try {
            cred = authorizer.authorize();
        } catch (Exception e) {
            System.out.println(e);
            return;
        }
        
        load(
            cred,
            options.getDocId(),
            options.getOnFileLoaded(),
            options.getInitializeModel(),
            options.getHandleErrors()
        );
        
        Document doc = new Document();
        options.getOnFileLoaded().onFileLoaded(doc);
    }
}
