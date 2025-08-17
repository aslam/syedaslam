---
title: 'Working with HTTP Headers in Rails'
description: 'Learn how to safely extract external HTTP headers in Rails while filtering out internal Rack and Rails environment variables.'
pubDate: '2021-06-12T20:33:07+05:30'
updatedDate: '2025-08-17T00:00:00+05:30'
author: 'Syed Aslam'
heroImage: '../../assets/http-headers-rails.jpeg'
layout: '@/layouts/BlogPost.astro'
tags: ['rails', 'http', 'headers', 'tips']
canonical: 'https://syedaslam.com/blog/http-headers-in-rails/'
---

_Photo by [Kevin Laminto](https://unsplash.com/@kevinlaminto) on Unsplash._

> **Editor’s Note (Updated 2025):**
> This tip is still useful. `request.headers` in Rails continues to include both external HTTP headers and internal Rack/Rails environment keys.
> For production apps, you can also consider middleware (e.g., Rack::Request) or gems like [rack-cors](https://github.com/cyu/rack-cors) if your use case involves CORS or security filtering.

---

Accessing request headers in Rails is as simple as:

```ruby
request.headers["HEADER_NAME"]
```

But `request.headers` actually contains both **external HTTP headers and Rails/Rack environment variables**. That’s inconvenient if you only want to process client-sent headers.

---

### Brute-Force Filtering

One way is to match headers by a prefix:

```ruby
request.env.select { |k, v|
  k.match("^HTTP.*|^CONTENT.*|^REMOTE.*|^REQUEST.*|^AUTHORIZATION.*|^SCRIPT.*|^SERVER.*")
}
```

This works but can feel messy. It relies on convention and regex matching, which might break in unusual edge cases.

### Safer Approach: Reject Keys with Dots

Rails environment variables are namespaced (e.g., `action_dispatch.show_exceptions`, `rack.input`). By convention, HTTP headers do not contain dots — in fact, [Nginx rejects them by default](https://forum.nginx.org/read.php?2,44453,44472#msg-44472).

That means you can safely filter out internal variables by rejecting keys that contain a dot:

```ruby
request.headers.env.reject { |key| key.to_s.include?('.') }
```

This neatly gives you just the external headers.

---

### Modern Alternatives (2025)

- **Middleware filtering**: pre-process/whitelist headers at the Rack layer.
- **Security-conscious filtering**: For CORS and auth headers, rely on middleware like rack-cors.
- **Header conventions**: Today’s best practice is to explicitly whitelist expected headers rather than filtering reactively. For example:

```ruby
ALLOWED_HEADERS = %w[HTTP_AUTHORIZATION HTTP_X_REQUEST_ID HTTP_USER_AGENT]

headers = request.headers.env.slice(*ALLOWED_HEADERS)
```

---

### Wrap-up

- Rails mixes external headers and env keys in `request.headers`.
- Filtering out keys containing `.` is a neat, practical solution.
- For more robust setups, consider **explicit whitelists** or **middleware-based filtering**.
