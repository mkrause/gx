package main;

public class mainExecutable {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		jsWrapper js = new jsWrapper();
		js.initialize();
		
		System.out.println("All files loaded.");
		
		js.callFunction("wrapperTest", null);
	}

}
