package gxLib;

/**
 * @author Rdebokx
 */
public class ValuesAddedEvent extends BaseModelEvent {

    private int index;
    private Object[] values;

    public ValuesAddedEvent(CollaborativeList target, String sessionId, String userId, boolean isLocal, int index, Object[] values){
        super("ValuesAddedEvent", target, sessionId, userId, isLocal, false);
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
}
