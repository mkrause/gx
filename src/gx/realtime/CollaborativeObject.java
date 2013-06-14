package gx.realtime;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.StringWriter;

public abstract class CollaborativeObject extends EventTarget
{

    //Attributes
    private String id;
    protected Model model;

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
     * Update our local data model based on the given remote event.
     *
     * @param event
     */
    protected void updateModel(BaseModelEvent event)
    {
        // By default, do nothing
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
}
