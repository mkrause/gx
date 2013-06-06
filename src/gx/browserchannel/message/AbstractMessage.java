package gx.browserchannel.message;

import gx.browserchannel.message.serialize.MessageDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.Date;

/**
 * Abstract parent of the various BrowserChannel message classes
 */
@JsonDeserialize(using = MessageDeserializer.class)
public abstract class AbstractMessage
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
        return "AbstractMessage[AID: " + lastArrayId + ", timestamp: " + timestamp + "]";
    }
}
