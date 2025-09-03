export function deepEquality(a: any, b: any, visited: WeakSet<object> = new WeakSet()) {
  if (a === b) return true;

  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  if (visited.has(a) || visited.has(b)) {
    return false;
  }

  visited.add(a);
  visited.add(b);

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEquality(item, b[index]));
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }
  return keysA.every((key) => keysB.includes(key) && deepEquality(a[key], b[key], visited));
}
