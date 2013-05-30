package gx.realtime.serialize;

import java.io.IOException;

import gx.realtime.operation.CompoundOperation;
import gx.realtime.operation.Operation;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.core.TreeNode;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CompoundOperationDeserializer extends JsonDeserializer<CompoundOperation>
{
    private final String INVALID_FORMAT = "Invalid operation format";
    
    @Override
    public CompoundOperation deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        // Add mapper
        if(jp.getCodec() == null)
            jp.setCodec(new ObjectMapper());
        
        // Read whole tree
        TreeNode tree = jp.readValueAsTree();
        TreeNode operationsTree = tree.get(1);
        Operation[] operations = new Operation[operationsTree.size()];
        
        // Read operations
        for(int i = 0; i < operationsTree.size(); i++)
        {
            JsonParser ojp = operationsTree.get(i).traverse();
            ojp.setCodec(new ObjectMapper());
            operations[i] = ojp.readValueAs(Operation.class);
        }
        
        return new CompoundOperation(operations);
    }
}