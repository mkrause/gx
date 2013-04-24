package oauth;

import com.google.api.client.util.Key;

public class JsonModelId
{
    @Key("modelId")
    private String modelId;

    public JsonModelId()
    {
        this.modelId = "leeg";
    }

    public String getModelId()
    {
        return modelId;
    }
}
