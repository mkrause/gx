package gx.realtime;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.google.gson.Gson;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public abstract class CollaborativeObject implements EventTarget {
    
	//Attributes
	private String id;
	protected Model model;
	private Map<EventType, Set<EventHandler>> eventHandlers;
	
	//Methods

    /**
     * CollaborativeObject contains behavior common to all built in collaborative types. This class should not be instantiated directly.
     * Use the create* methods on gx.realtime.Model to create specific types of collaborative objects.
     * @param id The id of this object, determined by the model.
     * @param model The document model.
     */
	public CollaborativeObject(String id, Model model){
        this.id = id;
		this.model = model;
		this.eventHandlers = new HashMap<EventType, Set<EventHandler>>();
	}

    /**
     * Returns the object id.
     * @return The id.
     */
	public String getId(){
		return id;
	}

    /**
     * Returns a string representation of this collaborative object.
     * @return A string representation.
     */
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

    /**
     * Adds an event listener to the event target. The same handler can only be added once per the type.
     * Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
     * @param type The type of the event to listen for.
     * @param handler The function to handle the event. The handler can also be an object that implements the handleEvent method which takes the event object as argument.
     */
	public void addEventListener(EventType type, EventHandler handler){
    	Set<EventHandler> handlers = eventHandlers.get(type);
    	if(handlers == null){
    		handlers = new HashSet<EventHandler>();
    		eventHandlers.put(type, handlers);
    	}
    	handlers.add(handler);
    }

    /**
     * Removes an event listener from the event target. The handler must be the same object as the one added. If the handler has not been added then nothing is done.
     * @param type The type of the event to listen for.
     * @param handler The function to handle the event. The handler can also be an object that implements the handleEvent method which takes the event object as argument.
     */
    public void removeEventListener(EventType type, EventHandler handler){
    	Set<EventHandler> handlers = eventHandlers.get(type);
    	if(handlers != null){
    		handlers.remove(handler);
    	}
    }

    /**
     * Dispatches the given event of the given event type to this object. According to the given EventType, the corresponding EventHandlers are executed.
     * This method is only to be called by the gx.realtime.Document.
     * @param type The event type.
     * @param event The event object, containing any necessary information.
     */
    public void fireEvent(EventType type, BaseModelEvent event){
    	Set<EventHandler> handlers = eventHandlers.get(type);
    	for(EventHandler handler : handlers){
    		handler.handleEvent(event);
    	}
    }

    /**
     * This is an internal function for cloning objects of a given type. Examples are the CollaborativeMap and CollaborativeList which need to clone their contents
     * when returning for instance an Array of the values.
     * This is done by means of JSON serialization, in order to avoid constraining the used types to Cloneables.
     * @param value The object that needs to be cloned.
     * @param <E> The Object type.
     * @return A clone of the given object.
     */
	protected static <E> E clone(E value){
        Gson gson = new Gson();
        return (E) gson.fromJson(gson.toJson(value), value.getClass());
	}

}
