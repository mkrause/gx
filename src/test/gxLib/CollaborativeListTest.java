package test.gxLib;

import static org.junit.Assert.*;
import gxLib.CollaborativeList;
import gxLib.Model;

import org.junit.Before;
import org.junit.Test;

public class CollaborativeListTest {

	private Model model;
	
	@Before
	public void setUp(){
	    // TODO
		//model = Main.load("abc123");
	}
	
	@Test
	public void testCollaborativeList() {
		CollaborativeList<TestObject> list = model.createList();
		assertNotNull(list.getId());
		assertEquals(0, list.length());
		
		//TODO: maybe test base case?, including push and set
	}

	@Test
	public void testAsArray() {
		fail("Not yet implemented");
	}

	@Test
	public void testIndexOfEComparatorOfE() {
		fail("Not yet implemented");
	}

	@Test
	public void testInsertAll() {
		fail("Not yet implemented");
	}

	@Test
	public void testLastIndexOfEComparatorOfE() {
		fail("Not yet implemented");
	}

	@Test
	public void testPushAll() {
		fail("Not yet implemented");
	}

	@Test
	public void testRemoveRange() {
		fail("Not yet implemented");
	}

	@Test
	public void testRemoveValue() {
		fail("Not yet implemented");
		//TODO: test for list of Integers: no unexpected behavior with indices vs values?
	}

	@Test
	public void testReplaceRange() {
		fail("Not yet implemented");
	}

}
