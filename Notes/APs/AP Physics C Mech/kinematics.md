---
layout: default
title: 1D and 2D Kinematics
nav_title: "Unit 1: 1D and 2D Kinematics"
parent: AP Physics C Mechanics
nav_order: 1
permalink: /notes/physics/kinematics/
---

# 1D and 2D Kinematics

**Kinematics** describes motion—position, velocity, and acceleration as functions of time—without asking what forces cause that motion. From here on, calculus is assumed: instantaneous rates are derivatives of position or velocity, and changes over an interval can be recovered with integrals when you know how acceleration varies.

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

## Scalars, vectors, and basic definitions of describing motion

A **scalar** has magnitude only (examples: speed, distance, time). A **vector** has magnitude and direction (examples: displacement, velocity, acceleration). In one dimension, a sign attached to a scalar component encodes direction along an axis.

Choose an origin and a positive direction along each axis. **Displacement** $$\Delta x$$ is the change in position regardless of what path you take; **distance** is the length of the path traveled and is always nonnegative. **Average velocity** over an interval is

$$
\bar{v} = \frac{\Delta x}{\Delta t}.
$$

**Instantaneous velocity** is the time derivative of position when position is given as a function $$x(t)$$:

$$
v = \frac{dx}{dt}.
$$

**Speed** is the magnitude of velocity, $$\lvert v \rvert$$, in one dimension.

**Average acceleration** is defined as:

$$
\bar{a} = \frac{\Delta v}{\Delta t}.
$$

**Instantaneous acceleration** is the derivative of velocity with respect to time, equivalently the second derivative of position:

$$
a = \frac{dv}{dt} = \frac{d^2x}{dt^2}.
$$

If you know $$a(t)$$, the change in velocity between times $$t_1$$ and $$t_2$$ follows from integration:

$$
v(t_2) - v(t_1) = \int_{t_1}^{t_2} a(t)\, dt,
$$

and similarly position from velocity.

---

## Constant acceleration in one dimension

Many problems use constant acceleration $$a$$ (free fall near Earth’s surface is a common case with $$a = -g$$ or $$a = +g$$ depending on axis choice). The following equations (known as the **Big Five** (holy niche bro)) are very useful for these types of problems, since they only require 4 out of the 5 useful variables ($$a$$, $$v_f$$, $$v_0$$, $$\Delta x$$, $$t$$). By convention, we set $$t_0 = 0$$, with $$a$$ being acceleration, $$v_0$$ being initial velocity, $$v_f$$ being final velocity, $$\Delta x$$ being displacement, and $$t$$ being time:

1. Missing $$\Delta x$$: $$v_f = v_0 + at$$
2. Missing $$v_f$$: $$\Delta x = v_0t + \frac{1}{2}at^2$$
3. Missing $$v_0$$: $$\Delta x = v_f t - \frac{1}{2}at^2$$
4. Missing $$t$$: $$v^2 = v_0^2 + 2a\Delta x$$
5. Missing $$a$$: $$\Delta x = \frac{v_0+v_f}{2}t$$

These are algebraic consequences of $$a = dv/dt$$ constant and $$v = dx/dt$$. They are only valid for **constant acceleration** (for non-constant acceleration, you need to use other methods). If $$a=0$$, they reduce to the constant-velocity result $$\Delta x=vt$$.

<div class="theorem-box" markdown="1">

**Proof (The Big Five).** Start with constant acceleration:

$$
a=\frac{dv}{dt}.
$$

Since $$a$$ is constant, integrate from $$0$$ to $$t$$:

$$
\int_{v_0}^{v}dv=\int_0^t a\,dt.
$$

This gives

$$
v-v_0=at,
$$

so

$$
v=v_0+at.
$$

That proves equation 1.

Since velocity is the derivative of position,

$$
v=\frac{dx}{dt}.
$$

Using $$v(t)=v_0+at$$,

$$
\Delta x=\int_0^t v(t)\,dt=\int_0^t (v_0+at)\,dt.
$$

Therefore

$$
\Delta x=v_0t+\frac{1}{2}at^2.
$$

That proves equation 2.

Solve equation 1 for the initial velocity:

$$
v_0=v-at.
$$

Substitute into equation 2:

$$
\Delta x=(v-at)t+\frac{1}{2}at^2.
$$

So

$$
\Delta x=vt-\frac{1}{2}at^2.
$$

That proves equation 3.

To eliminate time, use the chain rule:

$$
a=\frac{dv}{dt}=\frac{dv}{dx}\frac{dx}{dt}=v\frac{dv}{dx}.
$$

Then

$$
a\,dx=v\,dv.
$$

Integrate from $$x_0$$ to $$x$$ and from $$v_0$$ to $$v$$:

$$
\int_{x_0}^{x}a\,dx=\int_{v_0}^{v}v\,dv.
$$

So

$$
a\Delta x=\frac{1}{2}(v^2-v_0^2),
$$

which rearranges to

$$
v^2=v_0^2+2a\Delta x.
$$

That proves equation 4.

Finally, for constant acceleration, the velocity-time graph is a straight line, so displacement is the area under that graph: a trapezoid with bases $$v_0$$ and $$v$$ and width $$t$$. Thus

$$
\Delta x=\frac{v_0+v}{2}t.
$$

That proves equation 5.

</div>

Always check that your signs for $$v_0$$, $$v$$, $$a$$, and $$\Delta x$$ match the coordinate system and always be consistent with your definitions (e.g. if you take up as $$+y$$ then gravity has negative acceleration).

---

## Two dimensions and projectile motion

In 2D, vectors can be broken down into $$x$$- and $$y$$-components. For **projectile motion** with negligible air resistance (meaning you throw something in the air or something is launched), horizontal acceleration is zero and vertical acceleration is $$g$$ downward (again, signs depend on whether you call “up” positive $$y$$ or not). The motions along $$x$$ and $$y$$ are independent except that they share the same time parameter $$t$$.

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

Remember: ALWAYS make sure you know which direction you define as $$+y$$! The trajectory in the vertical plane is a parabola until the object hits something.

If launch and landing occur at the same height, the shortcuts for range, maximum height, and total flight time on level ground are:

$$
R = \frac{v_0^2 \sin(2\theta)}{g},
$$

$$
h = \frac{v_0^2 \sin^2 (\theta)}{2g},
$$

$$
T = \frac{2v_0 \sin(\theta)}{g}.
$$

<div class="theorem-box" markdown="1">

**Extension.** Derive the shortcut formulas using the projectile motion equations.

</div>

If launch and landing heights differ, solve the quadratic in $$t$$ from the $$y$$ equation rather than memorizing these shortcuts.

---

## Relative velocity (introduction)

The velocity of object $$A$$ relative to object $$B$$ is written $$\vec{v}_{A/B}$$. With three objects (or frames), the usual composition rule is

$$
\vec{v}_{A/C} = \vec{v}_{A/B} + \vec{v}_{B/C}.
$$

To visualize, you can draw the velocities as vectors, and do vector addition to get your final result. You can find more on the [USAPhO section on mechanics]({{ '/notes/physics/advmech/' | relative_url }}).
