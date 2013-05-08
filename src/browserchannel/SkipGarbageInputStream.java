package browserchannel;

import java.io.BufferedInputStream;
import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * A stream wrapper that skips certain garbage characters: )]}'
 * 
 * @author Erik
 */
public class SkipGarbageInputStream extends FilterInputStream
{
    private String garbage = ")]}'\n";
    private boolean skipped = false;
    
    public SkipGarbageInputStream(InputStream in)
    {
        super(new BufferedInputStream(in));
    }
    
    @Override
    public int read() throws IOException
    {
        if(!skipped)
            skipCharacters();
        
        return super.read();
    }

    @Override
    public int read(byte[] b) throws IOException
    {
        if(!skipped)
            skipCharacters();

        return super.read(b);
    }

    @Override
    public int read(byte[] b, int off, int len) throws IOException
    {
        if(!skipped)
            skipCharacters();

        return super.read(b, off, len);
    }
    
    private void skipCharacters() throws IOException
    {
        if(skipped)
            return;
        
        // Skip content length digits
        skipDigits();
        
        // Skip json closing tokens
        for(char character : garbage.toCharArray()) {
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
        while(digit >= 48 && digit <= 57);
        super.reset();
    }
}
