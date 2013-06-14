package gx.realtime;

public class ObjectAddedEvent extends Event {

    private ObjectType objectType;
    private String objectId;

    public ObjectAddedEvent(Model target, ObjectType objectType, String objectId){
        super(target, EventType.OBJECT_ADDED);
        this.objectType = objectType;
        this.objectId = objectId;
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

    public String getObjectId(){
        return objectId;
    }
}
