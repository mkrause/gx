package gx.realtime.operation;

import gx.realtime.BaseModelEvent;

import java.util.ArrayList;
import java.util.List;

/**
 * Class representing the acknowledgement received through the backward channel upon successfully submitting an
 * operation through the forward channel.
 */
public class AcknowledgementOperation extends Operation
{

    public AcknowledgementOperation()
    {
        this.type = Type.ACK;
    }

    @Override
    public List<BaseModelEvent> toEvents(String sessionId, String userId, boolean isLocal)
    {
        return new ArrayList<BaseModelEvent>();
    }
}
