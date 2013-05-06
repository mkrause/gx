package gxLib;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.Set;

public class CollaborativeMap<V extends Cloneable>{
	
	//TODO: javadoc. Use javadoc of google docs as much as possible

	private HashMap<String, V> map;
	private String id;
	public int size;
	
	//TODO: constructor:
	//This class should not be instantiated directly. To create a new map, use gapi.drive.realtime.Model.prototype.createMap().
	public CollaborativeMap(){
		map = new HashMap<String, V>();
		//TODO: determine the id of this object...
	}
	
	public V delete(String key){
		V result = map.remove(key);
		size = map.size();
		return result;
	}
	
	public V get(String key){
		return map.get(key);
	}
	
	public boolean has(String key){
		return map.containsKey(key);
	}
	
	public boolean isEmpty(){
		return map.isEmpty();
	}
	
	/* TODO: implement items function
	 * note that returned items should be clones. So either use a clone library, or only support 
	 * cloneable objects (However this means that immutable objects such as Integers and Strings are not supported and
	 * need to be worked around)
	 */
	public V[][] items(){
		//TODO
		return null;
	}
	
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
	
	public V set(String key, V value){
		V result = map.put(key, value);
		size = map.size();
		return result;
	}
	
	/*TODO: create array of clones. Note that this means we can only support cloneable objects, or need a cloning library */
	public V[] values(){
		//TODO
		return null;
	}
	
	public String getId(){
		return this.id;
	}
	
	public String toString(){
		return map.toString();
	}
	
	public void addEventListener(){
		//TODO?
	}
	
	public void removeEventListener(){
		//TODO?
	}
	
	
	
}
