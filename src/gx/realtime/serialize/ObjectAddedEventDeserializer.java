package gx.realtime.serialize;

import java.io.IOException;

import gx.realtime.ObjectAddedEvent;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class ObjectAddedEventDeserializer extends JsonDeserializer<ObjectAddedEvent>
{
    @Override
    public ObjectAddedEvent deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        String objectId = jp.nextTextValue();
        int objectType = jp.nextIntValue(-1);
        // TODO: create CollaborativeObject here or in message handler ?
        
        // TODO: give correct parameters
        return new ObjectAddedEvent(null, "sid", "uid", false);
    }
}