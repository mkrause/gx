package gx.realtime;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public abstract class EventTarget {
    
    /**
     * Map containing the event handlers of this EventTarget.
     */
    protected Map<EventType, Set<EventHandler>> eventHandlers = new HashMap<>();

    /**
     * Adds an event listener to the event target. The same handler can only be added once per the type.
     * Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
     * @param type The type of the event to listen for.
     * @param handler The function to handle the event. The handler can also be an object that implements the handleEvent method which takes the event object as argument.
     */
    public <T extends Event> void addEventListener(EventType type, EventHandler<T> handler){
        if (!eventHandlers.containsKey(type)){
            eventHandlers.put(type, new HashSet<>());
        }
        
        eventHandlers.get(type).add(handler);
    }

    /**
     * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
     * @param type The type of the event to listen for.
     * @param handler The function to handle the event. The handler can also be an object that implements the handleEvent method which takes the event object as argument.
     */
    public <T extends Event> void removeEventListener(EventType type, EventHandler<T> handler){
        Set<EventHandler> handlers = eventHandlers.get(type);
        if(handlers != null){
            handlers.remove(handler);
        }
    }
    
    /**
     * Dispatches the given event of the given event type to this object. The corresponding EventHandlers are executed.
     * This method is only to be called by the gx.realtime.Document.
     * @param event The event object, containing any necessary information.
     */
    protected void fireEvent(BaseModelEvent event) {
        Set<EventHandler> handlers = eventHandlers.get(event.getType());
        if(handlers != null){
            for(EventHandler handler : handlers){
                handler.handleEvent(event);
            }
        }
    }
}
