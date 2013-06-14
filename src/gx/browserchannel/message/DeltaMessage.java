package gx.browserchannel.message;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;

public class DeltaMessage
{
    @JsonProperty("mu")
    private ArrayList<Object> mu;
    @JsonProperty("me")
    private MeInfo me;

    public static class MeInfo
    {
        @JsonProperty("TITLE")
        private String title;
        @JsonProperty("PARENTS")
        private ArrayList<Object> parents;
        @JsonProperty("STAR")
        private boolean star;

    }
}
