	stdout.println("printed from js: hello!!!")
	
	var helloVar = "hellow";
	
	var helloFunction = function(){
		return "This string comes from the helloFunction";
	}();
	
	
	function helloLazyFunction(value1, value2){
		return "This string contains the parameter: " + value1 + " and " + value2;
	};

	function testFunction(){
		java.test();
	}

	function addEventListener(handler){
		handler();
	}