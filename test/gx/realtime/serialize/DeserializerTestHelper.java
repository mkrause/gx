package gx.realtime.serialize;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

import static junit.framework.TestCase.fail;

/**
 *
 */
public abstract class DeserializerTestHelper
{

    private JsonFactory jsonFactory = new JsonFactory();

    protected JsonParser getParser(String json) {
        JsonParser parser = null;
        try {
            parser = jsonFactory.createParser(json);
            parser.setCodec(new ObjectMapper());
        } catch (IOException e) {
            e.printStackTrace();
            fail("Invalid JSON: ||START||" + json + "||END||");
        }
        return parser;
    }
}
