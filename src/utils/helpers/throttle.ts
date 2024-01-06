export function throttle(fn, delay = 250) {
  let wait = false;

  return (...args) => {
    if (wait) {
      return;
    }

    fn(...args);
    wait = true;

    setTimeout(() => {
      wait = false;
    }, delay);
  };
}
