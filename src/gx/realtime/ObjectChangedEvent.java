package gx.realtime;

/**
 * @author Rdebokx
 */
public class ObjectChangedEvent extends BaseModelEvent implements Event {

    private BaseModelEvent[] events;

    public ObjectChangedEvent(EventTarget target, String sessionId, String userId, boolean local, BaseModelEvent[] events){
        super("ObjectChangedEvent", target, sessionId, userId, local, false);
        this.events = events;
    }

    public BaseModelEvent[] getEvents() {
        return events;
    }

    public void setEvents(BaseModelEvent[] events) {
        this.events = events;
    }
}
