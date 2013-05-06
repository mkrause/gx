package test;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

/**
 * Test suite for all non-db errors
 * @author Rdebokx
 *
 */
@RunWith(Suite.class)
@SuiteClasses({
	CollaborativeMapTest.class
	//TODO: create more tests
})

public class AllTests {

	private AllTests(){
		
	}
	
	public static void main(String[] args) {
        org.junit.runner.JUnitCore.runClasses(AllTests.class);
	}

}
