package gx.realtime;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import gx.realtime.serialize.ObjectChangedEventDeserializer;

/**
 * @author Rdebokx
 */
@JsonDeserialize(using = ObjectChangedEventDeserializer.class)
public class ObjectChangedEvent extends BaseModelEvent implements Event {

    private BaseModelEvent[] events;

    public ObjectChangedEvent(EventTarget target, String sessionId, String userId, boolean local, BaseModelEvent[] events){
        super(EventType.OBJECT_CHANGED, target, sessionId, userId, local, false);
        this.events = events;
    }

    public BaseModelEvent[] getEvents() {
        return events;
    }

    public void setEvents(BaseModelEvent[] events) {
        this.events = events;
    }
}
