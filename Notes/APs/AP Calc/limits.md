---
layout: default
title: "Unit 1: Limits and Continuity"
parent: "AP Calculus AB/BC"
nav_order: 1
permalink: /notes/math/limits/
---

# Unit 1: Limits and Continuity

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

An introduction to limits can be found in the AP Precalculus course.

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

<div class="theorem-box" markdown="1">

**Proof (Limit Laws).** A limit statement means the function values can be forced arbitrarily close to a target value. If $$f(x)$$ is close to $$L$$ and $$g(x)$$ is close to $$M$$, then their sum is close to $$L+M$$, their product is close to $$LM$$, and their quotient is close to $$L/M$$ as long as $$M\ne0$$.

The formal epsilon-delta proof makes this precise by controlling the error terms. For sums, the total error is

$$
\lvert (f(x)+g(x))-(L+M) \rvert
\le \lvert f(x)-L \rvert + \lvert g(x)-M \rvert.
$$

So if each individual error is made smaller than half the allowed total error, the sum is forced close to the correct limit.

</div>

---

## One-sided limits and existence

A two-sided limit exists exactly when both one-sided limits exist and agree:

$$
\lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L
$$

If the left-hand and right-hand limits disagree, the limit does not exist.

Common reasons a limit fails to exist:

- Jump discontinuity,
- Vertical asymptote with unbounded behavior,
- Oscillation, such as $$\sin(1/x)$$ near $$x = 0$$.

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

<div class="theorem-box" markdown="1">

**Proof (Squeeze Theorem).** If $$g(x)\le f(x)\le h(x)$$ and both outside functions are forced close to $$L$$, then $$f(x)$$ has nowhere else to go. For inputs close enough to $$a$$, both $$g(x)$$ and $$h(x)$$ lie inside a tiny band around $$L$$. Since $$f(x)$$ is trapped between them, it must lie inside the same band.

</div>

---

## Continuity

A function is continuous at $$x = a$$ if:

1. $$f(a)$$ exists.
2. $$\lim_{x \to a} f(x)$$ exists.
3. $$\lim_{x \to a} f(x) = f(a)$$.

Types of discontinuities:

- Removable: a hole, often fixable by redefining one point,
- Jump: left and right limits differ,
- Infinite: vertical asymptote,
- Oscillatory: no single nearby trend.

Functions continuous on their natural domains:

- Polynomials,
- Rational functions where denominator is nonzero,
- Exponential and logarithmic functions on domain,
- Trig functions on domain,
- Compositions of continuous functions where defined.

---

## Intermediate Value Theorem

If $$f$$ is continuous on $$[a,b]$$ and $$N$$ lies between $$f(a)$$ and $$f(b)$$, then there exists some $$c \in (a,b)$$ such that $$f(c) = N$$.

This theorem does not tell you how many such points there are, only that at least one exists.

> [Image Placeholder: continuous curve crossing a horizontal line to illustrate IVT]

<div class="theorem-box" markdown="1">

**Proof (IVT).** Continuity means the graph cannot jump over a height. If the function starts below $$N$$ and ends above $$N$$, then moving from $$a$$ to $$b$$ forces the output to pass through every intermediate height. A discontinuity could skip the height, but a continuous function cannot.

</div>

---

## Limits at infinity and asymptotic behavior

We also study

$$
\lim_{x \to \infty} f(x), \qquad \lim_{x \to -\infty} f(x).
$$

For rational functions:

- Degree numerator < degree denominator: limit is $$0$$,
- Equal degrees: limit is ratio of leading coefficients,
- Degree numerator > degree denominator: no finite horizontal asymptote (slant/oblique asymptote).

These rules can also be found in AP Precalculus.

Useful asymptotic idea:

$$
\sqrt{x^2 + 1} \sim \lvert x \rvert
$$

for large $$\lvert x \rvert$$, but be careful with sign when $$x \to -\infty$$.

---

## Indeterminate forms

Some "numbers" are indeterminate, meaning they require more work; they do not determine the limit by themselves:

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

These only work cleanly in radians. (the $$\frac{\cos x}{x}$$ limit is very easy to find (just plug it in) so isn't included here)

---

## Average rate of change as a precursor to derivative

On $$[a,b]$$,

$$
\frac{f(b) - f(a)}{b-a}
$$

is the average rate of change, or slope of the secant line. The derivative will be the limit of this expression as the interval becomes closer and closer to a certain value.

---

## Common algebraic techniques for limits

Most AP limit work is not about memorizing tricks. It is about recognizing what kind of conflict the expression has near the input.

If direct substitution gives an ordinary number, the limit is usually finished. If direct substitution gives an indeterminate form, the expression is hiding competing behavior. The usual goal is to rewrite the expression so the removable part becomes visible.

Common rewrites:

- Factor and cancel a common factor,
- Multiply by a conjugate when radicals are involved,
- Combine fractions into one rational expression,
- Use a known trig limit after rewriting the angle,
- Divide by the dominant power of $$x$$ for limits at infinity.

For rational functions, holes and vertical asymptotes come from different algebraic behavior. A factor that cancels creates a removable discontinuity. A factor that remains in the denominator can create an infinite discontinuity.

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

The sign of the infinite behavior often comes from a sign chart. Near a vertical asymptote, small positive and negative denominator values can send the function upward or downward very quickly, and thus have limits at $$\pm \infty$$.

---

## Continuity on intervals

Continuity at a single point is local. Continuity on an interval means the function is continuous at every point in that interval.

For a closed interval $$[a,b]$$, endpoint continuity is one-sided:

- at $$a$$, use the right-hand limit,
- at $$b$$, use the left-hand limit.

This matters for the Intermediate Value Theorem and Extreme Value Theorem because both require continuity on a closed interval.

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
