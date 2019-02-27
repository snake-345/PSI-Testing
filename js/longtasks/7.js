(function() {
	var start = performance.now();

	while (true) {
		if ((performance.now() - start) / 1000 >= 1) { break; }
	}
})();
