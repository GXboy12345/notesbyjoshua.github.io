---
layout: default
title: "Unit 2: Differentiation: Definition and Fundamental Properties"
parent: "AP Calculus AB/BC"
nav_order: 2
permalink: /notes/math/diffdeffund/
---

# Unit 2: Differentiation: Definition and Fundamental Properties

Differentiation measures instantaneous change. Conceptually, the derivative is the slope of the tangent line and the best local linear approximation to a function.

---

## Definition of the derivative

The derivative of $$f$$ at $$x$$ is

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h)-f(x)}{h}
$$

Equivalently,

$$
f'(a) = \lim_{x \to a} \frac{f(x)-f(a)}{x-a}.
$$

Interpretations:

- instantaneous rate of change,
- slope of the tangent line,
- limit of secant slopes,
- local sensitivity of output to input.

> [Image Placeholder: secant lines approaching a tangent line]

---

## Differentiability vs continuity

If $$f$$ is differentiable at $$a$$, then $$f$$ is continuous at $$a$$.

The converse is false. A function can be continuous but not differentiable because of:

- corner,
- cusp,
- vertical tangent,
- discontinuity.

---

## Basic derivative rules

For constants $$c$$ and differentiable functions $$f,g$$:

$$
\frac{d}{dx}(c) = 0
$$

$$
\frac{d}{dx}(x^n) = nx^{n-1}
$$

$$
\frac{d}{dx}[cf(x)] = cf'(x)
$$

$$
\frac{d}{dx}[f(x) \pm g(x)] = f'(x) \pm g'(x)
$$

$$
\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)
$$

$$
\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right]
=
\frac{f'(x)g(x)-f(x)g'(x)}{[g(x)]^2}
$$

for $$g(x) \ne 0$$.

---

## Derivatives of common functions

$$
\frac{d}{dx}(\sin x) = \cos x
$$

$$
\frac{d}{dx}(\cos x) = -\sin x
$$

$$
\frac{d}{dx}(\tan x) = \sec^2 x
$$

$$
\frac{d}{dx}(e^x) = e^x
$$

$$
\frac{d}{dx}(a^x) = a^x \ln a
$$

$$
\frac{d}{dx}(\ln x) = \frac{1}{x}
$$

---

## Tangent and normal lines

At $$x=a$$:

- tangent slope is $$f'(a)$$,
- tangent line is

$$
y - f(a) = f'(a)(x-a),
$$

- normal slope is $$-1/f'(a)$$ when $$f'(a) \ne 0$$.

---

## Higher derivatives

The second derivative $$f''(x)$$ measures the rate of change of the first derivative.

Interpretations:

- concavity in pure math,
- acceleration in motion when $$f$$ is position.

You may also see $$f^{(n)}(x)$$ for the $$n$$th derivative.

---

## Motion along a line

If $$s(t)$$ is position, then:

$$
v(t) = s'(t)
$$

$$
a(t) = v'(t) = s''(t)
$$

Velocity includes sign and direction; speed is $$\lvert v(t) \rvert$$.

When velocity and acceleration have the same sign, speed is increasing. When signs differ, speed is decreasing.

---

## Local linearity and linearization preview

Near $$x=a$$,

$$
f(x) \approx f(a) + f'(a)(x-a).
$$

This linearization is a first-order approximation and becomes useful for estimation and error analysis later.

---

## Differentiation from tables

If you only have values of $$f$$, use the difference quotient for an approximate derivative:

$$
f'(a) \approx \frac{f(a+h)-f(a)}{h}
$$

or a symmetric estimate:

$$
f'(a) \approx \frac{f(a+h)-f(a-h)}{2h}.
$$

---

## Why the derivative is a limit

The average rate of change on $$[a,a+h]$$ is

$$
\frac{f(a+h)-f(a)}{h}.
$$

This is the slope of a secant line. The derivative asks what happens as the second point moves closer and closer to the first point. If the secant slopes approach one stable value, that value is the tangent slope.

This is why the derivative can be interpreted in several connected ways:

- geometrically, it is slope at an instant;
- numerically, it is the limiting value of nearby average rates;
- physically, it is instantaneous velocity when $$f$$ is position;
- locally, it is the coefficient of the best linear approximation.

<div class="theorem-box" markdown="1">

**Key idea.** Differentiability means the function looks almost linear when you zoom in near the point. Corners and cusps fail because the left and right zoom-in slopes do not settle into the same line.

</div>

---

## Notation for derivatives

AP Calculus uses several derivative notations:

$$
f'(x),\qquad y',\qquad \frac{dy}{dx},\qquad \frac{d}{dx}[f(x)].
$$

They all refer to rate of change, but they emphasize different things. The notation $$f'(a)$$ is a number. The notation $$f'(x)$$ is a function. The notation $$dy/dx$$ emphasizes that the derivative compares a tiny change in $$y$$ to a tiny change in $$x$$.

When a problem asks for "the derivative at $$x=a$$," give a value. When it asks for "the derivative of $$f$$," give a formula.

---

## Units and derivative meaning

If $$f(x)$$ has units of output and $$x$$ has units of input, then

$$
f'(x)
$$

has units

$$
\frac{\text{output units}}{\text{input units}}.
$$

For instance, if position is measured in feet and time in seconds, velocity is measured in feet per second. The sign tells direction; the magnitude tells how fast the position is changing.

Second derivatives have units of

$$
\frac{\text{output units}}{(\text{input units})^2}.
$$

That is why acceleration is measured in distance per time squared.

---

## Local linear behavior

The derivative gives the slope of the tangent line, so near $$x=a$$ the function behaves approximately like

$$
L(x)=f(a)+f'(a)(x-a).
$$

The phrase "near $$a$$" matters. Linearization is usually very good for inputs close to $$a$$, but the error can grow as the input moves farther away.

This idea also explains why derivatives are useful for estimation: a small input change $$\Delta x$$ creates an approximate output change

$$
\Delta y\approx f'(a)\Delta x.
$$

---

## Differentiability from graphs

From a graph, differentiability fails at places where the tangent slope is not a single finite number.

Common visual signs:

- a corner has two different one-sided slopes,
- a cusp has slopes that become infinitely steep in opposite directions,
- a vertical tangent has an infinite slope,
- a discontinuity cannot be differentiable.

A smooth-looking graph is not a proof by itself, but it gives a strong clue about where derivative values may exist.

---

## Derivative rule intuition

The power rule says that powers become one degree lower because the most important local change in $$x^n$$ comes from the linear term created by expanding $$(x+h)^n$$.

The product rule has two terms because both factors can change:

$$
(fg)'=f'g+fg'.
$$

The quotient rule is a product rule combined with the derivative of a reciprocal. Remember that the denominator is squared because the reciprocal function contributes a negative second power.

---

## Common mistakes

- Confusing the derivative at a point with the derivative function.
- Forgetting the product rule and differentiating term-by-term incorrectly.
- Using the quotient rule with the wrong sign in the numerator.
- Treating speed and velocity as the same thing.
