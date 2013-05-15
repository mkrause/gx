package gxLib;

/**
 * @author Rdebokx
 */
public class ReferenceShiftedEvent extends BaseModelEvent {

    private int oldIndex;
    private int newIndex;

    public ReferenceShiftedEvent(IndexReference target, int oldIndex, int newIndex, String sessionId, String userId, boolean isLocal){
        super("ReferenceShiftedEvent", target, sessionId, userId, isLocal, false);
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
}
