package gx.realtime.operation;

import gx.realtime.serialize.CompoundOperationDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
 * Internal event for adding a CollabortiveObject to the model
 * 
 * @author E.S. van der Veen
 */
@JsonDeserialize(using = CompoundOperationDeserializer.class)
public class CompoundOperation extends Operation {

    private Operation[] operations;
    
    public CompoundOperation(Operation[] operations)
    {
        this.type = Type.COMPOUND;
        this.operations = operations;
    }
}
