package gx.browserchannel.message;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonProperty;

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
