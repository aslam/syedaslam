---
title: 'Understanding Linked Lists (DSA Series)'
description: 'A practical introduction to singly and doubly linked lists—what they are, when to use them, core operations, time/space trade-offs, and modern relevance.'
pubDate: '2019-12-19T00:00:00+05:30'
updatedDate: '2025-08-20T00:00:00+05:30'
tags: ['dsa', 'data-structures', 'algorithms']
author: 'Syed Aslam'
heroImage: '../../assets/linked-lists.png'
canonical: 'https://syedaslam.com/blog/understanding-linked-lists'
---

> **Note (2025)**
> This post is part of a brief CS Fundamentals / DSA series. Linked lists rarely appear in day-to-day Rails/web > work, but they’re still foundational for interviews and for understanding how higher-level containers work under the hood. If you prefer strictly application-engineering topics, feel free to skip—but if you’re brushing > up for interviews or low-level systems work, this will help.

---

## What is a linked list?

A **linked list** is a linear collection of elements (nodes) where each node holds:

- a **value**, and
- a **reference** (link) to the next node (and optionally the previous node).

Unlike arrays, linked lists don’t require contiguous memory; nodes can live anywhere in memory, connected by references.

#### Flavors

- **Singly linked list (SLL)**: each node points to next.
- **Doubly linked list (DLL)**: each node points to prev and next.
- **Circular** variants link the tail back to the head.

---

### Why (and when) to use one?

**Pros**

- `O(1)` **insertion/deletion at head** (and tail, if you keep a tail pointer).
- No large contiguous memory requirement.
- Stable references to nodes even as the list grows.

**Cons**

- `O(n)` random access; you must traverse from head.
- Extra memory per node for pointers.
- Worse cache locality than arrays.

**Typical uses**

- Implementing **queues/deques/LRU** caches (often DLL + hash map).
- **Adjacency lists** in graphs.
- **Streaming** scenarios where you frequently push/pop at ends.

### Core Operations (singly linked list)

Below is minimal, language-agnostic pseudocode; adapt easily to Ruby, Python, or JS.

**Node**

```
class Node:
  value
  next
```

**Insert at head — O(1)**

```
def push_front(head, value):
  node = Node(value)
  node.next = head
  return node  # new head
```

**Insert after a node — O(1)**

```
def insert_after(node, value):
  new_node = Node(value)
  new_node.next = node.next
  node.next = new_node
```

**Delete after a node — O(1)**

```
def delete_after(node):
  if node == null or node.next == null: return
  node.next = node.next.next
```

**Search — O(n)**

```
def find(head, target):
  cur = head
  while cur != null:
    if cur.value == target: return cur
    cur = cur.next
  return null
```

---

### Doubly Linked List essentials

A DLL node stores `prev` and `next`:

```
class Node:
  value
  prev
  next
```

**Benefits**

- `O(1)` delete _from the middle_ when you already hold a node reference (update both neighbors).
- Natural fit for LRU and deque operations.

**Trade-off**

- Slightly more memory and pointer bookkeeping.

### Complexity & Trade-offs

| Operation                      | SLL     | DLL        | Array (dynamic) |
| ------------------------------ | ------- | ---------- | --------------- |
| Access k-th element            | O(n)    | O(n)       | O(1)            |
| Insert at head                 | O(1)    | O(1)       | O(n) (shift)    |
| Insert at tail (with tail ptr) | O(1)    | O(1)       | Amortized O(1)  |
| Delete given a node ref        | O(1)    | O(1)       | O(n) (shift)    |
| Memory overhead per element    | pointer | 2 pointers | none extra      |
| Cache friendliness             | lower   | lower      | higher          |

> **Rule of thumb**: If you need frequent insertions/removals **at the ends** or you maintain **node references**, lists shine. For random access by index, arrays win.

---

### When not to use a linked list

- You need frequent k-th element access by index.
- Your dataset is small and simpler array methods suffice.
- You depend heavily on CPU cache locality for performance.

Modern libraries often give you the right structure already (e.g., `Deque`, `LinkedList`, `OrderedDict` in various languages), implemented efficiently and tested—use them first.

---

### In the real world (2025)

- Application code (Rails, web APIs) seldom needs hand-rolled lists—built-in containers are faster and safer.
- Interviews still ask list problems (reverse a list, detect cycles, merge k lists).
- Systems work (caches, schedulers, memory allocators) still relies on list-like structures behind the scenes.

---

### Practice prompts

- Reverse a singly linked list (iterative & recursive).
- Detect a cycle (Floyd’s tortoise–hare).
- Delete a node in O(1) given only that node (SLL trick: copy next’s value, bypass next).
- Merge two sorted lists.
- Implement an LRU cache (DLL + hash map).

---

### Wrap-up

Linked lists are a **conceptual cornerstone**. Even if you rarely write one from scratch in production, understanding their costs and benefits helps you pick the right container—and ace common interview tasks.
