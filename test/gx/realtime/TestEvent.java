package gx.realtime;

public class TestEvent extends BaseModelEvent
{

    private TestObject object;

    public TestEvent(EventType type, CollaborativeObject target, String sessionId, String userId, boolean isLocal, boolean bubbles)
    {
        super(type, target, sessionId, userId, isLocal, bubbles);
    }

    public TestObject getTestObject()
    {
        return object;
    }
}