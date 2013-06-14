package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.TreeNode;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import gx.realtime.operation.CompoundOperation;
import gx.realtime.operation.Operation;

import java.io.IOException;

public class CompoundOperationDeserializer extends JsonDeserializer<CompoundOperation>
{
    private final String INVALID_FORMAT = "Invalid operation format";

    @Override
    public CompoundOperation deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        // Add mapper
        if (jp.getCodec() == null)
            jp.setCodec(new ObjectMapper());

        jp.nextToken();

        // Read whole tree
        TreeNode tree = jp.readValueAsTree();
        Operation[] operations = new Operation[tree.size() - 1];

        // tree.get(0) is always zero

        // Read operations
        for (int i = 1; i < tree.size(); i++) {
            JsonParser ojp = tree.get(i).traverse();
            ojp.setCodec(new ObjectMapper());
            operations[i - 1] = ojp.readValueAs(Operation.class);
        }

        return new CompoundOperation(operations);
    }
}