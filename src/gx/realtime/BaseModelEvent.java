package gx.realtime;

public abstract class BaseModelEvent extends Event
{
    protected EventTarget target;
    protected String sessionId;
    protected boolean isLocal;
    protected boolean bubbles;
    protected String targetId;
    protected String userId;
    protected boolean register = true;

    public BaseModelEvent(EventType type, String targetId, String sessionId, String userId, boolean isLocal, boolean bubbles)
    {
        this.type = type;
        this.targetId = targetId;
        this.sessionId = sessionId;
        this.isLocal = isLocal;
        this.bubbles = bubbles;
        this.userId = userId;
    }

    /**
     * Constructor, constructing a
     * @param type
     * @param target
     * @param sessionId
     * @param userId
     * @param isLocal
     * @param bubbles
     */
    public BaseModelEvent(EventType type, EventTarget target, String sessionId, String userId, boolean isLocal, boolean bubbles)
    {
        this.type = type;
        this.target = target;
        this.sessionId = sessionId;
        this.isLocal = isLocal;
        this.bubbles = bubbles;
        this.userId = userId;
    }

    public EventTarget getTarget()
    {
        return target;
    }

    public void setTarget(EventTarget target)
    {
        this.target = target;
    }

    public String getSessionId()
    {
        return sessionId;
    }

    public void setSessionId(String sessionId)
    {
        this.sessionId = sessionId;
    }

    public boolean isLocal()
    {
        return isLocal;
    }

    public void setLocal(boolean local)
    {
        isLocal = local;
    }

    public boolean bubbles()
    {
        return bubbles;
    }

    public void setBubbles(boolean bubbles)
    {
        this.bubbles = bubbles;
    }

    public String getTargetId()
    {
        return targetId;
    }

    public void setTargetId(String targetId)
    {
        this.targetId = targetId;
    }

    public String getUserId() {
        return userId;
    }

    protected void setRegister(boolean register){
        this.register = register;
    }

    public boolean getRegister(){
        return register;
    }
}
