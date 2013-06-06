package gx.realtime;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class EventTargetTest {

    private CollaborativeString string;
    private int check = 0;

    @Before
    public void setUp(){
        string = new CollaborativeString(null, null);
    }

    @Test
    public void testEventListeners() {

        EventHandler<TestEvent> handler = (testEvent) -> {
            TestObject testObject = (TestObject) testEvent.getTarget();
            testObject.setId(testObject.getId() + 1);
        };

        TestObject simpleObject = new TestObject(100);
        TestEvent event = new TestEvent(EventType.TEXT_INSERTED, simpleObject, "SID", "GxTestSuite", true, true);

        string.fireEvent(event);
        assertEquals(100, simpleObject.getId());
        assertEquals(0, check);

        string.addEventListener(EventType.TEXT_INSERTED, handler);

        string.fireEvent(event);
        assertEquals(101, simpleObject.getId());
        assertEquals(10, check);

        //test for multiple event types with one handler
        EventHandler<TestEvent> handler2 = (testEvent) -> {
            TestObject testObject2 = (TestObject) testEvent.getTarget();
            testObject2.setId(testObject2.getId() + 10);
        };

        string.addEventListener(EventType.TEXT_DELETED, handler2);
        TestObject testObject = new TestObject(200, simpleObject);
        TestEvent event2 = new TestEvent(EventType.TEXT_DELETED, testObject, "SID", "GxTestSuite", true, true);

        string.fireEvent(event2);
        assertEquals(101, simpleObject.getId());
        assertEquals(210, testObject.getId());
        assertEquals(20, check);

        //test without callback
        string.fireEvent(event2);
        assertEquals(101, simpleObject.getId());
        assertEquals(211, testObject.getId());
        assertEquals(20, check);

        //test for adding the same handler to one of the types: should be executed once
        string.addEventListener(EventType.TEXT_INSERTED, handler);
        string.fireEvent(event);

        assertEquals(102, simpleObject.getId());
        assertEquals(211, testObject.getId());
        assertEquals(30, check);

        //test for multiple handlers for multiple event types
        string.addEventListener(EventType.TEXT_INSERTED, handler2);
        string.addEventListener(EventType.TEXT_DELETED, handler);

        string.fireEvent(event);
        assertEquals(113, simpleObject.getId());
        assertEquals(211, testObject.getId());
        assertEquals(40, check);

        string.fireEvent(event);
        assertEquals(124, simpleObject.getId());
        assertEquals(211, testObject.getId());
        assertEquals(40, check);

        string.fireEvent(event2);
        assertEquals(124, simpleObject.getId());
        assertEquals(222, testObject.getId());
        assertEquals(50, check);

        string.fireEvent(event2);
        assertEquals(124, simpleObject.getId());
        assertEquals(233, testObject.getId());
        assertEquals(60, check);

        //Test with target unequal to this string.
        string.fireEvent(new TestEvent(EventType.TEXT_DELETED, new TestObject(13), "SID", "GxTestSuite", true, true));
        assertEquals(124, simpleObject.getId());
        assertEquals(233, testObject.getId());
        assertEquals(60, check);
    }
}
