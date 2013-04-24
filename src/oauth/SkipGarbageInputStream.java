package oauth;

import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;

public class SkipGarbageInputStream extends FilterInputStream
{
    private String garbage = ")]}'\n";
    private boolean skipped = false;
    
    public SkipGarbageInputStream(InputStream in) {
        super(in);
    }
    
    @Override
    public int read() throws IOException {
        if(!skipped)
            skipCharacters();
        
        return super.read();
    }

    @Override
    public int read(byte[] b) throws IOException {
        if(!skipped)
            skipCharacters();

        return super.read(b);
    }

    @Override
    public int read(byte[] b, int off, int len) throws IOException {
        if(!skipped)
            skipCharacters();

        return super.read(b, off, len);
    }
    
    private void skipCharacters() throws IOException {
        if(skipped)
            return;
        
        for(char character : garbage.toCharArray())
        {
            int tmp = super.read();
            if(character != tmp)
                break;
        }
        
        skipped = true;
    }
}
