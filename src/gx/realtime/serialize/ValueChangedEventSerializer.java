package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import gx.realtime.CollaborativeObject;
import gx.realtime.ValueChangedEvent;
import gx.realtime.operation.ValueChangedOperation;

import java.io.IOException;

/**
 *
 */
public class ValueChangedEventSerializer extends StdSerializer<ValueChangedEvent>
{
    public ValueChangedEventSerializer()
    {
        super(ValueChangedEvent.class);
    }

    @Override
    public void serialize(ValueChangedEvent event, JsonGenerator jgen, SerializerProvider provider) throws IOException,
            JsonProcessingException
    {
        Object value = event.getNewValue();

        // Write collaborative objects as their ID
        if (event.getValueType() == ValueChangedOperation.ValueType.COLLABORATIVE_OBJECT) {
            value = ((CollaborativeObject) value).getId();
        }

        // [4,[0,[8,"objectid","property",[21,"new"]]]]
        // Print the outer wrapper
        jgen.writeStartArray();
        jgen.writeNumber(4);

        // print 0-wrapper
        jgen.writeStartArray();
        jgen.writeNumber(0);

        jgen.writeStartArray();
        jgen.writeNumber(8);
        jgen.writeString(event.getTargetId());
        jgen.writeString(event.getProperty());
        jgen.writeStartArray();
        jgen.writeNumber(event.getValueType().asInt());

        // Try to serialize the object
        jgen.writeObject(value);

        jgen.writeEndArray();
        jgen.writeEndArray();
        // close the two outer wrappers
        jgen.writeEndArray();
        jgen.writeEndArray();
    }
}
