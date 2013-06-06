package gx.realtime.acceptance_test;

import gx.realtime.Document;
import gx.realtime.IdentificationLoader;
import gx.realtime.RealtimeLoader;
import gx.realtime.RealtimeOptions;
import org.junit.Test;
import org.mockito.ArgumentCaptor;

import java.io.IOException;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 *
 */
public class LoaderTest
{
    /**
     * Get the client ID from the default configuration file.
     * @return
     */
    private String getClientId()
    {
        String clientId;
        try {
            clientId = IdentificationLoader.usingDefault().getClientId();
        } catch (IOException e) {
            fail("Could not load client ID");
            e.printStackTrace();
            System.exit(1);
            return null;
        }
        return clientId;
    }
    
    @Test
    public void testDocumentIsLoaded()
    {
        RealtimeOptions options = new RealtimeOptions();
        options.setClientId(getClientId());
        options.setDocId("0B6gFLa0mYRcOUHlpUlFTTm5EaDQ");

        RealtimeLoader.OnDocumentLoadedCallback onDocLoaded = mock(RealtimeLoader.OnDocumentLoadedCallback.class);
        options.setOnFileLoaded(onDocLoaded);
        
        RealtimeLoader loader = new RealtimeLoader(options);
        
        loader.start();
        
        verify(onDocLoaded).onFileLoaded(isA(Document.class));
        
        // close document properly
        // doc.close();
    }
}
