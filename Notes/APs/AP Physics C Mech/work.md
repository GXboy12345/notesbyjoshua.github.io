---
layout: default
title: Work, Energy, and Power
nav_title: "Unit 3: Work, Energy, and Power"
parent: AP Physics C Mechanics
nav_order: 3
permalink: /notes/physics/work/
---

# Work, Energy, and Power

**Energy methods** turn many dynamics problems into bookkeeping. Instead of tracking every force through time, we track the work forces do and how that work changes kinetic, potential, and mechanical energy. This unit connects directly to [forces]({{ '/notes/physics/forces/' | relative_url }}) because work is still caused by forces, but it often avoids solving Newton's second law as a differential equation.

---

## Useful Variables

- $$W$$ = work (Units: joules, $$\text{J}$$)
- $$K$$ = kinetic energy (Units: $$\text{J}$$)
- $$U$$ = potential energy (Units: $$\text{J}$$)
- $$E$$ = total mechanical energy (Units: $$\text{J}$$)
- $$P$$ = power (Units: watts, $$\text{W} = \text{J/s}$$)
- $$\vec{F}$$ = force
- $$\vec{r}$$ = position vector
- $$x$$ = one-dimensional position or displacement
- $$k$$ = spring constant

---

## Work

**Work** measures energy transferred by a force acting through a displacement. For a constant force,

$$
W = \vec{F}\cdot \Delta \vec{r} = F\Delta r\cos\theta.
$$

Only the component of force parallel to displacement does work. A perpendicular force can change direction without changing speed, so it does no work at that instant.

For a variable force, use the line integral

$$
W = \int_C \vec{F}\cdot d\vec{r}.
$$

In one dimension this becomes

$$
W = \int_{x_i}^{x_f} F_x(x)\, dx,
$$

the signed area under the force-position graph.

---

## Kinetic Energy and the Work-Energy Theorem

Translational kinetic energy is

$$
K = \frac{1}{2}mv^2.
$$

The **work-energy theorem** says that the net work done on a particle equals the change in kinetic energy:

$$
W_{\text{net}} = \Delta K.
$$

This follows from Newton's second law:

$$
W_{\text{net}} = \int \vec{F}_{\text{net}}\cdot d\vec{r}
= \int m\frac{d\vec{v}}{dt}\cdot \vec{v}\,dt
= \int m\vec{v}\cdot d\vec{v}
= \frac{1}{2}mv_f^2-\frac{1}{2}mv_i^2.
$$

This derivation is worth knowing because it explains why energy methods remain valid even when force varies with position.

---

## Conservative Forces and Potential Energy

A force is **conservative** if its work depends only on the initial and final positions, not on the path taken. Equivalently,

$$
\oint \vec{F}\cdot d\vec{r} = 0
$$

around any closed path. For a conservative force, define potential energy $$U$$ by

$$
W_{\text{cons}} = -\Delta U.
$$

In one dimension,

$$
F_x = -\frac{dU}{dx}.
$$

In three dimensions,

$$
\vec{F} = -\nabla U.
$$

Potential energy is not an absolute property; it requires a reference level. Only changes in potential energy affect mechanics.

---

## Gravitational Potential Energy

Near Earth's surface, where $$g$$ is approximately constant,

$$
U_g = mgy
$$

if $$U_g = 0$$ is chosen at $$y=0$$. The change in gravitational potential energy is

$$
\Delta U_g = mg\Delta y.
$$

For universal gravitation, the natural zero is at infinity:

$$
U_g(r) = -\frac{GMm}{r}.
$$

The negative sign means a bound mass has less energy than it would have infinitely far away.

---

## Spring Potential Energy

For an ideal spring,

$$
F_s = -kx.
$$

The potential energy stored in the spring is

$$
U_s = \frac{1}{2}kx^2,
$$

where $$x$$ is displacement from equilibrium. The force is the negative derivative:

$$
F_s = -\frac{d}{dx}\left(\frac{1}{2}kx^2\right) = -kx.
$$

The spring does negative work when stretched farther from equilibrium and positive work when returning toward equilibrium.

---

## Conservation of Mechanical Energy

Mechanical energy is

$$
E_{\text{mech}} = K + U.
$$

If only conservative forces do work,

$$
K_i + U_i = K_f + U_f.
$$

If nonconservative forces such as kinetic friction, air drag, or applied pushes do work, then

$$
K_i + U_i + W_{\text{nc}} = K_f + U_f.
$$

Equivalently,

$$
W_{\text{nc}} = \Delta E_{\text{mech}}.
$$

Friction usually decreases mechanical energy and converts it into thermal energy, so $$W_f$$ is usually negative for a sliding object.

---

## Energy Diagrams and Equilibrium

In one-dimensional systems, a graph of $$U(x)$$ contains force information:

$$
F_x = -\frac{dU}{dx}.
$$

Equilibrium occurs where

$$
\frac{dU}{dx}=0.
$$

The equilibrium is **stable** if $$U(x)$$ has a local minimum, **unstable** if it has a local maximum, and **neutral** if small displacements do not change $$U$$ to second order.

Turning points occur where $$K=0$$, so

$$
E = U(x).
$$

The particle can move only in regions where $$E\ge U(x)$$ because kinetic energy cannot be negative.

---

## Power

**Power** is the rate of energy transfer:

$$
P = \frac{dW}{dt}.
$$

For a force acting on an object with instantaneous velocity $$\vec{v}$$,

$$
P = \vec{F}\cdot \vec{v}.
$$

Average power over a time interval is

$$
\bar{P} = \frac{\Delta E}{\Delta t}.
$$

Power is not a new kind of energy; it is how quickly energy is transferred or transformed.
