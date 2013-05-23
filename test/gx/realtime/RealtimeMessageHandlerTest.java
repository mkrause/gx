package gx.realtime;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import gx.browserchannel.BrowserChannel;
import gx.browserchannel.message.DataMessage;
import gx.browserchannel.message.Message;
import gx.browserchannel.message.MessageEvent;
import org.junit.*;
import static org.junit.Assert.*;

import java.io.IOException;

import static org.mockito.Mockito.mock;

/**
 *
 */
public class RealtimeMessageHandlerTest
{
    private RealtimeMessageHandler handler;

    final String collabJoinedMsg = "[5,1369300707776,{\"color\":\"#58B442\",\"displayName\":\"John Doe\",\"isActive\":true,\"isAnonymous\":false,\"isMe\":true,\"isNew\":true,\"photoUrl\":\"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rsbdfgvv5M/s128/photo.jpg\",\"profileId\":\"11113136429605372\",\"sid\":\"2baa24a287e097a6\",\"userId\":\"11113136429605372\",\"userType\":0}]";
    private JsonNode jsonNode;

    @Before
    public void setUp() throws IOException
    {
        handler = new RealtimeMessageHandler();
        JsonFactory jf = new JsonFactory();
        JsonParser jp = jf.createParser(collabJoinedMsg);
        jp.setCodec(new ObjectMapper());
        jsonNode = jp.readValueAsTree();
    }

    @Test
    public void testReceive_CollabJoinedMessage()
    {
        BrowserChannel mockBrowserChannel = mock(BrowserChannel.class);
        Message sm = new DataMessage(jsonNode);
        MessageEvent me = new MessageEvent(mockBrowserChannel, sm);

        handler.receive(me);

        assertTrue("Document should receive MessageEvent", false);
    }

    @Test
    public void testParseDataMessage_CollabJoinedMessage()
    {
        DataMessage sm = new DataMessage(jsonNode);
        Event e = handler.parseDataMessage(sm);

        assertNotNull("Parsed event should not be null", e);
        assertEquals(e.getClass(), CollaboratorJoinedEvent.class);
    }
}
