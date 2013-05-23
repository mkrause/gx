package gx.realtime;

import gx.realtime.Document.EventHandler;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public abstract class CollaborativeObject extends EventTarget{

	//interfaces
	public interface EventHandler{
		public void execute(BaseModelEvent e);
	}
	
	//Attributes
	private String id;
	protected Model model;
	private Map<EventType, Set<EventHandler>> eventHandlers;
	
	//Methods
	
	protected CollaborativeObject(Model model){
		this.model = model;
		this.eventHandlers = new HashMap<EventType, Set<EventHandler>>();
		//TODO: determine id of this object.
	}
	
	public String getId(){
		return id;
	}
	
	public String toString(){
		ObjectMapper mapper = new ObjectMapper();
		StringWriter writer = new StringWriter();
		try {
			mapper.writeValue(writer, this);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return writer.toString();
	}
	
	public void addEventListener(EventType type, EventHandler handler){
    	Set<EventHandler> handlers = eventHandlers.get(type);
    	if(handlers == null){
    		handlers = new HashSet<EventHandler>();
    		eventHandlers.put(type, handlers);
    	}
    	handlers.add(handler);
    }

    public void removeEventListener(EventType type, EventHandler handler){
    	Set<EventHandler> handlers = eventHandlers.get(type);
    	if(handlers != null){
    		handlers.remove(handler);
    	}
    }
    
    protected void fireEvent(EventType type, BaseModelEvent event){
    	Set<EventHandler> handlers = eventHandlers.get(type);
    	for(EventHandler handler : handlers){
    		handler.execute(event);
    	}
    }
    
	protected <E> E clone(E value){
		E clone = null;
		ObjectMapper mapper = new ObjectMapper();
		StringWriter writer = new StringWriter();
		
		try {
			mapper.writeValue(writer, value);
			clone = mapper.readValue(writer.toString(), new TypeReference<E>(){});
		} catch (IOException e) {
			e.printStackTrace();
		}
		return clone;
	}
	
}
