package gxLib;

/**
 * @author Rdebokx
 */
public class CollaboratorJoinedEvent {

    Document document;
    Collaborator collaborator;

    public CollaboratorJoinedEvent(Document document, Collaborator collaborator) {
        this.document = document;
        this.collaborator = collaborator;
    }

    public CollaboratorJoinedEvent deserialize(Document source, Object serialized){

    }

    public getCollaborator(){
        return collaborator;
    }
}
