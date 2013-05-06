package channel.browser;

import com.google.api.client.util.Key;

public class Session
{
    @Key("sid")
    private String id;

    @Key("revision")
    private int revision;

    @Key("interactionMode")
    private String interactionMode;

    @Key("modelId")
    private String modelId;
    
    // TODO: parse snapshot
//    @Key("snapshot")
//    private type Snapshot;

    public String getId()
    {
        return id;
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
