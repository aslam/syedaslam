---
title: 'Highlighting Current Link in Rails Navigation'
description: 'A look back at techniques for highlighting the active link in Rails navigation, with modern alternatives using current_page? and Stimulus.'
pubDate: '2011-03-28T12:13:49+05:30'
updatedDate: '2025-08-17T00:00:00+05:30'
tags: ['rails', 'helpers', 'navigation']
heroImage: '../../assets/current-link.png'
author: 'Syed Aslam'
canonical: 'https://syedaslam.netlify.app/highlighting-current-link-within-a-navigation-list-in-rails/'
---

> **Editor’s Note (2025):**
> This post was originally written in 2011. At the time, handling active links in Rails navigation required custom helpers and JavaScript tricks. Modern Rails provides built-in helpers like `current_page?`, making this much easier. The original content is preserved below for historical context, followed by updated approaches.

---

## Original Approach (2011)

It’s very common to want to highlight the current link within a navigation list for the current action being performed.

If you are using Ajax, then this is easy: handle the `onclick` event to highlight the current link.

```erb
<%= link_to 'Home', 'javascript:void(0);',
  :onclick => "this.addClassName('youarehere');this.siblings().each(function(s){s.removeClassName('youarehere');});",
  :id => 'home' %>

<%= link_to 'News', 'javascript:void(0);',
  :onclick => "this.addClassName('youarehere');this.siblings().each(function(s){s.removeClassName('youarehere');});",
  :id => 'news' %>
```

CSS:

```css
.youarehere {
  font-size: 11pt;
  text-decoration: underline;
}
```

For non-Ajax pages, we used a helper in `application_helper.rb`:

```ruby
def section_link(name, options)
  action     = options[:action] || 'index'
  controller = options[:controller]

  if action == @current_action && controller == @current_controller
    link_to(name, options, :class => 'youarehere')
  else
    link_to(name, options)
  end
end
```

And a filter in `application_controller.rb`:

```ruby
before_filter :instantiate_controller_and_action_names

def instantiate_controller_and_action_names
  @current_action     = action_name
  @current_controller = controller_name
end
```

Usage:

```erb
<%= section_link("Home", controller: "welcome", action: "index") %>
<%= section_link("News", controller: "news") %>
```

---

## Modern Alternatives (Rails 7+)

Today, you can use Rails’ built-in `current_page?` helper:

```erb
<%= link_to "Home", root_path,
  class: ("active" if current_page?(root_path)) %>

<%= link_to "News", news_path,
  class: ("active" if current_page?(news_path)) %>
```

With TailwindCSS or Bootstrap, simply style the `.active` class.

Or with **Stimulus** (for dynamic navigation):

```javascript
// controllers/active_link_controller.js
export default class extends Controller {
  static targets = ['link'];

  connect() {
    this.linkTargets.forEach((link) => {
      if (link.href === window.location.href) {
        link.classList.add('active');
      }
    });
  }
}
```
