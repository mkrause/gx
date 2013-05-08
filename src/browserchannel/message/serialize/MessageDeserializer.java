package browserchannel.message.serialize;

import java.io.IOException;
import browserchannel.message.*;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.util.DateTime;

public class MessageDeserializer extends JsonDeserializer<Message>
{
    private final String INVALID_FORMAT = "Invalid message format";
    private final String UNKNOWN_TYPE = "Unknown message type";
    
    @Override
    public Message deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        Message message = null;
        int lastArrayId = -1;
        long timestamp = -1;

        // Add mapper
        if(jp.getCodec() == null)
            jp.setCodec(new ObjectMapper());
        
        // Check if current token is array start
        if(!jp.getCurrentToken().equals(JsonToken.START_ARRAY))
            throw new JsonParseException(INVALID_FORMAT, jp.getCurrentLocation());
        
        // Read AID
        lastArrayId = jp.nextIntValue(-1);
        
        // Check if next token is array start
        if(!jp.nextToken().equals(JsonToken.START_ARRAY))
            throw new JsonParseException(INVALID_FORMAT, jp.getCurrentLocation());
        
        // Read message type
        jp.nextValue();
        boolean isNum = jp.getCurrentToken().isNumeric();

        // Read actual message
        if(!isNum) {
            // Type is non-numeric
            String type = jp.getText();
            message = readMessage(jp, type);
        } else {
            // Type is numeric
            int type = jp.getIntValue();
            timestamp = jp.nextLongValue(-1);
            jp.nextToken();
            message = readMessage(jp, type);
        }
        
        // Message type not recognized
        if(message == null)
            throw new JsonParseException(UNKNOWN_TYPE, jp.getCurrentLocation());
        
        // Check if next token is array end token
        if(!jp.nextToken().equals(JsonToken.END_ARRAY))
            throw new JsonParseException(INVALID_FORMAT, jp.getCurrentLocation());
        
        // Check if next token is array end token
        if(!jp.nextToken().equals(JsonToken.END_ARRAY))
            throw new JsonParseException(INVALID_FORMAT, jp.getCurrentLocation());
        
        // Set message AID
        message.setLastArrayId(lastArrayId);
        
        // Set message timestamp
        if(timestamp != -1)
            message.setTimestamp(new DateTime(timestamp));
        
        return message;
    }

    private Message readMessage(JsonParser jp, String type) throws JsonProcessingException, IOException
    {
        if(type == null)
            return null;
        
        if(type.equals("c"))
            return jp.readValueAs(SessionMessage.class);
        else if(type.equals("noop"))
            return new NoopMessage();
        else if(type.equals("stop"))
            return new StopMessage();
        
        return null;
    }

    private Message readMessage(JsonParser jp, int type) throws JsonProcessingException, IOException
    {
        switch(type) {
            case 5:
                return jp.readValueAs(UserMessage.class);
        }
        return null;
    }
}