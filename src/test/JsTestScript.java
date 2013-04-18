package test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import javax.script.*;

public class JsTestScript {

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		ScriptEngine js = new ScriptEngineManager().getEngineByName("javascript");
		System.out.println("ScriptEngine: " + js);
	    Bindings bindings = js.getBindings(ScriptContext.ENGINE_SCOPE);
	    
	    bindings.put("stdout", System.out);
	    try {
	    	BufferedReader br = new BufferedReader(new FileReader(new File("src/test/testScript.js")));
			js.eval(br);
			System.out.println(js.get("helloVar"));
			//XXX: Note that the helloFunction is executed in the js script by default. This get call does not invoke the function.
			//Invoking functions is really done by js.eval
			System.out.println(js.get("helloFunction"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
