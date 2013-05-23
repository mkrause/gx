package test.gx.realtime;

import static org.junit.Assert.*;

import java.util.Comparator;

import gx.realtime.CollaborativeList;
import gx.realtime.Model;

import org.junit.Before;
import org.junit.Test;

public class CollaborativeListTest {

	private Model model;
	private TestObject simpleObject;
	private TestObject testObject;
	private CollaborativeList<TestObject> list;
	
	@Before
	public void setUp(){
		simpleObject = new TestObject(123);
		testObject = new TestObject(456, simpleObject);
		
		list = model.createList();
		list.push(simpleObject);
		list.push(testObject);
	}
	
	@Test
	public void testCollaborativeList() {
		CollaborativeList<TestObject> list = model.createList();
		assertNotNull(list.getId());
		assertEquals(0, list.length());
	}

	@Test
	public void testAsArray() {
		TestObject[] array = list.asArray();
		assertEquals(2, array.length);
		
		//test if everything is unchanged
		assertTrue(simpleObject == list.get(0));
		assertTrue(testObject == list.get(1));
		
		//test for right copies of objects
		assertEquals(list.get(0), array[0]);
		assertEquals(list.get(1), array[1]);
		
		//test if they are actually clones
		assertFalse(list.get(0) == array[0]);
		assertFalse(list.get(1) == array[1]);
		
		//remove one object and see what it returns
		list.remove(1);
		assertEquals(1, list.length());
		assertTrue(testObject == list.get(0));
		
		array = list.asArray();
		assertEquals(1, array.length);
		assertEquals(testObject, array[0]);
		assertFalse(testObject == array[0]);
		
		//test on empty list
		list = model.createList();
		array = list.asArray();
		assertEquals(0, array.length);
	}

	@Test
	public void testIndexOfEComparatorOfE() {
		Comparator<TestObject> comparator = new TestObjectComparator();
		assertEquals(0, list.indexOf(simpleObject, comparator));
		assertEquals(1, list.indexOf(testObject, comparator));
		
		
	}

	@Test
	public void testInsertAll() {
		
		//test for no inserts
		
		//test for set of inserts
		
		//test for set of inserts
		
		//test for no inserts
		
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

class TestObjectComparator implements Comparator<TestObject>{

	@Override
	public int compare(TestObject o1, TestObject o2) {
		return o1.getId() - o2.getId();
	}
	
}
