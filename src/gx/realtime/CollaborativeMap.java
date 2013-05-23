package gx.realtime;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.Set;

public class CollaborativeMap<V> extends CollaborativeObject{
	//TODO: javadoc. Use javadoc of google docs as much as possible

	private HashMap<String, V> map;
	
	protected CollaborativeMap(Model model){
		super(model);
		map = new HashMap<String, V>();
	}
	
	public V delete(String key){
		return map.remove(key);
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
	
	public Set<Entry<String, V>> items(){
		return map.entrySet();
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
		return map.put(key, value);
	}
	
	@SuppressWarnings("unchecked")
	public V[] values(){
		return (V[]) map.values().toArray();
	}
	
	public int size(){
		return map.size();
	}
	
	
}
