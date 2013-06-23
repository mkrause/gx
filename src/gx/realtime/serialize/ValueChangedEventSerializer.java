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
    public void serialize(ValueChangedEvent event, JsonGenerator jgen, SerializerProvider provider) throws IOException
    {
        Object value = event.getNewValue();

        // Write collaborative objects as their ID
        if (event.getValueType() == ValueChangedOperation.ValueType.COLLABORATIVE_OBJECT) {
            value = ((CollaborativeObject) value).getId();
        }

        // [8,"objectid","property",[21,"new"]]
        // Value changed operation
        jgen.writeStartArray();
        jgen.writeNumber(8);
        jgen.writeString(event.getTargetId());
        jgen.writeString(event.getProperty());

        // Check if key must be deleted, otherwise print value
        if(value != null) {
            jgen.writeStartArray();
            jgen.writeNumber(event.getValueType().asInt());

            // Try to serialize the object
            if (event.getValueType() == ValueChangedOperation.ValueType.COLLABORATIVE_OBJECT && value instanceof CollaborativeObject) {
                jgen.writeObject(((CollaborativeObject) value).getId());
            } else {
                jgen.writeObject(value);
            }
            jgen.writeEndArray();
        }

        jgen.writeEndArray();
    }
}
