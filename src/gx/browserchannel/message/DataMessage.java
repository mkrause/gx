package gx.browserchannel.message;

import com.fasterxml.jackson.databind.JsonNode;
import java.util.Date;

public class DataMessage extends Message
{
    JsonNode content;

    public DataMessage(JsonNode content)
    {
        this.content = content;
        tryParseTimestamp();
    }

    public JsonNode getContent() {
        return content;
    }

    private void tryParseTimestamp()
    {
        this.timestamp = content.get(1).asLong(-1);
    }

    @Override
    public String toString() {
        return content.toString();
    }
}