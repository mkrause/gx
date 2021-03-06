package gx.realtime;

import gx.realtime.serialize.Cloner;

import java.util.*;
import java.util.Map.Entry;
import java.util.logging.Logger;

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

    /**
     * Constructor, constructing a map for the given model. This constructor should not be called directly.
     *
     * @param model
     */
    public CollaborativeMap(String id, Model model)
    {
        super(id, model);
        map = new HashMap<>();
    }

    /**
     * Removes all entries.
     */
    public void clear()
    {
        // Wrap this in a compound operation to enforce an 'atomic' behavior
        model.beginCompoundOperation();

        String[] keys = map.keySet().toArray(new String[0]);
        for(String key : keys) {
            delete(key);
        }

        try {
            model.endCompoundOperation();
        } catch (Model.NoCompoundOperationInProgressException ex) {
            System.out.println("No compound operation in progress");
        }
    }

    /**
     * Removes the entry for the given key (if such an entry exists).
     * @param key The key to unmap.
     * @return The value that was mapped to this key, or null if there was no existing value.
     */
    public Object delete(String key)
    {
        Object result = this.get(key);

        // Let the model decide to fire a ObjectChangedEvent (could be a compound operation)
        BaseModelEvent event = new ValueChangedEvent(this, getSessionId(), getUserId(), true, key, null, result);
        updateModel(event);
        model.dispatchAndSendEvent(event);

        return result;
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
        Object oldValue = map.get(key);

        // Let the model decide to fire a ObjectChangedEvent (could be a compound operation)
        BaseModelEvent event = new ValueChangedEvent(this, getSessionId(), getUserId(), true, key, newValue, oldValue);
        updateModel(event);
        model.dispatchAndSendEvent(event);

        return oldValue;
    }

    /**
     * Returns a list containing a copy of the values in this map.
     * Modifications to the returned list do not modify this collaborative map.
     *
     * @return The values in this map.
     */
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

    @Override
    protected void updateModel(BaseModelEvent event)
    {
        if(this.equals(event.getTarget()) && event.getType().equals(EventType.VALUE_CHANGED)) {
            ValueChangedEvent valueChangedEvent = (ValueChangedEvent)event;

            //remove this map as parent of the old value
            Object oldValue = map.get(valueChangedEvent.getProperty());
            if(oldValue instanceof EventTarget) {
                ((EventTarget) oldValue).removeParent(this);
            }

            //add new value
            Object newValue = valueChangedEvent.getNewValue();
            if(newValue == null) {
                map.remove(valueChangedEvent.getProperty());
            } else {
                if(newValue instanceof EventTarget) {
                    ((EventTarget) newValue).addParent(this);
                }
                map.put(valueChangedEvent.getProperty(), valueChangedEvent.getNewValue());
            }
        }
    }

    public String toString()
    {
        return "CollaborativeMap(id=" + getId() + ", map=" + map + ")";
    }
}
