package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import gx.realtime.operation.ObjectAddedOperation;

import java.io.IOException;

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