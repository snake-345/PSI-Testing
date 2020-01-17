(function() {
	testNativeFor();
	testNativeForEach();

	function testNativeFor() {
		for (let i = 0; i < 5; i++) {
			setTimeout(function() {
				sleep(30);
			}, 0);
		}
	}

	function testNativeForEach() {
		[1, 2, 3, 4, 5].forEach(function() {
			setTimeout(function() {
				sleep(30);
			}, 0);
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
}());