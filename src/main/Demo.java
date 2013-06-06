package main;

import gx.realtime.*;

import java.io.IOException;

import static org.junit.Assert.fail;

/**
 * Demo application using the framework
 */
public class Demo
{
    public static void main(String[] args)
    {
        Demo demo = new Demo();
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
            doc.addEventListener(EventType.VALUE_CHANGED, handler);
        });
        options.setHandleErrors((doc) -> System.out.println("Received error, crap!"));

        RealtimeLoader loader = new RealtimeLoader(options);

        loader.start();
    }

    /**
     * Get the client ID from the default configuration file.
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
