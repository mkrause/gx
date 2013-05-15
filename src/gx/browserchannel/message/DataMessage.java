package gx.browserchannel.message;

import com.fasterxml.jackson.databind.JsonNode;

public class DataMessage extends Message
{
    JsonNode content;

    public DataMessage(JsonNode content)
    {
        this.content = content;
    }

    public JsonNode getContent() {
        return content;
    }

    @Override
    public String toString() {
        return content.toString();
    }
}