package channel.browser.util;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;
import java.util.Map.Entry;

public class URLWithQuery
{
    private URL url;
    private String query;

    public URLWithQuery(URL url, String query) throws MalformedURLException
    {
        if(url == null)
            throw new IllegalArgumentException("URL must not be null");
        
        if(query == null)
            throw new IllegalArgumentException("Query must not be null");
        
        if(url.getQuery() != null)
            throw new MalformedURLException("URL must not contain a query");
        
        this.url = url;
        this.query = query;
    }
    
    public URLWithQuery(URL url, Map<String, String> queryMap) throws MalformedURLException
    {
        if(url == null)
            throw new IllegalArgumentException("URL must not be null");
        
        if(queryMap == null)
            throw new IllegalArgumentException("Query map must not be null");
        
        if(url.getQuery() != null)
            throw new MalformedURLException("URL must not contain a query");
        
        // Build query
        StringBuilder queryBuilder = new StringBuilder();
        for(Entry<String, String> parameter : queryMap.entrySet())
        {
            if(queryBuilder.length() > 0)
                queryBuilder.append('&');

            queryBuilder.append(parameter.getKey());
            queryBuilder.append('=');
            queryBuilder.append(parameter.getValue());
        }
        
        this.url = url;
        this.query = queryBuilder.toString();
    }
    
    public URL getURL() throws MalformedURLException
    {
        return new URL(url.toString() + '?' + query);
    }
}
