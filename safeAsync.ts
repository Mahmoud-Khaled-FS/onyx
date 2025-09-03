import { Result } from './result';

type PromiseFunction<T = any> = (...args: any[]) => Promise<T> | T;
type PromiseFunctionArgs<T extends (...args: any[]) => any> = Parameters<T>;

export async function safeAsync<T, F extends PromiseFunction = PromiseFunction<T>>(
  fn: F,
  ...args: PromiseFunctionArgs<F>
): Promise<Result<T>> {
  try {
    return Result.ok(await fn(...args));
  } catch (error) {
    return Result.error(error);
  }
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type RetryOptions = {
  maxAttempts?: number;
  delay?: number | number[];
};

export async function retry<T>(fn: PromiseFunction<T>, options: RetryOptions = {}): Promise<Result<T>> {
  options.delay ??= 1000;
  options.maxAttempts ??= 3;
  let tryNumber = options.maxAttempts;
  let delay: number = typeof options.delay === 'number' ? options.delay : 0;
  let success = false;
  let result: Result<T>;
  while (tryNumber > 0 && !success) {
    if (Array.isArray(options.delay)) {
      let offset = options.maxAttempts - tryNumber;
      let index = offset >= options.delay.length ? options.delay.length - 1 : offset;
      delay = options.delay[index];
    }
    result = await safeAsync<T>(fn);
    if (result.isOk()) return result!;
    await sleep(delay);
    tryNumber--;
  }
  return result!;
}
