package gx.browserchannel.util;

/**
 * Utility class containing helpers for the creation of pseudo random data
 */
public class RandomUtils
{
    /**
     * Generates a pseudorandom String containing the hexadecimal representation of a Math.random value.
     *
     * @return
     */
    public static String getRandomString()
    {
        return Long.toHexString(Double.doubleToLongBits(Math.random()));
    }
}
