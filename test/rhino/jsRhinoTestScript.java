package test.rhino;

import java.io.File;
import java.io.FileReader;
import java.io.BufferedReader;

import org.mozilla.javascript.*;
import org.mozilla.javascript.tools.shell.Global;

public class jsRhinoTestScript {

    /**
     * @param args
     */
    public static void main(String[] args) {

        // Creates and enters a Context. The Context stores information
         // about the execution environment of a script.
         Context cx = Context.enter();
         Global globalScope = new Global(cx);
         
         // Force interpreter mode
         cx.setOptimizationLevel(-1);
         try {
             // Initialize the standard objects (Object, Function, etc.)
             // This must be done before scripts can be executed. Returns
             // a scope object that we use in later calls.
             //Scriptable scope = cx.initStandardObjects();
             //cx.initStandardObjects();
             Scriptable scope = globalScope;
             
             // Bind java objects
             Object jsOut = Context.javaToJS(System.out, scope);
             ScriptableObject.putProperty(scope, "stdout", jsOut);
             Object jsFunctions = Context.javaToJS(new TestFunctions(), scope);
             ScriptableObject.putProperty(scope, "java", jsFunctions);
             
             // Read env js file
             BufferedReader br = new BufferedReader(new FileReader(new File("src/test/env.rhino.js")));
             cx.evaluateReader(scope, br, "env.rhino.js", 1, null);
             
             // Read js file
             br = new BufferedReader(new FileReader(new File("src/test/testScript.js")));
             cx.evaluateReader(scope, br, "testScript.js", 1, null);             

             // Get value of javascript variable
             System.out.println(scope.get("helloVar", scope));
             
             //XXX: Note that the helloFunction is executed in the js script by default. This get call does not invoke the function
             System.out.println(scope.get("helloFunction", scope));

             // Call javascript function
             Function fct = (Function)scope.get("helloLazyFunction", scope);
             Object result = fct.call(
                     cx, scope, scope, new Object[] {"hello", 3});
             System.out.println(Context.jsToJava(result, String.class));

             // Call function on binded java object
//             fct = (Function)scope.get("testFunction", scope);
//             result = fct.call(cx, scope, scope, new Object[] { });
             
             // Callback function
             fct = (Function)scope.get("addEventListener", scope);
             result = fct.call(cx, scope, scope, new Object[] {
                 new CallBackFunction() {
                     @Override
                     public Object call(Context cx, Scriptable scope, Scriptable thisObj, Object[] args) {
                         System.out.println("this is a callback function");
                         return null;
                     }
                 }
             });
 
         } catch (Exception e) {
             e.printStackTrace();
         } finally {
             // Exit from the context.
             Context.exit();
         }
    }
}
