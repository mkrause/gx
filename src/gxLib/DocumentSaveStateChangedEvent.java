package gxLib;

/**
 * @author Rdebokx
 */
public class DocumentSaveStateChangedEvent {

    private Document document;
    private boolean isSaving;
    private boolean isPending;

    public DocumentSaveStateChangedEvent(Document document, boolean isSaving, boolean isPending){
        this.document = document;
        this.isSaving = document;
        this.isPending = isPending;
    }

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public boolean isSaving() {
        return isSaving;
    }

    public void setSaving(boolean saving) {
        isSaving = saving;
    }

    public boolean isPending() {
        return isPending;
    }

    public void setPending(boolean pending) {
        isPending = pending;
    }
}
