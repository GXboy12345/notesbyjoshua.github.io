# How to write notes

---

## Basic format

For any notes page, it always follow this basic format:

``` markdown
---
layout: default
title: Page title
parent: Parent folder
nav_order: Hierarichal order on website
permalink: Reference link
---

# Page title

---

## Header 1

content content content

### Sub-header 1

//image example
<img class="note-img note-img--w480" src="{{ 'image path in repo' | relative_url }}" alt="Free body diagram placeholder" loading="lazy" decoding="async" />

//link example
[link](link) //if you need to link to another page, use that page's permalink

### Sub-header 2

<div class="theorem-box" markdown="1">

proof/example here (refer to section below for guidance)

</div>

---

## Header 2

...

---

## Practice

1. question
2. question

...

---

## Solutions

<div class="theorem-box" markdown="1">

### Solution 1

solution here

</div>

...

```

---

## Theorem boxes

### Proofs

When writing proofs, always follow this format:

``` markdown
<div class="theorem-box" markdown="1">

**Proof (What identity/formula you are proving).** Proof statement

</div>
```

NEVER box the final identity!

### Examples

When writing examples, always follow this format:

``` markdown
<div class="theorem-box" markdown="1">

**Example.** question statement

solution here

</div>
```

When writing the question statement, always end with what you are trying to find/derive, and don't just state the needed information. For example, say *"A is the 1st letter of the alphabet and C is 2 letters after A. Find the position of letter C."* instead of *"A is the 1st letter of the alphabet and C is 2 letters after A."* and going straight to the answer.

Note that for examples, you NEVER state the main theme of the example. This is done because usually the main idea is already given in the problem and thus will be redundant.

### Theorems

idk I might do this I might not

### Practice solutions

When writing solutions, always follow this format:

``` markdown
<div class="theorem-box" markdown="1">

### Solution number

solution here

$$
\boxed{answer(s) here}.
$$

</div>
```

---

## Jekyll/Mathjax formatting tips

- Always remember to add text BEFORE numbers/formulas to start off bullet points, since if you don't do that the text will automatically pop up in the middle. An example is below:

``` markdown
- $$R=8.314 \frac{J}{\circ K}
// WRONG!!!
- Ideal gas constant: $$R=8.314 \frac{J}{\circ K}
// CORRECT!
```

- Make sure to always use \lvert and \rvert instead of vertical bars when doing absolute value, because Mathjax sometimes reads vertical bars as a table and messes up the formatting (I avoid using the character because it messes up the formatting here as well)
- Always remember to have proper spacing in between sections! Always make sure to leave a blank space above and below any separation markers, special headers, theorem boxes, and image links.
