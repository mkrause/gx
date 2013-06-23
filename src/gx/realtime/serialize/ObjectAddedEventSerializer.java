package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import gx.realtime.CollaborativeObject;
import gx.realtime.ObjectAddedEvent;
import gx.realtime.ValueChangedEvent;
import gx.realtime.operation.ValueChangedOperation;

import java.io.IOException;

/**
 *
 */
public class ObjectAddedEventSerializer extends StdSerializer<ObjectAddedEvent>
{
    public ObjectAddedEventSerializer()
    {
        super(ObjectAddedEvent.class);
    }

    @Override
    public void serialize(ObjectAddedEvent event, JsonGenerator jgen, SerializerProvider provider) throws IOException
    {
        // [7,"objectid",type]
        // Object added operation
        jgen.writeStartArray();
        jgen.writeNumber(7);
        jgen.writeString(event.getTargetId());
        jgen.writeNumber(event.getTypeId());
        jgen.writeEndArray();
    }
}
