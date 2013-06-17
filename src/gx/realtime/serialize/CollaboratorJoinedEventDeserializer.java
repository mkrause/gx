package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import gx.realtime.Collaborator;
import gx.realtime.CollaboratorJoinedEvent;

import java.io.IOException;

public class CollaboratorJoinedEventDeserializer extends JsonDeserializer<CollaboratorJoinedEvent>
{
    @Override
    public CollaboratorJoinedEvent deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        return new CollaboratorJoinedEvent(null, jp.readValueAs(Collaborator.class));
    }
}