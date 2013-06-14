package gx.realtime;

import java.util.ArrayList;

public class ValuesSetEvent<E> extends RevertableEvent
{

    private int index;
    private ArrayList<E> oldValues;
    private ArrayList<E> newValues;

    /**
     * Event fired when items in a collaborative list are changed in place.
     *
     * @param target    The target object that generated the event.
     * @param sessionId The is of the session that initiated the event.
     * @param userId    The user id of the user that initiated the event.
     * @param isLocal   Whether this event originated in the local session.
     * @param index     The index of the change.
     * @param oldValues The old values.
     * @param newValues The new values.
     */
    public ValuesSetEvent(CollaborativeList<E> target, String sessionId, String userId, boolean isLocal, int index, ArrayList<E> oldValues, ArrayList<E> newValues)
    {
        super(EventType.VALUES_SET, target, sessionId, userId, isLocal, false);
        this.index = index;
        this.oldValues = oldValues;
        this.newValues = newValues;
    }

    /**
     * @return The index at which the values were changed.
     */
    public int getIndex()
    {
        return index;
    }

    /**
     * Set the index at which the values were changed.
     *
     * @param index The index at which the values were changed.
     */
    public void setIndex(int index)
    {
        this.index = index;
    }

    /**
     * @return The old values in the CollaborativeList.
     */
    public ArrayList<E> getOldValues()
    {
        return oldValues;
    }

    /**
     * Set the values that were changed in the CollaborativeList.
     *
     * @param oldValues The values that were changed in the CollaborativeList.
     */
    public void setOldValues(ArrayList<E> oldValues)
    {
        this.oldValues = oldValues;
    }

    /**
     * @return The new values in the CollaborativeList.
     */
    public ArrayList<E> getNewValues()
    {
        return newValues;
    }

    /**
     * Set the new values in the CollaborativeList.
     *
     * @param newValues The new values in the CollaborativeList.
     */
    public void setNewValues(ArrayList<E> newValues)
    {
        this.newValues = newValues;
    }

    @Override
    public RevertableEvent getReverseEvent()
    {
        return new ValuesSetEvent((CollaborativeList) target, sessionId, userId, isLocal, index, newValues, oldValues);
    }
}
