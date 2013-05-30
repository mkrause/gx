package gx.realtime.custom;

import gx.realtime.BaseModelEvent;

public interface EventHandler {

    Object executeEventListener(BaseModelEvent event);
}
