# Why non-configurable object can not be changed in JS

In JavaScript, a **non-configurable object property** cannot be changed because the `configurable` attribute of the property descriptor is set to `false`. This is part of the JavaScript language specification, as defined in the ECMAScript standard.

### Official Evidence from ECMAScript Specification
The behavior of non-configurable properties is documented in the official ECMAScript specification. Here's the relevant evidence:

1. **Property Descriptor Attributes**:
   - In the ECMAScript specification, each property of an object has a set of attributes, including `[[Configurable]]`, `[[Enumerable]]`, `[[Writable]]`, and `[[Value]]`.
   - The `[[Configurable]]` attribute determines whether the property can be deleted, changed, or have its attributes modified.

   Reference: [ECMAScript 2023 Language Specification, Section 6.1.7.1 - Property Attributes](https://262.ecma-international.org/13.0/#sec-property-attributes)

2. **Non-Configurable Properties**:
   - When `[[Configurable]]` is `false`, the property cannot be deleted, and its attributes (except `[[Value]]` and `[[Writable]]`, if applicable) cannot be changed.
   - Attempting to modify or delete a non-configurable property will result in a `TypeError` in strict mode or fail silently in non-strict mode.

   Reference: [ECMAScript 2023 Language Specification, Section 10.1.6.3 - ValidateAndApplyPropertyDescriptor](https://262.ecma-international.org/13.0/#sec-validateandapplypropertydescriptor)

3. **Example from the Specification**:
   - The specification explicitly states that if a property is non-configurable, attempts to change its attributes (e.g., making it writable or enumerable) will throw an error.

   Reference: [ECMAScript 2023 Language Specification, Section 10.1.6.2 - DefinePropertyOrThrow](https://262.ecma-international.org/13.0/#sec-definepropertyorthrow)

### Practical Example in JavaScript
Here’s a code example demonstrating non-configurable properties:

```javascript
"use strict";

const obj = {};

// Define a non-configurable property
Object.defineProperty(obj, "key", {
  value: 42,
  writable: false,
  configurable: false,
});

// Attempt to modify the property descriptor
try {
  Object.defineProperty(obj, "key", {
    value: 100, // This will throw a TypeError
  });
} catch (e) {
  console.error(e); // TypeError: Cannot redefine property: key
}

// Attempt to delete the property
try {
  delete obj.key; // This will throw a TypeError
} catch (e) {
  console.error(e); // TypeError: Cannot delete property 'key' of #<Object>
}
```

### Summary
The inability to change non-configurable properties is a fundamental part of JavaScript's object model, as defined in the ECMAScript specification. This ensures that certain properties remain immutable and secure once defined. For further details, you can refer to the official ECMAScript documentation linked above.