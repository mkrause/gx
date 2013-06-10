package gx.realtime;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import gx.realtime.operation.ValueChangedOperation;
import gx.realtime.serialize.ValueChangedEventSerializer;

@JsonSerialize(using = ValueChangedEventSerializer.class)
public class ValueChangedEvent extends RevertableEvent {

    private String property;
    private String newValue;
    private String oldValue;
    private ValueChangedOperation.ValueType valueType;

    public ValueChangedEvent(String target, String sessionId, String userId, boolean isLocal, String property, String newValue, String oldValue)
    {
        super(EventType.VALUE_CHANGED, target, sessionId, userId, isLocal, false);
        this.property = property;
        this.newValue = newValue;
        this.oldValue = oldValue;
    }

    public ValueChangedEvent(EventTarget target, String sessionId, String userId, boolean isLocal, String property, String newValue, String oldValue)
    {
        super(EventType.VALUE_CHANGED, target, sessionId, userId, isLocal, false);
        this.property = property;
        this.newValue = newValue;
        this.oldValue = oldValue;
    }

    public String getProperty()
    {
        return property;
    }

    public void setProperty(String property)
    {
        this.property = property;
    }

    public String getNewValue()
    {
        return newValue;
    }

    public void setNewValue(String newValue)
    {
        this.newValue = newValue;
    }

    public String getOldValue()
    {
        return oldValue;
    }

    public void setOldValue(String oldValue)
    {
        this.oldValue = oldValue;
    }

    public ValueChangedOperation.ValueType getValueType() {
        return valueType;
    }

    public void setValueType(ValueChangedOperation.ValueType valueType) {
        this.valueType = valueType;
    }

    public BaseModelEvent getReverseEvent(){
        return new ValueChangedEvent(target, sessionId, userId, isLocal, property, oldValue, newValue);
    }
}
