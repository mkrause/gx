package channel.socket;

import channel.Channel;
import channel.Message;
import channel.MessageHandler;

/**
 * Communicates through a Socket with the Google servers.
 * TODO: look at https://code.google.com/p/google-web-toolkit/source/browse/trunk/dev/core/src/com/google/gwt/dev/shell/BrowserChannel.java
 * 
 * @author Erik
 */
public class SocketChannel implements Channel
{
    @Override
    public void initialize(String driveFileId)
    {
        // TODO Auto-generated method stub
    }
    
    @Override
    public void connect()
    {
        // TODO Auto-generated method stub
    }

    @Override
    public void disconnect()
    {
        // TODO Auto-generated method stub
    }

    @Override
    public void send(Message message)
    {
        // TODO Auto-generated method stub
    }

    @Override
    public void addMessageHandler(MessageHandler handler)
    {
        // TODO Auto-generated method stub
    }

    @Override
    public void removeMessageHandler(MessageHandler handler)
    {
        // TODO Auto-generated method stub
    }

    @Override
    public void isClosed()
    {
        // TODO Auto-generated method stub
    }

    @Override
    public void getState()
    {
        // TODO Auto-generated method stub
    }
}
