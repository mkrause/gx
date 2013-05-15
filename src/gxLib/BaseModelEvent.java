package gxLib;

/**
 * @author Rdebokx
 */
public abstract class BaseModelEvent {

    private String type;
    protected EventTarget target;
    private String sessionId;
    private boolean isLocal;
    private boolean bubbles;

    public BaseModelEvent(String type, EventTarget target, String sessionId, String userId, boolean isLocal, boolean bubbles){
        //TODO: for all subclasses, check whether they should bubble or not.
        this.type = type;
        this.target = target;
        this.sessionId = sessionId;
        this.isLocal = isLocal;
        this.bubbles = bubbles;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public EventTarget getTarget() {
        return target;
    }

    public void setTarget(EventTarget target) {
        this.target = target;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public boolean isLocal() {
        return isLocal;
    }

    public void setLocal(boolean local) {
        isLocal = local;
    }

    public boolean getBubbles() {
        return bubbles;
    }

    public void setBubbles(boolean bubbles) {
        this.bubbles = bubbles;
    }


}
