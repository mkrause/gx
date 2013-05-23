package gx.realtime;

import gx.browserchannel.BrowserChannel;
import gx.browserchannel.util.DriveWrapper;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.services.drive.Drive;

public class Client {

	//Callback interfaces
	public interface OnDocumentLoaded {
		void execute(Document doc);
	}
	public interface DocumentInitializer {
		void execute(Model model);
	}
	public interface ErrorFunction {
		void execute(Error e);
	}

	/**
	 * To avoid global states, the token will not be saved in this static class.
	 * If we need the token anyway, it is advised to save it in the Document, and add a getToken() function to the Document class.
	 * @return
	 */
	@Deprecated
	public static String getToken(){
		return null;
	}
	
	public static void load(Credential credential, String docId, OnDocumentLoaded onLoaded){
		Document doc = getDocument(credential, docId);
		//initialize document and model
		
		//call onLoaded on document
	}
	
	public static void load(String docId, OnDocumentLoaded onLoaded, DocumentInitializer initializeFn){
		//TODO call initializerFN before onLoaded on document
	}
	
	public static void load(String docId, OnDocumentLoaded onLoaded, DocumentInitializer initializeFn, ErrorFunction errorFn){
		//TODO
	}
	
	private static Document getDocument(Credential credential, String docId){
		DriveWrapper service = new DriveWrapper(credential);
		service.connect();
		//retrieve document from googel api?
		
		//TODO
		return null;
	}
	
}
