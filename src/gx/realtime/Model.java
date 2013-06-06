package gx.realtime;

import gx.util.RandomUtils;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

/**
 * Data model for the document. Contains an object graph that can be referenced
 * via the root node.
 */
public class Model extends EventTarget {

    private Document document;
    private boolean initialized;
    private boolean readOnly;
    private CollaborativeMap<CollaborativeObject> root;
    
    private LinkedList<BaseModelEvent> undoableMutations;
    private LinkedList<BaseModelEvent> redoableMutations;
    
    /**
     * Keep track of all the nodes in the data model, indexed
     * by their ID.
     */
    private Map<String, Object> nodes = new HashMap<>();

    /**
     * Constructor. Should not be called directly, a model can be
     * retrieved via the document.
     * @param document
     */
    protected Model(Document document) {
        this.document = document;
        this.root = new CollaborativeMap<CollaborativeObject>("root", this);
        initialized = false;
        undoableMutations = new LinkedList<BaseModelEvent>();
        redoableMutations = new LinkedList<BaseModelEvent>();
        readOnly = false;

        addDocumentEventHandlers();
    }
    
    private void addDocumentEventHandlers() {
        document.addEventListener(EventType.VALUES_ADDED, (ValuesAddedEvent e) -> {
            System.out.println("VALUES_ADDED");
        });
    }
    
    public void beginCompoundOperation(String opt_name){
        //TODO: make sure that changes that occur are sent in the same batch to the browser channel
    }
    
    public void beginCompoundOperation(){
        //TODO: make sure that changes that occur are sent in the same batch to the browser channel
    }
    
    public Object create(/*TODO*/){
        //TODO
        return null;
    }
    
    public <E> CollaborativeList<E> createList(){
        return new CollaborativeList<E>(RandomUtils.getRandomAlphaNumeric(), this);
    }
    
    public <E> CollaborativeList<E> createList(E[] opt_initialValue){
        CollaborativeList<E> result = createList();
        result.pushAll(opt_initialValue);
        return result;
    }
    
    public <E> CollaborativeMap<E> createMap(){
        return new CollaborativeMap<E>(RandomUtils.getRandomAlphaNumeric(), this);
    }
    
    public <E> CollaborativeMap<E> createMap(Map<String, E> opt_initialValue){
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

    //TODO: maybe make this public in order to call it from the node that was actually mutated?
    private void registerMutation(BaseModelEvent e){
        undoableMutations.push(e);
    }

    public void redo(){
        //TODO: redo last action of redoableMutation stack.
    }
    
    public void undo(){
        //TODO: undo last action of undoableMutation stack.
    }

    private BaseModelEvent constructRevertEvent(BaseModelEvent event){
        BaseModelEvent result = null;
        switch (event.getType()) {
            case TEXT_INSERTED:
                TextInsertedEvent tiEvent = (TextInsertedEvent) event;
                result = new TextDeletedEvent((CollaborativeString) tiEvent.getTarget(), tiEvent.getSessionId(), tiEvent.getUserId(), tiEvent.isLocal(), tiEvent.getIndex(), tiEvent.getText());
                break;
            case TEXT_DELETED:
                //TEXT_INSERTED
                TextDeletedEvent tdEvent = (TextDeletedEvent) event;
                result = new TextInsertedEvent((CollaborativeString) tdEvent.getTarget(), tdEvent.getSessionId(), tdEvent.getUserId(), tdEvent.isLocal(), tdEvent.getIndex(), tdEvent.getText());
                break;
            case COLLABORATOR_JOINED:
                //COLLABORATOR_LEFT
                break;
            case COLLABORATOR_LEFT:
                //COLLABORATOR_JOINED
                break;
            case DOCUMENT_SAVE_STATE_CHANGED:
                //DOCUMENT_SAVE_STATE_CHANGED?
                break;
            case OBJECT_ADDED:
                //OBJECT_CHANGED?
                break;
            case OBJECT_CHANGED:
                //OBJECT_CHANGED
                break;
            case REFERENCE_SHIFTED:
                //REFERENCE_SHIFTED?
                break;
            case VALUES_ADDED:
                //VALUES_REMOVED
                break;
            case VALUES_REMOVED:
                //VALUES_ADDED
                break;
            case VALUES_SET:
                //VALUE_SET?
                break;
            case VALUE_CHANGED:
                //VALUE_CHANGED?
                break;
        }
        return result;
    }

    public boolean canRedo(){
        return redoableMutations.size() > 0;
    }
    
    public boolean canUndo(){
        return undoableMutations.size() > 0;
    }
    
    public boolean isReadOnly(){
        return readOnly;
    }
    
    public void handleRemoteEvent(BaseModelEvent event) {
        //TODO: registerMutation. Only if event has actually changed an object?
        //TODO: clear redoable stack?
        //TODO: fire UndoRedoStateChangedEvent when canRedo or canUndo state changes.
        // https://developers.google.com/drive/realtime/handle-events#undo_and_redo_state_events
        
        String targetId = event.getTargetId();
        Object node = getNode(targetId);
        
        if (node == null) {
            // Unknown target ID, so ignore
            //TODO: logging
            return;
        }
        
        if (!(node instanceof EventTarget)) {
            // Not an event target, so ignore
            return;
        }
        
        EventTarget targetNode = (EventTarget)node;
        targetNode.fireEvent(event);
    }
    
    protected Document getDocument() {
        return document;
    }
    
    private Object getNode(String id) {
        return nodes.get(id);
    }
}
