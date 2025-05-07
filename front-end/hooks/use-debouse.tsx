export const useDebounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 300
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
