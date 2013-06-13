package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import gx.realtime.operation.CompoundOperation;
import gx.realtime.operation.ObjectAddedOperation;
import gx.realtime.operation.Operation;
import gx.realtime.operation.ValueChangedOperation;
import org.junit.Test;

import java.io.IOException;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertNull;
import static junit.framework.TestCase.assertNotNull;
import static junit.framework.TestCase.fail;

/**
 *
 */
public class OperationDeserializerTest extends DeserializerTestHelper
{
    final String emptyType9Operation = "[9]";
    final String compoundOperation = "[4,[0,[9],[9],[9]]]";
    final String objectAddedOperation = "[7,\"objectid\",0]";
    final String valueChangedOperation = "[8,\"objectid\",\"key\",[1,\"new value\"]]";
    final String valueRemovedOperation = "[8,\"objectid\",\"key\"]";
    private JsonFactory jsonFactory = new JsonFactory();

    @Test
    public void testDeserialize_single() throws Exception
    {
        JsonParser parser = getParser(emptyType9Operation);

        Operation event = parser.readValueAs(Operation.class);
        assertNotNull("Empty operation of type 9 should be parsed correctly", event);
    }

    @Test
    public void testDeserialize_compound() throws Exception
    {
        JsonParser parser = getParser(compoundOperation);

        CompoundOperation event = (CompoundOperation)parser.readValueAs(Operation.class);
        assertNotNull("Compound operation should be parsed correctly", event);
        assertEquals(3, event.getOperations().length);
    }

    @Test
    public void testDeserialize_objectAdded() throws Exception
    {
        JsonParser parser = getParser(objectAddedOperation);

        ObjectAddedOperation event = (ObjectAddedOperation)parser.readValueAs(Operation.class);
        assertNotNull("ObjectAdded operation should be parsed correctly", event);
    }

    @Test
    public void testDeserialize_valueChanged() throws Exception
    {
        JsonParser parser = getParser(valueChangedOperation);

        ValueChangedOperation event = (ValueChangedOperation)parser.readValueAs(Operation.class);
        assertNotNull("ValueChanged operation should be parsed correctly", event);
    }

    @Test
    public void testDeserialize_valueRemoved() throws Exception
    {
        JsonParser parser = getParser(valueRemovedOperation);

        ValueChangedOperation event = (ValueChangedOperation)parser.readValueAs(Operation.class);
        assertNotNull("ValueChanged operation should be parsed correctly", event);
    }
}
