package gx.realtime;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import gx.realtime.serialize.CollaboratorLeftEventDeserializer;

@JsonDeserialize(using = CollaboratorLeftEventDeserializer.class)
public class CollaboratorLeftEvent extends Event
{

    private Collaborator collaborator;

    public CollaboratorLeftEvent(Document document, Collaborator collaborator)
    {
        super(document, EventType.COLLABORATOR_LEFT);
        this.collaborator = collaborator;
        this.type = EventType.COLLABORATOR_LEFT;
    }

    public static CollaboratorLeftEvent deserialize(Document source, Object serialized)
    {
        //TODO: deserialize given object and return new event
        return new CollaboratorLeftEvent(source, null);
    }

    public Collaborator getCollaborator()
    {
        return collaborator;
    }

    public void setCollaborator(Collaborator collaborator)
    {
        this.collaborator = collaborator;
    }

    public Document getDocument()
    {
        return (Document) super.getTarget();
    }
}
