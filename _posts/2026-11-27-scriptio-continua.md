---
title: "Scriptio Continua and Local Optima In Interfaces"
date: 2026-11-27 15:00:00 +0800
description: "What if we're just like the people that didn't put spaces between their words?"
image: "/assets/scriptio-continua-preview.jpg"
image_width: 1200
image_height: 630
image_type: "image/jpeg"
---

<link rel="stylesheet" href="{{ '/assets/sense-lines/sense-lines.css' | relative_url }}">
<script src="{{ '/assets/sense-lines/sense-lines.js' | relative_url }}" defer></script>

<figure class="post-hero">
  <img src="{{ '/assets/scriptio-continua-header.jpg' | relative_url }}" alt="A Greek inscription cut in stone, its letters running on line after line with no spaces between the words.">
  <figcaption>People didn't put spaces between their words</figcaption>
</figure>

For most of antiquity, Greek and Latin were written without spaces between words, LIKETHISFORPAGESONEND. In the 7th century, Irish scribes who were less familiar with Latin started leaving spaces between words, and over the following centuries the rest of Europe copied them. Today, nobody thinks of this as an invention.

How many improvements like that are still latent?

### Language models

Language models have a very specific style: they weave sentences together in a "matrix-like" way that goes far beyond "It's not X, it's Y". "The A that B's is the C that D needs to get from E to F" is the kind of weaving that is very hard to parse, especially in its linear, serialized form. What if we could format it so that it becomes much easier to understand?

> As the Irish scribes of the seventh century, to whom Latin was a foreign language, once opened small gaps between the words that Rome had run together, a help that no native speaker had asked for, so we, to whom machines now write a prose more tightly woven than any hand would weave, may yet open new gaps between the phrases that a sentence runs together, a help that no fluent reader had asked for.

<figure class="sense-lines" data-label="The same sentence" data-split="so">
<script type="application/json">[[1, "As"], [1, "the Irish scribes"], [2, "of the seventh century,"], [2, "to whom"], [2, "Latin"], [2, "was a foreign language,"], [1, "once opened"], [2, "small gaps"], [3, "between the words"], [4, "that"], [4, "Rome"], [4, "had run together,"], [3, "a help"], [4, "that"], [4, "no native speaker"], [4, "had asked for,"], [0, "so"], [0, "we,"], [1, "to whom"], [1, "machines"], [1, "now write"], [2, "a prose"], [3, "more tightly woven"], [4, "than"], [4, "any hand"], [4, "would weave,"], [0, "may yet open"], [1, "new gaps"], [2, "between the phrases"], [3, "that"], [3, "a sentence"], [3, "runs together,"], [2, "a help"], [3, "that"], [3, "no fluent reader"], [3, "had asked for."]]</script>
</figure>

Each line is one phrase. A subject and its verb share an indent, and whatever depends on a phrase sits one step under it, so the shape of the sentence becomes visible before you read a word of it. This comes from Randall Walker's Live Ink in the 1990s and was developed further by Cascade Reading, who have published [an eye-tracking study](https://cascadereading.com/wp-content/uploads/2025/05/Cascade-Reading-Eye-Tracking-Study.pdf) on it (I am not affiliated with either).

Given how easy it is to format text in this way with the help of LLMs, this could become a new way of taking in information, much like [speed readers](https://speedreadr.com/).

### A reader for the Daylight Computer

I built a simple reader app for my [Daylight Computer](https://daylightcomputer.com/), and so far I find long sentences easier to parse in it.

<figure class="sense-video">
  <video src="{{ '/assets/sense-lines/daylight.mp4' | relative_url }}" poster="{{ '/assets/sense-lines/daylight.jpg' | relative_url }}" autoplay muted loop playsinline controls preload="metadata" aria-label="The reader on the Daylight Computer: a page of Beyond Good and Evil in sense lines, turned with a tap"></video>
  <figcaption>Beyond Good and Evil on the Daylight, by its amber reading light.</figcaption>
</figure>

It's still very experimental, but it is pleasant to read Nietzsche this way. It might not turn out to be the best way to present information, but I think we are in a local optimum when it comes to consuming it.

Here is the same reader, with all of Beyond Good and Evil in it.

<figure class="sense-reader">
  <div class="sr-device">
    <iframe src="{{ '/assets/sense-lines/beyond-good-and-evil.html' | relative_url }}?embed" title="Beyond Good and Evil, in sense lines" loading="lazy"></iframe>
  </div>
  <figcaption>Click the right of the page to turn it, the left to go back, the middle for the menu.</figcaption>
</figure>

### A new interface for talking to LLMs?

A large part of AI fatigue is having to parse the endless streams of logorrhea from LLMs. Their answers are usually highly hierarchical. What if the leaves of these hierarchical answers could be read in this style? And since you navigate with keys, the agent you're talking to suddenly learns how long you dwell on each section. That could help it build a better model of what you understand.

On top of this, conversations could break out of their usual linear, hyper-serialized form: you could ask follow-up questions about individual nodes in the answer.

All of this is still very experimental, but I think it's a useful candidate for building better interfaces.
