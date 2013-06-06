package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import gx.realtime.operation.Operation;
import org.junit.Test;

import java.io.IOException;

import static junit.framework.TestCase.assertNotNull;
import static junit.framework.TestCase.fail;

/**
 *
 */
public class OperationDeserializerTest extends DeserializerTestHelper
{
    final String emptyType9Operation = "[9]";
    private JsonFactory jsonFactory = new JsonFactory();

    @Test
    public void testDeserialize_single() throws Exception
    {
        JsonParser parser = getParser(emptyType9Operation);

        Operation event = parser.readValueAs(Operation.class);
        assertNotNull("Empty operation of type 9 should be parsed correctly", event);
    }
}
