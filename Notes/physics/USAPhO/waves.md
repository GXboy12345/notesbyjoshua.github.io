---
layout: default
title: Waves
parent: USAPhO Prep
nav_order: 7
permalink: /notes/physics/waves/
---

# Waves

---

## Wave definition

A **wave** is a disturbance that transports energy and momentum through a medium (or through space) without any net transport of matter. The particles of the medium oscillate about fixed equilibrium positions; it is the *pattern* of disturbance that travels.

- In a **transverse** wave the medium oscillates perpendicular to the direction of propagation (a wave on a string, light).
- In a **longitudinal** wave the medium oscillates along the direction of propagation (sound, compression waves in a spring).

Mechanical waves require a medium with two ingredients: something that provides a **restoring force** (tension, pressure, elasticity) and something that provides **inertia** (mass density). The wave speed is always set by the competition between these two.

## The wave function and the wave equation

Consider a disturbance $$y$$ that depends on position $$x$$ and time $$t$$. A pulse of any shape moving in the $$+x$$ direction at speed $$v$$ without changing shape must depend on $$x$$ and $$t$$ only through the combination $$x - vt$$:

$$
y(x,t) = f(x - vt).
$$

A wave moving in the $$-x$$ direction is $$f(x+vt)$$. The single most important sinusoidal solution is

$$
y(x,t) = A\sin(kx - \omega t + \phi),
$$

where

$$
k = \frac{2\pi}{\lambda}
\quad(\text{wave number}),
\qquad
\omega = 2\pi f = \frac{2\pi}{T}
\quad(\text{angular frequency}),
$$

and the speed, wavelength, and frequency are linked by

$$
v = \frac{\omega}{k} = \lambda f = \frac{\lambda}{T}.
$$

Both forms satisfy the **wave equation**, the partial differential equation every nondispersive wave obeys:

$$
\frac{\partial^2 y}{\partial x^2} = \frac{1}{v^2}\frac{\partial^2 y}{\partial t^2}.
$$

USAPhO will not require you to solve these types of equations, but it is good to know the general solutions.

<div class="theorem-box" markdown="1">

**Proof (Wave definition).** Let $$u = x - vt$$ and $$y = f(u)$$. By the chain rule,

$$
\frac{\partial y}{\partial x} = f'(u),
\qquad
\frac{\partial y}{\partial t} = -v f'(u),
$$

and differentiating again,

$$
\frac{\partial^2 y}{\partial x^2} = f''(u),
\qquad
\frac{\partial^2 y}{\partial t^2} = v^2 f''(u).
$$

Dividing, $$\partial^2 y/\partial x^2 = (1/v^2)\,\partial^2 y/\partial t^2$$ for *any* twice-differentiable shape $$f$$. So the wave equation does not care about the shape of the pulse — only that it translates rigidly at speed $$v$$.

</div>

A useful distinction: the **wave speed** $$v$$ is how fast the pattern moves, while the **transverse velocity** of a point on the string is

$$
u_y = \frac{\partial y}{\partial t} = -\omega A\cos(kx - \omega t + \phi),
$$

with maximum magnitude $$\omega A$$. These are completely different quantities — do not confuse them.

## Waves on a string

For a string with tension $$T$$ and linear mass density $$\mu$$ (mass per length), the wave speed is

$$
v = \sqrt{\frac{T}{\mu}}.
$$

This is the prototype of "restoring force over inertia": more tension means a faster wave, more mass per length means a slower one.

<div class="theorem-box" markdown="1">

**Proof (Wave velocity equation).** Consider a small arc of string of length $$\Delta x$$ carrying a wave. The tension pulls tangentially at both ends; if the slope is small, the net upward (transverse) force is

$$
F_y = T\sin\theta_2 - T\sin\theta_1 \approx T\left(\frac{\partial y}{\partial x}\Big|_{x+\Delta x} - \frac{\partial y}{\partial x}\Big|_{x}\right) \approx T\frac{\partial^2 y}{\partial x^2}\Delta x.
$$

The mass of the arc is $$\mu\,\Delta x$$ and its transverse acceleration is $$\partial^2 y/\partial t^2$$, so Newton's second law gives

$$
T\frac{\partial^2 y}{\partial x^2}\Delta x = \mu\,\Delta x\,\frac{\partial^2 y}{\partial t^2}
\quad\Longrightarrow\quad
\frac{\partial^2 y}{\partial x^2} = \frac{\mu}{T}\frac{\partial^2 y}{\partial t^2}.
$$

Comparing with the wave equation, $$v^2 = T/\mu$$.

</div>

## Energy and power

A sinusoidal wave carries energy past a point at an average rate

$$
P_{\text{avg}} = \tfrac12 \mu\, \omega^2 A^2 v.
$$

The key scalings to remember: power (and intensity) go as the **square of both amplitude and frequency**. Doubling the frequency at fixed amplitude quadruples the power transmitted.

## Superposition and interference

When two or more waves overlap in a linear medium, the net disturbance is the **sum** of the individual disturbances:

$$
y_{\text{net}} = y_1 + y_2 + \cdots
$$

This **principle of superposition** is what makes interference possible. For two waves of equal amplitude and frequency differing in phase by $$\delta$$,

$$
y = A\sin(kx-\omega t) + A\sin(kx-\omega t+\delta)
= \underbrace{2A\cos\tfrac{\delta}{2}}_{\text{net amplitude}}\sin\!\left(kx-\omega t+\tfrac{\delta}{2}\right).
$$

The interference is

- **Constructive** (amplifies the wave) when $$\delta = 0, 2\pi, 4\pi, \dots$$ (amplitude $$2A$$),
- **Destructive** (de-amplifies the wave) when $$\delta = \pi, 3\pi, \dots$$ (amplitude $$0$$).

For two sources, a phase difference usually arises from a **path-length difference** $$\Delta r$$:

$$
\delta = \frac{2\pi}{\lambda}\,\Delta r.
$$

So constructive interference is $$\Delta r = m\lambda$$ and destructive is $$\Delta r = (m+\tfrac12)\lambda$$ for integer $$m$$ — the backbone of all interference problems (and the double-slit on the [Optics]({{ '/notes/physics/optics/' | relative_url }}) page).

## Standing waves and normal modes

Add two identical waves traveling in opposite directions:

$$
y = A\sin(kx-\omega t) + A\sin(kx+\omega t) = 2A\sin(kx)\cos(\omega t).
$$

The result does not travel — it is a **standing wave**. The space and time parts have separated: every point oscillates at the same frequency $$\omega$$, but with a position-dependent amplitude $$2A\sin(kx)$$.

- **Nodes** (always at rest) occur where $$\sin(kx)=0$$, i.e. $$x = 0, \tfrac{\lambda}{2}, \lambda, \dots$$ — spaced half a wavelength apart.
- **Antinodes** (maximum swing) sit halfway between nodes.

Confining a wave between boundaries selects a discrete set of allowed wavelengths — the **normal modes** or **harmonics**.

String fixed at both ends (nodes at each end), length $$L$$:

$$
\lambda_n = \frac{2L}{n},
\qquad
f_n = \frac{nv}{2L},
\qquad n = 1, 2, 3, \dots
$$

The lowest mode ($$n=1$$) is the **fundamental** mode, while the rest are higher harmonics, and here *all* integer harmonics are present.

In a pipe, a closed end forces a displacement node (pressure antinode); an open end is a displacement antinode (pressure node).

- Open–open pipe: $$\;f_n = \dfrac{nv}{2L},\quad n=1,2,3,\dots$$ (all harmonics)
- Open–closed pipe: $$\;f_n = \dfrac{(2n-1)v}{4L},\quad n=1,2,3,\dots$$ (**odd harmonics only**)

<div class="theorem-box" markdown="1">

**Example.** A guitar string of length $$L = 0.65\text{ m}$$ and linear density $$\mu = 5.0\times 10^{-3}\text{ kg/m}$$ is tuned to a fundamental of $$f_1 = 110\text{ Hz}$$. What tension is required?

The fundamental of a string fixed at both ends is $$f_1 = v/2L$$, so the required wave speed is

$$
v = 2Lf_1 = 2(0.65)(110) = 143\text{ m/s}.
$$

Since $$v = \sqrt{T/\mu}$$,

$$
T = \mu v^2 = (5.0\times 10^{-3})(143)^2 \approx 102\text{ N}.
$$

Roughly $$100\text{ N}$$ — about the weight of a $$10\text{ kg}$$ mass, which is why guitar necks must be sturdy.

</div>

## Reflection and boundary conditions

When a pulse reaches a boundary it is partly reflected and partly transmitted.

- At a **fixed end** (string tied to a wall, or a denser medium), the reflected pulse is **inverted** — it picks up a phase shift of $$\pi$$.
- At a **free end** (or a lighter medium), the reflected pulse is **upright** — no phase shift.

More generally, for a wave going from a string of density $$\mu_1$$ to one of density $$\mu_2$$ (same tension, so wave speeds $$v_1, v_2$$), the amplitude reflection and transmission coefficients are

$$
r = \frac{v_2 - v_1}{v_2 + v_1},
\qquad
t = \frac{2v_2}{v_2 + v_1}.
$$

When the second medium is denser ($$v_2 < v_1$$), $$r<0$$ — the reflection is inverted, recovering the fixed-end rule as the limiting case $$v_2 \to 0$$.

## Sound waves

Sound is a longitudinal pressure wave. Its speed in a fluid of bulk modulus $$B$$ and density $$\rho$$ is

$$
v = \sqrt{\frac{B}{\rho}},
$$

and for an ideal gas this becomes

$$
v = \sqrt{\frac{\gamma P}{\rho}} = \sqrt{\frac{\gamma R T}{M}},
$$

where $$\gamma$$ is the ratio of specific heats (see the [Thermodynamics]({{ '/notes/physics/thermodynamics/' | relative_url }}) page). Note that sound speed depends on temperature but not on pressure for an ideal gas (since $$P/\rho \propto T$$).

**Intensity** is power per unit area, $$I = P/A$$. For a point source radiating uniformly into spheres,

$$
I = \frac{P}{4\pi r^2} \propto \frac{1}{r^2},
$$

so amplitude falls as $$1/r$$. Because human hearing spans many orders of magnitude, loudness is measured on a logarithmic **decibel** scale:

$$
\beta = 10\log_{10}\frac{I}{I_0},
\qquad
I_0 = 10^{-12}\text{ W/m}^2.
$$

Every factor of $$10$$ in intensity adds $$10\text{ dB}$$; a factor of $$2$$ adds about $$3\text{ dB}$$.

## Beats

Two waves of nearly equal frequencies $$f_1$$ and $$f_2$$ superpose to give a slow amplitude modulation, called **beats**, heard at the difference frequency:

$$
f_{\text{beat}} = \lvert f_1 - f_2\rvert.
$$

Musicians tune by listening for the beats to slow to zero.

## The Doppler effect

When source and observer move relative to the medium, the observed frequency shifts. With all speeds measured relative to the medium,

$$
f' = f\,\frac{v \pm v_{\text{obs}}}{v \mp v_{\text{src}}}.
$$

The sign rule that never fails: *choose signs so that approach raises the pitch and recession lowers it.* Concretely, the top sign (numerator $$+$$, denominator $$-$$) applies when the motion is *toward* the other party.

<div class="theorem-box" markdown="1">

**Example.** An ambulance emits a $$700\text{ Hz}$$ siren and drives toward a stationary listener at $$35\text{ m/s}$$. Take the speed of sound as $$v = 343\text{ m/s}$$. What frequency does the listener hear, and what do they hear after the ambulance passes?

The observer is stationary ($$v_{\text{obs}}=0$$) and the source approaches, so use the $$-$$ sign in the denominator:

$$
f' = f\,\frac{v}{v - v_{\text{src}}} = 700\,\frac{343}{343 - 35} \approx 780\text{ Hz}.
$$

After it passes, the source recedes, so the denominator sign flips to $$+$$:

$$
f' = 700\,\frac{343}{343 + 35} \approx 635\text{ Hz}.
$$

The pitch drops by about $$145\text{ Hz}$$ as the ambulance goes by — the familiar falling "neeeow."

</div>

When the source itself moves faster than the wave speed ($$v_{\text{src}} > v$$), the wavefronts pile into a **shock wave** (a sonic boom for sound). The Mach cone half-angle is

$$
\sin\theta = \frac{v}{v_{\text{src}}} = \frac{1}{\text{Mach number}}.
$$

## Phase velocity and group velocity

In a **dispersive** medium the wave speed depends on frequency, so we distinguish two speeds. The **phase velocity** is how fast a single wave crest moves,

$$
v_p = \frac{\omega}{k},
$$

while the **group velocity** is how fast a wave packet (and its energy/information) moves,

$$
v_g = \frac{d\omega}{dk}.
$$

For a nondispersive wave ($$\omega = vk$$) the two coincide. The relation $$\omega(k)$$ is called the **dispersion relation**, and computing $$v_g = d\omega/dk$$ from it is a recurring olympiad task.
