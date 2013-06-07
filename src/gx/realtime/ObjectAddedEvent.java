package gx.realtime;

public class ObjectAddedEvent extends BaseModelEvent {

    private ObjectType objectType;

    public ObjectAddedEvent(String target, int type)
    {
        this(target, ObjectType.map(type));
    }

    public ObjectAddedEvent(String target, ObjectType type)
    {
        super(EventType.OBJECT_ADDED, target, null, null, true, false);
        this.objectType = type;
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
