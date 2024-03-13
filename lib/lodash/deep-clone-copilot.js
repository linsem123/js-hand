/**
 * creates a deep clone of function.
 * need to handle circular references
 * need to handle non-plain objects
 * need to handle non-plain arrays
 * need to handle non-plain functions
 * need to handle non-plain dates
 * need to handle non-plain regex
 * need to handle non-plain maps
 * need to handle non-plain sets
 * need to handle non-plain buffers
 * need to handle non-plain errors
 * need to handle non-plain symbols
 * need to handle non-plain promises
 * @function  deepCloneCopilot this is a copilot generated function to deep clone an object
 * @param {Object} obj the object to clone
 * @returns {Object} the cloned object
 * @example
 * const obj = {a: 1, b: 2, c: 3};
 * const clone = deepCloneCopilot(obj);
 * console.log(clone); // {a: 1, b: 2, c: 3}
 * console.log(clone === obj); // false
 * console.log(clone.a === obj.a); // true
 * 
 */

function deepCloneCopilot(obj) {
  // If the object is null or not an object, return the object itself
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // If the object is a Date, return a new Date object with the same date
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // If the object is a RegExp, return a new RegExp object with the same pattern and flags
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // If the object is a Map, return a new Map object with the same entries
  if (obj instanceof Map) {
    return new Map(obj);
  }

  // If the object is a Set, return a new Set object with the same values
  if (obj instanceof Set) {
    return new Set(obj);
  }

  // If the object is a Buffer, return a new Buffer object with the same data
  if (obj instanceof Buffer) {
    return Buffer.from(obj);
  }

  // If the object is an Error, return a new Error object with the same message
  if (obj instanceof Error) {
    return new Error(obj.message);
  }

  // If the object is a Symbol, return a new Symbol object with the same description
  if (typeof obj === 'symbol') {
    return Symbol(obj.description);
  }

  // If the object is a Promise, it cannot be cloned, so return the object itself
  if (obj instanceof Promise) {
    return obj;
  }

  // If the object is an Array, return a new Array object with the same elements, each of which is deep cloned
  if (Array.isArray(obj)) {
    return obj.map(deepCloneCopilot);
  }

  // If the object is a plain object, return a new object with the same properties, each of which is deep cloned
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, deepCloneCopilot(v)]));
}