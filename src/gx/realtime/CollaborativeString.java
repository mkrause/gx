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

    private String sessionId;
    private String userId;

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

        if (model != null) {
            sessionId = model.getDocument().getSession().getSessionId();
            userId = model.getDocument().getMe().getUserId();
        }

        sessionId = model.getDocument().getSession().getSessionId();
        if (model.getDocument().getMe() != null) {
            userId = model.getDocument().getMe().getUserId();
        }
    }

    /**
     * Generic handler for TEXT_INSERTED events. Inserts the text in the
     * specified position, as specified by the event.
     *
     * @return EventHandler<TextInsertedEvent>
     */
    private EventHandler<TextInsertedEvent> textInsertedHandler()
    {
        return (TextInsertedEvent event) -> {
            int index = event.getIndex();
            String insertedText = event.getText();

            // Build the new text with the string inserted
            value = value.substring(0, index)
                    + insertedText
                    + value.substring(index);
        };
    }

    /**
     * Generic handler for TEXT_DELETED events. Deletes the text from the
     * string, as specified by the event.
     *
     * @return EventHandler<TextInsertedEvent>
     */
    private EventHandler<TextDeletedEvent> textDeletedHandler()
    {
        return (TextDeletedEvent event) -> {
            int index = event.getIndex();
            String deletedText = event.getText();

            // Nothing to delete
            if (deletedText.length() == 0)
                return;

            // If the text at the specified position is not equal to the
            // text from the event, something went wrong (so ignore it).
            String toBeDeleted = value.substring(index, index + deletedText.length());
            if (!toBeDeleted.equals(deletedText)) {
                return;
            }

            // Build the new text with the string deleted
            value = value.substring(0, index)
                    + value.substring(index + deletedText.length());
        };
    }

    @Override
    protected void updateModel(BaseModelEvent event)
    {
        switch (event.getType()) {
            case TEXT_INSERTED:
                textInsertedHandler().handleEvent((TextInsertedEvent) event);
                break;
            case TEXT_DELETED:
                textDeletedHandler().handleEvent((TextDeletedEvent) event);
                break;
        }
    }

    /**
     * Appends a string to the end of this one.
     *
     * @param text The new text to append.
     */
    public void append(String text)
    {
        int index = value.length();

        fireWithObjectChangedEvent(new TextInsertedEvent(this, sessionId, userId, true, index, text));
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
        fireWithObjectChangedEvent(new TextInsertedEvent(this, sessionId, userId, true, index, text));
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

        fireWithObjectChangedEvent(new TextDeletedEvent(this, sessionId, userId, true, index, text));
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

    /**
     * Utility method to fire an event with an ObjectChangedEvent.
     *
     * @param event
     */
    private void fireWithObjectChangedEvent(BaseModelEvent event)
    {
        // Update the model
        updateModel(event);

        // Fire the event itself
        fireEvent(event);

        // Fire an object changed event that bubbles up the tree
        List<BaseModelEvent> eventList = new LinkedList<>();
        eventList.add(event);
        fireEvent(new ObjectChangedEvent(this, sessionId, userId, true, eventList));
    }
}
