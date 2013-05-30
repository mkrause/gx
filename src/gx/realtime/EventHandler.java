package gx.realtime;

/**
 * Interface for event handlers.
 */
public interface EventHandler<T extends Event> {
    public void handleEvent(T e);
}
