package browserchannel;

import java.io.BufferedInputStream;
import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * A stream wrapper that implements three kinds of functions
 * 1. skips json closing characters at the beginning of the stream: )]}'
 * 2. It also skips integers at the beginning of the stream.
 * 3. replace ,,
 * 
 * @author Erik
 */
public class NormalizedJsonInputStream extends FilterInputStream
{
    private final int BRACKET_OPEN = '[';
    private final int BRACKET_CLOSE = ']';
    private final int COMMA = ',';
    private final int NEW_LINE = '\n';
    private final String JSON_END_TOKENS = ")]}'\n";
    
    private boolean isChunked = false;
    private State state = State.Normal;
    private int numOpenBrackets = 0;
    private boolean startOfStream = true;
    private boolean startOfChunk = false;

    public NormalizedJsonInputStream(InputStream in)
    {
        super(new BufferedInputStream(in));
    }
    
    public NormalizedJsonInputStream(InputStream in, boolean isChunked)
    {
        super(new BufferedInputStream(in));
        this.isChunked = isChunked;
    }
    
    public boolean nextChunk() throws IOException
    {
        if(!isChunked)
            return false;
        
        skipStreamPrefix();
        super.mark(1);
        
        if(super.read() == -1) {
            startOfChunk = false;
            return false;
        }

        startOfChunk = true;
        super.reset();
        state = State.Normal;
        return true;
    }
    
    @Override
    public int read() throws IOException
    {
        int c;
        
        // Indicate end of stream, if stream is chunked and nextChunk() has not been called
        if(isChunked && !startOfChunk)
            return -1;
        
        // Skip prefixes one time, if stream is not chunked
        if(!isChunked && startOfStream) {
            skipStreamPrefix();
            startOfStream = false;
        }
        
        // A little state machine to insert NULL values between two comma's (,,)
        switch(state)
        {
            case Normal:
                c = super.read();
                if(isChunked && isEndOfChunk(c)) {
                    state = State.EndOfChunk;
                    return c;
                } else if(c == COMMA) {
                    state = State.CommaSeen;
                    return c;
                } else {
                    return c;
                }
            case CommaSeen:
                c = super.read();
                if(isChunked && isEndOfChunk(c)) {
                    state = State.EndOfChunk;
                    return c;
                } else if(c == COMMA) {
                    state = State.NULL1;
                    return 'n';
                } else {
                    state = State.Normal;
                    return c;
                }
            case NULL1:
                state = State.NULL2;
                return 'u';
            case NULL2:
                state = State.NULL3;
                return 'l';
            case NULL3:
                state = State.NULL4;
                return 'l';
            case NULL4:
                state = State.CommaSeen;
                return COMMA;
                
            // Indicate end of stream
            case EndOfChunk:
            default:
                return -1;
        }
    }
    
    private boolean isEndOfChunk(int c)
    {
        boolean change;
        switch(c) {
            case BRACKET_OPEN:
                numOpenBrackets++;
                change = true;
                break;
            case BRACKET_CLOSE:
                numOpenBrackets--;
                change = true;
                break;
            default:
                change = false;
        }
        return change && numOpenBrackets == 0;
    }

    @Override
    public int read(byte[] b) throws IOException
    {
        return read(b, 0, b.length);
    }

    @Override
    public int read(byte b[], int off, int len) throws IOException {
        if (b == null)
            throw new NullPointerException();
            
        if (off < 0 || len < 0 || len > b.length - off)
            throw new IndexOutOfBoundsException();
        
        if (len == 0)
            return 0;

        int c = read();
        if (c == -1)
            return -1;
        
        b[off] = (byte)c;

        int i = 1;
        try {
            for (; i < len ; i++) {
                c = read();
                if (c == -1)
                    break;
                b[off + i] = (byte)c;
            }
        } catch (IOException e) {
        }
        return i;
    }
    
    private void skipStreamPrefix() throws IOException
    {
        // Skip white space
        skipWhitespace();
        
        // Skip content length digits
        if(skipDigits() == 0) {
            // Skip json closing tokens, if no digits skipped
            skipCharacters();
        } else {
            // Skip white space
            skipWhitespace();
        }
    }
    
    private int skipWhitespace() throws IOException
    {
        int count = -1;
        int c = 0;
        
        do {
            super.mark(1);
            c = super.read();
            count++;
        }
        // Check for new line
        while(c == NEW_LINE);
        super.reset();
        
        return count;
    }

    private int skipCharacters() throws IOException
    {
        int count = 0;
        
        // Skip json closing tokens
        for(char character : JSON_END_TOKENS.toCharArray()) {
            super.mark(1);
            if(character != super.read()) {
                super.reset();
                break;
            }
            count++;
        }
        return count;
    }
    
    private int skipDigits() throws IOException
    {
        int count = -1;
        int digit = 0;
        
        do {
            super.mark(1);
            digit = super.read();
            count++;
        }
        // Check if 0-9
        while(digit >= '0' && digit <= '9');
        super.reset();
        
        return count;
    }
    
    private enum State
    {
        Normal,
        CommaSeen,
        NULL1,
        NULL2,
        NULL3,
        NULL4,
        EndOfChunk
    }
}
