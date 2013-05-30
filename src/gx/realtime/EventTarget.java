package gx.realtime;

public interface EventTarget {
    
    public <T extends Event> void addEventListener(EventType type, EventHandler<T> handler);
    public <T extends Event> void removeEventListener(EventType type, EventHandler<T> handler);
}
