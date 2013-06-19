package gx.realtime;

import org.junit.Test;

import static org.junit.Assert.*;

public class ModelTest
{

    private int undoRedoChangeCount = 0;

    //Event handlers
    private EventHandler<TestEvent> handler1 = (testEvent) -> {
        //System.out.println("--EventHandler 1 called.");
        TestObject testObject = (TestObject) testEvent.getTarget();
        testObject.setId(testObject.getIntId() + 1);
    };

    private EventHandler<TestEvent> handler2 = (testEvent) -> {
        //System.out.println("--EventHandler2 called.");
        TestObject testObject2 = (TestObject) testEvent.getTarget();
        testObject2.setId(testObject2.getIntId() + 10);
    };

    @Test
    public void testCreationCompoundOperation()
    {
        fail("TODO");
    }

    @Test
    public void testCompoundOperations()
    {
        //TODO 2

        //test with no operation in progress
        fail("TODO");
    }

    @Test
    public void testCreate()
    {
        fail("Not yet implemented");
    }

    @Test
    public void testCreateListEArray()
    {
        fail("Not yet implemented");
    }

    @Test
    public void testCreateMapMapOfStringE()
    {
        fail("Not yet implemented");
    }

    @Test
    public void testCreateStringString()
    {
        fail("Not yet implemented");
    }

    //TODO: check if no methods are skipped.

    @Test
    public void testUndoRedo()
    {
        Model model = new Model(null);
        assertFalse(model.canUndo());
        assertFalse(model.canRedo());

        //track UNDO_REDO_CHANGE_EVENT;

        EventHandler<UndoRedoStateChangedEvent> changeHandler = (event) -> {
            //System.out.println("--EventHandler 1 called.");
            undoRedoChangeCount++;
        };
        model.addEventListener(EventType.UNDO_REDO_STATE_CHANGED, changeHandler);

        //add string
        CollaborativeString string = model.createString("Hello World!");
        //model.getRoot().set(string.getId(), string);
        assertEquals("Hello World!", string.getText());

        assertTrue(model.canUndo());
        assertFalse(model.canRedo());
        assertEquals(1, undoRedoChangeCount);

        // undo
        model.undo();
        assertEquals("", string.getText());
        assertFalse(model.canUndo());
        assertTrue(model.canRedo());
        assertEquals(2, undoRedoChangeCount);

        //redo
        model.redo();
        assertEquals("Hello World!", string.getText());
        assertTrue(model.canUndo());
        assertFalse(model.canRedo());
        assertEquals(3, undoRedoChangeCount);

        // insert text
        string.insertString(5, " there");
        assertEquals("Hello there World!", string.getText());
        assertTrue(model.canUndo());
        assertFalse(model.canRedo());
        assertEquals(3, undoRedoChangeCount);

        //undo
        model.undo();
        assertEquals("Hello World!", string.getText());
        assertTrue(model.canUndo());
        assertTrue(model.canRedo());
        assertEquals(4, undoRedoChangeCount);

        //redo
        model.redo();
        assertEquals("Hello there World!", string.getText());
        assertTrue(model.canUndo());
        assertFalse(model.canRedo());
        assertEquals(5, undoRedoChangeCount);

        //undo to test if redo stack is cleared on new event.
        model.undo();
        assertEquals("Hello World!", string.getText());
        assertTrue(model.canUndo());
        assertTrue(model.canRedo());
        assertEquals(6, undoRedoChangeCount);

        //fire another event
        string.removeRange(5, 11);
        assertEquals("Hello!", string.getText());
        assertTrue(model.canUndo());
        assertFalse(model.canRedo());
        assertEquals(7, undoRedoChangeCount);

        //fire one more event, undo, fire another, check redo.
        string.insertString(5, " there");
        assertEquals("Hello there!", string.getText());
        assertTrue(model.canUndo());
        assertFalse(model.canRedo());
        assertEquals(7, undoRedoChangeCount);

        model.undo();
        assertTrue(model.canUndo());
        assertTrue(model.canRedo());
        assertEquals(8, undoRedoChangeCount);

        string.insertString(5, " there");
        assertEquals("Hello there!", string.getText());
        assertTrue(model.canUndo());
        assertFalse(model.canRedo());
        assertEquals(9, undoRedoChangeCount);

        //undo twice
        model.undo();
        assertEquals("Hello!", string.getText());
        assertTrue(model.canUndo());
        assertTrue(model.canRedo());
        assertEquals(10, undoRedoChangeCount);

        model.undo();
        assertEquals("Hello World!", string.getText());
        assertTrue(model.canUndo());
        assertTrue(model.canRedo());
        assertEquals(10, undoRedoChangeCount);

        //redo twice
        model.redo();
        assertEquals("Hello!", string.getText());
        assertTrue(model.canUndo());
        assertTrue(model.canRedo());
        assertEquals(10, undoRedoChangeCount);

        model.redo();
        assertEquals("Hello there!", string.getText());
        assertTrue(model.canUndo());
        assertFalse(model.canRedo());
        assertEquals(11, undoRedoChangeCount);

        //undo once
        model.undo();
        assertEquals("Hello!", string.getText());
        assertTrue(model.canUndo());
        assertTrue(model.canRedo());
        assertEquals(12, undoRedoChangeCount);
    }

    @Test
    public void testUndoRedoCompoundOperation()
    {
        fail("TODO");
        //TODO 3
    }

    @Test
    public void testUndoRedoCompounOperationBubbling()
    {
        fail("TODO");
        //TODO 4
    }

    @Test
    public void testIsReadOnly()
    {
        fail("Not yet implemented");
    }

    @Test
    public void testFireRemoteEvent()
    {
        fail("TODO");
    }

    @Test
    public void testFireEvent()
    {
        //TODO

        //implicitly tested by others?
        fail("TODO");
    }
}
