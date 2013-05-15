package gx.realtime.serialize;

import gx.realtime.CollaboratorJoinedEvent;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class CollaboratorJoinedEventDeserializer extends JsonDeserializer<CollaboratorJoinedEvent>
{
    @Override
    public CollaboratorJoinedEvent deserialize(JsonParser jp, DeserializationContext ctxt) throws JsonProcessingException
    {
        // TODO: implement
        //return new CollaboratorJoinedEvent();
        return null;
    }
}