package gx.realtime;

public class ReferenceShiftedEvent extends RevertableEvent
{

    private int oldIndex;
    private int newIndex;

    /**
     * Event fired when an index reference shifts
     *
     * @param target    The reference that shifted.
     * @param oldIndex  The previous index.
     * @param newIndex  The new index.
     * @param sessionId The id of the session.
     * @param userId    The id of the user.
     * @param isLocal   If the session is the local session.
     */
    public ReferenceShiftedEvent(IndexReference target, int oldIndex, int newIndex, String sessionId, String userId, boolean isLocal)
    {
        super(EventType.REFERENCE_SHIFTED, target, sessionId, userId, isLocal, false);
        this.oldIndex = oldIndex;
        this.newIndex = newIndex;
    }

    /**
     * @return The old index of the IndexReference that shifted.
     */
    public int getOldIndex()
    {
        return oldIndex;
    }

    /**
     * Set the old index of the IndexReference that shifted.
     *
     * @param oldIndex The old index of the IndexReference that shifted.
     */
    public void setOldIndex(int oldIndex)
    {
        this.oldIndex = oldIndex;
    }

    /**
     * @return The new index of the IndexReference that shifted.
     */
    public int getNewIndex()
    {
        return newIndex;
    }

    /**
     * Set the new indes of the IndexReference that shifted.
     *
     * @param newIndex
     */
    public void setNewIndex(int newIndex)
    {
        this.newIndex = newIndex;
    }

    @Override
    public RevertableEvent getReverseEvent()
    {
        return new ReferenceShiftedEvent((IndexReference) target, newIndex, oldIndex, sessionId, userId, isLocal);
    }
}
