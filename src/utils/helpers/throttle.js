export function throttle(fn, delay = 250) {
	let timer = null;

	return function perform(...args) {
		if (timer) return;

		timer = setTimeout(() => {
			fn(...args);

			clearTimeout(timer);
			timer = null;
		}, delay);
	};
}
