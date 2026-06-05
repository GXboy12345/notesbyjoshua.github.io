---
layout: default
title: Magnetic Fields and Electromagnetism
nav_title: "Unit 5: Magnetic fields and Electromagnetism"
parent: AP Physics C E&M
nav_order: 5
permalink: /notes/physics/magnetism/
---

# Magnetic Fields and Electromagnetism

Magnetism describes forces on moving charges and currents. Unlike electric fields, magnetic fields do no work on a point charge because the magnetic force is always perpendicular to the charge's velocity. This unit focuses on Lorentz forces, fields produced by currents, and Ampere's law.

---

## Useful Variables

- $$\vec{B}$$ = magnetic field (Units: tesla, $$\text{T}$$)
- $$q$$ = charge
- $$\vec{v}$$ = velocity
- $$I$$ = current
- $$L$$ = length of wire in a magnetic field
- $$\mu_0$$ = permeability of free space = $$4\pi\times10^{-7}\ \text{T}\cdot\text{m/A}$$
- $$\Phi_B$$ = magnetic flux

---

## Magnetic Force on a Moving Charge

A charge moving through a magnetic field feels the magnetic part of the Lorentz force:

$$
\vec{F}_B = q\vec{v}\times\vec{B}.
$$

The magnitude is

$$
F_B = |q|vB\sin\theta.
$$

The force is perpendicular to both $$\vec{v}$$ and $$\vec{B}$$. For positive charges, use the right-hand rule for $$\vec{v}\times\vec{B}$$. For negative charges, reverse the direction.

The full electric and magnetic force is

$$
\vec{F}=q\vec{E}+q\vec{v}\times\vec{B}.
$$

---

## Charged Particles in Uniform Magnetic Fields

If a charge moves perpendicular to a uniform magnetic field, the magnetic force provides centripetal force:

$$
|q|vB=\frac{mv^2}{r}.
$$

Thus

$$
r=\frac{mv}{|q|B}.
$$

The angular frequency is

$$
\omega=\frac{|q|B}{m},
$$

and the period is

$$
T=\frac{2\pi m}{|q|B}.
$$

If the velocity has a component parallel to $$\vec{B}$$, that component is unchanged and the path becomes a helix.

---

## Velocity Selectors and Mass Spectrometers

When electric and magnetic forces oppose each other,

$$
qE=qvB.
$$

Only particles with speed

$$
v=\frac{E}{B}
$$

pass through undeflected. This is the basic idea of a velocity selector.

After velocity selection, a magnetic field can separate particles by mass-to-charge ratio because

$$
r=\frac{mv}{|q|B}.
$$

---

## Magnetic Force on a Current-Carrying Wire

A wire segment carrying current $$I$$ in a magnetic field feels

$$
\vec{F}=I\vec{L}\times\vec{B},
$$

where $$\vec{L}$$ points in the direction of conventional current and has magnitude equal to the length of wire in the field.

The magnitude is

$$
F=ILB\sin\theta.
$$

This force comes from the magnetic forces on the moving charges inside the wire.

---

## Torque on a Current Loop

A current loop in a magnetic field experiences a torque. For a loop with $$N$$ turns, current $$I$$, area $$A$$, and magnetic moment

$$
\vec{\mu}=NI\vec{A},
$$

the torque is

$$
\vec{\tau}=\vec{\mu}\times\vec{B}.
$$

Its magnitude is

$$
\tau=NIAB\sin\theta.
$$

The potential energy of a magnetic dipole in a uniform magnetic field is

$$
U=-\vec{\mu}\cdot\vec{B}.
$$

---

## Magnetic Fields from Currents

The magnetic field around a long straight wire is

$$
B=\frac{\mu_0 I}{2\pi r}.
$$

The direction follows the right-hand rule: thumb in the direction of conventional current, curled fingers show the magnetic field direction.

At the center of a circular loop of radius $$R$$,

$$
B=\frac{\mu_0 I}{2R}.
$$

For $$N$$ identical turns,

$$
B=\frac{\mu_0 NI}{2R}.
$$

Inside a long ideal solenoid,

$$
B=\mu_0 nI,
$$

where $$n=N/L$$ is turns per unit length.

---

## Biot-Savart Law

For a current element, the magnetic field contribution is

$$
d\vec{B}=\frac{\mu_0}{4\pi}\frac{I\,d\vec{\ell}\times\hat{r}}{r^2}.
$$

Use Biot-Savart when symmetry is not enough for Ampere's law but the current geometry is integrable. The cross product means only the component of $$d\vec{\ell}$$ perpendicular to the line from source to field point contributes.

---

## Ampere's Law

Ampere's law relates magnetic field circulation to enclosed current:

$$
\oint \vec{B}\cdot d\vec{\ell}=\mu_0 I_{\text{enc}}.
$$

It is most useful with high symmetry, such as long straight wires, solenoids, and toroids. Choose an Amperian loop so $$\vec{B}$$ is either constant and parallel to $$d\vec{\ell}$$ or perpendicular to it.

For a toroid with $$N$$ turns,

$$
B=\frac{\mu_0 NI}{2\pi r}
$$

inside the core, under the ideal toroid approximation.

---

## Magnetic Forces Between Parallel Wires

Two long parallel wires carrying currents $$I_1$$ and $$I_2$$ separated by distance $$d$$ exert forces on each other. The force per unit length is

$$
\frac{F}{L}=\frac{\mu_0 I_1I_2}{2\pi d}.
$$

Currents in the same direction attract. Currents in opposite directions repel.

---

## Magnetic Flux

Magnetic flux through a surface is

$$
\Phi_B=\int \vec{B}\cdot d\vec{A}.
$$

For a uniform field through a flat surface,

$$
\Phi_B=BA\cos\theta.
$$

Magnetic flux becomes central in [electromagnetic induction]({{ '/notes/physics/eminduction/' | relative_url }}).
