package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import gx.realtime.ValueChangedEvent;

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
        jgen.writeNumber(21);
        jgen.writeString(event.getNewValue());
        jgen.writeEndArray();
        jgen.writeEndArray();
        // close the two outer wrappers
        jgen.writeEndArray();
        jgen.writeEndArray();
    }
}
