package gx.browserchannel.util;

import gx.browserchannel.NormalizedJsonReader;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.ProtocolException;

/**
 *
 */
public class ConnectionFactory
{

    /**
     * Creates a HttpUrlConnection for a given UrlWithQuery object
     *
     * @param url
     * @return
     */
    public static HttpURLConnection createConnection(URLWithQuery url)
    {
        HttpURLConnection connection = null;
        try {
            connection = (HttpURLConnection) url.getURL().openConnection();
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setInstanceFollowRedirects(false);

            connection.setRequestMethod("POST");

            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            connection.setRequestProperty("charset", "utf-8");
            connection.setUseCaches(false);
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return connection;
    }

    /**
     * Performs a request for a given URL and data string and constructs a NormalizedJsonReader from the responses
     *
     * @param url
     * @param data
     * @return
     */
    public static NormalizedJsonReader createJsonReader(URLWithQuery url, String data)
    {
        NormalizedJsonReader reader = null;
        try {
            byte[] binaryMsg = data.getBytes("UTF-8");
            HttpURLConnection connection = createConnection(url);
            connection.setRequestProperty("Content-Length", String.valueOf(binaryMsg.length));
            connection.getOutputStream().write(binaryMsg);

            reader = new NormalizedJsonReader(connection.getInputStream());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return reader;
    }

    /**
     * Performs a non-chunked GET request for the given URL and returns a NormalizedJsonReader on the output stream.
     *
     * @param url
     * @return
     */
    public static NormalizedJsonReader createJsonReader(URLWithQuery url)
    {
        return createJsonReader(url, false);
    }

    /**
     * Performs a GET request for the given URL and returns a NormalizedJsonReader on the output stream.
     *
     * @param url
     * @param isChunked
     * @return
     */
    public static NormalizedJsonReader createJsonReader(URLWithQuery url, boolean isChunked)
    {
        NormalizedJsonReader reader = null;
        try {
            HttpURLConnection connection = (HttpURLConnection) url.getURL().openConnection();
            reader = new NormalizedJsonReader(connection.getInputStream(), isChunked);
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return reader;
    }
}
