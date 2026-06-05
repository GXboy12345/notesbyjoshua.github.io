---
layout: default
title: "Unit 1: Limits and Continuity"
parent: "AP Calculus AB/BC"
nav_order: 1
permalink: /notes/math/limits/
---

# Unit 1: Limits and Continuity

Limits are the language of calculus. They describe how a function behaves near a point, even when the function value at that point is missing, undefined, or unrelated to the nearby trend.

---

## What a limit means

We write

$$
\lim_{x \to a} f(x) = L
$$

if we can make $$f(x)$$ as close to $$L$$ as we want by taking $$x$$ sufficiently close to $$a$$, with $$x \ne a$$.

This is about nearby behavior, not direct substitution. It is possible for:

- the limit to exist while $$f(a)$$ is undefined,
- the limit to exist while $$f(a) \ne L$$,
- the limit to fail even though $$f(a)$$ exists.

---

## Limit laws

If $$\lim_{x \to a} f(x) = L$$ and $$\lim_{x \to a} g(x) = M$$, then:

$$
\lim_{x \to a} (f(x) \pm g(x)) = L \pm M
$$

$$
\lim_{x \to a} (f(x)g(x)) = LM
$$

$$
\lim_{x \to a} \frac{f(x)}{g(x)} = \frac{L}{M}, \qquad M \ne 0
$$

$$
\lim_{x \to a} [f(x)]^n = L^n
$$

For polynomials and rational functions, direct substitution works whenever the denominator is nonzero.

---

## One-sided limits and existence

A two-sided limit exists exactly when both one-sided limits exist and agree:

$$
\lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L
$$

If the left-hand and right-hand limits disagree, the limit does not exist.

Common reasons a limit fails to exist:

- jump discontinuity,
- vertical asymptote with unbounded behavior,
- oscillation, such as $$\sin(1/x)$$ near $$x = 0$$.

> [Image Placeholder: left-hand vs right-hand limit examples, including a jump discontinuity]

---

## Squeeze Theorem

If

$$
g(x) \le f(x) \le h(x)
$$

for all $$x$$ near $$a$$, and

$$
\lim_{x \to a} g(x) = \lim_{x \to a} h(x) = L,
$$

then

$$
\lim_{x \to a} f(x) = L.
$$

For example:

$$
-1 \le \sin(1/x) \le 1
$$

so

$$
-\lvert x \rvert \le x\sin(1/x) \le \lvert x \rvert
$$

implies

$$
\lim_{x \to 0} x\sin(1/x) = 0.
$$

---

## Continuity

A function is continuous at $$x = a$$ if:

1. $$f(a)$$ exists.
2. $$\lim_{x \to a} f(x)$$ exists.
3. $$\lim_{x \to a} f(x) = f(a)$$.

Types of discontinuities:

- removable: a hole, often fixable by redefining one point,
- jump: left and right limits differ,
- infinite: vertical asymptote,
- oscillatory: no single nearby trend.

Functions continuous on their natural domains:

- polynomials,
- rational functions where denominator is nonzero,
- exponential and logarithmic functions on domain,
- trig functions on domain,
- compositions of continuous functions where defined.

---

## Intermediate Value Theorem

If $$f$$ is continuous on $$[a,b]$$ and $$N$$ lies between $$f(a)$$ and $$f(b)$$, then there exists some $$c \in (a,b)$$ such that $$f(c) = N$$.

This theorem does not tell you how many such points there are, only that at least one exists.

> [Image Placeholder: continuous curve crossing a horizontal line to illustrate IVT]

---

## Limits at infinity and asymptotic behavior

We also study

$$
\lim_{x \to \infty} f(x), \qquad \lim_{x \to -\infty} f(x).
$$

For rational functions:

- degree numerator < degree denominator: limit is $$0$$,
- equal degrees: limit is ratio of leading coefficients,
- degree numerator > degree denominator: no finite horizontal asymptote.

Useful asymptotic idea:

$$
\sqrt{x^2 + 1} \sim \lvert x \rvert
$$

for large $$\lvert x \rvert$$, but be careful with sign when $$x \to -\infty$$.

---

## Indeterminate forms

These forms require more work; they do not determine the limit by themselves:

- $$0/0$$
- $$\infty/\infty$$
- $$0 \cdot \infty$$
- $$\infty - \infty$$
- $$1^\infty$$
- $$0^0$$
- $$\infty^0$$

At this stage, most are handled by algebra, conjugates, factoring, or trig identities. Later, some are handled with L'Hopital's Rule.

---

## Important trig limits

Two core limits:

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

$$
\lim_{x \to 0} \frac{\tan x}{x} = 1
$$

These only work cleanly in radians.

---

## Average rate of change as a precursor to derivative

On $$[a,b]$$,

$$
\frac{f(b) - f(a)}{b-a}
$$

is the average rate of change, or slope of the secant line. The derivative will be the limit of this expression as the interval collapses.

---

## Common algebraic techniques for limits

Most AP limit work is not about memorizing tricks. It is about recognizing what kind of conflict the expression has near the input.

If direct substitution gives an ordinary number, the limit is usually finished. If direct substitution gives an indeterminate form, the expression is hiding competing behavior. The usual goal is to rewrite the expression so the removable part becomes visible.

Common rewrites:

- factor and cancel a common factor,
- multiply by a conjugate when radicals are involved,
- combine fractions into one rational expression,
- use a known trig limit after rewriting the angle,
- divide by the dominant power of $$x$$ for limits at infinity.

For rational functions, holes and vertical asymptotes come from different algebraic behavior. A factor that cancels creates a removable discontinuity. A factor that remains in the denominator can create an infinite discontinuity.

<div class="theorem-box" markdown="1">

**AP language.** If a factor cancels, the original function and the simplified function agree near the point, but not necessarily at the point. Since limits only care about nearby behavior, the simplified function can be used for the limit.

</div>

---

## Infinite limits and vertical asymptotes

An infinite limit describes unbounded behavior:

$$
\infty \quad\text{means increasing without bound,}
$$

while

$$
-\infty \quad\text{means decreasing without bound.}
$$

These are not real-number limits. They are a way of describing the direction of unbounded behavior.

A vertical asymptote at $$x=a$$ usually appears when one or both one-sided limits are infinite:

$$
\infty,\quad -\infty,\quad \text{or one of each.}
$$

The sign of the infinite behavior often comes from a sign chart. Near a vertical asymptote, small positive and negative denominator values can send the function upward or downward very quickly.

---

## Continuity on intervals

Continuity at a single point is local. Continuity on an interval means the function is continuous at every point in that interval.

For a closed interval $$[a,b]$$, endpoint continuity is one-sided:

- at $$a$$, use the right-hand limit,
- at $$b$$, use the left-hand limit.

This matters for the Intermediate Value Theorem and Extreme Value Theorem because both require continuity on a closed interval.

<div class="theorem-box" markdown="1">

**Key idea.** A continuous function on an interval has no breaks, jumps, holes, or vertical blow-ups inside that interval. That is why AP problems often ask whether a theorem applies before asking what the theorem guarantees.

</div>

---

## Theorems about continuous functions

The **Intermediate Value Theorem** guarantees existence of an output value between two known output values. It is used when the question asks whether an equation has a solution or whether a function reaches a certain value.

The **Extreme Value Theorem** says that if $$f$$ is continuous on $$[a,b]$$, then $$f$$ has both an absolute maximum and an absolute minimum on that interval.

The difference:

- IVT guarantees a value between two endpoint outputs.
- EVT guarantees highest and lowest values on a closed interval.

Neither theorem tells you exactly where the value occurs. They only guarantee existence.

---

## Limits from graphs and tables

From a graph, read a limit by following the curve toward the input from each side. The filled dot at the input only tells the function value, not necessarily the limit.

From a table, look for the trend as inputs approach the target. Tables suggest limits but usually do not prove them unless paired with algebra or a theorem.

For AP free-response explanations, be precise:

- "The left-hand and right-hand limits are equal" supports a two-sided limit.
- "The left-hand and right-hand limits are different" supports that the limit does not exist.
- "The function is continuous at the point" supports evaluating the limit by substitution.

---

## End behavior and dominant terms

Limits at infinity describe long-run behavior. For expressions made of powers of $$x$$, the highest-degree terms dominate because lower-degree terms become comparatively small.

For rational functions,

$$
\frac{3x^4-2x}{x^4+7}
$$

has the same long-run behavior as

$$
\frac{3x^4}{x^4},
$$

so the horizontal behavior is controlled by the ratio of leading coefficients.

Radicals need extra care because

$$
\sqrt{x^2}=\lvert x\rvert.
$$

As $$x\to\infty$$, $$\lvert x\rvert=x$$. As $$x\to-\infty$$, $$\lvert x\rvert=-x$$.

Keep the technique tied to the form of the expression: removable factors suggest factoring, radical differences suggest conjugates, nested fractions suggest common denominators, and end behavior suggests dominant terms.

---

## BC-minded notes

- Piecewise-defined functions often test whether you can make a function continuous or differentiable by solving for unknown constants.
- A removable discontinuity may still break differentiability if not fixed.
- Sequence limits later mirror function limits, except the input variable is restricted to integers.

---

## Common mistakes

- Plugging in before checking whether substitution is legal.
- Claiming a limit does not exist just because the function is undefined at the point.
- Forgetting that trig limit formulas require radians.
- Treating vertical asymptotes as automatic DNE without checking one-sided behavior.
