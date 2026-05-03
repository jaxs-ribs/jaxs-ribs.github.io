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

## Link preview images

Each post should use a dedicated 1200x630 JPEG for link previews. Generate it
from the post's main image:

```sh
scripts/make-og-image assets/source-image.png assets/post-slug-og.jpg
```

Then set these front matter fields:

```yaml
image: "/assets/post-slug-og.jpg"
image_width: 1200
image_height: 630
image_type: "image/jpeg"
```

The layout emits `og:image`, `og:image:secure_url`, dimensions, type, and
Twitter image metadata from those fields.

## Video

The Fluency Computer demo is only about 3 MB, so it is committed directly at:

```text
assets/fluency_computer_demo.mp4
```

For larger future videos, prefer YouTube, Vimeo, or object storage and embed/link them instead of committing large binaries.
