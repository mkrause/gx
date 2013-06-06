package gx.realtime;

public enum ObjectType {
    COLLABORATIVE_MAP;

    public static ObjectType map(int type)
    {
        switch(type)
        {
            case 0:
                return COLLABORATIVE_MAP;
        }
        return null;
    }
}
