package channel.browser;

/**
 *
 */
public enum State
{
    /** The channel is closed. */
    CLOSED(0),

    /** The channel has been initialized but hasn't yet initiated a connection. */
    INIT(1),

    /** The channel is in the process of opening a connection to the server. */
    OPENING(2),

    /** The channel is open. */
    OPENED(3);

    private int code;

    State(int code)
    {
        this.code = code;
    }
}
