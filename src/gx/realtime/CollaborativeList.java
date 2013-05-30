package gx.realtime;

import gx.util.RandomUtils;

import java.util.ArrayList;
import java.util.Comparator;

public class CollaborativeList<E> extends CollaborativeObject{

	private ArrayList<E> values;
	
	public CollaborativeList(String id, Model model){
		super(id, model);
		this.values = new ArrayList<E>();
		//TODO: determine id of the document.
	}
	
	@SuppressWarnings("unchecked")
	public E[] asArray(){
		//TODO: test if this actually clones are returned
		return (E[]) values.toArray();
	}
	
	public E get(int index){
		return values.get(index);
	}
	
	public int indexOf(E value){
		return values.indexOf(value);
	}
	
	public int indexOf(E value, Comparator<E> opt_comparatorFn){
		int result = -1;
		int i = 0;
		while(result == -1 && i < values.size()){
			if(opt_comparatorFn.compare(value, values.get(i)) == 0){
				result = i;
			}
		}
		
		return result;
	}
	
	public void insert(int index, E value){
		values.add(index, value);
	}
	
	public void insertAll(int index, E[] values){
		for(E value : values){
			this.insert(index, value);
			index++;
		}
	}
	
	public int lastIndexOf(E value){
		return values.lastIndexOf(value);
	}
	
	public int lastIndexOf(E value, Comparator<E> opt_comparatorFn){
		int result = -1;
		for(int i = 0; i < values.size(); i++){
			if(opt_comparatorFn.compare(value, values.get(i)) == 0){
				result = i;
			}
		}
		return result;
	}
	
	public int push(E value){
		values.add(value);
		return this.length();
	}
	
	public void pushAll(E[] values){
		for(E value : values){
			this.values.add(value);
		}
	}
	
	public IndexReference registerReference(int index, boolean canBeDeleted){
		return new IndexReference(RandomUtils.getRandomAlphaNumeric(), this.model, index, canBeDeleted);
	}
	
	public void remove(int index){
		values.remove(index);
	}
	
	public void removeRange(int startIndex, int endIndex){
		while(startIndex < endIndex){
			this.remove(startIndex);
			startIndex++;
		}
	}
	
	public boolean removeValue(E value){
		return values.remove(value);
	}
	
	public void replaceRange(int index, E[] values){
		for(E value : values){
			this.set(index, value);
			index++;
		}
	}
	
	public void set(int index, E value){
		values.set(index, value);
	}
	
	public int length(){
		return values.size();
	}
	
}
