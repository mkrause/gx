package test;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import test.gx.realtime.CollaborativeListTest;
import test.gx.realtime.CollaborativeMapTest;
import test.gx.realtime.CollaborativeObjectTest;
import test.gx.realtime.CollaborativeStringTest;
import test.gx.realtime.EventTargetTest;
import test.gx.realtime.IndexReferenceTest;
import test.gx.realtime.ClientTest;
import test.gx.realtime.ModelTest;

/**
 * Test suite for all non-db errors
 * @author Rdebokx
 *
 */
@RunWith(Suite.class)
@SuiteClasses({
	//gx.realtime tests
	CollaborativeListTest.class,
	CollaborativeMapTest.class,
	CollaborativeObjectTest.class,
	CollaborativeStringTest.class,
	EventTargetTest.class,
	IndexReferenceTest.class,
	ClientTest.class,
	ModelTest.class
})

public class AllTests {

	private AllTests(){
		
	}
	
	public static void main(String[] args) {
        org.junit.runner.JUnitCore.runClasses(AllTests.class);
	}

}
