package gx.realtime;

import java.util.HashSet;
import java.util.Set;

public class TestObject extends EventTarget implements Cloneable {

	private int id;
    private Set<TestObject> children;

	public TestObject(int id){
        this.id = id;
        children = new HashSet();
	}
	
	public TestObject(int id, TestObject child){
		this(id);
        children = new HashSet();
        children.add(child);
        child.addParent(this);
	}

	public int getId(){
		return id;
	}
	
	public Set<TestObject> getChildren(){
		return children;
	}

    public TestObject getChild(){
        TestObject result = null;
        if(children.size() == 1){
            result = children.iterator().next();
        }
        return result;
    }

    public void addChild(TestObject object){
        children.add(object);
        object.addParent(this);
    }

    public void removeChild(TestObject object){
        children.remove(object);
        object.removeParent(this);
    }
	
	@Override
	public boolean equals(Object object){
		boolean result = false;
		if(object instanceof TestObject){
			TestObject that = (TestObject) object;
			result = this.getId() == that.getId();
            if(this.getChild() != null){
                result &= this.getChild().equals(that.getChild());
            } else {
                result &= that.getChild() == null;
            }
		}
		return result;
	}

    @Override
    public String toString(){
        return "(" + this.id + ", " + this.children + ")";
    }
	
	@Override
	public TestObject clone(){
        TestObject result = null;
        if(this.getChild() != null){
            result = new TestObject(this.getId(), this.getChild().clone());
        } else {
            result = new TestObject(this.getId());
        }
        return result;
	}

    public void setId(int id) {
        this.id = id;
    }
}
