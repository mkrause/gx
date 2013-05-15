package gxLib;

/**
 * @author Rdebokx
 */
public class ValuesSetEvent extends BaseModelEvent {

    private int index;
    private Object[] oldValues;
    private Object[] newValues;

    public ValuesSetEvent(CollaborativeList target, String sessionId, String userId, boolean isLocal, int index, Object[] oldValues, Object[] newValues){
        super("ValuesSetEvent", target, sessionId, userId, isLocal, false);
        this.index = index;
        this.oldValues = oldValues;
        this.newValues = newValues;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public Object[] getOldValues() {
        return oldValues;
    }

    public void setOldValues(Object[] oldValues) {
        this.oldValues = oldValues;
    }

    public Object[] getNewValues() {
        return newValues;
    }

    public void setNewValues(Object[] newValues) {
        this.newValues = newValues;
    }
}
