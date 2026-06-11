---
layout: default
title: Electromagnetism
parent: USAPhO Prep
nav_order: 8
permalink: /notes/physics/electromagnetism/
---

# Electromagnetism

These notes collect electromagnetism ideas that go beyond the usual AP Physics C E&M treatment. The AP notes should focus on setting up fields, potentials, circuits, and Maxwell's equations in standard symmetric situations; this page can hold olympiad-style extensions that require extra mathematical maturity or unusual tricks.

---

## Charges

All atoms that make up matter contains protons, electrons, and neutrons, and ordinary charging is mostly about moving electrons. A proton has charge $$+e$$, an electron has charge $$-e$$, and a neutron is neutral, where

$$
e=1.602\times 10^{-19}\text{ C}.
$$

This is known as an **elementary charge**. Macroscopic charge is usually a tiny imbalance of electrons compared with the total number of particles in an object. Charge is conserved: it can move from one object to another, but it is not created or destroyed in ordinary electrostatics. As you go to quantum levels (which is not needed for USAPhO), charged particles are created and annilhated in matter-antimatter pairs.

### Materials

Materials differ by how easily their electrons move.

- **Conductors** have mobile charges that can redistribute through the material.
- **Insulators** have charges that are locally bound, so charge does not freely flow through the object.
- **Semiconductors** are between the two: they have some mobile charge carriers, but far fewer than a good conductor.

Grounding connects an object to a large charge reservoir (usually the Earth). We will assume for practical purposes that Earth has basically infinite electrons and acts like a perfect ground.

### Charging, induction, and polarization

Charging by contact transfers charge directly. Charging by induction uses an external charged object to redistribute charges inside a conductor; if the conductor is grounded during the process, charge can leave or enter, and the conductor may be left with a net charge after the ground and external object are removed.

**Polarization** means that positive and negative charge separate slightly inside a neutral object. This is why a charged object can attract a neutral object: the closer side is induced to have the opposite sign, and the closer attraction beats the farther repulsion.

### Coulomb's law

For point-like charges,

$$
\vec F = k\frac{q_1q_2}{r^2}\hat r,
\qquad
k=\frac{1}{4\pi\varepsilon_0}.
$$

The force is repulsive for like charges and attractive for opposite charges. In vector problems, do not only add magnitudes; use components or unit vectors and then apply superposition.

### Electric field

The electric field is force per unit positive test charge:

$$
\vec E=\frac{\vec F}{q_0}.
$$

The field can be viewed as a vector function of position,

$$
\vec E(x,y,z)=E_x(x,y,z)\hat i+E_y(x,y,z)\hat j+E_z(x,y,z)\hat k.
$$

For many source charges, add the individual fields:

$$
\vec E_{\text{net}}=\sum_i \vec E_i.
$$

For continuous charge distributions, replace the sum by an integral:

$$
dE=k\frac{dq}{r^2},
$$

where

$$
dq=\lambda\,d\ell,\qquad dq=\sigma\,dA,\qquad dq=\rho\,dV.
$$

It is very important to choose useful coordinates (e.g. rectangular, polar, spherical, etc.), use symmetry to cancel components, project the remaining component, then integrate.

<div class="theorem-box" markdown="1">

**Example.** Find the electric field of a uniformly charged disk with radius $$R$$ at a point $$x$$ above the center.

A uniformly charged disk can be built from thin rings. If the disk has surface charge density $$\sigma$$, then a ring of radius $$r$$ and thickness $$dr$$ has

$$
dq=\sigma(2\pi r\,dr).
$$

Using the ring result (which you can find in [AP Physics C E&M]({{ '/notes/physics/electrostatics/' | relative_url }})),

$$
dE_x=k\frac{x\,dq}{(x^2+r^2)^{3/2}}
=k\frac{x(2\pi\sigma r\,dr)}{(x^2+r^2)^{3/2}}.
$$

Integrating from $$r=0$$ to $$R$$ gives

$$
E_x=2\pi k\sigma\left(1-\frac{x}{\sqrt{x^2+R^2}}\right)
=\frac{\sigma}{2\varepsilon_0}\left(1-\frac{x}{\sqrt{x^2+R^2}}\right)
$$

for $$x>0$$.

</div>

### Electric field lines

Field lines are a visual tool:

- They begin on positive charge and end on negative charge.
- They point in the direction of $$\vec E$$.
- Their density represents field strength.
- They never cross, because the field at one point cannot have two directions.

Field lines are not the field itself. They are a way to visualize a vector field in space.

### Electric flux

Electric flux measures how much electric field passes through a surface:

$$
\Phi_E=\int \vec E\cdot d\vec A.
$$

The direction of $$d\vec A$$ is the local normal direction. For a closed surface, the outward normal is positive by convention.

For a uniform field through a flat area,

$$
\Phi_E=EA\cos\theta.
$$

### Gauss's law

Gauss's law states

$$
\oint \vec E\cdot d\vec A=\frac{Q_{\text{enc}}}{\varepsilon_0}.
$$

It is always true, but it is only easy to use when symmetry makes $$E$$ constant on the useful parts of a Gaussian surface.

<div class="theorem-box" markdown="1">

**Proof (Gauss's law).** First prove the result for one point charge $$q$$. By Coulomb's law, the electric field a distance $$r$$ from the charge is

$$
\vec E=k\frac{q}{r^2}\hat r
=\frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}\hat r.
$$

For a tiny area element $$dA$$ on any closed surface, only the component of $$\vec E$$ perpendicular to the surface contributes to flux:

$$
d\Phi_E=\vec E\cdot d\vec A
=\frac{q}{4\pi\varepsilon_0}\frac{\cos\theta\,dA}{r^2},
$$

where $$\theta$$ is the angle between $$\hat r$$ and the outward normal. The quantity

$$
d\Omega=\frac{\cos\theta\,dA}{r^2}
$$

is the **solid angle** subtended by the area element as seen from the charge. Therefore

$$
d\Phi_E=\frac{q}{4\pi\varepsilon_0}\,d\Omega.
$$

If the charge is inside the closed surface, the surface surrounds the charge once, so the total solid angle is $$4\pi$$ steradians. Hence

$$
\oint \vec E\cdot d\vec A
=\frac{q}{4\pi\varepsilon_0}\oint d\Omega
=\frac{q}{4\pi\varepsilon_0}(4\pi)
=\frac{q}{\varepsilon_0}.
$$

If the charge is outside the closed surface, field lines that enter the surface also leave it. Equivalently, the signed solid angles cancel, so the net flux is $$0$$.

For many point charges, electric fields add by superposition:

$$
\vec E=\sum_i \vec E_i.
$$

Flux is linear, so

$$
\oint \vec E\cdot d\vec A
=\sum_i\oint \vec E_i\cdot d\vec A.
$$

Each charge inside contributes $$q_i/\varepsilon_0$$, and each charge outside contributes $$0$$. Thus

$$
\oint \vec E\cdot d\vec A
=\frac{1}{\varepsilon_0}\sum_{\text{inside}}q_i
=\frac{Q_{\text{enc}}}{\varepsilon_0}.
$$

A continuous charge distribution is the same argument with the sum replaced by an integral over charge elements $$dq$$.

</div>

Good Gaussian surfaces match the symmetry:

- sphere for spherical symmetry,
- cylinder for infinite line/cylindrical symmetry,
- pillbox for infinite plane symmetry.

### Standard Gaussian results

For a thin spherical shell of radius $$R$$ and total charge $$Q$$,

$$
E(r)=
\begin{cases}
0, & r<R,\\
kQ/r^2, & r>R.
\end{cases}
$$

This is the electrostatic version of Newton's shell theorem.

For a uniformly charged solid sphere of radius $$R$$ and total charge $$Q$$,

$$
E(r)=
\begin{cases}
kQr/R^3, & r<R,\\
kQ/r^2, & r>R.
\end{cases}
$$

For an infinite line of charge,

$$
E=\frac{\lambda}{2\pi\varepsilon_0 r}.
$$

For an infinite cylindrical shell with charge per unit length $$\lambda$$,

$$
E=
\begin{cases}
0, & r<R,\\
\lambda/(2\pi\varepsilon_0 r), & r>R.
\end{cases}
$$

For an infinite nonconducting plane sheet,

$$
E=\frac{\sigma}{2\varepsilon_0}.
$$

The direction is perpendicular to the sheet, away from positive charge and toward negative charge.

Feel free to derive these yourself, although the procedures are pretty standard.

### Electrostatic equilibrium in conductors

In a conductor at electrostatic equilibrium, charges have stopped moving macroscopically. Therefore:

- $$\vec E=0$$ inside the conducting material.
- Excess charge lies on the conductor's surface.
- The electric field just outside the surface is perpendicular to the surface.
- Larger surface charge density means a stronger field just outside.

If a tangential electric field existed on the surface, free charge would slide along the conductor, so equilibrium would not hold.

For a conductor surface with local surface charge density $$\sigma$$,

$$
E_{\text{outside}}=\frac{\sigma}{\varepsilon_0}.
$$

This comes from a thin Gaussian pillbox crossing the surface: the inside face has zero flux because the field inside the conductor is zero, and the outer face contributes $$EA$$.

<div class="theorem-box" markdown="1">

**Example.** If two non-overlapping spherically symmetric charged bodies have total charges $$Q_1$$ and $$Q_2$$, then outside each body the field is the same as if all charge were concentrated at its center. Therefore the force between them is

$$
F=k\frac{Q_1Q_2}{r^2},
$$

where $$r$$ is the distance between centers. This is the same structural idea as the gravitational shell theorem.
</div>

For advanced conductor problems, the outward electrostatic pressure on a charged conducting surface is

$$
P=\frac{\sigma^2}{2\varepsilon_0}.
$$

One way to remember this is that the surface charge feels the field from the rest of the conductor, not the full field including itself; that gives the factor of $$1/2$$.

## Multipole thinking

If the net charge of a distribution is nonzero, then from far away it behaves approximately like a point charge:

$$
E\sim \frac{kQ}{r^2}.
$$

If the net charge is zero but the distribution has separated positive and negative charge, the leading behavior is often **dipole-like**, which falls faster:

$$
E_{\text{dipole}}\sim \frac{kp}{r^3},
$$

where $$p=qd$$ is the dipole moment magnitude for charges $$+q$$ and $$-q$$ separated by distance $$d$$. The exact angular dependence is not usually needed unless the problem explicitly asks for it.

<div class="theorem-box" markdown="1">

**Example.** Put $$+q$$ at $$x=a$$ and $$-q$$ at $$x=-a$$. Find the electric field on the positve $$x$$-axis, far away from both charges.

On the positive $$x$$-axis, far away from both charges,

$$
E=kq\left(\frac{1}{(x-a)^2}-\frac{1}{(x+a)^2}\right).
$$

Combine the fractions:

$$
E=kq\frac{(x+a)^2-(x-a)^2}{(x^2-a^2)^2}
=kq\frac{4ax}{(x^2-a^2)^2}.
$$

When $$x\gg a$$, the denominator is approximately $$x^4$$, so

$$
E\approx \frac{4kqa}{x^3}.
$$

The total charge is zero, so the field falls like $$1/x^3$$ instead of $$1/x^2$$.

</div>

## Method of images

The **method of images** replaces certain conductor problems with fake charges placed outside the physical region. The key idea is that a grounded conductor has fixed potential $$V=0$$. If you can place imaginary charges so that the conductor surface is also at $$V=0$$, then the field in the real region matches the actual conductor problem.

<div class="theorem-box" markdown="1">

**Example.** A charge $$+q$$ is a distance $$a$$ above an infinite grounded conducting plane. Replace the plane by an image charge $$-q$$ a distance $$a$$ below the plane.

At every point on the plane, the distances to $$+q$$ and $$-q$$ are equal, so their potentials cancel:

$$
V=k\frac{q}{r}+k\frac{-q}{r}=0.
$$

Thus the image-charge setup satisfies the grounded-plane boundary condition. The force on the real charge equals the Coulomb attraction to the image charge:

$$
F=k\frac{q^2}{(2a)^2}
=\frac{kq^2}{4a^2},
$$

directed toward the conducting plane.

</div>
