package gx.realtime;

import java.util.ArrayList;

public class ValuesRemovedEvent extends RevertableEvent
{

    private int index;
    private ArrayList<Object> values;

    /**
     * Event fired when items are removed from a collaborative list.
     *
     * @param target    The target object that generated the event.
     * @param sessionId The ID of the session that initiated the event.
     * @param userId    The user ID of the user that initiated the event.
     * @param isLocal   Whether this event originated in the local session.
     * @param index     The index where values were removed.
     * @param values    The values removed.
     */
    public ValuesRemovedEvent(CollaborativeList target, String sessionId, String userId, boolean isLocal, int index, ArrayList<Object> values)
    {
        super(EventType.VALUES_REMOVED, target, sessionId, userId, isLocal, false);
        this.index = index;
        this.values = values;
    }

    /**
     * @return The index at which the values were removed
     */
    public int getIndex()
    {
        return index;
    }

    /**
     * Set the index at which the values were removed.
     *
     * @param index The index at which the values were removed.
     */
    public void setIndex(int index)
    {
        this.index = index;
    }

    /**
     * @return The values that were removed.
     */
    public ArrayList<Object> getValues()
    {
        return values;
    }

    /**
     * Set the values that were removed.
     *
     * @param values The values that were removed.
     */
    public void setValues(ArrayList<Object> values)
    {
        this.values = values;
    }

    @Override
    public RevertableEvent getReverseEvent()
    {
        return new ValuesAddedEvent((CollaborativeList) target, sessionId, userId, isLocal, index, values);
    }
}
