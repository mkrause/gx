package gx.browserchannel.util;

import gx.browserchannel.NormalizedJsonReader;

import java.io.IOException;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;

/**
 *
 */
public class ConnectionFactory
{

    public static HttpURLConnection createConnection(URLWithQuery url, String method)
    {
        HttpURLConnection connection = null;
        try {
            connection = (HttpURLConnection) url.getURL().openConnection();
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setInstanceFollowRedirects(false);

            connection.setRequestMethod(method);

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

    public static NormalizedJsonReader createJsonReader(URLWithQuery url)
    {
        NormalizedJsonReader reader = null;
        try {
            HttpURLConnection connection = (HttpURLConnection) url.getURL().openConnection();
            reader = new NormalizedJsonReader(connection.getInputStream());
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return reader;
    }
}
