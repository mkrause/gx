package gx.browserchannel.message.serialize;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import gx.browserchannel.message.SessionMessage;

import java.io.IOException;

public class SessionMessageDeserializer extends JsonDeserializer<SessionMessage>
{
    @Override
    public SessionMessage deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        // The the three values belonging to the message
        return new SessionMessage(jp.nextTextValue(), jp.nextTextValue(), jp.nextIntValue(-1));
    }
}