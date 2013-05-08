package test.gxLib;

public class TestObject {

	public int id;
	public TestObject child;
	
	public TestObject(int id){
		this.id = id;
	}
	
	public TestObject(int id, TestObject child){
		this(id);
		this.child = child;
	}
}
