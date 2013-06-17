package gx.browserchannel.message;

import com.fasterxml.jackson.databind.JsonNode;

public interface MessageHandler
{
    public void receive(MessageEvent e);
    public void response(JsonNode response);
    public int getRevision();
}
