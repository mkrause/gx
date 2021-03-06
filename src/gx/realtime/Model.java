package gx.realtime;

import gx.browserchannel.BrowserChannel;
import gx.browserchannel.message.SaveMessage;
import gx.realtime.operation.ValueChangedOperation.ValueType;
import gx.util.RandomUtils;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.lang.reflect.InvocationTargetException;
import java.util.*;
import java.util.Map.Entry;

/**
 * Data model for the document. Contains an object graph that can be referenced
 * via the root node.
 */
public class Model extends EventTarget
{

    public class NoCompoundOperationInProgressException extends Exception
    {
    }

    private Document document;
    private boolean initialized;
    private boolean readOnly;
    private CollaborativeMap root;

    /**
     * Undo / Redo stacks
     */
    private LinkedList<RevertableEvent> undoableMutations;
    private LinkedList<RevertableEvent> redoableMutations;

    /**
     * Current compound operation.
     */
    private Stack<CompoundOperation> compoundOperations;

    /**
     * Keep track of all the nodes in the data model, indexed
     * by their ID.
     */
    private Map<String, Object> nodes = new HashMap<>();

    /**
     * Constructor. Should not be called directly, a model can be
     * retrieved via the document.
     *
     * @param document
     */
    protected Model(Document document)
    {
        this.document = document;
        initialized = false;
        readOnly = false;

        root = new CollaborativeMap("root", this);

        undoableMutations = new LinkedList<>();
        redoableMutations = new LinkedList<>();
        compoundOperations = new Stack<>();
    }

    /**
     * Starts a compound operation. When beginCompoundOperation() is called, all subsequent edits to the data model will be batched together in the
     * undo stack and revision history until endCompoundOperation() is called. Compound operations may be nested inside other compound operations.
     * Note that the compound operation MUST start and end in the same synchronous execution block. If this invariant is violated, the data model
     * will become invalid and all future changes will fail.
     */
    public void beginCompoundOperation()
    {
        beginCompoundOperation(null);
    }

    /**
     * Starts a compound operation. If a name is given, that name will be recorded in the mutation for use in revision history, undo menus, etc.
     * When beginCompoundOperation() is called, all subsequent edits to the data model will be batched together in the undo stack and revision history until
     * endCompoundOperation() is called. Compound operations may be nested inside other compound operations. Note that the compound operation
     * MUST start and end in the same synchronous execution block. If this invariant is violated, the data model will become invalid and all future changes will fail.
     *
     * @param opt_name The name for this compound operation.
     */
    public void beginCompoundOperation(String opt_name)
    {
        CompoundOperation newCompoundOperation = new CompoundOperation(document.getSession().getSessionId(), document.getMe().getUserId(), true, opt_name);

        // Create nested compound operation
        if (compoundOperationInProgress()) {
            CompoundOperation currentCO = compoundOperations.peek();
            currentCO.addEvent(newCompoundOperation);
        }

        compoundOperations.push(newCompoundOperation);
    }

    public void beginCreationCompoundOperation()
    {
        //TODO
        throw new NotImplementedException();
    }

    /**
     * Creates and returns a new collaborative object. This can be used to create custom collaborative objects. For built in types, use the specific create* functions.
     *
     * @param collabType The type of the CollaborativeObject.
     * @param <T>        The generic type of the CollaborativeObject, if applicable.
     * @return A newly created CollaborativeObject.
     */
    public <T extends CollaborativeObject> T create(Class<T> collabType)
    {
        // TODO: send event to remote
        return create(RandomUtils.getRandomAlphaNumeric(), collabType);
    }

    /**
     * Creates and returns a new collaborative object. This can be used to create custom collaborative objects. For built in types, use the specific create* functions.
     *
     * @param id         The id that should be assigned to the newly created CollaborativeObject.
     * @param collabType The type of the CollabObject.
     * @param <T>        The generic type of the CollabObject, if applicable.
     * @return A newly created CollaborativeObject.
     */
    private <T extends CollaborativeObject> T create(String id, Class<T> collabType)
    {
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

    /**
     * Creates an empty Collaborative List.
     *
     * @return A new empty Collaborative List.
     */
    public CollaborativeList createList()
    {
        CollaborativeList list = new CollaborativeList(RandomUtils.getRandomAlphaNumeric(), this);
        BaseModelEvent event = new ObjectAddedEvent(list.getId(), getSessionId(), getUserId(), true, ObjectType.COLLABORATIVE_LIST);
        dispatchAndSendEvent(event);
        return list;
    }

    /**
     * Creates a Collaborative List with the given initial values.
     *
     * @param opt_initialValue Initial value for the list.
     * @return A Collaborative List with the given initial values.
     */
    public CollaborativeList createList(List opt_initialValue)
    {
        beginCompoundOperation("initialize");

        CollaborativeList result = createList();
        result.pushAll(opt_initialValue);

        try {
            endCompoundOperation();
        } catch (NoCompoundOperationInProgressException e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * Creates an empty Collaborative Map.
     *
     * @return A newly created empty Collaborative Map.
     */
    public CollaborativeMap createMap()
    {
        CollaborativeMap map = new CollaborativeMap(RandomUtils.getRandomAlphaNumeric(), this);
        BaseModelEvent event = new ObjectAddedEvent(map.getId(), getSessionId(), getUserId(), true, ObjectType.COLLABORATIVE_MAP);
        dispatchAndSendEvent(event);
        return map;
    }

    /**
     * Creates a collaborative map with the given values as initial content.
     *
     * @param opt_initialValue Initial value for the map.
     * @return A newly created Collaborative Map with the given values as initial content.
     */
    public CollaborativeMap createMap(Map<String, Object> opt_initialValue)
    {
        beginCompoundOperation("initialize");

        CollaborativeMap result = createMap();
        Set<Entry<String, Object>> entries = opt_initialValue.entrySet();
        for (Entry<String, Object> entry : entries) {
            result.set(entry.getKey(), entry.getValue());
        }

        try {
            endCompoundOperation();
        } catch (NoCompoundOperationInProgressException e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * Creates a collaborative string.
     *
     * @return A collaborative string.
     */
    public CollaborativeString createString()
    {
        CollaborativeString string = new CollaborativeString(RandomUtils.getRandomAlphaNumeric(), this);
        BaseModelEvent event = new ObjectAddedEvent(string.getId(), getSessionId(), getUserId(), true, ObjectType.COLLABORATIVE_STRING);
        dispatchAndSendEvent(event);
        return string;
    }

    /**
     * Creates a collaborative string with the given initial value.
     *
     * @param opt_initialValue Sets the initial value for this string.
     * @return A collaborative string with the given initial value.
     */
    public CollaborativeString createString(String opt_initialValue)
    {
        beginCompoundOperation("initialize");

        CollaborativeString result = createString();
        result.append(opt_initialValue);

        try {
            endCompoundOperation();
        } catch (NoCompoundOperationInProgressException e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * Ends a compound operation. This method will throw an exception if no compound operation is in progress.
     *
     * @throws NoCompoundOperationInProgressException
     *
     */
    public void endCompoundOperation() throws NoCompoundOperationInProgressException
    {
        if (!compoundOperationInProgress()) {
            throw new NoCompoundOperationInProgressException();
        }

        // End last compound operation
        CompoundOperation compoundOperation = compoundOperations.pop();
        compoundOperation.setInProgress(false);

        // Send changes if the last compound operations is closed
        if(!compoundOperationInProgress()) {
            executeCompoundOperation(compoundOperation);
        }
    }

    public boolean compoundOperationInProgress()
    {
        return !compoundOperations.isEmpty();
    }

    /**
     * Returns the root of the object model.
     *
     * @return The root of the object model.
     */
    public CollaborativeMap getRoot()
    {
        return root;
    }

    /**
     * Returns whether the model is initialized.
     *
     * @return Whether the model is initialized.
     */
    public boolean isInitialized()
    {
        return initialized;
    }

    /**
     * This method is a wrapper function for storing BaseModelEvents on the undoableMutations stack.
     * It checks whether the given BaseModelEvent is revertable. Iff so, it pushes it on the stack, clears the redo stack and fires an
     * UndoRedoStateChangedEvent iff the canUndo or canRedo state has changed.
     *
     * @param e The event that should be registered.
     */
    private void registerMutation(Event e)
    {
        if (e instanceof RevertableEvent) {
            boolean oldUndo = canUndo();
            boolean oldRedo = canRedo();

            undoableMutations.push((RevertableEvent) e);
            redoableMutations.clear();

            if (oldUndo != canUndo() || oldRedo != canRedo()) {
                UndoRedoStateChangedEvent urscEvent = new UndoRedoStateChangedEvent(this, canRedo(), canUndo());
                dispatchEvent(urscEvent);
            }
        }
    }

    /**
     * Redo the last thing the active collaborator undid.
     */
    public void redo()
    {
        boolean oldUndo = canUndo();
        boolean oldRedo = canRedo();

        RevertableEvent redoableEvent = redoableMutations.pop();
        undoableMutations.push(redoableEvent);

        redoableEvent = redoableEvent.getReverseEvent().getReverseEvent();
        redoableEvent.setLocal(false);

        // Redo changes
        updateModel(redoableEvent);
        dispatchAndSendEvent(redoableEvent, false);

        if (oldUndo != canUndo() || oldRedo != canRedo()) {
            UndoRedoStateChangedEvent urscEvent = new UndoRedoStateChangedEvent(this, canRedo(), canUndo());
            dispatchEvent(urscEvent);
        }
    }

    /**
     * Undo the last thing the active collaborator did.
     */
    public void undo()
    {
        boolean oldUndo = canUndo();
        boolean oldRedo = canRedo();

        RevertableEvent undoableEvent = undoableMutations.pop();
        redoableMutations.push(undoableEvent);

        BaseModelEvent reverseEvent = undoableEvent.getReverseEvent();
        reverseEvent.setLocal(false);

        // Undo changes
        updateModel(reverseEvent);
        dispatchAndSendEvent(reverseEvent, false);

        if (oldUndo != canUndo() || oldRedo != canRedo()) {
            UndoRedoStateChangedEvent urscEvent = new UndoRedoStateChangedEvent(this, canRedo(), canUndo());
            dispatchEvent(urscEvent);
        }
    }

    /**
     * @return True iff the model can currently redo.
     */
    public boolean canRedo()
    {
        return redoableMutations.size() > 0;
    }

    /**
     * @return True if the model can currently undo.
     */
    public boolean canUndo()
    {
        return undoableMutations.size() > 0;
    }

    /**
     * @return The mode of the document. If true, the document is readonly. If false it is editable.
     */
    public boolean isReadOnly()
    {
        return readOnly;
    }

    /**
     * This method adds a node to this model based on the given ObjectAddedEvent. If the event contains a map with ID "root", it will be added
     * as root of this model.
     * @param event The ObjectAddedEvent that contains a new object that should be added.
     */
    protected void addNodeFromEvent(ObjectAddedEvent event)
    {
        String id = event.getTargetId();

        System.out.println("OBJECT_ADDED: " + id);
        CollaborativeObject collabObject = create(id, event.getObjectType());
        nodes.put(id, collabObject);

        // Update the root node if we're adding an object with the
        // special "root" ID
        if (id.equals("root")) {
            root = (CollaborativeMap) collabObject;
        }
    }

    /**
     * Update our local data model based on the given (remote) event.
     *
     * @param event
     */
    private void updateModel(BaseModelEvent event)
    {
        if (event instanceof ObjectChangedEvent) {
            ObjectChangedEvent ocEvent = (ObjectChangedEvent) event;
            for (BaseModelEvent e : ocEvent.getEvents()) {
                updateModel(e);
            }
        } else if (event instanceof CompoundOperation) {
            CompoundOperation coEvent = (CompoundOperation) event;
            for (BaseModelEvent e : coEvent.getEvents()) {
                updateModel(e);
            }
        } else {
            EventTarget target = event.getTarget();
            if (target instanceof CollaborativeObject)
                ((CollaborativeObject) target).updateModel(event);
        }
    }

    /**
     * An event may still contains some node IDs in string form,
     * deserialize these now when we know the objects have been created.
     *
     * @param event
     */
    private void deserializeEvent(BaseModelEvent event)
    {
        // Set the target node
        EventTarget targetNode = (EventTarget) nodes.get(event.getTargetId());
        event.setTarget(targetNode);

        if (event instanceof ValueChangedEvent) {
            ValueChangedEvent vcEvent = (ValueChangedEvent) event;
            ValueType valueType = vcEvent.getValueType();
            if (valueType.equals(ValueType.COLLABORATIVE_OBJECT)) {
                Object node = nodes.get(vcEvent.getNewValue());
                vcEvent.setNewValue(node);

                // The target node should be a map (since it's a ValueChangedEvent)
                CollaborativeMap targetMap = (CollaborativeMap) targetNode;

                // Set the "old value" using the current value in the model
                Object currentValue = targetMap.get(vcEvent.getProperty());
                vcEvent.setOldValue(currentValue);
            }
        } else if (event instanceof ObjectChangedEvent) {
            ObjectChangedEvent ocEvent = (ObjectChangedEvent) event;
            for (BaseModelEvent e : ocEvent.getEvents()) {
                deserializeEvent(e);
            }
        }
    }

    /**
     * Take an incoming remote event (event received from browserchannel), and use it to update our local
     * model and fire it to the target object, if possible.
     *
     * @param event
     */
    protected void handleRemoteEvent(BaseModelEvent event)
    {
        // Update revision
        if (event instanceof ObjectChangedEvent) {
            ObjectChangedEvent oceEvent = (ObjectChangedEvent) event;
            document.getSession().setRevision(oceEvent.getRevision());
        }

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

        // The event may still contains some node IDs in string form,
        // deserialize these now that we know the objects have been created
        deserializeEvent(event);

        // Update out local mode based on this remote event
        updateModel(event);

        dispatchEvent(event);
    }

    /**
     * This method executes a CompoundOperation on this model, which means that a compound operation is started,
     * the contained events are processed, after which the compound operation is closed an any consecutive event handlers are fired.
     * @param event The CompoundOperation that needs to be processed.
     */
    private void executeCompoundOperation(CompoundOperation event)
    {
        registerMutation(event);

        // Fire ObjectChangedEvents on the original targets
        dispatchEvent(event);

        // Send event
        sendToRemote(event);
    }


    /**
     * @return The document of this Model.
     */
    protected Document getDocument()
    {
        return document;
    }

    /**
     * Sends a BaseModelEvent to the remote server.
     *
     * @param event
     */
    private void sendToRemote(BaseModelEvent event)
    {
        // Don't send remote events
        if (document == null)
            return;

        // Wrap single operation in a compound operation for sending
        CompoundOperation eventToSend;
        if (event instanceof CompoundOperation) {
            eventToSend = (CompoundOperation) event;
        } else {
            eventToSend = new CompoundOperation(getSessionId(), getUserId(), true);
            eventToSend.addEvent(event);
        }

        BrowserChannel channel = document.getBrowserChannel();
        SaveMessage message = new SaveMessage(eventToSend);
        message.setRevision(document.getSession().getRevision());
        channel.queue(message);
    }

    /**
     * This method registers the given BaseModelEvent on the undo stack, dispatches the event to this model and sends it to the remote.
     * @param event The event that should be dispatched and sent.
     */
    public void dispatchAndSendEvent(BaseModelEvent event)
    {
        dispatchAndSendEvent(event, true);
    }

    /**
     * This method registers the given BaseModelEvent iff register = true, dispatches the event to this model and sends it to the remote.
     * @param event The event that should be dispatched and sent.
     * @param register Indicate whether the given BaseModelEvent should be pushed on the undo stack.
     */
    private void dispatchAndSendEvent(BaseModelEvent event, boolean register)
    {
        // Buffer events if a compound operation is in progress
        if (compoundOperationInProgress() && event instanceof RevertableEvent) {
            compoundOperations.peek().addEvent((RevertableEvent) event);
            return;
        }

        if (register)
            registerMutation(event);

        // Fire an object changed event that bubbles up the tree
        dispatchEvent(event);

        // Send event
        sendToRemote(event);
    }

    /**
     * This method dispatches a ObjectChangedEvent based on the given event to the target of the given event iff the event is an ObjectChangedEvent or a BaseModelEvent.
     * Else, the event will just be fired on the target.
     * @param event The event to be dispatched.
     */
    public void dispatchEvent(Event event)
    {
        if (event instanceof CompoundOperation) {
            List<ObjectChangedEvent> ocEvents = ((CompoundOperation) event).toObjectChangedEvents();
            for (ObjectChangedEvent oce : ocEvents) {
                dispatchEvent(oce);
            }
            return;
        }

        if (event instanceof ObjectAddedEvent)
            return;

        if (event.getTarget() == null)
            return;

        Event eventToDispatch;
        if (event instanceof ObjectChangedEvent) {
            eventToDispatch = event;
        } else if (event instanceof BaseModelEvent) {
            BaseModelEvent bmEvent = (BaseModelEvent) event;
            List<BaseModelEvent> eventList = new LinkedList<>();
            eventList.add(bmEvent);
            eventToDispatch = new ObjectChangedEvent(bmEvent.getTarget(), getSessionId(), getUserId(), true, eventList);
        } else {
            eventToDispatch = event;
        }

        eventToDispatch.getTarget().fireEvent(eventToDispatch);
    }

    private String getSessionId() {
        return (document != null && document.getSession() != null) ? document.getSession().getSessionId() : null;
    }

    private String getUserId() {
        return (document != null && document.getMe() != null) ? document.getMe().getUserId() : null;
    }

    /**
     * @param id The if of the node we are looking for.
     * @return The node with the given id iff found. Null otherwise.
     */
    private Object getNode(String id)
    {
        return nodes.get(id);
    }

    /**
     * @return A String representation of this Model.
     */
    public String toString()
    {
        return "Model(nodes=" + nodes + ")";
    }
}
