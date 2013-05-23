package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import gx.realtime.BaseModelEvent;
import gx.realtime.ObjectChangedEvent;

import java.io.IOException;

public class ObjectChangedEventDeserializer extends JsonDeserializer<ObjectChangedEvent>
{
    @Override
    public ObjectChangedEvent deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        int sequenceNumber = jp.nextIntValue(-1);
        String targetId = jp.nextTextValue();
        String userId = jp.nextTextValue();
        String sessionId = jp.nextTextValue();

        // TODO: parse BaseModelEvents
        return new ObjectChangedEvent(null, sessionId, userId, false, new BaseModelEvent[0]);
    }
}