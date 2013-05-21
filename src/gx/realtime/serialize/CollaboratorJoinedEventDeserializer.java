package gx.realtime.serialize;

import java.io.IOException;

import gx.realtime.Collaborator;
import gx.realtime.CollaboratorJoinedEvent;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class CollaboratorJoinedEventDeserializer extends JsonDeserializer<CollaboratorJoinedEvent>
{
    @Override
    public CollaboratorJoinedEvent deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        // TODO: pass Document along as parameter
        return new CollaboratorJoinedEvent(null, jp.readValueAs(Collaborator.class));
    }
}