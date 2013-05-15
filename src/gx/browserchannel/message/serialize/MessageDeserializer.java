package gx.browserchannel.message.serialize;

import java.io.IOException;
import gx.browserchannel.message.*;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MessageDeserializer extends JsonDeserializer<Message>
{
    private final String INVALID_FORMAT = "Invalid message format";
    private final String UNKNOWN_TYPE = "Unknown message type";
    
    @Override
    public Message deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        Message message = null;
        int lastArrayId = -1;

        // Add mapper
        if(jp.getCodec() == null)
            jp.setCodec(new ObjectMapper());
        
        // Check if current token is array start
        if(!jp.getCurrentToken().equals(JsonToken.START_ARRAY))
            throw new JsonParseException(INVALID_FORMAT, jp.getCurrentLocation());
        
        // Read AID
        lastArrayId = jp.nextIntValue(-1);
        jp.nextToken();

        // Read whole payload array
        JsonNode jsonNode = jp.readValueAsTree();

        if(!jsonNode.isArray())
            throw new JsonParseException(INVALID_FORMAT, jp.getCurrentLocation());

        // Create parse for inner message
        JsonParser innerJp = jsonNode.traverse();
        innerJp.setCodec(jp.getCodec());

        // Read message type
        innerJp.nextToken();
        innerJp.nextValue();
        boolean isNum = innerJp.getCurrentToken().isNumeric();

        // Read actual message
        if(!isNum) {
            // Type is non-numeric
            String type = innerJp.getText();
            message = readMessage(innerJp, type);
        }

        // Message type not recognized, assume DataMessage
        if(message == null)
            message = new DataMessage(jsonNode);
        
        // Check if next token is array end token
        if(!jp.nextToken().equals(JsonToken.END_ARRAY))
            throw new JsonParseException(INVALID_FORMAT, jp.getCurrentLocation());
        
        // Set message AID
        message.setLastArrayId(lastArrayId);
        
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
}