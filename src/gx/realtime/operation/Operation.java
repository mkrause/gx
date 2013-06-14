package gx.realtime.operation;

import gx.realtime.BaseModelEvent;
import gx.realtime.Event;
import gx.realtime.Model;
import gx.realtime.serialize.OperationDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.ArrayList;
import java.util.List;

@JsonDeserialize(using = OperationDeserializer.class)
public abstract class Operation
{
    protected Type type;

    public abstract List<Event> toEvents(Model model, String sessionId, String userId, boolean isLocal);
    
    public enum Type
    {
        OBJECT_ADDED,
        VALUE_CHANGED,
        COMPOUND,
        ACK
    }
}
