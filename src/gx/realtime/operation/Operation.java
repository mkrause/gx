package gx.realtime.operation;

import gx.realtime.serialize.OperationDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(using = OperationDeserializer.class)
public abstract class Operation
{
    protected Type type; 
    
    public enum Type
    {
        OBJECT_ADDED,
        VALUE_CHANGED,
        COMPOUND
    }
}
