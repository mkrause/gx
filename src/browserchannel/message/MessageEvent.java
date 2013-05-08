package browserchannel.message;

import browserchannel.BrowserChannel;

public class MessageEvent extends java.util.EventObject
{
    private static final long serialVersionUID = -5948751888590491280L;
    
    private Message message;
    
    public MessageEvent(BrowserChannel channel, Message message)
    {
        super(channel);
        this.message = message;
    }
    
    public Message getMessage()
    {
        return message;
    }
}
