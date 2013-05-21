package gx.realtime;

import gx.realtime.serialize.EventDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(using = EventDeserializer.class)
public interface Event
{

}
