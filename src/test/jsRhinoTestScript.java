package test;

import java.io.File;
import java.io.FileReader;
import java.io.BufferedReader;

import org.mozilla.javascript.*;

public class jsRhinoTestScript {

    /**
     * @param args
     */
    public static void main(String[] args) {

        // Creates and enters a Context. The Context stores information
         // about the execution environment of a script.
         Context cx = Context.enter();
         try {
             // Initialize the standard objects (Object, Function, etc.)
             // This must be done before scripts can be executed. Returns
             // a scope object that we use in later calls.
             Scriptable scope = cx.initStandardObjects();
             
             Object jsOut = Context.javaToJS(System.out, scope);
             ScriptableObject.putProperty(scope, "stdout", jsOut);
             
             BufferedReader br = new BufferedReader(new FileReader(new File("src/test/testScript.js")));
             cx.evaluateReader(scope, br, "<cmd>", 1, null);

             System.out.println(scope.get("helloVar", scope));
             //XXX: Note that the helloFunction is executed in the js script by default. This get call does not invoke the function
             System.out.println(scope.get("helloFunction", scope));
             
             Function fct = (Function)scope.get("helloLazyFunction", scope);
             Object result = fct.call(
                     cx, scope, scope, new Object[] {"hello", 3});
             System.out.println(Context.jsToJava(result, String.class));
 
         } catch (Exception e) {
             e.printStackTrace();
         } finally {
             // Exit from the context.
             Context.exit();
         }
    }

}
