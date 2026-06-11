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

- $$q$$ = charge (Units: Coulombs (C))
- $$e$$ = the magnitude charge of an electron/proton = $$1.602 \times 10^{-19} \text{ C}$$
- $$k$$ = Coulomb's constant = $$8.99 \times 10^9 \text{ N}\cdot\text{m}^2/\text{C}^2$$
- $$\varepsilon_0$$ = permittivity of free space = $$8.85 \times 10^{-12} \text{ C}^2/(\text{N}\cdot\text{m}^2)$$ (Equivalently, the units could also be written as $$\frac{F}{m}$$, F = Farads)
- $$E$$ = electric field (Units: $$\frac{N}{C}$$)
- $$\lambda$$ = charge per unit length (Units: $$\frac{C}{m}$$)
- $$\sigma$$ = charge per unit area (Units: $$\frac{C}{m^2}$$)
- $$\rho$$ = charge per unit volume (Units: $$\frac{C}{m^3}$$)
- $$\Phi_E$$ = electric flux (Units: $$\frac{N \times m^2}{C}$$)

---

## Electric charge

Charge is a fundamental property of matter. **Protons** carry a positive charge and **electrons** a negative charge of the same magnitude. The elementary charge has magnitude

$$
e = 1.602 \times 10^{-19} \text{ C}.
$$

By convention, the proton’s charge is $$+e$$ and the electron’s is $$-e$$. The SI unit of charge is the coulomb (C).

In ordinary matter, charge is transferred by **moving electrons**; ion cores (with protons) do not hop between objects in classroom electrostatics. A positively charged object has lost electrons; a negatively charged one has gained them.

### Quantization of charge

Experiments (notably Millikan’s oil-drop work) show that the charge on any isolated object occurs in discrete steps. **Quantization of charge** means the total charge $$q$$ on a body satisfies

$$
q = n e, \quad n \in \mathbb{Z}.
$$

There is no known stable macroscopic object with charge that is a fraction of an electrons since $$n$$ is an integer. (Quarks carry fractional charge, but they are confined (meaning they have to be in pairs/trios); net observable charge remains integer multiples of $$e$$.)

---

## Conservation of charge

**Conservation of charge** states that the total charge in an isolated system stays constant over time. Charge is not created or destroyed; it is redistributed. Together with conservation of energy and momentum, this principle constrains what reactions and contact processes are possible and underlies much of circuit and field reasoning later in the course.

---

## Electroscopes, grounding, and charging

An **electroscope** uses thin metal leaves (or a similar mechanical indicator) that repel when they receive the same sign of charge, giving a rough measure of whether charge is present and sometimes how much.

- **Grounding** connects a conductor to the Earth (or another large reservoir). The Earth supplies or accepts electrons until the conductor reaches a common potential with the ground; in practice, a grounded object is often treated as neutral after the process finishes.
- **Charging by conduction** means direct contact. If a charged rod touches a neutral electroscope, charge shares between them; by conservation of charge, both end up with net charge of the same sign (not necessarily equal magnitude unless capacitances match, but the sign is shared in the simple picture).
- **Charging by induction** needs no transfer of charge from the rod to the electroscope if the rod never touches the scope. A charged object is brought near, polarizing the conductor; while the influence is present, the electroscope is grounded so charge can leave or enter; the ground connection is broken first, then the inducing object is removed. The electroscope retains a net charge opposite in sign to the inducer, because electrons were driven by the external field and then trapped when the path to ground was removed.

---

## Polarization

**Polarization** is the separation of positive and negative charge within a neutral object when a charged object is brought nearby. A charged object can polarize a neutral insulator or conductor: internal charge shifts so that one side of the material presents a net excess closer to the inducer. For example, a negative balloon near a wall pushes electrons in the wall slightly away, so the nearer surface acts more positive. The balloon and wall can attract even though the wall’s net charge is still zero—attraction without net charge on the neutral object is the usual signature of polarization.

**ADD IMAGE**

---

## Coulomb’s law

The force between two point charges in vacuum (or air, approximately) is given by **Coulomb’s law**:

$$
\vec{F} = k \frac{q_1 q_2}{r^2} \hat{r},
$$

where $$\hat{r}$$ points from the charge exerting the force to the charge experiencing it (or from source to test, depending on textbook convention—always check the direction rule your problems use). The Coulomb constant is

$$
k = 8.99 \times 10^9 \text{ N}\cdot\text{m}^2/\text{C}^2.
$$

Like charges give a repulsive force along $$\hat{r}$$; opposite charges attract (force opposite to $$\hat{r}$$ if $$\hat{r}$$ is defined as above). The magnitude falls as $$1/r^2$$, the same inverse-square geometry as Newton’s law of gravitation, but charge can be positive or negative so the force can be attractive or repulsive.

<div class="theorem-box" markdown="1">

**Example.** Suppose $$q_1=+2.0\,\mu\text{C}$$ is at $$x=0$$ and $$q_2=-3.0\,\mu\text{C}$$ is at $$x=0.50\text{ m}$$. Find the force on $$q_1$$.

The magnitude is

$$
F=k\frac{|q_1q_2|}{r^2}
=\left(8.99\times10^9\right)\frac{(2.0\times10^{-6})(3.0\times10^{-6})}{(0.50)^2}
=0.216\text{ N}.
$$

Because the charges are opposite, $$q_1$$ is attracted toward $$q_2$$, so the force on $$q_1$$ points in the $$+x$$ direction.

</div>

---

## Permittivity of free space

It is convenient to write

$$
k = \frac{1}{4\pi \varepsilon_0},
$$

so Coulomb’s law becomes $$\vec{F} = \frac{1}{4\pi \varepsilon_0} \frac{q_1 q_2}{r^2} \hat{r}$$. The constant $$\varepsilon_0$$ is the **permittivity of free space**,

$$
\varepsilon_0 = 8.85 \times 10^{-12} \text{ C}^2/(\text{N}\cdot\text{m}^2)
$$

(equivalently farads per meter, $$\text{F/m}$$). It sets how electric fields in vacuum relate to source charge.

---

## Superposition principle

The **superposition principle** for electrostatics says that the total force on a charge is the vector sum of the forces from every other charge, computed as if each pair were alone:

$$
\vec{F}_{\text{net}} = \sum_i \vec{F}_i.
$$

In practice: sketch each contribution, resolve into components if the geometry demands it, then add. The principle extends to fields once the field from each source is known.

---

## Electric field

The **electric field** $$\vec{E}$$ at a point is defined as the force per unit charge on a small positive test charge $$q_0$$:

$$
\vec{E} = \frac{\vec{F}}{q_0}, \qquad \text{units: N/C (or V/m)}.
$$

The field is attributed to source charges; conceptually it exists whether or not a test charge is present. By convention, $$\vec{E}$$ points in the direction of the force on a positive test charge, so a negative charge in the same field feels a force $$\vec{F} = q\vec{E}$$ opposite to $$\vec{E}$$.

For a single point charge $$Q$$,

$$
\vec{E} = \frac{1}{4\pi \varepsilon_0} \frac{Q}{r^2} \hat{r}.
$$

<div class="theorem-box" markdown="1">

**Example.** Two equal positive charges $$+Q$$ are placed at $$(0,a)$$ and $$(0,-a)$$. Find the electric field at $$(x,0)$$.

Each charge is a distance $$r=\sqrt{x^2+a^2}$$ from the point. The vertical components cancel by symmetry. The horizontal component from one charge is

$$
E_x=\frac{kQ}{r^2}\cos\theta
=\frac{kQ}{x^2+a^2}\cdot\frac{x}{\sqrt{x^2+a^2}}
=\frac{kQx}{(x^2+a^2)^{3/2}}.
$$

There are two equal horizontal components, so

$$
\vec E=\frac{2kQx}{(x^2+a^2)^{3/2}}\hat{\imath}.
$$

For $$x>0$$ this points right; for $$x<0$$ it points left.

</div>

---

## Continuous charge distributions

When charge is spread through a line, surface, or volume, describe it with a density:

$$
\lambda = \frac{dq}{dL} \quad \text{(charge per unit length)},
$$

$$
\sigma = \frac{dq}{dA} \quad \text{(charge per unit area)},
$$

$$
\rho = \frac{dq}{dV} \quad \text{(charge per unit volume)}.
$$

The field obeys superposition in integral form:

$$
\vec{E} = \frac{1}{4\pi \varepsilon_0} \int \frac{dq}{r^2} \hat{r},
$$

or, for a scalar magnitude contribution along a chosen axis after symmetry,

$$
dE = \frac{1}{4\pi \varepsilon_0} \frac{dq}{r^2}
$$

with $$dq$$ replaced by $$\lambda\, dL$$, $$\sigma\, dA$$, or $$\rho\, dV$$ according to the geometry. Set up coordinates, exploit symmetry, and integrate. Some common techniques are to convert into polar form, or only calculate non-cancelling portions of the field.

<div class="theorem-box" markdown="1">

**Example.** A ring of radius $$R$$ carries total charge $$Q$$ uniformly. Find the field a distance $$x$$ from the center along the ring's axis.

Every charge element $$dq$$ is the same distance

$$
r=\sqrt{x^2+R^2}
$$

from the field point by Pythagorean Theorem. The sideways components cancel around the ring, so only the axial components add:

$$
dE_x=dE\cos\theta
=k\frac{dq}{r^2}\cdot\frac{x}{r}
=k\frac{x\,dq}{(x^2+R^2)^{3/2}}.
$$

Since $$x$$ and $$R$$ are constant over the ring,

$$
E_x=k\frac{x}{(x^2+R^2)^{3/2}}\int dq
=k\frac{Qx}{(x^2+R^2)^{3/2}}.
$$

**ADD IMAGE**

</div>

<div class="theorem-box" markdown="1">

**Example.** A rod of length $$2L$$ lies on the $$x$$-axis from $$-L$$ to $$L$$ with uniform charge density $$\lambda$$. Find the field at $$(0,a)$$.

For a small element $$dq=\lambda\,dx$$ at position $$x$$, the distance to the point is $$r=\sqrt{x^2+a^2}$$. Horizontal components cancel between $$+x$$ and $$-x$$, so keep only the vertical component:

$$
dE_y=k\frac{dq}{r^2}\frac{a}{r}
=k\lambda\frac{a\,dx}{(x^2+a^2)^{3/2}}.
$$

Therefore

$$
E_y=k\lambda a\int_{-L}^{L}\frac{dx}{(x^2+a^2)^{3/2}}
=\frac{2k\lambda L}{a\sqrt{L^2+a^2}}.
$$

The field points away from the rod if $$\lambda>0$$ and toward the rod if $$\lambda<0$$.

**ADD IMAGE**

</div>

---

## Field lines

Field lines are a pictorial tool: they leave positive charge, terminate on negative charge, and their spacing indicates field strength (closer lines mean larger $$|\vec{E}|$$). Field lines never cross, because the field at a point has a single direction.

**ADD IMAGE**

---

## Electric flux and Gauss’s law

**Electric flux** measures how much electric field passes through a surface. For a flat area $$\vec{A}$$ (magnitude equal to area, direction along the normal) and uniform $$\vec{E}$$,

$$
\Phi_E = \vec{E} \cdot \vec{A} = EA\cos\theta,
$$

where $$\theta$$ is the angle between $$\vec{E}$$ and the normal. When $$\vec{E}$$ is parallel to the surface, flux through that surface is zero; when perpendicular, $$|\Phi_E|$$ is maximal for fixed $$E$$ and $$A$$.

For a general surface,

$$
\Phi_E = \int \vec{E} \cdot d\vec{A}.
$$

**Gauss’s law** relates the flux through any closed surface to the charge enclosed:

$$
\oint \vec{E} \cdot d\vec{A} = \frac{Q_{\text{enc}}}{\varepsilon_0}.
$$

The closed surface used in the integral is called a **Gaussian surface**; it is a mathematical construct, not a physical shell. The law is always true; it is computationally powerful when symmetry lets you pull $$\lvert \vec{E} \rvert$$ outside the integral because it is constant on the chosen surface.

Gauss’s law is especially efficient for:

- spherically symmetric charge (use a concentric sphere),
- infinite cylindrical symmetry (use a coaxial cylinder),
- infinite planar symmetry (use a pillbox, which is a very short cylinder).

Choose a surface on which $$E$$ is constant and parallel or perpendicular to $$d\vec{A}$$ on each piece, so the flux reduces to $$E$$ times an area.

<div class="theorem-box" markdown="1">

**Proof (Gauss's law for a point charge).** Put a point charge $$q$$ at the center of a sphere of radius $$r$$. On the sphere,

$$
E=\frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}
$$

and $$\vec E$$ is parallel to $$d\vec A$$ everywhere. Thus

$$
\oint \vec E\cdot d\vec A
=E(4\pi r^2)
=\frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}(4\pi r^2)
=\frac{q}{\varepsilon_0}.
$$

The important cancellation is geometric: the field weakens like $$1/r^2$$ while the sphere's area grows like $$r^2$$. A general proof of Gauss's Law will not be described here but feel free to try on your own!

</div>

<div class="theorem-box" markdown="1">

**Example.** A nonconducting sphere of radius $$R$$ has total charge $$Q$$ spread uniformly through its volume. Find $$E(r)$$.

For $$r\ge R$$, a spherical Gaussian surface encloses all the charge:

$$
E(4\pi r^2)=\frac{Q}{\varepsilon_0}
\quad\Rightarrow\quad
E=\frac{1}{4\pi\varepsilon_0}\frac{Q}{r^2}.
$$

For $$r<R$$, only the charge inside radius $$r$$ is enclosed. Since the volume fraction is $$r^3/R^3$$,

$$
Q_{\text{enc}}=Q\frac{r^3}{R^3}.
$$

Then

$$
E(4\pi r^2)=\frac{Qr^3}{\varepsilon_0R^3}
\quad\Rightarrow\quad
E=\frac{1}{4\pi\varepsilon_0}\frac{Qr}{R^3}.
$$

Inside the sphere, the field grows linearly with distance from the center.

</div>

<div class="theorem-box" markdown="1">

**Example.** An infinite line has uniform charge density $$\lambda$$. Find the electric field of the line a distance $$r$$ away from the line.

The field is radial and constant on the curved side. The end caps have zero flux because $$\vec E$$ is parallel to the caps, not perpendicular to them. Therefore

$$
\oint \vec E\cdot d\vec A=E(2\pi rL).
$$

The enclosed charge is $$Q_{\text{enc}}=\lambda L$$, so

$$
E(2\pi rL)=\frac{\lambda L}{\varepsilon_0}
\quad\Rightarrow\quad
E=\frac{\lambda}{2\pi\varepsilon_0 r}.
$$
</div>

<div class="theorem-box" markdown="1">

**Example.** An infinite nonconducting sheet has surface charge density $$\sigma$$. Use a thin pillbox crossing the sheet.

The field points perpendicular to the sheet and has the same magnitude on both sides. The curved side of the pillbox contributes no flux, while the two flat faces contribute $$EA$$ each:

$$
\oint \vec E\cdot d\vec A=2EA.
$$

The enclosed charge is $$\sigma A$$, so

$$
2EA=\frac{\sigma A}{\varepsilon_0}
\quad\Rightarrow\quad
E=\frac{\sigma}{2\varepsilon_0}.
$$

</div>

These examples are very common throughout AP Physics C E&M, and are worth memorizing how to do.
