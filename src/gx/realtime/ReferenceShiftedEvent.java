package gx.realtime;

public class ReferenceShiftedEvent extends RevertableEvent {

    private int oldIndex;
    private int newIndex;

    public ReferenceShiftedEvent(IndexReference target, int oldIndex, int newIndex, String sessionId, String userId, boolean isLocal){
        super(EventType.REFERENCE_SHIFTED, target, sessionId, userId, isLocal, false);
        this.oldIndex = oldIndex;
        this.newIndex = newIndex;
    }

    public int getOldIndex() {
        return oldIndex;
    }

    public void setOldIndex(int oldIndex) {
        this.oldIndex = oldIndex;
    }

    public int getNewIndex() {
        return newIndex;
    }

    public void setNewIndex(int newIndex) {
        this.newIndex = newIndex;
    }

    public BaseModelEvent getReverseEvent(){
        return new ReferenceShiftedEvent((IndexReference) target, newIndex, oldIndex, sessionId, userId, isLocal);
    }
}
