---
title: "Re-initializing Table Sequences in PostgreSQL"
description: "Learn how to reset and reinitialize table sequences in PostgreSQL safely, whether preserving existing data or starting fresh."
pubDate: "2011-03-15"
updatedDate: "2025-08-20"
tags: ["postgresql", "sequence", "database"]
author: "Syed Aslam"
heroImage: "../../assets/postgresql-table-sequence.png"
canonicalURL: "https://syedaslam.com/blog/reinitialize-key-sequence-postgresql"
---

> **Note (2025):**
> This post was originally written in 2011. The general approach of backing up data, resetting a sequence, and reinserting is still valid, but PostgreSQL today provides more direct ways to fix sequence mismatches:
>
> - `ALTER SEQUENCE ... RESTART WITH n`
> - `SELECT setval('sequence_name', new_value, is_called)`
> - `pg_get_serial_sequence` to find the sequence for a column automatically.
>   In most modern cases, you don’t need to delete/reinsert data—simply reset the sequence to the correct value.

---

## Why reinitialize a sequence?

In PostgreSQL, a `SERIAL` or `BIGSERIAL` column uses a sequence to generate new values. Sometimes the sequence value gets out of sync—for example, if rows were deleted, imported, or manually updated. Then inserts may fail with duplicate key errors.

---

## Legacy Approach (2011)

One approach is to export data, clear the table, reset the sequence, and then re-import:

```sql
CREATE TABLE table_name (
  id SERIAL PRIMARY KEY,
  name TEXT,
  role TEXT
);

-- Export only data without the serial column
\COPY table_name (name, role) TO 'something.dat'

-- Clear original data
DELETE FROM table_name;

-- Restart sequence from 100
ALTER SEQUENCE table_name_id_seq RESTART 100;

-- Re-import data (sequence now starts at 100+)
\COPY table_name (name, role) FROM 'something.dat'
```

Or, using a temporary table:

```sql
CREATE TEMPORARY TABLE people_temp AS
  SELECT name, role FROM people_131;

ALTER SEQUENCE people_131_id_seq RESTART 1000;

DELETE FROM people_131;

INSERT INTO people_131 (name, role)
  SELECT name, role FROM people_temp;
```

---

## Modern Alternatives (2025)

Today, you usually don’t need to export/import data. Instead, reset the sequence directly:

```sql
-- Restart sequence from a given value
ALTER SEQUENCE people_131_id_seq RESTART WITH 1000;
```

Or, to set the sequence to the current max of a table column:

```sql
SELECT setval(
  pg_get_serial_sequence('people_131', 'id'),
  (SELECT MAX(id) FROM people_131)
);
```

This ensures the next insert picks up the right value without deleting or moving data.

### Key Takeaways

- Legacy method: Copy out, delete, reset, and copy back in.
- Modern method: Use `ALTER SEQUENCE ... RESTART` or `setval` to fix alignment in place.
- Best practice: Always reset sequences after bulk imports or manual ID adjustments.

---

### You might also like

- [Recovering a MySQL Root Password](/blog/recovering-a-mysql-root-password)
- [Retrieve a Random Row with Active Record](/blog/retrieving-a-random-row-in-activerecord)
