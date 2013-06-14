package gx.realtime.serialize;

public class Cloner
{

    private static com.rits.cloning.Cloner cloner = new com.rits.cloning.Cloner();

    /**
     * This is an internal function for cloning objects of a given type. Examples are the CollaborativeMap and CollaborativeList which need to clone their contents
     * when returning for instance an Array of the values.
     * This is done by means of JSON serialization, in order to avoid constraining the used types to Cloneables.
     *
     * @param value The object that needs to be cloned.
     * @param <E>   The Object type.
     * @return A clone of the given object.
     */
    public static <E> E clone(E value)
    {
        return cloner.deepClone(value);
    }
}
