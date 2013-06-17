package gx.realtime;

import java.util.*;

/**
 * An event target which can dispatch events to interested listeners.
 * Listeners subscribe via addEventListener.
 */
public abstract class EventTarget
{
    /**
     * All event handlers, indexed by event type.
     */
    protected Map<EventType, Set<EventHandler>> eventHandlers = new HashMap<>();

    /**
     * The parents of this eventTarget.
     */
    protected Set<EventTarget> parents = new HashSet();

    /**
     * Adds an event listener to the event target. The same handler can only
     * be added once per the type. Even if you add the same handler multiple
     * times using the same type then it will only be called once when the
     * event is dispatched.
     *
     * @param type    The type of the event to listen for.
     * @param handler The function to handle the event. The handler can also
     *                be an object that implements the handleEvent method which takes
     *                the event object as argument.
     */
    public <T extends Event> void addEventListener(EventType type, EventHandler<T> handler)
    {
        if (!eventHandlers.containsKey(type)) {
            eventHandlers.put(type, new HashSet<>());
        }

        eventHandlers.get(type).add(handler);
    }

    /**
     * Removes an event listener from the event target. The handler must be
     * the same object as the one added. If the handler has not been added
     * then nothing is done.
     *
     * @param type    The type of the event to listen for.
     * @param handler The function to handle the event. The handler can
     *                also be an object that implements the handleEvent method which
     *                takes the event object as argument.
     */
    public <T extends Event> void removeEventListener(EventType type, EventHandler<T> handler)
    {
        Set<EventHandler> handlers = eventHandlers.get(type);
        if (handlers != null) {
            handlers.remove(handler);
        }
    }

    /**
     * Dispatches the given event to this object. If the given event is an ObjectChangedEvent, the event will be unpacked, and the
     * appropriate eventHandlers are being executed, after which the event will be bubbled up to its parents if applicable.
     * If it is a BaseModelEvent, it will just be bubbled up.
     * Else, this function will just execute the eventHanders for the given event will be executed.
     *
     * @param event The event object, containing any necessary information.
     */
    protected void fireEvent(Event event)
    {
        if (event instanceof ObjectChangedEvent) {
            fireObjectChangedEvent((ObjectChangedEvent) event);
        } else if (event instanceof BaseModelEvent) {
            fireEvent((BaseModelEvent) event);
        } else if (this.equals(event.getTarget())) {
            Set<EventHandler> handlers = eventHandlers.get(event.getType());
            if (handlers != null) {
                for (EventHandler handler : handlers) {
                    handler.handleEvent(event);
                }
            }
        }
    }

    /**
     * Dispatches the given BaseModelEvent to this object. If the event is bubbling,
     * the event is passed to the parents of this EventTarget afterwards.
     *
     * @param event The BaseModelEvent, containing any necessary information.
     */
    protected void fireEvent(BaseModelEvent event)
    {
        if (event.isFirstVisit(this)) {
            event.addBubbledNode(this);
            bubble(event);
        }
    }

    /**
     * This function executes the event handlers for the given ObjectChangedEvent. First, the events that are contained by this OCE are unpacked,
     * after which the corresponding event handlers are executed. Concludingly, the eventHandlers for the OCE in this EventTarget are executed, after
     * which the event will be bubbled.
     * @param event The ObjectChangedEvent containing the necessary information.
     */
    private void fireObjectChangedEvent(ObjectChangedEvent event)
    {
        if (event.isFirstVisit(this)) {
            event.addBubbledNode(this);
            //execute event handlers of packed events
            List<BaseModelEvent> events = event.getEvents();
            for(BaseModelEvent bmEvent : events){
                executeEventHandlers(bmEvent);
            }

            //execute eventhandlers for the ObjectChangedEvent itself.
            executeEventHandlers(event);

        }
        bubble(event);
    }

    /**
     * This method bubbles the given event to its parents iff event.bubbles() == true.
     * @param event The event that should be bubbled.
     */
    private void bubble(BaseModelEvent event){
        if (event.bubbles()) {
            for (EventTarget parent : parents) {
                parent.fireEvent(event);
            }
        }
    }

    /**
     * This method is a wrapper function for
     * @param event
     */
    private void executeEventHandlers(BaseModelEvent event)
    {
        //execute eventhandlers of this EventTarget if needed.
        Set<EventHandler> handlers = eventHandlers.get(event.getType());
        if (handlers != null && (this.equals(event.getTarget()))) {
            for (EventHandler handler : handlers) {
                handler.handleEvent(event);
            }
        }
    }

    /**
     * Add a parent of this EventTarget.
     *
     * @param parent The parent of this EventTarget.
     */
    public void addParent(EventTarget parent)
    {
        parents.add(parent);
    }

    /**
     * Remove the given EventTarget from the set of parents.
     *
     * @param parent The parent that should be removed.
     */
    public void removeParent(EventTarget parent)
    {
        parents.remove(parent);
    }
}
