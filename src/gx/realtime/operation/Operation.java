package gx.realtime.operation;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import gx.realtime.BaseModelEvent;
import gx.realtime.serialize.OperationDeserializer;

import java.util.List;

@JsonDeserialize(using = OperationDeserializer.class)
public abstract class Operation
{
    protected Type type;

    public abstract List<BaseModelEvent> toEvents(String sessionId, String userId, boolean isLocal);

    public enum Type
    {
        OBJECT_ADDED,
        VALUE_CHANGED,
        COMPOUND,
        ACK
    }
}
