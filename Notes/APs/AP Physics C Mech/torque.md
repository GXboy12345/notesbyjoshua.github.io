---
layout: default
title: Torque and Rotational Dynamics
nav_title: "Unit 5: Torque and Rotational Dynamics"
parent: AP Physics C Mechanics
nav_order: 5
permalink: /notes/physics/torque/
---

# Torque and Rotational Dynamics

Rotational dynamics is the angular version of Newtonian mechanics. Translational motion asks how force changes linear motion; rotational motion asks how **torque** changes angular motion. The key idea is that the same force can produce different rotational effects depending on where and how it is applied.

---

## Useful Variables

- $$\theta$$ = angular position (Units: radians)
- $$\omega$$ = angular velocity (Units: $$\text{rad/s}$$)
- $$\alpha$$ = angular acceleration (Units: $$\text{rad/s}^2$$)
- $$\tau$$ = torque (Units: $$\text{N}\cdot\text{m}$$)
- $$I$$ = rotational inertia / moment of inertia (Units: $$\text{kg}\cdot\text{m}^2$$)
- $$r$$ = distance from rotation axis
- $$s$$ = arc length

---

## Angular Kinematics

For a rigid body rotating about a fixed axis, angular variables mirror linear variables:

$$
\omega = \frac{d\theta}{dt}, \qquad \alpha = \frac{d\omega}{dt} = \frac{d^2\theta}{dt^2}.
$$

If angular acceleration is constant,

$$
\omega_f = \omega_i + \alpha t,
$$

$$
\theta_f-\theta_i = \omega_i t + \frac{1}{2}\alpha t^2,
$$

$$
\omega_f^2 = \omega_i^2 + 2\alpha(\theta_f-\theta_i).
$$

Radians are dimensionless in SI, but keeping them visible helps avoid mixing angular and linear quantities.

---

## Connecting Linear and Angular Motion

For a point a distance $$r$$ from a fixed rotation axis,

$$
s = r\theta,
$$

$$
v_t = r\omega,
$$

$$
a_t = r\alpha.
$$

The radial or centripetal acceleration is

$$
a_r = \frac{v_t^2}{r} = r\omega^2,
$$

directed toward the axis. Tangential acceleration changes speed; radial acceleration changes direction.

---

## Torque

Torque is the rotational effect of a force:

$$
\vec{\tau} = \vec{r}\times \vec{F}.
$$

Its magnitude is

$$
\tau = rF\sin\theta = F r_{\perp},
$$

where $$r_{\perp}$$ is the lever arm, the perpendicular distance from the axis to the line of action of the force. A force applied through the axis produces no torque about that axis.

The direction of torque follows the right-hand rule. In planar problems, counterclockwise torques are often taken as positive and clockwise torques as negative.

---

## Rotational Inertia

Rotational inertia measures resistance to angular acceleration:

$$
I = \sum_i m_i r_i^2
$$

for point masses and

$$
I = \int r^2\,dm
$$

for continuous bodies. Mass farther from the axis contributes more strongly because of the $$r^2$$ factor.

Common results:

- Point mass: $$I = mr^2$$
- Thin hoop about center: $$I = MR^2$$
- Solid disk or cylinder about center: $$I = \frac{1}{2}MR^2$$
- Solid sphere about diameter: $$I = \frac{2}{5}MR^2$$
- Thin rod about center: $$I = \frac{1}{12}ML^2$$
- Thin rod about end: $$I = \frac{1}{3}ML^2$$

<div class="theorem-box" markdown="1">

**Proof (Rotational Inertia of a Thin Rod About Its Center).** Let a uniform rod of length $$L$$ and mass $$M$$ lie along the $$x$$-axis with its center at $$x=0$$. Its linear mass density is

$$
\lambda=\frac{M}{L}.
$$

A tiny piece has mass

$$
dm=\lambda\,dx.
$$

The rotational inertia about the center is

$$
I=\int r^2\,dm=\int_{-L/2}^{L/2}x^2\lambda\,dx.
$$

Substitute $$\lambda=M/L$$:

$$
I=\frac{M}{L}\int_{-L/2}^{L/2}x^2\,dx.
$$

Evaluate:

$$
I=\frac{M}{L}\left[\frac{x^3}{3}\right]_{-L/2}^{L/2}
=\frac{M}{L}\cdot\frac{L^3}{12}.
$$

So

$$
I=\frac{1}{12}ML^2.
$$

</div>

---

## Newton's Second Law for Rotation

For rotation about a fixed axis,

$$
\sum \tau = I\alpha.
$$

This is the rotational analog of $$\sum F = ma$$. It works when all torques and $$I$$ are computed about the same axis.

If the axis is not fixed, use the center of mass form:

$$
\sum \vec{\tau}_{\text{cm}} = I_{\text{cm}}\vec{\alpha}.
$$

The translational motion of the center of mass still obeys

$$
\sum \vec{F}_{\text{ext}} = M\vec{a}_{\text{cm}}.
$$

Rolling and pulley problems often require both equations at once.

---

## Static Equilibrium

A rigid body in static equilibrium satisfies

$$
\sum \vec{F}=0
$$

and

$$
\sum \vec{\tau}=0.
$$

If the object is not accelerating linearly or angularly, both conditions must hold. In equilibrium problems, torque may be calculated about any axis. Choosing an axis through an unknown force often eliminates that force from the torque equation.

---

## Parallel-Axis Theorem

If $$I_{\text{cm}}$$ is the rotational inertia about an axis through the center of mass, then the rotational inertia about a parallel axis a distance $$d$$ away is

$$
I = I_{\text{cm}} + Md^2.
$$

This theorem is useful for rods about one end, rolling bodies about contact points, and composite rigid bodies.

<div class="theorem-box" markdown="1">

**Proof (Parallel-Axis Theorem).** Put the center of mass at the origin, and let the new parallel axis be displaced by distance $$d$$ in the $$x$$-direction. For a mass element, the squared distance to the new axis can be written

$$
r^2=(x-d)^2+y^2.
$$

The moment of inertia about the new axis is

$$
I=\int \left[(x-d)^2+y^2\right]\,dm.
$$

Expand:

$$
I=\int (x^2+y^2)\,dm-2d\int x\,dm+d^2\int dm.
$$

The first term is $$I_{\text{cm}}$$. The middle term is zero because the origin is at the center of mass, so $$\int x\,dm=0$$. The final term is $$Md^2$$. Therefore

$$
I=I_{\text{cm}}+Md^2.
$$

</div>

---

## Rolling Without Slipping

Rolling without slipping imposes the constraint

$$
v_{\text{cm}} = R\omega
$$

and, if the constraint holds through the acceleration,

$$
a_{\text{cm}} = R\alpha.
$$

The point of contact is instantaneously at rest relative to the ground, so static friction can provide torque without doing work on an ideal rolling object. Static friction may point uphill or downhill depending on what torque is needed.
