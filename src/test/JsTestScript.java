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
	    Bindings bindings = js.getBindings(ScriptContext.ENGINE_SCOPE);
	    
	    bindings.put("stdout", System.out);
	    try {
	    	BufferedReader br = new BufferedReader(new FileReader(new File("src/test/testScript.js")));
			js.eval(br);
			System.out.println(js.get("helloVar"));
			System.out.println(js.get("helloFunction"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    // Prints "-1.0" to the standard output stream.
	}

}
