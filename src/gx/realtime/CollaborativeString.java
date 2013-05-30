package gx.realtime;

public class CollaborativeString extends CollaborativeObject {
	
	private String value;
	
	public CollaborativeString(Model model){
		super(model);
	}
	
	public void append (String text){
		value += text;
	}
	
	public String getText(){
		return value;
	}
	
	public void insertString(int index, String text){
		value = value.substring(0, index) + text + value.substring(index);
	}
	
	public IndexReference registerReference(int index, boolean canBeDeleted){
		return new IndexReference(this.model, index, canBeDeleted);
	}
	
	public void removeRange(int startIndex, int endIndex){
		value = value.substring(0, startIndex) + value.substring(endIndex);
	}
	
	public void setText(String text){
		//TODO: investigate why in the Google SDK API they say that the value should be changed with text insert and remove actions.
		value = text;
	}
	
	public int length(){
		return value.length();
	}

}
