package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonParser;
import gx.realtime.ObjectChangedEvent;
import org.junit.Test;

import static junit.framework.TestCase.assertNotNull;
import static junit.framework.TestCase.assertTrue;

/**
 *
 */
public class ObjectChangedEventDeserializerTest extends DeserializerTestHelper
{
    final String singleJson = "[17,\"13ed12879c5\",\"111138071136429601111\",\"7e1c20fc1848fe70\",[8,\"objectid\",\"key\"]]";

    @Test
    public void testDeserialize_single() throws Exception
    {
        JsonParser parser = getParser(singleJson);

        ObjectChangedEvent event = parser.readValueAs(ObjectChangedEvent.class);
        assertNotNull(event);
        assertTrue(event.getEvents().size() == 1);
    }
}
