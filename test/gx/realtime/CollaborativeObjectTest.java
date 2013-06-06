package gx.realtime;

import static org.junit.Assert.*;

import gx.realtime.CollaborativeString;
import gx.realtime.EventType;
import gx.realtime.serialize.Cloner;
import org.junit.Test;
import org.junit.Before;
import org.junit.Assert.*;

public class CollaborativeObjectTest {

    private static CollaborativeString string;

    @Test
    public void testClone(){
        TestObject simpleObject = new TestObject(123);
        TestObject testObject = new TestObject(456, simpleObject);
        TestObject clone = Cloner.clone(simpleObject);
        assertEquals(simpleObject, clone);
        assertFalse(simpleObject == clone);
    }

}
