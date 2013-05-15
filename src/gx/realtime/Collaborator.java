package gx.realtime;

/**
 * @author Rdebokx
 */
public class Collaborator {

    private String userId;
    private String sessionId;
    private String displayName;
    private String color;
    private boolean isMe;
    private boolean isAnonymous;
    private String photoUrl;


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
