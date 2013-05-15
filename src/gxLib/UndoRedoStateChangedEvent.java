package gxLib;

/**
 * @author Rdebokx
 */
public class UndoRedoStateChangedEvent {

    private Model model;
    private boolean canRedo;
    private boolean canUndo;

    public UndoRedoStateChangedEvent(Model model, boolean canRedo, boolean canUndo) {
        this.model = model;
        this.canRedo = canRedo;
        this.canUndo = canUndo;
    }

    public boolean isCanRedo() {
        return canRedo;
    }

    public void setCanRedo(boolean canRedo) {
        this.canRedo = canRedo;
    }

    public boolean isCanUndo() {
        return canUndo;
    }

    public void setCanUndo(boolean canUndo) {
        this.canUndo = canUndo;
    }
}
