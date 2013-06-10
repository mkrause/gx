package gx.realtime;

import gx.util.RandomUtils;

import java.lang.reflect.InvocationTargetException;
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
        initialized = false;
        readOnly = false;
        
        root = new CollaborativeMap<CollaborativeObject>("root", this);
        undoableMutations = new LinkedList<BaseModelEvent>();
        redoableMutations = new LinkedList<BaseModelEvent>();
    }
    
    public void beginCompoundOperation(String opt_name){
        //TODO: make sure that changes that occur are sent in the same batch to the browser channel
    }
    
    public void beginCompoundOperation(){
        //TODO: make sure that changes that occur are sent in the same batch to the browser channel
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
        /*TODO: check if BaseModelEvent should be revertable.
         * Base this on the types which can be reverted according to the constructRevertEvent method.
         * Note that some events should not be revertable such as a Collaborator_joined event.
         */

        undoableMutations.push(e);
    }

    public void redo(){
        //TODO: redo last action of redoableMutation stack.
    }
    
    public void undo(){
        //TODO: undo last action of undoableMutation stack.
    }

    private BaseModelEvent constructRevertEvent(BaseModelEvent event){
        /*
            case OBJECT_ADDED:
                //OBJECT_CHANGED?
                //TODO: should this actually be undoable? Or will this event always be followed by a different object.
                break;
            case OBJECT_CHANGED:
                //OBJECT_CHANGED - As this is actually a wrapper event for other events, this should not have a reverse event.
                break;
            case REFERENCE_SHIFTED:
                //REFERENCE_SHIFTED - shift back
                ReferenceShiftedEvent rsEvent = (ReferenceShiftedEvent) event;
                result = new ReferenceShiftedEvent((IndexReference) rsEvent.getTarget(), rsEvent.getNewIndex(), rsEvent.getOldIndex(), rsEvent.getSessionId(), rsEvent.getUserId(), rsEvent.isLocal());
                break;
            case VALUES_ADDED:
                ValuesAddedEvent vaEvent = (ValuesAddedEvent) event;
                result = new ValuesRemovedEvent((CollaborativeList) vaEvent.getTarget(), vaEvent.getSessionId(), vaEvent.getUserId(), vaEvent.isLocal(), vaEvent.getIndex(), vaEvent.getValues());
                break;
            case VALUES_REMOVED:
                ValuesRemovedEvent vrEvent = (ValuesRemovedEvent) event;
                result = new ValuesAddedEvent((CollaborativeList) vrEvent.getTarget(), vrEvent.getSessionId(), vrEvent.getUserId(), vrEvent.isLocal(), vrEvent.getIndex(), vrEvent.getValues());
                break;
            case VALUES_SET:
                //VALUES_SET - set back
                ValuesSetEvent vsEvent = (ValuesSetEvent) event;
                result = new ValuesSetEvent((CollaborativeList) vsEvent.getTarget(), vsEvent.getSessionId(), vsEvent.getUserId(), vsEvent.isLocal(), vsEvent.getIndex(), vsEvent.getNewValues(), vsEvent.getOldValues());
                break;
            case VALUE_CHANGED:
                //VALUE_CHANGED - change back
                ValueChangedEvent vcEvent = (ValueChangedEvent) event;
                result = new ValueChangedEvent(vcEvent.getTarget(), vcEvent.getSessionId(), vcEvent.getUserId(), vcEvent.isLocal(), vcEvent.getProperty(), vcEvent.getOldValue(), vcEvent.getNewValue());
                break;
        }
        return result;
        */
        return null;
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
     * Take an incoming remot event, and use it to update our local
     * model and fire it to the target object if possible.
     * @param event
     */
    protected void handleRemoteEvent(BaseModelEvent event) {
        //TODO: registerMutation. Only if event has actually changed an object?
        //TODO: clear redoable stack?
        //TODO: fire UndoRedoStateChangedEvent when canRedo or canUndo state changes.
        // https://developers.google.com/drive/realtime/handle-events#undo_and_redo_state_events

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
        
        targetNode.fireEvent(event);
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
}
