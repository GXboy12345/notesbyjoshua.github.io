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

:::theorem{name="Definition of the derivative"}
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

:::

:::placeholder
[Image Placeholder: secant lines approaching a tangent line]

:::

---

## Differentiability vs continuity

:::theorem{name="Differentiability implies continuity"}
If $$f$$ is differentiable at $$a$$, then $$f$$ is continuous at $$a$$.

:::

The converse is false. A function can be continuous but not differentiable because of:

:::warning
- corner,
- cusp,
- vertical tangent,
- discontinuity.

:::

---

## Basic derivative rules

:::theorem{name="Basic derivative rules"}
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

:::

---

## Derivatives of common functions

:::theorem{name="Derivatives of common functions"}
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

:::

---

## Tangent and normal lines

:::theorem{name="Tangent and normal lines"}
At $$x=a$$:

- tangent slope is $$f'(a)$$,
- tangent line is

$$
y - f(a) = f'(a)(x-a),
$$

- normal slope is $$-1/f'(a)$$ when $$f'(a) \ne 0$$.

:::

---

## Higher derivatives

The second derivative $$f''(x)$$ measures the rate of change of the first derivative.

:::note
Interpretations:

- concavity in pure math,
- acceleration in motion when $$f$$ is position.

:::

You may also see $$f^{(n)}(x)$$ for the $$n$$th derivative.

---

## Motion along a line

If $$s(t)$$ is position, then:

:::theorem{name="Motion along a line"}
$$
v(t) = s'(t)
$$

$$
a(t) = v'(t) = s''(t)
$$

:::

Velocity includes sign and direction; speed is $$\lvert v(t) \rvert$$.

:::tip
When velocity and acceleration have the same sign, speed is increasing. When signs differ, speed is decreasing.

:::

---

## Local linearity and linearization preview

:::theorem{name="Linearization"}
Near $$x=a$$,

$$
f(x) \approx f(a) + f'(a)(x-a).
$$

:::

This linearization is a first-order approximation and becomes useful for estimation and error analysis later.

---

## Differentiation from tables

If you only have values of $$f$$, use the difference quotient for an approximate derivative:

:::tip
$$
f'(a) \approx \frac{f(a+h)-f(a)}{h}
$$

or a symmetric estimate:

$$
f'(a) \approx \frac{f(a+h)-f(a-h)}{2h}.
$$

:::

---

:::mistakes
- Confusing the derivative at a point with the derivative function.
- Forgetting the product rule and differentiating term-by-term incorrectly.
- Using the quotient rule with the wrong sign in the numerator.
- Treating speed and velocity as the same thing.

:::
