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

:::theorem{name="Limit"}
We write

$$
\lim_{x \to a} f(x) = L
$$

if we can make $$f(x)$$ as close to $$L$$ as we want by taking $$x$$ sufficiently close to $$a$$, with $$x \ne a$$.
:::

This is about nearby behavior, not direct substitution. It is possible for:

- the limit to exist while $$f(a)$$ is undefined,
- the limit to exist while $$f(a) \ne L$$,
- the limit to fail even though $$f(a)$$ exists.

---

## Limit laws

:::theorem{name="Limit laws"}
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
:::

:::key
For polynomials and rational functions, direct substitution works whenever the denominator is nonzero.
:::

---

## One-sided limits and existence

A two-sided limit exists exactly when both one-sided limits exist and agree:

$$
\lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L
$$

If the left-hand and right-hand limits disagree, the limit does not exist.

:::warning
Common reasons a limit fails to exist:

- jump discontinuity,
- vertical asymptote with unbounded behavior,
- oscillation, such as $$\sin(1/x)$$ near $$x = 0$$.
:::

:::note
[Image Placeholder: left-hand vs right-hand limit examples, including a jump discontinuity]
:::

---

## Squeeze Theorem

:::theorem{name="Squeeze Theorem"}
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
:::

:::example{title="x sin(1/x)"}
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
:::

---

## Continuity

:::theorem{name="Continuity"}
A function is continuous at $$x = a$$ if:

1. $$f(a)$$ exists.
2. $$\lim_{x \to a} f(x)$$ exists.
3. $$\lim_{x \to a} f(x) = f(a)$$.
:::

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

:::note
[Image Placeholder: continuous curve crossing a horizontal line to illustrate IVT]
:::

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

- Factor and cancel removable factors.
- Rationalize with conjugates when radicals are involved.
- Rewrite complex fractions as a single fraction.
- Use common denominators.
- Extract dominant powers for end behavior.

:::example{title="Rationalizing at x = 4"}
Example:

$$
\lim_{x \to 4} \frac{\sqrt{x} - 2}{x - 4}
=
\lim_{x \to 4} \frac{1}{\sqrt{x} + 2}
= \frac14
$$
:::

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
