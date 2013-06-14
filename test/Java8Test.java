
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class Java8Test
{

    enum SoccerResult
    {
        WON, LOST, DRAW
    }

    interface SoccerService
    {
        SoccerResult getSoccerResult(Integer teamA, Integer teamB);
    }

    public SoccerResult soccerResultPredictor()
    {

        SoccerService soccerService = (teamA, teamB) -> {
            SoccerResult result = null;
            if (teamA == teamB) {
                result = SoccerResult.DRAW;
            } else if (teamA < teamB) {
                result = SoccerResult.LOST;
            } else {
                result = SoccerResult.WON;
            }
            return result;
        };

        // man utd vs wolves
        SoccerResult soccerResult = soccerService.getSoccerResult(3, 1);
        //System.out.println("soccerResult = " + soccerResult);
        return soccerResult;

    }

    @Test
    public void testJava8()
    {
        Java8Test firstLambda = new Java8Test();
        SoccerResult result = firstLambda.soccerResultPredictor();
        assertEquals(SoccerResult.WON, result);
    }

}
