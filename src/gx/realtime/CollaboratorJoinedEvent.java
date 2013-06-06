package gx.realtime;

import gx.realtime.serialize.CollaboratorJoinedEventDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(using = CollaboratorJoinedEventDeserializer.class)
public class CollaboratorJoinedEvent extends Event {

    Document document;
    Collaborator collaborator;

    public CollaboratorJoinedEvent(Document document, Collaborator collaborator) {
        this.document = document;
        this.collaborator = collaborator;
        this.type = EventType.COLLABORATOR_JOINED;
    }

    public static CollaboratorJoinedEvent deserialize(Document source, Object serialized){
        //TODO: deserialize given object and return new event
        return new CollaboratorJoinedEvent(source, null);
    }

    public Collaborator getCollaborator(){
        return collaborator;
    }
}
