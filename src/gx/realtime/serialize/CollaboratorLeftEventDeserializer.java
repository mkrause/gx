package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import gx.realtime.Collaborator;
import gx.realtime.CollaboratorLeftEvent;

import java.io.IOException;

public class CollaboratorLeftEventDeserializer extends JsonDeserializer<CollaboratorLeftEvent>
{
    @Override
    public CollaboratorLeftEvent deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        // TODO: pass Document along as parameter
        return new CollaboratorLeftEvent(null, jp.readValueAs(Collaborator.class));
    }
}