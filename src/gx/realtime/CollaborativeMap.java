package gx.realtime;

import java.util.AbstractMap;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.Set;

import com.google.gson.Gson;

/**
 * A collaborative map. A map's key must be a String. The values can contain other Realtime collaborative objects, 
 * custom collaborative objects or Java objects.
 * Changes to the map will automatically be synced with the server and other collaborators. 
 * To listen for changes, add EventListeners for the gapi.drive.realtime.EventType.VALUE_CHANGED event type. 
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
	protected CollaborativeMap(Model model){
		super(model);
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
		//TODO: test if cloning works
		Set<Entry<String, V>> result = new HashSet<Entry<String, V>>();
		Set<Entry<String, V>> entrySet = map.entrySet();
		
		for(Entry<String, V> entry : entrySet){
			result.add(new AbstractMap.SimpleEntry<String, V>(entry.getKey(), clone(entry.getValue())));
		}
		return result;
	}
	
	/**
	 * Returns an array containing a copy of the keys in this map. 
	 * Modifications to the returned array do not modify this collaborative map.
	 * @return The keys in this map.
	 */
	public String[] keys(){
		String[] result = new String[map.size()];
		Iterator<String> keys = map.keySet().iterator();
		
		int i = 0;
		while(keys.hasNext()){
			result[i] = keys.next();
			i++;
		}
		return result;
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
	 * Returns an array containing a copy of the values in this map. 
	 * Modifications to the returned array do not modify this collaborative map.
	 * @return The values in this map.
	 */
	@SuppressWarnings("unchecked")
	public V[] values(){
		//TODO: test if this are actually clones.
		V[] result = (V[]) new Object[map.size()];
		Collection<V> values = map.values();
		int i = 0;
		
		for(V value : values){
			result[i] = clone(value);
			i++;
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
	 * Internal function used for creating clones of the values of this map.
	 * This is done by means of JSON serialization to avoid constraining the values of this map to Cloneables.
	 * @param object The object that needs to be cloned.
	 * @return A clone of the given object.
	 */
	@SuppressWarnings("unchecked")
	private V clone(V object){
		Gson gson = new Gson();
		return (V) gson.fromJson(gson.toJson(object), object.getClass());
	}
	
	
}
