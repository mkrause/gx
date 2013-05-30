package gx.browserchannel.message.serialize;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import gx.browserchannel.message.SaveMessage;

import java.io.IOException;

/**
 *
 */
public class SaveMessageSerializer extends StdSerializer<SaveMessage>
{

    protected SaveMessageSerializer()
    {
        super(SaveMessage.class);
    }

    @Override
    public void serialize(SaveMessage saveMessage, JsonGenerator jg, SerializerProvider serializerProvider) throws IOException, JsonGenerationException
    {
        jg.writeStartObject();
        jg.writeNumberField("revision", saveMessage.getRevision());
        jg.writeNumberField("requestNumber", saveMessage.getRequestNumber());
        jg.writeArrayFieldStart("changes");

        ObjectMapper mapper = new ObjectMapper();
        String output = mapper.writeValueAsString(saveMessage.getEvent());
        jg.writeRaw(output);

        jg.writeEndArray();
        jg.writeEndObject();
    }
}
