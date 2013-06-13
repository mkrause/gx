package gx.realtime;

import java.util.HashSet;
import java.util.Set;

public abstract class Event {

    protected EventType type;
    protected EventTarget target;

    public Event(EventTarget target, EventType type){
        this.target = target;
        this.type = type;
    }

    public EventType getType()
    {
        return type;
    }

    public void setType(EventType type)
    {
        this.type = type;
    }

    public EventTarget getTarget()
    {
        return target;
    }

    public void setTarget(EventTarget target)
    {
        this.target = target;
    }

    public String toString(){
        return "[" + this.getType() + " -> " + this.getTarget() + "]";
    }
}
