type Some<T extends unknown> = { readonly empty: false; value: T };
type None = { readonly empty: true };

export class Option<T extends unknown> {
  private readonly _state: Some<T> | None;
  private constructor(state: Some<T> | None) {
    this._state = state;
  }

  public static some<T>(value: T): Option<T> {
    return new Option({ empty: false, value: value });
  }

  public static none<T>(): Option<T> {
    return new Option({ empty: true });
  }

  public unwrap(): T {
    if (this._state.empty) {
      throw new Error('called `Option.unwrap()` on a `None` value');
    }
    return this._state.value;
  }
}
