package gx.realtime;

import static org.junit.Assert.*;

import gx.realtime.EventType;
import org.junit.Before;
import org.junit.Test;
import static org.mockito.Mockito.*;

public class EventTargetTest
{
    TestObject object1 = new TestObject(100);
    TestObject object2 = new TestObject(110);
    TestObject object3 = new TestObject(210);
    TestObject object4 = new TestObject(310);
    TestObject object5 = new TestObject(410);
    TestObject object6 = new TestObject(510);
    TestEvent insertedEvent = new TestEvent(EventType.TEXT_INSERTED, object1, "SID", "GxTestSuite", true, false);
    TestEvent deletedEvent = new TestEvent(EventType.TEXT_DELETED, object1, "SID", "GxTestSuite", true, false);
    TestEvent changedEvent = new TestEvent(EventType.OBJECT_CHANGED, object1, "SID", "UID", true, true);

    //Event handlers
    public EventHandler<TestEvent> handler1 = (testEvent) ->
    {
        //System.out.println("--EventHandler 1 called.");
        TestObject testObject = (TestObject) testEvent.getTarget();
        testObject.incrementId(1);
    };

    public EventHandler<TestEvent> handler2 = (testEvent) ->
    {
        //System.out.println("--EventHandler2 called.");
        TestObject testObject2 = (TestObject) testEvent.getTarget();
        testObject2.incrementId(10);
    };

    @Test
    public void testAddEventListener()
    {
        EventTarget target = new EventTarget() {};
        EventHandler<ObjectChangedEvent> handler = mock(EventHandler.class);
        target.addEventListener(EventType.OBJECT_CHANGED, handler);

        target.fireEvent(new ObjectChangedEvent(target, null, null, true, null));

        verify(handler).handleEvent(isA(ObjectChangedEvent.class));
    }

    @Test
    public void testRemoveEventListener()
    {
        EventTarget target = new EventTarget() {};
        EventHandler<ObjectChangedEvent> handler = mock(EventHandler.class);
        target.addEventListener(EventType.OBJECT_CHANGED, handler);

        // Remove the handler we just added
        target.removeEventListener(EventType.OBJECT_CHANGED, handler);

        target.fireEvent(new ObjectChangedEvent(target, null, null, true, null));

        verify(handler, never()).handleEvent(isA(ObjectChangedEvent.class));
    }

    @Test
    public void testRemovingNonexistentEventListenerIsIgnored()
    {
        EventTarget target = new EventTarget() {};

        // Remove the handler (which we never added in the first place)
        EventHandler<ObjectChangedEvent> handler = mock(EventHandler.class);
        target.removeEventListener(EventType.OBJECT_CHANGED, handler);

        // Expected: no exception thrown
    }

    @Test
    public void testEventListenersNoHandlers()
    {
        object1.fireEvent(insertedEvent);
        object1.fireEvent(deletedEvent);
        assertEquals(100, object1.getId());
    }

    @Test
    public void testEventListenersInsertHandler()
    {
        //fire events with handler1 registered for inserted event.
        object1.addEventListener(insertedEvent.getType(), handler1);
        object1.fireEvent(insertedEvent);
        assertEquals(101, object1.getId());
        object1.fireEvent(deletedEvent);
        assertEquals(101, object1.getId());
    }

    @Test
    public void testEventListenersInsertDeleteHandlers()
    {
        //fire events with handler1 registered for deleted event.
        object1.addEventListener(insertedEvent.getType(), handler1);
        object1.addEventListener(deletedEvent.getType(), handler1);
        object1.fireEvent(insertedEvent);
        assertEquals(101, object1.getId());
        object1.fireEvent(deletedEvent);
        assertEquals(102, object1.getId());
    }

    @Test
    public void testEventListenersTwoHandlers()
    {
        //fire events for both handlers registered for inserted event.
        object1.addEventListener(insertedEvent.getType(), handler1);
        object1.addEventListener(insertedEvent.getType(), handler2);
        object1.addEventListener(deletedEvent.getType(), handler1);
        object1.fireEvent(insertedEvent);
        assertEquals(111, object1.getId());
        object1.fireEvent(deletedEvent);
        assertEquals(112, object1.getId());
    }

    @Test
    public void testEventListenersDuplicateHandlers()
    {
        //fire events for duplicate handler1 registered for inserted event.
        object1.addEventListener(insertedEvent.getType(), handler1);
        object1.addEventListener(insertedEvent.getType(), handler1);
        object1.addEventListener(insertedEvent.getType(), handler2);
        object1.addEventListener(deletedEvent.getType(), handler1);
        object1.fireEvent(insertedEvent);
        assertEquals(111, object1.getId());
        object1.fireEvent(deletedEvent);
        assertEquals(112, object1.getId());
    }

    @Test
    public void testEventListenersTwoHandlers2()
    {
        //fire events for both handlers registered for both event types.
        object1.addEventListener(insertedEvent.getType(), handler1);
        object1.addEventListener(insertedEvent.getType(), handler2);
        object1.addEventListener(deletedEvent.getType(), handler1);
        object1.addEventListener(deletedEvent.getType(), handler2);
        object1.fireEvent(insertedEvent);
        assertEquals(111, object1.getId());
        object1.fireEvent(deletedEvent);
        assertEquals(122, object1.getId());
    }

    @Test
    public void testEventListenerEvent()
    {
        //test with normal events instead of BaseModelEvents
        TestObject simpleObject = new TestObject(100);

        //Events
        TestEvent joinedEvent = new TestEvent(EventType.COLLABORATOR_JOINED, simpleObject, "SID", "GxTestSuite", true, false);
        simpleObject.addEventListener(EventType.COLLABORATOR_JOINED, handler1);
        simpleObject.fireEvent(joinedEvent);

        assertEquals(101, simpleObject.getId());
    }

    @Test
    public void testEventBubblingWithoutParents()
    {
        // Create tree
        object1.addEventListener(EventType.OBJECT_CHANGED, handler1);

        object1.fireEvent(changedEvent);
        assertEquals(101, object1.getId());
    }

    @Test
    public void testEventBubblingOneParent()
    {
        // Create tree
        object1.addEventListener(EventType.OBJECT_CHANGED, handler1);
        object1.addChild(object2);

        System.out.println("--Firing event on object 2 with object 1 as parent");
        object2.fireEvent(changedEvent);
        assertEquals(101, object1.getId());
        assertEquals(110, object2.getId());
    }

    @Test
    public void testEventBubblingThreeParents()
    {
        // Create tree
        object1.addEventListener(EventType.OBJECT_CHANGED, handler1);
        object1.addChild(object2);
        object3.addChild(object2);
        object4.addChild(object2);

        object2.fireEvent(changedEvent);
        assertEquals(101, object1.getId());
        assertEquals(210, object3.getId());
        assertEquals(310, object4.getId());
    }

    @Test
    public void testEventBubblingTwoLayersParents()
    {
        // Two layers of parents, object 5 is leaf node.

        // Create tree
        object1.addEventListener(EventType.OBJECT_CHANGED, handler1);
        object1.addChild(object2);
        object3.addChild(object2);
        object4.addChild(object2);
        object2.addChild(object5);
        object6.addChild(object5);

        object5.fireEvent(changedEvent);
        assertEquals(101, object1.getId());
        assertEquals(210, object3.getId());
        assertEquals(310, object4.getId());
        assertEquals(410, object5.getId());
        assertEquals(510, object6.getId());

        //test if not fired twice
        object1.addChild(object5);
        object5.fireEvent(changedEvent);
        assertEquals(101, object1.getId());
        assertEquals(210, object3.getId());
        assertEquals(310, object4.getId());
        assertEquals(410, object5.getId());
        assertEquals(510, object6.getId());
    }

    @Test
    public void testObjectChangedEvent()
    {
        //TODO
        fail("TODO");
    }
}
