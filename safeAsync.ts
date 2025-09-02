import { Result } from './result';

type PromiseFunction<T = any> = (...args: any[]) => Promise<T> | T;
type PromiseFunctionArgs<T extends (...args: any[]) => any> = Parameters<T>;

export async function safeAsync<T, F extends PromiseFunction>(
  fn: F,
  ...args: PromiseFunctionArgs<F>
): Promise<Result<T>> {
  try {
    return Result.ok(await fn(...args));
  } catch (error) {
    return Result.error(error);
  }
}
