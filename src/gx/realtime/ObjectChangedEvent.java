package gx.realtime;

import gx.realtime.serialize.ObjectChangedEventDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.List;

@JsonDeserialize(using = ObjectChangedEventDeserializer.class)
public class ObjectChangedEvent extends BaseModelEvent {

    private List<Event> events;

    public ObjectChangedEvent(String targetId, String sessionId, String userId, boolean local, List<Event> events){
        super(EventType.OBJECT_CHANGED, targetId, sessionId, userId, local, true);
        this.events = events;
        // bubbles = true
    }

    public ObjectChangedEvent(EventTarget target, String sessionId, String userId, boolean local, List<Event> events){
        // bubbles = true
        super(EventType.OBJECT_CHANGED, target, sessionId, userId, local, true);
        this.events = events;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }
}
