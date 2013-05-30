package gx.realtime.acceptance_test;

import gx.realtime.Document;
import gx.realtime.IdentificationLoader;
import gx.realtime.RealtimeLoader;
import gx.realtime.RealtimeOptions;
import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 *
 */
public class LoaderTest
{
    @Test
    public void testLoader()
    {
        String clientId;
        try {
            clientId = IdentificationLoader.usingDefault().getClientId();
        } catch (IOException e) {
            fail("Could not load client ID");
            e.printStackTrace();
            return;
        }
        
        RealtimeOptions options = new RealtimeOptions();
        options.setClientId(clientId);
        options.setDocId("0B6gFLa0mYRcOc3NKTmtwdV9idHM");
        
        RealtimeLoader.OnDocumentLoadedCallback onFileLoadedMock = mock(RealtimeLoader.OnDocumentLoadedCallback.class);
        options.setOnFileLoaded(onFileLoadedMock);
        
        RealtimeLoader loader = new RealtimeLoader(options);
        loader.start();
        
        verify(onFileLoadedMock).onFileLoaded(isA(Document.class));
    }
}
