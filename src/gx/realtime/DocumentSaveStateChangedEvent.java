package gx.realtime;

public class DocumentSaveStateChangedEvent extends Event
{

    private Document document;
    private boolean isSaving;
    private boolean isPending;

    public DocumentSaveStateChangedEvent(Document document, boolean isSaving, boolean isPending)
    {
        super(document, EventType.DOCUMENT_SAVE_STATE_CHANGED);
        this.document = document;
        this.isSaving = isSaving;
        this.isPending = isPending;
    }

    public Document getDocument()
    {
        return document;
    }

    public void setDocument(Document document)
    {
        this.document = document;
    }

    public boolean isSaving()
    {
        return isSaving;
    }

    public void setSaving(boolean saving)
    {
        isSaving = saving;
    }

    public boolean isPending()
    {
        return isPending;
    }

    public void setPending(boolean pending)
    {
        isPending = pending;
    }
}
