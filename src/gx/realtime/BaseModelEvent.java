package gx.realtime;

import gx.realtime.serialize.ObjectChangedEventDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

public abstract class BaseModelEvent extends Event {
    protected EventType type;
    protected EventTarget target;
    protected String sessionId;
    protected boolean isLocal;
    protected boolean bubbles;
    
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
