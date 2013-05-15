package gxLib.custom;

import gxLib.CollaborativeObject;
import gxLib.Model;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Rdebokx
 */
public class CollaborativeCustomObject extends CollaborativeObject {

    private Map<String, CollaborativeValue> fields;

    protected CollaborativeCustomObject(Model model){
        super(model);
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
