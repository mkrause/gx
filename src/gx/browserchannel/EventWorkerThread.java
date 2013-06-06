package gx.browserchannel;

import gx.browserchannel.message.AbstractMessage;
import gx.browserchannel.message.MessageEvent;
import gx.browserchannel.message.MessageHandler;
import gx.browserchannel.message.SaveMessage;
import gx.realtime.custom.SaveRevisionResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.concurrent.LinkedBlockingQueue;

/**
 * Thread that handles the process of sending messages through the forward channel
 */
public class EventWorkerThread extends Thread
{
    private static Logger logger = LogManager.getLogger(EventWorkerThread.class);
    private final LinkedBlockingQueue<AbstractMessage> messageQueue;
    private final BrowserChannel parent;

    public EventWorkerThread(BrowserChannel parent, LinkedBlockingQueue<AbstractMessage> messageQueue)
    {
        this.parent = parent;
        this.messageQueue = messageQueue;
    }

    public void run()
    {
        try {
            while (!isInterrupted()) {
                consume(messageQueue.take());
            }
        } catch (InterruptedException e) {
            logger.info("EventWorkerThread interrupted");
        }
    }

    /**
     * Consumes the given message and hands the response off to the parent.
     * @param msg
     */
    private void consume(AbstractMessage msg)
    {
        MessageEvent event = new MessageEvent(parent, msg);

        for (MessageHandler handler : parent.getMessageHandlers())
            handler.receive(event);
    }
}
