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
        testObject.setId(testObject.getId() + 1);
    };

    private EventHandler<TestEvent> handler2 = (testEvent) -> {
        //System.out.println("--EventHandler2 called.");
        TestObject testObject2 = (TestObject) testEvent.getTarget();
        testObject2.setId(testObject2.getId() + 10);
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

        EventHandler<TestEvent> changeHandler = (event) -> {
            //System.out.println("--EventHandler 1 called.");
            undoRedoChangeCount++;
        };
        model.addEventListener(EventType.UNDO_REDO_STATE_CHANGED, changeHandler);

        //add string
        CollaborativeString string = model.createString("Hello World!");
        model.getRoot().set(string.getId(), string);
        TextInsertedEvent insertEvent = new TextInsertedEvent(string, "SID", "UID", true, 5, " there");

        //fire event
        string.fireEvent(insertEvent);
        assertEquals("Hello there World!", string.getText());
        assertTrue(model.canUndo());
        assertFalse(model.canRedo());
        assertEquals(1, undoRedoChangeCount);

        //undo
        model.undo();
        assertEquals("Hello World!", string.getText());
        assertFalse(model.canUndo());
        assertTrue(model.canRedo());
        assertEquals(2, undoRedoChangeCount);

        //redo
        model.redo();
        assertEquals("Hello there World!", string.getText());
        assertTrue(model.canUndo());
        assertFalse(model.canRedo());
        assertEquals(3, undoRedoChangeCount);

        //undo
        model.undo();
        assertEquals("Hello World!", string.getText());
        assertFalse(model.canUndo());
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
        assertFalse(model.canUndo());
        assertTrue(model.canRedo());
        assertEquals(6, undoRedoChangeCount);

        //fire another event
        TextDeletedEvent deletedEvent = new TextDeletedEvent(string, "SID", "UID", true, 11, " World");
        string.fireEvent(deletedEvent);
        assertEquals("Hello!", string.getText());
        assertTrue(model.canUndo());
        assertFalse(model.canRedo());
        assertEquals(7, undoRedoChangeCount);

        //fire one more event, undo, fire another, check redo.
        string.fireEvent(insertEvent);
        assertEquals("Hello there!", string.getText());
        assertTrue(model.canUndo());
        assertFalse(model.canRedo());
        assertEquals(7, undoRedoChangeCount);

        model.undo();
        assertTrue(model.canUndo());
        assertTrue(model.canRedo());
        assertEquals(8, undoRedoChangeCount);

        string.fireEvent(insertEvent);
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
        assertFalse(model.canUndo());
        assertTrue(model.canRedo());
        assertEquals(11, undoRedoChangeCount);

        //redo twice
        model.redo();
        assertEquals("Hello!", string.getText());
        assertTrue(model.canUndo());
        assertTrue(model.canRedo());
        assertEquals(12, undoRedoChangeCount);

        model.redo();
        assertEquals("Hello there!", string.getText());
        assertTrue(model.canUndo());
        assertFalse(model.canRedo());
        assertEquals(13, undoRedoChangeCount);

        //undo once
        model.undo();
        assertEquals("Hello!", string.getText());
        assertTrue(model.canUndo());
        assertTrue(model.canRedo());
        assertEquals(14, undoRedoChangeCount);
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
