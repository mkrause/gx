package gx.realtime.operation;

import gx.realtime.*;
import gx.realtime.serialize.ValueChangedOperationDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.ArrayList;
import java.util.List;

/**
 * Internal event for adding a CollabortiveObject to the model
 * 
 */
@JsonDeserialize(using = ValueChangedOperationDeserializer.class)
public class ValueChangedOperation extends Operation {

    private String objectId;
    private String key;
    private ValueType valueType;
    private String value;
    private boolean isRemoveOperation;
    
    public ValueChangedOperation(String id, String key, ValueType type, String value)
    {
        this.type = Type.VALUE_CHANGED;
        this.key = key;
        this.objectId = id;
        this.valueType = type;
        this.value = value;
        this.isRemoveOperation = value == null;
    }
    
    public ValueChangedOperation(String id, String key, int type, String value)
    {
        this(id, key, ValueType.map(type), value);
    }

    @Override
    public List<Event> toEvents(String sessionId, String userId, boolean isLocal)
    {
        List<Event> events = new ArrayList<>();
        ValueChangedEvent event = new ValueChangedEvent(objectId, sessionId, userId, isLocal, key, value, null);
        event.setValueType(valueType);
        events.add(event);
        return events;
    }

    public boolean isRemoveOperation()
    {
        return isRemoveOperation;
    }

    public enum ValueType
    {
        EDITABLE_STRING(1),
        COLLABORATIVE_OBJECT(2),
        JSON(21);
        
        private int value;
        
        ValueType(int value)
        {
            this.value = value;
        }
        
        public static ValueType map(int type)
        {
            switch(type)
            {
            case 1:
            return EDITABLE_STRING;
            case 2:
            return COLLABORATIVE_OBJECT;
            case 21:
            return JSON;
            }
            return null;
        }
        
        public int asInt()
        {
            return value;
        }
    }
}
