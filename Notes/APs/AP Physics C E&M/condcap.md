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

## Conductors in Electrostatic Equilibrium

A conductor contains mobile charge. In electrostatic equilibrium, the charge has stopped rearranging, so the electric field inside the conducting material is zero:

$$
\vec{E}_{\text{inside conductor}}=0.
$$

If an internal electric field existed, mobile charges would accelerate and the conductor would not be in equilibrium.

Consequences:

- The conductor is an equipotential.
- Any excess charge resides on the outer surface.
- The electric field just outside a conductor is perpendicular to the surface.
- A hollow cavity inside a conductor has zero electric field if no charge is placed inside the cavity.

The perpendicular field just outside a conducting surface satisfies

$$
E = \frac{\sigma}{\varepsilon_0},
$$

where $$\sigma$$ is the local surface charge density.

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
