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
public class BaseModelEventDeserializerTest extends DeserializerTestHelper
{
    final String singleJson = "[0,[5,\"gde99vx3khg7uko2g\",0,[0,[21,\"bar\"]]]]";

    @Test
    public void testDeserialize_single() throws Exception
    {
        JsonParser parser = getParser(singleJson);

        ValueChangedEvent event = parser.readValueAs(ValueChangedEvent.class);
        assertNotNull(event);
    }


}
