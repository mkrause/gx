package browserchannel.message;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ModelMessage
{
    @JsonProperty("modelId")
    private String modelId;

    public String getModelId()
    {
        return modelId;
    }
}

