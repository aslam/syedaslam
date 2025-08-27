---
title: "WeakMaps in JavaScript"
description: "WeakMaps allow objects to be used as keys, offering memory efficiency and encapsulation—ideal for private data storage and avoiding memory leaks."
pubDate: "2022-04-24"
updatedDate: "2025-08-20"
tags: ["javascript", "weakmap"]
author: "Syed Aslam"
heroImage: "../../assets/weakmaps-javascript.png"
canonicalURL: "https://syedaslam.com/blog/weakmaps-in-javascript"
---

> **Note (2025):**
> WeakMaps remain relevant in modern JavaScript (ES2025). They are especially useful for **private data encapsulation**, **memory-sensitive caches**, and avoiding **memory leaks**.
> That said, for private fields in classes, modern JavaScript now provides **`#privateFields`** syntax, which is often preferred. WeakMaps shine when you need to attach hidden state to objects you don’t own (e.g., DOM nodes, external objects).

---

## Why WeakMaps?

In JavaScript, object property names must be strings (or symbols). If you try to use an object as a key, it’s coerced into a string:

```js
const obj = {};
const key = {};
obj[key] = 'value';

console.log(Object.keys(obj));
// => ["[object Object]"]
```

This doesn’t preserve the object identity.

### WeakMaps to the rescue

With ES6, JavaScript introduced WeakMaps, which allow objects (but not primitives) as keys.

| Object                         | WeakMap                   |
| ------------------------------ | ------------------------- |
| `object = Object.create(null)` | `weakmap = new WeakMap()` |
| `object[key]`                  | `weakmap.get(key)`        |
| `object[key] = value`          | `weakmap.set(key, value)` |
| `delete object[key]`           | `weakmap.delete(key)`     |

#### Example: storing private data

```js
const secrets = new WeakMap();

function setSecret(obj, secret) {
  secrets.set(obj, secret);
}

function getSecret(obj) {
  return secrets.get(obj);
}

const user = {};
setSecret(user, 'hidden-token');

console.log(getSecret(user)); // "hidden-token"
```

You must hold both the **object** and the **WeakMap reference** to recover the secret.

### Garbage collection benefits

A key object’s presence in a WeakMap does not prevent garbage collection. Once an object key is no longer referenced anywhere else, both it and its associated value in the `WeakMap` are automatically cleared.

✅ Prevents memory leaks in long-lived apps.

✅ Useful for caches tied to object lifetimes.

❌ Not enumerable — you can’t list keys or values.

This makes WeakMaps perfect for “hidden side-channel state” without risk of accidental memory retention.

---

### WeakMap vs Map

- **Map**: Keys can be any value (including primitives). Keys and values are enumerable.
- **WeakMap**: Keys must be objects. Keys/values are not enumerable, and entries are removed when the object is garbage collected.

Use **Map** if you need iteration. Use **WeakMap** for privacy and memory safety.

### WeakMap vs Map vs Private Fields (2025)

| Feature            | WeakMap                            | Map                            | #Private Fields           |
| ------------------ | ---------------------------------- | ------------------------------ | ------------------------- |
| Key type           | Objects only                       | Any (objects + primitives)     | Class instance            |
| Garbage collection | Auto-cleared when object is gone   | No (must delete manually)      | N/A (part of instance)    |
| Enumerability      | ❌ No (not iterable)               | ✅ Yes (keys, values, entries) | N/A (not exposed)         |
| Encapsulation      | Hidden if WeakMap ref is private   | Visible if Map is exposed      | Built-in privacy enforced |
| Typical use case   | Hidden state, caches, DOM metadata | General key-value storage      | Class-private properties  |

### Key Uses (2025)

- Private data in objects you don’t control (DOM nodes, library objects).
- Memory-sensitive caches.
- Encapsulation in libraries without exposing hidden state.
- When you need object identity as a key, but not iteration.

---

### Wrap-up

WeakMaps give you:

- Object keys without coercion.
- Automatic garbage collection of unused keys.
- A way to associate truly private data with objects.

In 2025, prefer `#privateFields` for class internals, `Map` for iterable collections, and **WeakMap** for **garbage-collection–sensitive associations**.
