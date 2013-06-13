package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static junit.framework.Assert.*;

/**
 *
 */
public class ClonerTest
{
    @Test
    public void testList() throws JsonProcessingException
    {
        List<Something> list = new ArrayList<Something>();
        Something item1 = new Something("thing1");
        Something item2 = new Something("thing2");
        list.add(item1);
        list.add(item2);

        List<Something> list2 = Cloner.clone(list);

        assertFalse("Reference should not match", list == list2);
        assertEquals("List should be equal", list, list2);

        // Test deep clone
        assertFalse("Reference of item should not match", list.get(0) == list2.get(0));
        assertEquals("Item should be equal", list.get(0), list2.get(0));
    }

    @Test
    public void testObject() throws JsonProcessingException
    {
        Something object = new Something("thing");
        Something object2 = Cloner.clone(object);

        assertFalse("Reference should not match", object == object2);
        assertEquals("Object should be equal", object, object2);
    }

    @Test
    public void testImmutable() throws JsonProcessingException
    {
        String string = "item1";
        String string2 = Cloner.clone(string);

        assertTrue("Reference should match of immutable objects", string == string2);
        assertEquals("String should be equal", string, string2);
    }

    private class Something
    {
        private String property;

        public Something(String property)
        {
            this.property = property;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            return property.equals(((Something)o).property);
        }

        @Override
        public int hashCode() {
            return property.hashCode();
        }
    }
}
