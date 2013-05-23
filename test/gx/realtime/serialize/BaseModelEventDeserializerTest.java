package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import gx.realtime.ValueChangedEvent;
import org.junit.Test;

import java.io.IOException;

import static junit.framework.TestCase.assertNotNull;
import static junit.framework.TestCase.fail;

/**
 *
 */
public class BaseModelEventDeserializerTest
{
    final String singleJson = "[0,[5,\"gde99vx3khg7uko2g\",0,[0,[21,\"bar\"]]]]";

    private JsonFactory jsonFactory = new JsonFactory();

    @Test
    public void testDeserialize_single() throws Exception
    {
        JsonParser parser = getParser(singleJson);

        ValueChangedEvent event = parser.readValueAs(ValueChangedEvent.class);
        assertNotNull(event);
    }

    private JsonParser getParser(String json) {
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
