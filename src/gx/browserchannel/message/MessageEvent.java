package gx.browserchannel.message;

import gx.browserchannel.BrowserChannel;

public class MessageEvent extends java.util.EventObject
{
    private static final long serialVersionUID = -5948751888590491280L;

    private AbstractMessage message;

    public MessageEvent(BrowserChannel channel, AbstractMessage message)
    {
        super(channel);
        this.message = message;
    }

    public AbstractMessage getMessage()
    {
        return message;
    }
}
