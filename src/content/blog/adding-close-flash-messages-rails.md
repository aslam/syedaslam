---
title: "Adding a Close Button to Flash Messages in Rails"
description: "Learn how to add a simple close button to dismiss Rails flash messages and a modern Rails 7+ Stimulus approach."
pubDate: "2011-02-19"
updatedDate: "2025-08-16"
author: "Syed Aslam"
heroImage: "../../assets/rails-flash-close.png"
tags: ["rails", "flash", "ui", "stimulus", "javascript", "css"]
canonicalURL: "https://syedaslam.com/blog/adding-close-flash-messages-rails/"
---

> **Note (Updated 2025):**
> This post was originally written in 2011 for Rails 2/3 and shows `link_to_function`, which was removed in Rails 4.
> Modern Rails apps typically use **Stimulus**/**Turbo** or UI frameworks like **Bootstrap**/**Tailwind** for dismissible flash messages.
> A Rails 7+ example is included at the end.

Rails’ **flash** provides a way to pass temporary messages between actions. Anything you place in the flash is available for the next request and then cleared automatically. This makes it ideal for displaying notices and alerts — for example, after creating a record:

```ruby
class PostsController < ActionController::Base
  def create
    # save post
    flash[:notice] = "Post successfully created"
    redirect_to @post
  end

  def show
    # no need to explicitly assign the flash; Rails exposes it automatically
  end
end
```

In the view:

```
<% if flash[:notice] %>
  <div class="notice"><%= flash[:notice] %></div>
<% end %>
```

<img
  src="https://res.cloudinary.com/syed-aslam/image/upload/v1755342646/syedaslam/posts/rails-flash/flash-1.png"
  srcset="
    https://res.cloudinary.com/syed-aslam/image/upload/f_auto,q_auto,w_480/v1755342646/syedaslam/posts/rails-flash/flash-1.png 480w,
    https://res.cloudinary.com/syed-aslam/image/upload/f_auto,q_auto,w_800/v1755342646/syedaslam/posts/rails-flash/flash-1.png 800w,
    https://res.cloudinary.com/syed-aslam/image/upload/f_auto,q_auto,w_1280/v1755342646/syedaslam/posts/rails-flash/flash-1.png 1280w
  "
  sizes="(max-width: 768px) 90vw, 800px"
  width="800"
  height="450"
  alt="Example of a Rails flash notice rendered in the view"
  loading="lazy"
  decoding="async"
/>

<hr/>

#### The Problem

By default, flash messages stay visible until the next page load or redirect. Users often expect to dismiss them without refreshing the page.

<hr/>

#### The Original 2011 Solution (historical)

Add an explicit close control that hides the flash element:

```ruby
<% flash.each do |name, msg| %>
  <%= content_tag :div, id: "flash_#{name}" do %>
    <%= msg %>
    <%= link_to_function image_tag('icons/cross.png'),
      onclick: "document.getElementById('flash_#{name}').style.display='none'" %>
  <% end %>
<% end %>
```

#### Styling

```css
#flash_notice,
#flash_error,
#flash_alert {
  padding: 5px 8px;
  margin: 10px 0;
}

#flash_notice {
  background-color: #faf0e6;
  border: 1px solid #5d871b;
  color: #5d871b;
}

#flash_error,
#flash_alert {
  background-color: #faf0e6;
  border: 1px solid #a94442;
  color: #a94442;
}
```

<img
  src="https://res.cloudinary.com/syed-aslam/image/upload/v1755342647/syedaslam/posts/rails-flash/flash-2.png"
  srcset="
    https://res.cloudinary.com/syed-aslam/image/upload/f_auto,q_auto,w_480/v1755342647/syedaslam/posts/rails-flash/flash-2.png 480w,
    https://res.cloudinary.com/syed-aslam/image/upload/f_auto,q_auto,w_800/v1755342647/syedaslam/posts/rails-flash/flash-2.png 800w,
    https://res.cloudinary.com/syed-aslam/image/upload/f_auto,q_auto,w_1280/v1755342647/syedaslam/posts/rails-flash/flash-2.png 1280w
  "
  sizes="(max-width: 768px) 90vw, 800px"
  width="800"
  height="450"
  alt="Example of a Rails flash notice rendered in the view"
  loading="lazy"
  decoding="async"
/>

Be sure to include an icon (e.g., cross.png) in your images/icons folder.

---

### Modern Rails 7+ Approach with Stimulus

Prefer a small Stimulus controller for clean, accessible, and framework-agnostic behavior.

`app/javascript/controllers/flash_controller.js`

```javascript
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  close() {
    this.element.remove();
  }
}
```

`app/views/shared/_flash.html.erb`

```erb
<% flash.each do |type, message| %>
  <div data-controller="flash" class="flash <%= type %>">
    <%= message %>
    <button type="button"
            data-action="click->flash#close"
            aria-label="Close">
      ✕
    </button>
  </div>
<% end %>
```

#### Example CSS (Tailwind-friendly; adjust to your stack)

```css
.flash {
  @apply px-4 py-2 mb-2 rounded relative;
}
.flash.notice {
  @apply bg-green-100 text-green-800 border border-green-400;
}
.flash.alert,
.flash.error {
  @apply bg-red-100 text-red-800 border border-red-400;
}
.flash button {
  @apply absolute top-1 right-2 text-lg font-bold cursor-pointer;
}
```

**Why this is better today**

- No inline JS; unobtrusive and maintainable.
- Accessible close control (`button` + `aria-label`).
- Works with Turbo and any CSS framework.

---

#### Wrap-up

Keep the original snippet as a historical reference, but favor the **Stimulus** approach for modern Rails apps. It’s cleaner, accessible, and future-proof.

---

### You might also like

- [Working with HTTP Headers in Rails](/blog/working-with-http-headers-in-rails)
- [Highlighting Current Link in Rails Navigation](/blog/highlighting-current-link-in-rails-navigation)
