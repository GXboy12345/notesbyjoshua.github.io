---
layout: default
title: Linear Momentum and Impulse
nav_title: "Unit 4: Linear Momentum and Impulse"
parent: AP Physics C Mechanics
nav_order: 4
permalink: /notes/physics/linearmomentum/
---

# Linear Momentum and Impulse

**Momentum** is the quantity conserved when external forces do not significantly affect a system. It is especially useful for collisions, explosions, variable-mass interactions at the AP level only when simplified, and short-duration events where forces may be large but act briefly.

---

## Useful Variables

- $$\vec{p}$$ = linear momentum (Units: $$\text{kg}\cdot\text{m/s}$$)
- $$\vec{J}$$ = impulse (Units: $$\text{N}\cdot\text{s}$$)
- $$\vec{F}_{\text{net}}$$ = net external force
- $$M$$ = total mass of a system
- $$\vec{r}_{\text{cm}}$$ = center-of-mass position
- $$\vec{v}_{\text{cm}}$$ = center-of-mass velocity

---

## Linear Momentum

The momentum of a particle is

$$
\vec{p} = m\vec{v}.
$$

Momentum is a vector, so components must be conserved independently. Newton's second law can be written in its more general form as

$$
\vec{F}_{\text{net}} = \frac{d\vec{p}}{dt}.
$$

For constant mass, this reduces to $$\vec{F}_{\text{net}} = m\vec{a}$$.

---

## Impulse

**Impulse** is the change in momentum caused by a force acting over time:

$$
\vec{J} = \int_{t_i}^{t_f} \vec{F}_{\text{net}}\,dt = \Delta \vec{p}.
$$

For a constant force,

$$
\vec{J} = \vec{F}_{\text{net}}\Delta t.
$$

On a force-time graph, impulse is the signed area under the curve. During a collision, the peak force may be hard to model, but the impulse can often be found from the initial and final momenta.

---

## Conservation of Momentum

For a system of particles,

$$
\frac{d\vec{P}_{\text{sys}}}{dt} = \sum \vec{F}_{\text{ext}}.
$$

If the net external force on the system is zero, or if its impulse is negligible during the event,

$$
\vec{P}_{i} = \vec{P}_{f}.
$$

Internal forces cancel in pairs by Newton's third law, so they cannot change the total momentum of the system. They can, however, redistribute momentum among the objects inside the system.

---

## Center of Mass

For discrete particles,

$$
\vec{r}_{\text{cm}} = \frac{1}{M}\sum_i m_i\vec{r}_i,
$$

where

$$
M = \sum_i m_i.
$$

For a continuous body,

$$
\vec{r}_{\text{cm}} = \frac{1}{M}\int \vec{r}\,dm.
$$

The center of mass moves as if all external force acted on the total mass:

$$
\sum \vec{F}_{\text{ext}} = M\vec{a}_{\text{cm}}.
$$

The total momentum of a system is

$$
\vec{P}_{\text{sys}} = M\vec{v}_{\text{cm}}.
$$

---

## Collisions

All collisions conserve momentum for an isolated system. Kinetic energy may or may not be conserved.

An **elastic collision** conserves both momentum and kinetic energy:

$$
\vec{P}_i = \vec{P}_f, \qquad K_i = K_f.
$$

An **inelastic collision** conserves momentum but not kinetic energy. Some mechanical energy becomes internal energy, deformation, heat, or sound.

A **perfectly inelastic collision** is the special case where objects stick together after impact:

$$
m_1\vec{v}_{1i}+m_2\vec{v}_{2i} = (m_1+m_2)\vec{v}_f.
$$

Do not use conservation of kinetic energy unless the collision is explicitly elastic.

---

## One-Dimensional Elastic Collision Relations

For a one-dimensional elastic collision between masses $$m_1$$ and $$m_2$$, conservation of momentum and kinetic energy imply that the relative speed reverses:

$$
v_{1i}-v_{2i}=-(v_{1f}-v_{2f}).
$$

Solving with momentum conservation gives

$$
v_{1f}=\frac{m_1-m_2}{m_1+m_2}v_{1i}+\frac{2m_2}{m_1+m_2}v_{2i},
$$

$$
v_{2f}=\frac{2m_1}{m_1+m_2}v_{1i}+\frac{m_2-m_1}{m_1+m_2}v_{2i}.
$$

These formulas are useful, but the underlying conservation laws are usually safer.

---

## Explosions and Recoil

In an explosion, internal energy becomes kinetic energy. Momentum is conserved if external impulse is negligible:

$$
\sum \vec{p}_{\text{before}} = \sum \vec{p}_{\text{after}}.
$$

Kinetic energy usually increases because stored chemical, elastic, or nuclear energy is converted into motion. This is the opposite energy pattern from an inelastic collision.

---

## Momentum in Two Dimensions

In two dimensions, conserve components separately:

$$
\sum p_{x,i} = \sum p_{x,f}, \qquad \sum p_{y,i} = \sum p_{y,f}.
$$

Angles enter through vector components. The momentum vector triangle is often more important than speed alone, because momentum depends on both mass and velocity.
