---
title: 'Retrieving a Random Row in ActiveRecord'
description: 'Learn different ways to fetch a random row in ActiveRecord, their trade-offs in PostgreSQL and MySQL, and which method to prefer for performance.'
pubDate: '2011-04-05T16:42:17+05:30'
updatedDate: '2025-08-20T00:00:00+05:30'
tags: ['rails', 'activerecord', 'sql', 'tips']
author: 'Syed Aslam'
heroImage: '../../assets/random-row-activerecord.png'
canonical: 'https://syedaslam.com/blog/retrieving-random-row-active-record'
---

> **Note (2025):**
> This post was originally written in 2011. The approaches here are still valid, but in modern Rails (6/7/8), you should consider dataset size and database engine:
>
> - **Offset method** is fine for small datasets.
> - **`ORDER BY RANDOM()` (Postgres) or `ORDER BY RAND()` (MySQL)** works but is expensive for large tables.
> - For very large datasets, use database-specific sampling (`TABLESAMPLE` in PostgreSQL) or precomputed random IDs.

---

## Offset-based method

This approach uses the total row count and a random offset:

```ruby
offset = rand(Model.count)
Model.offset(offset).first
```

This is fast and requires no custom SQL. It picks the n-th row by offset, not by ID, so gaps in IDs don’t matter:

```ruby
# IDs: 1, 2, 4, 8
# If random offset is 2, returns 3rd row (ID=4)
```

---

### Using `ORDER BY RANDOM()` (Postgres)

For small to medium datasets:

```ruby
Model.order("RANDOM()").first
```

⚠️ Caution: On large tables, this can be **very slow** since it randomizes the entire result set. Always pair with `.limit(1)`.

---

## Modern Alternatives (2025)

- **Postgres `TABLESAMPLE`**:
  For very large datasets, this avoids full table scans:

  ```sql
  SELECT * FROM models TABLESAMPLE SYSTEM (1) LIMIT 1;
  ```

  This picks ~1% of the table randomly, then you limit further.

- **Precomputed random ID**:
  If you know ID ranges are dense and continuous:
  ```ruby
  id = rand(Model.maximum(:id)) + 1
  record = Model.find_by(id: id)
  ```
  But this can return `nil` if IDs are sparse.

### Quick Comparison

| Method                                      | Pros                          | Cons                             | Best for              |
| ------------------------------------------- | ----------------------------- | -------------------------------- | --------------------- |
| Offset with `rand`                          | Simple, avoids SQL hacks      | Requires 2 queries (count + row) | Small datasets        |
| `ORDER BY RANDOM()` (PG) / `RAND()` (MySQL) | One-liner, clean ActiveRecord | Slow on large tables             | Small–medium datasets |
| `TABLESAMPLE` (Postgres)                    | Very efficient                | Approximate randomness           | Large datasets        |
| Random ID                                   | Fast if IDs are dense         | Fails with sparse/deleted IDs    | Dense PK sequences    |

---

### Wrap-up

- For most Rails apps, **offset +** `.first` or `ORDER BY RANDOM()` is good enough.
- For large datasets, prefer `TABLESAMPLE` in Postgres or rethink your randomness strategy.
- Avoid `RAND()` in MySQL on large datasets without `LIMIT`, as it’s extremely costly.

---

### You might also like

- [Re-initializing Table Sequences in PostgreSQL](/blog/re-initializing-table-sequences-in-postgresql)
- [Connecting to Multiple Databases in a Rails App](/blog/connecting-to-multiple-databases-in-a-rails-app)
