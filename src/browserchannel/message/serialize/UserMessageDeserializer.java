package browserchannel.message.serialize;

import java.io.IOException;
import browserchannel.message.UserMessage;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import browserchannel.message.UserMessage.User;

public class UserMessageDeserializer extends JsonDeserializer<UserMessage>
{
    @Override
    public UserMessage deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException
    {
        return new UserMessage(jp.readValueAs(User.class));
    }
}