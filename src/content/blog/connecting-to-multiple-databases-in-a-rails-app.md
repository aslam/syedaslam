---
title: "Connecting to Multiple Databases in a Rails App"
description: "Learn how to connect a Rails app to multiple databases using establish_connection, with context on modern Rails features for handling multi-DB setups."
pubDate: "2011-01-18"
updatedDate: "2025-08-17"
author: "Syed Aslam"
heroImage: "https://res.cloudinary.com/syed-aslam/image/upload/w_1000/q_auto/f_auto/v1556446821/black-and-white-blurred-background-cables-1426702_msrzjl.jpg"
tags: ["rails", "activerecord", "database"]
canonicalURL: "https://syedaslam.com/blog/connecting-to-multiple-databases/"
---

Traditionally, a Rails application connects to a **single database**. Models inherit from `ActiveRecord::Base`, which uses connection details from `config/database.yml` through the [`establish_connection`](http://api.rubyonrails.org/classes/ActiveRecord/Base.html#method-c-establish_connection) method.

In one of my projects, I had an old **pinlocations** table with geolocation data (pincode, lat/lng, etc.). Rather than duplicating the work to populate this data in a new schema, I wanted my new Rails app to connect directly to the old database, read from that table, and populate new tables.

---

## A Simple Solution Without Gems

While there are plugins like [connection_ninja](http://github.com/cherring/connection_ninja/), [secondbase](https://github.com/karledurante/secondbase), or [octopus](https://github.com/tchandy/octopus), in my case a gem was overkill. All I needed was access to one legacy table.

I created a temporary model pointing to the old database:

```ruby
class Pinlocation < ActiveRecord::Base
  establish_connection(
    adapter:  "postgresql",
    host:     "localhost",
    username: "*****",
    password: "*****",
    database: "old_database"
  )
end
```

From Rails console, you can confirm the connection:

```ruby
$ rails console
>> location = Pinlocation.first
```

This fetches a record from the `old_database`.

### Migrating Data

Once the connection worked, I wrote a script to read data from the old DB and insert it into the new one:

```ruby
out_file = "db/data/scripts/output.txt"
open(out_file, 'w') do |f|
  f.puts "Total no. of records to be imported: #{Pinlocation.count}"

  Pinlocation.all.each do |location_old|
    begin
      location_new = PinLocation.new(
        pincode: location_old.pincode,
        name:    location_old.name,
        lat:     location_old.lat,
        lng:     location_old.lng
      )
      # Map district, state, etc.
      location_new.save
    rescue ActiveRecord::RecordInvalid => invalid
      puts invalid.record.errors
      f.puts invalid.record.errors
    end
  end
end
```

---

### Modern Alternatives (2025)

Today, Rails provides first-class multi-database support (introduced in Rails 6).
You can define multiple connections directly in config/database.yml and map models to databases without hacks:

```yaml
production:
  primary:
    adapter: postgresql
    database: main_db
  analytics:
    adapter: postgresql
    database: analytics_db
```

Then, in your models:

```ruby
class AnalyticsRecord < ApplicationRecord
  connects_to database: { writing: :analytics }
end
```

This is cleaner, fully supported, and works with Rails features like migrations, replication, and role-based connections.

For one-off migrations, Rails’ built-in tools or ETL libraries (like [ActiveRecord Import](https://github.com/zdennis/activerecord-import)) are preferable over writing custom scripts.

---

### Wrap-up

- Back in 2011, `establish_connection` was the simplest way to connect to multiple databases.
- Today, prefer Rails’ **built-in multi-database support** for maintainability and clarity.
- If you only need to pull in one table temporarily, the legacy approach still works - but Rails 6+ makes this a solved problem.

---

### You might also like

- [Loading CSV Data in Rails](/blog/loading-csv-data-in-rails-then-vs-now)
- [Retrieve a Random Row with Active Record](/blog/retrieving-a-random-row-in-activerecord)
