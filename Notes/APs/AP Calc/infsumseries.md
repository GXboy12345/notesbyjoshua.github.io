---
layout: default
title: "Unit 10: Infinite Sums and Series (BC-only)"
parent: "AP Calculus AB/BC"
nav_order: 10
permalink: /notes/math/infsumseries/
---

# Unit 10: Infinite Sums and Series (BC-only)

This BC-only unit is about representing functions and numbers through infinitely many terms, and then deciding when those infinite processes make sense.

---

## Sequences

A sequence is a function whose domain is the positive integers:

$$
a_1, a_2, a_3, \dots
$$

We write

$$
\lim_{n \to \infty} a_n = L
$$

if the terms approach $$L$$.

If $$\sum a_n$$ converges, then necessarily $$a_n \to 0$$. The converse is false.

---

## Infinite series

A series is the sum

$$
\sum_{n=1}^{\infty} a_n.
$$

Its convergence is defined by the sequence of partial sums:

$$
S_N = \sum_{n=1}^{N} a_n.
$$

---

## Geometric series

$$
\sum_{n=0}^{\infty} ar^n
$$

converges when $$\lvert r \rvert < 1$$ and then

$$
\sum_{n=0}^{\infty} ar^n = \frac{a}{1-r}.
$$

<div class="theorem-box" markdown="1">

**Why the geometric sum formula works.** Let

$$
S_N=a+ar+ar^2+\cdots+ar^N.
$$

Multiplying by $$r$$ gives

$$
rS_N=ar+ar^2+\cdots+ar^{N+1}.
$$

Subtracting cancels the middle terms:

$$
S_N-rS_N=a-ar^{N+1}.
$$

So

$$
S_N=\frac{a(1-r^{N+1})}{1-r}.
$$

If $$|r|<1$$, then $$r^{N+1}\to0$$, leaving

$$
\frac{a}{1-r}.
$$

</div>

---

## Harmonic and p-series

The harmonic series

$$
\sum_{n=1}^{\infty} \frac{1}{n}
$$

diverges.

The p-series

$$
\sum_{n=1}^{\infty} \frac{1}{n^p}
$$

converges if and only if $$p>1$$.

---

## Integral Test

If $$f(x)$$ is positive, continuous, and decreasing for large $$x$$ with $$f(n)=a_n$$, then

$$
\sum a_n
$$

and

$$
\int f(x)\,dx
$$

either both converge or both diverge.

---

## Comparison tests

Direct comparison:

- if $$0 \le a_n \le b_n$$ and $$\sum b_n$$ converges, then $$\sum a_n$$ converges,
- if $$0 \le b_n \le a_n$$ and $$\sum b_n$$ diverges, then $$\sum a_n$$ diverges.

Limit comparison:

If

$$
\lim_{n \to \infty} \frac{a_n}{b_n} = c
$$

with $$0<c<\infty$$, then $$\sum a_n$$ and $$\sum b_n$$ behave the same.

---

## Alternating series

An alternating series often has the form

$$
\sum_{n=1}^{\infty} (-1)^n b_n
$$

or

$$
\sum_{n=1}^{\infty} (-1)^{n+1} b_n
$$

with $$b_n > 0$$.

The Alternating Series Test says the series converges if:

- $$b_n$$ decreases eventually,
- $$b_n \to 0$$.

---

## Absolute vs conditional convergence

If

$$
\sum \lvert a_n \rvert
$$

converges, then $$\sum a_n$$ converges absolutely.

If $$\sum a_n$$ converges but $$\sum \lvert a_n \rvert$$ diverges, the convergence is conditional.

---

## Ratio and root tests

Ratio Test:

$$
L = \lim_{n \to \infty} \left\lvert\frac{a_{n+1}}{a_n}\right\rvert
$$

Root Test:

$$
L = \lim_{n \to \infty} \sqrt[n]{\lvert a_n \rvert}
$$

In either test:

- if $$L<1$$, converge absolutely,
- if $$L>1$$ or infinite, diverge,
- if $$L=1$$, inconclusive.

---

## nth-term test for divergence

If

$$
\lim_{n \to \infty} a_n \ne 0
$$

or the limit does not exist, then

$$
\sum a_n
$$

diverges.

<div class="theorem-box" markdown="1">

**Why the nth-term test works.** If an infinite series converges to a finite sum, then the partial sums

$$
S_N=a_1+a_2+\cdots+a_N
$$

must settle down. Consecutive partial sums then get closer together. But

$$
S_N-S_{N-1}=a_N.
$$

So the terms must approach $$0$$. If they do not, the partial sums cannot settle to one finite value.

</div>

---

## Power series

A power series centered at $$c$$ has form

$$
\sum_{n=0}^{\infty} a_n(x-c)^n.
$$

There is a radius of convergence $$R$$:

- converges for $$\lvert x-c \rvert<R$$,
- diverges for $$\lvert x-c \rvert>R$$,
- endpoints must be checked separately.

> [Image Placeholder: number line showing center, radius, and endpoint testing]

---

## Taylor and Maclaurin series

The Taylor series of $$f$$ centered at $$c$$ is

$$
\sum_{n=0}^{\infty} \frac{f^{(n)}(c)}{n!}(x-c)^n.
$$

Maclaurin series is the special case $$c=0$$.

<div class="theorem-box" markdown="1">

**Why Taylor coefficients look like this.** Suppose a polynomial centered at $$c$$ has the form

$$
P(x)=a_0+a_1(x-c)+a_2(x-c)^2+\cdots.
$$

Plugging in $$x=c$$ gives $$P(c)=a_0$$. Differentiating once and plugging in $$c$$ gives $$P'(c)=a_1$$. Differentiating twice gives $$P''(c)=2!a_2$$. In general,

$$
P^{(n)}(c)=n!a_n.
$$

So to make the polynomial match the derivatives of $$f$$ at $$c$$, the coefficient must be

$$
a_n=\frac{f^{(n)}(c)}{n!}.
$$

</div>

Core series to memorize:

$$
\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n, \qquad \lvert x \rvert<1
$$

$$
e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!}
$$

$$
\sin x = \sum_{n=0}^{\infty} (-1)^n \frac{x^{2n+1}}{(2n+1)!}
$$

$$
\cos x = \sum_{n=0}^{\infty} (-1)^n \frac{x^{2n}}{(2n)!}
$$

---

## Taylor polynomial and error

The $$n$$th Taylor polynomial is the finite truncation:

$$
T_n(x) = \sum_{k=0}^{n} \frac{f^{(k)}(c)}{k!}(x-c)^k.
$$

For alternating Maclaurin series with decreasing term magnitudes, the truncation error is at most the first omitted term in absolute value.

---

## Sequence vs series

A sequence is a list of terms. A series is the sum of those terms.

The sequence question is:

$$
\text{Do the terms }a_n\text{ approach a value?}
$$

The series question is:

$$
\text{Do the partial sums }S_N\text{ approach a value?}
$$

These are related but not the same. A series can only converge if its terms approach zero, but terms approaching zero do not guarantee that the infinite sum converges.

<div class="theorem-box" markdown="1">

**Key idea.** The nth-term test can only prove divergence. It never proves convergence.

</div>

---

## Choosing a convergence test

Series tests are tools for different patterns.

Use geometric series when terms are built from a constant ratio. Use p-series when the series resembles

$$
\sum\frac{1}{n^p}.
$$

Use comparison when the terms are positive and resemble a known benchmark. Use limit comparison when the dominant long-run behavior is easier to compare than strict inequalities.

Use the integral test when the terms come from a positive, continuous, decreasing function that is easy to integrate.

Use the alternating series test when signs alternate and the magnitudes decrease to zero.

Use the ratio test for factorials, exponentials, and many power series. Use the root test when the entire term is raised to the $$n$$th power.

---

## Positive, alternating, absolute, and conditional

For positive-term series, convergence is about whether the sum of positive amounts stays finite.

For alternating series, positive and negative terms can cancel. That creates two levels of convergence:

- absolute convergence: $$\sum |a_n|$$ converges,
- conditional convergence: $$\sum a_n$$ converges but $$\sum |a_n|$$ diverges.

Absolute convergence is stronger. If a series converges absolutely, it converges.

---

## Remainder estimates

For an alternating series satisfying the Alternating Series Test, the error after using $$n$$ terms is at most the magnitude of the first omitted term:

$$
|R_n|\le b_{n+1}.
$$

This works because the partial sums trap the true value from alternating sides, and each new term makes the trap smaller.

For Taylor polynomials, the Lagrange error bound has the form

$$
|R_n(x)|
\le
\frac{M}{(n+1)!}|x-c|^{n+1},
$$

where $$M$$ bounds the absolute value of the next derivative on the interval between $$c$$ and $$x$$.

---

## Power series as functions

A power series is like an infinite polynomial:

$$
\sum_{n=0}^{\infty}a_n(x-c)^n.
$$

Inside its interval of convergence, it behaves nicely:

- it can be differentiated term by term,
- it can be integrated term by term,
- the center $$c$$ acts like the anchor point for the expansion.

The radius of convergence comes from the long-run behavior of the coefficients. The endpoints need separate testing because the ratio or root test usually becomes inconclusive there.

---

## Taylor series intuition

Taylor series build a function from derivative information at one center point. The terms are chosen so that the polynomial matches the function's value, slope, concavity, and higher-order derivative behavior at the center.

The Taylor polynomial

$$
T_n(x)
$$

is a finite approximation. The Taylor series is the infinite version. A function equals its Taylor series only where the series converges to the function, not merely where the series converges.

Maclaurin series are Taylor series centered at $$0$$.

---

## Memorized series as building blocks

The core Maclaurin series are not isolated facts. They are templates that can be modified by substitution, multiplication, differentiation, and integration.

For example, the geometric series

$$
\frac{1}{1-x}=\sum_{n=0}^{\infty}x^n
$$

is the source of many rational-function power series. The interval restriction changes whenever the input expression replacing $$x$$ changes.

When modifying a known series, update both:

- the formula,
- the interval or radius of convergence.

---

## Series notation habits

Indexing is flexible, but consistency matters. If a series starts at $$n=0$$, the first term uses $$n=0$$. If it starts at $$n=1$$, the first term uses $$n=1$$.

Factorials grow quickly, which is why they appear in Taylor series for functions like $$e^x$$, $$\sin x$$, and $$\cos x$$. The factorial in the denominator balances the higher derivatives and powers.

For AP work, always state the test used and enough hypothesis information to justify it.

---

## Common mistakes

- Forgetting that $$a_n \to 0$$ is necessary but not sufficient.
- Using a convergence test whose hypotheses do not apply.
- Stopping after finding the radius of convergence without testing endpoints.
- Mixing up absolute and conditional convergence.
