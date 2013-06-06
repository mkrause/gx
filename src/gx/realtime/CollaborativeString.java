package gx.realtime;

import gx.util.RandomUtils;

public class CollaborativeString extends CollaborativeObject {

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
     * @param id The id of this CollaborativeString, given by the Model.
     * @param model The document Model.
     */
	public CollaborativeString(String id, Model model){
		super(id, model);
        
        //addEventListener(EventType.TEXT_INSERTED);
	}

    /**
     * Appends a string to the end of this one.
     * @param text The new text to append.
     */
	public void append(String text) {
        //fireEvent(new TextInsertedEvent(this, ..., true));
	}

    /**
     * Gets a string representation of the collaborative string.
     * @return A  string representation of the collaborative string.
     */
	public String getText(){
		return value;
	}

    /**
     * Inserts a string into the collaborative string at a specific index.
     * @param index The index to start at.
     * @param text The new text to insert.
     */
	public void insertString(int index, String text){
		value = value.substring(0, index) + text + value.substring(index);
	}

    /**
     * Creates an IndexReference at the given {@code index}. If {@code canBeDeleted} is set, then a delete over the
     * index will delete the reference. Otherwise the reference will shift to the beginning of the deleted range.
     * @param index The index of the reference.
     * @param canBeDeleted Whether this index is deleted when there is a delete of a range covering this index.
     * @return The newly registered reference.
     */
	public IndexReference registerReference(int index, boolean canBeDeleted){
		return new IndexReference(RandomUtils.getRandomAlphaNumeric(), this.model, index, canBeDeleted);
	}

    /**
     * Deletes the text between startIndex (inclusive) and endIndex (exclusive).
     * @param startIndex The start index of the range to delete (inclusive).
     * @param endIndex The end index of the range to delete (exclusive).
     */
	public void removeRange(int startIndex, int endIndex){
		value = value.substring(0, startIndex) + value.substring(endIndex);
	}

    /**
     * Sets the contents of this collaborative string. Note that this method performs a text diff between the current
     * string contents and the new contents so that the string will be modified using the minimum number of text inserts
     * and deletes possible to change the current contents to the newly-specified contents.
     * @param text The new value of the string.
     */
	public void setText(String text){
		//TODO: perform a text diff
        //TODO: alter the text with the minimum amount of text inserts and deletes possible.
	}

    /**
     * Gets a string representatino of the collaborative string.
     * @return A string representation of the collaborative string.
     */
    @Override
    public String toString(){
        return this.value;
    }

    /**
     * @return The length of the string.
     */
	public int length(){
		return value.length();
	}

}
