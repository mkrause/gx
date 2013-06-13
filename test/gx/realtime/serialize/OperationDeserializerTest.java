package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonParser;
import gx.realtime.BaseModelEvent;
import gx.realtime.operation.CompoundOperation;
import gx.realtime.operation.ObjectAddedOperation;
import gx.realtime.operation.Operation;
import gx.realtime.operation.ValueChangedOperation;
import org.junit.Test;

import java.util.List;

import static junit.framework.Assert.*;
import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertNotNull;

/**
 *
 */
public class OperationDeserializerTest extends DeserializerTestHelper
{
    final String emptyType9Operation = "[9]";
    final String objectAddedOperation = "[7,\"objectid\",0]";
    final String emptyCompoundOperation = "[4,[0]]";
    final String compound9Operation = "[4,[0,[9],[9],[9]]]";
    final String compoundOperation = "[4,[0,"+objectAddedOperation+","+objectAddedOperation+","+objectAddedOperation+"]]";
    final String valueChangedOperation = "[8,\"objectid\",\"key\",[1,\"new value\"]]";
    final String valueRemovedOperation = "[8,\"objectid\",\"key\"]";

    @Test
    public void testDeserialize_single() throws Exception
    {
        JsonParser parser = getParser(emptyType9Operation);

        Operation event = parser.readValueAs(Operation.class);
        assertNotNull("Empty operation of type 9 should be parsed correctly", event);
    }

    @Test
    public void testDeserialize_empty_compound() throws Exception
    {
        JsonParser parser = getParser(emptyCompoundOperation);

        CompoundOperation operation = (CompoundOperation)parser.readValueAs(Operation.class);
        assertNotNull("Compound operation should be parsed correctly", operation);
        assertEquals(0, operation.getOperations().length);
        assertEquals(0, operation.toEvents("sessId", "userId", false).size());
    }

    @Test
    public void testDeserialize_9_compound() throws Exception
    {
        JsonParser parser = getParser(compound9Operation);

        CompoundOperation operation = (CompoundOperation)parser.readValueAs(Operation.class);
        assertNotNull("Compound operation should be parsed correctly", operation);
        assertEquals(3, operation.getOperations().length);
        assertEquals(0, operation.toEvents("sessId", "userId", false).size());
    }

    @Test
    public void testDeserialize_compound() throws Exception
    {
        JsonParser parser = getParser(compoundOperation);

        CompoundOperation operation = (CompoundOperation)parser.readValueAs(Operation.class);
        assertNotNull("Compound operation should be parsed correctly", operation);
        assertEquals(3, operation.getOperations().length);
        List<BaseModelEvent> events = operation.toEvents("sessId", "userId", false);
        assertEquals(3, events.size());
    }

    @Test
    public void testDeserialize_objectAdded() throws Exception
    {
        JsonParser parser = getParser(objectAddedOperation);

        ObjectAddedOperation operation = (ObjectAddedOperation)parser.readValueAs(Operation.class);
        assertNotNull("ObjectAdded operation should be parsed correctly", operation);
        assertEquals(1, operation.toEvents("sessId", "userId", false).size());
    }

    @Test
    public void testDeserialize_valueChanged() throws Exception
    {
        JsonParser parser = getParser(valueChangedOperation);

        ValueChangedOperation operation = (ValueChangedOperation)parser.readValueAs(Operation.class);
        assertNotNull("ValueChanged operation should be parsed correctly", operation);
        assertFalse("ValueChanged operation should not be a remove operation", operation.isRemoveOperation());
        assertEquals(1, operation.toEvents("sessId", "userId", false).size());
    }

    @Test
    public void testDeserialize_valueRemoved() throws Exception
    {
        JsonParser parser = getParser(valueRemovedOperation);

        ValueChangedOperation operation = (ValueChangedOperation)parser.readValueAs(Operation.class);
        assertNotNull("ValueChanged operation should be parsed correctly", operation);
        assertTrue("ValueChanged operation should be a remove operation", operation.isRemoveOperation());
        assertEquals(1, operation.toEvents("sessId", "userId", false).size());
    }
}
