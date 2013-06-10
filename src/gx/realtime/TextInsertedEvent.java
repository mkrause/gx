package gx.realtime;

public class TextInsertedEvent extends RevertableEvent {

    private int index;
    private String text;

    /**
     * Event fired when text is inserted into a string.
     * @param target The target object that generated the event.
     * @param sessionId The id of the session that initated the event.
     * @param userId The user id of the user that initiated the event.
     * @param local Whether this event originated in the local session.
     * @param index The index of the change.
     * @param text The inserted text.
     */
    public TextInsertedEvent(CollaborativeString target, String sessionId, String userId, boolean local, int index, String text){
        super(EventType.TEXT_INSERTED, target, sessionId, userId, local, false);
        this.index = index;
        this.text = text;
    }

    /**
     * @return The index of the text that was inserted.
     */
    public int getIndex() {
        return index;
    }

    /**
     * Set the index of the text that was inserted.
     * @param index The indes of the text that was inserted.
     */
    public void setIndex(int index) {
        this.index = index;
    }

    /**
     * @return The text that was inserted.
     */
    public String getText() {
        return text;
    }

    /**
     * Set the text that was inserted.
     * @param text The text that was inserted.
     */
    public void setText(String text) {
        this.text = text;
    }

    @Override
    public RevertableEvent getReverseEvent(){
        return new TextDeletedEvent((CollaborativeString) target, sessionId, userId, isLocal, index, text);
    }
}
