package gx.realtime;

import gx.realtime.operation.Operation;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Session
{
    @JsonProperty("sid")
    private String sid;
    @JsonProperty("revision")
    private int revision;
    @JsonProperty("interactionMode")
    private String interactionMode;
    @JsonProperty("modelId")
    private String modelId;
    @JsonProperty("snapshot")
    private Operation[] snapshot;

    public String getSessionId()
    {
        return sid;
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
    
    public Operation[] getSnapshot()
    {
        return snapshot;
    }

    public void setRevision(int revision)
    {
        this.revision = revision;
    }
}
