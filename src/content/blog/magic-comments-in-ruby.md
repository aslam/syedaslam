---
title: 'Magic Comments in Ruby'
description: "Ruby supports file-level 'magic comments' that instruct the interpreter—most famously for source encoding, but also for freezing strings, shareable constants, and indentation warnings."
pubDate: '2021-11-15T20:54:09+05:30'
updatedDate: '2025-08-20T00:00:00+05:30'
heroImage: '../../assets/ruby-magic-comments.png'
author: 'Syed Aslam'
tags: ['ruby']
---

> Note (2025):
> Magic comments in Ruby remain relevant, but their usage has evolved:
> `# encoding: utf-8` → Legacy. UTF-8 is default in modern Ruby, rarely needed.
> `# frozen_string_literal: true` → Still widely used for performance and immutability. May become default in the future.
> `# shareable_constant_value: literal` → Modern and important for concurrency (Ractors).
> `# warn_indent: true` → Useful in legacy style enforcement but mostly replaced by RuboCop/linters.
> This post is still useful for developers maintaining older codebases or working with concurrency in newer Ruby versions.

We all know and use comments in code. In Ruby, comments start with the `#` character—the interpreter ignores everything after `#` on that line.

```ruby
# This is a comment
```

However, **magic comments** are special directives—placed at the top of a source file—that change how Ruby interprets that file. They must be on the **first line**, or the **second line** if the first is a shebang (`#!`). Magic comments affect **only the current file**.

### Common magic comments

`coding / encoding`

Ruby’s default source encoding is `UTF-8`. You can set a different encoding with either `coding:` or `encoding:` at the top of the file:

```ruby
# encoding: UTF-8
# or
# coding: UTF-8
```

> Must appear in the first comment section of the file.

---

`frozen_string_literal`

Introduced in Ruby 2.3, this makes **all string literals** in the file **implicitly frozen**—as if `#freeze` had been called—raising `RuntimeError` if you try to mutate them.

```ruby
# frozen_string_literal: true

def test
  s = "hello world"
  s.object_id
end

p test  # => e.g., 260
p test  # => same object_id when reused by the VM
```

Notes:

- You can enable frozen literals **globally** via CLI (`--enable=frozen-string-literal`) and still override per-file with this comment.
- To force a **mutable** copy from a literal in a frozen-string file, use **unary** `+` or call `.dup`:

```ruby
name = +"hello"   # mutable copy
```

- To explicitly **freeze** a literal, you can also use **unary** `-`:

```ruby
key = -"api:v1"
```

---

`shareable_constant_value`

Experimental in Ruby 3.0+, this directive helps create constants that hold only immutable (Ractor-shareable) objects. It can take one of:

- `none` (default): no special treatment
- `literal`: constants assigned to **literals** are deeply frozen
- `experimental_everywhere`: **all** constant assignments become shareable (aggressive)
- `experimental_copy`: values are frozen and **copied** to avoid freezing original dynamic objects

It can be used multiple times in a file; it affects only **subsequent** constants and only in the **current scope**.

> See [Ruby docs](https://ruby-doc.org/core-3.0.2/doc/syntax/comments_rdoc.html#label-shareable_constant_value+Directive) for details on behavior and caveats.

---

`warn_indent`

Shows a warning when indentation is mismatched. The last `warn_indent:` in the file wins.

```ruby
# warn_indent: true

def comments
  end
# => warning: mismatched indentations at 'end' with 'def' at 3
```

Running Ruby with `-w` (warnings) can also surface indentation issues; setting the directive to `false` suppresses these warnings.

---

### Wrap-up

- Place magic comments at the very top (after an optional shebang).
- Use `encoding` for non-UTF-8 files (rare today), `frozen_string_literal` for performance & safety, `shareable_constant_value` when working with Ractors/immutability, and `warn_indent` to catch formatting issues quickly.

---

### You might also like

- [Module Functions in Ruby](/blog/module-functions-in-ruby-module_function-vs-extend-self)
- [Working with Files in Ruby](/blog/working-with-files-in-ruby)
