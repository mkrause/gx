package gx.realtime;

/**
 * @author Rdebokx
 */
public class Error {

    private ErrorType type;
    private String message;
    private boolean isFatal;

    public Error(ErrorType type, String message, boolean isFatal){
        this.type = type;
        this.message = message;
        this.isFatal = isFatal;
    }

    public ErrorType getType() {
        return type;
    }

    public void setType(ErrorType type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isFatal() {
        return isFatal;
    }

    public void setFatal(boolean fatal) {
        isFatal = fatal;
    }
}
