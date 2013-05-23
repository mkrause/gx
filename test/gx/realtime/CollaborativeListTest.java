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
		assertEquals(-1, list.indexOf(new TestObject(999), comparator));
	}

	@Test
	public void testInsertAll() {
		list = model.createList();
		
		//test for no inserts
		list.insertAll(0, null);
		assertEquals(0, list.length());
		list.insertAll(0, new TestObject[0]);
		assertEquals(0, list.length());

		//test for set of inserts at start
		TestObject[] objects = new TestObject[2];
		objects[0] = simpleObject;
		objects[1] = testObject;
		list.insertAll(0, objects);
		assertEquals(2, list.length());
		assertTrue(simpleObject == list.get(0));
		assertTrue(testObject == list.get(1));
		
		//test for inserting the same set in the middle
		list.insertAll(1, objects);
		assertEquals(4, list.length());
		assertTrue(simpleObject == list.get(0));
		assertTrue(simpleObject == list.get(1));
		assertTrue(testObject == list.get(2));
		assertTrue(testObject == list.get(3));
		
		//test for inserting list at beginning
		TestObject object1 = new TestObject(1);
		TestObject object2 = new TestObject(2);
		TestObject[] objects2 = new TestObject[2];
		objects2[0] = object1;
		objects2[1] = object2;
		list.insertAll(0, objects2);
		assertEquals(6, list.length());
		assertTrue(object1 == list.get(0));
		assertTrue(object2 == list.get(1));
		assertTrue(simpleObject == list.get(2));
		assertTrue(simpleObject == list.get(3));
		assertTrue(testObject == list.get(4));
		assertTrue(testObject == list.get(5));
		
		//test for set of inserts in middle (one element)
		TestObject object3 = new TestObject(3);
		TestObject object4 = new TestObject(4);
		TestObject[] objects3 = new TestObject[2];
		objects2[0] = object3;
		objects2[1] = object4;
		list.insertAll(5, objects3);
		assertEquals(8, list.length());
		assertTrue(object1 == list.get(0));
		assertTrue(object2 == list.get(1));
		assertTrue(simpleObject == list.get(2));
		assertTrue(simpleObject == list.get(3));
		assertTrue(testObject == list.get(4));
		assertTrue(object3 == list.get(5));
		assertTrue(object4 == list.get(6));
		assertTrue(testObject == list.get(7));
		
		//test for set of inserts at end
		TestObject object5 = new TestObject(5);
		TestObject object6 = new TestObject(6);
		TestObject[] objects4 = new TestObject[2];
		objects2[0] = object5;
		objects2[1] = object6;
		list.insertAll(8, objects4);
		testLastList(object1, object2, object3, object4, object5, object6);
		
		//test for no inserts
		list.insertAll(0, new TestObject[0]);
		testLastList(object1, object2, object3, object4, object5, object6);
		list.insertAll(5, new TestObject[0]);
		testLastList(object1, object2, object3, object4, object5, object6);
		list.insertAll(10, new TestObject[0]);
		testLastList(object1, object2, object3, object4, object5, object6);
	}
	
	private void testLastList(Object object1, Object object2, Object object3, Object object4, Object object5, Object object6){
		assertEquals(10, list.length());
		assertTrue(object1 == list.get(0));
		assertTrue(object2 == list.get(1));
		assertTrue(simpleObject == list.get(2));
		assertTrue(simpleObject == list.get(3));
		assertTrue(testObject == list.get(4));
		assertTrue(object3 == list.get(5));
		assertTrue(object4 == list.get(6));
		assertTrue(testObject == list.get(7));
		assertTrue(object5 == list.get(8));
		assertTrue(object6 == list.get(9));
	}
	
	@Test
	public void testLastIndexOfEComparatorOfE() {
		list.push(testObject.clone());
		Comparator<TestObject> comparator = new TestObjectComparator();
		assertEquals(2, list.lastIndexOf(testObject, comparator));
		assertEquals(0, list.lastIndexOf(simpleObject, comparator));
		assertEquals(-1, list.lastIndexOf(new TestObject(999), comparator));
	}

	@Test
	public void testRemoveRange() {
		//empty range
		list.removeRange(0, 0);
		assertEquals(2, list.length());
		
		TestObject object1 = new TestObject(1);
		TestObject object2 = new TestObject(2);
		list.push(object1);
		list.push(object2);
		
		//remove one
		list.removeRange(1, 2);
		assertEquals(3, list.length());
		assertTrue(simpleObject == list.get(0));
		assertTrue(object1 == list.get(1));
		assertTrue(object2 == list.get(2));
		
		list.push(testObject);
		
		//remove two
		list.removeRange(2, 4);
		assertEquals(2, list.length());
		assertTrue(simpleObject == list.get(0));
		assertTrue(object1 == list.get(1));
	}

	@Test
	public void testRemoveValue() {
		list.push(simpleObject);
		
		//remove: only first should be gone
		list.removeValue(simpleObject);
		assertEquals(2, list.length());
		assertTrue(testObject == list.get(0));
		assertTrue(simpleObject == list.get(1));
		
		//remove middle
		list.insert(0, simpleObject);
		list.removeValue(testObject);
		assertEquals(2, list.length());
		assertTrue(simpleObject == list.get(0));
		assertTrue(simpleObject == list.get(1));
		
		//remove last
		list.push(testObject);
		list.removeValue(testObject);
		assertEquals(2, list.length());
		assertTrue(simpleObject == list.get(0));
		assertTrue(simpleObject == list.get(1));
	}
	
	@Test
	public void testRemoveValueInteger(){
		//Test for integers, as the remove() of a java List is used, which has different behavior for ints than for Integers
		CollaborativeList<Integer> list = model.createList();
		list.push(3);
		list.push(2);
		list.push(1);
		list.push(0);
		
		list.removeValue(3);
		assertEquals(3, list.length());
		assertTrue(list.get(0).equals(2));
		assertTrue(list.get(1).equals(1));
		assertTrue(list.get(2).equals(0));
	}

	@Test
	public void testReplaceRange() {
		//Test with empty array
		list.replaceRange(0, new TestObject[0]);
		
		//Replace first x element
		TestObject object1 = new TestObject(1);
		TestObject object2 = new TestObject(2);
		TestObject[] objects = new TestObject[2];
		objects[1] = object1;
		objects[2] = object2;
		list.pushAll(objects);
		
		list.replaceRange(0, objects);
		assertEquals(4, list.length());
		assertTrue(object1 == list.get(0));
		assertTrue(object2 == list.get(1));
		assertTrue(object1 == list.get(2));
		assertTrue(object2 == list.get(3));
		
		//replace last 
		list.replaceRange(3, objects);
		assertEquals(4, list.length());
		assertTrue(object1 == list.get(0));
		assertTrue(object2 == list.get(1));
		assertTrue(object1 == list.get(2));
		assertTrue(object1 == list.get(3));
	}

}

class TestObjectComparator implements Comparator<TestObject>{

	@Override
	public int compare(TestObject o1, TestObject o2) {
		return o1.getId() - o2.getId();
	}
	
}
