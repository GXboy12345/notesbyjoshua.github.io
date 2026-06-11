---
layout: default
title: Quantum and Modern Physics
parent: USAPhO Prep
nav_order: 3
permalink: /notes/physics/quantnucphys/
---

# Quantum and Nuclear Physics

**Yo ts is temp pls add more when get the chance**

---

## The semiclassical picture

A full treatment of quantum mechanics needs the Schrödinger equation (beyond the scope of USAPhO), but there is a **semiclassical** regime, historically discovered first, by people like Bohr, that explains an enormous amount with almost no machinery. The idea is to treat a particle as a wave, and demand that the wave fit together consistently.

The phase $$\phi$$ of a wave varies in space and time according to its wavenumber and angular frequency,

$$
k = \frac{d\phi}{dx}, \qquad \omega = \frac{d\phi}{dt},
$$

and the group velocity (the speed at which a wavepacket travels) is

$$
v_g = \frac{d\omega}{dk}.
$$

A **standing wave** can only form if the phase lines back up with itself after one round trip:

$$
\oint k\,dx = 2\pi n, \qquad n \in \mathbb{Z}.
$$

For a string of length $$L$$ with two fixed ends this gives $$2kL = 2\pi n$$, so $$k_n = \pi n / L$$ and $$\omega_n = \pi v n / L$$, exactly the familiar result.

### Reflection phase shifts

The naive condition above is not quite complete: a wave can pick up an extra phase when it reflects off a boundary. A reflection off a **fixed (hard) end** adds a phase shift of $$\pi$$. For a string with one fixed and one free end, this single extra $$\pi$$ modifies the round-trip condition to

$$
\oint k\,dx = 2\pi\left(n + \tfrac{1}{2}\right),
$$

which yields

$$
\omega_n = \frac{\pi v}{L}\left(n + \tfrac{1}{2}\right).
$$

For two fixed ends, the two $$\pi$$ shifts add to $$2\pi$$ and have no net effect — which is why we never noticed them above.

## The WKB approximation

In quantum mechanics a particle is described by a wavefunction $$\psi(x,t)$$. Momentum and energy obey the **de Broglie relations**

$$
p = \hbar k, \qquad E = \hbar\omega,
$$

where $$\hbar$$ is the reduced Planck constant (the exact value, $$\hbar = \frac{h}{2\pi} = 1.05 \cdot 10^{-34} J \cdot s$$ is usually given if necessary) and $$\omega$$ denotes angular velocity. For a nonrelativistic particle in a potential $$V(x)$$,

$$
E = \frac{p^2}{2m} + V(x).
$$

The group velocity is then $$v_g = d\omega/dk = dE/dp = p/m$$, which just the ordinary classical velocity. (The same relations hold relativistically if $$E$$ is the relativistic energy and $$p = \gamma m v_g$$.)

Since $$\omega$$ (hence $$E$$) is uniform for a standing wave, these quantum standing waves are **states of definite energy**. The quantization condition becomes the **WKB / Bohr–Sommerfeld** rule:

$$
\oint p\,dx = \left(n + \frac{\alpha}{2\pi}\right) h, \qquad n = 0, 1, 2, \dots
$$

where the integral runs over one full classical period of the motion, and the extra phase $$\alpha$$ accounts for what happens at the turning points.

The rule for $$\alpha$$ at the two ends of the motion:

- A **hard wall** (potential jumps to infinity) contributes $$\pi$$ to $$\alpha$$.
- A **soft turning point** (potential rises smoothly through $$E$$) contributes $$\pi/2$$ to $$\alpha$$.

So a box with two hard walls has $$\alpha = 2\pi$$ (equivalent to $$\alpha = 0$$), while a smooth potential well like the harmonic oscillator has $$\alpha = \pi$$.

The left-hand side $$\oint p\,dx$$ is equivalent to the **adiabatic invariant** of classical mechanics, which is conserved when system parameters change slowly. This guarantees the quantization condition stays self-consistent over time.

<div class="theorem-box" markdown="1">

**Example.** For a particle of mass $$m$$ in a box of length $$L$$ with hard walls, $$\alpha = 0$$ and $$p$$ is constant inside, find the energy inside the box. 

$$\oint p\,dx = 2pL = nh$$, giving $$p = nh/2L$$ and

$$
E_n = \frac{p^2}{2m} = \frac{n^2 h^2}{8 m L^2}.
$$

If instead the "particle" is a photon with $$E = pc$$, the same momenta give the standing-wave (cavity) frequencies $$E_n = nhc/2L$$ — the electromagnetic modes of a box with conducting walls.

</div>

<div class="theorem-box" markdown="1">

For a particle inside a harmonic osciallator with $$V(x) = \tfrac{1}{2}kx^2$$, find the energy of the particle.

The particle turns around at soft boundaries, so $$\alpha = \pi$$. Carrying out $$\oint p\,dx$$ over the ellipse in phase space gives the energy levels

$$
\boxed{E_n = \hbar\omega_0\left(n + \tfrac{1}{2}\right)}, \qquad \omega_0 = \sqrt{\frac{k}{m}}.
$$

Remarkably this is the **exact** answer, even though WKB is an approximation. The leftover $$\tfrac{1}{2}\hbar\omega_0$$ at $$n=0$$ is the **zero-point energy** — the oscillator can never sit perfectly still.

</div>

## Bohr quantization

The integral $$\oint p\,dx$$ can use any conjugate momentum–coordinate pair. For rotational motion,

$$
\oint L\,d\theta = nh.
$$

When angular momentum is conserved the integrand is constant, so the left side is $$2\pi L$$, giving **Bohr's condition**

$$
L = n\hbar.
$$

Rotation differs from back-and-forth motion in two ways: $$n$$ can be positive or negative (clockwise vs. counterclockwise), and there is no $$\alpha$$ phase, because the particle circulates freely without ever reflecting.

<div class="theorem-box" markdown="1">

**Example.** Find the energy of an electron at energy level $$n$$ of a hydrogen atom. Assume circular orbit.

Quantize angular momentum:

$$
\frac{mv^2}{r} = \frac{e^2}{4\pi\epsilon_0 r^2}, \qquad L = mvr = n\hbar.
$$

Solving for $$v$$ and substituting gives the allowed radii

$$
r_n = \frac{4\pi\epsilon_0 \hbar^2}{m e^2}\, n^2 = a_0 n^2, \qquad a_0 \approx 5.3\times10^{-11}\,\text{m},
$$

where $$a_0$$ is the **Bohr radius**. For an inverse-square force the total energy is half the potential energy, so

$$
E_n = -\frac{e^2}{8\pi\epsilon_0 r_n} = -\frac{m e^4}{2(4\pi\epsilon_0)^2 \hbar^2}\,\frac{1}{n^2}.
$$

The constant prefactor is the **Rydberg energy**, $$13.6\,\text{eV}$$.

</div>

The same method handles hydrogen-like systems: for **positronium** (electron + positron), replace $$m$$ with the reduced mass $$\mu = m_e/2$$, halving all the binding energies.

### The correspondence principle

The **correspondence principle** says quantum results must smoothly match classical ones in the limit $$\hbar \to 0$$, i.e. for large quantum numbers $$n \to \infty$$. For high $$n$$ you can superpose nearby orbitals into a sharply peaked wavepacket that orbits just like a classical particle, which is why the Bohr model still describes highly excited **Rydberg atoms**. In fact, demanding that the classical orbital frequency match the quantum transition frequency $$\Delta E = \hbar\omega$$ as $$n\to\infty$$ is exactly how Bohr originally *derived* his quantization rule.

## Higher dimensions and degeneracy

For a system with several degrees of freedom, the WKB condition holds for each one independently:

$$
\oint p_i\,dx_i = \left(n_i + \frac{\alpha_i}{2\pi}\right) h.
$$

Several distinct sets of quantum numbers can give the same energy; the number of states at one energy is the **degeneracy** of that level.

For a particle in a 2D or 3D box of side $$L$$ (hard walls, all $$\alpha_i = 0$$),

$$
E = \frac{h^2}{8mL^2}\left(n_1^2 + n_2^2 + \cdots\right),
$$

and degeneracies arise whenever different integer combinations give the same sum of squares.

### Density of states

For a large box it is easier to *count* states than to list them. Working in **momentum space** with axes $$p_x, p_y, p_z$$:

- **Hard walls**: $$k_i = (\pi/L)n_i$$ with $$n_i$$ a positive integer. States live in the first octant, one per volume $$(\pi\hbar/L)^3$$.
- **Periodic boundaries**: $$k_i = (2\pi/L)n_i$$ with $$n_i$$ any integer. States fill all of momentum space, one per volume $$(2\pi\hbar/L)^3$$.

Both give the **same density of states**. The number of states with energy at most $$E_0$$ (a sphere of radius $$p = \sqrt{2mE_0}$$) is

$$
N \approx \frac{4}{3}\pi (2mE_0)^{3/2}\left(\frac{2\pi\hbar}{L}\right)^{-3} = \frac{V}{6\pi^2}\left(\frac{2mE_0}{\hbar^2}\right)^{3/2}.
$$

The boundary conditions don't matter for bulk statistical properties — a fact worth remembering, since Rayleigh originally botched it by using hard walls *and* allowing negative $$n_i$$, overcounting by a factor of 8 (later fixed by Jeans).

## The uncertainty principle

<div class="theorem-box" markdown="1">

**Heisenberg uncertainty.** The standard deviations of position and momentum obey

$$
\Delta x\,\Delta p \ge \frac{\hbar}{2}.
$$

</div>

On Olympiad problems this is mostly used for **order-of-magnitude estimates**, where numeric factors don't matter. The semiclassical limit is just the regime where the required uncertainty is small compared to the scales involved, reached for $$n \gg 1$$.

**Example — oscillator ground state.** With kinetic energy $$\sim (\Delta p)^2/2m$$ and potential $$\sim \tfrac{1}{2}k(\Delta x)^2$$, and using $$\Delta p \sim \hbar/\Delta x$$,

$$
E \sim k(\Delta x)^2 + \frac{\hbar^2}{m(\Delta x)^2}.
$$

Minimizing over $$\Delta x$$ gives $$(\Delta x)^2 \sim \hbar/\sqrt{km}$$ and $$E \sim \hbar\sqrt{k/m} \sim \hbar\omega$$, reproducing the zero-point energy. The same trick on hydrogen yields the Bohr radius and Rydberg.

**Example — single-slit diffraction.** A photon through a slit of width $$a$$ acquires transverse momentum $$\Delta p_y \sim h/a$$, so the beam spreads by an angle $$\Delta\theta \sim \Delta p_y/p_x \sim \lambda/a$$, giving a pattern of width $$\Delta y \sim D\lambda/a$$ on a screen at distance $$D$$. The quantum derivation matches the classical wave-optics one — and now applies to matter waves too, with $$\lambda = h/p$$.

### Energy–time uncertainty

If a system is observed for only a finite time $$\Delta t$$, or changes its state significantly in time $$\Delta t$$, its energy is uncertain by

$$
\Delta E\,\Delta t \ge \frac{\hbar}{2}.
$$

A common phrasing is that "energy conservation can be violated by $$\Delta E$$ for a time $$\Delta t$$." This is technically *wrong* — quantum systems always conserve energy — but it gives the right answers by dimensional analysis. A typical application: an unstable particle with lifetime $$\tau$$ has an unavoidable energy (mass) width $$\Delta E \sim \hbar/\tau$$.

## Bosons and fermions

When many non-interacting identical particles are put together, their behavior splits into two types:

- **Fermions** obey the **Pauli exclusion principle** — no two can occupy the same quantum state. The ground state of $$N$$ fermions fills the $$N$$ lowest single-particle states, one per state.
- **Bosons** have no such restriction — any number can pile into the same state.

### Bose–Einstein distribution (photons)

For a mode that can hold any number of photons of energy $$E$$, the Boltzmann weights give occupation probability $$p_n \propto e^{-nE/k_B T}$$. Summing the geometric series, the expected occupation is

$$
\langle n\rangle = \frac{1}{e^{E/k_B T} - 1}.
$$

Applied to the electromagnetic modes of a box (two polarizations per mode), this yields the total energy

$$
U = \frac{L^3 \hbar}{\pi^2 c^3}\int_0^\infty \frac{\omega^3\,d\omega}{e^{\hbar\omega/k_B T}-1},
$$

whose integrand is **Planck's law** for blackbody radiation. Substituting $$x = \hbar\omega/k_B T$$ and using $$\int_0^\infty x^3/(e^x-1)\,dx = \pi^4/15$$ gives the **Stefan–Boltzmann** form

$$
U = \frac{\pi^2}{15}\,\frac{(k_B T)^4}{(\hbar c)^3}\,L^3.
$$

This is the modern "quantum field theory" route: find the classical modes of a field, then let bosons (photons) occupy them. The analogous quantization of a displacement field gives **phonons**.

### Fermi–Dirac distribution (electrons)

For fermions, each state is either empty or singly occupied. Introducing the **chemical potential** $$\mu$$ (the energy cost to add one fermion), the occupation probability is

$$
\langle n\rangle = \frac{1}{e^{(E-\mu)/k_B T} + 1}.
$$

At $$T = 0$$ this is a step function: every state below $$\mu$$ is filled, every state above is empty. The cutoff energy is the **Fermi energy** $$E_F = \mu(T=0)$$.

<div class="theorem-box" markdown="1">

**Fermi energy of a free electron gas.** Filling states (two spins each) up to $$E_F$$ in a box of volume $$V$$ with $$N$$ electrons, the count $$N$$ relates to $$E_F$$ through the density of states, giving

$$
E_F = \frac{h^2}{2m_e}\left(\frac{3N}{8\pi V}\right)^{2/3}.
$$

</div>

### Degeneracy pressure

Because fermions are forced into ever-higher momentum states, a cold Fermi gas exerts pressure even at $$T=0$$. For $$N$$ fermions in volume $$V$$ the ground-state energy scales as $$E \sim N^{5/3}/(mV^{2/3})$$, so

$$
P = -\frac{\partial E}{\partial V} \propto \frac{\hbar^2}{m}\,n^{5/3}, \qquad n = N/V.
$$

This **degeneracy pressure** is what supports compact objects like white dwarfs and neutron stars against gravity.

### Zero-point energy and the Casimir effect

Each standing-wave mode of frequency $$\omega_n$$ carries a zero-point energy $$\tfrac{1}{2}\hbar\omega_n$$. Summing over all modes between two plates (or pins on a string) naively diverges, but the *difference* between the plated configuration and empty space is finite. Regulating the sums with an exponential cutoff and using the famous

$$
1 + 2 + 3 + \cdots \;\to\; -\frac{1}{12}
$$

(which physically means: the regulated sum minus the corresponding integral is $$-1/12$$, independent of the regulator) yields an attractive **Casimir force**. For a string of wave speed $$v$$ and pin separation $$L$$,

$$
F = \frac{\pi\hbar v}{24 L^2}.
$$

For light ($$v = c$$) between conductors this has been measured precisely and confirmed.

---

## Nuclear notation and decay

A nucleus is written $$^A_Z X$$, where $$X$$ is the element, $$A$$ is the **mass number** (protons + neutrons), and $$Z$$ is the **atomic number** (protons). Since $$Z$$ is fixed by $$X$$, it is often omitted.

The common decay channels:

$$
\begin{aligned}
\text{alpha:}\quad & ^A_Z X \to\; ^{A-4}_{Z-2}X' + {}^4_2\text{He} \\[4pt]
\beta^- \text{ decay:}\quad & ^A_Z X \to\; ^{A}_{Z+1}X' + e^- + \bar\nu_e \\[4pt]
\beta^+ \text{ decay:}\quad & ^A_Z X \to\; ^{A}_{Z-1}X' + e^+ + \nu_e \\[4pt]
\text{electron capture:}\quad & ^A_Z X + e^- \to\; ^{A}_{Z-1}X' + \nu_e \\[4pt]
\text{gamma:}\quad & ^A_Z X^* \to\; ^A_Z X + \gamma
\end{aligned}
$$

### Conservation laws

Which decays are allowed is governed by three conserved quantities. In the nuclear setting:

$$
\begin{aligned}
\text{baryon number} &= (\text{protons}) + (\text{neutrons}) \\
\text{electric charge} &= (\text{protons} + \text{positrons}) - (\text{electrons}) \\
\text{electron number} &= (\text{electrons} + \nu_e) - (\text{positrons} + \bar\nu_e)
\end{aligned}
$$

These are what tell you the identity of the missing particle in a reaction. The (anti)neutrinos exist precisely to balance electron number in beta decay.

### Energetics

The energy released equals the drop in rest-mass energy,

$$
\Delta E = (\Delta m)\,c^2,
$$

and a decay can occur spontaneously **only if it lowers the total energy** of the nucleus. At the level of individual nucleons,

$$
n \to p + e^- + \bar\nu_e, \qquad p \to n + e^+ + \nu_e,
$$

and either can be favorable *inside a nucleus* depending on its composition. But a free proton never decays, because the proton is lighter than the neutron. Useful energy scales:

| Process | Scale |
|---|---|
| $$k_B T$$ at room temperature | $$\sim 10^{-2}\,\text{eV}$$ |
| chemical bonds | $$\sim 0.1\text{–}1\,\text{eV}$$ |
| $$k_B T$$ at the Sun's core | $$\sim 10^{3}\,\text{eV}$$ |
| electron rest energy | $$\sim 0.5\,\text{MeV}$$ |
| energy released in nuclear reactions | $$\sim 0.1\text{–}100\,\text{MeV}$$ |
| nucleon rest energy | $$\sim 1\,\text{GeV}$$ |

Because nuclear energies dwarf chemical ones, decay rates are usually insensitive to the chemical environment. (Rare exceptions exist, like electron-capture isotopes such as $$^7$$Be.)

### The radioactive decay law

Radioactive decay is **memoryless**: in any interval $$dt$$ a nucleus has probability $$\lambda\,dt$$ of decaying, regardless of history. The survival probability decays exponentially,

$$
p(t) = e^{-\lambda t}, \qquad \tau = \frac{1}{\lambda} \;(\text{mean lifetime}).
$$

With $$N_0 \gg 1$$ nuclei initially, the number remaining and the **activity** (decay rate) are

$$
N(t) = N_0 e^{-\lambda t}, \qquad A(t) = \left|\frac{dN}{dt}\right| = \lambda N_0 e^{-\lambda t}.
$$

The half-life is $$t_{1/2} = \tau\ln 2$$. Note that isotopes rarely decay in isolation: long decay **chains** mean a short-lived isotope is continually replenished by its longer-lived parents, reaching a steady state (secular equilibrium).

### Tunneling and alpha decay

An alpha particle is held in the nucleus by the short-range strong force but must escape through a **Coulomb barrier**. WKB describes this: in the classically forbidden region $$p$$ is imaginary, so the wavefunction picks up an *imaginary* phase

$$
\theta = \frac{1}{\hbar}\int p\,dx,
$$

meaning it **exponentially decays** across the barrier. The escape probability per collision is $$|e^{i\theta}|^2$$, and the decay timescale comes out as

$$
\tau \sim \tau_{\text{collision}}\, e^{+2|\mathrm{Im}\,\theta|}, \qquad \text{with tunneling probability} \;\sim e^{-\sqrt{E_g/E}}.
$$

The strong exponential dependence of lifetime on energy (the Geiger–Nuttall law) is the key feature, and matches experiment. Run in reverse, the same barrier governs **fusion** in stars: averaging the tunneling rate $$e^{-\sqrt{E_g/E}}$$ over a Boltzmann distribution $$e^{-E/k_B T}$$ gives a sharply peaked **Gamow window** of optimal energies.

## Nuclear processes

### Critical mass

A neutron-induced chain reaction runs away when each fission triggers, on average, more than one further fission. The probability a neutron collides before escaping a sample of radius $$r$$ is $$p \sim n\sigma r$$, so criticality occurs at fixed $$r_{\text{crit}} \propto 1/n \propto 1/\rho$$. The critical mass is then

$$
m_{\text{crit}} \propto \rho\, r_{\text{crit}}^3 \propto \frac{1}{\rho^2}.
$$

Compressing the material lowers the critical mass — the principle behind implosion-type weapons.

### The liquid-drop model

Model the nucleus as an incompressible drop of uniform density, so volume $$\propto A$$, surface area $$\propto A^{2/3}$$, and radius $$\propto A^{1/3}$$. The binding energy has competing contributions:

$$
E_B = a_V A - a_S A^{2/3} - a_C \frac{Z^2}{A^{1/3}} - \cdots
$$

- **Volume term** $$+a_V A$$: the strong force is short-ranged, so each nucleon binds only to its neighbors — energy proportional to the number of nucleons.
- **Surface term** $$-a_S A^{2/3}$$: nucleons at the surface have fewer neighbors, costing energy proportional to surface area.
- **Coulomb term** $$-a_C Z^2/A^{1/3}$$: the long-ranged electromagnetic repulsion has every proton push on every other, scaling as $$Z^2$$ over the radius.

Further terms (asymmetry, pairing) require quantum mechanics to motivate. This model explains the peak of the binding-energy-per-nucleon curve near iron, and hence why both fusion of light nuclei and fission of heavy nuclei release energy.

### Fusion in stars

The Sun runs on the **proton–proton chain**, net $$4\,{}^1\text{H} \to {}^4\text{He} + 2e^+ + 2\nu_e + \gamma$$. Heavier stars also use the **CNO cycle**, in which carbon acts as a catalyst:

$$
^{12}\text{C} \xrightarrow{p} {}^{13}\text{N} \xrightarrow{\beta^+} {}^{13}\text{C} \xrightarrow{p} {}^{14}\text{N} \xrightarrow{p} {}^{15}\text{O} \xrightarrow{\beta^+} {}^{15}\text{N} \xrightarrow{p} {}^{12}\text{C} + {}^4\text{He}.
$$

The $$^{12}$$C is regenerated, so the net reaction is again four protons fusing into one helium nucleus.

---

## Basic particle physics

The **Standard Model** fundamental particles, worth knowing roughly:

- **Quarks** (six flavors: up, down, charm, strange, top, bottom) — charges $$+\tfrac{2}{3}$$ or $$-\tfrac{1}{3}$$; they feel the strong force and combine into protons, neutrons, and other hadrons.
- **Leptons**: the electron, muon, tau (charge $$-1$$) and their neutrinos (neutral); they do *not* feel the strong force.
- **Gauge bosons**: photon (electromagnetism), $$W^\pm$$ and $$Z$$ (weak force), gluons (strong force).
- **Higgs boson**: gives mass to the others.

Almost everything in the everyday world is made of up quarks, down quarks, and electrons. Quarks and gluons feel the **strong** interaction; all the fermions feel the **weak** interaction. The exotic particles (muons, neutrinos, pions, quarks, vector bosons) play no role in chemistry because they are either too short-lived, too weakly interacting, or confined inside nucleons — chemistry only sees the stable electrons and the nuclear charge.

### A forbidden process

A free electron cannot absorb a single photon, $$e^- + \gamma \to e^-$$: energy and momentum conservation cannot be satisfied simultaneously (in the electron's rest frame the photon brings momentum but the final electron would need energy without the right momentum). By time reversal, a free electron cannot emit a single photon either. Atoms *can* absorb photons because the recoil is taken up by the rest of the atom (or nucleus); free electrons interact with light only through processes like Thomson scattering, $$e^- + \gamma \to e^- + \gamma$$.

---

## Atomic physics

Beyond the Bohr model, most quantitative atomic physics needs full quantum mechanics — but given the energy levels, transitions are straightforward.

An electron falling from level $$E_1$$ to $$E_0$$ emits a photon of angular frequency

$$
\omega = \frac{E_1 - E_0}{\hbar}.
$$

Because levels are discrete, the emitted light has a sharply peaked spectrum, and each element's characteristic **spectral lines** identify it. Conversely, an atom can **absorb** a photon to climb from $$E_0$$ to $$E_1$$; a field also drives **stimulated emission** from $$E_1$$ down to $$E_0$$ (the basis of lasers). If a photon has more than enough energy, it can eject the electron entirely — the **photoelectric effect**, with final kinetic energy $$\hbar\omega - E$$ (where $$-E$$ was the binding energy).

### Spectral line broadening

Real lines have nonzero width, from two main effects:

- **Lifetime (natural) broadening.** An excited state living for time $$\Delta t$$ has an energy spread $$\Delta E \sim \hbar/\Delta t$$ by the energy–time uncertainty principle, giving a wavelength spread

$$
\frac{\Delta\lambda}{\lambda} \sim \frac{\Delta E}{E} \sim \frac{\hbar}{E\,\Delta t}.
$$

- **Doppler broadening.** Thermal motion at temperature $$T$$ shifts wavelengths by the Doppler effect. With typical speed $$v \sim \sqrt{k_B T/m}$$,

$$
\frac{\Delta\lambda}{\lambda} \sim \frac{v}{c} \sim \frac{1}{c}\sqrt{\frac{k_B T}{m}}.
$$

The Sun's spectrum is the reverse situation: a hot continuous (blackbody) source seen through cooler gas, which *absorbs* at its characteristic wavelengths, producing dark **absorption lines** instead of bright emission lines.
