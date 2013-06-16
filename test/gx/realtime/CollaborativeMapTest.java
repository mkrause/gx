package gx.realtime;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.AbstractMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;

public class CollaborativeMapTest {

    private static TestObject simpleObject;
    private static TestObject testObject;
    private static CollaborativeMap map;

    @Before
    public void setUp(){
        Session session = mock(Session.class);
        when(session.getSessionId()).thenReturn("UID");

        Document document = mock(Document.class);
        when(document.getSession()).thenReturn(session);
        Model model = mock(Model.class);
        when(model.getDocument()).thenReturn(document);

        map = new CollaborativeMap("map1234", model);
        assertEquals(0, map.size());
        assertTrue(map.isEmpty());

        simpleObject = new TestObject(123);
        testObject = new TestObject(456, simpleObject);
    }

    @Test
    public void testItems(){
        assertTrue(map.items().isEmpty());

        map.set("123", simpleObject);
        map.set("456", testObject);

        assertEquals(2, map.size());
        assertFalse(map.isEmpty());

        Set<Entry<String, Object>> items = map.items();
        assertEquals(2, items.size());

        //check if they are actually clones
        Iterator<Entry<String, Object>> iterator = items.iterator();
        Entry<String, Object> obj1 = iterator.next();
        Entry<String, Object> obj2 = iterator.next();

        if(obj1.getKey().equals("123")){
            assertEquals(simpleObject, obj1.getValue());
            assertEquals(testObject, obj2.getValue());
            assertFalse(simpleObject == obj1.getValue());
            assertFalse(testObject == obj2.getValue());
        } else {
            assertEquals(testObject, obj1.getValue());
            assertEquals(simpleObject, obj2.getValue());
            assertFalse(testObject == obj1.getValue());
            assertFalse(simpleObject == obj2.getValue());
        }
    }

    @Test
    public void testValues(){
        assertEquals(0, map.values().size());

        map.set("123", simpleObject);
        map.set("456", testObject);

        List<Object> values = map.values();
        System.out.println("List: " + values);
        assertEquals(2, values.size());

        TestObject obj1 = (TestObject)values.get(0);
        TestObject obj2 = (TestObject)values.get(1);
        if(obj1.getId() == 123){
            //obj1 =  simpleObject, obj2 = testObject
            assertEquals(simpleObject, obj1);
            assertEquals(testObject, obj2);
            assertFalse(simpleObject == obj1);
            assertFalse(testObject == obj2);
        } else if(obj1.getId() == 456) {
            //obj1 = testObject, obj2 = simpleObject
            assertEquals(testObject, obj1);
            assertEquals(simpleObject, obj2);
            assertFalse(testObject == obj1);
            assertFalse(simpleObject == obj2);
        } else {
            fail("Unknown element found in list");
        }
    }

    private EventHandler<BaseModelEvent> handler1 = (event) -> {
        //System.out.println("--EventHandler 1 called.");
        CollaborativeMap map = (CollaborativeMap) event.getTarget();
        ((TestObject) map.get("testObject")).incrementId(1);
    };

    @Test
    public void testSet()
    {
        TestObject testObject = new TestObject(10);
        map.set("testObject", testObject);
        assertFalse(map.isEmpty());
        assertEquals(1, map.size());
        assertTrue(map.has("testObject"));
        assertTrue(map.get("testObject") == testObject);

        map.addEventListener(EventType.OBJECT_CHANGED, handler1);

        //test for objectChangedEvent
        TestObject object2 = new TestObject(100);
        map.set("object2", object2);
        assertEquals(2, map.size());
        assertTrue(map.has("testObject"));
        assertTrue(map.get("testObject") == testObject);
        assertTrue(map.has("object2"));
        assertTrue(map.get("object2") == object2);

        assertEquals(11, testObject.getId());

        //test for set to null
        map.set("object2", null);
        assertEquals(1, map.size());
        assertFalse(map.has("object2"));
        assertNull(map.get("object2"));
        assertTrue(map.has("testObject"));
        assertTrue(map.get("testObject") == testObject);

        assertEquals(12, testObject.getId());
    }

    @Test
    public void testDelete()
    {
        TestObject testObject = new TestObject(10);
        map.set("testObject", testObject);
        assertEquals(1, map.size());

        map.addEventListener(EventType.OBJECT_CHANGED, handler1);

        //test for objectChangedEvent
        TestObject object2 = new TestObject(100);
        map.set("object2", object2);
        assertEquals(2, map.size());
        assertTrue(map.has("object2"));

        assertEquals(11, testObject.getId());

        //test for delete
        map.delete("object2");
        assertEquals(1, map.size());
        assertFalse(map.has("object2"));
        assertNull(map.get("object2"));
        assertTrue(map.has("testObject"));
        assertTrue(map.get("testObject") == testObject);

        assertEquals(12, testObject.getId());
    }
}
