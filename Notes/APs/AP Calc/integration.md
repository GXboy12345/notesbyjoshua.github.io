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

:::theorem
An antiderivative of $$f$$ is any function $$F$$ such that

$$
F'(x) = f(x).
$$

:::

Examples:

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

<!-- :::figure{width=480}
![Left, right, midpoint, and trapezoidal approximations on one graph]()
::: -->

---

## Definite integral

:::theorem
The definite integral is the limit of Riemann sums:

$$
\int_a^b f(x)\,dx
=
\lim_{n \to \infty} \sum_{i=1}^n f(x_i^*)\Delta x.
$$

:::

Interpretations:

- signed area under a curve,
- net accumulation,
- total change when integrating a rate.

---

## Fundamental Theorem of Calculus

:::theorem{name="Fundamental Theorem of Calculus"}
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

:::

---

## Integrals with variable limits

:::theorem
If

$$
G(x) = \int_{u(x)}^{v(x)} f(t)\,dt,
$$

then

$$
G'(x) = f(v(x))v'(x) - f(u(x))u'(x).
$$

:::

---

## u-substitution

:::theorem
If part of the integrand is the derivative of another part, let

$$
u = g(x), \qquad du = g'(x)\,dx.
$$

Then

$$
\int f(g(x))g'(x)\,dx = \int f(u)\,du.
$$

:::

---

## Average value of a function

On $$[a,b]$$:

:::key{name="Average value of a function"}
$$
f_{\text{avg}} = \frac{1}{b-a}\int_a^b f(x)\,dx.
$$

:::

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

:::key{name="Trapezoidal rule"}
$$
\int_a^b f(x)\,dx \approx \frac{\Delta x}{2}
\left[y_0 + 2y_1 + 2y_2 + \cdots + 2y_{n-1} + y_n\right].
$$

:::

---

:::mistakes
- Forgetting $$+C$$ on indefinite integrals.
- Using area language when the integral is negative and really means net signed accumulation.
- Dropping the chain-rule factor in reverse when using substitution.
- Confusing $$\int_a^b f(x)\,dx$$ with ordinary multiplication.

:::
