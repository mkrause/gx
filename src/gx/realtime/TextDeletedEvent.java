package gx.realtime;

public class TextDeletedEvent extends RevertableEvent
{

    private int index;
    private String text;

    /**
     * Event fired when text is removed from a string.
     *
     * @param target    The target object that generated the event.
     * @param sessionId The id of the session that initiated the event.
     * @param userId    The user id of the user that initiated the event.
     * @param local     Whether this event originated in the local session.
     * @param index     The index of the change.
     * @param text      The deleted text.
     */
    public TextDeletedEvent(CollaborativeString target, String sessionId, String userId, boolean local, int index, String text)
    {
        super(EventType.TEXT_DELETED, target, sessionId, userId, local, false);
        this.index = index;
        this.text = text;
    }

    /**
     * @return The index.
     */
    public int getIndex()
    {
        return index;
    }

    /**
     * Set the index
     *
     * @param index The index.
     */
    public void setIndex(int index)
    {
        this.index = index;
    }

    /**
     * @return The text that was deleted.
     */
    public String getText()
    {
        return text;
    }

    /**
     * Set the text that is deleted.
     *
     * @param text The text that is deleted.
     */
    public void setText(String text)
    {
        this.text = text;
    }

    @Override
    public RevertableEvent getReverseEvent()
    {
        return new TextInsertedEvent((CollaborativeString) target, sessionId, userId, isLocal, index, text);
    }
}
