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

A differential equation relates a function and its derivatives. A **general solution** contains a constant of integration, so it represents a family of functions.

If an initial condition is given, such as $$y(1)=5$$, you solve for the constant to get the particular solution.

---

## Slope fields

A slope field shows small line segments representing $$dy/dx$$ at many points.

To analyze a slope field:

- look for where slopes are zero,
- look for where slopes are positive/negative,
- identify equilibrium solutions,
- sketch a solution curve that follows the segment directions.

> [Image Placeholder: slope field with equilibrium solution and sample integral curves]

---

## Euler's method

Starting from $$(x_0,y_0)$$ with step size $$h$$:

$$
y_{n+1} = y_n + h f(x_n,y_n)
$$

where

$$
\frac{dy}{dx} = f(x,y).
$$

---

## Separable differential equations

If

$$
\frac{dy}{dx} = g(x)h(y),
$$

rewrite as

$$
\frac{1}{h(y)}\,dy = g(x)\,dx
$$

and integrate both sides.

---

## Exponential growth and decay

If the rate of change is proportional to the amount present:

$$
\frac{dy}{dt} = ky
$$

then

$$
y = Ce^{kt}.
$$

<div class="theorem-box" markdown="1">

**Why proportional growth gives exponentials.** If

$$
\frac{dy}{dt}=ky,
$$

then the relative rate of change is constant:

$$
\frac{1}{y}\frac{dy}{dt}=k.
$$

Integrating gives

$$
\ln|y|=kt+C.
$$

Exponentiating both sides gives

$$
y=Ce^{kt}.
$$

So exponentials are the natural functions whose rate of change stays proportional to their current value.

</div>

---

## Logistic differential equation

The logistic model is

$$
\frac{dy}{dt} = ky\left(1-\frac{y}{L}\right)
$$

where $$L$$ is the carrying capacity.

Behavior:

- equilibrium solutions at $$y=0$$ and $$y=L$$,
- growth is fastest near $$y=L/2$$,
- solutions below $$L$$ increase toward $$L$$.

<div class="theorem-box" markdown="1">

**Why logistic growth slows down.** The factor

$$
1-\frac{y}{L}
$$

measures how much room remains before the carrying capacity. When $$y$$ is small, this factor is close to $$1$$, so the model behaves almost exponentially. When $$y$$ is close to $$L$$, this factor is close to $$0$$, so the growth rate becomes small. At $$y=L$$, the growth rate is exactly $$0$$.

</div>

---

## Equilibrium solutions and stability

Equilibrium solutions are constant solutions where $$dy/dx = 0$$.

Stability:

- stable if nearby solutions move toward it,
- unstable if nearby solutions move away.

For autonomous equations $$dy/dx = f(y)$$, a sign chart on $$f(y)$$ is an efficient way to classify equilibria.

---

## Second derivative from a differential equation

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

This helps determine concavity of solution curves.

---

## What differential equations describe

A differential equation usually does not tell you the value of a function directly. It tells you how the function changes.

For

$$
\frac{dy}{dx}=f(x,y),
$$

the slope at a point depends on the coordinates of that point. A solution curve is a function whose tangent slope matches the differential equation everywhere it passes through.

This is why slope fields are useful: they show the local direction a solution must follow before you solve anything symbolically.

---

## Slope fields as visual solutions

In a slope field, each small segment represents the slope assigned by the differential equation at that point.

Useful things to notice:

- rows or columns where slopes repeat,
- places where slopes are zero,
- regions where slopes are positive or negative,
- equilibrium solutions,
- whether solution curves appear to move toward or away from equilibria.

Solution curves should follow the little segments smoothly. They should not cross each other for the same initial value problem because one input-output point should determine one local direction.

---

## Euler's method intuition

Euler's method is repeated linear approximation. At each step, use the current slope to move forward:

$$
\text{new }y
=
\text{old }y
+
(\text{step size})(\text{slope at old point}).
$$

The approximation improves when the step size is smaller, but AP questions usually care more about setting up the method correctly than about perfect numerical accuracy.

Keep track of both coordinates:

$$
x_{n+1}=x_n+h,
$$

$$
y_{n+1}=y_n+h f(x_n,y_n).
$$

---

## Separating variables carefully

A separable equation has the variables separated into an $$x$$ part and a $$y$$ part:

$$
\frac{dy}{dx}=g(x)h(y).
$$

The goal is to move all $$y$$ factors with $$dy$$ and all $$x$$ factors with $$dx$$:

$$
\frac{1}{h(y)}\,dy=g(x)\,dx.
$$

Then integrate both sides. The constant of integration belongs after integration, and an initial condition turns the general solution into a particular solution.

---

## Exponential models

The model

$$
\frac{dy}{dt}=ky
$$

means the rate of change is proportional to the current amount.

If $$k>0$$, the quantity grows. If $$k<0$$, the quantity decays. The solution has the form

$$
y=Ce^{kt}.
$$

The constant $$C$$ is the initial amount when $$t=0$$, assuming the model starts at $$t=0$$.

---

## Logistic model behavior

The logistic equation

$$
\frac{dy}{dt}=ky\left(1-\frac{y}{L}\right)
$$

adds a limiting capacity. The factor $$y$$ makes growth proportional to the current population, while the factor

$$
1-\frac{y}{L}
$$

slows growth as $$y$$ approaches $$L$$.

The equilibrium solutions are $$y=0$$ and $$y=L$$. For positive populations below $$L$$, solutions increase toward $$L$$. Growth is fastest when $$y=L/2$$ because that is where the logistic rate is largest.

---

## Concavity of solution curves

For a differential equation, concavity often comes from differentiating the slope expression.

If

$$
\frac{dy}{dx}=f(x,y),
$$

then

$$
\frac{d^2y}{dx^2}
=
\frac{d}{dx}[f(x,y)].
$$

When differentiating, remember that $$y$$ depends on $$x$$. After finding $$d^2y/dx^2$$, use its sign to describe whether solution curves are concave up or concave down.

---

## Common mistakes

- Separating variables incorrectly.
- Forgetting the constant of integration.
- Solving for the constant before using the initial condition carefully.
- Sketching slope-field solutions that cross each other or violate the displayed slope directions.
