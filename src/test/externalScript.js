function externalFunction(value1){
	stdout.println("The external function has been called! we will execute the lazy function with params " + value1 + " and 9");
	//stdout.println("helloLazyFunction: " + helloLazyFunction);
	return helloLazyFunction(value1, 9);
}