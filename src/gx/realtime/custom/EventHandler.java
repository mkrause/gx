package gx.realtime.custom;

import gx.realtime.BaseModelEvent;

/**
 * @author Rdebokx
 */
public interface EventHandler {

    Object executeEventListener(BaseModelEvent event);
}
