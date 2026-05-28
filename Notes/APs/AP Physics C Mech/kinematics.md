---
layout: default
title: 1D and 2D Kinematics
nav_title: "Unit 1: 1D and 2D Kinematics"
parent: AP Physics C Mechanics
nav_order: 1
permalink: /notes/ap/ap-physics-c-mechanics/kinematics/
---

# 1D and 2D Kinematics

:::theorem{name="Kinematics"}
**Kinematics** describes motion—position, velocity, and acceleration as functions of time—without asking what forces cause that motion. From here on, calculus is assumed: instantaneous rates are derivatives of position or velocity, and changes over an interval can be recovered with integrals when you know how acceleration varies.
:::

---

## Useful Variables

- $$t$$ = time (Units: seconds ($$s$$))
- $$x$$ or $$s$$ = displacement (Units: meters ($$m$$))
- $$v$$ = velocity (Units $$\frac{m}{s}$$)
- $$a$$ = acceleration (Units $$\frac{m}{s^2}$$)
- $$g$$ = acceleration due to Earth's gravity = $$9.8 \frac{m}{s^2}$$
- $$h$$ = height (Units: $$m$$)
- $$R$$ = range (Units: $$m$$)

---

## Scalars, vectors, and describing motion

A **scalar** has magnitude only (examples: speed, distance, time). A **vector** has magnitude and direction (examples: displacement, velocity, acceleration). In one dimension, a sign attached to a scalar component encodes direction along an axis.

Choose an origin and a positive direction along each axis. Displacement $$\Delta x$$ is the change in position; distance is the length of the path traveled and is always nonnegative. **Average velocity** over an interval is

$$
\bar{v} = \frac{\Delta x}{\Delta t}.
$$

**Instantaneous velocity** is the time derivative of position when position is given as a function $$x(t)$$:

$$
v = \frac{dx}{dt}.
$$

**Speed** is the magnitude of velocity, $$|v|$$, in one dimension.

**Average acceleration** is

$$
\bar{a} = \frac{\Delta v}{\Delta t}.
$$

**Instantaneous acceleration** is the derivative of velocity with respect to time, equivalently the second derivative of position:

$$
a = \frac{dv}{dt} = \frac{d^2x}{dt^2}.
$$

:::key{name="Velocity from acceleration"}
If you know $$a(t)$$, the change in velocity between times $$t_1$$ and $$t_2$$ follows from integration:

$$
v(t_2) - v(t_1) = \int_{t_1}^{t_2} a(t)\, dt,
$$

and similarly position from velocity.
:::

---

## Constant acceleration in one dimension

Many problems use constant acceleration $$a$$ (free fall near Earth’s surface is a common case with $$a = -g$$ or $$a = +g$$ depending on axis choice). With initial position $$x_0$$ and initial velocity $$v_0$$ at $$t = 0$$,

:::theorem{name="Big Five"}
1. $$\Delta x = vt$$ (if $$a$$ = 0)
2. $$\Delta v = at$$
3. $$\Delta x = v_0 \Delta t + \frac{1}{2} a (\Delta t)^2$$
4. $$\Delta x = \Delta v_f t - \frac{1}{2} a (\Delta t)^2$$
5. $$v^2 = v_0^2 + 2a(\Delta x)$$

These are algebraic consequences of $$a = dv/dt$$ constant and $$v = dx/dt$$. The five equations are sometimes called the Big Five.
:::

Equation 5 is useful when time is unknown but initial and final velocities are known.

:::warning
Always check that your signs for $$v_0$$ and $$a$$ match the coordinate system.
:::

---

## Two dimensions and projectile motion

In 2D, vectors can be broken down into $$x$$- and $$y$$-components. For **projectile motion** with negligible air resistance, horizontal acceleration is zero and vertical acceleration is $$g$$ downward (again, signs depend on whether you call “up” positive $$y$$ or not). The motions along $$x$$ and $$y$$ are independent except that they share the same time parameter $$t$$.

With initial speed $$v_0$$ at launch angle $$\theta$$ above the horizontal,

$$
v_{0x} = v_0 \cos\theta, v_{0y} = v_0 \sin\theta.
$$

Typical component equations (up is positive $$y$$, gravity is downward) then become:

$$
x = x_0 + v_{0x} t, \qquad y = y_0 + v_{0y} t - \frac{1}{2} g t^2,
$$

$$
v_x = v_{0x}, \qquad v_y = v_{0y} - gt.
$$

:::warning
Remember: ALWAYS make sure you know which direction you define as positive y!
:::

The trajectory in the vertical plane is a parabola until the object hits something.

If launch and landing occur at the same height, the shortcuts for range, height, and time on level ground is:

:::key{name="Level-ground projectile shortcuts"}
$$
R = \frac{v_0^2 \sin(2\theta)}{g},
$$

$$
h = \frac{v_0^2 \sin^2 (\theta)}{2g},
$$

and

$$
t = \frac{v_0 \sin(\theta)}{g},
$$
:::

:::note
If launch and landing heights differ, solve the quadratic in $$t$$ from the $$y$$ equation rather than memorizing these shortcuts.
:::

---

## Relative velocity (introduction)

The velocity of object $$A$$ relative to object $$B$$ is written $$\vec{v}_{A/B}$$. With three objects (or frames), the usual composition rule is

:::theorem{name="Relative velocity composition"}
$$
\vec{v}_{A/C} = \vec{v}_{A/B} + \vec{v}_{B/C}.
$$
:::

Add vectors component-wise. This idea appears again with rotating frames later; for now, restrict to inertial frames in uniform relative motion. You can find more on the [USAPhO section on mechanics]({{ '/notes/physics/advmech/' | relative_url }}).
