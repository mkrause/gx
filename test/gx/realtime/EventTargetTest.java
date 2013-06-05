package gx.realtime;

import static org.junit.Assert.*;

import org.junit.Test;

public class EventTargetTest {

    @Before
    public void setUp(){
        string = new CollaborativeString(null, null);
    }

    @Test
    public void testEventListeners() {

        //TODO: test for base cases: fire event without handlers
        //TODO: test for base cases: fire event with target not this string.
        fail("TODO");

        EventHandler<TestEvent> handler = (testEvent) -> {
            TestObject testObject = (TestObject) testEvent.getTarget();
            testObject.setId(testObject.getId() + 1);
        };

        string.addEventListener(EventType.TEXT_INSERTED, handler);

        TestObject simpleObject = new TestObject(100);
        TestEvent event = new TestEvent(EventType.TEXT_INSERTED, simpleObject, "SID", "GxTestSuite", true, true);
        string.fireEvent(EventType.TEXT_INSERTED, event);
        assertEquals(101, simpleObject.getId());

        //test for multiple event types with one handler
        EventHandler<TestEvent> handler2 = (testEvent) -> {
            TestObject testObject2 = (TestObject) testEvent.getTarget();
            testObject2.setId(testObject2.getId() + 10);
        };

        string.addEventListener(EventType.TEXT_DELETED, handler2);
        TestObject testObject = new TestObject(200, simpleObject);
        TestEvent event2 = new TestEvent(EventType.TEXT_DELETED, testObject, "SID", "GxTestSuite", true, true);

        string.fireEvent(EventType.TEXT_DELETED, event2);

        assertEquals(101, simpleObject.getId());
        assertEquals(210, testObject.getId());

        string.fireEvent(EventType.TEXT_INSERTED, event2);
        assertEquals(101, simpleObject.getId());
        assertEquals(211, testObject.getId());

        //test for adding the same handler to one of the types: should be executed once
        string.addEventListener(EventType.TEXT_INSERTED, handler);
        string.fireEvent(EventType.TEXT_INSERTED, event);

        assertEquals(102, simpleObject.getId());
        assertEquals(211, testObject.getId());

        //test for multiple handlers for multiple event types
        string.addEventListener(EventType.TEXT_INSERTED, handler2);
        string.addEventListener(EventType.TEXT_DELETED, handler);

        string.fireEvent(EventType.TEXT_INSERTED, event);
        assertEquals(113, simpleObject.getId());
        assertEquals(211, testObject.getId());

        string.fireEvent(EventType.TEXT_DELETED, event);
        assertEquals(124, simpleObject.getId());
        assertEquals(211, testObject.getId());

        string.fireEvent(EventType.TEXT_INSERTED, event2);
        assertEquals(124, simpleObject.getId());
        assertEquals(222, testObject.getId());

        string.fireEvent(EventType.TEXT_DELETED, event2);
        assertEquals(124, simpleObject.getId());
        assertEquals(233, testObject.getId());

        //TODO: test on event with target unequal to this string.
        fail("TODO");
    }

}
