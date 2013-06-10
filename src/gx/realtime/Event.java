package gx.realtime;

import java.util.HashSet;
import java.util.Set;

public abstract class Event {
    protected EventType type;

    private Set<EventTarget> bubbledNodes;

    public Event(){
        bubbledNodes = new HashSet();
    }

    public EventType getType()
    {
        return type;
    }

    public void setType(EventType type)
    {
        this.type = type;
    }

    public void addBubbledNode(EventTarget node){
        bubbledNodes.add(node);
    }

    public boolean isFirstVisit(EventTarget node){
        return !bubbledNodes.contains(node);
    }
}
