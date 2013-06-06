package gx.realtime.serialize;

import java.io.IOException;

import gx.browserchannel.message.MessageHandler;
import gx.realtime.*;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class EventListDeserializer extends JsonDeserializer<EventList>
{
    private final String INVALID_FORMAT = "Invalid event format";
    private final String UNKNOWN_TYPE = "Unknown event type";

    private static Logger logger = LogManager.getLogger(MessageHandler.class);
    
    @Override
    public EventList deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonParseException
    {
        EventList events = null;
        int eventType = -1;
        long timestamp = -1;

        // Add mapper
        if(jp.getCodec() == null)
            jp.setCodec(new ObjectMapper());
        
        // Check if current token is array start
        if(!jp.getCurrentToken().equals(JsonToken.START_ARRAY))
            throw new JsonParseException(INVALID_FORMAT, jp.getCurrentLocation());

        // Read type
        eventType = jp.nextIntValue(-1);

        // Read timestamp
        timestamp = jp.nextLongValue(-1);
        jp.nextToken();
        
        // Read entire event
        events = readEvents(jp, eventType);
        
        // AbstractMessage type not recognized
        if(events == null)
            throw new JsonParseException(UNKNOWN_TYPE, jp.getCurrentLocation());
        
        // Check if next token is array end token
        if(!jp.nextToken().equals(JsonToken.END_ARRAY))
            throw new JsonParseException(INVALID_FORMAT, jp.getCurrentLocation());
        
        return events;
    }

    private EventList readEvents(JsonParser jp, int eventType) throws JsonProcessingException, IOException
    {
        // TODO: recognize other message types
        switch(eventType) {
            case 0:
                Event[] events = jp.readValueAs(ObjectChangedEvent[].class);
                return new EventList(events);
            case 1:
                // Skip the weird object we receive every now and then by just stepping over the input
                // {
                jp.nextToken();
                // "CONTENT_MODIFICATION_DATE":
                jp.getText();
                // true
                jp.nextBooleanValue();
                // }
                jp.nextTextValue();
                return new EventList();
            case 5:
                return new EventList(jp.readValueAs(CollaboratorJoinedEvent.class));
            case 6:
                return new EventList(jp.readValueAs(CollaboratorLeftEvent.class));
        }
        return null;
    }
}