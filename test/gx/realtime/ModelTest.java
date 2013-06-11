package gx.realtime;

import static org.junit.Assert.*;

import gx.realtime.CollaborativeString;
import gx.realtime.TextInsertedEvent;
import org.junit.Test;

public class ModelTest {

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
    public void testCreationCompoundOperation(){
        fail("TODO");
    }

	@Test
    public void testCompoundOperations(){
        //TODO 2

        //test with no operation in progress
        fail("TODO");
    }

	@Test
	public void testCreate() {
		fail("Not yet implemented");
	}

	@Test
	public void testCreateListEArray() {
		fail("Not yet implemented");
	}

	@Test
	public void testCreateMapMapOfStringE() {
		fail("Not yet implemented");
	}

	@Test
	public void testCreateStringString() {
		fail("Not yet implemented");
	}

	@Test
	public void testUndoRedo() {
        //TODO 1
        //including canUndo and canRedo
        Model model = new Model(null);
        assertFalse(model.canUndo());
        assertFalse(model.canRedo());

        //add string
        CollaborativeString string = model.createString("Hello World!");
        model.getRoot().set(string.getId(), string);
        TextInsertedEvent event = new TextInsertedEvent(string, "SID", "UID", true, 5, " there");

        //TODO: check for UndoRedoStateChangedEvent

        //fire event
        string.fireEvent(event);
        assertEquals("Hello there World!", string.getText());
        assertTrue(model.canUndo());
        assertFalse(model.canRedo());

        //undo
        model.undo();
        assertEquals("Hello World!", string.getText());
        assertTrue

        //redo

        //fire another event

        //undo twice

        //redo twice

        //undo once


        fail("Not yet implemented");
	}

    @Test
    public void testUndoRedoCompoundOperation(){
        fail("TODO");
        //TODO 3
    }

    @Test
    public void testUndoRedoCompounOperationBubbling(){
        fail("TODO");
        //TODO 4
    }

	@Test
	public void testIsReadOnly() {
		fail("Not yet implemented");
	}

    @Test
    public void testFireRemoteEvent(){
        fail("TODO");
    }

    @Test
    public void testFireEvent(){
        //TODO

        //implicitly tested by others?
        fail("TODO");
    }
}
