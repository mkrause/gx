package gx.realtime;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CompoundOperation extends RevertableEvent
{

    private String name;
    private ArrayList<RevertableEvent> events;
    private boolean InProgress;

    public CompoundOperation(String sessionId, String userId, boolean isLocal)
    {
        super(EventType.COMPOUND_OPERATION, (EventTarget) null, sessionId, userId, isLocal, false);
        events = new ArrayList();
        InProgress = true;
    }

    public CompoundOperation(String sessionId, String userId, boolean isLocal, String name)
    {
        this(sessionId, userId, isLocal);
        this.name = name;
    }

    public void addEvent(RevertableEvent event)
    {
        events.add(event);
    }

    public List<RevertableEvent> getEvents()
    {
        return events;
    }

    public String getName()
    {
        return name;
    }

    public boolean isInProgress()
    {
        return InProgress;
    }

    public void setInProgress(boolean inProgress)
    {
        InProgress = inProgress;
    }

    @Override
    public RevertableEvent getReverseEvent()
    {
        CompoundOperation result = new CompoundOperation(sessionId, userId, isLocal);
        for (int i = events.size() - 1; i >= 0; i--) {
            result.addEvent(events.get(i).getReverseEvent());
        }
        return result;
    }

    public List<ObjectChangedEvent> toObjectChangedEvents()
    {
        Map<EventTarget, List<BaseModelEvent>> targetMap = new HashMap<>();
        List<ObjectChangedEvent> ocEvents = new ArrayList<>();

        // Group events by their target
        for (BaseModelEvent event : events) {
            if (event.getTarget() == null)
                continue;

            if (!targetMap.containsKey(event.getTarget())) {
                targetMap.put(event.getTarget(), new ArrayList<BaseModelEvent>());
            }

            targetMap.get(event.getTarget()).add(event);
        }

        // Create for each target an ObjectChangedEvent
        for (EventTarget target : targetMap.keySet()) {
            ObjectChangedEvent ocEvent = new ObjectChangedEvent(target, sessionId, userId, true, targetMap.get(target));
            ocEvents.add(ocEvent);
        }

        return ocEvents;
    }
    
}
