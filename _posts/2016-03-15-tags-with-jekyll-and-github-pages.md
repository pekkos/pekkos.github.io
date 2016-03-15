---
layout: post
title: Tags with Jekyll and GitHub Pages
category: Link
tags:
  jekyll
---
Coming from the Wordpress world, I'm used to easily work with tags and categories for blog posts. However, tags aren't supported out of the box in Jekyll. There are some nice Ruby plugins that will do the trick. Since my blog is published using GitHub Pages, ad GitHub Pages doesn't allow Ruby plugins, I can't use those.

I found a solution by [Brandon Parsons](https://twitter.com/bkparso), where you create a [tags page](/tags/) which gets populated with all used tags and links to posts. There is no way to dynamically create separate pages for each tag, but this should be good enough for me.

Add tags to YAML front matter, and add a few lines of code to list all tags for the post. Code for the tags page can be found on [Brandons blog post](https://blog.brandonparsons.me/2015-using-tags-in-a-jekyll-blog-on-github-pages).

```rb
---
tags:
  jekyll
---
```

```yaml
{% raw %}
<ul>
  {% for tag in page.tags %}
  <li>
    <a href="/tags/#{{ tag }}">{{ tag }}</a>
  </li>
  {% endfor %}
</ul>
{% endraw %}

```

Visit link: [https://blog.brandonparsons.me/2015-using-tags-in-a-jekyll-blog-on-github-pages](https://blog.brandonparsons.me/2015-using-tags-in-a-jekyll-blog-on-github-pages)
