package gx.realtime.custom;

import gx.realtime.CollaborativeObject;
import gx.realtime.Model;

import java.util.HashMap;
import java.util.Map;

public class CollaborativeCustomObject extends CollaborativeObject {

    private Map<String, CollaborativeValue> fields;

    protected CollaborativeCustomObject(String id, Model model){
        super(id, model);
        fields = new HashMap<String, CollaborativeValue>();
    }

    public CollaborativeValue getField(String fieldName){
        return fields.get(fieldName);
    }

    public Model getModel(){
        return this.model;
    }

    public void setInitializer(){
        //TODO: set initializer function
    }

    public void setOnloaded(){
        //TODO: set onLoaded function
    }

}
