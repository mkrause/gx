package gx.realtime.serialize;

import java.io.IOException;

import gx.realtime.ValueChangedEvent;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

public class ValueChangedEventDeserializer extends JsonDeserializer<ValueChangedEvent>
{
    @Override
    public ValueChangedEvent deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        String objectId = jp.nextTextValue();
        String key = jp.nextTextValue();
        jp.nextToken();
        JsonNode valueNode = jp.readValueAsTree();
        int valueType = valueNode.get(0).asInt();
        String value = valueNode.get(1).toString();
        // TODO: Cast value to correct type
        // TODO: Convert objectId to EventTarget object
        
        // TODO: give correct parameters
        return new ValueChangedEvent(null, "sid", "uid", false, key, value, value);
    }
}