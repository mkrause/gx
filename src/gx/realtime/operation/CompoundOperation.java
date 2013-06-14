package gx.realtime.operation;

import gx.realtime.BaseModelEvent;
import gx.realtime.Event;
import gx.realtime.Model;
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
    public List<Event> toEvents(Model model, String sessionId, String userId, boolean isLocal) {
        List<Event> events = new ArrayList<>();
        for(Operation operation : operations)
        {
            events.addAll(operation.toEvents(model, sessionId, userId, isLocal));
        }
        return events;
    }
}
