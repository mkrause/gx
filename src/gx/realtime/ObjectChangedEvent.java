package gx.realtime;

import gx.realtime.serialize.ObjectChangedEventDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

 @JsonDeserialize(using = ObjectChangedEventDeserializer.class)
public class ObjectChangedEvent extends BaseModelEvent {

    private BaseModelEvent[] events;

    public ObjectChangedEvent(EventTarget target, String sessionId, String userId, boolean local, BaseModelEvent[] events){
        // bubbles = true
        super(EventType.OBJECT_CHANGED, target, sessionId, userId, local, true);
        this.events = events;
    }

    public BaseModelEvent[] getEvents() {
        return events;
    }

    public void setEvents(BaseModelEvent[] events) {
        this.events = events;
    }
}
