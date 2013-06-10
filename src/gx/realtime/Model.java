package gx.realtime;

import gx.util.RandomUtils;

import java.lang.reflect.InvocationTargetException;
import java.util.*;
import java.util.Map.Entry;

/**
 * Data model for the document. Contains an object graph that can be referenced
 * via the root node.
 */
public class Model extends EventTarget {

    private Document document;
    private boolean initialized;
    private boolean readOnly;
    private CollaborativeMap<CollaborativeObject> root;

    /**
     * Undo / Redo stacks
     */
    private LinkedList<RevertableEvent> undoableMutations;
    private LinkedList<RevertableEvent> redoableMutations;

    /**
     * Current compound operation.
     */
    private CompoundOperation compoundOperation;

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
        initialized = false;
        readOnly = false;
        
        root = new CollaborativeMap<CollaborativeObject>("root", this);
        undoableMutations = new LinkedList();
        redoableMutations = new LinkedList();
    }

    /**
     * Starts a compound operation. When beginCompoundOperation() is called, all subsequent edits to the data model will be batched together in the
     * undo stack and revision history until endCompoundOperation() is called. Compound operations may be nested inside other compound operations.
     * Note that the compound operation MUST start and end in the same synchronous execution block. If this invariant is violated, the data model
     * will become invalid and all future changes will fail.
     */
    public void beginCompoundOperation() {
        compoundOperation = new CompoundOperation(document.getSession().getSessionId(), document.getMe().getUserId(), true);
    }

    /**
     * Starts a compound operation. If a name is given, that name will be recorded in the mutation for use in revision history, undo menus, etc.
     * When beginCompoundOperation() is called, all subsequent edits to the data model will be batched together in the undo stack and revision history until
     * endCompoundOperation() is called. Compound operations may be nested inside other compound operations. Note that the compound operation
     * MUST start and end in the same synchronous execution block. If this invariant is violated, the data model will become invalid and all future changes will fail.
     * @param opt_name The name for this compount operation.
     */
    public void beginCompoundOperation(String opt_name){
        compoundOperation = new CompoundOperation(document.getSession().getSessionId(), document.getMe().getUserId(), true, opt_name);
    }

    public void beginCreationCompoundOperation(){
        //TODO
    }

    public <T extends CollaborativeObject> T create(Class<T> collabType) {
        return create(RandomUtils.getRandomAlphaNumeric(), collabType);
    }
    
    private <T extends CollaborativeObject> T create(String id, Class<T> collabType) {
        T collabObj;
        try {
            collabObj = collabType.getConstructor(String.class, Model.class).newInstance(id, this);
        } catch (InstantiationException e) {
            e.printStackTrace();
            return null;
        } catch (IllegalAccessException e) {
            e.printStackTrace();
            return null;
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
            return null;
        } catch (InvocationTargetException e) {
            e.printStackTrace();
            return null;
        }
        return collabObj;
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

    public void endCompoundOperation() throws NoCompoundOperationInProgressException {
        if(compoundOperation == null || !compoundOperation.isInProgress()){
            throw new NoCompoundOperationInProgressException();
        } else {
            compoundOperation.setInProgress(false);
            fireEvent(compoundOperation, true);
            //reset
            compoundOperation = null;
        }
    }
    
    public CollaborativeMap<CollaborativeObject> getRoot(){
        return root;
    }
    
    public boolean isInitialized(){
        return initialized;
    }

    private void registerMutation(BaseModelEvent e){
        if(e instanceof RevertableEvent){
            undoableMutations.push((RevertableEvent) e);
            redoableMutations.clear();
            UndoRedoStateChangedEvent erscEvent = new UndoRedoStateChangedEvent(this, canRedo(), canUndo());
            //TODO: fire event on document?
        }
    }

    public void redo(){
        boolean oldUndo = canUndo();
        boolean oldRedo = canRedo();

        RevertableEvent redoableEvent = redoableMutations.pop();
        fireEvent(redoableEvent);

        if(oldUndo != canUndo() || oldRedo || canRedo()){
            UndoRedoStateChangedEvent urscEvent = new UndoRedoStateChangedEvent(this, canRedo(), canUndo());
            //TODO: fire event on document?
        }
    }
    
    public void undo(){
        boolean oldUndo = canUndo();
        boolean oldRedo = canRedo();

        RevertableEvent undoableEvent = undoableMutations.pop();
        BaseModelEvent reverseEvent = undoableEvent.getReverseEvent();
        fireEvent(reverseEvent, false);
        redoableMutations.push(undoableEvent);

        if(oldUndo != canUndo() || oldRedo != canRedo()){
            UndoRedoStateChangedEvent urscEvent = new UndoRedoStateChangedEvent(this, canRedo(), canUndo());
            //TODO: fire event on document?
        }
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
    
    private EventHandler<ObjectAddedEvent> getObjectAddedBuilder() {
        return (event) -> {
            String id = event.getTargetId();
            System.out.println("OBJECT_ADDED: " + id);
            CollaborativeObject collabObject = create(id, event.getObjectType());
            nodes.put(id, collabObject);
            
            // Update the root node if we're adding an object with the
            // special "root" ID
            if (id.equals("root")) {
                root = (CollaborativeMap)collabObject;
            }
        };
    }
    
    private EventHandler<ValuesAddedEvent> getValuesAddedBuilder() {
        return (event) -> {
            String id = event.getTargetId();
            System.out.println("VALUES_ADDED: " + id);
            
            
        };
    }
    
    private EventHandler<ValueChangedEvent> getValueChangedBuilder() {
        return (event) -> {
            String id = event.getTargetId();
            System.out.println("VALUE_CHANGED: " + id);
        };
    }
    
    private EventHandler<ValuesSetEvent> getValuesSetBuilder() {
        return (event) -> {
            String id = event.getTargetId();
            System.out.println("VALUES_SET: " + id);
        };
    }
    
    private EventHandler<ValuesRemovedEvent> getValuesRemovedBuilder() {
        return (event) -> {
            String id = event.getTargetId();
            System.out.println("VALUES_REMOVED: " + id);
        };
    }

    /**
     * Update our local data model based on the given (remote) event.
     * @param event
     */
    private void updateModel(BaseModelEvent event) {
        String id = event.getTargetId();
        if (event.getType().equals(EventType.OBJECT_ADDED)) {
            System.out.println("OBJECT_ADDED: " + id);
            ObjectAddedEvent objectAddedEvent = (ObjectAddedEvent)event;
            CollaborativeObject collabObject = create(id, objectAddedEvent.getObjectType());
            nodes.put(id, collabObject);

            // Update the root node if we're adding an object with the
            // special "root" ID
            if (id.equals("root")) {
                root = (CollaborativeMap)collabObject;
            }
        } else {
            CollaborativeObject collabObject = (CollaborativeObject)nodes.get(id);
            collabObject.updateModel(event);
        }
    }

    /**
     * Take an incoming remote event, and use it to update our local
     * model and fire it to the target object if possible.
     * @param event
     */
    protected void handleRemoteEvent(BaseModelEvent event) {
        updateModel(event);

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

        // Currently, the event may just contain the target ID (because it need
        // not have exited in our local model yet), so set it
        event.setTarget(targetNode);
        fireEvent(event);
    }

    //TODO: maybe break down this method to reduce the cyclomatic complexity.
    public void fireEvent(BaseModelEvent event, boolean register){
        if(event instanceof CompoundOperation){
            CompoundOperation cOperation = (CompoundOperation) event;
            List<RevertableEvent> events = cOperation.getEvents();
            for(RevertableEvent cEvent : events){
                this.fireEvent(cEvent, false);
            }

            if(register){
                registerMutation(cOperation);
            }
        } else if(compoundOperation != null && compoundOperation.isInProgress() && event instanceof RevertableEvent){
            compoundOperation.addEvent((RevertableEvent) event);
        } else {
            super.fireEvent(event);

            event.getTarget().fireEvent(event);

            if(register){
                registerMutation(event);
            }
        }
    }

    @Override
    public void fireEvent(BaseModelEvent event){
        fireEvent(event, true);
    }

    protected Document getDocument() {
        return document;
    }
    
    private Object getNode(String id) {
        return nodes.get(id);
    }
    
    public String toString() {
        return "Model(nodes=" + nodes + ")";
    }

    private class NoCompoundOperationInProgressException extends Exception {
    }
}
