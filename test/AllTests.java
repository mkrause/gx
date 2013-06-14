import gx.realtime.*;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({
        //gx.realtime tests
        ClientTest.class,
        CollaborativeListTest.class,
        CollaborativeMapTest.class,
        CollaborativeObjectTest.class,
        CollaborativeStringTest.class,
        EventTargetTest.class,
        IndexReferenceTest.class,
        ModelTest.class,
        RealtimeLoaderTest.class,
        RealtimeMessageHandlerTest.class,

        //Java8Test
        Java8Test.class
})

public class AllTests
{

    private AllTests()
    {

    }

    public static void main(String[] args)
    {
        org.junit.runner.JUnitCore.runClasses(AllTests.class);
    }

}
