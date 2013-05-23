package gx.realtime.acceptance_test;

import gx.realtime.Document;
import gx.realtime.RealtimeLoader;
import gx.realtime.RealtimeOptions;
import org.junit.Test;
import static org.mockito.Mockito.*;

/**
 *
 */
public class LoaderTest {
    @Test
    public void testLoader() {
        RealtimeOptions options = new RealtimeOptions();
        options.setAppId("foo");
        options.setClientId("bar");
        
        RealtimeLoader.OnDocumentLoadedCallback onFileLoadedMock = mock(RealtimeLoader.OnDocumentLoadedCallback.class);
        options.setOnFileLoaded(onFileLoadedMock);
        
        RealtimeLoader rtLoader = new RealtimeLoader(options);
        rtLoader.start();
        
        verify(onFileLoadedMock).onFileLoaded(isA(Document.class));
    }
}
