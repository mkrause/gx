package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import gx.realtime.BaseModelEvent;
import gx.realtime.CompoundOperation;
import gx.realtime.RevertableEvent;

import java.io.IOException;
import java.util.List;

/**
 *
 */
public class CompoundOperationSerializer extends StdSerializer<CompoundOperation>
{
    public CompoundOperationSerializer()
    {
        super(CompoundOperation.class);
    }

    @Override
    public void serialize(CompoundOperation event, JsonGenerator jgen, SerializerProvider provider) throws IOException
    {
        List<BaseModelEvent> events = event.getEvents();

        // [4,[0,[operations]]]]
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

        // close the outer wrapper
        jgen.writeEndArray();

        if(event.getName() != null) {
            jgen.writeString(event.getName());
        }

        // close the outer wrapper
        jgen.writeEndArray();
    }
}
