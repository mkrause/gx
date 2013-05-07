package main;

import channel.browser.BrowserChannel;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;


public class BrowserChannelTest
{

    /**
     * E-mail address of the service account.
     */
    private static final String SERVICE_ACCOUNT_EMAIL = "289978787145-qoafq30a0i1qou5eul1hvepc99jnglua@developer.gserviceaccount.com";
    /**
     * Global configuration of Google Cloud Storage OAuth 2.0 scope.
     */
    private static final String SCOPES[] = new String[]{
            DriveScopes.DRIVE
    };
    /**
     * Global instance of the JSON factory.
     */
    private static final JsonFactory JSON_FACTORY = new JacksonFactory();
    /**
     * Global instance of the HTTP transport.
     */
    private static HttpTransport HTTP_TRANSPORT;

    public static void main(String[] args)
    {
        try {
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
            String accessToken = credential.getAccessToken();
            System.out.println("Access token: " + accessToken);
            System.out.println("Expires in " + credential.getExpiresInSeconds() + " seconds");

            Drive service = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
                    .setApplicationName("Realtime-Gx/1.0").build();

            // Add Realtime file
//      File body = new File();
//      body.setTitle("GxFile");
//      body.setDescription("A Realtime Gx file");
//      body.setMimeType("application/vnd.google-apps.drive-sdk");
//      service.files().insert(body).execute();

            // Get file ID
            String fileName = null;
            String fileId = null;
            FileList files = service.files().list().execute();
            for (File file : files.getItems()) {
                if (!file.getMimeType().equals("application/vnd.google-apps.drive-sdk")) {
                    fileId = file.getId();
                    fileName = file.getTitle();
                    break;
                }
            }
            System.out.println("FileID: " + fileId);
            System.out.println("FileName: " + fileName);

            BrowserChannel channel = new BrowserChannel(credential);
            channel.initialize(fileId);

            channel.connect();
            channel.openDeltaChannel();
            channel.openForwardChannel();
            channel.openBackwardChannel();

            System.out.println("done");
            System.exit(0);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        System.exit(1);
    }
}
