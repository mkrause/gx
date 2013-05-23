package gx.realtime;

/**
 * Options (key/value) for the RealtimeLoader.
 */
public class RealtimeOptions {
	
	//Callback interfaces
    public interface OnFileLoadedCallback {
        void onFileLoaded(Document doc);
    }
    public interface InitializeModelCallback {
        void initializeModel(Model model);
    }
    public interface HandleErrorsCallback {
        void handleErrors(Exception e);
    }
    
    //Attributes
	private String appId;
    private String clientId;
    private OnFileLoadedCallback onFileLoaded;
    private InitializeModelCallback initializeModel;
    private HandleErrorsCallback handleErrors;

    //Methods
    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public OnFileLoadedCallback getOnFileLoaded() {
        return onFileLoaded;
    }

    public void setOnFileLoaded(OnFileLoadedCallback onFileLoaded) {
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

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }
}
