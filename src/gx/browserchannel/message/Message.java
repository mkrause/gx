package gx.browserchannel.message;

import gx.browserchannel.message.serialize.MessageDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.api.client.util.DateTime;

@JsonDeserialize(using = MessageDeserializer.class)
public abstract class Message
{
    protected int lastArrayId = -1;
    protected DateTime timestamp = null;
    
    public void setLastArrayId(int lastArrayId)
    {
        this.lastArrayId = lastArrayId;
    }
    
    public int getLastArrayId()
    {
        return lastArrayId;
    }

    public void setTimestamp(DateTime timestamp)
    {
        this.timestamp = timestamp;
    }

    public DateTime getTimestamp()
    {
        return timestamp;
    }
    
    @Override
    public String toString()
    {
        return "Message[AID: " + lastArrayId + ", timestamp: " + timestamp + "]";
    }
}
