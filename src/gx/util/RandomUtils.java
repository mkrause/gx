package gx.util;

/**
 * Utility class containing helpers for the creation of pseudo random data
 */
public class RandomUtils
{
    private final static String ID_CHARS = "12345678890abcdefghijklmnopqrstuvwxyz";

    /**
     * Generates a pseudorandom String containing the hexadecimal representation of a Math.random value.
     *
     * @return
     */
    public static String getRandomHexAlphaNumeric()
    {
        return Long.toHexString(Double.doubleToLongBits(Math.random()));
    }

    public static String getRandomAlphaNumeric()
    {
        String result = "";
        for (int i = 0; i < 15; i++) {
            result += ID_CHARS.charAt((int) Math.floor(Math.random() * ID_CHARS.length()));
        }
        return result;
    }
}
