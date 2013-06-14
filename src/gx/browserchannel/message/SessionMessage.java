package gx.browserchannel.message;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import gx.browserchannel.message.serialize.SessionMessageDeserializer;

@JsonDeserialize(using = SessionMessageDeserializer.class)
public class SessionMessage extends AbstractMessage
{
    private String sessionId = null;
    private String hostPrefix = null;
    private int negotiatedVersion = -1;

    public SessionMessage(String id, String hostPrefix, int version)
    {
        this.sessionId = id;
        this.hostPrefix = hostPrefix;
        this.negotiatedVersion = version;
    }

    public String getId()
    {
        return sessionId;
    }

    public String getHostPrefix()
    {
        return hostPrefix;
    }

    public int getNegotiatedVersion()
    {
        return negotiatedVersion;
    }
}