package gx.browserchannel.message;

import gx.realtime.operation.CompoundOperation;

/**
 * Message sent to the API containing the changes that are to be committed
 */
public class SaveMessage
{
    private int revision;
    private int requestNumber;
    private CompoundOperation compoundOperation;

    public SaveMessage(int revision, int requestNumber, CompoundOperation compoundOperation)
    {
        this.revision = revision;
        this.requestNumber = requestNumber;
        this.compoundOperation = compoundOperation;
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

    public CompoundOperation getCompoundOperation()
    {
        return compoundOperation;
    }

    public void setCompoundOperation(CompoundOperation compoundOperation)
    {
        this.compoundOperation = compoundOperation;
    }
}
