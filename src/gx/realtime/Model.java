package gx.realtime;

import gx.util.RandomUtils;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

public class Model implements EventTarget {

    private Document document;
    private CollaborativeMap<CollaborativeObject> root;
    private boolean initialized;
    private boolean canRedo;
    private boolean canUndo;
    private boolean readOnly;


    protected Model(Document document){
        this.document = document;
        this.root = new CollaborativeMap<CollaborativeObject>(RandomUtils.getRandomAlphaNumeric(), this);
        initialized = true;
        canRedo = false;
        canUndo = false;
        readOnly = false;

        addDocumentEventHandlers();
    }
    
    private void addDocumentEventHandlers() {
        document.addEventListener(EventType.VALUES_ADDED, (ValuesAddedEvent e) -> {
            System.out.println("VALUES_ADDED");
        });
    }
    
    public void beginCompoundOperation(String opt_name){
        //TODO
    }
    
    public void beginCompoundOperation(){
        //TODO
    }
    
    public Object create(/*TODO*/){
        //TODO
        return null;
    }
    
    public <E extends CollaborativeObject> CollaborativeList<E> createList(){
        return new CollaborativeList<E>(RandomUtils.getRandomAlphaNumeric(), this);
    }
    
    public <E extends CollaborativeObject> CollaborativeList<E> createList(E[] opt_initialValue){
        CollaborativeList<E> result = createList();
        result.pushAll(opt_initialValue);
        return result;
    }
    
    public <E extends CollaborativeObject> CollaborativeMap<E> createMap(){
        return new CollaborativeMap<E>(RandomUtils.getRandomAlphaNumeric(), this);
    }
    
    public <E extends CollaborativeObject> CollaborativeMap<E> createMap(Map<String, E> opt_initialValue){
        CollaborativeMap<E> result = createMap();
        Set<Entry<String, E>> entries = opt_initialValue.entrySet();
        for(Entry<String, E> entry : entries){
            result.set(entry.getKey(), entry.getValue());
        }
        return result;
    }
    
    public CollaborativeString createString(){
        return new CollaborativeString(RandomUtils.getRandomAlphaNumeric(), this);
    }
    
    public CollaborativeString createString(String opt_initialValue){
        CollaborativeString result = createString();
        result.setText(opt_initialValue);
        return result;
    }

    public void endCompoundOperation(){
        //TODO
    }
    
    public CollaborativeMap<CollaborativeObject> getRoot(){
        //TODO: make sure that the documents in this root element are updated
        return root;
    }
    
    public boolean isInitialized(){
        return initialized;
    }
    
    public void redo(){
        //TODO
    }
    
    public void undo(){
        //TODO
    }
    
    public boolean canRedo(){
        return canRedo;
    }
    
    public boolean canUndo(){
        return canUndo;
    }
    
    public boolean isReadOnly(){
        return readOnly;
    }

    public void addEventListener(EventType type, EventHandler handler) {
        //TODO
    }

    public void removeEventListener(EventType type, EventHandler handler) {
        //TODO
    }

    protected void fireEvent(EventType type, BaseModelEvent event) {
        // Pass the event via the root to whoever is the target
        root.fireEvent(type, event);
    }
}
