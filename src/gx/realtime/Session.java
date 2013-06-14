package gx.realtime;

import com.fasterxml.jackson.annotation.JsonProperty;
import gx.realtime.operation.Operation;

import java.util.ArrayList;
import java.util.List;

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

    public List<BaseModelEvent> getSnapshot()
    {
        boolean isLocal = false;
        List<BaseModelEvent> events = new ArrayList<BaseModelEvent>();
        for (Operation operation : snapshot) {
            events.addAll(operation.toEvents(null, null, isLocal));
        }
        return events;
    }

    public void setRevision(int revision)
    {
        this.revision = revision;
    }
}
