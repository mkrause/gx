package gx.browserchannel.util;

import java.util.HashMap;
import java.util.Map;

/**
 * Helper class that allows for chained construction of parameter map.
 */
public class URLQueryBuilder
{
    Map<String, String> parameters = new HashMap<String, String>();

    public URLQueryBuilder put(String key, String value) {
        parameters.put(key, value);
        return this;
    }

    public URLQueryBuilder put(String key, int value) {
        parameters.put(key, Integer.toString(value));
        return this;
    }

    public URLQueryBuilder put(String key, long value) {
        parameters.put(key, Long.toString(value));
        return this;
    }

    public URLQueryBuilder put(String key, Object value) {
        parameters.put(key, value.toString());
        return this;
    }

    public Map<String,String> build() {
        return parameters;
    }
}
