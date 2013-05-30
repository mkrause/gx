package gx.browserchannel.message;

import gx.browserchannel.message.serialize.MessageDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.Date;

@JsonDeserialize(using = MessageDeserializer.class)
public abstract class Message
{
    protected int lastArrayId = -1;
    protected long timestamp = -1L;
    
    public void setLastArrayId(int lastArrayId)
    {
        this.lastArrayId = lastArrayId;
    }
    
    public int getLastArrayId()
    {
        return lastArrayId;
    }

    public void setTimestamp(long timestamp)
    {
        this.timestamp = timestamp;
    }

    public long getTimestamp()
    {
        return timestamp;
    }
    
    @Override
    public String toString()
    {
        return "Message[AID: " + lastArrayId + ", timestamp: " + timestamp + "]";
    }
}
