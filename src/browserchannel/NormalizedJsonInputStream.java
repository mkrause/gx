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
    private State state = State.Normal;
    private final int COMMA = ',';
    private final String JSON_END_TOKENS = ")]}'\n";
    private boolean skipped = false;
    
    public NormalizedJsonInputStream(InputStream in)
    {
        super(new BufferedInputStream(in));
    }
    
    @Override
    public int read() throws IOException
    {
        int c;
        
        if(!skipped)
            skipCharacters();
        
        // A little state machine to insert NULL values between two comma's (,,)
        switch(state)
        {
            case Normal:
                c = super.read();
                if(c == COMMA)
                    state = State.CommaSeen;
                return c;
            case CommaSeen:
                c = super.read();
                if(c != COMMA) {
                    state = State.Normal;
                    return c;
                }
                state = State.NULL1;
                return 'n';
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
            default:
                return -1;
        }
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
    
    private void skipCharacters() throws IOException
    {
        if(skipped)
            return;
        
        // Skip content length digits
        skipDigits();
        
        // Skip json closing tokens
        for(char character : JSON_END_TOKENS.toCharArray()) {
            int tmp = super.read();
            if(character != tmp)
                break;
        }
        
        skipped = true;
    }
    
    private void skipDigits() throws IOException
    {
        int digit = 0;
        do {
            super.mark(1);
            digit = super.read();
        }
        // Check if 0-9
        while(digit >= '0' && digit <= '9');
        super.reset();
    }
    
    private enum State
    {
        Normal,
        CommaSeen,
        NULL1,
        NULL2,
        NULL3,
        NULL4
    }
}
