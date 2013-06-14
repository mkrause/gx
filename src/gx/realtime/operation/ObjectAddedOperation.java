package gx.realtime.operation;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import gx.realtime.BaseModelEvent;
import gx.realtime.ObjectAddedEvent;
import gx.realtime.ObjectType;
import gx.realtime.serialize.ObjectAddedOperationDeserializer;

import java.util.ArrayList;
import java.util.List;

/**
 * Internal event for adding a CollabortiveObject to the model
 */
@JsonDeserialize(using = ObjectAddedOperationDeserializer.class)
public class ObjectAddedOperation extends Operation
{

    private String objectId;
    private ObjectType objectType;

    public ObjectAddedOperation(String id, ObjectType type)
    {
        this.type = Type.OBJECT_ADDED;
        this.objectId = id;
        this.objectType = type;
    }

    public List<BaseModelEvent> toEvents(String sessionId, String userId, boolean isLocal)
    {
        List<BaseModelEvent> events = new ArrayList<BaseModelEvent>();
        events.add(new ObjectAddedEvent(objectId, sessionId, userId, isLocal, objectType));
        return events;
    }

    public ObjectAddedOperation(String id, int type)
    {
        this(id, ObjectType.map(type));
    }
}
