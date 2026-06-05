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

A parametric curve is given by

$$
x = f(t), \qquad y = g(t).
$$

The same geometric curve can be traced in different ways depending on how $$t$$ changes.

---

## Derivatives for parametric curves

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

> [Image Placeholder: parametric curve with tangent vectors and repeated tracing]

---

## Second derivative for parametric curves

$$
\frac{d^2y}{dx^2}
=
\frac{d}{dt}\left(\frac{dy}{dx}\right)\Big/ \frac{dx}{dt}.
$$

---

## Speed and arc length

For a particle moving with position

$$
\langle x(t), y(t) \rangle,
$$

speed is

$$
\sqrt{[x'(t)]^2 + [y'(t)]^2}.
$$

Arc length from $$t=a$$ to $$t=b$$:

$$
L = \int_a^b \sqrt{[x'(t)]^2 + [y'(t)]^2}\,dt.
$$

---

## Polar coordinates

Connections to rectangular coordinates:

$$
x = r\cos\theta, \qquad y = r\sin\theta
$$

$$
r^2 = x^2 + y^2.
$$

Different polar pairs can describe the same point because adding $$2\pi$$ to $$\theta$$ changes nothing and negative $$r$$ reflects through the origin.

---

## Slope in polar form

If $$r=f(\theta)$$, then

$$
\frac{dy}{dx}
=
\frac{r'(\theta)\sin\theta + r(\theta)\cos\theta}
{r'(\theta)\cos\theta - r(\theta)\sin\theta}.
$$

---

## Area in polar coordinates

Area swept from $$\theta=a$$ to $$\theta=b$$:

$$
A = \frac12 \int_a^b [r(\theta)]^2\,d\theta.
$$

> [Image Placeholder: sector approximation leading to polar area formula]

---

## Arc length in polar form

If $$r=f(\theta)$$, then arc length is

$$
L = \int_a^b \sqrt{[r(\theta)]^2 + [r'(\theta)]^2}\,d\theta.
$$

---

## Vector-valued functions

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

---

## Parametric curves as motion

Parametric equations describe a curve by telling where a point is at each parameter value:

$$
x=f(t),\qquad y=g(t).
$$

The parameter $$t$$ often represents time, but it does not have to. The same set of points can be traced at different speeds or in different directions depending on the parametrization.

This means a parametric curve has two layers:

- the geometric path,
- the motion along that path.

AP questions may ask about either one.

---

## Tangents and direction

The derivative

$$
\frac{dy}{dx}=\frac{dy/dt}{dx/dt}
$$

compares vertical change to horizontal change along the parametric motion.

A horizontal tangent occurs when vertical motion is momentarily zero while horizontal motion is not:

$$
\frac{dy}{dt}=0,\qquad \frac{dx}{dt}\ne0.
$$

A vertical tangent occurs when horizontal motion is momentarily zero while vertical motion is not:

$$
\frac{dx}{dt}=0,\qquad \frac{dy}{dt}\ne0.
$$

If both derivatives are zero, the test is inconclusive because the particle may be stopped, changing direction, or passing through a more complicated point.

---

## Parametric accumulation

For parametric motion,

$$
\langle x'(t),y'(t)\rangle
$$

is the velocity vector. Its magnitude is speed:

$$
\sqrt{[x'(t)]^2+[y'(t)]^2}.
$$

Integrating speed gives distance traveled:

$$
\int_a^b \sqrt{[x'(t)]^2+[y'(t)]^2}\,dt.
$$

This is different from displacement, which compares only the starting and ending position vectors.

---

## Polar coordinates intuition

In polar coordinates, a point is located by radius and angle:

$$
(r,\theta).
$$

The radius tells distance from the pole, and the angle tells direction. If $$r$$ is negative, the point is plotted in the opposite direction from the angle.

Because angles can differ by multiples of $$2\pi$$, polar representations are not unique. The same point can have many coordinate pairs.

---

## Polar slopes

For a polar curve $$r=f(\theta)$$, convert mentally to parametric form:

$$
x=r\cos\theta,\qquad y=r\sin\theta.
$$

Then

$$
\frac{dy}{dx}
=
\frac{dy/d\theta}{dx/d\theta}.
$$

That is where the polar slope formula comes from. The numerator describes vertical change with respect to angle, and the denominator describes horizontal change with respect to angle.

---

## Polar area

Polar area comes from adding thin sectors. A sector with radius $$r$$ and tiny angle width $$d\theta$$ has area approximately

$$
\frac12 r^2\,d\theta.
$$

Adding these sectors gives

$$
A=\frac12\int_a^b [r(\theta)]^2\,d\theta.
$$

If a curve is traced more than once over an interval, the integral counts the repeated tracing. Choose angle bounds that trace the intended region exactly once whenever possible.

---

## Vector-valued motion

For

$$
\mathbf r(t)=\langle x(t),y(t)\rangle,
$$

velocity is

$$
\mathbf v(t)=\mathbf r'(t),
$$

and acceleration is

$$
\mathbf a(t)=\mathbf r''(t).
$$

Speed is the magnitude of velocity:

$$
|\mathbf v(t)|.
$$

The direction of motion is given by the velocity vector, while acceleration describes how the velocity vector changes.

---

## Component thinking

Vector calculus in AP BC is mostly ordinary single-variable calculus applied component by component:

$$
\frac{d}{dt}\langle f(t),g(t)\rangle
=
\langle f'(t),g'(t)\rangle.
$$

Similarly,

$$
\int \langle f(t),g(t)\rangle\,dt
=
\left\langle\int f(t)\,dt,\int g(t)\,dt\right\rangle.
$$

After doing the component work, interpret the result as a vector, speed, distance, slope, or position depending on the question.

---

## Common mistakes

- Forgetting that $$dy/dx$$ for parametric or polar curves is a ratio of derivatives.
- Declaring a vertical tangent whenever the denominator is zero without checking the numerator.
- Losing track of the interval of parameter values or angles actually tracing the region.
- Forgetting that polar curves can retrace themselves.
