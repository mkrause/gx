package gx.realtime;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import static org.mockito.Mockito.*;

public class EventTargetTest {
    
    @Test
    public void testAddEventListener() {
        EventTarget target = new EventTarget() {};
        EventHandler<ObjectChangedEvent> handler = mock(EventHandler.class);
        target.addEventListener(EventType.OBJECT_CHANGED, handler);
        
        target.fireEvent(new ObjectChangedEvent(target, null, null, true, null));
        
        verify(handler).handleEvent(isA(ObjectChangedEvent.class));
    }
    
    @Test
    public void testRemoveEventListener() {
        EventTarget target = new EventTarget() {};
        EventHandler<ObjectChangedEvent> handler = mock(EventHandler.class);
        target.addEventListener(EventType.OBJECT_CHANGED, handler);
        
        // Remove the handler we just added
        target.removeEventListener(EventType.OBJECT_CHANGED, handler);
        
        target.fireEvent(new ObjectChangedEvent(target, null, null, true, null));
        
        verify(handler, never()).handleEvent(isA(ObjectChangedEvent.class));
    }

    @Test
    public void testRemovingNonexistentEventListenerIsIgnored() {
        EventTarget target = new EventTarget() {};
        
        // Remove the handler (which we never added in the first place)
        EventHandler<ObjectChangedEvent> handler = mock(EventHandler.class);
        target.removeEventListener(EventType.OBJECT_CHANGED, handler);
        
        // Expected: no exception thrown
    }
    
    @Test
    public void testEventListeners() {

        TestObject simpleObject = new TestObject(100);

        //Event handlers
        EventHandler<TestEvent> handler1 = (testEvent) -> {
            //System.out.println("--EventHandler 1 called.");
            TestObject testObject = (TestObject) testEvent.getTarget();
            testObject.setId(testObject.getId() + 1);
        };
        
        EventHandler<TestEvent> handler2 = (testEvent) -> {
            //System.out.println("--EventHandler2 called.");
            TestObject testObject2 = (TestObject) testEvent.getTarget();
            testObject2.setId(testObject2.getId() + 10);
        };

        //Events
        TestEvent insertedEvent = new TestEvent(EventType.TEXT_INSERTED, simpleObject, "SID", "GxTestSuite", true, false);
        TestEvent deletedEvent = new TestEvent(EventType.TEXT_DELETED, simpleObject, "SID", "GxTestSuite", true, false);

        //fire event with no handlers registered.
        simpleObject.fireEvent(insertedEvent);
        simpleObject.fireEvent(deletedEvent);
        assertEquals(100, simpleObject.getId());

        //fire events with handler1 registered for inserted event.
        simpleObject.addEventListener(insertedEvent.getType(), handler1);
        simpleObject.fireEvent(insertedEvent);
        assertEquals(101, simpleObject.getId());
        simpleObject.fireEvent(deletedEvent);
        assertEquals(101, simpleObject.getId());

        //fire events with handler1 registered for deleted event.
        simpleObject.addEventListener(deletedEvent.getType(), handler1);
        simpleObject.fireEvent(insertedEvent);
        assertEquals(102, simpleObject.getId());
        simpleObject.fireEvent(deletedEvent);
        assertEquals(103, simpleObject.getId());

        //fire events for both handlers registered for inserted event.
        simpleObject.addEventListener(insertedEvent.getType(), handler2);
        simpleObject.fireEvent(insertedEvent);
        assertEquals(114, simpleObject.getId());
        simpleObject.fireEvent(deletedEvent);
        assertEquals(115, simpleObject.getId());

        //fire events for duplicate handler1 registered for inserted event.
        simpleObject.addEventListener(insertedEvent.getType(), handler1);
        simpleObject.fireEvent(insertedEvent);
        assertEquals(126, simpleObject.getId());
        simpleObject.fireEvent(deletedEvent);
        assertEquals(127, simpleObject.getId());

        //fire events for both handlers registered for both event types.
        simpleObject.addEventListener(deletedEvent.getType(), handler2);
        simpleObject.fireEvent(insertedEvent);
        assertEquals(138, simpleObject.getId());
        simpleObject.fireEvent(deletedEvent);
        assertEquals(149, simpleObject.getId());

        //fire events for duplicate registration of handler2 for deleted type
        simpleObject.addEventListener(deletedEvent.getType(), handler2);
        simpleObject.fireEvent(insertedEvent);
        assertEquals(160, simpleObject.getId());
        simpleObject.fireEvent(deletedEvent);
        assertEquals(171, simpleObject.getId());
    }

    @Test
    public void testEventBubbling(){
        //TODO
        fail("TODO");
    }
}
