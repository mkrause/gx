package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import gx.realtime.ValueChangedEvent;
import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.assertEquals;
import static junit.framework.TestCase.assertNotNull;
import static junit.framework.TestCase.fail;

/**
 *
 */
public class ValueChangedEventDeserializerTest
{
    final String singleJson = "[5,\"gde99vx3khg7uko2g\",3,[0,[21,\"fooz\"]]]";
    private JsonFactory jsonFactory = new JsonFactory();

    @Test
    public void testDeserialize_single() throws Exception
    {
        JsonParser parser = getParser(singleJson);

        ValueChangedEvent event = parser.readValueAs(ValueChangedEvent.class);
        assertNotNull(event);
        assertEquals("fooz", event.getNewValue());
        assertEquals(21, event.getProperty());
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
