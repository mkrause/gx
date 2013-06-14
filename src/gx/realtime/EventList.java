package gx.realtime;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import gx.realtime.serialize.EventListDeserializer;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

@JsonDeserialize(using = EventListDeserializer.class)
public class EventList implements Iterable<Event>
{
    private List<Event> events;

    public EventList()
    {
        this(new Event[0]);
    }

    public EventList(Event event)
    {
        this(new Event[]{event});
    }

    public EventList(Event[] events)
    {
        this.events = Arrays.asList(events);
    }

    public EventList(List<Event> events)
    {
        this.events = events;
    }

    public List<Event> getEvents()
    {
        return events;
    }

    @Override
    public Iterator<Event> iterator()
    {
        return events.iterator();
    }
}
