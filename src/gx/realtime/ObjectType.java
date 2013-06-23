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

    public static int map(ObjectType type)
    {
        switch (type) {
            case COLLABORATIVE_MAP:
                return 0;
            case COLLABORATIVE_LIST:
                return 1;
            case COLLABORATIVE_STRING:
                return 2;
        }
        return -1;
    }
}
