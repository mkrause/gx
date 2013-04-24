package oauth;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.HttpResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.Json;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.*;
import com.google.api.services.drive.model.*;

import gxLib.DriveComm;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class BrowserChannelTest {

  /** E-mail address of the service account. */
    private static final String SERVICE_ACCOUNT_EMAIL = "289978787145-qoafq30a0i1qou5eul1hvepc99jnglua@developer.gserviceaccount.com";

  /** Global configuration of Google Cloud Storage OAuth 2.0 scope. */
  private static final String SCOPES[] = new String[] {
      com.google.api.services.drive.DriveScopes.DRIVE
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
        System.out.println(accessToken);
        
      com.google.api.services.drive.Drive service =
              new com.google.api.services.drive.Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
              .setApplicationName("Realtime-Gx/1.0").build();
      
      // Add Realtime file
//      File body = new File();
//      body.setTitle("GxFile");
//      body.setDescription("A Realtime Gx file");
//      body.setMimeType("application/vnd.google-apps.drive-sdk");
//      service.files().insert(body).execute();
      
      /*
      File body = new File();
    body.setTitle("A sample TEXT file");
    body.setDescription("Dit is een plain text file");
    body.setMimeType("plain/text");
    service.files().insert(body).execute();
    */
      

      //create file on which content of files will be based
//      String newFilename = "baseFile.txt";
//      Long time = System.nanoTime();
//      PrintWriter writer = new PrintWriter(newFilename, "UTF-8");
//      writer.println("File created at:");
//      writer.println(time);
//      writer.close();

      // Get file ID
      System.out.println("Get file id");
      String fileName = null;
      String fileId = null;
      FileList files = service.files().list().execute();
      for (com.google.api.services.drive.model.File file : files.getItems()) {
        if(!file.getMimeType().equals("application/vnd.google-apps.drive-sdk")){
            fileId = file.getId();
            fileName = file.getTitle();
            break;
        }
      }
      System.out.println("FileID: " + fileId);
      System.out.println("FileName: " + fileName);
      
      // Get model ID
      System.out.println("Get model id");
      String baseURL = "https://drive.google.com/otservice";
      URL url = new URL(baseURL + "/modelid?id=" + fileId + "&access_token=" + accessToken);
      HttpURLConnection connection = (HttpURLConnection) url.openConnection();
      InputStream in = new SkipGarbageInputStream(connection.getInputStream());
      JsonModelId mid = JSON_FACTORY.fromInputStream(in, JsonModelId.class);
      String modelId = mid.getModelId();
      System.out.println("ModelID: " + modelId);
      
      // Get session information
      System.out.println("Get session info");
      url = new URL(baseURL + "/gs?id=" + modelId + "&access_token=" + accessToken);
      connection = (HttpURLConnection) url.openConnection();
      in = new SkipGarbageInputStream(connection.getInputStream());
      JsonGs gs = JSON_FACTORY.fromInputStream(in, JsonGs.class);
      String sessionId = gs.getSessionId();
      int revision = gs.getRevision();
      System.out.println("SessionID: " + sessionId);
      System.out.println("Revision: " + revision);
      
      // Test channel
      System.out.println("Get Host Prefixes");
      int version = 8;
      String mode = "init";
      long lastSequenceNumber = -1;
      String random = "5z7qn2t4bnz7";
      int retries = 1;
      url = new URL(baseURL + "/test?id=" + modelId + "&access_token=" + accessToken + "&sid=" + sessionId + "&VER=" + version + "&lsq=" + lastSequenceNumber + "&MODE=" + mode + "&zx=" + random + "&t=" + retries);
      connection = (HttpURLConnection) url.openConnection();
      BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
      String line;
      while((line = reader.readLine()) != null)
          System.out.println(line);
      reader.close();
      
      // Test chunking channel
      System.out.println("Buffering Proxy Test (11111: first chunk, 2: second chunk)");
      String type = "xmlhttp";
      random = "0h7we2q4bnv9";
      url = new URL(baseURL + "/test?id=" + modelId + "&access_token=" + accessToken + "&sid=" + sessionId + "&VER=" + version + "&lsq=" + lastSequenceNumber + "&TYPE=" + type + "&zx=" + random + "&t=" + retries);
      connection = (HttpURLConnection) url.openConnection();
      InputStreamReader stream = new InputStreamReader(connection.getInputStream());
      int character;
      while((character = stream.read()) != -1)
          System.out.print(String.valueOf((char)character));
      System.out.println();
      
      // Delta channel
      System.out.println("Channel delta");
      int startRevision = revision + 1;
      url = new URL(baseURL + "/delta?id=" + modelId + "&access_token=" + accessToken + "&sid=" + sessionId + "&startRev=" + startRevision);
      connection = (HttpURLConnection) url.openConnection();
      reader = new BufferedReader(new InputStreamReader(new SkipGarbageInputStream(connection.getInputStream())));
      while((line = reader.readLine()) != null)
          System.out.println(line);
      reader.close();
      
      // Forward Channel (POST)
      System.out.println("Forward Channel (POST)");
      String RID = "66172";
      int CVER = 1;
      random = "i9dw6xv4b81e";
      byte[] rawData = new byte[0];
      String urlParameters = "id=" + modelId + "&access_token=" + accessToken + "&sid=" + sessionId + "&VER=" + version + "&lsq=" + lastSequenceNumber + "&RID=" + RID + "&CVER=" + CVER + "&zx=" + random + "&t=" + retries;
      url = new URL(baseURL + "/bind?" + urlParameters);
      connection = (HttpURLConnection) url.openConnection();
      connection.setDoOutput(true);
      connection.setDoInput(true);
      connection.setInstanceFollowRedirects(false); 
      connection.setRequestMethod("POST"); 
      connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded"); 
      connection.setRequestProperty("charset", "utf-8");
      connection.setRequestProperty("Content-Length", "0");
      connection.setUseCaches (false);
      connection.getOutputStream().write(rawData);
      reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
      String response = "";
      while((line = reader.readLine()) != null)
          response += line;
      reader.close();

      // Parse results
      // TODO: parse with JSON parser
      String channelSessionId = "";
      lastSequenceNumber = 1;
      Pattern pattern = Pattern.compile("(.*?),\"(.*?)\",,8(.*?)");
      Matcher matcher = pattern.matcher(response);
      if(matcher.matches() && matcher.groupCount() == 3) {
          channelSessionId = matcher.group(2);
      }
      pattern = Pattern.compile("(.*?),([0-9]+?),\\{\"color\"(.*?)");
      matcher = pattern.matcher(response);
      System.out.println(matcher.matches());
      if(matcher.matches() && matcher.groupCount() == 3) {
          lastSequenceNumber = Long.parseLong(matcher.group(2));
      }
      System.out.println("channelSessionId: " + channelSessionId);
      System.out.println("lastSequenceNumber: " + lastSequenceNumber);

      // Backward Channel (GET)
      RID = "rpc";
      int AID = 1; // get this number from previous request
      int CI = 0;
      random = "2bdw3x2d7f1z";
      System.out.println("Backward Channel (GET)");
      //&SID=64B32CA63B17903A& CI=0& AID=10
      urlParameters = "id=" + modelId + "&access_token=" + accessToken + "&sid=" + sessionId + "&VER=" + version + "&lsq=" + lastSequenceNumber + "&RID=" + RID + "&SID=" + channelSessionId + "&AID=" + AID + "&CI=" + CI + "&TYPE=" + type + "&zx=" + random + "&t=" + retries;
      url = new URL(baseURL + "/bind?" + urlParameters);
      connection = (HttpURLConnection) url.openConnection();
      stream = new InputStreamReader(connection.getInputStream());
      System.out.println("Getting NOOP every 30 seconds from Google, connection is reset after 1 minute");
      while((character = stream.read()) != -1)
          System.out.print(String.valueOf((char)character));
      System.out.println();
      
      
      
      System.out.println("done");
      
      
//      for (com.google.api.services.drive.model.File file : files.getItems()) {
//        System.out.println("File: " + file.getId() + " / " + file.getTitle() + " - " + file.getMimeType());
//        //System.out.println("File md5:" + file.getMd5Checksum());
//        
//        if(!file.getMimeType().equals("plain/text")){
////        	System.out.println("Deleting file " + file.getId());
////        	DriveComm.deleteFile(service, file.getId());
//        } else {
//        	System.out.println("Updating file with timestamp: " + time);
//        	DriveComm.updateFile(service, file.getId(), file.getTitle(), file.getDescription(), file.getMimeType(), newFilename, true);
//        }
//      }
//      
//      files = service.files().list().execute();
//      for (com.google.api.services.drive.model.File file : files.getItems()) {
//    	  System.out.println("File: " + file.getId() + " / " + file.getTitle() + " - " + file.getMimeType());
//    	  //System.out.println("File md5:" + file.getMd5Checksum());
//          System.out.println("Contentlink of file: " + file.getWebContentLink());
//          //System.out.println("Downloadlink: " + file.getDownloadUrl());
//          InputStream fileContents = DriveComm.getFileContents(service, file);
//          BufferedReader reader = new BufferedReader(new InputStreamReader(fileContents));
//          String line;
//          while((line = reader.readLine())!=null){
//        	  System.out.println(line);
//          }
//        }
      
      System.exit(0);

      } catch (Exception e) {
          System.err.println(e.getMessage());
      }
    System.exit(1);
  }
}
