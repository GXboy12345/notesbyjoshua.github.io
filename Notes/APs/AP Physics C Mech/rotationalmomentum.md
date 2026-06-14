---
layout: default
title: Energy and Momentum of Rotating Systems
nav_title: "Unit 6: Energy and Momentum of Rotating Systems"
parent: AP Physics C Mechanics
nav_order: 6
permalink: /notes/physics/rotationalmomentum/
---

# Energy and Momentum of Rotating Systems

This unit completes the rotation picture by adding rotational energy and angular momentum. The translational ideas from [work and energy]({{ '/notes/physics/work/' | relative_url }}) and [linear momentum]({{ '/notes/physics/linearmomentum/' | relative_url }}) have close angular analogs, but the axis choice matters more than it did before.

---

## Useful Variables

- $$K_{\text{rot}}$$ = rotational kinetic energy
- $$L$$ = angular momentum
- $$I$$ = rotational inertia
- $$\omega$$ = angular velocity
- $$\tau$$ = torque
- $$W_{\text{rot}}$$ = rotational work
- $$P$$ = power

---

## Rotational Kinetic Energy

A rigid body rotating with angular speed $$\omega$$ has rotational kinetic energy

$$
K_{\text{rot}} = \frac{1}{2}I\omega^2.
$$

For an object that both translates and rotates, total kinetic energy is

$$
K = \frac{1}{2}Mv_{\text{cm}}^2 + \frac{1}{2}I_{\text{cm}}\omega^2.
$$

This form is especially important for rolling objects. The translational term tracks motion of the center of mass; the rotational term tracks spinning about the center of mass.

<div class="theorem-box" markdown="1">

**Proof (Rotational Kinetic Energy).** Treat a rigid body as many small masses $$m_i$$. If the body rotates with angular speed $$\omega$$ about a fixed axis, the speed of mass $$m_i$$ is

$$
v_i=r_i\omega.
$$

Total kinetic energy is

$$
K=\sum_i \frac{1}{2}m_iv_i^2.
$$

Substitute $$v_i=r_i\omega$$:

$$
K=\sum_i \frac{1}{2}m_i(r_i\omega)^2
=\frac{1}{2}\omega^2\sum_i m_ir_i^2.
$$

Since

$$
I=\sum_i m_ir_i^2,
$$

we get

$$
K_{\text{rot}}=\frac{1}{2}I\omega^2.
$$

</div>

---

## Rotational Work

For a torque acting through an angular displacement,

$$
dW = \tau\,d\theta.
$$

Thus

$$
W_{\text{rot}} = \int_{\theta_i}^{\theta_f} \tau\,d\theta.
$$

For constant torque,

$$
W_{\text{rot}} = \tau\Delta\theta.
$$

The rotational work-energy theorem is

$$
W_{\text{net,rot}} = \Delta K_{\text{rot}}.
$$

This is the angular counterpart of $$W_{\text{net}}=\Delta K$$.

---

## Power in Rotation

Instantaneous rotational power is

$$
P = \tau\omega.
$$

More generally, in vector form,

$$
P = \vec{\tau}\cdot\vec{\omega}.
$$

This is useful for motors, wheels, pulleys, and any device where energy transfer is described by torque and angular speed.

---

## Rolling Energy

For rolling without slipping,

$$
v_{\text{cm}} = R\omega.
$$

Substituting into total kinetic energy gives

$$
K = \frac{1}{2}Mv_{\text{cm}}^2 + \frac{1}{2}I_{\text{cm}}\left(\frac{v_{\text{cm}}}{R}\right)^2.
$$

Objects with larger $$I_{\text{cm}}/(MR^2)$$ put more of their energy into rotation and less into translational speed for the same total energy. That is why a hoop and solid disk released from the same height on a ramp do not generally reach the bottom with the same speed.

---

## Angular Momentum of a Particle

The angular momentum of a particle about a chosen origin is

$$
\vec{L} = \vec{r}\times \vec{p}.
$$

Its magnitude is

$$
L = rp\sin\theta.
$$

Angular momentum depends on the origin. A particle moving in a straight line can have nonzero angular momentum about a point not on its line of motion.

---

## Angular Momentum of a Rigid Body

For a rigid body rotating about a fixed symmetry axis,

$$
\vec{L} = I\vec{\omega}.
$$

This simple form assumes the angular momentum vector is parallel to the angular velocity vector. That is true for the fixed-axis and principal-axis cases AP Physics C normally uses.

---

## Torque and Angular Momentum

Torque is the rate of change of angular momentum:

$$
\sum \vec{\tau}_{\text{ext}} = \frac{d\vec{L}}{dt}.
$$

For constant $$I$$ about a fixed axis, this becomes

$$
\sum \tau = I\alpha.
$$

This form explains why angular momentum is conserved when the net external torque about the chosen axis is zero.

<div class="theorem-box" markdown="1">

**Proof (Torque as Rate of Change of Angular Momentum).** For a particle,

$$
\vec{L}=\vec{r}\times\vec{p}.
$$

Differentiate:

$$
\frac{d\vec{L}}{dt}=\frac{d\vec{r}}{dt}\times\vec{p}+\vec{r}\times\frac{d\vec{p}}{dt}.
$$

Since $$d\vec{r}/dt=\vec{v}$$ and $$\vec{p}=m\vec{v}$$, the first term is

$$
\vec{v}\times m\vec{v}=0.
$$

The second term becomes

$$
\vec{r}\times\vec{F}=\vec{\tau}.
$$

Therefore

$$
\frac{d\vec{L}}{dt}=\vec{\tau}.
$$

For a system of particles, internal torques cancel under the usual Newtonian assumptions, leaving

$$
\frac{d\vec{L}_{\text{sys}}}{dt}=\sum \vec{\tau}_{\text{ext}}.
$$

</div>

---

## Conservation of Angular Momentum

If

$$
\sum \vec{\tau}_{\text{ext}} = 0,
$$

then

$$
\vec{L}_i = \vec{L}_f.
$$

For a rotating rigid body whose axis is fixed,

$$
I_i\omega_i = I_f\omega_f.
$$

If rotational inertia decreases, angular speed increases; if rotational inertia increases, angular speed decreases. Rotational kinetic energy does not have to be conserved during this process because internal work may be done while the mass distribution changes.

---

## Angular Impulse

The angular impulse delivered by a torque is

$$
\int_{t_i}^{t_f}\vec{\tau}_{\text{ext}}\,dt = \Delta \vec{L}.
$$

This is the angular version of impulse-momentum. A large torque over a short time can significantly change angular momentum even if the interaction is brief.

---

## Orbiting Particles and Central Forces

If a force always points along the line between a particle and a fixed center, then the torque about that center is zero:

$$
\vec{\tau} = \vec{r}\times \vec{F}=0.
$$

Therefore angular momentum about the center is conserved. This is why planets sweep out equal areas in equal times and why orbital speed changes as the distance from the central body changes.
