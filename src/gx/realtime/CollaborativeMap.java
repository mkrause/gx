package gx.realtime;

import gx.realtime.serialize.Cloner;

import java.util.*;
import java.util.Map.Entry;

/**
 * A collaborative map. A map's key must be a String. The values can contain other Realtime collaborative objects,
 * custom collaborative objects or Java objects.
 * Changes to the map will automatically be synced with the server and other collaborators.
 * To listen for changes, add EventListeners for the gx.realtime.EventType.VALUE_CHANGED event type.
 */
public class CollaborativeMap extends CollaborativeObject
{

    /**
     * The internal HashMap for storing the data of this CollaborativeMap.
     */
    private Map<String, Object> map;

    private String sessionId;
    private String userId;

    /**
     * Constructor, constructing a map for the given model. This constructor should not be called directly.
     *
     * @param model
     */
    public CollaborativeMap(String id, Model model)
    {
        super(id, model);
        map = new HashMap<>();

        sessionId = model.getDocument().getSession().getSessionId();
        if (model.getDocument().getMe() != null) {
            userId = model.getDocument().getMe().getUserId();
        }
    }

    /**
     * Removes all entries.
     */
    public void clear()
    {
        map.clear();
    }

    /**
     * Removes the entry for the given key (if such an entry exists).
     *
     * @param key The key to unmap.
     * @return The value that was mapped to this key, or null if there was no existing value.
     */
    public Object delete(String key)
    {
        Object oldValue = map.remove(key);
        if (oldValue instanceof EventTarget) {
            ((EventTarget) oldValue).removeParent(this);
        }

        fireWithObjectChangedEvent(new ValueChangedEvent(this, sessionId, userId, true, key, null, oldValue));

        return oldValue;
    }

    /**
     * Returns the value mapped to the given key.
     *
     * @param key The key to look up.
     * @return The value mapped to the given key.
     */
    public Object get(String key)
    {
        return map.get(key);
    }

    /**
     * Checks if this map contains an entry for the given key.
     *
     * @param key The key to check.
     * @return Returns true if this map contains a mapping for the given key.
     */
    public boolean has(String key)
    {
        return map.containsKey(key);
    }

    /**
     * Returns whether this map is empty.
     *
     * @return Returns true if this map is empty.
     */
    public boolean isEmpty()
    {
        return map.isEmpty();
    }

    /**
     * Returns a set containing a copy of the items in this map.
     * Modifications to the returned Set do not modify this collaborative map.
     *
     * @return The items in this map. Each item is a [key, value] pair.
     */
    public Set<Entry<String, Object>> items()
    {
        Set<Entry<String, Object>> result = new HashSet<>();
        Set<Entry<String, Object>> entrySet = map.entrySet();

        for (Entry<String, Object> entry : entrySet) {
            result.add(new AbstractMap.SimpleEntry<>(entry.getKey(), Cloner.clone(entry.getValue())));
        }
        return result;
    }

    /**
     * Returns an array containing a copy of the keys in this map.
     * Modifications to the returned array do not modify this collaborative map.
     *
     * @return The keys in this map.
     */
    public Collection<String> keys()
    {
        return map.keySet();
    }

    /**
     * Put the value into the map with the given key, overwriting an existing value for that key.
     *
     * @param key      The map key.
     * @param newValue The map value.
     * @return The old map value, if any, that used to be mapped to the given key.
     */
    public Object set(String key, Object newValue)
    {
        if (newValue instanceof EventTarget) {
            ((EventTarget) newValue).addParent(this);
        }
        Object oldValue = map.get(key);

        fireWithObjectChangedEvent(new ValueChangedEvent(this, sessionId, userId, true, key, newValue, oldValue));

        return oldValue;
    }

    /**
     * Returns a list containing a copy of the values in this map.
     * Modifications to the returned list do not modify this collaborative map.
     *
     * @return The values in this map.
     */
    @SuppressWarnings("unchecked")
    public List<Object> values()
    {
        List<Object> result = new ArrayList<Object>();

        Collection<Object> values = map.values();
        for (Object value : values) {
            result.add(Cloner.clone(value));
        }
        return result;
    }

    /**
     * @return The number of keys in the map.
     */
    public int size()
    {
        return map.size();
    }

    /**
     * Updates the CollaborativeMap according to the changes described in the given event.
     *
     * @param event
     */
    @Override
    protected void updateModel(BaseModelEvent event)
    {
        switch (event.getType()) {
            case VALUE_CHANGED:
                ValueChangedEvent valuesChangedEvent = (ValueChangedEvent) event;
                //TODO: parse getNewValue() into the actual object using getValueType()

                if (valuesChangedEvent.getNewValue() == null) {
                    map.remove(valuesChangedEvent.getProperty());
                } else {
                    map.put(valuesChangedEvent.getProperty(), valuesChangedEvent.getNewValue());
                }
                break;
        }
    }

    /**
     * Method dispatching the given event of the given EventType. If this CollaborativeMap is not the target of the given event, the
     * event is passed down to its children.
     *
     * @param event The event object, containing any necessary information.
     */
    @Override
    protected void fireEvent(Event event)
    {
        //if this object is the target, execute event handlers and bubble back up
        super.fireEvent(event);

        //if not, propagate event to children with callback.
        if (!this.equals(event.getTarget())) {
            Collection<Object> values = map.values();
            for (Object value : values) {
                if (value instanceof CollaborativeObject) {
                    ((CollaborativeObject) value).fireEvent(event);
                }
            }
        }
    }

    /**
     * Utility method to fire an event with an ObjectChangedEvent.
     *
     * @param event
     */
    private void fireWithObjectChangedEvent(BaseModelEvent event)
    {
        // Update the model
        updateModel(event);

        // Fire the event itself
        fireEvent(event);

        // Fire an object changed event that bubbles up the tree
        List<BaseModelEvent> eventList = new LinkedList<>();
        eventList.add(event);
        fireEvent(new ObjectChangedEvent(this, sessionId, userId, true, eventList));
    }

    public String toString()
    {
        return "CollaborativeMap(id=" + getId() + ", map=" + map + ")";
    }
}
