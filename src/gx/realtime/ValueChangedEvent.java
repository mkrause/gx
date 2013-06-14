package gx.realtime;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import gx.realtime.operation.ValueChangedOperation;
import gx.realtime.serialize.ValueChangedEventSerializer;

@JsonSerialize(using = ValueChangedEventSerializer.class)
public class ValueChangedEvent extends RevertableEvent
{

    private String property;
    private Object newValue;
    private Object oldValue;
    private ValueChangedOperation.ValueType valueType;

    /**
     * Event fired when a map or custom object property changes.
     *
     * @param target    The target object that generated the event.
     * @param sessionId The id of the session that initiated the event.
     * @param userId    The user id of the user that initiated the event.
     * @param isLocal   Whether this event originated in the local session.
     * @param property  The property whose value changed.
     * @param newValue  The new property value.
     * @param oldValue  The old property value.
     */
    public ValueChangedEvent(String target, String sessionId, String userId, boolean isLocal, String property, Object newValue, Object oldValue)
    {
        super(EventType.VALUE_CHANGED, target, sessionId, userId, isLocal, false);
        this.property = property;
        this.newValue = newValue;
        this.oldValue = oldValue;
    }

    public ValueChangedEvent(EventTarget target, String sessionId, String userId, boolean isLocal, String property, Object newValue, Object oldValue)
    {
        super(EventType.VALUE_CHANGED, target, sessionId, userId, isLocal, false);
        this.property = property;
        this.newValue = newValue;
        this.oldValue = oldValue;
    }

    /**
     * @return The property that was changed.
     */
    public String getProperty()
    {
        return property;
    }

    /**
     * Set the property that was changed.
     *
     * @param property The property that was changed.
     */
    public void setProperty(String property)
    {
        this.property = property;
    }

    /**
     * @return The new value of the property that was changed.
     */
    public Object getNewValue()
    {
        return newValue;
    }

    /**
     * Set the new value of the property that was changed.
     *
     * @param newValue The new value of the property that was changed.
     */
    public void setNewValue(Object newValue)
    {
        this.newValue = newValue;
    }

    /**
     * @return The old value of the property that was changed.
     */
    public Object getOldValue()
    {
        return oldValue;
    }

    /**
     * Set the old value of the property that was changed.
     *
     * @param oldValue The old value of the porperty that was changed.
     */
    public void setOldValue(Object oldValue)
    {
        this.oldValue = oldValue;
    }

    /**
     * @return The type of the value that was changed.
     */
    public ValueChangedOperation.ValueType getValueType()
    {
        return valueType;
    }

    /**
     * Set the type of the value that was changed.
     *
     * @param valueType The type of the value that was changed.
     */
    public void setValueType(ValueChangedOperation.ValueType valueType)
    {
        this.valueType = valueType;
    }

    @Override
    public RevertableEvent getReverseEvent()
    {
        return new ValueChangedEvent(target, sessionId, userId, isLocal, property, oldValue, newValue);
    }

    public String toString()
    {
        return "[" + this.getType() + " -> " + this.getTargetId() + ", "
                + property + "=" + newValue + "]";
    }
}
