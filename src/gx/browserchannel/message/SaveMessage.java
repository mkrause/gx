package gx.browserchannel.message;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import gx.browserchannel.message.serialize.SaveMessageSerializer;
import gx.realtime.BaseModelEvent;

/**
 * Message sent to the API containing the changes that are to be committed
 */
@JsonSerialize(using = SaveMessageSerializer.class)
public class SaveMessage
{
    private int revision;
    private int requestNumber = 0;
    private BaseModelEvent event;

    public SaveMessage(BaseModelEvent event)
    {
        this.event = event;
    }

    public int getRevision()
    {
        return revision;
    }

    public void setRevision(int revision)
    {
        this.revision = revision;
    }

    public int getRequestNumber()
    {
        return requestNumber;
    }

    public void setRequestNumber(int requestNumber)
    {
        this.requestNumber = requestNumber;
    }

    public BaseModelEvent getEvent()
    {
        return event;
    }

    public void setEvent(BaseModelEvent event)
    {
        this.event = event;
    }
}
