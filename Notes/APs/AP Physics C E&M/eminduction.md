---
layout: default
title: Electromagnetic Induction
nav_title: "Unit 6: Electromagnetic Induction"
parent: AP Physics C E&M
nav_order: 6
permalink: /notes/physics/eminduction/
---

# Electromagnetic Induction

Electromagnetic induction describes how changing magnetic flux produces electric fields and emf. It connects magnetism to circuits and gives the physical basis for generators, transformers, inductors, and electromagnetic waves.

---

## Useful Variables

- $$\Phi_B$$ = magnetic flux
- $$\mathcal{E}$$ = induced emf
- $$N$$ = number of turns in a coil
- $$L$$ = inductance
- $$I$$ = current
- $$U_B$$ = magnetic field energy
- $$\tau$$ = time constant

---

## Faraday's Law

Magnetic flux is

$$
\Phi_B=\int \vec{B}\cdot d\vec{A}.
$$

Faraday's law says the induced emf around a loop is

$$
\mathcal{E}=-\frac{d\Phi_B}{dt}.
$$

For a coil with $$N$$ turns,

$$
\mathcal{E}=-N\frac{d\Phi_B}{dt}.
$$

Changing flux can come from changing magnetic field strength, changing loop area, changing the angle between field and area vector, or moving a circuit through a nonuniform field.

---

## Lenz's Law

The negative sign in Faraday's law is **Lenz's law**: the induced current produces a magnetic effect that opposes the change in flux that caused it.

Lenz's law is conservation of energy in disguise. If induced currents helped the flux change instead of opposing it, systems could generate energy from nothing.

To determine induced current direction:

1. Identify whether the magnetic flux through the loop is increasing or decreasing.
2. Decide what magnetic field direction the induced current must create to oppose that change.
3. Use the right-hand rule for loops to get current direction.

---

## Motional Emf

A conducting rod of length $$\ell$$ moving with speed $$v$$ perpendicular to a magnetic field has motional emf

$$
\mathcal{E}=B\ell v.
$$

This comes from the magnetic force on charges in the rod:

$$
\vec{F}_B=q\vec{v}\times\vec{B}.
$$

Charges separate until the electric force balances the magnetic force:

$$
qE=qvB.
$$

Since $$\mathcal{E}=E\ell$$, the result is $$\mathcal{E}=B\ell v$$.

More generally,

$$
\mathcal{E}=\oint(\vec{v}\times\vec{B})\cdot d\vec{\ell}
$$

for moving conductors.

---

## Induced Current and Magnetic Braking

If a circuit has resistance $$R$$, induced current is

$$
I=\frac{\mathcal{E}}{R}.
$$

The induced current experiences magnetic forces that oppose the motion or flux change. This produces magnetic braking and eddy current damping. The mechanical power required to move a conductor through a magnetic field becomes electrical power and then usually thermal energy:

$$
P_{\text{mech}}=P_{\text{electric}}=I^2R
$$

in ideal steady cases.

---

## Induced Electric Fields

Changing magnetic flux creates a nonconservative electric field. The Maxwell-Faraday equation in integral form is

$$
\oint \vec{E}\cdot d\vec{\ell}=-\frac{d\Phi_B}{dt}.
$$

Unlike electrostatic fields, induced electric fields can have closed field lines. Because the field is nonconservative, a single scalar electric potential cannot fully describe it around a closed loop.

---

## Inductance

An inductor stores energy in a magnetic field. Its inductance is defined by the flux linkage per current:

$$
N\Phi_B=LI.
$$

When current changes, the inductor produces a back emf:

$$
\mathcal{E}_L=-L\frac{dI}{dt}.
$$

The negative sign means the inductor opposes changes in current. It resists current changes, not current itself.

For a long ideal solenoid,

$$
L=\mu_0 n^2A\ell,
$$

where $$n=N/\ell$$ is turns per unit length, $$A$$ is cross-sectional area, and $$\ell$$ is solenoid length.

---

## Energy Stored in an Inductor

The energy stored in an inductor carrying current $$I$$ is

$$
U_B=\frac{1}{2}LI^2.
$$

The magnetic energy density is

$$
u_B=\frac{B^2}{2\mu_0}.
$$

This parallels capacitor energy:

$$
U_E=\frac{1}{2}CV^2, \qquad u_E=\frac{1}{2}\varepsilon_0E^2.
$$

---

## LR Circuits

For a resistor and inductor in series connected to a battery,

$$
\mathcal{E}-IR-L\frac{dI}{dt}=0.
$$

The current grows as

$$
I(t)=\frac{\mathcal{E}}{R}\left(1-e^{-Rt/L}\right).
$$

The LR time constant is

$$
\tau=\frac{L}{R}.
$$

When the battery is removed and current decays through a resistor,

$$
I(t)=I_0e^{-Rt/L}.
$$

At the instant a switch changes, an ideal inductor prevents an instantaneous jump in current.

---

## LC Oscillations

An ideal capacitor-inductor circuit oscillates between electric field energy in the capacitor and magnetic field energy in the inductor:

$$
\frac{1}{2}CV^2+\frac{1}{2}LI^2=\text{constant}.
$$

The charge obeys

$$
\frac{d^2Q}{dt^2}+\frac{1}{LC}Q=0.
$$

Thus

$$
\omega=\frac{1}{\sqrt{LC}},
$$

and

$$
T=2\pi\sqrt{LC}.
$$

Resistance damps the oscillation by converting electromagnetic energy into thermal energy.

---

## Maxwell's Displacement Current

Ampere's law must be extended when electric flux changes. The full integral form is

$$
\oint \vec{B}\cdot d\vec{\ell}=\mu_0 I_{\text{enc}}+\mu_0\varepsilon_0\frac{d\Phi_E}{dt}.
$$

The extra term is the **displacement current** contribution. It lets changing electric fields produce magnetic fields, just as changing magnetic fields produce electric fields. Together these ideas lead to electromagnetic waves.
