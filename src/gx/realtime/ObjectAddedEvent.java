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
}
