package gx.browserchannel.message.serialize;

import gx.browserchannel.message.SaveMessage;

/**
 *
 */
public class SaveMessageSerializer
{
    public String serialize(SaveMessage message) {
        StringBuffer buffer = new StringBuffer();
        buffer.append("{\"revision\":");
        buffer.append(message.getRevision());
        buffer.append(",\"requestNumber\":");
        buffer.append(message.getRevision());
        buffer.append(",\"changes\":");
//        buffer.append(message.getChanges());
        buffer.append("}");
        return buffer.toString();
    }
}
