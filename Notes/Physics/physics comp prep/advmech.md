---
layout: default
title: Advanced Mechanics
parent: Physics Competition Prep
nav_order: 4
permalink: /notes/physics/advmech/
---

# Advanced Mechanics

These notes pick up where AP Physics C Mechanics leaves off. They assume you are already comfortable with Newton's laws, work–energy, momentum, basic rotation, gravitation, and simple harmonic motion, and instead develop the machinery that olympiad problems actually demand: the **Lagrangian** formulation, **central-force orbits**, **small oscillations and normal modes**, **rigid-body dynamics**, and **adiabatic invariants**. A few standard tools — working in non-inertial frames, reducing a two-body problem to one body, and the virtual-work method — live on the [Problem Solving Techniques]({{ '/notes/physics/techniques/' | relative_url }}) page and are only summarized here. For the complex-exponential treatment of oscillators and the standard differential equations, see [Math Tricks]({{ '/notes/physics/mathtricks/' | relative_url }}).

---

## Lagrangian mechanics

Newton's laws are written in terms of forces and vectors. For systems with constraints — a bead on a wire, a pendulum, a rolling disk — forces of constraint are unknown and annoying. The **Lagrangian** formulation sidesteps them by working with energy and freely chosen coordinates.

### Generalized coordinates and degrees of freedom

A system's configuration is specified by a set of **generalized coordinates** $$q_1,\dots,q_n$$ — any convenient parameters (lengths, angles, arc lengths) that pin down where everything is. The number $$n$$ of independent coordinates is the number of **degrees of freedom**: total coordinates minus the number of (holonomic) constraints. A pendulum bob in a plane has two Cartesian coordinates but one constraint (fixed string length), so $$n=1$$, and the natural coordinate is the angle $$\theta$$.

The whole point is to choose coordinates that build the constraints in automatically, so constraint forces never appear.

### The Euler–Lagrange equations

Define the **Lagrangian** as kinetic minus potential energy,

$$
L(q,\dot q,t)=T-V,
$$

expressed entirely in terms of the generalized coordinates and their time derivatives. The motion is governed by one **Euler–Lagrange equation per coordinate**:

$$
\boxed{\ \frac{d}{dt}\!\left(\frac{\partial L}{\partial \dot q_i}\right)-\frac{\partial L}{\partial q_i}=0\ }.
$$

<div class="theorem-box" markdown="1">

**Where this comes from (the principle of least action).** Define the **action** as the time integral of the Lagrangian along a path $$q(t)$$ between fixed endpoints $$q(t_1)$$ and $$q(t_2)$$:

$$
S[q]=\int_{t_1}^{t_2}L(q,\dot q,t)\,dt.
$$

Nature takes the path that makes $$S$$ **stationary** ($$\delta S=0$$) under small variations $$q(t)\to q(t)+\delta q(t)$$ that vanish at the endpoints. Expanding,

$$
\delta S=\int_{t_1}^{t_2}\left(\frac{\partial L}{\partial q}\,\delta q+\frac{\partial L}{\partial \dot q}\,\delta\dot q\right)dt.
$$

Integrate the second term by parts, using $$\delta\dot q=\tfrac{d}{dt}\delta q$$ and $$\delta q=0$$ at the endpoints:

$$
\delta S=\int_{t_1}^{t_2}\left(\frac{\partial L}{\partial q}-\frac{d}{dt}\frac{\partial L}{\partial \dot q}\right)\delta q\,dt.
$$

For this to vanish for **every** allowed $$\delta q$$, the bracket must be zero everywhere — that is the Euler–Lagrange equation. For a single particle with $$L=\tfrac12 m\dot x^2-V(x)$$ it reduces to $$m\ddot x=-V'(x)$$, ordinary Newton.

</div>

### The recipe

1. Pick generalized coordinates that respect the constraints.
2. Write $$T$$ and $$V$$ in those coordinates; form $$L=T-V$$.
3. For each coordinate, compute $$\partial L/\partial \dot q_i$$ and $$\partial L/\partial q_i$$ and assemble the Euler–Lagrange equation.
4. Read off conserved quantities (next section) before grinding through the algebra.

<div class="theorem-box" markdown="1">

**Example (bead on a rotating hoop).** A bead slides without friction on a circular hoop of radius $$R$$ that is forced to spin about its vertical diameter at constant angular speed $$\Omega$$. Let $$\theta$$ be the angle from the bottom. The bead's position gives speed components $$R\dot\theta$$ (along the hoop) and $$R\sin\theta\,\Omega$$ (around the axis), so

$$
T=\tfrac12 m\left(R^2\dot\theta^2+R^2\sin^2\theta\,\Omega^2\right),\qquad
V=-mgR\cos\theta .
$$

With $$L=T-V$$, the Euler–Lagrange equation in $$\theta$$ is

$$
mR^2\ddot\theta=mR^2\Omega^2\sin\theta\cos\theta-mgR\sin\theta .
$$

Equilibria satisfy $$\cos\theta=g/(R\Omega^2)$$: for slow spin ($$\Omega^2<g/R$$) the only stable point is the bottom, but once $$\Omega^2>g/R$$ the bead climbs to a nonzero angle. The "centrifugal" term fell out of the kinetic energy automatically — no pseudo-forces required, because we worked in the lab frame.

</div>

### Cyclic coordinates and conservation laws

The Lagrangian formulation makes conservation laws transparent. Define the **generalized (canonical) momentum** conjugate to $$q_i$$:

$$
p_i=\frac{\partial L}{\partial \dot q_i}.
$$

If a coordinate does **not appear** explicitly in $$L$$ (only its derivative does), it is called **cyclic** or **ignorable**, and its Euler–Lagrange equation immediately gives

$$
\frac{dp_i}{dt}=\frac{\partial L}{\partial q_i}=0
\quad\Longrightarrow\quad
p_i=\text{const}.
$$

This is the mechanical core of Noether's theorem: each continuous symmetry of $$L$$ yields a conserved quantity. Translational invariance ⟶ linear momentum; rotational invariance (no $$\phi$$ dependence) ⟶ angular momentum.

Time symmetry gives a conserved **energy function** (the Jacobi integral),

$$
h=\sum_i \dot q_i\,\frac{\partial L}{\partial \dot q_i}-L,
$$

which is conserved whenever $$L$$ has no explicit time dependence, and equals the total energy $$T+V$$ whenever the coordinates are tied to the lab frame (time-independent constraints). This $$h$$ is exactly the **Hamiltonian** $$H(q,p)$$ once it is rewritten in terms of the momenta $$p_i$$ rather than the velocities — the starting point of Hamiltonian mechanics and phase-space methods.

---

## Central-force motion and orbits

A **central force** points along the line joining two bodies and depends only on their separation, $$\vec F=F(r)\hat r$$. Gravity and the Coulomb force are the headline cases. Two features make these problems tractable: the two-body problem reduces to one body, and the motion is confined to a plane.

### Reduction to one body and the effective potential

A two-body system interacting through a central force reduces to a single particle of **reduced mass** $$\mu=m_1m_2/(m_1+m_2)$$ moving in the potential $$V(r)$$ about a fixed center (derived on the [Techniques]({{ '/notes/physics/techniques/' | relative_url }}) page). Angular momentum $$L=\mu r^2\dot\theta$$ is conserved (the force exerts no torque about the center), which is **Kepler's second law**: $$dA/dt=L/2\mu$$ is constant, so the radius sweeps equal areas in equal times.

Using $$L$$ to eliminate $$\dot\theta$$, the energy becomes a one-dimensional problem in $$r$$ alone:

$$
E=\tfrac12\mu\dot r^2+\underbrace{\frac{L^2}{2\mu r^2}+V(r)}_{V_{\text{eff}}(r)} .
$$

The **effective potential** bundles the real potential with a repulsive **centrifugal barrier** $$L^2/2\mu r^2$$. Reading its shape tells you everything qualitative: minima are circular orbits, a particle oscillating between two turning points ($$\dot r=0$$) traces a bound orbit, and the depth of the well sets whether motion is bound or unbound.

### Kepler orbits

For gravity, $$V(r)=-k/r$$ with $$k=Gm_1m_2$$. Substituting $$u=1/r$$ and changing the independent variable from $$t$$ to $$\theta$$ turns the radial equation into the linear **Binet equation**

$$
\frac{d^2u}{d\theta^2}+u=\frac{\mu k}{L^2},
$$

whose solution is a conic section:

$$
r(\theta)=\frac{p}{1+e\cos\theta},\qquad
p=\frac{L^2}{\mu k},\qquad
e=\sqrt{1+\frac{2EL^2}{\mu k^2}} .
$$

The eccentricity $$e$$ sorts the orbit by energy:

| Energy | Eccentricity | Orbit |
|---|---|---|
| $$E<0$$ | $$0\le e<1$$ | ellipse (circle if $$e=0$$) |
| $$E=0$$ | $$e=1$$ | parabola (just unbound) |
| $$E>0$$ | $$e>1$$ | hyperbola |

For a bound orbit the semi-major axis depends only on energy, $$a=-k/2E$$, and **Kepler's third law** follows from the area law:

$$
T^2=\frac{4\pi^2}{G(m_1+m_2)}\,a^3 .
$$

The single most useful orbital relation in practice is the **vis-viva equation**, which comes straight from energy conservation with $$a=-k/2E$$:

$$
\boxed{\ v^2=GM\!\left(\frac{2}{r}-\frac{1}{a}\right)\ }
$$

(for a light body orbiting mass $$M$$). It gives the speed anywhere on an orbit from just $$r$$ and $$a$$, and makes transfer-orbit problems almost mechanical.

<div class="theorem-box" markdown="1">

**Example (Hohmann transfer speed).** A spacecraft is in a circular orbit of radius $$r_1$$ and wants to reach a larger circular orbit $$r_2$$. The efficient path is an ellipse tangent to both circles, with $$a=(r_1+r_2)/2$$. At perigee ($$r=r_1$$) vis-viva gives the transfer speed

$$
v_p=\sqrt{GM\!\left(\frac{2}{r_1}-\frac{2}{r_1+r_2}\right)},
$$

while the circular speed there is $$v_{\text{circ}}=\sqrt{GM/r_1}$$. The first burn is $$\Delta v=v_p-v_{\text{circ}}$$; a second burn at apogee circularizes at $$r_2$$. No integration of the trajectory is needed — energy bookkeeping does it all.

</div>

---

## Small oscillations and normal modes

Near a stable equilibrium, almost every system behaves like one or more harmonic oscillators. This is why SHM is everywhere, and the **normal-mode** method is the systematic way to handle coupled systems.

### Oscillations about equilibrium

Expand the potential about a stable equilibrium $$x_0$$ (where $$V'(x_0)=0$$, $$V''(x_0)>0$$):

$$
V(x)\approx V(x_0)+\tfrac12 V''(x_0)(x-x_0)^2 .
$$

The linear term vanishes by definition of equilibrium, so to leading order the restoring force is Hooke's law with effective stiffness $$k_{\text{eff}}=V''(x_0)$$, giving

$$
\omega=\sqrt{\frac{V''(x_0)}{m}} .
$$

For a general coordinate, replace $$m$$ by the effective inertia multiplying $$\tfrac12\dot q^2$$ in the kinetic energy. This reduces "find the small-oscillation frequency" to two derivatives.

### Coupled oscillators and normal modes

For several coordinates, linearizing gives matrix equations of motion

$$
\mathbf{M}\ddot{\mathbf q}=-\mathbf{K}\mathbf q,
$$

with $$\mathbf M$$ the (mass/inertia) matrix and $$\mathbf K$$ the stiffness matrix. Seeking solutions $$\mathbf q=\mathbf a\,e^{i\omega t}$$ turns this into the generalized eigenvalue problem

$$
(\mathbf K-\omega^2\mathbf M)\,\mathbf a=0
\quad\Longrightarrow\quad
\det(\mathbf K-\omega^2\mathbf M)=0 .
$$

The roots $$\omega^2$$ are the **normal-mode frequencies**; each eigenvector $$\mathbf a$$ is the pattern in which all coordinates oscillate **in phase at a single frequency**. Any motion is a superposition of normal modes. (The continuous limit of this idea — standing waves on a string — is on the [Waves]({{ '/notes/physics/waves/' | relative_url }}) page; the complex-exponential bookkeeping is in [Math Tricks]({{ '/notes/physics/mathtricks/' | relative_url }}).)

<div class="theorem-box" markdown="1">

**Example (two coupled pendulums).** Two identical pendulums (length $$\ell$$, mass $$m$$) hang side by side and are joined at the bobs by a weak spring $$k$$. For small angles, taking torques about each pivot ($$I=m\ell^2$$) with the spring exerting force $$k\ell(\theta_1-\theta_2)$$,

$$
m\ell^2\ddot\theta_1=-mg\ell\,\theta_1-k\ell^2(\theta_1-\theta_2),\qquad
m\ell^2\ddot\theta_2=-mg\ell\,\theta_2-k\ell^2(\theta_2-\theta_1).
$$

Adding and subtracting decouples them into normal coordinates $$\theta_\pm=\theta_1\pm\theta_2$$:

$$
\omega_+^2=\frac{g}{\ell}\quad(\text{in phase, spring relaxed}),\qquad
\omega_-^2=\frac{g}{\ell}+\frac{2k}{m}\quad(\text{out of phase}).
$$

Starting one pendulum at rest excites both modes equally, and their slow **beating** transfers energy back and forth between the pendulums at frequency $$\tfrac12(\omega_--\omega_+)$$ — the classic demonstration of weak coupling.

</div>

---

## Rigid-body dynamics

AP-level rotation handles fixed-axis problems with a single moment of inertia $$I$$. Olympiad rigid-body motion requires the full vector relationship between angular velocity and angular momentum.

### The inertia tensor and principal axes

In general $$\vec L$$ is **not** parallel to $$\vec\omega$$; they are related by the **inertia tensor**,

$$
L_i=\sum_j I_{ij}\,\omega_j,\qquad
I_{ij}=\sum_m m\left(r^2\delta_{ij}-r_i r_j\right),
$$

a symmetric matrix. Every body has three orthogonal **principal axes** along which the tensor is diagonal; spin about a principal axis makes $$\vec L\parallel\vec\omega$$ and the rotation is balanced. Off a principal axis, $$\vec L$$ wobbles around $$\vec\omega$$ and bearings feel a periodic force. The familiar **parallel-axis theorem** $$I=I_{\text{cm}}+Md^2$$ shifts the reference point, and for rolling without slipping the contact constraint $$v_{\text{cm}}=\omega R$$ links translation and rotation, with energy $$\tfrac12 Mv_{\text{cm}}^2+\tfrac12 I_{\text{cm}}\omega^2$$.

### Gyroscopic precession

The key rigid-body equation is still $$\vec\tau=d\vec L/dt$$ — but when $$\vec L$$ is large and the torque is perpendicular to it, the torque **turns** $$\vec L$$ rather than lengthening it.

<div class="theorem-box" markdown="1">

**Example (precessing top).** A symmetric top spins rapidly with spin angular momentum $$L=I\omega$$ along its axis, tilted at angle $$\theta$$ from vertical, pivoting at a point a distance $$r$$ from its center of mass. Gravity exerts a horizontal torque of magnitude $$\tau=mgr\sin\theta$$, perpendicular to $$\vec L$$. In time $$dt$$ this rotates $$\vec L$$ through $$d\phi=\tau\,dt/(L\sin\theta)$$ about the vertical, so the axis **precesses** at

$$
\Omega_p=\frac{\tau}{L\sin\theta}=\frac{mgr}{I\omega},
$$

independent of the tilt angle. Faster spin ⟶ slower precession. (Superimposed on this is a small **nutation** nodding, which appears when the spin is not asymptotically large.)

</div>

For torque-free motion ($$\vec\tau=0$$) of a non-spherical body, $$\vec L$$ is fixed in space but the angular velocity traces a cone around the symmetry axis — **free precession**, governed by Euler's equations

$$
I_1\dot\omega_1=(I_2-I_3)\omega_2\omega_3,\quad\text{and cyclic permutations.}
$$

This is what makes a tumbling phone or a wobbling thrown disk behave the way it does, and underlies the instability of rotation about the intermediate principal axis (the "tennis-racket theorem").

---

## Non-inertial frames and relative motion

Switching to a moving frame is often the difference between a one-line answer and a page of algebra. The basics are also on the [Techniques]({{ '/notes/physics/techniques/' | relative_url }}) page; here we build the full kinematics of relative motion, because olympiad problems frequently combine translation *and* rotation of the observer.

### Translating frames

Let a frame $$S'$$ have its origin at $$\vec R_O(t)$$ relative to an inertial frame $$S$$, with no rotation. A particle's position, velocity, and acceleration relate by simple addition:

$$
\vec r=\vec R_O+\vec r',\qquad
\vec v=\vec V_O+\vec v',\qquad
\vec a=\vec A_O+\vec a' .
$$

If $$S'$$ accelerates ($$\vec A_O\ne 0$$), then in $$S'$$ Newton's law reads $$m\vec a'=\vec F_{\text{real}}-m\vec A_O$$: every object feels a uniform **pseudo-force** $$-m\vec A_O$$, exactly as if gravity had gained a component. This is why a pendulum in a forward-accelerating car hangs back at angle $$\tan\theta=A_O/g$$, settling along the **effective gravity** $$\vec g_{\text{eff}}=\vec g-\vec A_O$$.

### The transport theorem (rotating frames)

The one identity that generates everything about rotating frames: for **any** vector $$\vec A$$, its rates of change as seen in the inertial frame and in a frame rotating at $$\vec\omega$$ differ by $$\vec\omega\times\vec A$$,

$$
\boxed{\ \left(\frac{d\vec A}{dt}\right)_{\text{in}}=\left(\frac{d\vec A}{dt}\right)_{\text{rot}}+\vec\omega\times\vec A\ }.
$$

The first term is how the components change; the $$\vec\omega\times\vec A$$ term is the rotation of the axes themselves. Applying it to the position vector gives the velocity relation, and applying it twice gives the acceleration.

<div class="theorem-box" markdown="1">

**Derivation (velocity and acceleration in a rotating frame).** Apply the transport theorem to $$\vec r$$:

$$
\vec v_{\text{in}}=\vec v_{\text{rot}}+\vec\omega\times\vec r .
$$

Differentiate again in the inertial frame, applying the transport theorem to each rotating-frame vector ($$\vec v_{\text{rot}}$$ and $$\vec r$$):

$$
\vec a_{\text{in}}=\big(\vec a_{\text{rot}}+\vec\omega\times\vec v_{\text{rot}}\big)+\dot{\vec\omega}\times\vec r+\vec\omega\times\big(\vec v_{\text{rot}}+\vec\omega\times\vec r\big).
$$

Collecting terms,

$$
\vec a_{\text{in}}=\vec a_{\text{rot}}+2\,\vec\omega\times\vec v_{\text{rot}}+\vec\omega\times(\vec\omega\times\vec r)+\dot{\vec\omega}\times\vec r .
$$

Solving for the acceleration measured in the rotating frame and multiplying by $$m$$ gives the pseudo-force law below.

</div>

For a frame that both translates and rotates, the full chain is

$$
\vec a_{\text{in}}=\vec A_O+\vec a_{\text{rot}}+2\,\vec\omega\times\vec v_{\text{rot}}+\vec\omega\times(\vec\omega\times\vec r)+\dot{\vec\omega}\times\vec r .
$$

### The pseudo-forces

Moving the kinematic terms to the force side, Newton's law in the rotating frame becomes

$$
m\vec a_{\text{rot}}=\vec F_{\text{real}}
\underbrace{-m\,\vec\omega\times(\vec\omega\times\vec r)}_{\text{centrifugal}}
\underbrace{-2m\,\vec\omega\times\vec v_{\text{rot}}}_{\text{Coriolis}}
\underbrace{-m\,\dot{\vec\omega}\times\vec r}_{\text{Euler}}
-m\vec A_O .
$$

- **Centrifugal:** points outward from the axis with magnitude $$m\omega^2\rho$$ ($$\rho$$ = distance to the axis). It depends only on position, so it acts like an extra potential $$-\tfrac12 m\omega^2\rho^2$$ — this is what flattens planets, sets a rotating fluid's parabolic surface, and lets you treat a steadily rotating system as a *statics* problem under $$\vec g_{\text{eff}}$$.
- **Coriolis:** $$-2m\,\vec\omega\times\vec v_{\text{rot}}$$ acts only on bodies *moving* in the rotating frame, always perpendicular to their velocity, so it does no work — it only bends paths. It governs cyclones, ocean gyres, the Foucault pendulum, and the eastward deflection of falling bodies.
- **Euler:** $$-m\,\dot{\vec\omega}\times\vec r$$ appears only when the spin rate changes; usually zero for steady rotation.

<div class="theorem-box" markdown="1">

**Example (Foucault pendulum).** At latitude $$\lambda$$, the local vertical component of Earth's rotation is $$\omega\sin\lambda$$. A pendulum swinging in a vertical plane feels a horizontal Coriolis force $$-2m\,\vec\omega\times\vec v$$ that slowly rotates its plane of oscillation. Only the vertical part of $$\vec\omega$$ matters for the horizontal swing, so the plane precesses at

$$
\Omega_{\text{Foucault}}=\omega\sin\lambda,
$$

clockwise in the northern hemisphere, with period $$T=2\pi/(\omega\sin\lambda)=(24\ \text{h})/\sin\lambda$$. At the pole it tracks the full $$24$$-hour rotation; at the equator it does not precess at all.

</div>

<div class="theorem-box" markdown="1">

**Example (eastward deflection of a falling body).** Drop a mass from rest at height $$h$$ at latitude $$\lambda$$. To leading order it falls with $$v\approx gt$$ downward; the Coriolis acceleration $$-2\vec\omega\times\vec v$$ then has magnitude $$2\omega g t\cos\lambda$$ pointing **east**. Integrating twice,

$$
x_{\text{east}}=\int_0^{t_f}\!\!\int_0^{t}2\omega g t'\cos\lambda\,dt'\,dt=\tfrac13\,\omega g\cos\lambda\,t_f^3,\qquad t_f=\sqrt{\tfrac{2h}{g}},
$$

so the deflection is $$x_{\text{east}}=\dfrac{\omega\cos\lambda}{3}\sqrt{\dfrac{8h^3}{g}}$$ — small, but real, and a favorite exam application of the Coriolis term.

</div>

When a problem is naturally circular — a bead in a rotating tube, a mass near a Lagrange point, a satellite viewed from a co-rotating frame — moving into the rotating frame replaces "what is the trajectory?" with "where does the effective force balance?"

---

## Adiabatic invariants

When a system oscillates and a parameter (pendulum length, spring constant, box size, field strength) changes **slowly** compared with the oscillation period, energy is *not* conserved — the slowly changing constraint does work on the system. What survives is a particular combination called the **adiabatic invariant**: the action integral over one cycle,

$$
J=\oint p\,dq\approx\text{const},
$$

equal to the area enclosed by the orbit in phase space $$(q,p)$$. "Slowly" means the fractional change per period is tiny, $$\dot\epsilon\,T/\epsilon\ll 1$$; under that condition the phase-space area is squeezed and stretched but its enclosed area is preserved.

<div class="theorem-box" markdown="1">

**Why $$E/\omega$$ is invariant for an oscillator.** For a harmonic oscillator $$H=\dfrac{p^2}{2m}+\tfrac12 m\omega^2 q^2=E$$, the phase-space orbit is an ellipse with semi-axes $$p_{\max}=\sqrt{2mE}$$ and $$q_{\max}=\sqrt{2E/m\omega^2}$$. Its area is

$$
J=\oint p\,dq=\pi\,p_{\max}q_{\max}=\pi\sqrt{2mE}\,\sqrt{\frac{2E}{m\omega^2}}=\frac{2\pi E}{\omega}=E\,T .
$$

So if $$J$$ is conserved while $$\omega$$ drifts slowly,

$$
\frac{E}{\omega}=\text{const}.
$$

Slowly shortening a pendulum ($$\omega=\sqrt{g/\ell}\propto \ell^{-1/2}$$) therefore raises its energy as $$E\propto\omega\propto \ell^{-1/2}$$, while its angular amplitude grows as $$\theta_0\propto \ell^{-3/4}$$ — the classic "pendulum pulled slowly through a hole" result (Einstein's favorite at the 1911 Solvay conference).

</div>

The same idea recurs across physics:

- **Ball in a slowly shrinking box.** A ball bounces between walls a distance $$L$$ apart at speed $$v$$. Over one round trip $$J=\oint p\,dx=2mvL$$, so $$vL=\text{const}$$: the speed rises as $$v\propto 1/L$$ and the energy as $$E=\tfrac12 mv^2\propto 1/L^2$$. (This is the mechanical seed of why an adiabatically compressed gas heats up.)
- **Magnetic moment of a gyrating charge.** A charged particle spiraling in a magnetic field has $$J\propto \mu=\dfrac{mv_\perp^2}{2B}$$, the **first adiabatic invariant** of plasma physics. As the particle drifts into stronger $$B$$, $$v_\perp$$ grows until it reflects — the **magnetic mirror** that traps particles in Earth's radiation belts.
- **Betatron and slow detuning.** Any slowly tuned oscillator (a circuit, a trapped ion, a planetary orbit perturbed over many revolutions) conserves its action even as energy and frequency wander.

On the USAPhO, reach for an adiabatic invariant whenever a system oscillates and *something about it is changing slowly*: it is often the only conserved quantity available, and $$E/\omega$$ or $$\oint p\,dq$$ turns an intractable time-dependent problem into one algebraic relation.

---

## Problem-solving strategy

A decision tree for which tool to reach for:

1. **Constraints, awkward geometry, or you don't want to find constraint forces?** Lagrangian mechanics. Choose smart coordinates, write $$L=T-V$$, and look for cyclic coordinates and the conserved energy function *before* expanding the equations.
2. **Two bodies under a central force, or motion in $$1/r$$ (or $$1/r^2$$ force)?** Reduce to one body, use the effective potential for qualitative behavior, and vis-viva / Kepler's laws for numbers. Don't integrate the trajectory if energy and angular momentum suffice.
3. **Stable equilibrium, "find the frequency of small oscillations"?** Expand the potential to second order; $$\omega=\sqrt{V''/m_{\text{eff}}}$$. For several coordinates, set up $$\det(\mathbf K-\omega^2\mathbf M)=0$$ and find the normal modes.
4. **Spinning, tumbling, or rolling rigid body?** Use $$\vec\tau=d\vec L/dt$$ with the inertia tensor; for a fast spin and perpendicular torque, expect precession $$\Omega_p=\tau/(L\sin\theta)$$ rather than toppling.
5. **Rotating or accelerating frame natural?** Add centrifugal and Coriolis pseudo-forces and look for a static balance.
6. **A parameter changes slowly?** An adiabatic invariant ($$E/\omega$$, or $$\oint p\,dq$$) is probably conserved.

Common traps:

- Forgetting that $$\vec L\parallel\vec\omega$$ only along a principal axis — off-axis spin needs the full tensor.
- Writing $$L=T+V$$ instead of $$T-V$$, or forgetting that the conserved energy function equals $$T+V$$ only for time-independent constraints.
- Using the vis-viva $$a$$ as a radius; $$a$$ is the semi-major axis, equal to $$r$$ only for a circle.
- Treating Coriolis as acting on a stationary object — it only deflects things that are already moving in the rotating frame.
