package gx.realtime.custom;

public class CollaborativeValue
{

    private Object value;

    public CollaborativeValue(Object value)
    {
        this.value = value;
    }

    public Object getValue()
    {
        return value;
    }

    public void setValue(Object value)
    {
        this.value = value;
    }
}
