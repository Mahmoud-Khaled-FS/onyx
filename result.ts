export type Ok<T> = { readonly ok: true; value: T };
export type Err<E extends Error> = { readonly ok: false; error: E };

export function ok<T>(data: T): Result<T> {
  return Result.ok(data);
}

export function err<T = unknown, E extends Error = Error>(error: E): Result<T, E> {
  return Result.error(error);
}

export class Result<T = unknown, E extends Error = Error> {
  private readonly _state: Ok<T> | Err<E>;
  private _on_error?: (err: E) => void;

  private constructor(data: Ok<T> | Err<E>) {
    this._state = data;
  }

  public static error<T = unknown, E extends Error = Error>(e: E): Result<T, E> {
    return new Result({ ok: false, error: e });
  }

  public static ok<T, E extends Error>(data?: T): Result<T, E> {
    return new Result({ ok: true, value: data as T });
  }

  unwrap(): T {
    if (!this._state.ok) {
      this.getError();
      throw this._state.error;
    }
    return this._state.value;
  }

  unwrapOr(defaultValue: T): T {
    if (!this._state.ok) {
      this.getError();
      return defaultValue;
    }
    return this._state.value;
  }

  unwrapOrElse(cb: (e: E) => T): T {
    if (!this._state.ok) {
      this.getError();
      return cb(this._state.error);
    }
    return this._state.value;
  }

  unwrapOrNull(): T | null {
    if (!this._state.ok) {
      this.getError();
      return null;
    }
    return this._state.value;
  }

  orElseDo(handler: (e: E) => void): this {
    this._on_error = handler;
    return this;
  }

  hasError(): boolean {
    return !this._state.ok;
  }

  isOk(): boolean {
    return this._state.ok;
  }

  errAsValue(): E | null {
    return this._state.ok ? null : this._state.error;
  }

  map<U>(cb: (value: T) => U): Result<U, E> {
    if (!this._state.ok) {
      return Result.error<U, E>(this._state.error);
    }
    return Result.ok<U, E>(cb(this._state.value));
  }

  match<R1, R2>(handlers: { ok: (value: T) => R1; err: (error: E) => R2 }): R1 | R2 {
    return this._state.ok ? handlers.ok(this._state.value) : handlers.err(this._state.error);
  }

  private getError(): E | null {
    if (this._state.ok) {
      return null;
    }
    this._on_error?.(this._state.error);
    return this._state.error;
  }
}
