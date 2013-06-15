package main.demo.cli;

import gx.realtime.*;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.core.LoggerContext;
import org.apache.logging.log4j.core.config.Configuration;
import org.apache.logging.log4j.core.config.LoggerConfig;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Demo application using the framework
 */
public class DemoCliApp
{
    private Document document;
    private CollaborativeMap collabMap;

    public static void main(String[] args)
    {
        // Tune down the logging of Log4j2 a bit
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
            document = doc;

            // Add listeners to the document
            EventHandler handler = (event) -> {
                System.out.println("Document received " + event.getType() + " event");
            };
            doc.addEventListener(EventType.COLLABORATOR_JOINED, handler);
            doc.addEventListener(EventType.COLLABORATOR_LEFT, handler);

            // Add listeners to the root map
            CollaborativeMap root = doc.getModel().getRoot();
            EventHandler rootHandler = (event) -> {
                System.out.println("Root received " + event.getType() + " event");
            };
            root.addEventListener(EventType.OBJECT_CHANGED, rootHandler);
            root.addEventListener(EventType.VALUE_CHANGED, rootHandler);

            // Iterate over the keys and grab some key
            String firstKey = root.keys().iterator().next();

            if (firstKey != null) {
                collabMap = (CollaborativeMap) root.get(firstKey);
                System.out.println("Found collaborativeObject: " + collabMap.toString());

                // Add listeners to the map
                EventHandler mapListener = (event) -> {
                    System.out.println("CollabMap received event: " + event.getType());
                };
                collabMap.addEventListener(EventType.OBJECT_CHANGED, mapListener);
                collabMap.addEventListener(EventType.VALUE_CHANGED, mapListener);
            } else {
                System.out.println("ERROR: found no keys");
                System.exit(1);
            }
        });
        options.setHandleErrors((doc) -> System.out.println("Received error, crap!"));

        RealtimeLoader loader = new RealtimeLoader(options);
        loader.start();

        handleInput();
    }


    /**
     * Awaits user input and takes care of the user interaction.
     */
    private void handleInput()
    {
        String instructions = "Options:\n<q> to disconnect\n<s> to set a value to the current time\n<p> to print the map contents\n<?> to display this message";
        System.out.println(instructions);
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        try {
            while (true) {
                String line = br.readLine();
                if (line.equals("q")) {
                    System.out.println("Closing...");
                    break;
                } else if (line.equals("s")) {
                    System.out.println("setting value cli_app to current time");
                    collabMap.set("cli_app", System.currentTimeMillis());
                } else if (line.equals("?")) {
                    System.out.println(instructions);
                } else if (line.equals("p")) {
                    System.out.println("Map contents:");
                    for (String key : collabMap.keys()) {
                        System.out.println(key + ": " + collabMap.get(key));
                    }
                }
            }
        } catch (Exception ex) {
        }

        if (document != null)
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
            System.out.println("Could not load client ID");
            e.printStackTrace();
            System.exit(1);
        }
        return clientId;
    }
}
