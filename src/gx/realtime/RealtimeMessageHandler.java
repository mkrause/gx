package gx.realtime;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;

import gx.browserchannel.message.DataMessage;
import gx.browserchannel.message.MessageEvent;
import gx.browserchannel.message.MessageHandler;

public class RealtimeMessageHandler implements MessageHandler {

    @Override
    public void receive(MessageEvent e) {
        // Return on invalid data
        if(!(e.getMessage() instanceof DataMessage))
            return;

        // Parse data as event
        DataMessage data = (DataMessage) e.getMessage();
        JsonParser parser = data.getContent().traverse();
        parser.setCodec(new ObjectMapper());
        Event event = null;
        try {
            event = parser.readValueAs(Event.class);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        // Handle events
        if(event instanceof CollaboratorJoinedEvent) {
            Collaborator user = ((CollaboratorJoinedEvent)event).getCollaborator();
            System.out.println("Collaborator joined event: " + user.getDisplayName());
        }
    }
}
