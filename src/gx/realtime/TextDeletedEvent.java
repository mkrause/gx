package gx.realtime;

/**
 * @author Rdebokx
 */
public class TextDeletedEvent extends BaseModelEvent{

    private int index;
    private String text;

    public TextDeletedEvent(CollaborativeString target, String sessionId, String userId, boolean local, int index, String text){
        //TODO: should last argument be false?
        super("TextDeletedEvent", target, sessionId, userId, local, false);
        this.index = index;
        this.text = text;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
