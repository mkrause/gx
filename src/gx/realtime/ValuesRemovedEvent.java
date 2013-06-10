package gx.realtime;

public class ValuesRemovedEvent extends RevertableEvent {

    private int index;
    private Object[] values;

    public ValuesRemovedEvent(CollaborativeList target, String sessionId, String userId, boolean isLocal, int index, Object[] values){
        super(EventType.VALUES_REMOVED, target, sessionId, userId, isLocal, false);
        this.index = index;
        this.values = values;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public Object[] getValues() {
        return values;
    }

    public void setValues(Object[] values) {
        this.values = values;
    }

    public BaseModelEvent getReverseEvent(){
        return new ValuesAddedEvent((CollaborativeList) target, sessionId, userId, isLocal, index, values);
    }
}
