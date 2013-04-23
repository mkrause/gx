package gxLib;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import com.google.api.client.http.*;
import com.google.api.services.drive.*;
import com.google.api.services.drive.model.File;

public class DriveComm {
	
	/**
	 * Download a file's content.
	 * 
	 * @param service Drive API service instance.
	 * @param file Drive File instance.
	 * @return InputStream containing the file's content if successful, {@code null} otherwise.
	 */
	public static InputStream downloadFile(Drive service, File file) {
		if (file.getDownloadUrl() != null && file.getDownloadUrl().length() > 0) {
			try {
				HttpResponse resp = service.getRequestFactory()
						.buildGetRequest(new GenericUrl(file.getDownloadUrl()))
						.execute();
				//System.out.println(resp);
				return resp.getContent();
			} catch (IOException e) {
				// An error occurred.
				e.printStackTrace();
				return null;
			}
		} else {
			// The file doesn't have any content stored on Drive.
			return null;
		}
		
	}
	
	
	/**
	   * Update an existing file's metadata and content.
	   *
	   * @param service Drive API service instance.
	   * @param fileId ID of the file to update.
	   * @param newTitle New title for the file.
	   * @param newDescription New description for the file.
	   * @param newMimeType New MIME type for the file.
	   * @param newFilename Filename of the new content to upload.
	   * @param newRevision Whether or not to create a new revision for this
	   *        file.
	   * @return Updated file metadata if successful, {@code null} otherwise.
	   */
	public static File updateFile(Drive service, String fileId, String newTitle,
		String newDescription, String newMimeType, String newFilename, boolean newRevision) {
			try {
				// First retrieve the file from the API.
				File file = service.files().get(fileId).execute();

				//File's new metadata.
				file.setTitle(newTitle);
				file.setDescription(newDescription);
				file.setMimeType(newMimeType);

				//File's new content.
				java.io.File fileContent = new java.io.File(newFilename);
				FileContent mediaContent = new FileContent(newMimeType, fileContent);
				
				//OutputStream out = new FileOutputStream(new java.io.File("out.txt"));
				//mediaContent.writeTo(out);
				//System.out.println("file mediaContent to be updated written to out.txt");

				// Send the request to the API.
				File updatedFile = service.files().update(fileId, file, mediaContent).execute();

				return updatedFile;
			} catch (IOException e) {
				System.out.println("An error occurred: " + e);
				return null;
			}
		}
	
	/**
	 * Permanently delete a file, skipping the trash.
	 *
	 * @param service Drive API service instance.
	 * @param fileId ID of the file to delete.
	 */
	public static void deleteFile(Drive service, String fileId) {
		try {
			service.files().delete(fileId).execute();
		} catch (IOException e) {
			System.out.println("An error occurred: " + e);
		}
	}
}
