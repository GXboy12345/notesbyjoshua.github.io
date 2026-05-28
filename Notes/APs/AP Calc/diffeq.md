---
layout: default
title: "Unit 7: Differential Equations"
parent: "AP Calculus AB/BC"
nav_order: 7
permalink: /notes/math/diffeq/
---

# Unit 7: Differential Equations

Differential equations describe how a quantity changes rather than giving the quantity directly. In AP Calculus, the focus is on slope fields, separable equations, logistic models, and interpreting solution behavior.

---

## General and particular solutions

A differential equation relates a function and its derivatives.

:::example{title="dy/dx = 3x²"}
Example:

$$
\frac{dy}{dx} = 3x^2
$$

has general solution

$$
y = x^3 + C.
$$

If an initial condition is given, such as $$y(1)=5$$, you solve for the constant to get the particular solution.
:::

---

## Slope fields

A slope field shows small line segments representing $$dy/dx$$ at many points.

:::tip
To analyze a slope field:

- look for where slopes are zero,
- look for where slopes are positive/negative,
- identify equilibrium solutions,
- sketch a solution curve that follows the segment directions.
:::

:::note
[Image Placeholder: slope field with equilibrium solution and sample integral curves]
:::

---

## Euler's method

:::key{name="Euler's method"}
Starting from $$(x_0,y_0)$$ with step size $$h$$:

$$
y_{n+1} = y_n + h f(x_n,y_n)
$$

where

$$
\frac{dy}{dx} = f(x,y).
$$
:::

---

## Separable differential equations

:::theorem{name="Separable differential equations"}
If

$$
\frac{dy}{dx} = g(x)h(y),
$$

rewrite as

$$
\frac{1}{h(y)}\,dy = g(x)\,dx
$$

and integrate both sides.
:::

---

## Exponential growth and decay

If the rate of change is proportional to the amount present:

:::key{name="Exponential growth and decay"}
$$
\frac{dy}{dt} = ky
$$

then

$$
y = Ce^{kt}.
$$
:::

---

## Logistic differential equation

The logistic model is

:::key{name="Logistic differential equation"}
$$
\frac{dy}{dt} = ky\left(1-\frac{y}{L}\right)
$$

where $$L$$ is the carrying capacity.
:::

Behavior:

- equilibrium solutions at $$y=0$$ and $$y=L$$,
- growth is fastest near $$y=L/2$$,
- solutions below $$L$$ increase toward $$L$$.

---

## Equilibrium solutions and stability

:::theorem{name="Equilibrium solutions and stability"}
Equilibrium solutions are constant solutions where $$dy/dx = 0$$.

Stability:

- stable if nearby solutions move toward it,
- unstable if nearby solutions move away.
:::

:::tip
For autonomous equations $$dy/dx = f(y)$$, a sign chart on $$f(y)$$ is an efficient way to classify equilibria.
:::

---

## Second derivative from a differential equation

:::theorem{name="Second derivative from a differential equation"}
If

$$
\frac{dy}{dx} = f(x,y),
$$

then

$$
\frac{d^2y}{dx^2}
$$

often comes from differentiating implicitly:

$$
\frac{d^2y}{dx^2}
=
\frac{d}{dx}[f(x,y)].
$$
:::

This helps determine concavity of solution curves.

---

## Common mistakes

:::warning
- Separating variables incorrectly.
- Forgetting the constant of integration.
- Solving for the constant before using the initial condition carefully.
- Sketching slope-field solutions that cross each other or violate the displayed slope directions.
:::
