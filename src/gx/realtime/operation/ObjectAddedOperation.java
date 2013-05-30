package gx.realtime.operation;

import gx.realtime.serialize.ObjectAddedOperationDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
 * Internal event for adding a CollabortiveObject to the model
 * 
 * @author E.S. van der Veen
 */
@JsonDeserialize(using = ObjectAddedOperationDeserializer.class)
public class ObjectAddedOperation extends Operation {

    private String objectId;
    private ObjectType objectType;
    
    public ObjectAddedOperation(String id, ObjectType type)
    {
        this.type = Type.OBJECT_ADDED;
        this.objectId = id;
        this.objectType = type;
    }
    
    public ObjectAddedOperation(String id, int type)
    {
        this(id, ObjectType.map(type));
    }

    public enum ObjectType
    {
        COLLABORATIVE_MAP;
        
        public static ObjectType map(int type)
        {
            switch(type)
            {
                case 0:
                return COLLABORATIVE_MAP;
            }
            return null;
        } 
    }
}
