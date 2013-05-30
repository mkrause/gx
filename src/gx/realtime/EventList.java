package gx.realtime;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import gx.realtime.serialize.EventListDeserializer;

@JsonDeserialize(using = EventListDeserializer.class)
public class EventList
{
    private Event[] events;

    public EventList()
    {
        this(new Event[0]);
    }

    public EventList(Event event)
    {
        this(new Event[] { event } );
    }

    public EventList(Event[] events)
    {
        this.events = events;
    }

    public Event[] getEvents()
    {
        return events;
    }
}
