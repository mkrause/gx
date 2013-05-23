package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import gx.realtime.ObjectChangedEvent;
import org.junit.Test;

import java.io.IOException;

import static junit.framework.TestCase.*;

/**
 *
 */
public class ObjectChangedEventDeserializerTest
{
    final String singleJson = "[17,\"13ed12879c5\",\"111138071136429601111\",\"7e1c20fc1848fe70\",[4,[0,[8,\"gdegz4x7zhgc9qqir\",\"foo\"]]]]";
    private JsonFactory jsonFactory = new JsonFactory();

    @Test
    public void testDeserialize_single() throws Exception
    {
        JsonParser parser = getParser(singleJson);

        ObjectChangedEvent event = parser.readValueAs(ObjectChangedEvent.class);
        assertNotNull(event);
        assertTrue(event.getEvents().length > 0);
    }

    private JsonParser getParser(String json)
    {
        JsonParser parser = null;
        try {
            parser = jsonFactory.createParser(json);
            parser.setCodec(new ObjectMapper());
        } catch (IOException e) {
            e.printStackTrace();
            fail("Invalid JSON: ||START||" + json + "||END||");
        }
        return parser;
    }
}
