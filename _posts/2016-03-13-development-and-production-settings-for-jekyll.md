---
layout: post
title: Development and production settings for Jekyll
category: Link
---

As I installed Google Analytics, I wanted to keep it from tracking pages on my local development web server. I found [this neat solution](http://david.elbe.me/jekyll/2015/06/08/jekyll-different-settings-production-github-and-development.html) by David Elbe, which lets med keep development stuff from production stuff. On GitHub,  <code>jekyll.environment</code> is always set to <code>production</code>.

```rb {% raw %}
{% if jekyll.environment == 'production' %}
  /* Production stuff */
{% else %}
  /* Development stuff */
{% endif %} {% endraw %}
```

Visit link: [http://david.elbe.me/jekyll/2015/06/08/jekyll-different-settings-production-github-and-development.html ](http://david.elbe.me/jekyll/2015/06/08/jekyll-different-settings-production-github-and-development.html)
