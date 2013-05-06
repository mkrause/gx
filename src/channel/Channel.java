package channel;

import channel.browser.Session;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;

public interface Channel
{    
    public void initialize(String driveFileId);
    public void connect();
    public void disconnect();

    public void send(Message message);
    
    public void addMessageHandler(MessageHandler handler);
    public void removeMessageHandler(MessageHandler handler);
    
    public void isClosed();
    public void getState();

    Session getSession();

    void openBackwardChannel();

    void openForwardChannel();
}
