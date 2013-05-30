package gx.realtime;

import gx.realtime.RealtimeLoader.InitializeModelCallback;
import gx.realtime.RealtimeLoader.HandleErrorsCallback;

/**
 * Options (key/value) for the RealtimeLoader.
 */
public class RealtimeOptions {
    
    // Attributes
	private String appId;
    private String clientId;
    private String docId;

    private RealtimeLoader.OnDocumentLoadedCallback onFileLoaded;
    private InitializeModelCallback initializeModel;
    private HandleErrorsCallback handleErrors;

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

    public RealtimeLoader.OnDocumentLoadedCallback getOnFileLoaded() {
        return onFileLoaded;
    }

    public void setOnFileLoaded(RealtimeLoader.OnDocumentLoadedCallback onFileLoaded) {
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
