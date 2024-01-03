export function genEvent(evtName, params) {
	const customEvent = new CustomEvent(evtName, params);
	window.dispatchEvent(customEvent);
}
