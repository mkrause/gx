package channel.browser;

import channel.browser.util.URLWithQuery;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Creates a ChannelRequest object which encapsulates a request to the server.
 * A new ChannelRequest is created for each request to the server.
 *
 * @param {goog.net.BrowserChannel|goog.net.BrowserTestChannel} channel
 *     The BrowserChannel that owns this request.
 * @param {goog.net.ChannelDebug} channelDebug A ChannelDebug to use for
 * *     logging.
 * @param {string=} sessionId  The session id for the channel.
 * * @param {string|number=} rid  The request id for this request.
 */
public class ChannelRequest
{
    private final int rid;
    private final BrowserChannel browserChannel;
    private final String sessionId;
    private Type type;
    private URLWithQuery baseUri;
    private String postData;
    private URLWithQuery requestUri;
    private int retryId = 0;
    private Xhrio xmlHttp;
    private String verb;

    public ChannelRequest(BrowserChannel browserChannel, String sessionId, int rid, int retryId)
    {
        this.browserChannel = browserChannel;
        this.sessionId = sessionId;
        this.rid = rid;
        this.retryId = retryId;
    }

    public void xmlHttpPost(URLWithQuery uri, String postData)
    {
        this.type = Type.XML_HTTP;
        this.baseUri = uri.clone(); //.makeUnique();
        this.postData = postData;
        sendXmlHttp();
    }

    private void sendXmlHttp()
    {
        this.requestUri = this.baseUri.clone();
        this.requestUri.setParameterValue("t", Integer.toString(this.retryId));

        // send the request either as a POST or GET
        this.xmlHttp = new Xhrio();

        Map<String, String> headers = new HashMap<String, String>();
        if (this.postData.length() > 0) {
            this.verb = "POST";
            headers.put("Content-Type", "application/x-www-form-urlencoded");
            this.xmlHttp.send(this.requestUri, this.verb, this.postData, headers);
        } else {
            this.verb = "GET";
            this.xmlHttp.send(this.requestUri, this.verb, null, headers);
        }
    }
}

enum Error {
    /**
     * Errors due to a non-200 status code.
     */
    STATUS(0),

    /**
     * Errors due to no data being returned.
     */
    NO_DATA(1),

    /**
     * Errors due to a timeout.
     */
    TIMEOUT(2),

    /**
     * Errors due to the server returning an unknown.
     */
    UNKNOWN_SESSION_ID(3),

    /**
     * Errors due to bad data being received.
     */
    BAD_DATA(4),

    /**
     * Errors due to the handler throwing an exception.
     */
    HANDLER_EXCEPTION(5);

    private int code;

    Error(int code)
    {
        this.code = code;
    }
}

/**
 * Enum for channel requests type
 * @enum {number}
 * @private
 */
enum Type {
    /**
     * XMLHTTP requests.
     */
    XML_HTTP(1),

    /**
     * IMG requests.
     */
    IMG(2);

    private int i;

    Type(int i)
    {
        this.i = i;
    }
}