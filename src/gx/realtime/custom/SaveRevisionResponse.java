package gx.realtime.custom;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Class used to parse the JSON response received from Google after sending our changes to the server.
 */
public class SaveRevisionResponse
{
    @JsonProperty("revision")
    private int revision;

    public int getRevision()
    {
        return revision;
    }

}
