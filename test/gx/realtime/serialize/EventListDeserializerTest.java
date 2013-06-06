package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonParser;
import gx.realtime.EventList;
import org.junit.Test;

import static junit.framework.Assert.assertEquals;
import static junit.framework.TestCase.assertNotNull;

/**
 *
 */
public class EventListDeserializerTest extends DeserializerTestHelper
{
    private String type0Json = "[0,1370512608357,[[85,\"13f18ead3fd\",\"111138071136429605372\",\"4cd149cb40105a1f\",[9]]]]";
    private String type1Json = "[1,1370512608357,{\"CONTENT_MODIFICATION_DATE\":true}]";

    @Test
    public void testDeserialize_type0() throws Exception
    {
        JsonParser parser = getParser(type0Json);

        EventList eventList = parser.readValueAs(EventList.class);
        assertNotNull(eventList);
        assertEquals(1, eventList.getEvents().size());
    }

    @Test
    public void testDeserialize_type1() throws Exception
    {
        JsonParser parser = getParser(type1Json);

        EventList eventList = parser.readValueAs(EventList.class);
        assertNotNull(eventList);
    }
}
