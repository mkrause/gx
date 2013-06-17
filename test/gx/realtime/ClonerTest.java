package gx.realtime;

import gx.realtime.serialize.Cloner;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;

public class ClonerTest
{

    private static CollaborativeString string;

    @Test
    public void testClone()
    {
        TestObject simpleObject = new TestObject(123);
        TestObject clone = Cloner.clone(simpleObject);
        assertEquals(simpleObject, clone);
        assertFalse(simpleObject == clone);
    }

}
