package gx.realtime.operation;

import gx.realtime.BaseModelEvent;
import gx.realtime.ObjectAddedEvent;
import gx.realtime.ValueChangedEvent;
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
    
    public ValueChangedOperation(String id, String key, ValueType type, String value)
    {
        this.type = Type.VALUE_CHANGED;
        this.key = key;
        this.objectId = id;
        this.valueType = type;
        this.value = value;
    }
    
    public ValueChangedOperation(String id, String key, int type, String value)
    {
        this(id, key, ValueType.map(type), value);
    }

    public List<BaseModelEvent> toEvents(String sessionId, String userId, boolean isLocal)
    {
        List<BaseModelEvent> events = new ArrayList<BaseModelEvent>();
        ValueChangedEvent event = new ValueChangedEvent(objectId, sessionId, userId, isLocal, key, value, null);
        event.setValueType(valueType);
        events.add(event);
        return events;
    }

    public enum ValueType
    {
        EDITABLE_STRING,
        COLLABORATIVE_OBJECT,
        JSON;
        
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
    }
}
