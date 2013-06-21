package gx.realtime;

import gx.realtime.serialize.Cloner;
import gx.util.RandomUtils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class CollaborativeList extends CollaborativeObject
{

    /**
     * Contents of this ColaborativeList
     */
    private List<Object> values;

    /**
     * A collaborative list. A list can contain other Realtime collaborative objects, custom collaborative objects,
     * Java primitive values, or Java objects that can be serialized to JSON.
     * Changes to the list will automatically be synced with the server and other collaborators.
     * To listen for changes, add EventListeners for the following event types:
     * - gx.realtime.EventType.VALUES_ADDED
     * - gx.realtime.EventType.VALUES_REMOVED
     * - gx.realtime.EventType.VALUES_SET
     * This class should not be instantiated directly. To create a new list, use gx.realtime.Model.createList().
     *
     * @param id    The id of this CollaborativeList.
     * @param model The document model.
     */
    public CollaborativeList(String id, Model model)
    {
        super(id, model);
        this.values = new ArrayList<Object>();
    }

    /**
     * Returns a copy of the contents of this collaborative list as an ArrayList.
     * Changes to the returned object will not affect the original collaborative list.
     *
     * @return A copy of the contents of this collaborative list.
     */
    public ArrayList<Object> asArray()
    {
        ArrayList<Object> result = new ArrayList();
        for (Object value : values) {
            result.add(Cloner.clone(value));
        }
        return result;
    }

    /**
     * Removes all values from the list.
     */
    public void clear()
    {
        this.removeRange(0, this.length());
    }

    /**
     * Gets the value at the given index.
     *
     * @param index The index.
     * @return The value at the given index.
     */
    public Object get(int index)
    {
        return values.get(index);
    }

    /**
     * Returns the first index of the given value, or -1 if it cannot be found.
     *
     * @param value The value to find.
     * @return The index of the given value, or -1 if it cannot be found.
     */
    public int indexOf(Object value)
    {
        return values.indexOf(value);
    }

    /**
     * Returns the first index of the given value, or -1 if it cannot be found.
     *
     * @param value            The value to find.
     * @param opt_comparatorFn Optional comparator function used to determine the equality of two items.
     * @return The index of the given value, or -1 if it cannot be found.
     */
    public int indexOf(Object value, Comparator<Object> opt_comparatorFn)
    {
        int result = -1;
        int i = 0;
        while (result == -1 && i < values.size()) {
            if (opt_comparatorFn.compare(value, values.get(i)) == 0) {
                result = i;
            }
            i++;
        }

        return result;
    }

    /**
     * Inserts an item into the list at a given index. It will push the element at the given index to the right.
     *
     * @param index The index to insert at.
     * @param value The value to add.
     */
    public void insert(int index, Object value)
    {
        ArrayList<Object> newValues = new ArrayList<>();
        newValues.add(value);
        BaseModelEvent event = new ValuesAddedEvent(this, getSessionId(), getUserId(), true, index, newValues);
        updateModel(event);
        model.dispatchAndSendEvent(event);
    }

    /**
     * Inserts a list of items into the list at a given index.
     *
     * @param index  The index at which to insert.
     * @param values The values to insert.
     */
    public void insertAll(int index, List<Object> values)
    {
        BaseModelEvent event = new ValuesAddedEvent(this, getSessionId(), getUserId(), true, index, values);
        updateModel(event);
        model.dispatchAndSendEvent(event);
    }

    /**
     * Returns the last index of the given value, or -1 if it cannot be found.
     *
     * @param value The value to find.
     * @return The index of the given value, or -1 if it cannot be found.
     */
    public int lastIndexOf(Object value)
    {
        return values.lastIndexOf(value);
    }

    /**
     * Returns the last index of the given value, or -1 if it cannot be found.
     *
     * @param value            The value to find.
     * @param opt_comparatorFn Optional comparator function used to determine the equality of two items.
     * @return The index of the given value, or -1 if it cannot be found.
     */
    public int lastIndexOf(Object value, Comparator<Object> opt_comparatorFn)
    {
        int result = -1;
        for (int i = 0; i < values.size(); i++) {
            if (opt_comparatorFn.compare(value, values.get(i)) == 0) {
                result = i;
            }
        }
        return result;
    }

    /**
     * Adds an item to the end of the list.
     *
     * @param value The value to add.
     * @return The new array length.
     */
    public int push(Object value)
    {
        ArrayList<Object> newValues = new ArrayList<>();
        newValues.add(value);
        BaseModelEvent event = new ValuesAddedEvent(this, getSessionId(), getUserId(), true, this.length(), newValues);
        updateModel(event);
        model.dispatchAndSendEvent(event);
        return this.length();
    }

    /**
     * Adds an array of values to the end of the list.
     *
     * @param values The values to add.
     */
    public void pushAll(List<Object> values)
    {
        BaseModelEvent event = new ValuesAddedEvent(this, getSessionId(), getUserId(), true, this.length(), values);
        updateModel(event);
        model.dispatchAndSendEvent(event);
    }

    /**
     * Creates an IndexReference at the given index. If canBeDeleted is true, then a delete over the index will delete
     * the reference. Otherwise the reference will shift to the beginning of the deleted range.
     *
     * @param index        The index of the reference.
     * @param canBeDeleted Whether this index is deleted when there is a delete of a range covering this index.
     * @return The newly registered reference.
     */
    public IndexReference registerReference(int index, boolean canBeDeleted)
    {
        return new IndexReference(RandomUtils.getRandomAlphaNumeric(), this.model, index, canBeDeleted);
    }

    /**
     * Removes the item at the given index from the list.
     *
     * @param index The index of the item to remove.
     */
    public void remove(int index)
    {
        this.removeRange(index, index + 1);
    }

    /**
     * Removes the items between startIndex (inclusive) and endIndex (exclusive).
     *
     * @param startIndex The start index of the range to remove (inclusive).
     * @param endIndex   The end index of the range to remove (exclusive).
     */
    public void removeRange(int startIndex, int endIndex)
    {
        BaseModelEvent event = new ValuesRemovedEvent(this, getSessionId(), getUserId(), true, startIndex, values.subList(startIndex, endIndex));
        updateModel(event);
        model.dispatchAndSendEvent(event);
    }

    /**
     * Removes the first instance of the given value from the list.
     *
     * @param value The value to remove.
     * @return Whether the item was removed.
     */
    public boolean removeValue(Object value)
    {
        int oldLength = this.length();
        this.remove(this.indexOf(value));
        return this.length() == oldLength - 1;
    }

    /**
     * Replaces items in the list with the given items, starting at the given index.
     *
     * @param index  The index to set at.
     * @param values The values to insert.
     */
    public void replaceRange(int index, List<Object> values)
    {
        BaseModelEvent event = new ValuesSetEvent(this, getSessionId(), getUserId(), true, index, values.subList(index, index + values.size()), values);
        updateModel(event);
        model.dispatchAndSendEvent(event);
    }

    /**
     * Sets the item at the given index.
     *
     * @param index The index to insert at.
     * @param value The value to set.
     */
    public void set(int index, Object value)
    {
        ArrayList<Object> newValues = new ArrayList<>();
        newValues.add(value);
        replaceRange(index, newValues);
    }

    /**
     * Returns a string representation of this collaborative object.
     *
     * @return A string representation.
     */
    public String toString()
    {
        return values.toString();
    }

    /**
     * @return The number of entries in the list.
     */
    public int length()
    {
        return values.size();
    }

    /**
     * Set the length to reduce the size of the list. Note that the length given must be < or equal to the current size.
     * The length of a list cannot be extended in this way.
     */
    public void setLength(int length)
    {
        if (length < this.length()) {
            removeRange(length, this.length());
        }
    }

    @Override
    protected void updateModel(BaseModelEvent event)
    {
        switch (event.getType()) {
            case VALUES_ADDED:
                ValuesAddedEvent valuesAddedEvent = (ValuesAddedEvent) event;
                addThisAsParent(valuesAddedEvent.getValues());
                values.addAll(valuesAddedEvent.getIndex(), valuesAddedEvent.getValues());
                break;
            case VALUES_SET:
                setValues((ValuesSetEvent) event);
                break;
            case VALUES_REMOVED:
                removeValues((ValuesRemovedEvent) event);
                break;
        }
    }

    /**
     * This method handles a ValueSetEvent and adds the contained values to this CollabList. It also handles adding and removing this
     * collabList as a parrent to / from the contained EventTargets.
     * @param valuesSetEvent The ValueSetEvent that needs to be handled.
     */
    private void setValues(ValuesSetEvent valuesSetEvent)
    {
        int index = valuesSetEvent.getIndex();
        List<Object> newValues = valuesSetEvent.getNewValues();
        List<Object> oldValues = valuesSetEvent.getOldValues();

        try{
            model.beginCompoundOperation();
            for (Object value : newValues) {
                if (values.get(index).equals(oldValues.get(index))) {
                    if (value instanceof EventTarget) {
                        ((EventTarget) value).addParent(this);
                    }
                    if (values.get(index) instanceof EventTarget) {
                        ((EventTarget) values.get(index)).removeParent(this);
                    }
                    values.set(index, value);
                } else {
                    System.err.println("Could not set value at index " + index);
                }
                index++;
            }
            model.endCompoundOperation();
        } catch (Model.NoCompoundOperationInProgressException e) {
            e.printStackTrace();
        }
    }

    /**
     * This method removes the values contained by the given ValuesRemovedEvent. This method also handles removing this
     * collabList as a parent from the contained eventTargets.
     * @param valuesRemovedEvent The ValuesRemovedEvent that needs to be handled.
     */
    private void removeValues(ValuesRemovedEvent valuesRemovedEvent){
        try {
            model.beginCompoundOperation();
            for (Object value : valuesRemovedEvent.getValues()) {
                int firstIndex = getFirstIndexOfAfter(value, valuesRemovedEvent.getIndex());
                if (firstIndex >= 0) {
                    if (values.get(firstIndex) instanceof EventTarget) {
                        ((EventTarget) values.get(firstIndex)).removeParent(this);
                    }
                    values.remove(firstIndex);
                } else {
                    //Item is probably already removed. No error is thrown.
                }
            }
            model.endCompoundOperation();
        } catch (Model.NoCompoundOperationInProgressException e) {
            e.printStackTrace();
        }
    }

    /**
     * This method adds this CollabList as a parent to all of the objects in the given list that are an EventTarget.
     * @param objects The objects to which this collabList should be added as a parent iff they are an EventTarget.
     */
    private void addThisAsParent(List<Object> objects)
    {
        for (Object object : objects) {
            if (object instanceof EventTarget) {
                ((EventTarget) object).addParent(this);
            }
        }
    }

    /**
     * This function returns the index of the first occurrence after the given index of the given object in this list. Iff the object was not found
     * after the given index, -1 is returned.
     * @param object The object of which the index should be returned.
     * @param after The index from which an occurrence of the given object should be detected.
     * @return The index of the first occurrence after the given index of the given object iff found. -1 otherwise.
     */
    private int getFirstIndexOfAfter(Object object, int after)
    {
        int result = -1;
        while (result == -1 && after < values.size()) {
            if (object == null && values.get(after) == null || object != null && object.equals(values.get(after))) {
                result = after;
            }
            after++;
        }
        return result;
    }
}
