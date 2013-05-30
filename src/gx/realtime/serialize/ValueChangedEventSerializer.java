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
        // [8,"sessid","property",[21,"new"]]
        jgen.writeStartArray();
        jgen.writeNumber(8);
        jgen.writeString(event.getSessionId());
        jgen.writeString(event.getProperty());
        jgen.writeStartArray();
        jgen.writeNumber(21);
        jgen.writeString(event.getNewValue());
        jgen.writeEndArray();
        jgen.writeEndArray();
    }
}
