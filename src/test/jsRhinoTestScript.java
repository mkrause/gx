package test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import javax.script.*;

public class jsRhinoTestScript {

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		Context context = Context.enter();
		try {
			BufferedReader script = new BufferedReader(new FileReader(new File("src/test/testScript.js")));
		    ScriptableObject scope = context.initStandardObjects();
		    context.evaluateString(scope, script, "script", 1, null);
		    
		    Object helloVar = scope.get("helloVar", scope);
		    System.out.println("returned helloVar: " + helloVar);
		    
		    Function fct = (Function)scope.get("helloLazyFunction", scope);
		    Object result = fct.call(
		            context, scope, scope, new Object[] {"one", "two"});
		    System.out.println("Returned from function: " + Context.jsToJava(result, int.class));
		} finally {
		    Context.exit();
		}
	}

}
