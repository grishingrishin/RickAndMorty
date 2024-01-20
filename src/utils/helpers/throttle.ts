import type { Throttle } from '@/utils/types';

// prettier-ignore
export function throttle(
  fn: Throttle,
  delay: number = 250
): Throttle {
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
