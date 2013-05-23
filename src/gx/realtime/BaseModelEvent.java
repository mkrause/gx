package gx.realtime;

import gx.realtime.serialize.BaseModelEventDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
 * @author Rdebokx
 */
@JsonDeserialize(using = BaseModelEventDeserializer.class)
public abstract class BaseModelEvent {
    private EventType type;
    protected EventTarget target;
    private String sessionId;
    private boolean isLocal;
    private boolean bubbles;

    public BaseModelEvent(EventType type, EventTarget target, String sessionId, String userId, boolean isLocal, boolean bubbles){
        //TODO: for all subclasses, check whether they should bubble or not.
        this.type = type;
        this.target = target;
        this.sessionId = sessionId;
        this.isLocal = isLocal;
        this.bubbles = bubbles;
    }

    public EventType getType() {
        return type;
    }

    public void setType(EventType type) {
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
