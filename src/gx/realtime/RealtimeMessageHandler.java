package gx.realtime;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import gx.browserchannel.message.DataMessage;
import gx.browserchannel.message.MessageEvent;
import gx.browserchannel.message.MessageHandler;
import gx.realtime.custom.SaveRevisionResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class RealtimeMessageHandler implements MessageHandler
{

    private Document document;
    private static Logger logger = LogManager.getLogger(MessageHandler.class);

    public RealtimeMessageHandler(Document doc)
    {
        document = doc;
    }

    @Override
    public void response(JsonNode data)
    {
        JsonParser jParser = data.traverse();
        jParser.setCodec(new ObjectMapper());
        SaveRevisionResponse response = null;
        try {
            response = jParser.readValueAs(SaveRevisionResponse.class);
            logger.debug("Received revision response: ", response.getRevision());
            document.getSession().setRevision(response.getRevision());
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public void receive(MessageEvent e)
    {
        logger.debug("Received messageEvent {}", e);
        logger.debug("with message {}", e.getMessage());

        // Return on invalid data
        if (!(e.getMessage() instanceof DataMessage))
            return;

        // Parse data as events
        DataMessage data = (DataMessage) e.getMessage();
        EventList events = parseDataMessage(data);

        // Handle events
        for (Event event : events) {
            if (document != null && event != null) {
                document.handleRemoteEvent(event);
            }
        }
    }

    /**
     * Parses a given DataMessage into an Event object.
     *
     * @param data
     * @return
     */
    protected EventList parseDataMessage(DataMessage data)
    {
        JsonParser parser = data.getContent().traverse();
        parser.setCodec(new ObjectMapper());
        EventList events = null;
        try {
            events = parser.readValueAs(EventList.class);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return events;
    }

}
