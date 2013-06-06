package gx.realtime;

import gx.realtime.serialize.Cloner;

import java.util.*;
import java.util.Map.Entry;

/**
 * A collaborative map. A map's key must be a String. The values can contain other Realtime collaborative objects, 
 * custom collaborative objects or Java objects.
 * Changes to the map will automatically be synced with the server and other collaborators. 
 * To listen for changes, add EventListeners for the gx.realtime.EventType.VALUE_CHANGED event type. 
 *
 * @param <V> The type of the values contained by this map. The map's key must be a String.
 */
public class CollaborativeMap<V> extends CollaborativeObject{

	/**
	 * The internal HashMap for storing the data of this CollaborativeMap.
	 */
	private HashMap<String, V> map;
	
	/**
	 * Constructor, constructing a map for the given model. This constructor should not be called 
	 * @param model
	 */
	public CollaborativeMap(String id, Model model){
		super(id, model);
		map = new HashMap<String, V>();
	}
	
	/**
	 * Removes all entries.
	 */
	public void clear(){
		map.clear();
	}
	
	/**
	 * Removes the entry for the given key (if such an entry exists).
	 * @param key The key to unmap.
	 * @return The value that was mapped to this key, or null if there was no existing value.
	 */
	public V delete(String key){
		return map.remove(key);
	}
	
	/**
	 * Returns the value mapped to the given key.
	 * @param key The key to look up.
	 * @return The value mapped to the given key.
	 */
	public V get(String key){
		return map.get(key);
	}
	
	/**
	 * Checks if this map contains an entry for the given key.
	 * @param key The key to check.
	 * @return Returns true if this map contains a mapping for the given key.
	 */
	public boolean has(String key){
		return map.containsKey(key);
	}
	
	/**
	 * Returns whether this map is empty.
	 * @return Returns true if this map is empty.
	 */
	public boolean isEmpty(){
		return map.isEmpty();
	}
	
	/**
	 * Returns an array containing a copy of the items in this map. 
	 * Modifications to the returned Set do not modify this collaborative map.
	 * @return The items in this map. Each item is a [key, value] pair.
	 */
	public Set<Entry<String, V>> items(){
		Set<Entry<String, V>> result = new HashSet<Entry<String, V>>();
		Set<Entry<String, V>> entrySet = map.entrySet();
		
		for(Entry<String, V> entry : entrySet){
			result.add(new AbstractMap.SimpleEntry<String, V>(entry.getKey(), Cloner.clone(entry.getValue())));
		}
		return result;
	}
	
	/**
	 * Returns an array containing a copy of the keys in this map. 
	 * Modifications to the returned array do not modify this collaborative map.
	 * @return The keys in this map.
	 */
	public String[] keys(){
		return (String[]) map.keySet().toArray();
	}
	
	/**
	 * Put the value into the map with the given key, overwriting an existing value for that key.
	 * @param key The map key.
	 * @param value The map value.
	 * @return The old map value, if any, that used to be mapped to the given key.
	 */
	public V set(String key, V value){
		return map.put(key, value);
	}
	
	/**
	 * Returns a list containing a copy of the values in this map.
	 * Modifications to the returned list do not modify this collaborative map.
	 * @return The values in this map.
	 */
	@SuppressWarnings("unchecked")
	public List<V> values(){
        List<V> result = new ArrayList<V>();

        Collection<V> values = map.values();
        for(V value : values){
            result.add(Cloner.clone(value));
        }
        return result;
	}
	
	/**
	 * @return The number of keys in the map.
	 */
	public int size(){
		return map.size();
	}

    /**
     * Method dispatching the given event of the given EventType. If this CollaborativeMap is not the target of the given event, the
     * event is passed down to its children.
     * @param event The event object, containing any necessary information.
     * @param bubbleCallback The function which will be called on the given event when the event bubbles back up.
     */
    @Override
    protected void fireEvent(BaseModelEvent event, BubbleCallback bubbleCallback) {
        //if this object is the target, execute event handlers and bubble back up
        super.fireEvent(event, bubbleCallback);

        //if not, propagate event to childeren with callback.
        if(!this.equals(event.getTarget())){
            BubbleCallback callback = () -> {
                super.executeEventHandlers(event);
                bubbleCallback.excecute();
            };

            Collection<V> values = map.values();
            for(V value : values){
                if(value instanceof CollaborativeObject){
                    ((CollaborativeObject) value).fireEvent(event, callback);
                }
            }
        }

        super.fireEvent(event, bubbleCallback);
    }
	
}
