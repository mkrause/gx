package gx.realtime;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;

import gx.browserchannel.message.DataMessage;
import gx.browserchannel.message.MessageEvent;
import gx.browserchannel.message.MessageHandler;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class RealtimeMessageHandler implements MessageHandler {

    private static Logger logger = LogManager.getLogger(MessageHandler.class);

    @Override
    public void receive(MessageEvent e) {
        logger.debug("Received messageEvent {}", e);
        logger.debug("with message {}", e.getMessage());

        // Return on invalid data
        if(!(e.getMessage() instanceof DataMessage))
            return;

        // Parse data as event
        DataMessage data = (DataMessage) e.getMessage();
        Event event = parseDataMessage(data);

        // Handle events
        // TODO: notify Document of this event
        if(event instanceof CollaboratorJoinedEvent) {
            Collaborator user = ((CollaboratorJoinedEvent)event).getCollaborator();
            logger.debug("Collaborator joined event: {}", user.getDisplayName());
        } else if (event instanceof CollaboratorLeftEvent) {
            Collaborator user = ((CollaboratorLeftEvent)event).getCollaborator();
            logger.debug("Collaborator left event: {}", user.getUserId());
        } else {
            logger.debug("Received unknown event of class {}, {}", e.getClass(), e);
        }
    }

    /**
     * Parses a given DataMessage into an Event object.
     * @param data
     * @return
     */
    protected Event parseDataMessage(DataMessage data)
    {
        JsonParser parser = data.getContent().traverse();
        parser.setCodec(new ObjectMapper());
        Event event = null;
        try {
            event = parser.readValueAs(Event.class);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return event;
    }

}
