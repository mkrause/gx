package gx.realtime;

/**
 * @author Rdebokx
 */
public class CollaboratorLeftEvent implements Event {

    Document document;
    Collaborator collaborator;

    public CollaboratorLeftEvent(Document document, Collaborator collaborator) {
        this.document = document;
        this.collaborator = collaborator;
    }

    public static CollaboratorJoinedEvent deserialize(Document source, Object serialized){
        //TODO: deserialize given object and return new event
        return new CollaboratorJoinedEvent(source, null);
    }

    public Collaborator getCollaborator(){
        return collaborator;
    }
}
