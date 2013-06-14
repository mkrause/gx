package gx.realtime.operation;

import gx.realtime.*;
import gx.realtime.serialize.ObjectAddedOperationDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.ArrayList;
import java.util.List;

/**
 * Internal event for adding a CollabortiveObject to the model
 * 
 */
@JsonDeserialize(using = ObjectAddedOperationDeserializer.class)
public class ObjectAddedOperation extends Operation {

    private String objectId;
    private ObjectType objectType;
    
    public ObjectAddedOperation(String id, ObjectType type)
    {
        this.type = Type.OBJECT_ADDED;
        this.objectId = id;
        this.objectType = type;
    }

    @Override
    public List<Event> toEvents(String sessionId, String userId, boolean isLocal)
    {
        List<Event> events = new ArrayList<Event>();
        events.add(new ObjectAddedEvent(objectType, objectId));
        return events;
    }
    
    public ObjectAddedOperation(String id, int type)
    {
        this(id, ObjectType.map(type));
    }
}
