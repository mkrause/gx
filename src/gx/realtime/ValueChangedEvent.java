package gx.realtime;

/**
 * @author Rdebokx
 */
public class ValueChangedEvent extends BaseModelEvent {

    private String property;
    private Object newValue;
    private Object oldValue;

    public ValueChangedEvent(EventTarget target, String sessionId, String userId, boolean isLocal, String property, Object newValue, Object oldValue){
        super(EventType.VALUE_CHANGED, target, sessionId, userId, isLocal, false);
        this.property = property;
        this.newValue = newValue;
        this.oldValue = oldValue;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public Object getNewValue() {
        return newValue;
    }

    public void setNewValue(Object newValue) {
        this.newValue = newValue;
    }

    public Object getOldValue() {
        return oldValue;
    }

    public void setOldValue(Object oldValue) {
        this.oldValue = oldValue;
    }
}
