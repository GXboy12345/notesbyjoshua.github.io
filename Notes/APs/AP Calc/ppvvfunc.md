---
layout: default
title: "Unit 9: Parametric, Polar, and Vector-Valued Functions (BC-only)"
parent: "AP Calculus AB/BC"
nav_order: 9
permalink: /notes/math/ppvvfunc/
---

# Unit 9: Parametric, Polar, and Vector-Valued Functions (BC-only)

This BC-only unit generalizes single-variable calculus to curves traced in more flexible ways. Instead of always writing $$y$$ as an explicit function of $$x$$, we let both coordinates depend on a parameter or describe curves through angle and radius.

---

## Parametric equations

:::theorem{name="Parametric curve"}
A parametric curve is given by

$$
x = f(t), \qquad y = g(t).
$$
:::

:::note
The same geometric curve can be traced in different ways depending on how $$t$$ changes.
:::

---

## Derivatives for parametric curves

:::theorem{name="Parametric derivative"}
If $$dx/dt \ne 0$$, then

$$
\frac{dy}{dx} = \frac{dy/dt}{dx/dt}.
$$

Horizontal tangent:

$$
\frac{dy}{dt} = 0, \qquad \frac{dx}{dt} \ne 0
$$

Vertical tangent:

$$
\frac{dx}{dt} = 0, \qquad \frac{dy}{dt} \ne 0.
$$
:::

:::placeholder
[Image Placeholder: parametric curve with tangent vectors and repeated tracing]
:::

---

## Second derivative for parametric curves

:::theorem{name="Second parametric derivative"}
$$
\frac{d^2y}{dx^2}
=
\frac{d}{dt}\left(\frac{dy}{dx}\right)\Big/ \frac{dx}{dt}.
$$
:::

---

## Speed and arc length

For a particle moving with position

$$
\langle x(t), y(t) \rangle,
$$

:::key{name="Speed"}
$$
\sqrt{[x'(t)]^2 + [y'(t)]^2}.
$$
:::

Arc length from $$t=a$$ to $$t=b$$:

:::key{name="Parametric arc length"}
$$
L = \int_a^b \sqrt{[x'(t)]^2 + [y'(t)]^2}\,dt.
$$
:::

---

## Polar coordinates

:::theorem{name="Polar and rectangular coordinates"}
Connections to rectangular coordinates:

$$
x = r\cos\theta, \qquad y = r\sin\theta
$$

$$
r^2 = x^2 + y^2.
$$
:::

:::note
Different polar pairs can describe the same point because adding $$2\pi$$ to $$\theta$$ changes nothing and negative $$r$$ reflects through the origin.
:::

---

## Slope in polar form

:::theorem{name="Polar slope"}
If $$r=f(\theta)$$, then

$$
\frac{dy}{dx}
=
\frac{r'(\theta)\sin\theta + r(\theta)\cos\theta}
{r'(\theta)\cos\theta - r(\theta)\sin\theta}.
$$
:::

---

## Area in polar coordinates

Area swept from $$\theta=a$$ to $$\theta=b$$:

:::theorem{name="Polar area"}
$$
A = \frac12 \int_a^b [r(\theta)]^2\,d\theta.
$$
:::

:::placeholder
[Image Placeholder: sector approximation leading to polar area formula]
:::

---

## Arc length in polar form

:::theorem{name="Polar arc length"}
If $$r=f(\theta)$$, then arc length is

$$
L = \int_a^b \sqrt{[r(\theta)]^2 + [r'(\theta)]^2}\,d\theta.
$$
:::

---

## Vector-valued functions

:::theorem{name="Vector-valued functions"}
A vector-valued function in the plane is

$$
\mathbf{r}(t) = \langle x(t), y(t) \rangle
$$

and in space:

$$
\mathbf{r}(t) = \langle x(t), y(t), z(t) \rangle.
$$

Then

$$
\mathbf{r}'(t)
$$

gives velocity and

$$
\mathbf{r}''(t)
$$

gives acceleration.
:::

---

:::mistakes
- Forgetting that $$dy/dx$$ for parametric or polar curves is a ratio of derivatives.
- Declaring a vertical tangent whenever the denominator is zero without checking the numerator.
- Losing track of the interval of parameter values or angles actually tracing the region.
- Forgetting that polar curves can retrace themselves.
:::
