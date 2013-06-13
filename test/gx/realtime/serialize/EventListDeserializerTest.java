package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonParser;
import gx.realtime.CollaboratorJoinedEvent;
import gx.realtime.CollaboratorLeftEvent;
import gx.realtime.EventList;
import gx.realtime.ObjectChangedEvent;
import org.junit.Test;

import static junit.framework.Assert.*;
import static junit.framework.TestCase.assertNotNull;

/**
 *
 */
public class EventListDeserializerTest extends DeserializerTestHelper
{
    private String objectChangedEvent = "[85,\"13f18ead3fd\",\"111138071136429605372\",\"4cd149cb40105a1f\",[9]]";
    private String objectChangedEmpty = "[0,1370512608357,[]]";
    private String objectChangedSingle = "[0,1370512608357,["+objectChangedEvent+"]]";
    private String objectChangedMultiple = "[0,1370512608357,["+objectChangedEvent+","+objectChangedEvent+","+objectChangedEvent+"]]";
    private String contentModification = "[1,1370512608357,{\"CONTENT_MODIFICATION_DATE\":true}]";
    private String user = "{\"color\":\"#000000\",\"displayName\":\"Test User\",\"isActive\":true,\"isAnonymous\":false,\"isMe\":true,\"isNew\":true,\"photoUrl\":\"\\/\\/domain.com\\/photo.jpg\",\"profileId\":\"112956879592017678596\",\"sid\":\"2221a682069e7485\",\"userId\":\"112656379192087458580\",\"userType\":0}";
    private String userJoined = "[5,1370512608357,"+user+"]";
    private String userLeft = "[6,1370512608357,{\"sid\":\"31d9317c707d16a1\",\"userId\":\"112956879592017678596\"}]";

    @Test
    public void testDeserialize_objectChanged_empty() throws Exception
    {
        JsonParser parser = getParser(objectChangedEmpty);

        EventList eventList = parser.readValueAs(EventList.class);
        assertNotNull(eventList);
        assertEquals(0, eventList.getEvents().size());
    }
    @Test
    public void testDeserialize_objectChanged_single() throws Exception
    {
        JsonParser parser = getParser(objectChangedSingle);

        EventList eventList = parser.readValueAs(EventList.class);
        assertNotNull(eventList);
        assertEquals(1, eventList.getEvents().size());
        assertTrue("Event should be of type ObjectChangedEvent", eventList.getEvents().get(0) instanceof ObjectChangedEvent);
    }

    @Test
    public void testDeserialize_objectChanged_multiple() throws Exception
    {
        JsonParser parser = getParser(objectChangedMultiple);

        EventList eventList = parser.readValueAs(EventList.class);
        assertNotNull(eventList);
        assertEquals(3, eventList.getEvents().size());
    }

    @Test
    public void testDeserialize_userJoined() throws Exception
    {
        JsonParser parser = getParser(userJoined);

        EventList eventList = parser.readValueAs(EventList.class);
        assertNotNull(eventList);
        assertEquals(1, eventList.getEvents().size());
        assertTrue("Event should be of type CollaboratorJoinedEvent", eventList.getEvents().get(0) instanceof CollaboratorJoinedEvent);
    }

    @Test
    public void testDeserialize_userLeft() throws Exception
    {
        JsonParser parser = getParser(userLeft);

        EventList eventList = parser.readValueAs(EventList.class);
        assertNotNull(eventList);
        assertEquals(1, eventList.getEvents().size());
        assertTrue("Event should be of type CollaboratorLeftEvent", eventList.getEvents().get(0) instanceof CollaboratorLeftEvent);
    }

    @Test
    public void testDeserialize_contentModification() throws Exception
    {
        JsonParser parser = getParser(contentModification);

        EventList eventList = parser.readValueAs(EventList.class);
        assertNotNull(eventList);
    }
}
