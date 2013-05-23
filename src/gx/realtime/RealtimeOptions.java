package gx.realtime;

/**
 * Options (key/value) for the RealtimeLoader.
 */
public class RealtimeOptions {
    private String appId;
    private String clientId;

    public interface OnFileLoadedCallback {
        void onFileLoaded(Document doc);
    }
    private OnFileLoadedCallback onFileLoaded;

    public interface InitializeModelCallback {
        void initializeModel(Model model);
    }
    private InitializeModelCallback initializeModel;

    public interface HandleErrorsCallback {
        void handleErrors(Exception e);
    }
    private HandleErrorsCallback handleErrors;

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
