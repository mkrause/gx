package main;

import browserchannel.message.Message;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JacksonParseTest
{
    private static String JSON = "[[0,[\"c\",\"4A2553368DD0B65D\",null,8]],[1,[5,1367925530423,{\"color\":\"#58B442\",\"displayName\":\"Erik van der Veen\",\"isActive\":true,\"isAnonymous\":false,\"isMe\":true,\"isNew\":true,\"photoUrl\":\"\\/\\/lh5.googleusercontent.com\\/-93KE3EpMwQY\\/AAAAAAAAAAI\\/AAAAAAAADcc\\/1zkYuRv7BJY\\/s128-c\\/photo.jpg\",\"profileId\":\"112956879592017678596\",\"sid\":\"16d0cc14667dc19b\",\"userId\":\"112956879592017678596\",\"userType\":0}]],[2,[5,1367925530425,{\"color\":\"#58B442\",\"displayName\":\"Erik van der Veen\",\"isActive\":true,\"isAnonymous\":false,\"isMe\":false,\"isNew\":false,\"photoUrl\":\"\\/\\/lh5.googleusercontent.com\\/-93KE3EpMwQY\\/AAAAAAAAAAI\\/AAAAAAAADcc\\/1zkYuRv7BJY\\/s128-c\\/photo.jpg\",\"profileId\":\"112956879592017678596\",\"sid\":\"2221a682069e7485\",\"userId\":\"112956879592017678596\",\"userType\":0}]]]";
    //private static String JSON = "[[12,[\"noop\"]]]";
    
    public static void main(String[] args) {
        try {
            // TODO: fix [,,] arrays (missing values)
            JsonFactory jfactory = new JsonFactory();
            JsonParser jParser = jfactory.createParser(JSON);
            ObjectMapper mapper = new ObjectMapper();
            jParser.setCodec(mapper);
            
            Message[] messages = jParser.readValueAs(Message[].class);
            for(Message m : messages) {
                System.out.println(m);
            }
            
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
