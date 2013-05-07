package test;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import test.gxLib.CollaborativeListTest;
import test.gxLib.CollaborativeMapTest;
import test.gxLib.CollaborativeObjectTest;
import test.gxLib.CollaborativeStringTest;
import test.gxLib.EventTargetTest;
import test.gxLib.IndexReferenceTest;
import test.gxLib.MainTest;
import test.gxLib.ModelTest;

/**
 * Test suite for all non-db errors
 * @author Rdebokx
 *
 */
@RunWith(Suite.class)
@SuiteClasses({
	//gxLib tests
	CollaborativeListTest.class,
	CollaborativeMapTest.class,
	CollaborativeObjectTest.class,
	CollaborativeStringTest.class,
	EventTargetTest.class,
	IndexReferenceTest.class,
	MainTest.class,
	ModelTest.class
})

public class AllTests {

	private AllTests(){
		
	}
	
	public static void main(String[] args) {
        org.junit.runner.JUnitCore.runClasses(AllTests.class);
	}

}
