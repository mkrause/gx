package gx.realtime;

/**
 * Top-level loader for the realtime API.
 */
public class RealtimeLoader {
    private RealtimeOptions options;

    public RealtimeLoader(RealtimeOptions options) {
        this.options = options;
    }

    public void start() {
        Document doc = new Document();
        options.getOnFileLoaded().onFileLoaded(doc);
    }
}
