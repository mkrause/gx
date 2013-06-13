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
        List<String> list = new ArrayList<String>();
        String item1 = "item1";
        String item2 = "item2";
        list.add(item1);
        list.add(item2);

        List<String> list2 = Cloner.clone(list);

        assertFalse("Reference should not match", list == list2);
        assertEquals("List should be equal", list, list2);

        // Test deep clone
        assertFalse("Reference of item should not match", list.get(0) == list2.get(0));
        assertEquals("Item should be equal", list.get(0), list2.get(0));
    }

    @Test
    public void testString() throws JsonProcessingException
    {
        String string = "item1";
        String string2 = Cloner.clone(string);

        assertFalse("Reference should not match", string == string2);
        assertEquals("String should be equal", string, string2);
    }

}
