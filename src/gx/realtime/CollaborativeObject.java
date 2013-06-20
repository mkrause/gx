package gx.realtime;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.StringWriter;
import java.util.List;
import java.util.Set;

public abstract class CollaborativeObject extends EventTarget
{

    //Attributes
    private String id;
    protected Model model;

    private String sessionId;
    private String userId;

    //Methods

    /**
     * CollaborativeObject contains behavior common to all built in collaborative types. This class should not be instantiated directly.
     * Use the create* methods on gx.realtime.Model to create specific types of collaborative objects.
     *
     * @param id    The id of this object, determined by the model.
     * @param model The document model.
     */
    public CollaborativeObject(String id, Model model)
    {
        super();
        this.id = id;
        this.model = model;
    }

    /**
     * This function executes the event handlers for the given Event. If this is the first time this BaseModelEvent
     * passes this object, it is handled. If it is a ObjectChangedEvent the events that are contained by this OCE are
     * unpacked, after which the corresponding event handlers are executed. Concluding, the eventHandlers for the OCE in
     * this EventTarget are executed, after which the event will be bubbled.
     * @param event The ObjectChangedEvent containing the necessary information.
     */
    @Override
    protected void fireEvent(Event event) {
        if(!(event instanceof BaseModelEvent)) {
            super.fireEvent(event);
            return;
        }

        BaseModelEvent bmEvent = (BaseModelEvent) event;

        // Check if the event targets (or bubbles through) this object
        if (!this.equals(event.getTarget()) && !bmEvent.bubbles())
            return;

        // Fire contained events of an ObjectChangedEvent first
        if (this.equals(event.getTarget()) && event instanceof ObjectChangedEvent) {
            ObjectChangedEvent ocEvent = (ObjectChangedEvent) event;
            if (ocEvent.getEvents() != null) {
                for (BaseModelEvent e : ocEvent.getEvents()) {
                    fireEvent(e);
                }
            }
        }

        // Fire event
        if (bmEvent.isFirstVisit(this)) {
            bmEvent.addBubbledNode(this);
            executeEventHandlers(bmEvent);
            bubble(bmEvent);
        }
    }

    /**
     * This method bubbles the given event to its parents iff event.bubbles() == true.
     * @param event The event that should be bubbled.
     */
    private void bubble(BaseModelEvent event){
        if (event.bubbles()) {
            for (EventTarget parent : parents) {
                parent.fireEvent(event);
            }
        }
    }

    /**
     * This method is a wrapper function for executing the event handlers of this Object.
     * @param event The BaseModelEvent for which the event handlers need to be executed.
     */
    private void executeEventHandlers(BaseModelEvent event)
    {
        //execute eventhandlers of this EventTarget if needed.
        Set<EventHandler> handlers = eventHandlers.get(event.getType());
        if (handlers != null) {
            for (EventHandler handler : handlers) {
                handler.handleEvent(event);
            }
        }
    }

    /**
     * Update our local data model based on the given remote event.
     *
     * @param event
     */
    protected void updateModel(BaseModelEvent event)
    {
        // By default, do nothing
    }

    protected String getUserId()
    {
        if(userId == null && model.getDocument() != null && model.getDocument().getMe() != null) {
            userId = model.getDocument().getMe().getUserId();
        }
        return userId;
    }

    protected String getSessionId()
    {
        if(sessionId == null && model.getDocument() != null && model.getDocument().getSession() != null) {
            sessionId = model.getDocument().getSession().getSessionId();
        }
        return sessionId;
    }

    /**
     * Returns the object id.
     *
     * @return The id.
     */
    public String getId()
    {
        return id;
    }

    /**
     * Returns a string representation of this collaborative object.
     *
     * @return A string representation.
     */
    public String toString()
    {
        ObjectMapper mapper = new ObjectMapper();
        StringWriter writer = new StringWriter();
        try {
            mapper.writeValue(writer, this);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return writer.toString();
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        return id.equals(((CollaborativeObject) o).id);
    }

    @Override
    public int hashCode()
    {
        return id.hashCode();
    }
}
