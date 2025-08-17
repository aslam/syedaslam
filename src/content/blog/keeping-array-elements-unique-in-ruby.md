---
title: 'Keeping Array Elements Unique in Ruby'
description: 'Explore different ways to keep arrays unique in Ruby—using `uniq`, `uniq!`, and the `|` operator.'
pubDate: '2020-07-09T00:25:59+05:30'
updatedDate: '2025-08-17T00:00:00+05:30'
heroImage: '../../assets/ruby-array-unique.png'
tags: ['ruby', 'array', 'tip']
author: 'Syed Aslam'
layout: '@/layouts/BlogPost.astro'
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
