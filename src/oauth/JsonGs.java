package oauth;

import com.google.api.client.util.Key;

public class JsonGs
{
    @Key("sid")
    private String sessionId;

    @Key("revision")
    private int revision;

    @Key("interactionMode")
    private String interactionMode;

    @Key("modelId")
    private String modelId;
    
//    @Key("snapshot")
//    private type Snapshot;
    
    public JsonGs()
    {
    }

    public String getSessionId()
    {
        return sessionId;
    }
    
    public int getRevision()
    {
        return revision;
    }
    
    public String getInteractionMode()
    {
        return interactionMode;
    }
    
    public String getModelId()
    {
        return modelId;
    }
}
