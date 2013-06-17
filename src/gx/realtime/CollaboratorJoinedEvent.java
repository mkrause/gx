package gx.realtime;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import gx.realtime.serialize.CollaboratorJoinedEventDeserializer;

@JsonDeserialize(using = CollaboratorJoinedEventDeserializer.class)
public class CollaboratorJoinedEvent extends Event
{

    private Collaborator collaborator;

    public CollaboratorJoinedEvent(Document document, Collaborator collaborator)
    {
        super(document, EventType.COLLABORATOR_JOINED);
        this.collaborator = collaborator;
        this.type = EventType.COLLABORATOR_JOINED;
    }

    public static CollaboratorJoinedEvent deserialize(Document source, Object serialized)
    {
        //TODO: deserialize given object and return new event
        return new CollaboratorJoinedEvent(source, null);
    }

    public Collaborator getCollaborator()
    {
        return collaborator;
    }
}
