package gx.realtime;

import gx.realtime.serialize.ObjectAddedEventDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
 * Internal event for adding a CollabortiveObject to the model
 * 
 * @author E.S. van der Veen
 */
@JsonDeserialize(using = ObjectAddedEventDeserializer.class)
public class ObjectAddedEvent extends BaseModelEvent {

    public ObjectAddedEvent(EventTarget target, String sessionId, String userId, boolean isLocal){
        super(EventType.OBJECT_ADDED, target, sessionId, userId, isLocal, false);
    }
}
