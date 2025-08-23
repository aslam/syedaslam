---
title: 'Working with Files in Ruby'
description: 'Learn the basics of working with files in Ruby: opening, reading, writing, streaming, and querying file objects efficiently.'
pubDate: '2019-12-03T23:43:26+05:30'
updatedDate: '2025-08-20T00:00:00+05:30'
tags: ['ruby', 'file-io']
author: 'Syed Aslam'
heroImage: '../../assets/files-in-ruby.png'
canonical: 'https://syedaslam.com/blog/working-with-files-in-ruby'
---

> **Note (2025):**
> Ruby’s file handling APIs haven’t changed much over the years. This post is still a solid introduction to Ruby file I/O. Only a few details (like `Kernel#open` vs `URI.open`) have shifted. Documentation links have been updated to Ruby 3.x.

---

## Files and the IO class

All input/output in Ruby is built on the **IO class**. `File` inherits from `IO`, adding filesystem-specific methods. For example:

```ruby
File.exist?("foo.txt")
# => true or false
```

### Opening a File

```ruby
File.open("file.txt") do |file|
  # do something
end
```

- With a block: file closes automatically.
- Without a block: you must call close manually.

**Modes** (2nd argument to `open` or `new`):

| Mode   | Meaning                               |
| ------ | ------------------------------------- |
| `"r"`  | Read-only (default)                   |
| `"r+"` | Read/write, starting at beginning     |
| `"w"`  | Write-only, truncates or creates file |
| `"w+"` | Read/write, truncates or creates file |
| `"a"`  | Append, creates file if missing       |
| `"a+"` | Read/write + append                   |
| `"b"`  | Binary mode                           |
| `"t"`  | Text mode                             |

### Reading from a File

```ruby
file = File.new("README.md")
file.read           # whole file
file.gets           # one line
file.readlines      # array of lines
```

Shortcuts:

```ruby
File.read("README.md")      # returns contents as string
File.foreach("README.md") { |line| puts line }
```

⚠️ For large files, prefer **streaming** (using `gets`, `each_line`, `foreach`) instead of `read`.

### Treating Files as Streams

```ruby
File.open("bigfile.txt") do |f|
  f.each_line do |line|
    process(line)
  end
end
```

- `getc` → read one character.
- `getbyte` → read one byte.
- `ungetc` → push a character back.

### Seeking within a File

You can jump around with `pos` or `seek`:

```ruby
file.pos = 10
file.seek(20, IO::SEEK_SET)
file.seek(-5, IO::SEEK_END)
```

### Writing to Files

```ruby
f = File.new("data.out", "w")
f.puts "Hello Ruby"
f.close
```

Append instead:

```ruby
File.open("data.out", "a") { |f| f.puts "Appended line" }
```

### Querying File Objects

Ruby offers **FileTest** and **File::Stat** helpers:

```ruby
File.file?("README.md")       # true
File.directory?("src")        # true
File.size("README.md")        # => bytes
File.executable?("script.sh") # true/false
```

---

### Wrap-up

- Use `File.open` with a block to avoid leaks.
- For large files, prefer **streaming** methods.
- Explore `FileUtils`, `Pathname`, and `StringIO` for advanced tasks.

Docs: [File (Ruby 3.x)](https://ruby-doc.org/core/File.html), [File::Stat](https://ruby-doc.org/core/File/Stat.html), [FileTest](https://ruby-doc.org/core/FileTest.html)
