---
layout: default
title: Electromagnetism
parent: Physics Competition Prep
nav_order: 12
permalink: /notes/physics/electromagnetism/
---

# Electromagnetism

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

If the charge is inside the closed surface, the surface surrounds the charge once, so the total solid angle is $$4\pi$$ steradians (3D equivalent of radians). Hence

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

### Flux tricks (bypassing surface integrals)

The point of these tricks is to use enclosed charge and field-line geometry to avoid integrating over awkward boundaries.

- **The "anchor" trick (1D sheets).** If a layered system is overall neutral—for example a P–N junction with $$\rho_p x_p=\rho_n x_n$$—the field completely outside it is exactly $$0$$. Anchor one end of a Gaussian pillbox in that zero-field region: the outside face then contributes no flux, so the flux equation collapses to "field on the inner face equals enclosed charge over $$\varepsilon_0$$." This turns a messy stack of sheets into a single application of Gauss's law.

- **Self-flux vs. other-flux.** A charge cannot exert a net force on itself, so to get the force on one face of a charged shape you want the field due to *everything except that face*. The clean way: find the total outward flux of the whole shape, then subtract the flat face's own "self-flux" to isolate the contribution from the rest of the object.

$$
\Phi_{\text{self}}=\frac{\sigma A}{2\varepsilon_0},
\qquad
F=\sigma\,\Phi_{\text{other}}.
$$

This is the same $$1/2$$ that appears in the electrostatic pressure $$P=\sigma^2/2\varepsilon_0$$ below: a surface charge feels the field of the *rest* of the distribution, not the full field including itself.

- **Flux tubes (conserved field lines).** Rotating a single field line about the axis through a point charge sweeps out a cone. Since field lines are neither created nor destroyed in empty space, the flux trapped in the "launch" cone must equal the flux entering the "landing" cone. For a point charge $$q$$ at the apex, the flux through a cone of half-angle $$\theta$$ is the solid-angle fraction of the total $$q/\varepsilon_0$$:

$$
\Phi=\frac{q}{\varepsilon_0}\left(\frac{1-\cos\theta}{2}\right).
$$

Equating the trapped flux at the two ends gives the conservation relation

$$
q_1\,(1-\cos\alpha)=q_2\,(1-\cos\beta),
$$

which lets you relate launch and landing angles of a field line between two charges without ever solving the field explicitly.

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

For advanced conductor problems, the outward electrostatic pressure on a charged conducting surface is

$$
P=\frac{\sigma^2}{2\varepsilon_0}.
$$

One way to remember this is that the surface charge feels the field from the rest of the conductor, not the full field including itself; that gives the factor of $$1/2$$.

## Electric potential and potential energy

The electrostatic force is conservative, which lets us replace vector field bookkeeping with scalar energy bookkeeping. For most olympiad electrostatics this is the single biggest labor-saving move available, so it is worth setting up carefully.

### Review: Conservative forces

A force is **conservative** if the work it does between two points is path-independent, i.e.

$$
W=\int_A^B \vec F\cdot d\vec\ell
$$

depends only on the endpoints $$A$$ and $$B$$. Equivalently,

$$
\oint \vec F\cdot d\vec\ell=0
\qquad\Longleftrightarrow\qquad
\vec F=-\nabla U
$$

for some scalar potential energy $$U$$. Defining $$\Delta U=U(B)-U(A)=-W$$ then guarantees mechanical energy conservation, $$\Delta E_k+\Delta U=0$$, since the work–energy theorem gives $$\Delta E_k=W$$. Only **differences** in $$U$$ are physical; you must fix a reference where $$U=0$$, and that choice is arbitrary.

<div class="theorem-box" markdown="1">

**Proof (Coulomb force is conservative).** Move a charge $$q$$ from $$A$$ to $$B$$ in the field of a fixed charge $$Q$$ at the origin. Since $$\hat r\cdot d\vec\ell=dr$$,

$$
W=\int_A^B k\frac{Qq}{r^2}\hat r\cdot d\vec\ell
=\int_{r_A}^{r_B} k\frac{Qq}{r^2}\,dr
=kQq\left(\frac{1}{r_A}-\frac{1}{r_B}\right),
$$

which depends only on the initial and final distances—not the path. For a system of source charges, superposition makes the total work the sum of pairwise works, each of which is path-independent, so the total is path-independent too.

</div>

### Potential energy and potential

For a charge $$q$$ in the field of a fixed $$Q$$ with the reference at infinity, $$U(r)=kQq/r$$. In a general field, pick a reference point $$O$$ with $$U_O=0$$:

$$
E_p(A)=-\int_O^A q\vec E\cdot d\vec\ell .
$$

The **electric potential** is energy per unit charge,

$$
V(A)=\frac{E_p}{q}=-\int_O^A \vec E\cdot d\vec\ell,
\qquad V=\frac{kQ}{r}\ \text{(point charge)} .
$$

Potential superposes by ordinary addition, and for continuous distributions it becomes an integral:

$$
V=k\sum_i\frac{q_i}{r_i},
\qquad
V=k\int\frac{dq}{r}.
$$

When the field is already known from symmetry, it is usually faster to integrate it: $$\Delta V=-\int \vec E\cdot d\vec\ell$$. A useful consistency fact: $$\vec E$$ may jump across a charged surface, but $$V$$ is always **continuous**, because it is the integral of a bounded field across zero thickness.

<div class="theorem-box" markdown="1">

**Example (get the field cheaply from the potential).** Find the field on the axis of a uniformly charged ring of radius $$R$$ and charge $$Q$$.

The field integral requires projecting every element onto the axis. The *potential* integral does not: every element of the ring is the same distance $$r=\sqrt{x^2+R^2}$$ from the axial point $$x$$, so the "constant $$r$$" shortcut gives the answer with no integration at all,

$$
V(x)=\frac{k}{r}\int dq=\frac{kQ}{\sqrt{x^2+R^2}} .
$$

On the axis, symmetry makes $$\vec E$$ point along $$x$$, so the single derivative recovers the full field:

$$
E_x=-\frac{dV}{dx}=\frac{kQx}{(x^2+R^2)^{3/2}} .
$$

This is the same result the vector field integral gives, with far less work. The lesson generalizes: if you only need $$\vec E$$ along a symmetry axis, compute the scalar $$V$$ first and differentiate.

</div>

### Choosing the reference point

For real (finite) charge distributions, $$V(\infty)=0$$ is always valid. It fails for idealized **infinite** distributions—an infinite line or plane—because $$V=k\int dq/r$$ diverges: the source itself extends out to the reference point. There you must choose a finite reference, and only potential differences in the region of interest carry meaning. The divergence is an artifact of the idealization, not a real physical infinity.

### Potentials worth memorizing

- **Uniform field:** $$\Delta V=-\vec E\cdot \vec d$$.
- **Center of a uniformly charged hemispherical shell** (radius $$R$$, charge $$Q$$): every element sits at distance $$R$$, so $$V=\frac{k}{R}\int dq=\frac{kQ}{R}$$. The same "constant $$r$$" trick gives the full shell.
- **Spherical shell:** $$V=kQ/r$$ outside, $$V=kQ/R$$ (constant) inside.
- **Solid sphere** (radius $$R$$): outside $$kQ/r$$; inside, integrating the interior field $$E=kQr/R^3$$ gives $$V(r)=\dfrac{kQ}{2R}\left(3-\dfrac{r^2}{R^2}\right)$$.
- **Coaxial cylinders**, linear densities $$\pm\lambda$$, radii $$R_A<R_B$$: $$V_A-V_B=\dfrac{\lambda}{2\pi\varepsilon_0}\ln\dfrac{R_B}{R_A}$$.
- **Parallel planes** $$\pm\sigma$$ separated by $$d$$: $$\Delta V=\dfrac{\sigma d}{\varepsilon_0}$$.

If you want, it is a good exercise to derive these yourself!

### Problem-solving tips

A few habits that save the most time on potential problems:

- **Reach for the scalar first.** Potential adds without components, so $$V=k\int dq/r$$ is almost always easier than the field integral. If you ultimately need $$\vec E$$ on a symmetry axis, find $$V$$ and take $$-\nabla V$$ (as in the ring example above).
- **Look for "constant $$r$$."** If every charge element is equidistant from the field point—center of a ring, shell, arc, or hemisphere—the integral collapses to $$V=kQ/r$$ with no work.
- **If you already have $$\vec E$$, integrate it, don't re-integrate $$dq$$.** Once Gauss's law has given $$\vec E$$, use $$\Delta V=-\int\vec E\cdot d\vec\ell$$ along the simplest path (usually radial, so $$\vec E\cdot d\vec\ell=E\,dr$$).
- **Choose the reference to kill terms.** Use $$V(\infty)=0$$ for localized charge; for an infinite line or plane pick a convenient finite point and track only differences.
- **Use continuity of $$V$$ as a free check.** When you stitch together piecewise regions (inside/outside a shell, across a boundary), the pieces must agree in value even where $$\vec E$$ jumps. A mismatch means an algebra error.
- **For dynamics, use energy, not force.** When a problem asks only for speeds, closest approach, or escape conditions, $$\Delta K=-\Delta U$$ sidesteps the vector force entirely—legitimate precisely because the electrostatic force is conservative.
- **Mind self-energy.** The pairwise sum excludes it; $$\tfrac12\int V\,dq$$ includes it. Decide which one the question wants before plugging in.

<div class="theorem-box" markdown="1">

**Example.** A particle of charge $$q$$ and mass $$m$$ is fired straight at a fixed charge $$Q$$ (same sign) from far away with speed $$v_0$$. Find the distance of closest approach.

Forces would require integrating a time-varying acceleration. Energy conservation does it in one line: at closest approach the particle is momentarily at rest, so all its kinetic energy has become potential energy. Taking $$U(\infty)=0$$,

$$
\tfrac12 m v_0^2=\frac{kQq}{d_{\min}}
\qquad\Longrightarrow\qquad
d_{\min}=\frac{2kQq}{m v_0^2}.
$$

No path detail enters because the force is conservative—only the endpoints matter.

</div>

<div class="theorem-box" markdown="1">

**Example.** Two thin concentric spherical shells carry charge $$Q_1$$ (radius $$a$$) and $$Q_2$$ (radius $$b>a$$). Find $$V(r)$$ everywhere, with $$V(\infty)=0$$.

*Step 1 — field by Gauss's law in each region.* Only enclosed charge matters:

$$
E(r)=
\begin{cases}
0, & r<a,\\[1mm]
kQ_1/r^2, & a<r<b,\\[1mm]
k(Q_1+Q_2)/r^2, & r>b.
\end{cases}
$$

*Step 2 — integrate inward from infinity.* For $$r>b$$,

$$
V(r)=\frac{k(Q_1+Q_2)}{r}.
$$

*Step 3 — fix the next constant by continuity at $$r=b$$.* In $$a<r<b$$, integrating $$E=kQ_1/r^2$$ gives $$V=kQ_1/r+C$$. Matching to the outer solution at $$r=b$$,

$$
\frac{kQ_1}{b}+C=\frac{k(Q_1+Q_2)}{b}
\quad\Longrightarrow\quad
C=\frac{kQ_2}{b},
\qquad
V(r)=\frac{kQ_1}{r}+\frac{kQ_2}{b}.
$$

*Step 4 — inside the inner shell.* Here $$E=0$$, so $$V$$ is **constant**, equal to its value at $$r=a$$:

$$
V(r<a)=\frac{kQ_1}{a}+\frac{kQ_2}{b}.
$$

Each integration constant was pinned down by demanding $$V$$ be continuous at a boundary—the free check from the tips list, now doing real work.

</div>

### Energy of a charge configuration

There are three equivalent ways to compute the total energy stored in a configuration; choose whichever matches the problem.

**1. Pairwise sum.** Add the interaction energy of every distinct pair,

$$
U=\frac{1}{4\pi\varepsilon_0}\sum_{i<j}\frac{q_iq_j}{r_{ij}} .
$$

This excludes the (infinite) self-energy of idealized point charges.

**2. Charge times potential, halved.** Writing $$\sum_i q_iV_i$$ counts each pair twice, so

$$
U=\frac{1}{2}\sum_i q_iV_i
\qquad\Longrightarrow\qquad
U=\frac{1}{2}\int V\,dq
$$

for a continuous distribution, where $$V$$ is the potential of the *whole* distribution. Unlike the pairwise sum, this form **includes** self-energy.

**3. Charge it up.** Assemble the charge from zero, tracking $$V$$ as a function of the accumulated charge, and integrate $$U=\int V\,dq$$. This is the cleanest method when symmetry keeps the object near one potential as it charges—for instance a conductor, or a sphere built up shell by shell.

<div class="theorem-box" markdown="1">

**Example.** What is the self-energy of a solid sphere with raidus $$R$$?

Build the sphere up shell by shell at fixed density $$\rho$$. When the assembled charge is $$q$$ at radius $$r$$ (final radius $$R$$), $$q=Q(r/R)^3$$, and the next shell $$dq=Q\,\dfrac{3r^2}{R^3}dr$$ is brought from infinity to the surface, which sits at $$V=kq/r=kQr^2/R^3$$. Hence

$$
dU=V\,dq=\frac{kQr^2}{R^3}\cdot\frac{3Qr^2}{R^3}\,dr
=\frac{3kQ^2}{R^6}r^4\,dr,
$$

$$
U=\int_0^R \frac{3kQ^2}{R^6}r^4\,dr=\frac{3}{5}\frac{kQ^2}{R}.
$$

As a cross-check, integrating the field energy density $$u=\tfrac12\varepsilon_0E^2$$ over all space (using $$E=kQr/R^3$$ inside and $$kQ/r^2$$ outside) gives $$\dfrac{kQ^2}{10R}+\dfrac{kQ^2}{2R}=\dfrac{3}{5}\dfrac{kQ^2}{R}$$ which is the same result.

</div>

The field-energy viewpoint, $$U=\int \tfrac12\varepsilon_0E^2\,dV$$, is itself a fourth way to compute configuration energy and is sometimes the only practical one when no symmetry helps with potentials.

<div class="theorem-box" markdown="1">

**Example.** Find the self-energy of a disk of radius $$R$$ with uniform surface density $$\sigma=Q/\pi R^2$$.

*Sub-result — potential at the rim.* First find the potential at a point $$P$$ on the edge of a uniform disk of radius $$s$$. Put the origin at $$P$$ and use plane polar coordinates $$(\rho,\varphi)$$ measured from the line through the center. The far boundary of the disk is the circle of radius $$s$$ centered a distance $$s$$ away, which in these coordinates is $$\rho=2s\cos\varphi$$ for $$\varphi\in[-\tfrac\pi2,\tfrac\pi2]$$. Then

$$
V_{\text{rim}}(s)=k\sigma\!\int_{-\pi/2}^{\pi/2}\!\!\int_0^{2s\cos\varphi}\frac{1}{\rho}\,\rho\,d\rho\,d\varphi
=k\sigma\!\int_{-\pi/2}^{\pi/2}\!2s\cos\varphi\,d\varphi
=4k\sigma s .
$$

The $$1/\rho$$ from Coulomb cancels the $$\rho$$ in the area element—this cancellation is exactly why the rim point is tractable while a generic interior point gives an elliptic integral.

*Build the disk up from the edge.* Grow the disk at constant $$\sigma$$ by depositing successive rings at the current rim. When the disk has radius $$s$$, the new ring $$dq=\sigma(2\pi s)\,ds$$ lands at potential $$V_{\text{rim}}(s)$$, so

$$
dU=V_{\text{rim}}(s)\,dq=(4k\sigma s)(2\pi\sigma s\,ds)=8\pi k\sigma^2 s^2\,ds,
$$

$$
U=\int_0^R 8\pi k\sigma^2 s^2\,ds=\frac{8\pi k\sigma^2 R^3}{3}
=\frac{8}{3\pi}\,\frac{kQ^2}{R},
$$

after substituting $$\sigma=Q/\pi R^2$$. The coefficient $$8/3\pi\approx0.85$$ is larger than the solid sphere's $$3/5$$ and the conducting sphere's $$1/2$$: flattening the same charge into a disk packs it closer together, raising the stored energy. Note the assembly order does not affect the answer — the same $$U$$ comes from $$\tfrac12\int V\,dq$$ over the finished disk, but that route needs the much harder interior potential.

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
