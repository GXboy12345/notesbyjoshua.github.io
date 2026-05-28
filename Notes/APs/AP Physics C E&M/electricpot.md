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

:::theorem{name="Electric potential energy"}
$$
U = \frac{1}{4\pi \varepsilon_0} \frac{Qq}{r} = k \frac{Qq}{r}.
$$

If the separation changes from $$r_i$$ to $$r_f$$, the change in potential energy is

$$
\Delta U = kQq \left( \frac{1}{r_f} - \frac{1}{r_i} \right).
$$

This mirrors gravitation: the interaction energy depends on $$1/r$$, and you must fix a reference (here, $$U \to 0$$ as $$r \to \infty$$) before speaking of “the” energy at a finite separation.
:::

---

## Electric potential (voltage)

:::theorem{name="Electric potential (voltage)"}
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
:::

---

## Work, potential difference, and the field

The electrostatic force is conservative. For a charge $$q$$ moving from an initial point $$a$$ to a final point $$b$$, the work done by the electric field relates to the change in potential energy:

:::theorem{name="Work, potential difference, and the field"}
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
:::

:::warning
Signs matter: a positive charge moving toward lower potential loses potential energy; the field does positive work. Always state whether you mean work by the field or by an external agent.
:::

---

## Relating potential and electric field

Potential and field are linked by

:::theorem{name="Relating potential and electric field"}
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
:::

---

## Equipotential surfaces

:::theorem{name="Equipotential surfaces"}
An **equipotential** is a surface (or curve in 2D diagrams) on which $$V$$ is constant. No work is required to move a charge along an equipotential, because $$\Delta V = 0$$. For that reason, $$\vec{E}$$ is everywhere perpendicular to equipotentials (except where $$\vec{E} = 0$$): a component of $$\vec{E}$$ tangent to the surface would do nonzero work over a small step along the surface, contradicting constant $$V$$.
:::

---

## The electron volt

:::key{name="The electron volt"}
The **electron volt** (eV) is a unit of energy, not potential. One electron volt is the energy change of a particle with charge magnitude $$e$$ when it moves through a potential difference of magnitude $$1 \text{ V}$$:

$$
1 \text{ eV} = e \cdot (1 \text{ V}) \approx 1.602 \times 10^{-19} \text{ J}.
$$

Atomic and nuclear scales use multiples such as keV, MeV, and GeV ($$10^3$$, $$10^6$$, and $$10^9$$ eV). The joule remains the SI energy unit; the eV is a convenience because $$e$$ is the natural charge quantum at microscopic scales.
:::
