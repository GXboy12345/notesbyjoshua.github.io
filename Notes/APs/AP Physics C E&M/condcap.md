---
layout: default
title: Conductors and Capacitors
nav_title: "Unit 3: Conductors and Capacitors"
parent: AP Physics C E&M
nav_order: 3
permalink: /notes/physics/condcap/
---

# Conductors and Capacitors

This unit studies how conductors rearrange charge in electrostatic equilibrium and how capacitors store charge and energy. It builds directly on [electric fields]({{ '/notes/physics/electrostatics/' | relative_url }}) and [electric potential]({{ '/notes/physics/electricpot/' | relative_url }}): conductors are governed by field and potential constraints, and capacitors are devices designed to create controlled electric fields.

---

## Useful Variables

- $$C$$ = capacitance (Units: farads, $$\text{F}=\text{C/V}$$)
- $$Q$$ = charge stored on one plate
- $$V$$ or $$\Delta V$$ = potential difference
- $$U$$ = energy stored in a capacitor
- $$\kappa$$ = dielectric constant
- $$A$$ = plate area
- $$d$$ = plate separation
- $$\varepsilon_0$$ = permittivity of free space

---

## Conductors in electrostatic equilibrium

A conductor has mobile charges. In **electrostatic equilibrium**, the charges are no longer drifting, so the electric field inside the conducting material must be zero. If there were a nonzero internal field, free electrons would accelerate and the charge distribution would not be static.

Important consequences:

- The electric field inside the conducting material is zero.
- If there are no charges trapped in cavities, any excess charge on an isolated conductor lives on its outer surface.
- The electric field just outside a conducting surface is perpendicular to that surface.
- Charge gathers more densely near sharp points, where the surface curvature is larger.

<div class="theorem-box" markdown="1">

**Proof (Excess charge must be on the surface).** Imagine a Gaussian surface entirely inside the metal of a conductor, just below its actual surface, and assume there are no charges inside cavities. Since $$E=0$$ everywhere on that Gaussian surface,

$$
\oint \vec E\cdot d\vec A=0.
$$

Gauss's law gives $$Q_{\text{enc}}/\varepsilon_0=0$$, so $$Q_{\text{enc}}=0$$. Any net excess charge cannot remain in the conducting bulk; it must reside on the surface.

</div>

<div class="theorem-box" markdown="1">

**Example.** Near a small patch of a conductor's surface, use a tiny pillbox with one face just outside the conductor and one face just inside.

Inside the conductor, $$E=0$$. The side wall contributes negligible flux as the pillbox becomes very thin. If the local surface charge density is $$\sigma$$, then

$$
EA=\frac{\sigma A}{\varepsilon_0}
\quad\Rightarrow\quad
E=\frac{\sigma}{\varepsilon_0}.
$$

This differs from the infinite nonconducting sheet result by a factor of $$2$$ because the conductor has zero field on the inside.

</div>

<div class="theorem-box" markdown="1">

**Proof (Field Just Outside a Conductor).** Use a tiny cylindrical Gaussian surface, often called a pillbox, crossing the conductor surface. Let the pillbox have area $$A$$ on each flat face.

Inside the conductor,

$$
\vec{E}=0.
$$

At the surface, the field has no tangential component in electrostatic equilibrium, so the only flux comes through the outer flat face:

$$
\Phi_E=EA.
$$

The enclosed charge is the surface charge on that patch:

$$
q_{\text{enc}}=\sigma A.
$$

Gauss's law gives

$$
EA=\frac{\sigma A}{\varepsilon_0}.
$$

Cancel $$A$$:

$$
E=\frac{\sigma}{\varepsilon_0}.
$$

</div>

---

## Charge Distribution on Conductors

Excess charge spreads out on the surface until the conductor reaches a single potential. On irregular conductors, surface charge density is larger where the radius of curvature is smaller. Sharp points can create large local electric fields, which is why discharge often begins near pointed conductors.

For a spherical conductor of radius $$R$$ carrying charge $$Q$$, the external field is the same as if all charge were concentrated at the center:

$$
E = \frac{1}{4\pi\varepsilon_0}\frac{Q}{r^2}, \qquad r\ge R.
$$

The potential of the conducting sphere relative to infinity is

$$
V = \frac{1}{4\pi\varepsilon_0}\frac{Q}{R}.
$$

---

## Capacitance

Capacitance measures how much charge a device stores per unit potential difference:

$$
C=\frac{Q}{\Delta V}.
$$

The charge $$Q$$ means the magnitude of charge on either conductor. A capacitor with plates $$+Q$$ and $$-Q$$ stores charge separation, not net charge.

Capacitance depends on geometry and material, not on $$Q$$ or $$\Delta V$$ separately for an ideal linear capacitor.

---

## Parallel-Plate Capacitor

For two large parallel conducting plates of area $$A$$ separated by distance $$d$$ in vacuum or air,

$$
C = \frac{\varepsilon_0 A}{d}.
$$

The field between ideal large plates is approximately uniform:

$$
E = \frac{\sigma}{\varepsilon_0} = \frac{Q}{\varepsilon_0 A}.
$$

Since $$\Delta V = Ed$$,

$$
C = \frac{Q}{\Delta V}=\frac{Q}{Ed}=\frac{\varepsilon_0 A}{d}.
$$

Edge effects are usually ignored in AP Physics C unless the problem explicitly focuses on them.

<div class="theorem-box" markdown="1">

**Proof (Parallel-Plate Capacitance).** For large plates with charge $$+Q$$ and $$-Q$$,

$$
\sigma=\frac{Q}{A}.
$$

The electric field between the plates is approximately

$$
E=\frac{\sigma}{\varepsilon_0}=\frac{Q}{\varepsilon_0 A}.
$$

The potential difference between plates separated by $$d$$ is

$$
\Delta V=Ed=\frac{Qd}{\varepsilon_0 A}.
$$

Using $$C=Q/\Delta V$$,

$$
C=\frac{Q}{Qd/(\varepsilon_0 A)}=\frac{\varepsilon_0 A}{d}.
$$

</div>

---

## Capacitors in Parallel and Series

For capacitors in parallel, the voltage across each capacitor is the same and charges add:

$$
C_{\text{eq}} = C_1+C_2+C_3+\cdots.
$$

For capacitors in series, each capacitor carries the same charge magnitude and voltages add:

$$
\frac{1}{C_{\text{eq}}}=\frac{1}{C_1}+\frac{1}{C_2}+\frac{1}{C_3}+\cdots.
$$

Series combinations have an equivalent capacitance smaller than any individual capacitor in the chain. Parallel combinations have an equivalent capacitance larger than any individual capacitor in the group.

<div class="theorem-box" markdown="1">

**Proof (Capacitors in Series and Parallel).** In parallel, every capacitor is connected across the same two nodes, so each has the same voltage $$\Delta V$$. The total charge supplied is

$$
Q_{\text{tot}}=Q_1+Q_2+\cdots=C_1\Delta V+C_2\Delta V+\cdots.
$$

Since $$Q_{\text{tot}}=C_{\text{eq}}\Delta V$$,

$$
C_{\text{eq}}=C_1+C_2+\cdots.
$$

In series, each capacitor carries the same charge magnitude $$Q$$ because charge cannot pile up indefinitely on the internal connecting plates. The total voltage is

$$
\Delta V_{\text{tot}}=\Delta V_1+\Delta V_2+\cdots
=\frac{Q}{C_1}+\frac{Q}{C_2}+\cdots.
$$

Since $$\Delta V_{\text{tot}}=Q/C_{\text{eq}}$$,

$$
\frac{Q}{C_{\text{eq}}}=Q\left(\frac{1}{C_1}+\frac{1}{C_2}+\cdots\right).
$$

Cancel $$Q$$:

$$
\frac{1}{C_{\text{eq}}}=\frac{1}{C_1}+\frac{1}{C_2}+\cdots.
$$

</div>

---

## Energy Stored in a Capacitor

Charging a capacitor requires work because later charge must be moved onto plates that already have a potential difference. The stored energy is

$$
U = \frac{1}{2}Q\Delta V.
$$

Using $$Q=C\Delta V$$, equivalent forms are

$$
U = \frac{Q^2}{2C}
$$

and

$$
U = \frac{1}{2}C(\Delta V)^2.
$$

The energy density in an electric field is

$$
u_E = \frac{1}{2}\varepsilon_0 E^2.
$$

For a parallel-plate capacitor, multiplying this density by the volume $$Ad$$ between the plates gives the same total energy.

<div class="theorem-box" markdown="1">

**Proof (Capacitor Energy).** When the capacitor already has charge $$q$$, its voltage is

$$
V=\frac{q}{C}.
$$

Bringing in a tiny additional charge $$dq$$ requires work

$$
dW=V\,dq=\frac{q}{C}\,dq.
$$

Integrate from $$0$$ to $$Q$$:

$$
U=\int_0^Q \frac{q}{C}\,dq=\frac{Q^2}{2C}.
$$

Using $$Q=C\Delta V$$ gives

$$
U=\frac{1}{2}Q\Delta V=\frac{1}{2}C(\Delta V)^2.
$$

For parallel plates,

$$
U=\frac{1}{2}C(\Delta V)^2
=\frac{1}{2}\left(\frac{\varepsilon_0 A}{d}\right)(Ed)^2
=\frac{1}{2}\varepsilon_0 E^2(Ad).
$$

Since $$Ad$$ is the volume of the field region,

$$
u_E=\frac{U}{Ad}=\frac{1}{2}\varepsilon_0 E^2.
$$

</div>

---

## Dielectrics

A **dielectric** is an insulating material placed between capacitor plates. It polarizes in an electric field, reducing the effective field for a given free charge. If the dielectric completely fills the gap, the capacitance becomes

$$
C = \kappa C_0,
$$

where $$C_0$$ is the vacuum capacitance and $$\kappa$$ is the dielectric constant.

For a parallel-plate capacitor filled with dielectric,

$$
C = \frac{\kappa\varepsilon_0 A}{d}.
$$

If a charged capacitor is disconnected from a battery, $$Q$$ stays constant when a dielectric is inserted, so $$\Delta V=Q/C$$ decreases. If it remains connected to a battery, $$\Delta V$$ stays constant and additional charge flows onto the plates.

---

## Boundary Ideas

At a conductor surface in electrostatic equilibrium, the tangential component of electric field is zero. Otherwise charges would move along the surface. The normal component just outside the surface is set by surface charge density:

$$
E_{\perp,\text{outside}} - E_{\perp,\text{inside}} = \frac{\sigma}{\varepsilon_0}.
$$

Since $$E_{\perp,\text{inside}}=0$$ in the conductor,

$$
E_{\perp,\text{outside}}=\frac{\sigma}{\varepsilon_0}.
$$
