package gx.browserchannel;

import java.io.*;

/**
 * A reader that implements four kinds of functions.
 * The underlying <code>Reader</code> or <code>InputStream</code> is:
 * <ol>
 * <li> filtered from JSON closing characters at the beginning of the stream: <code>)]}'\n</code>,
 * <li> filtered from integers, that represent the content length, at the beginning of the stream,
 * <li> filtered from double comma's. In between <code>,,</code> a <code>null</code> value is placed,
 * <li> split up in chunks if desired. Each top level JSON array is a separate chunk.
 * </ol>
 */
public class NormalizedJsonReader extends FilterReader
{
    /**
     * A JSON bracket open character: <code>[</code>.
     */
    private final int BRACKET_OPEN = '[';
    /**
     * A JSON bracket close character: <code>]</code>.
     */
    private final int BRACKET_CLOSE = ']';
    /**
     * A comma character: <code>,</code>.
     */
    private final int COMMA = ',';
    /**
     * A new line character: <code>\n</code>.
     */
    private final int NEW_LINE = '\n';
    /**
     * JSON closing characters: <code>)]}'\n</code>.
     */
    private final String JSON_END_TOKENS = ")]}'\n";

    /**
     * Indicates whether the base stream is chunked or not.
     */
    private boolean isChunked = false;
    /**
     * The current state of the state machine that processes the input from the base stream.
     */
    private State state = State.Normal;
    /**
     * The number of open brackets at the current position. When this values becomes zero it indicates the end of a chunk.
     */
    private int numOpenBrackets = 0;
    /**
     * Indicates whether the current position is at the start of the stream.
     */
    private boolean startOfStream = true;
    /**
     * Indicates whether the current position is at the start of a chunk.
     */
    private boolean startOfChunk = false;

    /**
     * Creates a <code>NormalizedJsonInputStream</code> and saves its argument, the input stream <code>in</code>, for later use.
     * The underlying stream is filtered from unwanted JSON characters.
     *
     * @param in the underlying input stream.
     */
    public NormalizedJsonReader(InputStream in)
    {
        super(getBufferedReader(in));
    }

    /**
     * Creates a <code>NormalizedJsonInputStream</code> and saves its argument, the input stream <code>in</code>, for later use.
     * The underlying stream is filtered from unwanted JSON characters.
     * If <code>isChunked == true</code> this stream pretends to be at the end (<code>EOF</code>) until <code>nextChunk()</code> is called.
     *
     * @param in        the underlying input stream.
     * @param isChunked indicates whether the underlying stream is chunked or not.
     */
    public NormalizedJsonReader(InputStream in, boolean isChunked)
    {
        super(getBufferedReader(in));
        this.isChunked = isChunked;
    }

    /**
     * Creates a <code>NormalizedJsonInputStream</code> and saves its argument, the reader <code>in</code>, for later use.
     * The underlying reader is filtered from unwanted JSON characters.
     *
     * @param in the underlying reader.
     */
    public NormalizedJsonReader(Reader in)
    {
        super(getBufferedReader(in));
    }

    /**
     * Creates a <code>NormalizedJsonInputStream</code> and saves its argument, the reader <code>in</code>, for later use.
     * The underlying reader is filtered from unwanted JSON characters.
     * If <code>isChunked == true</code> this reader to be at the end (<code>EOF</code>) until <code>nextChunk()</code> is called.
     *
     * @param in        the underlying reader.
     * @param isChunked indicates whether the underlying reader is chunked or not.
     */
    public NormalizedJsonReader(Reader in, boolean isChunked)
    {
        super(getBufferedReader(in));
        this.isChunked = isChunked;
    }

    /**
     * Creates a new <code>BufferedReader</code> with <code>in</code> as the underlying stream.
     *
     * @param in the underlying input stream.
     * @return the <code>BufferedReader</code>.
     */
    private static Reader getBufferedReader(InputStream in)
    {
        return new BufferedReader(new InputStreamReader(in));
    }

    /**
     * Creates a new <code>BufferedReader</code> with <code>in</code> as the underlying reader.
     * If <code>in</code> already supports marking, it is not wrapped.
     *
     * @param in the underlying reader.
     * @return the <code>BufferedReader</code> or <code>in</code> itself, if it supports marking.
     */
    private static Reader getBufferedReader(Reader in)
    {
        return in.markSupported() ? in : new BufferedReader(in);
    }

    /**
     * Checks if there is another chunk. If that is the case, the input is trimmed and made ready for reading.
     *
     * @return <code>true</code> iff there is another chunk in the stream, <code>false</code> otherwise.
     * @throws IOException
     */
    public boolean nextChunk() throws IOException
    {
        // Not a chunked stream
        if (!isChunked)
            return false;

        // Trim beginning of chunk
        skipStreamPrefix();
        super.mark(1);

        // Check for EOF
        if (super.read() == -1) {
            startOfChunk = false;
            return false;
        }

        // There is another chunk
        startOfChunk = true;
        super.reset();
        state = State.Normal;
        return true;
    }

    /**
     * Checks whether character <code>c</code> indicates the end of a chunk.
     *
     * @param c the character of a chunk.
     * @return <code>true</code> iff <code>c</code> is the last <code>]</code> of a chunk, otherwise false.
     */
    private boolean isEndOfChunk(int c)
    {
        switch (c) {
            case BRACKET_CLOSE:
                return --numOpenBrackets == 0;
            case BRACKET_OPEN:
                numOpenBrackets++;
                break;
        }
        return false;
    }

    @Override
    public int read() throws IOException
    {
        int c;

        // Signal end of stream, if stream is chunked and nextChunk() has not been called
        if (isChunked && !startOfChunk)
            return -1;

        // Skip prefixes one time, if stream is not chunked
        if (!isChunked && startOfStream) {
            skipStreamPrefix();
            startOfStream = false;
        }

        // A little state machine to insert NULL values between two comma's (,,)
        switch (state) {
            case Normal:
                c = super.read();
                if (isChunked && isEndOfChunk(c)) {
                    state = State.EndOfChunk;
                    return c;
                } else if (c == COMMA) {
                    state = State.CommaSeen;
                    return c;
                } else {
                    return c;
                }
            case CommaSeen:
                c = super.read();
                if (isChunked && isEndOfChunk(c)) {
                    state = State.EndOfChunk;
                    return c;
                } else if (c == COMMA) {
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

            // Signal end of stream
            case EndOfChunk:
            default:
                return -1;
        }
    }

    @Override
    public int read(char b[]) throws IOException
    {
        return read(b, 0, b.length);
    }

    @Override
    public int read(char b[], int off, int len) throws IOException
    {
        if (b == null)
            throw new NullPointerException();

        if (off < 0 || len < 0 || len > b.length - off)
            throw new IndexOutOfBoundsException();

        if (len == 0)
            return 0;

        int c = read();
        if (c == -1)
            return -1;

        b[off] = (char) c;

        int i = 1;
        try {
            for (; i < len; i++) {
                c = read();
                if (c == -1)
                    break;
                b[off + i] = (char) c;
            }
        } catch (IOException e) {
        }
        return i;
    }

    /**
     * Skips the unwanted JSON tokens at the beginning of the stream or chunk.
     *
     * @throws IOException
     */
    private void skipStreamPrefix() throws IOException
    {
        // Skip white space
        skipWhitespace();

        // Skip content length digits
        if (skipDigits() == 0) {
            // Skip json closing tokens, if no digits skipped
            skipCharacters();
        } else {
            // Skip white space
            skipWhitespace();
        }
    }

    /**
     * Skips all new line characters.
     *
     * @return the number of characters skipped.
     * @throws IOException
     */
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
        while (c == NEW_LINE);
        super.reset();

        return count;
    }

    /**
     * Skips all JSON end tokens.
     *
     * @return the number of characters skipped.
     * @throws IOException
     */
    private int skipCharacters() throws IOException
    {
        int count = 0;

        // Skip json closing tokens
        for (char character : JSON_END_TOKENS.toCharArray()) {
            super.mark(1);
            if (character != super.read()) {
                super.reset();
                break;
            }
            count++;
        }
        return count;
    }

    /**
     * Skips all digits.
     *
     * @return the number of digits skipped.
     * @throws IOException
     */
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
        while (digit >= '0' && digit <= '9');
        super.reset();

        return count;
    }

    /**
     * The possible states of the state machine used by the <code>NormalizedJsonReader</code>.
     */
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
