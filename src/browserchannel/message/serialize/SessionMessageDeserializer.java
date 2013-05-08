package browserchannel.message.serialize;

import java.io.IOException;
import browserchannel.message.SessionMessage;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class SessionMessageDeserializer extends JsonDeserializer<SessionMessage>
{
    @Override
    public SessionMessage deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        // The the three values belonging to the message
        return new SessionMessage(jp.nextTextValue(), jp.nextTextValue(), jp.nextIntValue(-1));
    }
}