---
layout: default
title: Oscillations
nav_title: "Unit 7: Oscillations"
parent: AP Physics C Mechanics
nav_order: 7
permalink: /notes/physics/oscillations/
---

# Oscillations

**Oscillation** occurs when a system repeatedly moves around a stable equilibrium. AP Physics C focuses mainly on simple harmonic motion, where the restoring force is proportional to displacement and the resulting motion is sinusoidal.

---

## Useful Variables

- $$x$$ = displacement from equilibrium
- $$A$$ = amplitude
- $$T$$ = period
- $$f$$ = frequency
- $$\omega$$ = angular frequency
- $$k$$ = spring constant
- $$m$$ = mass
- $$\phi$$ = phase constant

---

## Simple Harmonic Motion

A system is in **simple harmonic motion** when its acceleration is proportional to displacement and points toward equilibrium:

$$
a = -\omega^2 x.
$$

Equivalently,

$$
\frac{d^2x}{dt^2} + \omega^2x = 0.
$$

The general solution is sinusoidal:

$$
x(t)=A\cos(\omega t+\phi)
$$

or equivalently

$$
x(t)=A\sin(\omega t+\phi).
$$

The constants $$A$$ and $$\phi$$ are set by initial position and velocity.

---

## Velocity and Acceleration in SHM

If

$$
x(t)=A\cos(\omega t+\phi),
$$

then

$$
v(t)=\frac{dx}{dt}=-A\omega\sin(\omega t+\phi),
$$

and

$$
a(t)=\frac{d^2x}{dt^2}=-A\omega^2\cos(\omega t+\phi)=-\omega^2x.
$$

The maximum speed is

$$
v_{\max}=A\omega,
$$

and the maximum acceleration magnitude is

$$
a_{\max}=A\omega^2.
$$

Speed is greatest at equilibrium and zero at the turning points.

---

## Period and Frequency

The angular frequency $$\omega$$ is related to frequency and period by

$$
\omega = 2\pi f = \frac{2\pi}{T}.
$$

Thus

$$
T = \frac{2\pi}{\omega}.
$$

Period is the time for one full cycle. Frequency is cycles per second, measured in hertz.

---

## Mass-Spring Oscillator

For a mass on an ideal spring,

$$
F=-kx.
$$

Newton's second law gives

$$
m\frac{d^2x}{dt^2}=-kx,
$$

so

$$
\omega=\sqrt{\frac{k}{m}}.
$$

The period is

$$
T=2\pi\sqrt{\frac{m}{k}}.
$$

The period does not depend on amplitude for an ideal spring.

---

## Energy in SHM

For a mass-spring oscillator,

$$
E = K+U = \frac{1}{2}mv^2+\frac{1}{2}kx^2.
$$

At maximum displacement, $$v=0$$ and $$x=\pm A$$, so

$$
E=\frac{1}{2}kA^2.
$$

At equilibrium, $$x=0$$ and speed is maximum:

$$
E=\frac{1}{2}mv_{\max}^2.
$$

Energy continuously transfers between kinetic energy and spring potential energy while total mechanical energy remains constant if damping is negligible.

---

## Simple Pendulum

For a simple pendulum of length $$L$$ and small angular displacement $$\theta$$,

$$
\tau \approx -mgL\theta.
$$

Using $$I=mL^2$$,

$$
mL^2\frac{d^2\theta}{dt^2}=-mgL\theta,
$$

so

$$
\frac{d^2\theta}{dt^2}+\frac{g}{L}\theta=0.
$$

Therefore

$$
\omega=\sqrt{\frac{g}{L}},
$$

and

$$
T=2\pi\sqrt{\frac{L}{g}}.
$$

This formula assumes the small-angle approximation

$$
\sin\theta \approx \theta
$$

when $$\theta$$ is measured in radians.

---

## Physical Pendulum

A rigid body swinging about a pivot is a **physical pendulum**. If the center of mass is distance $$d$$ from the pivot,

$$
\tau \approx -mgd\theta.
$$

With rotational inertia $$I$$ about the pivot,

$$
I\frac{d^2\theta}{dt^2}=-mgd\theta.
$$

Thus

$$
\omega=\sqrt{\frac{mgd}{I}},
$$

and

$$
T=2\pi\sqrt{\frac{I}{mgd}}.
$$

---

## Damping and Driving

Real oscillators lose mechanical energy to nonconservative forces. With linear damping, a common model is

$$
m\frac{d^2x}{dt^2}+b\frac{dx}{dt}+kx=0.
$$

Weak damping produces oscillations with decreasing amplitude. Strong damping can return the system to equilibrium without oscillating.

A driven oscillator has an external periodic force:

$$
m\frac{d^2x}{dt^2}+b\frac{dx}{dt}+kx=F_0\cos(\omega_d t).
$$

Resonance occurs when the driving frequency is near the system's natural frequency. Damping limits the amplitude and broadens the resonance peak.
