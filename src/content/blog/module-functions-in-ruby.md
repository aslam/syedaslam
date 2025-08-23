---
title: 'Module Functions in Ruby: module_function vs extend self'
description: 'In Ruby, modules can provide both namespacing and mixin functionality. Learn how to define module-level functions using module_function and extend self, and the differences between them.'
pubDate: '2021-11-28T13:06:56+05:30'
updatedDate: '2025-08-20T00:00:00+05:30'
tags: ['ruby', 'modules']
author: 'Syed Aslam'
heroImage: '../../assets/ruby-modules.png'
canonical: 'https://syedaslam.com/blog/module-functions-in-ruby'
---

In Ruby, **Modules** are a way of grouping together methods, classes, and constants with two major benefits:

- Provide **namespacing** and prevent name collisions.
- Implement the **mixin** facility, letting you add functionality to classes in a controlled way.

A module can also serve as a collection of utility methods (functions) that can be called either:

- With the module as the receiver (`MyModule.some_method`)
- Or mixed into a class (`include MyModule`) so they’re available as instance methods.

```ruby
# class-level call
MyModule.some_method

# instance-level call
include MyModule
some_method
```

There are multiple techniques to achieve this in Ruby, but the most common are `Module#module_function` and `extend self`.

---

## Using `module_function`

`module_function` turns a method into both:

- A private instance method (when included in a class).
- A public module method (callable on the module itself).

```ruby
module MyModule
  def some_method
    puts "MyModule#some_method"
  end

  module_function :some_method
end
```

Equivalent to:

```ruby
module MyModule
  def self.some_method
    "MyModule#some_method"
  end

  private

  def some_method
    "MyModule#some_method"
  end
end
```

You can also make all subsequent methods module functions:

```ruby
module MyModule
  module_function

  def some_method
    "MyModule#some_method"
  end
end
```

### Method visibility

```ruby
MyModule.public_method_defined?(:some_method)   # => false
MyModule.private_method_defined?(:some_method)  # => true

MyModule.method(:some_method).owner.singleton_class? # => true
```

`module_function` makes **copies** of methods — meaning the module’s copy and the instance’s copy can diverge if redefined later.

---

## Using `extend self`

Another approach is `extend self`. This makes all instance methods also available as module methods.

```ruby
module MyModule
  extend self

  def some_method
    "MyModule#some_method"
  end
end
```

### Method visibility

```ruby
MyModule.public_method_defined?(:some_method)   # => true
MyModule.method(:some_method).owner.singleton_class? # => false
```

Here, no method copies are made — the same method is available both on the module and when included in a class.

---

## Key Differences

| Feature                         | `module_function`                                      | `extend self`                                         |
| ------------------------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| Method visibility when included | Private                                                | Public                                                |
| Creates method copies?          | Yes                                                    | No                                                    |
| API stability                   | Avoids leaking methods into including classes          | Extends class’s API directly                          |
| When to use                     | Utility functions you don’t want in class’s public API | Utility functions meant to be public in both contexts |

---

### Wrap-up

- Use module_function if you want to define module-level utility functions that shouldn’t become part of a class’s public API.
- Use extend self if you want the same methods to be available both at the module level and when mixed into classes.
- Both patterns are widely used; which one you choose depends on API design intent.

---

### You might also like

- [Magic Comments in Ruby](/blog/magic-comments-in-ruby)
- [Keeping Array Elements Unique in Ruby](/blog/keeping-array-elements-unique-in-ruby)
