package test.gx.realtime;

public class TestObject implements Cloneable{

	private int id;
	private TestObject child;
	
	public TestObject(int id){
		this.id = id;
	}
	
	public TestObject(int id, TestObject child){
		this(id);
		this.child = child;
	}
	
	public int getId(){
		return id;
	}
	
	public TestObject getChild(){
		return child;
	}
	
	@Override
	public boolean equals(Object object){
		boolean result = false;
		if(object instanceof TestObject){
			TestObject that = (TestObject) object;
			result = this.getId() == that.getId() && this.getChild().equals(that.getChild());
		}
		return result;
	}
	
	@Override
	public TestObject clone(){
		return new TestObject(this.getId(), this.getChild().clone());
	}
	
}
