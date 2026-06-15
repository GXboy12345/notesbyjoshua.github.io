---
layout: default
title: Electric Potential
nav_title: "Unit 2: Electric Potential"
parent: AP Physics C E&M
nav_order: 2
permalink: /notes/physics/electricpot/
---

# Electric Potential

Where [Unit 1]({{ '/notes/physics/electrostatics/' | relative_url }}) emphasized electric field and force, this unit uses **electric potential** and **electric potential energy**: scalar quantities that often simplify multi-charge problems and connect directly to work and circuits. The electrostatic field is **conservative**, so potential is well-defined: path does not matter, only endpoints.

---

## Electric potential energy

For two point charges $$Q$$ and $$q$$ separated by distance $$r$$, with the usual choice that potential energy is zero when the charges are infinitely far apart, the **electric potential energy** of the pair is

$$
U = \frac{1}{4\pi \varepsilon_0} \frac{Qq}{r} = k \frac{Qq}{r}.
$$

If the separation changes from $$r_i$$ to $$r_f$$, the change in potential energy is

$$
\Delta U = kQq \left( \frac{1}{r_f} - \frac{1}{r_i} \right).
$$

This mirrors gravitation: the interaction energy depends on $$1/r$$, and you must fix a reference (here, $$U \to 0$$ as $$r \to \infty$$) before speaking of “the” energy at a finite separation.

---

## Potential energy of several charges

For more than two charges, the total potential energy is the sum over **distinct pairs**:

$$
U = k \sum_{i<j} \frac{q_i q_j}{r_{ij}}.
$$

The condition $$i<j$$ counts each pair exactly once. A clean way to see this is to assemble the configuration one charge at a time: bringing in the first charge takes no work (empty space), the second is brought in against the first charge’s field, the third against the field of the first two, and so on. The total work needed equals $$U$$, and because the electrostatic force is conservative, the answer does not depend on the order of assembly.

---

## Electric potential (voltage)

The **electric potential** $$V$$ at a point is potential energy per unit charge for a small positive test charge $$q_0$$ placed at that point:

$$
V = \frac{U}{q_0}.
$$

Units are volts (V), where $$1 \text{ V} = 1 \text{ J/C}$$. Colloquially, $$V$$ is often called voltage, especially when discussing **potential difference** $$\Delta V$$ between two points.

For a single source point charge $$Q$$, with $$V = 0$$ at infinity,

$$
V = \frac{1}{4\pi \varepsilon_0} \frac{Q}{r} = \frac{kQ}{r}.
$$

Potential is a scalar: many-source problems add $$V$$ by ordinary addition (no vector triangles), unlike electric field.

---

## Potential from many charges and distributions

Because potential is a scalar, the potential of several source charges is just the signed algebraic sum

$$
V = k \sum_i \frac{q_i}{r_i},
$$

where $$r_i$$ is the distance from source $$i$$ to the field point. For a continuous distribution, integrate over charge elements:

$$
V = k \int \frac{dq}{r},
\qquad dq = \lambda\, d\ell,\ \sigma\, dA,\ \text{or}\ \rho\, dV.
$$

There are no components to track—only distances—so potential integrals are usually easier than field integrals. When the field is already known from symmetry (Gauss's law), it is often faster to integrate the field instead:

$$
V_b - V_a = -\int_a^b \vec{E} \cdot d\vec{r}.
$$

### Standard results

For a thin spherical shell of radius $$R$$ and total charge $$Q$$ (with $$V \to 0$$ at infinity),

$$
V(r) =
\begin{cases}
kQ/R, & r \le R,\\
kQ/r, & r \ge R.
\end{cases}
$$

Inside the shell the field is zero, so $$V$$ is **constant**, not zero—no field does not mean no potential. For a uniformly charged solid sphere of radius $$R$$,

$$
V(r) =
\begin{cases}
\dfrac{kQ}{2R}\left(3 - \dfrac{r^2}{R^2}\right), & r \le R,\\[2mm]
kQ/r, & r \ge R.
\end{cases}
$$

In both cases $$V$$ is continuous everywhere, even at a boundary where the field changes abruptly.

---

## Work, potential difference, and the field

The electrostatic force is conservative. For a charge $$q$$ moving from an initial point $$a$$ to a final point $$b$$, the work done by the electric field relates to the change in potential energy:

$$
W_{\text{field}} = -\Delta U.
$$

Since $$U = qV$$ for a charge in a fixed external potential (treating $$q$$ as the object being moved),

$$
\Delta U = q \Delta V,
$$

so

$$
W_{\text{field}} = -q \left( V_b - V_a \right) = -q \Delta V.
$$

If an external agent moves the charge slowly against the field with no change in kinetic energy, the work that agent does is the negative of the field’s work:

$$
W_{\text{ext}} = -W_{\text{field}} = q \Delta V.
$$

Signs matter: a positive charge moving toward lower potential loses potential energy; the field does positive work. Always state whether you mean work by the field or by an external agent.

---

## Relating potential and electric field

Potential and field are linked by

$$
\vec{E} = -\nabla V
$$

in differential form. Along a path, the line integral gives the potential difference:

$$
V_b - V_a = -\int_a^b \vec{E} \cdot d\vec{r}.
$$

For a uniform electric field of magnitude $$E$$ and a displacement $$\vec{d}$$,

$$
\Delta V = -\vec{E} \cdot \vec{d}.
$$

If $$\vec{d}$$ points in the direction of $$\vec{E}$$, potential decreases along that direction—consistent with electric field lines pointing from higher to lower potential (for the conventional positive-test-charge picture).

---

## Equipotential surfaces

An **equipotential** is a surface (or curve in 2D diagrams) on which $$V$$ is constant. No work is required to move a charge along an equipotential, because $$\Delta V = 0$$. For that reason, $$\vec{E}$$ is everywhere perpendicular to equipotentials (except where $$\vec{E} = 0$$): a component of $$\vec{E}$$ tangent to the surface would do nonzero work over a small step along the surface, contradicting constant $$V$$.

---

## The electron volt

The **electron volt** (eV) is a unit of energy, not potential. One electron volt is the energy change of a particle with charge magnitude $$e$$ when it moves through a potential difference of magnitude $$1 \text{ V}$$:

$$
1 \text{ eV} = e \cdot (1 \text{ V}) \approx 1.602 \times 10^{-19} \text{ J}.
$$

Atomic and nuclear scales use multiples such as keV, MeV, and GeV ($$10^3$$, $$10^6$$, and $$10^9$$ eV). The joule remains the SI energy unit; the eV is a convenience because $$e$$ is the natural charge quantum at microscopic scales.
