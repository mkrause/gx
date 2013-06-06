package gx.realtime;

public abstract class Event {
    protected EventType type;

    public EventType getType()
    {
        return type;
    }

    public void setType(EventType type)
    {
        this.type = type;
    }
}
