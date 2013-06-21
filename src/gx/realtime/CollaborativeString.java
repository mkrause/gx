package gx.realtime;

import gx.util.RandomUtils;

import java.util.LinkedList;
import java.util.List;

public class CollaborativeString extends CollaborativeObject
{

    /**
     * The contents of this CollaborativeString
     */
    private String value;

    /**
     * Creates a new collaborative string. Unlike regular Java Strings, collaborative strings are mutable. Changes to
     * the string will automatically be synced with the server and other collaborators.
     * To listen for changes, add EventListeners for the following event types:
     * - gx.realtime.EventType.TEXT_INSERTED
     * - gx.realtime.EventType.TEXT_DELETED
     * This class should not be instantiated directly. To create a new collaborative string, use gx.realtime.Model.createString
     *
     * @param id    The id of this CollaborativeString, given by the Model.
     * @param model The document Model.
     */
    public CollaborativeString(String id, Model model)
    {
        super(id, model);
        value = "";
    }

    /**
     * Appends a string to the end of this one.
     *
     * @param text The new text to append.
     */
    public void append(String text)
    {
        int index = value.length();

        // Let the model decide to fire a ObjectChangedEvent (could be a compound operation)
        BaseModelEvent event = new TextInsertedEvent(this, getSessionId(), getUserId(), true, index, text);
        updateModel(event);
        model.dispatchAndSendEvent(event);
    }

    /**
     * Gets a string representation of the collaborative string.
     *
     * @return A  string representation of the collaborative string.
     */
    public String getText()
    {
        return value;
    }

    /**
     * Inserts a string into the collaborative string at a specific index.
     *
     * @param index The index to start at.
     * @param text  The new text to insert.
     */
    public void insertString(int index, String text)
    {
        // Let the model decide to fire a ObjectChangedEvent (could be a compound operation)
        BaseModelEvent event = new TextInsertedEvent(this, getSessionId(), getUserId(), true, index, text);
        updateModel(event);
        model.dispatchAndSendEvent(event);
    }

    /**
     * Creates an IndexReference at the given {@code index}. If {@code canBeDeleted} is set, then a delete over the
     * index will delete the reference. Otherwise the reference will shift to the beginning of the deleted range.
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
     * Deletes the text between startIndex (inclusive) and endIndex (exclusive).
     *
     * @param startIndex The start index of the range to delete (inclusive).
     * @param endIndex   The end index of the range to delete (exclusive).
     */
    public void removeRange(int startIndex, int endIndex)
    {
        assert startIndex <= endIndex;

        int index = startIndex;
        String text = value.substring(startIndex, endIndex);

        // Let the model decide to fire a ObjectChangedEvent (could be a compound operation)
        BaseModelEvent event = new TextDeletedEvent(this, getSessionId(), getUserId(), true, index, text);
        updateModel(event);
        model.dispatchAndSendEvent(event);
    }

    /**
     * Sets the contents of this collaborative string. Note that this method performs a text diff between the current
     * string contents and the new contents so that the string will be modified using the minimum number of text inserts
     * and deletes possible to change the current contents to the newly-specified contents.
     *
     * @param text The new value of the string.
     */
    public void setText(String text)
    {
        //TODO: perform a text diff
        //TODO: alter the text with the minimum amount of text inserts and deletes possible.
        //TODO: create events
    }

    /**
     * Gets a string representation of the collaborative string.
     *
     * @return A string representation of the collaborative string.
     */
    @Override
    public String toString()
    {
        return this.value;
    }

    /**
     * @return The length of the string.
     */
    public int length()
    {
        return value.length();
    }

    @Override
    protected void updateModel(BaseModelEvent event)
    {
        switch (event.getType()) {
            case TEXT_INSERTED:
                insertText((TextInsertedEvent) event);
                break;
            case TEXT_DELETED:
                deleteText((TextDeletedEvent) event);
                break;
        }
    }

    /**
     * This method inserts the text of the given TextInsertedEvent in this collabString.
     * @param tiEvent The TextInsertedEvent to be handled.
     */
    private void insertText(TextInsertedEvent tiEvent)
    {
        int index = tiEvent.getIndex();
        String insertedText = tiEvent.getText();

        // Build the new text with the string inserted
        value = value.substring(0, index)
                + insertedText
                + value.substring(index);
    }

    /**
     * This method deletes the text of the given TextDeletedEvent from this collabString.
     * @param tdEvent The TextDeletedEvent to be handled.
     */
    private void deleteText(TextDeletedEvent tdEvent)
    {
        int deleteIndex = tdEvent.getIndex();
        String deletedText = tdEvent.getText();

        // Nothing to delete
        if (deletedText.length() == 0)
            return;

        // If the text at the specified position is not equal to the
        // text from the event, something went wrong (so ignore it).
        String toBeDeleted = value.substring(deleteIndex, deleteIndex + deletedText.length());
        if (!toBeDeleted.equals(deletedText)) {
            return;
        }

        // Build the new text with the string deleted
        value = value.substring(0, deleteIndex)
                + value.substring(deleteIndex + deletedText.length());
    }

}
