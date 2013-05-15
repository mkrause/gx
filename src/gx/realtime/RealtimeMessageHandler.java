package gx.realtime;

import gx.browserchannel.message.DataMessage;
import gx.browserchannel.message.MessageEvent;
import gx.browserchannel.message.MessageHandler;

public class RealtimeMessageHandler implements MessageHandler {

    @Override
    public void receive(MessageEvent e) {
        if(!(e.getMessage() instanceof DataMessage))
            return;

        DataMessage data = (DataMessage) e.getMessage();
        // TODO: parse events
        //BaseModelEvent event = json.parse(BaseModelEvent.class);
        System.out.println(data.toString());
    }
}
