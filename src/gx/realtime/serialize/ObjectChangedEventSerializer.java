package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import gx.realtime.BaseModelEvent;
import gx.realtime.CollaborativeObject;
import gx.realtime.ObjectChangedEvent;
import gx.realtime.ValueChangedEvent;
import gx.realtime.operation.ValueChangedOperation;

import java.io.IOException;
import java.util.List;

/**
 *
 */
public class ObjectChangedEventSerializer extends StdSerializer<ObjectChangedEvent>
{
    public ObjectChangedEventSerializer()
    {
        super(ObjectChangedEvent.class);
    }

    @Override
    public void serialize(ObjectChangedEvent event, JsonGenerator jgen, SerializerProvider provider) throws IOException
    {
        List<BaseModelEvent> events = event.getEvents();

        // [4,[0,[8,"objectid","property",[21,"new"]]]]
        // Print the outer wrapper (compound operation)
        jgen.writeStartArray();
        jgen.writeNumber(4);

        // print 0-wrapper
        jgen.writeStartArray();
        jgen.writeNumber(0);

        // print contained events
        for (BaseModelEvent e : events) {
            jgen.writeObject(e);
        }

        // close the two outer wrappers
        jgen.writeEndArray();
        jgen.writeEndArray();
    }
}
