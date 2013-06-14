package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import gx.realtime.BaseModelEvent;
import gx.realtime.ObjectChangedEvent;
import gx.realtime.operation.Operation;

import java.io.IOException;
import java.util.List;

public class ObjectChangedEventDeserializer extends JsonDeserializer<ObjectChangedEvent>
{
    private final String INVALID_FORMAT = "Invalid event format";

    @Override
    public ObjectChangedEvent deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonParseException
    {
        // Add mapper
        if (jp.getCodec() == null)
            jp.setCodec(new ObjectMapper());

        // Check if current token is array start
        if (!jp.getCurrentToken().equals(JsonToken.START_ARRAY))
            throw new JsonParseException(INVALID_FORMAT, jp.getCurrentLocation());

        // Read values
        int sequenceId = jp.nextIntValue(-1);
        String timestamp = jp.nextTextValue();
        String userId = jp.nextTextValue();
        String sessionId = jp.nextTextValue();
        jp.nextToken();
        Operation operation = jp.readValueAs(Operation.class);
        boolean isLocal = false;
        List<BaseModelEvent> events = operation.toEvents(sessionId, userId, isLocal);
        String targetId = events.size() == 0 ? null : events.get(0).getTargetId();

        // Create event
        ObjectChangedEvent event = new ObjectChangedEvent(targetId, sessionId, userId, isLocal, events);

        // Check if next token is array end token
        if (!jp.nextToken().equals(JsonToken.END_ARRAY))
            throw new JsonParseException(INVALID_FORMAT, jp.getCurrentLocation());

        return event;
    }
}