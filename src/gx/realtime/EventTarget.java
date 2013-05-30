package gx.realtime;

public interface EventTarget {
    
    public void addEventListener(EventType type, EventHandler handler);
    public void removeEventListener(EventType type, EventHandler handler);
}
