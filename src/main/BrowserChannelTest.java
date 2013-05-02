package main;

import channel.Channel;
import channel.browser.BrowserChannel;
import channel.browser.Session;
import channel.browser.Model;
import channel.browser.SkipGarbageInputStream;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.*;
import com.google.api.services.drive.model.*;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class BrowserChannelTest {

  /** E-mail address of the service account. */
  private static final String SERVICE_ACCOUNT_EMAIL = "289978787145-qoafq30a0i1qou5eul1hvepc99jnglua@developer.gserviceaccount.com";

  /** Global configuration of Google Cloud Storage OAuth 2.0 scope. */
  private static final String SCOPES[] = new String[] {
      DriveScopes.DRIVE
  };

  /** Global instance of the HTTP transport. */
  private static HttpTransport HTTP_TRANSPORT;

  /** Global instance of the JSON factory. */
  private static final JsonFactory JSON_FACTORY = new JacksonFactory();

  public static void main(String[] args) {
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
        
      Drive service =
              new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
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
        if(!file.getMimeType().equals("application/vnd.google-apps.drive-sdk")){
            fileId = file.getId();
            fileName = file.getTitle();
            break;
        }
      }
      System.out.println("FileID: " + fileId);
      System.out.println("FileName: " + fileName);
      
      Channel channel = new BrowserChannel(credential);
      channel.initialize(fileId);
            
//      // Forward Channel (POST)
//      System.out.println("Forward Channel (POST)");
//      String RID = "66172";
//      int CVER = 1;
//      random = "i9dw6xv4b81e";
//      byte[] rawData = new byte[0];
//      String urlParameters = "id=" + modelId + "&access_token=" + accessToken + "&sid=" + sessionId + "&VER=" + version + "&lsq=" + lastSequenceNumber + "&RID=" + RID + "&CVER=" + CVER + "&zx=" + random + "&t=" + retries;
//      url = new URL(baseURL + "/bind?" + urlParameters);
//      connection = (HttpURLConnection) url.openConnection();
//      connection.setDoOutput(true);
//      connection.setDoInput(true);
//      connection.setInstanceFollowRedirects(false); 
//      connection.setRequestMethod("POST"); 
//      connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded"); 
//      connection.setRequestProperty("charset", "utf-8");
//      connection.setRequestProperty("Content-Length", "0");
//      connection.setUseCaches (false);
//      connection.getOutputStream().write(rawData);
//      reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
//      String response = "";
//      while((line = reader.readLine()) != null)
//          response += line;
//      reader.close();
//
//      // Parse results
//      // TODO: parse with JSON parser
//      String channelSessionId = "";
//      lastSequenceNumber = 1;
//      Pattern pattern = Pattern.compile("(.*?),\"(.*?)\",,8(.*?)");
//      Matcher matcher = pattern.matcher(response);
//      if(matcher.matches() && matcher.groupCount() == 3) {
//          channelSessionId = matcher.group(2);
//      }
//      pattern = Pattern.compile("(.*?),([0-9]+?),\\{\"color\"(.*?)");
//      matcher = pattern.matcher(response);
//      System.out.println(matcher.matches());
//      if(matcher.matches() && matcher.groupCount() == 3) {
//          lastSequenceNumber = Long.parseLong(matcher.group(2));
//      }
//      System.out.println("channelSessionId: " + channelSessionId);
//      System.out.println("lastSequenceNumber: " + lastSequenceNumber);
//
//      // Backward Channel (GET)
//      RID = "rpc";
//      int AID = 1; // get this number from previous request
//      int CI = 0;
//      random = "2bdw3x2d7f1z";
//      System.out.println("Backward Channel (GET)");
//      //&SID=64B32CA63B17903A& CI=0& AID=10
//      urlParameters = "id=" + modelId + "&access_token=" + accessToken + "&sid=" + sessionId + "&VER=" + version + "&lsq=" + lastSequenceNumber + "&RID=" + RID + "&SID=" + channelSessionId + "&AID=" + AID + "&CI=" + CI + "&TYPE=" + type + "&zx=" + random + "&t=" + retries;
//      url = new URL(baseURL + "/bind?" + urlParameters);
//      connection = (HttpURLConnection) url.openConnection();
//      stream = new InputStreamReader(connection.getInputStream());
//      System.out.println("Getting NOOP every 30 seconds from Google, connection is reset after 1 minute");
//      while((character = stream.read()) != -1)
//          System.out.print(String.valueOf((char)character));
//      System.out.println();
      
      System.out.println("done");      
      System.exit(0);
      } catch (Exception e) {
          System.err.println(e.getMessage());
      }
    System.exit(1);
  }
}
