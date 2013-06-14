package gx.realtime;

public class TestEvent extends BaseModelEvent
{

    private TestObject object;

    public TestEvent(EventType type, EventTarget target, String sessionId, String userId, boolean isLocal, boolean bubbles)
    {
        super(type, target, sessionId, userId, isLocal, bubbles);
    }

    public TestObject getTestObject()
    {
        return object;
    }
}