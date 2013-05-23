package gx.realtime.serialize;

import java.io.IOException;

import gx.realtime.BaseModelEvent;
import gx.realtime.ObjectAddedEvent;
import gx.realtime.ValueChangedEvent;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;

public class BaseModelEventDeserializer extends JsonDeserializer<BaseModelEvent>
{
    private final String INVALID_FORMAT = "Invalid base event format";
    private final String UNKNOWN_TYPE = "Unknown base event type";
    
    @Override
    public BaseModelEvent deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonParseException
    {
        BaseModelEvent event = null;
        int eventType = -1;

        // Add mapper
        if(jp.getCodec() == null)
            jp.setCodec(new ObjectMapper());
        
        // Check if current token is array start
        if(!jp.getCurrentToken().equals(JsonToken.START_ARRAY))
            throw new JsonParseException(INVALID_FORMAT, jp.getCurrentLocation());

        // Read type
        eventType = jp.nextIntValue(-1);
        
        // Read event
        event = readEvent(jp, eventType);
        
        // Message type not recognized
        if(event == null)
            throw new JsonParseException(UNKNOWN_TYPE, jp.getCurrentLocation());
        
        // Check if next token is array end token
        if(!jp.nextToken().equals(JsonToken.END_ARRAY))
            throw new JsonParseException(INVALID_FORMAT, jp.getCurrentLocation());
        
        return event;
    }

    private BaseModelEvent readEvent(JsonParser jp, int eventType) throws JsonProcessingException, IOException
    {
        // TODO: recognize other message types
        // TODO: ObjectChangedEvent (unknown type id)
        // TODO: ReferenceShiftedEvent (unknown type id)
        switch(eventType) {
        case 5:
            // TODO: TextInsertedEvent or ValuesAddedEvent
            return null;
        case 6:
            // TODO: TextDeletedEvent or ValuesRemovedEvent
            return null;
        case 7:
            return jp.readValueAs(ObjectAddedEvent.class);
        case 8:
            return jp.readValueAs(ValueChangedEvent.class);
        case 11:
            // TODO: ValuesSetEvent
            return null;
        }
        return null;
    }
}