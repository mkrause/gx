package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import gx.realtime.BaseModelEvent;
import gx.realtime.Collaborator;
import gx.realtime.CollaboratorJoinedEvent;
import gx.realtime.ObjectChangedEvent;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ObjectChangedEventDeserializer extends JsonDeserializer<ObjectChangedEvent>
{
    @Override
    public ObjectChangedEvent deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        // TODO: pass parameters along
        return new ObjectChangedEvent(null, null, null, false, new BaseModelEvent[0]);
    }
}