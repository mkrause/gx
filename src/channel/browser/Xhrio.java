package channel.browser;

import channel.browser.util.URLWithQuery;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.util.HashMap;
import java.util.Map;

/**
 *
 */
public class Xhrio
{

    private static Logger logger = LogManager.getLogger(Xhrio.class);
    private HashMap<String, String> default_headers;

    private URLWithQuery lastUri;
    private HttpURLConnection xhr;

    public Xhrio() {
        default_headers = new HashMap<String, String>();

    }

    /**
     * Performs a certain XHR request.
     *
     * @param url
     * @param method
     * @param content
     * @param extra_headers
     * @return
     */
    // TODO: Use callbacks
    public String send(URLWithQuery url, String method, String content, Map<String, String> extra_headers)
    {
        this.lastUri = url;

        if (method.equals("POST")) {
            // For POST requests, default to the url-encoded form content type.
            extra_headers.put("Content-Type", "application/x-www-form-urlencoded");
        }

        HashMap<String, String> headers = (HashMap<String, String>)default_headers.clone();
        headers.putAll(extra_headers);

        String output = "";

        try {
            logger.info("Opening connection");
            xhr = (HttpURLConnection) url.getURL().openConnection();
            xhr.setDoOutput(true);
            xhr.setDoInput(true);
            xhr.setInstanceFollowRedirects(false);
            xhr.setRequestMethod("POST");
            for (Map.Entry<String, String> entry : extra_headers.entrySet()) {
                xhr.setRequestProperty(entry.getKey(), entry.getValue());
            }
            xhr.setRequestProperty("charset", "utf-8");
            xhr.setRequestProperty("Content-Length", "0");
            xhr.setUseCaches(false);
        } catch (ProtocolException e) {
            logger.error("send: ProtocolException");
            e.printStackTrace();
        } catch (MalformedURLException e) {
            logger.error("send: MalformedURLException");
            e.printStackTrace();
        } catch (IOException e) {
            logger.error("send: IOException");
            e.printStackTrace();
        }

        logger.info("Sending request");
        try {
            DataOutputStream writer = new DataOutputStream(xhr.getOutputStream());
            writer.writeBytes(content);
            writer.flush();
            writer.close();

            logger.info("Reading response");
            InputStream is = xhr.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            String line;
            StringBuffer response = new StringBuffer();
            while((line = reader.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            reader.close();
            output = response.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return output;
    }

}
