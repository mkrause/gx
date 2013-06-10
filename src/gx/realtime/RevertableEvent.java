package gx.realtime;

public abstract class RevertableEvent extends BaseModelEvent {

    public RevertableEvent(EventType type, String targetId, String sessionId, String userId, boolean isLocal, boolean bubbles) {
        super(type, targetId, sessionId, userId, isLocal, bubbles);
    }

    public RevertableEvent(EventType type, EventTarget target, String sessionId, String userId, boolean isLocal, boolean bubbles) {
        super(type, target, sessionId, userId, isLocal, bubbles);
    }

    /**
     * This function returns an event that, when executed, reverts the effects of this event.
     * Note that the register property of the returned BaseModelEvent is set to false to it won't get registered on the undo stack of the model.
     * @return An event that, when executed, reerts the effects of this event.
     */
    public abstract BaseModelEvent getReverseEvent();
}
