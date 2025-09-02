import { Result } from './result';

export function safeJsonParse<T>(data: string): Result<T> {
  try {
    return Result.ok(JSON.parse(data));
  } catch (error) {
    return Result.error(error);
  }
}

export function safeStringify(data: unknown): Result<string> {
  try {
    return Result.ok(JSON.stringify(data));
  } catch (error) {
    return Result.error(error);
  }
}
