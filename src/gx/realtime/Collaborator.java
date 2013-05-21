package gx.realtime;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author Rdebokx
 */
public class Collaborator {

    @JsonProperty("userId")
    private String userId;
    @JsonProperty("sid")
    private String sessionId;
    @JsonProperty("displayName")
    private String displayName;
    @JsonProperty("color")
    private String color;
    @JsonProperty("isMe")
    private boolean isMe;
    @JsonProperty("isAnonymous")
    private boolean isAnonymous;
    @JsonProperty("photoUrl")
    private String photoUrl;

    @JsonProperty("isActive")
    private boolean isActive;
    @JsonProperty("isNew")
    private boolean isNew;
    @JsonProperty("profileId")
    private String profileId;
    @JsonProperty("userType")
    private int userType;

    public Collaborator()
    { }

    public Collaborator(String userId, String sessionId, String displayName, String color, boolean isMe, boolean isAnonymous, String photoUrl) {
        this.userId = userId;
        this.sessionId = sessionId;
        this.displayName = displayName;
        this.color = color;
        this.isMe = isMe;
        this.isAnonymous = isAnonymous;
        this.photoUrl = photoUrl;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public boolean isMe() {
        return isMe;
    }

    public void setMe(boolean me) {
        isMe = me;
    }

    public boolean isAnonymous() {
        return isAnonymous;
    }

    public void setAnonymous(boolean anonymous) {
        isAnonymous = anonymous;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
}
