---
title: "Formatting ActiveSupport::Duration Objects in Rails"
description: "Learn how to format ActiveSupport::Duration objects into concise, human-readable strings with locale support using the duration_in_words gem."
pubDate: "2023-02-04"
updatedDate: "2025-08-17"
author: "Syed Aslam"
heroImage: "../../assets/duration.png"
tags: ["rails", "activesupport", "helpers"]
canonicalURL: "https://syedaslam.com/blog/formatting-activesupport-duration-objects/"
---

Rails’ [`ActiveSupport::Duration`](https://api.rubyonrails.org/classes/ActiveSupport/Duration.html) objects don’t include a straightforward way to output clean, human-readable strings. By default, you’re left with [`#inspect`](https://github.com/rails/rails/blob/main/activesupport/lib/active_support/duration.rb#L444), which is limited and lost locale support after Rails 5.1.

---

## A Manual Helper

You could roll your own helper in a view:

```ruby
def duration_as_sentence(duration)
  parts = duration.parts
  units = [:days, :hours, :minutes]
  map   = {
    days:    { one: :d },
    hours:   { one: :h, other: :hrs },
    minutes: { one: :m, other: :mins }
  }

  parts.
    sort_by { |unit, _| units.index(unit) }.
    map { |unit, val| "#{val} #{val == 1 ? map[unit][:one] : map[unit][:other]}" }.
    to_sentence
end
```

This works, but it’s limited, not very configurable, and ignores localization.

---

### Introducing duration_in_words

To address this, I built a small gem called duration_in_words.
It provides a view helper that formats ActiveSupport::Duration objects into concise, localized strings like:

```bash
include ActionView::Helpers::DurationHelper

>> duration = 2.hours
>> duration_in_words(duration)
=> "2h"

>> duration = 1.day + 2.hours + 30.minutes
>> duration_in_words(duration)
=> "1d 2h and 30m"
```

### Formatting Options

**`:format` option**

Two formats are supported: :compact (default) and :full.

```yaml
de:
  duration:
    in_words:
      format:
        compact:
          hours:
            one: '%{count}Std.'
            other: '%{count}Std.'
          minutes:
            one: '%{count}Min'
            other: '%{count}Min'
          seconds:
            one: '%{count}s'
            other: '%{count}s'
          support:
            words_connector: ' '
            two_words_connector: ' und '
            last_word_connector: ' und '
```

Usage:

```ruby
duration = 1.day + 2.hours + 30.minutes

duration_in_words(duration, locale: :de)
# => "1T 2Std. und 30s"

duration_in_words(duration, format: :full, locale: :de)
# => "1 Tag, 2 Std., und 30 Sekunden"
```

### Wrap-up

When you need to report durations in a user-friendly way, `duration_in_words` provides a clean, configurable, and locale-aware solution. It’s a big improvement over the default `#inspect` output and saves you from reinventing formatting helpers.

---

### You might also like

- [Adding a Close Button to Flash Messages in Rails](/blog/adding-a-close-button-to-flash-messages-in-rails)
- [Working with HTTP Headers in Rails](/blog/working-with-http-headers-in-rails)
