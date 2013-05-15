package gx.browserchannel.message;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Model
{
    @JsonProperty("modelId")
    private String modelId;

    public String getModelId()
    {
        return modelId;
    }
}

