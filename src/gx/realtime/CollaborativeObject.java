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

public abstract class CollaborativeObject extends EventTarget {
    
	//Attributes
	private String id;
	protected Model model;

	//Methods

    /**
     * CollaborativeObject contains behavior common to all built in collaborative types. This class should not be instantiated directly.
     * Use the create* methods on gx.realtime.Model to create specific types of collaborative objects.
     * @param id The id of this object, determined by the model.
     * @param model The document model.
     */
	public CollaborativeObject(String id, Model model){
        super();
        this.id = id;
		this.model = model;
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
