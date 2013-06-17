package gx.realtime;

import java.util.HashSet;
import java.util.Set;

public abstract class BaseModelEvent extends Event
{

    protected String sessionId;
    protected boolean isLocal;
    protected boolean bubbles;
    protected String targetId;
    protected String userId;

    private Set<EventTarget> bubbledNodes;

    public BaseModelEvent(EventType type, String targetId, String sessionId, String userId, boolean isLocal, boolean bubbles)
    {
        super(null, type);
        this.targetId = targetId;
        this.sessionId = sessionId;
        this.isLocal = isLocal;
        this.bubbles = bubbles;
        this.userId = userId;

        bubbledNodes = new HashSet();
    }

    /**
     * Constructor, constructing a
     *
     * @param type
     * @param target
     * @param sessionId
     * @param userId
     * @param isLocal
     * @param bubbles
     */
    public BaseModelEvent(EventType type, CollaborativeObject target, String sessionId, String userId, boolean isLocal, boolean bubbles)
    {
        super(target, type);
        this.sessionId = sessionId;
        this.isLocal = isLocal;
        this.bubbles = bubbles;
        this.userId = userId;

        bubbledNodes = new HashSet();
    }

    @Override
    public CollaborativeObject getTarget(){
        return (CollaborativeObject) target;
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
        // Get actual id of object
        if (targetId == null && target instanceof CollaborativeObject) {
            return ((CollaborativeObject) target).getId();
        }

        return targetId;
    }

    public void setTargetId(String targetId)
    {
        this.targetId = targetId;
    }

    public String getUserId()
    {
        return userId;
    }

    public void addBubbledNode(EventTarget node)
    {
        bubbledNodes.add(node);
    }

    public boolean isFirstVisit(EventTarget node)
    {
        return !bubbledNodes.contains(node);
    }

    public String toString()
    {
        return "[" + this.getType() + " -> " + this.getTargetId() + "]";
    }
}
