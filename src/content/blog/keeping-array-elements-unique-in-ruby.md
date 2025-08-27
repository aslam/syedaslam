---
title: 'Keeping Array Elements Unique in Ruby'
description: 'Explore different ways to keep arrays unique in Ruby—using `uniq`, `uniq!`, and the `|` operator.'
pubDate: '2020-07-09'
updatedDate: '2025-08-17'
heroImage: '../../assets/ruby-array-unique.png'
tags: ['ruby', 'array', 'tip']
author: 'Syed Aslam'
canonicalURL: 'https://syedaslam.com/blog/keeping-array-elements-unique-in-ruby/'
---

With the `uniq` method, you can remove duplicate elements from an array:

```ruby
irb> array = []
=> []
irb> array << 1
=> [1]
irb> array << 2
=> [1, 2]
irb> array << 1
=> [1, 2, 1]
irb> array.uniq
=> [1, 2]
```

By default, `uniq` returns a new array with unique elements—it doesn’t modify the original.
If you want to update in place, use `uniq!`:

```ruby
irb> array.uniq!
=> [1, 2]
```

---

### Using the | Operator

Another way is to only append an element if the array does not already contain it by using the `|` operator:

```ruby
irb> array = []
=> []
irb> array << 1
=> [1]
irb> array << 2
=> [1, 2]
irb> array | [1]
=> [1, 2]
irb> array
=> [1, 2]
```

And to update the array in place if it doesn’t contain the element:

```ruby
irb> array |= [3]
=> [1, 2, 3]
irb> array
=> [1, 2, 3]
```

---

### Modern Alternatives

Today, Ruby developers often prefer using **Sets** from the standard library for uniqueness. Sets behave like arrays but enforce uniqueness automatically:

```ruby
require "set"

set = Set.new
set << 1
set << 2
set << 1
# => #<Set: {1, 2}>
```

This approach avoids repeated checks and provides a cleaner, intention-revealing API.

---

### You might also like

- [Working with Files in Ruby](/blog/working-with-files-in-ruby)
- [Magic Comments in Ruby](/blog/magic-comments-in-ruby)
