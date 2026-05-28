---
layout: default
title: Electric Fields and Forces
nav_title: "Unit 1: Electric Charges and Fields"
parent: AP Physics C E&M
nav_order: 1
permalink: /notes/physics/electrostatics/
---

# Electric Forces and Fields

This unit is the foundation of electricity: how charge produces forces, how we describe those forces with fields, and how symmetry lets us compute fields efficiently. The subject is often called electrostatics when charges are at rest and magnetic effects from motion are absent or treated separately.

---

## Useful Variables

:::key{name="Useful Variables"}

- $$q$$ = charge (Units: Coulombs (C))
- $$e$$ = the magnitude charge of an electron/proton = $$1.602 \times 10^{-19} \text{ C}$$
- $$k$$ = Coulomb's constant = $$8.99 \times 10^9 \text{ N}\cdot\text{m}^2/\text{C}^2$$
- $$\varepsilon_0$$ = permittivity of free space = $$8.85 \times 10^{-12} \text{ C}^2/(\text{N}\cdot\text{m}^2)$$ (Equivalently, the units could also be written as $$\frac{F}{m}$$, F = Farads)
- $$E$$ = electric field (Units: $$\frac{N}{C}$$)
-$$\lambda$$ = charge per unit length (Units: $$\frac{C}{m}$$)
- $$\sigma$$ = charge per unit area (Units: $$\frac{C}{m^2}$$)
- $$\rho$$ = charge per unit volume (Units: $$\frac{C}{m^3}$$)
- $$\Phi_E$$ = electric flux (Units: $$\frac{N \times m^2}{C}$$)

:::

---

## Electric charge

Charge is a fundamental property of matter. **Protons** carry a positive charge and **electrons** a negative charge of the same magnitude. The elementary charge has magnitude

$$
e = 1.602 \times 10^{-19} \text{ C}.
$$

By convention, the proton’s charge is $$+e$$ and the electron’s is $$-e$$. The SI unit of charge is the coulomb (C).

In ordinary matter, charge is transferred by **moving electrons**; ion cores (with protons) do not hop between objects in classroom electrostatics. A positively charged object has lost electrons; a negatively charged one has gained them.

### Quantization of charge

:::theorem{name="Quantization of charge"}
Experiments (notably Millikan’s oil-drop work) show that the charge on any isolated object occurs in discrete steps. **Quantization of charge** means the total charge $$q$$ on a body satisfies

$$
q = n e, \quad n \in \mathbb{Z}.
$$

There is no known stable macroscopic object with charge that is a fraction of an electrons since $$n$$ is an integer. (Quarks carry fractional charge, but they are confined (meaning they have to be in pairs/trios); net observable charge remains integer multiples of $$e$$.)
:::

---

## Conservation of charge

:::theorem{name="Conservation of charge"}
**Conservation of charge** states that the total charge in an isolated system stays constant over time. Charge is not created or destroyed; it is redistributed. Together with conservation of energy and momentum, this principle constrains what reactions and contact processes are possible and underlies much of circuit and field reasoning later in the course.
:::

---

## Electroscopes, grounding, and charging

An **electroscope** uses thin metal leaves (or a similar mechanical indicator) that repel when they receive the same sign of charge, giving a rough measure of whether charge is present and sometimes how much.

:::note
- **Grounding** connects a conductor to the Earth (or another large reservoir). The Earth supplies or accepts electrons until the conductor reaches a common potential with the ground; in practice, a grounded object is often treated as neutral after the process finishes.
- **Charging by conduction** means direct contact. If a charged rod touches a neutral electroscope, charge shares between them; by conservation of charge, both end up with net charge of the same sign (not necessarily equal magnitude unless capacitances match, but the sign is shared in the simple picture).
- **Charging by induction** needs no transfer of charge from the rod to the electroscope if the rod never touches the scope. A charged object is brought near, polarizing the conductor; while the influence is present, the electroscope is grounded so charge can leave or enter; the ground connection is broken first, then the inducing object is removed. The electroscope retains a net charge opposite in sign to the inducer, because electrons were driven by the external field and then trapped when the path to ground was removed.
:::

---

## Polarization

:::note
**Polarization** is the separation of positive and negative charge within a neutral object when a charged object is brought nearby. A charged object can polarize a neutral insulator or conductor: internal charge shifts so that one side of the material presents a net excess closer to the inducer. For example, a negative balloon near a wall pushes electrons in the wall slightly away, so the nearer surface acts more positive. The balloon and wall can attract even though the wall’s net charge is still zero—attraction without net charge on the neutral object is the usual signature of polarization.
:::

---

## Coulomb’s law

The force between two point charges in vacuum (or air, approximately) is given by **Coulomb’s law**:

:::theorem{name="Coulomb's law"}
$$
\vec{F} = k \frac{q_1 q_2}{r^2} \hat{r},
$$
:::

where $$\hat{r}$$ points from the charge exerting the force to the charge experiencing it (or from source to test, depending on textbook convention—always check the direction rule your problems use). The Coulomb constant is

$$
k = 8.99 \times 10^9 \text{ N}\cdot\text{m}^2/\text{C}^2.
$$

Like charges give a repulsive force along $$\hat{r}$$; opposite charges attract (force opposite to $$\hat{r}$$ if $$\hat{r}$$ is defined as above). The magnitude falls as $$1/r^2$$, the same inverse-square geometry as Newton’s law of gravitation, but charge can be positive or negative so the force can be attractive or repulsive.

---

## Permittivity of free space

It is convenient to write

:::key{name="Permittivity of free space"}
$$
k = \frac{1}{4\pi \varepsilon_0},
$$

so Coulomb’s law becomes $$\vec{F} = \frac{1}{4\pi \varepsilon_0} \frac{q_1 q_2}{r^2} \hat{r}$$. The constant $$\varepsilon_0$$ is the **permittivity of free space**,

$$
\varepsilon_0 = 8.85 \times 10^{-12} \text{ C}^2/(\text{N}\cdot\text{m}^2)
$$

(equivalently farads per meter, $$\text{F/m}$$). It sets how electric fields in vacuum relate to source charge in SI form.
:::

---

## Superposition principle

:::theorem{name="Superposition principle"}
The **superposition principle** for electrostatics says that the total force on a charge is the vector sum of the forces from every other charge, computed as if each pair were alone:

$$
\vec{F}_{\text{net}} = \sum_i \vec{F}_i.
$$

In practice: sketch each contribution, resolve into components if the geometry demands it, then add. The principle extends to fields once the field from each source is known.
:::

---

## Electric field

:::theorem{name="Electric field"}
The **electric field** $$\vec{E}$$ at a point is defined as the force per unit charge on a small positive test charge $$q_0$$:

$$
\vec{E} = \frac{\vec{F}}{q_0}, \qquad \text{units: N/C (or V/m)}.
$$

The field is attributed to source charges; conceptually it exists whether or not a test charge is present. By convention, $$\vec{E}$$ points in the direction of the force on a positive test charge, so a negative charge in the same field feels a force $$\vec{F} = q\vec{E}$$ opposite to $$\vec{E}$$.

For a single point charge $$Q$$,

$$
\vec{E} = \frac{1}{4\pi \varepsilon_0} \frac{Q}{r^2} \hat{r}.
$$
:::

---

## Continuous charge distributions

When charge is spread through a line, surface, or volume, describe it with a density:

:::key{name="Charge densities"}
$$
\lambda = \frac{dq}{dL} \quad \text{(charge per unit length)},
$$

$$
\sigma = \frac{dq}{dA} \quad \text{(charge per unit area)},
$$

$$
\rho = \frac{dq}{dV} \quad \text{(charge per unit volume)}.
$$
:::

The field obeys superposition in integral form:

:::theorem{name="Continuous charge distributions"}
$$
\vec{E} = \frac{1}{4\pi \varepsilon_0} \int \frac{dq}{r^2} \hat{r},
$$

or, for a scalar magnitude contribution along a chosen axis after symmetry,

$$
dE = \frac{1}{4\pi \varepsilon_0} \frac{dq}{r^2}
$$

with $$dq$$ replaced by $$\lambda\, dL$$, $$\sigma\, dA$$, or $$\rho\, dV$$ according to the geometry. Set up coordinates, exploit symmetry, and integrate.
:::

---

## Field lines

:::note
Field lines are a pictorial tool: they leave positive charge, terminate on negative charge, and their spacing indicates field strength (closer lines mean larger $$|\vec{E}|$$). Field lines never cross, because the field at a point has a single direction.
:::

---

## Electric flux and Gauss’s law

**Electric flux** measures how much electric field passes through a surface. For a flat area $$\vec{A}$$ (magnitude equal to area, direction along the normal) and uniform $$\vec{E}$$,

:::theorem{name="Electric flux"}
$$
\Phi_E = \vec{E} \cdot \vec{A} = EA\cos\theta,
$$

where $$\theta$$ is the angle between $$\vec{E}$$ and the normal. When $$\vec{E}$$ is parallel to the surface, flux through that surface is zero; when perpendicular, $$|\Phi_E|$$ is maximal for fixed $$E$$ and $$A$$.

For a general surface,

$$
\Phi_E = \int \vec{E} \cdot d\vec{A}.
$$
:::

**Gauss’s law** relates the flux through any closed surface to the charge enclosed:

:::theorem{name="Gauss's law"}
$$
\oint \vec{E} \cdot d\vec{A} = \frac{Q_{\text{enc}}}{\varepsilon_0}.
$$

The closed surface used in the integral is called a **Gaussian surface**; it is a mathematical construct, not a physical shell. The law is always true; it is computationally powerful when symmetry lets you pull $$|\vec{E}|$$ outside the integral because it is constant on the chosen surface.
:::

:::tip
Gauss’s law is especially efficient for:

- spherically symmetric charge (use a concentric sphere),
- infinite cylindrical symmetry (use a coaxial cylinder),
- infinite planar symmetry (use a pillbox).

Choose a surface on which $$E$$ is constant and parallel or perpendicular to $$d\vec{A}$$ on each piece, so the flux reduces to $$E$$ times an area.
:::
