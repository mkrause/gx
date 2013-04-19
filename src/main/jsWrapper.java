package main;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import org.mozilla.javascript.*;

public class jsWrapper {
	
	private static String[] scriptPaths = new String[]{
		"src/js/gxWrapper.js",
		"../realtime-playground/js/realtime-client-utils.js",
		"../realtime-playground/js/rtpg.js",
		"../realtime-playground/js/rtpg.log.js",
		"../realtime-playground/js/rtpg.string.js",
		"../realtime-playground/js/rtpg.list.js",
		"../realtime-playground/js/rtpg.map.js",
		"../realtime-playground/js/rtpg.custom.js",
		"../realtime-playground/js/rtpg.collaborators.js",
		"../realtime-playground/js/rtpg.ui.js",
	};
	
	private Context context;
	private Scriptable scope;
	
	public jsWrapper(){
		
	}
	
	public void initialize(){
		context = Context.enter();
		try {
            // Initialize the standard objects (Object, Function, etc.)
            // This must be done before scripts can be executed. Returns
            // a scope object that we use in later calls.
            scope = context.initStandardObjects();
            
            Object jsOut = Context.javaToJS(System.out, scope);
            ScriptableObject.putProperty(scope, "stdout", jsOut);
            
            for(String path : scriptPaths){
            	BufferedReader br = new BufferedReader(new FileReader(new File(path)));
            	context.evaluateReader(scope, br, "<cmd>", 1, null);
            }
		} catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public Object callFunction(String functionName, Object[] params){
		Function func = (Function)scope.get(functionName, scope);
		return func.call(context, scope, scope, params);
	}
	
	public Object getVariable(String variableName){
		return scope.get(variableName, scope);
	}
}
