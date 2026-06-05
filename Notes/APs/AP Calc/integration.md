---
layout: default
title: "Unit 6: Integration and Accumulation of Change"
parent: "AP Calculus AB/BC"
nav_order: 6
permalink: /notes/math/integration/
---

# Unit 6: Integration and Accumulation of Change

Integration reverses differentiation and measures accumulation. It ties together antiderivatives, area, net change, and the Fundamental Theorem of Calculus.

---

## Antiderivatives

An antiderivative of $$f$$ is any function $$F$$ such that

$$
F'(x) = f(x).
$$

Core antiderivative patterns:

$$
\int x^n\,dx = \frac{x^{n+1}}{n+1} + C, \qquad n \ne -1
$$

$$
\int \frac{1}{x}\,dx = \ln(\lvert x \rvert) + C
$$

$$
\int e^x\,dx = e^x + C
$$

$$
\int \cos x\,dx = \sin x + C
$$

---

## Riemann sums

To approximate the accumulation of $$f(x)$$ on $$[a,b]$$, divide the interval into subintervals and sum:

$$
\sum_{i=1}^n f(x_i^*)\Delta x
$$

where

$$
\Delta x = \frac{b-a}{n}.
$$

Important choices:

- left Riemann sum,
- right Riemann sum,
- midpoint sum,
- trapezoidal approximation.

> [Image Placeholder: left, right, midpoint, and trapezoidal approximations on one graph]

---

## Definite integral

The definite integral is the limit of Riemann sums:

$$
\int_a^b f(x)\,dx
=
\lim_{n \to \infty} \sum_{i=1}^n f(x_i^*)\Delta x.
$$

Interpretations:

- signed area under a curve,
- net accumulation,
- total change when integrating a rate.

---

## Fundamental Theorem of Calculus

If $$F'(x)=f(x)$$, then

$$
\int_a^b f(x)\,dx = F(b)-F(a).
$$

Also, if

$$
g(x) = \int_a^x f(t)\,dt,
$$

then

$$
g'(x) = f(x)
$$

when $$f$$ is continuous.

---

## Integrals with variable limits

If

$$
G(x) = \int_{u(x)}^{v(x)} f(t)\,dt,
$$

then

$$
G'(x) = f(v(x))v'(x) - f(u(x))u'(x).
$$

---

## u-substitution

If part of the integrand is the derivative of another part, let

$$
u = g(x), \qquad du = g'(x)\,dx.
$$

Then

$$
\int f(g(x))g'(x)\,dx = \int f(u)\,du.
$$

---

## Average value of a function

On $$[a,b]$$:

$$
f_{\text{avg}} = \frac{1}{b-a}\int_a^b f(x)\,dx.
$$

---

## Accumulation functions

If

$$
A(x) = \int_a^x f(t)\,dt,
$$

then:

- $$A'(x)=f(x)$$,
- $$A$$ increases where $$f>0$$,
- $$A$$ decreases where $$f<0$$,
- critical points of $$A$$ occur where $$f=0$$ or undefined.

---

## Numerical integration

If exact antiderivatives are unavailable, use:

- midpoint rule,
- trapezoidal rule,
- left/right sums.

Trapezoidal rule with equal spacing $$\Delta x$$:

$$
\int_a^b f(x)\,dx \approx \frac{\Delta x}{2}
\left[y_0 + 2y_1 + 2y_2 + \cdots + 2y_{n-1} + y_n\right].
$$

---

## Integration as accumulation

An integral adds up tiny pieces. If $$f(x)$$ is a rate, then

$$
f(x)\,dx
$$

represents a tiny amount of accumulated change. Adding all of those tiny pieces from $$a$$ to $$b$$ gives

$$
\int_a^b f(x)\,dx.
$$

This is why the units of a definite integral are

$$
(\text{units of }f)(\text{units of }x).
$$

If $$f$$ is measured in gallons per minute and $$x$$ is measured in minutes, the integral is measured in gallons.

---

## Signed area vs geometric area

The definite integral gives signed area:

- area above the $$x$$-axis contributes positively,
- area below the $$x$$-axis contributes negatively.

Geometric area is always nonnegative, so it may require

$$
\int_a^b |f(x)|\,dx
$$

or splitting at zeros of $$f$$.

<div class="theorem-box" markdown="1">

**Key idea.** Net change allows positive and negative accumulation to cancel. Total amount does not.

</div>

---

## The Fundamental Theorem as a bridge

The Fundamental Theorem of Calculus connects two ideas that initially look separate:

- derivatives measure instantaneous change,
- integrals measure accumulated change.

If $$F'(x)=f(x)$$, then

$$
\int_a^b f(x)\,dx=F(b)-F(a).
$$

So integrating a rate gives the change in the original quantity.

The accumulation version says that if

$$
A(x)=\int_a^x f(t)\,dt,
$$

then

$$
A'(x)=f(x).
$$

The upper limit controls where the accumulation stops, so changing $$x$$ changes the accumulated area.

---

## Variable-limit integrals

For

$$
G(x)=\int_{u(x)}^{v(x)} f(t)\,dt,
$$

the upper limit contributes positively and the lower limit contributes negatively:

$$
G'(x)=f(v(x))v'(x)-f(u(x))u'(x).
$$

This is a chain-rule version of the Fundamental Theorem. The derivative of each limit must be included.

---

## Choosing an antiderivative strategy

Basic antiderivatives come from reversing derivative rules. A good first scan:

- powers use the reverse power rule,
- $$1/x$$ gives $$\ln|x|$$,
- exponentials stay exponential,
- trig functions reverse according to derivative pairs,
- chain-rule patterns suggest $$u$$-substitution.

Substitution works when one part of the integrand is the derivative of another part, possibly up to a constant factor.

---

## Riemann sums from tables

With table data, the width of each subinterval matters. Equal spacing is convenient, but AP tables often use unequal intervals.

For left and right sums, multiply each function value by the width of its interval. For trapezoids, each interval contributes

$$
\frac{1}{2}(\text{width})(\text{left height}+\text{right height}).
$$

If the function is increasing, a left sum underestimates and a right sum overestimates. If the function is decreasing, the reverse is true. Concavity controls whether trapezoids or midpoints tend to overestimate or underestimate.

---

## Average value intuition

The average value of $$f$$ on $$[a,b]$$ is the constant height that would produce the same signed area over the interval:

$$
f_{\text{avg}}=\frac{1}{b-a}\int_a^b f(x)\,dx.
$$

This is different from the average rate of change. Average value averages outputs; average rate of change compares endpoint outputs.

---

## Common mistakes

- Forgetting $$+C$$ on indefinite integrals.
- Using area language when the integral is negative and really means net signed accumulation.
- Dropping the chain-rule factor in reverse when using substitution.
- Confusing $$\int_a^b f(x)\,dx$$ with ordinary multiplication.
