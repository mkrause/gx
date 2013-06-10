package gx.realtime;

import java.util.ArrayList;

public class ValuesSetEvent extends RevertableEvent {

    private int index;
    private ArrayList<Object> oldValues;
    private ArrayList<Object> newValues;

    /**
     * Event fired when items in a collaborative list are changed in place.
     * @param target The target object that generated the event.
     * @param sessionId The is of the session that initiated the event.
     * @param userId The user id of the user that initiated the event.
     * @param isLocal Whether this event originated in the local session.
     * @param index The index of the change.
     * @param oldValues The old values.
     * @param newValues The new values.
     */
    public ValuesSetEvent(CollaborativeList target, String sessionId, String userId, boolean isLocal, int index, ArrayList<Object> oldValues, ArrayList<Object> newValues){
        super(EventType.VALUES_SET, target, sessionId, userId, isLocal, false);
        this.index = index;
        this.oldValues = oldValues;
        this.newValues = newValues;
    }

    /**
     * @return The index at which the values were changed.
     */
    public int getIndex() {
        return index;
    }

    /**
     * Set the index at which the values were changed.
     * @param index The index at which the values were changed.
     */
    public void setIndex(int index) {
        this.index = index;
    }

    /**
     * @return The old values in the CollaborativeList.
     */
    public ArrayList<Object> getOldValues() {
        return oldValues;
    }

    /**
     * Set the values that were changed in the CollaborativeList.
     * @param oldValues The values that were changed in the CollaborativeList.
     */
    public void setOldValues(ArrayList<Object> oldValues) {
        this.oldValues = oldValues;
    }

    /**
     * @return The new values in the CollaborativeList.
     */
    public ArrayList<Object> getNewValues() {
        return newValues;
    }

    /**
     * Set the new values in the CollaborativeList.
     * @param newValues The new values in the CollaborativeList.
     */
    public void setNewValues(ArrayList<Object> newValues) {
        this.newValues = newValues;
    }

    @Override
    public RevertableEvent getReverseEvent(){
        return new ValuesSetEvent((CollaborativeList) target, sessionId, userId, isLocal, index, newValues, oldValues);
    }
}
