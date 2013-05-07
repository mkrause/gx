package gxLib;

import java.io.IOException;
import java.io.StringWriter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public abstract class CollaborativeObject extends EventTarget{

	private String id;
	protected Model model;
	
	public CollaborativeObject(Model model){
		this.model = model;
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
	
	public void addEventListener(/*TODO*/){
		//TODO?
	}
	
	public void removeEventListener(/*TODO*/){
		//TODO?
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
