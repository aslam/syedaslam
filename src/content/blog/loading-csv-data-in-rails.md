---
title: "Loading CSV Data in Rails: Then vs Now"
description: "A look back at how Rails 2.x apps loaded CSV data into models, and how modern Rails apps can do it more efficiently today."
pubDate: "2011-02-21"
updatedDate: "2025-08-17"
tags: ["rails", "ruby", "csv", "data-import", "hash"]
heroImage: "../../assets/csv-import-rails.png"
author: "Syed Aslam"
---

> **Editor’s Note (2025)**
> This post was originally written in the Rails 2.3.8 era. While the overall idea of loading CSV data into Rails models remains relevant, the code shown is outdated. FasterCSV has been merged into Ruby’s built-in `CSV` class, and Rails now provides bulk insert methods (`insert_all`, `upsert_all`) that make the process far more efficient.
> What follows is both the **legacy approach** and the **modern Rails way**.

---

## The Legacy Approach (Rails 2.x)

Back in the Rails 2.3.8 days, when we needed to load data from multiple files into our models. Each file represented a dataset, and every row needed to be mapped to attributes in the model.

Example workflow:

1. Map file names to models.
2. Iterate over rows in each CSV.
3. Save records row by row.

```ruby
files = {
  "users.csv" => User,
  "products.csv" => Product
}

files.each do |file, model|
  FasterCSV.foreach(file, :headers => true) do |row|
    model.create!(row.to_hash)
  end
end
```

This worked, but it was:

- Dependent on FasterCSV (now obsolete).
- Saving records one by one (slow for large datasets).
- Using custom helpers that are unnecessary today.

---

## The Modern Rails Way (Rails 7/8)

In modern Rails (7+), you can rely on built-in CSV and bulk insert methods:

```ruby
require "csv"

files = {
  "users.csv" => User,
  "products.csv" => Product
}

files.each do |file, model|
  rows = CSV.read(file, headers: true).map(&:to_h)
  model.insert_all(rows)
end
```

Why this is better:

- No extra gems needed — `CSV` is part of Ruby stdlib.
- Use `row.to_h` directly (no need for custom array-to-hash helpers).
- Efficient bulk inserts with `insert_all` (or `upsert_all` if handling duplicates).
- Cleaner and more performant.

### Quick Comparison

| Feature               | Rails 2.x (Legacy)      | Rails 7/8 (Modern)            |
| --------------------- | ----------------------- | ----------------------------- |
| CSV Parsing           | FasterCSV gem           | Ruby’s built-in `CSV` class   |
| Row → Hash Conversion | Custom helper           | `row.to_h` built-in           |
| Saving Data           | `model.create!` per row | `insert_all` / `upsert_all`   |
| Performance           | Slow (N queries)        | Fast (bulk insert in 1 query) |

---

## Takeaway

- If you’re on a legacy Rails app, the old approach might look familiar.
- On modern Rails, always use `CSV` + bulk inserts.
- Even better, for very large datasets, consider background jobs (Sidekiq/Resque) to process imports asynchronously.

---

### You might also like

- [Connecting to Multiple Databases in a Rails App](/blog/connecting-to-multiple-databases-in-a-rails-app)
- [Working with Files in Ruby](/blog/working-with-files-in-ruby)
