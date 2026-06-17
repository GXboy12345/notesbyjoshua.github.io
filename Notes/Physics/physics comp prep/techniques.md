---
layout: default
title: Problem Solving Techniques
parent: Physics Competition Prep
nav_order: 3
permalink: /notes/physics/techniques/
---

# Problem Solving Techniques

In this section, I will describe some very helpful methods/tools you could use on the F=ma/USAPhO, even though it is very rare that they will be seen on the AP exams. These are not new physics — they are *strategies* that turn an intimidating problem into a routine one. The best competitors reach for them automatically: before grinding through force diagrams, ask "is there a shortcut here?"

---

## Virtual Work Method

The virtual work method is a way to find equilibrium conditions (or the force needed to hold something) without drawing a single free-body diagram or worrying about internal/constraint forces. It rests on one principle:

> For a system in equilibrium, the total work done by the applied forces under any small displacement consistent with the constraints is zero: $$\;\delta W=0$$.

The magic is that **constraint forces do no virtual work**: normal forces, tensions in inextensible strings, and frictionless contact forces are all perpendicular to the allowed motion (or internal and canceling), so they drop out entirely. You only ever deal with the forces you care about (gravity, applied loads, springs).

The recipe:

1. Identify the **degrees of freedom** and pick a single coordinate $$q$$ that captures the allowed motion (e.g. rectangular, polar, etc.).
2. Write the positions of every point where a force acts in terms of $$q$$.
3. Give the system a virtual displacement $$\delta q$$ and compute the total work $$\delta W=\sum_i \vec F_i\cdot\delta\vec r_i$$.
4. Set $$\delta W=0$$ and solve.

Equivalently, if the forces are conservative, equilibrium is where the potential energy is stationary: $$dU/dq=0$$.

<div class="theorem-box" markdown="1">

**Example.** A massless lever pivots about a fulcrum, with the input force $$F_1$$ applied a distance $$a$$ from the pivot and the load $$F_2$$ a distance $$b$$ on the other side. Rotate the lever by a tiny angle $$\delta\theta$$. The input point moves $$a\,\delta\theta$$ and the load point moves $$b\,\delta\theta$$, so

$$
\delta W = F_1(a\,\delta\theta)-F_2(b\,\delta\theta)=0\quad\Longrightarrow\quad F_1 a=F_2 b.
$$

The lever law falls out in one line, no torque diagram needed. The same method instantly gives the mechanical advantage of pulley systems, wedges, gear trains, and hydraulic presses: **the force ratio is the inverse of the displacement ratio**, because the constraint ties the displacements together.

</div>

---

## Dimensional analysis

Before solving, ask what combination of the given quantities even *has the right units* for the answer. Often there's only one, which pins down the answer up to a dimensionless constant. This catches algebra errors, and sometimes solves the problem outright.

<div class="theorem-box" markdown="1">

**Example.** Derive the formula for the period of a pendulum up to constants.

Suppose you forgot the pendulum formula. The period $$T$$ (units: s) could depend on length $$L$$ (m), mass $$m$$ (kg), and gravity $$g$$ (m/s²). The only way to build a time from these is $$\sqrt{L/g}$$: mass cannot appear, because there's no other mass to cancel its kg. So $$T=C\sqrt{L/g}$$ for some dimensionless $$C$$ (which turns out to be $$2\pi$$). Dimensional analysis got the entire physical content — including the surprising fact that period is mass-independent — for free.

</div>

The method's one blind spot is **dimensionless constants** (the $$2\pi$$) and dimensionless ratios (like angles or the Reynolds number), which it cannot determine. Use it to fix the *form* of an answer and to sanity-check, not to nail numerical prefactors.

---

## Exploiting symmetry

If a problem has a symmetry, the answer must respect it. This lets you skip enormous amounts of computation:

- **Cancellation:** in computing a field or force, components that the symmetry maps onto their own negatives must sum to zero. (The field on the axis of a charged ring has no transverse component — every element's transverse contribution is canceled by the element opposite it.)
- **Gauss's law / Ampère's law:** symmetry is what makes these usable — it forces the field to be constant over a well-chosen surface or loop, pulling it out of the integral.
- **Superposition tricks:** a charged disk with a hole is a full disk *minus* a small disk; a sphere with an off-center cavity is a full sphere minus a smaller one. Adding back the missing piece restores symmetry and makes each part trivial. To solve, just set the would-be cavity to have negative mass/charge/whatever variable you are solving for and solve from there.

Always pause to ask: "what does this setup look the same under?" Reflection, rotation, and translation symmetries each kill some terms before you compute anything.

---

## Limiting cases

After getting an answer (or to choose between answer choices), test it in extreme cases where you already know what should happen:

- Let a mass, length, or angle go to $$0$$ or $$\infty$$ and check the formula behaves sensibly.
- Set two quantities equal, or make one much larger than another, and see if it reduces to a simpler known result.
- Check the **units** of the final expression.
- Check **signs and directions** make physical sense.

For example, the two-body reduced mass $$\mu=\dfrac{m_1 m_2}{m_1+m_2}$$ (shown later) should reduce to $$m$$ when one mass is infinite (a fixed center) and to $$m/2$$ when the masses are equal — both of which it does. On a multiple-choice exam, limiting cases often eliminate every wrong option in seconds.

---

## Working in non-inertial frames

It is frequently easier to jump *into* an accelerating frame and add a **pseudo-force** $$-m\vec a_{\text{frame}}$$ to every object than to track motion from the ground. In a frame accelerating with $$\vec a$$, everything feels an extra uniform force as if gravity had tilted; in a rotating frame, you add the **centrifugal** force $$m\omega^2 r$$ (outward) and, for moving objects, the Coriolis force.

This converts many dynamics problems into *statics* problems. A block on an accelerating wedge, a pendulum in an accelerating car, or a bead in a rotating tube all become "find the equilibrium under an effective gravity $$\vec g_{\text{eff}}=\vec g-\vec a_{\text{frame}}$$" — the same trick used for [accelerating and rotating fluids]({{ '/notes/physics/fluiddynamics/' | relative_url }}).

---

## Solving two-body problems

### Reduced mass

When two objects interact only with each other (orbits, collisions, two masses on a spring), split the motion into the **center of mass** (which moves at constant velocity, by momentum conservation) and the **relative coordinate** $$\vec r=\vec r_1-\vec r_2$$. The relative motion obeys a single-particle equation with the **reduced mass**

$$
\mu=\frac{m_1 m_2}{m_1+m_2}.
$$

So two stars orbiting each other, or two atoms vibrating in a molecule, reduce to one effective particle of mass $$\mu$$ in the interaction potential. This is exactly why the full Kepler's third law carries $$G(M_1+M_2)$$ rather than a single mass (see [Stellar Physics]({{ '/notes/physics/stellarphys/' | relative_url }})), and why molecular vibration frequencies use $$\mu$$ instead of either atomic mass.

### Inverse-square forces

If a two-body system obeys a inverse-square law (e.g. gravitational force/Coulombic force), then you can assume that it obeys an elliptical orbit and Kepler's Laws. If two objects are travelling in a straight line, you can take the system as a very very squashed ellipse ($$e=1$$).

<div class="theorem-box" markdown="1">

**Example.** A point charge $$+Q$$ with mass $$M$$ and another point charge $$-q$$ with mass $$m$$ are separated by a distance $$R$$, and then released from rest at $$t=0$$. When do these two charges collide? Neglect the gravitational interaction, and assume that the Coulomb’s law still applies in this case.

**Method 1 (Reduced mass)**

Since the pair is released from rest, the total momentum is zero and the center of mass never moves; the charges meet when the relative coordinate $$r=r_1-r_2$$ shrinks from $$R$$ to $$0$$. The relative motion is that of a single particle of reduced mass

$$
\mu=\frac{mM}{M+m}
$$

in the attractive potential $$U(r)=-\dfrac{k}{r}$$, where $$k=\dfrac{Qq}{4\pi\varepsilon_0}$$.

The particle is released from rest at $$r=R$$, so its total energy is $$E=U(R)=-k/R$$. At a later separation $$r$$,

$$
\tfrac12\mu\dot r^2-\frac{k}{r}=-\frac{k}{R}
\quad\Longrightarrow\quad
\dot r^2=\frac{2k}{\mu}\left(\frac1r-\frac1R\right).
$$

Since $$r$$ is decreasing, $$\dot r=-\sqrt{\dfrac{2k}{\mu}\dfrac{R-r}{rR}}$$. Separating variables and integrating over the whole collapse $$r:R\to 0$$ gives the collision time

$$
t=\sqrt{\frac{\mu R}{2k}}\int_0^{R}\sqrt{\frac{r}{R-r}}\,dr .
$$

The substitution $$r=R\sin^2\phi$$ turns the integral into $$2R\displaystyle\int_0^{\pi/2}\sin^2\phi\,d\phi=\dfrac{\pi R}{2}$$, so

$$
t=\frac{\pi}{2}\sqrt{\frac{\mu R^3}{2k}}
=\pi\sqrt{\frac{\pi\varepsilon_0\,\mu R^3}{2Qq}}
=\pi\sqrt{\frac{\pi\varepsilon_0\,mMR^3}{2Qq(M+m)}} ,
$$

substituting $$k=Qq/4\pi\varepsilon_0$$ and $$\mu=mM/(M+m)$$.

**Method 2 (Squashed orbits)**

First consider the situation where $$M \longrightarrow +\infty$$, and the system becomes a point mass and moves in an attractive central force field that follows the inverse-square-law. Therefore, the motion of the mass follows the Kepler’s laws. If the mass is released at rest, its
trajectory is a straight line going towards M. This straight-line can be treated as an
extremely thin elliptical orbit with $$a=\frac{R}{2}$$ and $$b=0$$. The time it takes to collide
with $$M$$ is half of the period of this orbit. According to Kepler’s 3rd law, the period
of an elliptical orbit depends only on $$a$$, not $$b$$. Therefore, we can use a circular orbit
with a radius $$R/2$$ to calculate the period of the elliptical orbit with $$a = R/2$$. Using the
dynamics equations of a circular orbit, we set the Coulomb force equal to the centripetal force at radius $$R/2$$:

$$
\frac{1}{4\pi\varepsilon_0}\frac{Qq}{\left(\frac{R}{2}\right)^2}=m\,\frac{R}{2}\,\omega^2 .
$$

Solving for $$\omega$$ and using $$T=2\pi/\omega$$ gives the period of the orbit,

$$
T=\frac{2\pi}{\omega}=2\pi\sqrt{\frac{\pi\varepsilon_0 mR^3}{2Qq}} .
$$

The collision happens after half a period, so

$$
t=\frac{T}{2}=\pi\sqrt{\frac{\pi\varepsilon_0 mR^3}{2Qq}} .
$$

If $$M$$ is finite, we just replace $$m$$ in the result with the reduced mass $$\mu=\dfrac{mM}{M+m}$$:

$$
t=\frac{T}{2}=\pi\sqrt{\frac{\pi\varepsilon_0 mMR^3}{2Qq(M+m)}} .
$$

</div>