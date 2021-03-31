function judgeValueToString (value, type) {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}

export function isArray (value) {
  return judgeValueToString(value, 'Array');
}
