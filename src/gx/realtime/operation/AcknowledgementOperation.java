package gx.realtime.operation;

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
}
