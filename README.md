# Website

Small GitHub Pages/Jekyll site for project writeups.

## Structure

- `_posts/` contains Markdown posts.
- `assets/` contains images and videos used by posts.
- `index.html` lists posts automatically.
- `style.css` controls the visual style.

## Local preview

```sh
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

## Video

The Fluency Computer demo is only about 3 MB, so it is committed directly at:

```text
assets/fluency_computer_demo.mp4
```

For larger future videos, prefer YouTube, Vimeo, or object storage and embed/link them instead of committing large binaries.
