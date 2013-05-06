package gxLib;

public abstract class CollaborativeObject extends EventTarget{

	private String id;
	private Model model;
	
	public CollaborativeObject(Model model){
		this.model = model;
		//TODO: determine id of this object.
	}
	
	public String getId(){
		return id;
	}
	
	public abstract String toString();
	
	public void addEventListener(){
		//TODO?
	}
	
	public void removeEventListener(){
		//TODO?
	}
	
}
