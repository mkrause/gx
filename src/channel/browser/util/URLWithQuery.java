package channel.browser.util;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

public class URLWithQuery implements Cloneable
{
    private Map<String, String> queryMap = new HashMap<String, String>();
    private URL url;

    public URLWithQuery(URL url, String query) throws MalformedURLException
    {
        if(url == null)
            throw new IllegalArgumentException("URL must not be null");
        
        if(query == null)
            throw new IllegalArgumentException("Query must not be null");
        
        if(url.getQuery() != null)
            throw new MalformedURLException("URL must not contain a query");
        
        this.url = url;

        // Construct queryMap
        for(String queryPart : query.split("&")) {
            String[] parts = queryPart.split("=");
            if(parts.length != 2) {
                throw new MalformedURLException("Query must consist of key=value pairs");
            }
            queryMap.put(parts[0], parts[1]);
        }
    }
    
    public URLWithQuery(URL url, Map<String, String> queryMap) throws MalformedURLException
    {
        if(url == null)
            throw new IllegalArgumentException("URL must not be null");
        
        if(queryMap == null)
            throw new IllegalArgumentException("Query map must not be null");
        
        if(url.getQuery() != null)
            throw new MalformedURLException("URL must not contain a query");

        this.queryMap = queryMap;
        this.url = url;
    }

    private String getQuery() {
        StringBuilder queryBuilder = new StringBuilder();
        for(Entry<String, String> parameter : queryMap.entrySet())
        {
            if(queryBuilder.length() > 0)
                queryBuilder.append('&');

            queryBuilder.append(parameter.getKey());
            queryBuilder.append('=');
            queryBuilder.append(parameter.getValue());
        }

        return queryBuilder.toString();
    }
    
    public URL getURL() throws MalformedURLException
    {
        return new URL(url.toString() + '?' + getQuery());
    }

    public void setParameterValue(String parameter, String value) {
        queryMap.put(parameter, value);
    }

    public URLWithQuery clone() {
        try {
            return new URLWithQuery(url, new HashMap<String, String>(queryMap));
        } catch (MalformedURLException e) {
            return null;
        }
    }

}
