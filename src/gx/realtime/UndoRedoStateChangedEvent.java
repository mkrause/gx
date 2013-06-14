package gx.realtime;

public class UndoRedoStateChangedEvent extends Event
{

    private boolean canRedo;
    private boolean canUndo;

    public UndoRedoStateChangedEvent(Model model, boolean canRedo, boolean canUndo)
    {
        super(model, EventType.UNDO_REDO_STATE_CHANGED);
        this.canRedo = canRedo;
        this.canUndo = canUndo;
    }

    public boolean isCanRedo()
    {
        return canRedo;
    }

    public void setCanRedo(boolean canRedo)
    {
        this.canRedo = canRedo;
    }

    public boolean isCanUndo()
    {
        return canUndo;
    }

    public void setCanUndo(boolean canUndo)
    {
        this.canUndo = canUndo;
    }
}
