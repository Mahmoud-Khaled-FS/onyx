type types = 'number' | 'string' | 'object' | 'bigint' | 'boolean' | 'function' | 'symbol' | 'undefined';

let _assert_mode: 'throw' | 'ignore' | 'log' = 'throw';

export function assertMode(mode: typeof _assert_mode) {
  _assert_mode = mode;
}

export function assert(expression: boolean, message: string = ''): asserts expression {
  if (expression) return;
  const m = 'Assertion failed: ' + message;
  switch (_assert_mode) {
    case 'throw':
      throw new Error(m);
    case 'log':
      console.error(m);
      break;
    case 'ignore':
      return;
  }
}

export function assertEq(a: unknown, b: unknown, message: string | null = null) {
  assert(a === b, message || `${a} !== ${b}`);
}

export function assertNotNull(value: unknown, message: string | null = null) {
  assert(value !== null && value !== undefined, message || 'value is null or undefined');
}

export function assertTypeof(value: unknown, type: types, message: string | null = null): asserts value {
  assert(typeof value === type, message || `value ${value} is not a ${type}`);
}

export function assertNumber(value: unknown, message: string | null = null): asserts value is number {
  assertTypeof(value, 'number', message);
}

export function assertString(value: unknown, message: string | null = null): asserts value is string {
  assertTypeof(value, 'string', message);
}

export function assertFunction(value: unknown, message: string | null = null): asserts value is () => {} {
  assertTypeof(value, 'function', message);
}

export function assertBoolean(value: unknown, message: string | null = null): asserts value is boolean {
  assertTypeof(value, 'boolean', message);
}

export function assertObject(value: unknown, message: string | null = null): asserts value is object {
  assertTypeof(value, 'object', message);
}

export function assertUndefined(value: unknown, message: string | null = null): asserts value is undefined {
  assertTypeof(value, 'undefined', message);
}

export function assertInt(value: unknown, message: string | null = null): asserts value is number {
  assert(Number.isInteger(value), message || `value ${value} is not an integer`);
}

export function assertInstanceOf<T>(
  value: unknown,
  constructor: new () => T,
  message: string | null = null,
): asserts value is T {
  assert(value instanceof constructor, message || `value is not from constructor ${constructor.name}`);
}

export function assertIn<T>(value: unknown, arr: T[], message: string | null = null): asserts value is T {
  assert(arr.includes(value as unknown as T), message || `value ${value} is not in array`);
}

export function assertLen(value: any, len: number, message: string | null = null): asserts value {
  assert(value != null && typeof value.length === 'number', message || `value ${value} has no length property`);
  assert(value.length === len, message || `expected length ${len}, got ${value.length}`);
}

export function assertInRange(
  value: unknown,
  min: number,
  max: number,
  message: string | null = null,
): asserts value is number {
  assertNumber(value);
  assert(value >= min && value <= max, `value ${value} is not in range ${min}:${max}`);
}

export const Assert = {
  assert: assert,
  eq: assertEq,
  boolean: assertBoolean,
  function: assertFunction,
  in: assertIn,
  inRange: assertInRange,
  instanceOf: assertInstanceOf,
  int: assertInt,
  len: assertLen,
  mode: assertMode,
  notNull: assertNotNull,
  number: assertNumber,
  object: assertObject,
  string: assertString,
  typeof: assertTypeof,
  undefined: assertUndefined,
};
