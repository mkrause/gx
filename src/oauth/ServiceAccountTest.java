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
import com.google.api.services.tasks.*;
import com.google.api.services.tasks.model.*;
import com.google.api.services.calendar.*;
import com.google.api.services.calendar.model.*;
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
import java.nio.charset.Charset;
import java.util.ArrayList;

/**
 * @author Yaniv Inbar
 */
public class ServiceAccountTest {

  /** E-mail address of the service account. */
    //private static final String SERVICE_ACCOUNT_EMAIL = "289978787145-qoafq30a0i1qou5eul1hvepc99jnglua@developer.gserviceaccount.com";
    private static final String SERVICE_ACCOUNT_EMAIL = "289978787145-qoafq30a0i1qou5eul1hvepc99jnglua@developer.gserviceaccount.com";

  /** Global configuration of Google Cloud Storage OAuth 2.0 scope. */
  private static final String SCOPES[] = new String[] {
      com.google.api.services.tasks.TasksScopes.TASKS,
      com.google.api.services.calendar.CalendarScopes.CALENDAR,
      com.google.api.services.drive.DriveScopes.DRIVE
  };

  /** Global instance of the HTTP transport. */
  private static HttpTransport HTTP_TRANSPORT;

  /** Global instance of the JSON factory. */
  private static final JsonFactory JSON_FACTORY = new JacksonFactory();

  public static void main(String[] args) {
    try {
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
        System.out.println(credential.getAccessToken());

//        com.google.api.services.tasks.Tasks service =
//            new com.google.api.services.tasks.Tasks.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
//                .setApplicationName("Realtime-Gx/1.0").build();
//
//        // Get tasks
//        TaskLists taskLists = service.tasklists().list().execute();
//
//        for (TaskList taskList : taskLists.getItems()) {
//            System.out.println("List: " + taskList.getTitle());
//          }

//        String taskListId = (taskLists.getItems()).get(0).getId();
//        com.google.api.services.tasks.model.Tasks tasks = service.tasks().list(taskListId).execute();
//        com.google.api.services.tasks.model.Tasks tasks = service.tasks().list("@default").execute();
//        if (tasks.getItems() != null) {
//            for (Task task : tasks.getItems()) {
//              System.out.println("Task: " + task.getTitle());
//            }
//        }
        
        
        
//        com.google.api.services.calendar.Calendar service =
//                new com.google.api.services.calendar.Calendar.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
//                .setApplicationName("Realtime-Gx/1.0").build();
//        
//        CalendarList calendarList = service.calendarList().list().execute();
//        
//        for (CalendarListEntry calendar : calendarList.getItems()) {
//          System.out.println("Calendar: " + calendar.getSummary());
//        }
        
      com.google.api.services.drive.Drive service =
              new com.google.api.services.drive.Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
              .setApplicationName("Realtime-Gx/1.0").build();
      
      // Add file
//      File body = new File();
//      body.setTitle("A sample file");
//      body.setDescription("Beschrijving");
//      body.setMimeType("application/vnd.google-apps.document");
//      service.files().insert(body).execute();
      
      /*
      File body = new File();
    body.setTitle("A sample TEXT file");
    body.setDescription("Dit is een plain text file");
    body.setMimeType("plain/text");
    service.files().insert(body).execute();
    */
      

      //create file on which content of files will be based
      String newFilename = "baseFile.txt";
      Long time = System.nanoTime();
      PrintWriter writer = new PrintWriter(newFilename, "UTF-8");
      writer.println("File created at:");
      writer.println(time);
      writer.close();

      
      FileList files = service.files().list().execute();
      
      for (com.google.api.services.drive.model.File file : files.getItems()) {
        System.out.println("File: " + file.getId() + " / " + file.getTitle() + " - " + file.getMimeType());
        //System.out.println("File md5:" + file.getMd5Checksum());
        
        if(!file.getMimeType().equals("plain/text")){
        	System.out.println("Deleting file " + file.getId());
        	DriveComm.deleteFile(service, file.getId());
        } else {
        	System.out.println("Updating file with timestamp: " + time);
        	DriveComm.updateFile(service, file.getId(), file.getTitle(), file.getDescription(), file.getMimeType(), newFilename, true);
        }
      }
      
      files = service.files().list().execute();
      for (com.google.api.services.drive.model.File file : files.getItems()) {
    	  System.out.println("File: " + file.getId() + " / " + file.getTitle() + " - " + file.getMimeType());
    	  //System.out.println("File md5:" + file.getMd5Checksum());
          System.out.println("Contentlink of file: " + file.getWebContentLink());
          //System.out.println("Downloadlink: " + file.getDownloadUrl());
          InputStream fileContents = DriveComm.downloadFile(service, file);
          BufferedReader reader = new BufferedReader(new InputStreamReader(fileContents));
          String line;
          while((line = reader.readLine())!=null){
        	  System.out.println(line);
          }
        }
      
      System.exit(0);

      } catch (IOException e) {
        System.err.println(e.getMessage());
      }
    } catch (Throwable t) {
      t.printStackTrace();
    }
    System.exit(1);
  }
}
