package browserchannel;

import browserchannel.util.URLWithQuery;

/**
 *
 */
public class BrowserTestChannel
{
    BrowserChannel channel;
    private String path;


    public BrowserTestChannel(BrowserChannel channel) {
        this.channel = channel;
    }

    /**
     * Starts the test channel. This initiates connections to the server.
     *
     * @param path The relative uri for the test connection.
     */
    public void connect(String path) {
        this.path = path;
        URLWithQuery sendDataUri = channel.getForwardChannelUri(path);

        sendDataUri.setParameterValue("MODE", "init");
        // BrowserChannel.createChannelRequest(this);
        // TODO: set up request and act on some callback
    }
}
