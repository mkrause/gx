package gx.realtime;

import java.util.ArrayList;

public class ValuesAddedEvent extends RevertableEvent {

    private int index;
    private ArrayList values;

    /**
     * Event fired when items are added to a collaborative list.
     * @param target The target object that generated the event.
     * @param sessionId The id of the session that initiated the event.
     * @param userId The user id of the user that initiated the event.
     * @param isLocal Whether this event originated in the local session.
     * @param index The index where values were added.
     * @param values The values added.
     */
    public ValuesAddedEvent(CollaborativeList target, String sessionId, String userId, boolean isLocal, int index, ArrayList values){
        super(EventType.VALUES_ADDED, target, sessionId, userId, isLocal, false);
        this.index = index;
        this.values = values;
    }

    /**
     * @return The index at which the values were added.
     */
    public int getIndex() {
        return index;
    }

    /**
     * Set the index at which the values were added.
     * @param index The index at which the values were added.
     */
    public void setIndex(int index) {
        this.index = index;
    }

    /**
     * @return The values that were added.
     */
    public ArrayList getValues() {
        return values;
    }

    /**
     * Set the values that were added.
     * @param values The values that were added.
     */
    public void setValues(ArrayList values) {
        this.values = values;
    }

    @Override
    public RevertableEvent getReverseEvent(){
        return new ValuesRemovedEvent((CollaborativeList) target, sessionId, userId, isLocal, index, values);
    }
}
