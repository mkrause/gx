package gx.realtime;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import gx.realtime.serialize.ObjectChangedEventDeserializer;

import java.util.List;

@JsonDeserialize(using = ObjectChangedEventDeserializer.class)
public class ObjectChangedEvent extends BaseModelEvent
{

    private List<BaseModelEvent> events;

    public ObjectChangedEvent(String targetId, String sessionId, String userId, boolean local, List<BaseModelEvent> events)
    {
        super(EventType.OBJECT_CHANGED, targetId, sessionId, userId, local, true);
        this.events = events;
        // bubbles = true
    }

    public ObjectChangedEvent(EventTarget target, String sessionId, String userId, boolean local, List<BaseModelEvent> events)
    {
        // bubbles = true
        super(EventType.OBJECT_CHANGED, target, sessionId, userId, local, true);
        this.events = events;
    }

    public List<BaseModelEvent> getEvents()
    {
        return events;
    }

    public void setEvents(List<BaseModelEvent> events)
    {
        this.events = events;
    }
}
