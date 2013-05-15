package gx.realtime;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User
{
    @JsonProperty("color")
    private String color;
    @JsonProperty("displayName")
    private String displayName;
    @JsonProperty("isActive")
    private boolean isActive;
    @JsonProperty("isAnonymous")
    private boolean isAnonymous;
    @JsonProperty("isMe")
    private boolean isMe;
    @JsonProperty("isNew")
    private boolean isNew;
    @JsonProperty("photoUrl")
    private String photoUrl;
    @JsonProperty("profileId")
    private String profileId;
    @JsonProperty("sid")
    private String sid;
    @JsonProperty("userId")
    private String userId;
    @JsonProperty("userType")
    private int userType;

    public String getColor()
    {
        return color;
    }

    public String getDisplayName()
    {
        return displayName;
    }

    public boolean isActive()
    {
        return isActive;
    }

    public boolean isAnonymous()
    {
        return isAnonymous;
    }

    public boolean isMe()
    {
        return isMe;
    }

    public boolean isNew()
    {
        return isNew;
    }

    public String getPhotoUrl()
    {
        return photoUrl;
    }

    public String getProfileId()
    {
        return profileId;
    }

    public String getSid()
    {
        return sid;
    }

    public String getUserId()
    {
        return userId;
    }

    public int getUserType()
    {
        return userType;
    }
}

