package gx.realtime;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import gx.realtime.serialize.ObjectAddedEventSerializer;

@JsonSerialize(using = ObjectAddedEventSerializer.class)
public class ObjectAddedEvent extends BaseModelEvent
{
    private ObjectType objectType;

    public ObjectAddedEvent(String targetId, String sessionId, String userId, boolean local, int type)
    {
        this(targetId, sessionId, userId, local, ObjectType.map(type));
    }

    public ObjectAddedEvent(String targetId, String sessionId, String userId, boolean local, ObjectType type)
    {
        super(EventType.OBJECT_ADDED, targetId, sessionId, userId, local, false);
        this.objectType = type;
    }

    public int getTypeId()
    {
        return ObjectType.map(objectType);
    }

    public <T extends CollaborativeObject> Class<T> getObjectType()
    {
        Class cls = null;
        switch (objectType) {
            case COLLABORATIVE_MAP:
                cls = CollaborativeMap.class;
                break;
            case COLLABORATIVE_LIST:
                cls = CollaborativeList.class;
                break;
            case COLLABORATIVE_STRING:
                cls = CollaborativeString.class;
                break;
        }
        return cls;
    }
}
