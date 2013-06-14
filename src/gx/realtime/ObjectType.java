package gx.realtime;

public enum ObjectType
{
    COLLABORATIVE_MAP,
    COLLABORATIVE_LIST,
    COLLABORATIVE_STRING;

    public static ObjectType map(int type)
    {
        switch (type) {
            case 0:
                return COLLABORATIVE_MAP;
            case 1:
                return COLLABORATIVE_LIST;
            case 2:
                return COLLABORATIVE_STRING;
        }
        return null;
    }
}
