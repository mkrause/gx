package channel;

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
}
