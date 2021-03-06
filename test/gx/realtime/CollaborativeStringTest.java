package gx.realtime;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.mock;

public class CollaborativeStringTest
{

    @Test
    public void testInsertString()
    {
        Model model = mock(Model.class);
        CollaborativeString string = new CollaborativeString("string", model);
        string.append("abcdef");
        assertEquals("abcdef", string.getText());

        //insert at start
        string.insertString(0, "");
        assertEquals("abcdef", string.getText());
        string.insertString(0, "x");
        assertEquals("xabcdef", string.getText());
        string.insertString(0, "yz");
        assertEquals("yzxabcdef", string.getText());

        //insert midway
        string.insertString(7, "uvw");
        assertEquals("yzxabcduvwef", string.getText());

        //append
        string.insertString(12, "xyz");
        assertEquals("yzxabcduvwefxyz", string.getText());

        //test with empty string
        string = new CollaborativeString("string", model);
        string.insertString(0, "abc");
        assertEquals("abc", string.getText());
    }

    @Test
    public void testAppend()
    {
        Model model = mock(Model.class);
        CollaborativeString string = new CollaborativeString("string", model);
        assertEquals("", string.getText());
        string.append("abc");
        assertEquals("abc", string.getText());
        string.append("");
        assertEquals("abc", string.getText());
        string.append("def");
        assertEquals("abcdef", string.getText());
    }

    @Test
    public void testRemoveRange()
    {
        Model model = mock(Model.class);
        CollaborativeString string = new CollaborativeString("string", model);
        string.append("abcdefghijklmopqrstuvwxyz");

        //test for removing nothing
        string.removeRange(0, 0);
        assertEquals("abcdefghijklmopqrstuvwxyz", string.getText());
        string.removeRange(5, 5);
        assertEquals("abcdefghijklmopqrstuvwxyz", string.getText());
        string.removeRange(25, 25);
        assertEquals("abcdefghijklmopqrstuvwxyz", string.getText());

        //test for removing at start
        string.removeRange(0, 1);
        assertEquals("bcdefghijklmopqrstuvwxyz", string.getText());
        string.removeRange(0, 5);
        assertEquals("ghijklmopqrstuvwxyz", string.getText());

        //test for removing midway
        string.removeRange(5, 6);
        assertEquals("ghijkmopqrstuvwxyz", string.getText());
        string.removeRange(5, 8);
        assertEquals("ghijkqrstuvwxyz", string.getText());

        //test for removing at end
        string.removeRange(14, 15);
        assertEquals("ghijkqrstuvwxy", string.getText());
        string.removeRange(9, 14);
        assertEquals("ghijkqrst", string.getText());
    }

    @Test
    public void testSetText()
    {
        Model model = mock(Model.class);
        CollaborativeString string = new CollaborativeString("string", model);
        string.setText("abc");
        assertEquals("abc", string.getText());
        string.setText("");
        assertEquals("", string.getText());

        string.setText("abc");
        string.setText("axbycz");
        assertEquals("axbycz", string.getText());
    }

    @Test
    public void testBasicOperations()
    {
        //test if basic operations are executed according to the default event listeners for this object.
        //also test for impossible operations
        fail("TODO");
    }

}
