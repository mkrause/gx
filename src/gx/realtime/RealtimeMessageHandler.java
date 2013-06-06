package gx.realtime;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;

import gx.browserchannel.message.DataMessage;
import gx.browserchannel.message.MessageEvent;
import gx.browserchannel.message.MessageHandler;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class RealtimeMessageHandler implements MessageHandler {

    private Document document;
    private static Logger logger = LogManager.getLogger(MessageHandler.class);

    public RealtimeMessageHandler(Document doc)
    {
        document = doc;
    }

    @Override
    public void receive(MessageEvent e) {
        logger.debug("Received messageEvent {}", e);
        logger.debug("with message {}", e.getMessage());

        // Return on invalid data
        if(!(e.getMessage() instanceof DataMessage))
            return;

        // Parse data as events
        DataMessage data = (DataMessage) e.getMessage();
        EventList events = parseDataMessage(data);

        // Handle events
        for(Event event : events)
        {
            // TODO: notify Document of this event
            if(event instanceof CollaboratorJoinedEvent) {
                Collaborator user = ((CollaboratorJoinedEvent)event).getCollaborator();
                logger.debug("Collaborator joined event: {}", user.getDisplayName());
            } else if (event instanceof CollaboratorLeftEvent) {
                Collaborator user = ((CollaboratorLeftEvent)event).getCollaborator();
                logger.debug("Collaborator left event: {}", user.getUserId());
            } else if(event == null) {
                logger.debug("Received unparsable event from message: {}", data);
            } else {
                logger.debug("Received unknown event of class {}\n {}", event.getClass(), event);
            }
        }
    }

    /**
     * Parses a given DataMessage into an Event object.
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
