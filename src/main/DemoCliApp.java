package main;

import gx.realtime.*;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.core.LoggerContext;
import org.apache.logging.log4j.core.config.Configuration;
import org.apache.logging.log4j.core.config.LoggerConfig;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import static org.junit.Assert.fail;

/**
 * Demo application using the framework
 */
public class DemoCliApp
{
    private Document document;

    public static void main(String[] args)
    {
        LoggerContext ctx = (LoggerContext) LogManager.getContext(false);
        Configuration config = ctx.getConfiguration();
        LoggerConfig loggerConfig = config.getLoggerConfig(LogManager.
                ROOT_LOGGER_NAME);
        loggerConfig.setLevel(Level.ERROR);
        ctx.updateLoggers();

        DemoCliApp demo = new DemoCliApp();
        demo.run();
    }

    private void run()
    {
        RealtimeOptions options = new RealtimeOptions();
        options.setClientId(getClientId());
        options.setDocId("0B6gFLa0mYRcOUHlpUlFTTm5EaDQ");

        options.setOnFileLoaded((doc) -> {
            System.out.println("Received onDocumentLoadedCallback for sessionid " + doc.getSession());
            EventHandler handler = (event) -> {
                System.out.println("**** Received event of type: " + event.getType());
            };
            doc.addEventListener(EventType.COLLABORATOR_JOINED, handler);
            doc.addEventListener(EventType.COLLABORATOR_LEFT, handler);
            doc.addEventListener(EventType.OBJECT_ADDED, handler);
            doc.addEventListener(EventType.VALUE_CHANGED, handler);

            Model model = doc.getModel();
            System.out.println("Found model: " + model == null);

            CollaborativeMap<CollaborativeObject> root = model.getRoot();
            System.out.println("Root id: " + root.getId() + ", size: " + root.size());

            for (String key : root.keys()) {
                System.out.println("Key: " + key);
            }

            // TODO: Implement some functionality once the model is properly built on application start
            document = doc;
        });
        options.setHandleErrors((doc) -> System.out.println("Received error, crap!"));

        RealtimeLoader loader = new RealtimeLoader(options);

        loader.start();

        System.out.println("Press ENTER to disconnect");
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        try {
            br.readLine();
        } catch (Exception ex) { }

        if(document != null)
            document.close();
        System.out.println("Closed");
    }

    /**
     * Get the client ID from the default configuration file.
     *
     * @return
     */
    private String getClientId()
    {
        String clientId = null;
        try {
            clientId = IdentificationLoader.usingDefault().getClientId();
        } catch (IOException e) {
            fail("Could not load client ID");
            e.printStackTrace();
            System.exit(1);
        }
        return clientId;
    }
}
