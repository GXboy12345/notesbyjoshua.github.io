---
layout: default
title: "Unit 1: Limits and Continuity"
parent: "AP Calculus AB/BC"
nav_order: 1
permalink: /notes/math/limits/
---

# Unit 1: Limits and Continuity

Limits describe the value a function approaches as the input gets close to a point. In AP Calculus, we use limits to analyze nearby behavior, compare one-sided approaches, study asymptotes, and prepare for the derivative.

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

A quick check is direct substitution. If substituting $$x = a$$ gives a finite number and the expression is defined there, the limit is usually that number.

---

## One-sided and two-sided limits

A one-sided limit describes the value approached from one direction only.

- Left-hand limit: $$\lim_{x \to a^-} f(x)$$
- Right-hand limit: $$\lim_{x \to a^+} f(x)$$

A two-sided limit exists exactly when both one-sided limits exist and agree:

$$
\lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L.
$$

If the left-hand and right-hand limits disagree, then the two-sided limit does not exist.

Common reasons a limit fails to exist:

- Jump discontinuity,
- Vertical asymptote with unbounded behavior,
- Oscillation, such as $$\sin(1/x)$$ near $$x = 0$$.

> [Image Placeholder: left-hand vs right-hand limit examples, including a jump discontinuity]

---

## Limit laws and direct substitution

If $$\lim_{x \to a} f(x) = L$$ and $$\lim_{x \to a} g(x) = M$$, then:

$$
\lim_{x \to a} (f(x) \pm g(x)) = L \pm M,
$$

$$
\lim_{x \to a} (f(x)g(x)) = LM,
$$

$$
\lim_{x \to a} \frac{f(x)}{g(x)} = \frac{L}{M}, \qquad M \ne 0,
$$

$$
\lim_{x \to a} [f(x)]^n = L^n.
$$

For polynomials and rational functions, direct substitution works whenever the denominator is nonzero. If substitution gives a finite number, the limit is usually that number.

<div class="theorem-box" markdown="1">

**Proof (Limit Laws).** A limit statement means the function values can be forced arbitrarily close to a target value. If $$f(x)$$ is close to $$L$$ and $$g(x)$$ is close to $$M$$, then their sum is close to $$L + M$$, their product is close to $$LM$$, and their quotient is close to $$L/M$$ as long as $$M \ne 0$$.

A key idea is that the limit might not be exactly at the input value, but the function values can get arbitrarily close to the target. In AP Calculus, we often think of the small error as $$\varepsilon$$, which becomes negligible when the limit exists.

</div>

---

## Indeterminate forms and algebraic techniques

Direct substitution sometimes gives an indeterminate form, which means the algebraic structure must be simplified before the limit can be found. Common indeterminate forms include:

- $$0/0$$
- $$\infty/\infty$$
- $$0 \cdot \infty$$
- $$\infty - \infty$$
- $$1^\infty$$
- $$0^0$$
- $$\infty^0$$

In AP Calculus AB/BC, most of these are handled with algebra rather than advanced rules.

Common algebraic techniques:

- Factor and cancel a common factor,
- Multiply by a conjugate when radicals are involved,
- Combine fractions into a single rational expression,
- Use a known trig limit after rewriting the angle,
- Divide by the dominant power of $$x$$ for limits at infinity.

Most AP limit work is about recognizing whether direct substitution works or whether the expression hides competing behavior.

It is very important to note that if you get a form that is NOT one of these you cannot do any operation to simplify it! For example, if you get the limit is $$\infty/3$$, it is not an indeterminate form!

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

<div class="theorem-box" markdown="1">

**Proof (Squeeze Theorem).** If $$g(x) \le f(x) \le h(x)$$ and both outside functions are forced close to $$L$$, then $$f(x)$$ has nowhere else to go. For inputs close enough to $$a$$, both $$g(x)$$ and $$h(x)$$ lie inside a tiny band around $$L$$. Since $$f(x)$$ is trapped between them, it must lie inside the same band.

</div>

<div class="theorem-box" markdown="1">

**Example.** Find the limit of $$\lim_{x \to 0} x \sin\left(\frac{1}{x}\right)$$

Since

$$
-1 \le \sin\left(\frac{1}{x}\right) \le 1
$$,

it implies that

$$
-\lvert x \rvert \le x \sin\left(\frac{1}{x}\right) \le \lvert x \rvert.
$$

Thus, by Squeeze Theorem,

$$
\lim_{x \to 0} x \sin\left(\frac{1}{x}\right) = 0.
$$

</div>

---

## Important trig limits

Two core limits that appear often are:

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1,
$$

$$
\lim_{x \to 0} \frac{\tan x}{x} = 1.
$$

These are valid only in radians. They are frequently used after rewriting a trig expression into a form that matches one of these limits. It is important to note that $$cos x$$ is not a part of this because the limit of $$\lim_{x \to 0} \frac{\cos x}{x}$$ can be easily solved by plugging $$0$$ into the expression.

---

## Limits at infinity and asymptotic behavior

We also study

$$
\lim_{x \to \infty} f(x), \qquad \lim_{x \to -\infty} f(x),
$$

or as more commonly known as end behavior.

For rational functions:

- If degree numerator < degree denominator: the limit is $$0$$,
- If the degrees are equal: the limit is the ratio of leading coefficients,
- If degree numerator > degree denominator: there is no finite horizontal asymptote (the function may have a slant or oblique asymptote).

A useful asymptotic idea is:

$$
\sqrt{x^2 + C} \sim \lvert x \rvert
$$ (where C is a constant)

for large $$\lvert x \rvert$$, but be careful with the sign when $$x \to -\infty$$.

---

## Continuity

A function is continuous at $$x = a$$ when:

1. $$f(a)$$ exists,
2. $$\lim_{x \to a} f(x)$$ exists,
3. $$\lim_{x \to a} f(x) = f(a).$$

Continuity means the nearby behavior of the function matches the value at the point.

Types of discontinuities:

- Removable: a hole, often fixable by redefining one point,
- Jump: left and right limits differ,
- Infinite: a vertical asymptote,
- Oscillatory: no single nearby trend.

Functions that are continuous on their natural domains include:

- Polynomials,
- Rational functions where the denominator is nonzero,
- Exponential and logarithmic functions on their domains,
- Trigonometric functions on their domains,
- Compositions of continuous functions where defined.

---

## Intermediate Value Theorem

If $$f$$ is continuous on $$[a,b]$$ and $$N$$ lies between $$f(a)$$ and $$f(b)$$, then there exists some $$c \in (a,b)$$ such that $$f(c) = N$$.

This theorem guarantees at least one solution, but it does not tell you how many.

> [Image Placeholder: continuous curve crossing a horizontal line to illustrate IVT]

<div class="theorem-box" markdown="1">

**Proof (IVT).** Continuity means the graph cannot jump over a height. If the function starts below $$N$$ and ends above $$N$$, then moving from $$a$$ to $$b$$ forces the output to pass through every intermediate height. A discontinuity could skip the height, but a continuous function cannot.

</div>

---

## Average rate of change (Introduction to derivatives)

On $$[a,b]$$, the average rate of change is modeled by

$$
\frac{f(b) - f(a)}{b-a}
$$.

This is also the slope of the secant line. The derivative will be the limit of this expression as the interval shrinks toward a single point. This will be explored more in Unit 2.
