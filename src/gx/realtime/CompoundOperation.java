package gx.realtime;

import java.util.ArrayList;
import java.util.List;

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
}
