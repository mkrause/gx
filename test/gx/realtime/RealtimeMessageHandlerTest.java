package gx.realtime;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import gx.browserchannel.BrowserChannel;
import gx.browserchannel.message.DataMessage;
import gx.browserchannel.message.Message;
import gx.browserchannel.message.MessageEvent;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;

/**
 *
 */
public class RealtimeMessageHandlerTest
{
    // General events
    final String collabJoinedMsg = "[5,1369300707776,{\"color\":\"#58B442\",\"displayName\":\"John Doe\",\"isActive\":true,\"isAnonymous\":false,\"isMe\":true,\"isNew\":true,\"photoUrl\":\"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rsbdfgvv5M/s128/photo.jpg\",\"profileId\":\"11113136429605372\",\"sid\":\"2baa24a287e097a6\",\"userId\":\"111138071136429601111\",\"userType\":0}]";

    // Map events
    final String mapValueChangedMsg_delete = "[0,1369308664813,[[17,\"13ed12879c5\",\"111138071136429601111\",\"7e1c20fc1848fe70\",[4,[0,[8,\"gdegz4x7zhgc9qqir\",\"foo\"]]]]]]";
    final String mapValueChangedMsg_add = "[0,1369308664833,[[19,\"13ed12bf275\",\"111138071136429601111\",\"7e1c20fc1848fe70\",[4,[0,[8,\"gdegz4x7zhgc9qqir\",\"foo\",[21,\"bar123\"]]]]]]]";

    // List events
    final String listValuesAddedMsg = "[0,1369309187394,[[9,\"13ed13150e2\",\"111138071136429601111\",\"5c99913e2f7818c4\",[4,[0,[5,\"gde99vx3khg7uko2g\",0,[0,[21,\"bar\"]]]]]]]]";
    final String listValuesSetMsg = "[0,1369309187437,[[15,\"13ed13577d0\",\"111138071136429601111\",\"5c99913e2f7818c4\",[4,[0,[11,\"gde99vx3khg7uko2g\",0,[0,[21,\"bazbaz\"]]]]]]]]";
    final String listValuesRemovedMsg = "[0,1369309187439,[[16,\"13ed1359b20\",\"111138071136429601111\",\"5c99913e2f7818c4\",[4,[0,[6,\"gde99vx3khg7uko2g\",0,1]]]]]]";


    private RealtimeMessageHandler handler;
    private JsonFactory jsonFactory;

    @Before
    public void setUp() throws IOException
    {
        handler = new RealtimeMessageHandler();
        jsonFactory = new JsonFactory();
    }

    @Test
    public void testReceive_CollabJoinedMessage()
    {
        BrowserChannel mockBrowserChannel = mock(BrowserChannel.class);
        Message sm = new DataMessage(getJsonNode(collabJoinedMsg));
        MessageEvent me = new MessageEvent(mockBrowserChannel, sm);

        handler.receive(me);

        // TODO: check if document receives MessageEvent
        assertTrue("Document should receive MessageEvent", false);
    }

    @Test
    public void testParseDataMessage_mapValueChangedMsg_add()
    {
        DataMessage sm = getDataMessage(mapValueChangedMsg_add);
        Event e = handler.parseDataMessage(sm);

        assertNotNull(e);
        assertEquals(e.getClass(), ValueChangedEvent.class);
    }

    @Test
    public void testParseDataMessage_mapValueChangedMsg_delete()
    {
        DataMessage sm = getDataMessage(mapValueChangedMsg_delete);
        Event e = handler.parseDataMessage(sm);

        assertNotNull(e);
        assertEquals(e.getClass(), ValueChangedEvent.class);
    }

    @Test
    public void testParseDataMessage_listValuesAddedMsg()
    {
        DataMessage sm = getDataMessage(listValuesAddedMsg);
        Event e = handler.parseDataMessage(sm);

        assertNotNull(e);
        assertEquals(e.getClass(), ValuesAddedEvent.class);
    }

    @Test
    public void testParseDataMessage_listValuesSetMsg()
    {
        DataMessage sm = getDataMessage(listValuesSetMsg);
        Event e = handler.parseDataMessage(sm);

        assertNotNull(e);
        assertEquals(e.getClass(), ValuesSetEvent.class);
    }

    @Test
    public void testParseDataMessage_listValuesRemovedMsg()
    {
        DataMessage sm = getDataMessage(listValuesRemovedMsg);
        Event e = handler.parseDataMessage(sm);

        assertNotNull(e);
        assertEquals(e.getClass(), ValuesRemovedEvent.class);
    }


    /**
     * Constructs a DataMessage from a given json string for testing
     * @param json
     * @return
     */
    private DataMessage getDataMessage(String json) {
        return new DataMessage(getJsonNode(json));
    }

    private JsonNode getJsonNode(String json) {
        try {
            JsonParser jp = jsonFactory.createParser(json);
            jp.setCodec(new ObjectMapper());
            return jp.readValueAsTree();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
