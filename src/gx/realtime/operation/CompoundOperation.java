package gx.realtime.operation;

import gx.realtime.BaseModelEvent;
import gx.realtime.serialize.CompoundOperationDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.ArrayList;
import java.util.List;

/**
 * Internal event for adding a CollabortiveObject to the model
 * 
 */
@JsonDeserialize(using = CompoundOperationDeserializer.class)
public class CompoundOperation extends Operation {

    private Operation[] operations;
    
    public CompoundOperation(Operation[] operations)
    {
        this.type = Type.COMPOUND;
        this.operations = operations;
    }

    public Operation[] getOperations()
    {
        return operations;
    }

    @Override
    public List<BaseModelEvent> toEvents(String sessionId, String userId, boolean isLocal) {
        List<BaseModelEvent> events = new ArrayList<BaseModelEvent>();
        for(Operation operation : operations)
        {
            events.addAll(operation.toEvents(sessionId, userId, isLocal));
        }
        return events;
    }
}
