package gx.realtime;

import gx.browserchannel.BrowserChannel;

import java.util.ArrayList;
import java.util.List;

public class Document extends EventTarget{
	
	//interfaces
	public interface SuccessFunction{
		public void execute(String json);
	}
	public interface FailureFunction{
		public void execute();
	}
	
	//attributes
	private Model model;
	private BrowserChannel channel;
	private List<Collaborator> collaborators;
	
	//functions
	
	protected Document(Model model, BrowserChannel channel){
		this.model = model;
		this.channel = channel;
		collaborators = new ArrayList<Collaborator>();
		//TODO: investigate how and when collaborators will be added.
	}

    /**
     * Closes the document and disconnects from the server. After this function is called, event listeners will no longer fire and attempts to access the document, model, or model objects will throw a {@link gapi.drive.realtime.DocumentClosedError}. Calling this function after the document has been closed will have no effect.
     */
    public void close() {
    	channel.disconnect();
    	//TODO: remove eventlisteners
    }

    /**
     * Exports the document to a JSON format.
     * @param successFn - A function that the exported JSON will be passed to when it is available.
     * @param failureFn - A function that will be called if the export fails.
     */
    public void exportDocument(SuccessFunction successFn, FailureFunction failureFn) {
        // TODO: implement
    }

    /**
     * Gets an array of collaborators active in this session. Each collaborator is a jsMap with these fields: sessionId, userId, displayName, color, isMe, isAnonymous.
     * @return
     */
    public List<Collaborator> getCollaborators() {
        return collaborators;
    }

    /**
     * Gets the collaborative model associated with this document.
     * @return
     */
    public Model getModel() {
        return model;
    }

    public void addEventListener(/*TODO*/){
        //TODO?
    }

    public void removeEventListener(/*TODO*/){
        //TODO?
    }

}
