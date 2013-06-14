package gx.realtime;

import gx.realtime.serialize.Cloner;
import gx.util.RandomUtils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class CollaborativeList<E> extends CollaborativeObject
{

    /**
     * Contents of this ColaborativeList
     */
    private List<E> values;

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
        this.values = new ArrayList<E>();
    }

    /**
     * Returns a copy of the contents of this collaborative list as an ArrayList.
     * Changes to the returned object will not affect the original collaborative list.
     *
     * @return A copy of the contents of this collaborative list.
     */
    public ArrayList<E> asArray()
    {
        ArrayList<E> result = new ArrayList<E>();
        for (E value : values) {
            result.add(Cloner.clone(value));
        }
        return result;
    }

    /**
     * Removes all values from the list.
     */
    public void clear()
    {
        values.clear();
    }

    /**
     * Gets the value at the given index.
     *
     * @param index The index.
     * @return The value at the given index.
     */
    public E get(int index)
    {
        return values.get(index);
    }

    /**
     * Returns the first index of the given value, or -1 if it cannot be found.
     *
     * @param value The value to find.
     * @return The index of the given value, or -1 if it cannot be found.
     */
    public int indexOf(E value)
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
    public int indexOf(E value, Comparator<E> opt_comparatorFn)
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
     * Inserts an item into the list at a given index.
     *
     * @param index The index to insert at.
     * @param value The value to add.
     */
    public void insert(int index, E value)
    {
        if (value instanceof EventTarget) {
            ((EventTarget) value).addParent(this);
        }
        values.add(index, value);
    }

    /**
     * Inserts a list of items into the list at a given index.
     *
     * @param index  The index at which to insert.
     * @param values The values to insert.
     */
    public void insertAll(int index, List<E> values)
    {
        for (E value : values) {
            this.insert(index, value);
            index++;
        }
    }

    /**
     * Returns the last index of the given value, or -1 if it cannot be found.
     *
     * @param value The value to find.
     * @return The index of the given value, or -1 if it cannot be found.
     */
    public int lastIndexOf(E value)
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
    public int lastIndexOf(E value, Comparator<E> opt_comparatorFn)
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
    public int push(E value)
    {
        if (value instanceof EventTarget) {
            ((EventTarget) value).addParent(this);
        }
        values.add(value);
        return this.length();
    }

    /**
     * Adds an array of values to the end of the list.
     *
     * @param values The values to add.
     */
    public void pushAll(List<E> values)
    {
        for (E value : values) {
            this.push(value);
        }
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
        E removed = values.remove(index);
        if (removed instanceof EventTarget) {
            ((EventTarget) removed).removeParent(this);
        }
    }

    /**
     * Removes the items between startIndex (inclusive) and endIndex (exclusive).
     *
     * @param startIndex The start index of the range to remove (inclusive).
     * @param endIndex   The end index of the range to remove (exclusive).
     */
    public void removeRange(int startIndex, int endIndex)
    {
        while (startIndex < endIndex) {
            this.remove(startIndex);
            endIndex--;
        }
    }

    /**
     * Removes the first instance of the given value from the list.
     *
     * @param value The value to remove.
     * @return Whether the item was removed.
     */
    public boolean removeValue(E value)
    {
        if (value instanceof EventTarget) {
            ((EventTarget) value).removeParent(this);
        }
        return values.remove(value);
    }

    /**
     * Replaces items in the list with the given items, starting at the given index.
     *
     * @param index  The index to set at.
     * @param values The values to insert.
     */
    public void replaceRange(int index, List<E> values)
    {
        for (E value : values) {
            this.set(index, value);
            index++;
        }
    }

    /**
     * Sets the item at the given index.
     *
     * @param index The index to insert at.
     * @param value The value to set.
     */
    public void set(int index, E value)
    {
        values.set(index, value);
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
        values = values.subList(0, length);
    }

    @Override
    protected void updateModel(BaseModelEvent event)
    {
        switch (event.getType()) {
            case VALUES_ADDED:
                ValuesAddedEvent valuesAddedEvent = (ValuesAddedEvent) event;
                //TODO: fix cast to generic E
                insertAll(valuesAddedEvent.getIndex(), valuesAddedEvent.getValues());
                break;
            case VALUES_SET:
                ValuesSetEvent valuesSetEvent = (ValuesSetEvent) event;
                //TODO: fix cast to generic E
                replaceRange(valuesSetEvent.getIndex(), valuesSetEvent.getNewValues());
                break;
            case VALUES_REMOVED:
                ValuesRemovedEvent valuesRemovedEvent = (ValuesRemovedEvent) event;
                removeRange(valuesRemovedEvent.getIndex(), valuesRemovedEvent.getValues().size());
                break;
        }
    }
}
