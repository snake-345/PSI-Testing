(function() {
	testNativeFor();
	testNativeForEach();

	function testNativeFor() {
		for (let i = 0; i < 5; i++) {
			sleep(30);
		}
	}

	function testNativeForEach() {
		[1, 2, 3, 4, 5].forEach(function() {
			sleep(30);
		});
	}

	function sleep(delay) {
		var start = new Date().getTime();

		while (true) {
			if ((new Date().getTime() - start) > delay) {
				break;
			}
		}
	}
});