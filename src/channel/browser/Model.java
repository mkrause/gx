package channel.browser;

import com.google.api.client.util.Key;

public class Model
{
    @Key("modelId")
    private String id = null;

    public String getId()
    {
        return id;
    }
}
