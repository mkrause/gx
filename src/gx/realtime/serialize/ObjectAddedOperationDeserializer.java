package gx.realtime.serialize;

import java.io.IOException;

import gx.realtime.operation.ObjectAddedOperation;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class ObjectAddedOperationDeserializer extends JsonDeserializer<ObjectAddedOperation>
{
    @Override
    public ObjectAddedOperation deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        String objectId = jp.nextTextValue();
        int objectType = jp.nextIntValue(-1);
        return new ObjectAddedOperation(objectId, objectType);
    }
}