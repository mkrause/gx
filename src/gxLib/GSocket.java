package gxLib;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;

/**
 * Socket class that can be used to connect to the Google Drive API.
 * It contains all the necessary parameters.
 * Singleton.
 * @author Rdebokx
 *
 */
public class GSocket {
	
	//Google API Parameters
	/** E-mail address of the service account. */
    private static final String SERVICE_ACCOUNT_EMAIL = "289978787145-qoafq30a0i1qou5eul1hvepc99jnglua@developer.gserviceaccount.com";

    /** 
     * Global configuration of Google Cloud Storage OAuth 2.0 scope. 
     */
    private static final String SCOPES[] = new String[] {
        com.google.api.services.drive.DriveScopes.DRIVE
    };

    //Object Attributes
    private static GSocket instance;
    
    private static final JsonFactory JSON_FACTORY = new JacksonFactory();
    private static HttpTransport HTTP_TRANSPORT;
    
    private Drive service;
    
    /**
     * Private constructor, as this is a singleton class. Initializes the entities that are necessary to communicate
     * with the Google Drive API, based onthe present parameters.
     */
    private GSocket(){
    	try{
	    	HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
	
	        // Build service account credential.
	        GoogleCredential credential = new GoogleCredential.Builder()
	            .setTransport(HTTP_TRANSPORT)
	            .setJsonFactory(JSON_FACTORY)
	            .setServiceAccountId(SERVICE_ACCOUNT_EMAIL)
	            .setServiceAccountScopes(SCOPES)
	            .setServiceAccountPrivateKeyFromP12File(new java.io.File("key.p12"))
	            .build();
	
	        credential.refreshToken();
	        System.out.println("AccessToken: " + credential.getAccessToken());
	        
	        service = new com.google.api.services.drive.Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
	                .setApplicationName("Realtime-Gx/1.0").build();
    	} catch(Exception e){
    		e.printStackTrace();
    	}
    	
    	
	}
    
    /**
     * @return The singleton instance of the GSocket.
     */
    public static GSocket getInstance(){
    	if(instance == null){
    		instance = new GSocket();
    	}
    	return instance;
    }

    /**
     * @return The Drive service.
     */
	public Drive getService() {
		return service;
	}
	
}
