package gx.realtime;

import gx.realtime.RealtimeLoader.OnDocumentLoadedCallback;
import gx.realtime.RealtimeLoader.InitializeModelCallback;
import gx.realtime.RealtimeLoader.HandleErrorsCallback;

/**
 * Options (key/value) for the RealtimeLoader.
 */
public class RealtimeOptions {
    
    private String clientId;
    private String docId;

    private OnDocumentLoadedCallback onFileLoaded = (doc) -> {
        // By default, do nothing
    };
    
    private InitializeModelCallback initializeModel = (model) -> {
        // By default, do nothing
    };
    
    private HandleErrorsCallback handleErrors = (e) -> {
        // By default, do nothing
    };
    
    // Methods
    public String getClientId() {
        return clientId;
    }
    
    public void setClientId(String clientId) {
        this.clientId = clientId;
    }
    
    public String getDocId() {
        return docId;
    }
    
    public void setDocId(String docId) {
        this.docId = docId;
    }
    
    public OnDocumentLoadedCallback getOnFileLoaded() {
        return onFileLoaded;
    }
    
    public void setOnFileLoaded(OnDocumentLoadedCallback onFileLoaded) {
        this.onFileLoaded = onFileLoaded;
    }
    
    public InitializeModelCallback getInitializeModel() {
        return initializeModel;
    }
    
    public void setInitializeModel(InitializeModelCallback initializeModel) {
        this.initializeModel = initializeModel;
    }
    
    public HandleErrorsCallback getHandleErrors() {
        return handleErrors;
    }
    
    public void setHandleErrors(HandleErrorsCallback handleErrors) {
        this.handleErrors = handleErrors;
    }
}
