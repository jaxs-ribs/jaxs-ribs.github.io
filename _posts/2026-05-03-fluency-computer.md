---
title: "Fluency Computer and Human Learning"
description: "A three-week language learning prototype built around low-latency scoring and adaptive card selection."
image: "/assets/fluency-computer-og.jpg"
image_width: 1200
image_height: 630
image_type: "image/jpeg"
---

> I built this as a three-week side project/prototype. I’m sharing it because the interaction model feels interesting. I'm likely not going to pursue this further, for reasons mentioned at the end of the post.

I wanted to use a language learning app that maximizes learning instead of trying to gamify everything. Duolingo did too much of the latter, and among the countless new apps, none seemed to focus on low latency and high throughput. It was frustrating how much time was spent doing nothing or seeing stupid animations. Even Anki falls short: You can download from millions of decks, but you will have trouble finding decks that properly curriculize the material. On top of that, you have to self-assess whether you get a card right, and waste mental resources that could be used for processing.

<video controls playsinline preload="metadata">
  <source src="{{ '/assets/fluency_computer_demo.mp4' | relative_url }}" type="video/mp4">
  <a href="{{ '/assets/fluency_computer_demo.mp4' | relative_url }}">Watch the Fluency Computer demo</a>.
</video>

### Fluency Computer

I wanted an app that shows me cards that match my skill level, knows my history, and automatically scores my translations. I'm convinced that language acquisition (and many other kinds of learning) can be treated as a control problem, so the problem can be formulated as:

> What is the single most informative piece of information the learner should be exposed to, per unit time, without breaking flow?

This was achieved with 5 principles:

1. Comprehensible Input
2. Low latency loop
3. Automatic scoring
4. Adaptive card sampling based on skill and difficulty
5. LM based curriculum

### 1. Comprehensible Input

Stephen Krashen's comprehensible input hypothesis is that language is acquired by being exposed to as much input that is slightly above our level: Mostly comprehensible but with a tiny stretch. Fluency Computer uses that as the learning target: cards should be meaningful, readable, short, and just hard enough to force inference.

The basic goal is to get people to B1 understanding level, by repeatedly translating provided cards to english via speech to text.
Once you get good enough at understanding a language, producing speech in that language follows quickly. This app is only meant to get you to understanding it, outside practice is what makes you acquire it fully.

### 2. Low latency loop

Learning is limited by how many high-quality attempts you can make per minute. A slow loop breaks attention. The ideal loop is almost mechanical: see sentence, speak meaning, get scored, move on.

We use Apple's local STT, which is very accurate for common words and sentences. When you record a sentence, it's transcribed in < 200ms, then sent to a server for verification and scoring.

### 3. Automatic Scoring

We use Groq's inference and gpt OSS 120b to score the user's translation. The average scoring time is < 800ms, as you can see in the video. This is likely one of the fastest scoring mechanisms for translations I have seen, and feels very satisfying.

You don't have to translate the cards sentence word-for-word, as long as you convey the same meaning.

When you get it wrong, you get feedback from the LLM: The actual sentence, word for word breakdowns, and what your mistranslated sentence would have been in the language you're learning.

### 4. Adaptive card sampling based on skill and difficulty

Our card sampling algorithm is a mix of ELO-style skill estimation based on the card difficulty you beat, merged with the classic [FSRS](https://github.com/open-spaced-repetition/free-spaced-repetition-scheduler) from spaced repetition learning. It took quite a while to tune this right, but it's now at a point where within a few cards, you will get presented with the card level that challenges you maximally.

### 5. LM-based curriculum

For each language we support (Spanish, French, Swedish, German, Hebrew, Latin, more to come), we generate thousands of cards with increasingly complex difficulty levels. Each language (except for latin) has corresponding text to speech pronunciations for the user to internalize.

## Future directions

The problem with this v1 version of the app is that each card's meaning is unrelated to other cards. What if one could use this app, but as you go through cards, the sentences in the card form a coherent story? That way, you can infer meaning from context and accelerate learning.
V2 uses LLMs to generate a story on the fly, which knows about the users skill level, what words they know (with probability distributions), and generates a story on the fly. If the user makes a mistake, it remembers what elements were wrong, and integrates those elements in the next utterances of the story, without breaking flow.

This required some sampling tricks, and it worked for the most part. But then I realized that current SOTA models can easily do all of this with a well written system prompt, and very long running context. This is still prohibitively expensive as of early 2026, where users would have to pay up to $200/mo with current LLMs.

I think this is where language learning is headed, and it's just a matter of cost.

This is why I'm not pursuing v1 further. If you're interested in using or exploring this app, DM me and I can send you a link as long as I am still maintaining the infrastructure around it.
