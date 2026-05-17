---
layout: default
title: "Unit 12: Conic Sections"
parent: AP Precalculus
nav_order: 8
permalink: /notes/ap/precalc/conicsections/
---

# Unit 12: Conic Sections

## Introduction to conics

A conic section is the curve you get when a plane meets a right circular cone: circle, ellipse, parabola, or hyperbola (the “degenerate” cases: point, line, pair of lines show up when the plane passes through the vertex in special ways and will not be talked about here).

In a rectangular coordinate system, any conic can be written as a degree-two equation in $$x$$ and $$y$$:

$$
Ax^{2} + Bxy + Cy^{2} + Dx + Ey + F = 0
$$

with $$A,B,C$$ not all zero. In most precalculus work $$B = 0$$ (no tilted axes); then the graph is a parabola, ellipse, or hyperbola depending on the signs of $$A$$ and $$C$$ after completing squares.

The eccentricity $$e$$ measures how “stretched” the conic is relative to a circle ($$e = 0$$). Another method of defining conics is using a focus and directrix: fix a focus and a directrix (a line); the conic is the set of points $$P$$ whose distance to the focus equals $$e$$ times the perpendicular distance to the directrix. Then $$0 < e < 1$$ gives an ellipse, $$e = 1$$ a parabola, and $$e > 1$$ a hyperbola. We will prove the focus-directrix property in a later section.

---

## Circles

One of the more simpler conic sections is the circle. A circle is defined as the set of points equidistant from a fixed focus. For a circle, $$e = 0$$. Since circles are extensively talked about in other sections, I will not go in detail about them.

---

## Parabolas

A parabola is defined as the set of points equidistant from a fixed focus and a fixed directrix (a line). For a parabola,  $$e = 1$$.

### Standard forms (vertex at $$(h,k)$$, axis parallel to a coordinate axis)

Opening up or down (vertical axis):

$$
(x - h)^{2} = 4p(y - k)
$$

- Vertex: $$(h,k)$$.
- Focus: $$(h,\, k + p)$$.
- Directrix: $$y = k - p$$.
- If $$p > 0$$, opens upward; if $$p < 0$$, opens downward.

Opening left or right (horizontal axis):

$$
(y - k)^{2} = 4p(x - h)
$$

- Vertex: $$(h,k)$$.
- Focus: $$(h + p,\, k)$$.
- Directrix: $$x = h - p$$.
- If $$p > 0$$, opens to the right; if $$p < 0$$, opens to the left.

The quantity $$\lvert 4p\rvert$$ controls how “wide” the parabola is: larger $$\lvert p\rvert$$ means a more gradual curve.

### Latus rectum

The latus rectum is the chord through the focus perpendicular to the axis of symmetry, with a length of $$\lvert 4p\rvert$$ (same as the absolute coefficient in the standard forms above). It should be parallel to the directrix.

### Applications of parabolas

For a parabola, any ray starting from the focus and reflecting off of the surface of the parabola will always be perpendicular to the latus rectum (the converse is true as well)! This makes parabolas especially useful for things like flashlights and mirrors.

<div class="theorem-box" markdown="1">

**Extension.** Prove the theorem stated above is true. One theorem you make find useful is the Law of Reflection: A ray reflecting off the surface will have the same angle of reflection as angle of incidence.

</div>

In photography, lenses are made up of portions of parabolas. Suppose you have a chord (parallel to the directrix) with half-length $$d$$. Define the focal ratio as $$\frac{p}{d}$$. This is what the $$f$$-stops are defined as in photography.

---

## Ellipses

An ellipse is defined as the set of points the sum of whose distances to two fixed foci is constant (greater than the distance between the foci).

<img class="note-img note-img--w480" src="{{ '/assets/APs/AP%20Precalc/ellipse.png' | relative_url }}" alt="Ellipse" loading="lazy" decoding="async" />

### Basic definitions

In an ellipse, the major axis is always defined as the longer axis, while the minor axis is defined as the shorter axis. The vertices of a ellipse are always defined as the endpoints of the major axis. The endpoints of the minor axis don't really get a special name. The semi-major and semi-minor axes are defined as half of their respective axes.

### Horizontal major axis (center $$(h,k)$$)

$$
\frac{(x - h)^{2}}{a^{2}} + \frac{(y - k)^{2}}{b^{2}} = 1, \qquad a > b > 0
$$

- Center: $$(h,k)$$.
- Vertices (ends of major axis): $$(h \pm a,\, k)$$.
- Co-vertices (ends of minor axis): $$(h,\, k \pm b)$$.
- Foci: $$(h \pm c,\, k)$$ where $$c^{2} = a^{2} - b^{2}$$.
- Major axis length $$2a$$, minor axis length $$2b$$.
- Eccentricity: $$\displaystyle e = \frac{c}{a}$$ with $$0 < e < 1$$.

### Vertical major axis

$$
\frac{(x - h)^{2}}{b^{2}} + \frac{(y - k)^{2}}{a^{2}} = 1, \qquad a > b > 0
$$

- Vertices: $$(h,\, k \pm a)$$; co-vertices: $$(h \pm b,\, k)$$.
- Foci: $$(h,\, k \pm c)$$ with $$c^{2} = a^{2} - b^{2}$$.

If the denominators are equal ($$a = b$$), the ellipse is a circle of radius $$a$$.

<div class="theorem-box" markdown="1">

**Proof (Standard equation of an ellipse, horizontal major axis).** Place the foci on the $$x$$-axis at $$F_{1} = (-c,0)$$ and $$F_{2} = (c,0)$$ with $$0 < c < a$$. The ellipse is the set of points $$P = (x,y)$$ such that the sum of distances to the foci is the constant $$2a$$:

$$
\sqrt{(x+c)^{2} + y^{2}} + \sqrt{(x-c)^{2} + y^{2}} = 2a.
$$

Write $$r_{1} = \sqrt{(x+c)^{2} + y^{2}}$$ and $$r_{2} = \sqrt{(x-c)^{2} + y^{2}}$$, so $$r_{1} + r_{2} = 2a$$. Isolate $$r_{1} = 2a - r_{2}$$ and square (both sides are nonnegative):

$$
(x+c)^{2} + y^{2} = 4a^{2} - 4a r_{2} + (x-c)^{2} + y^{2}.
$$

Expand and cancel $$x^{2}$$, $$y^{2}$$, and $$c^{2}$$:

$$
4cx = 4a^{2} - 4a r_{2} \quad\Longrightarrow\quad a r_{2} = a^{2} - cx.
$$

Since $$r_{2} \ge 0$$ and (one can show) $$\lvert cx\rvert \le a^{2}$$ on the ellipse, the right-hand side is nonnegative, so we may square again:

$$
a^{2}\bigl((x-c)^{2} + y^{2}\bigr) = (a^{2} - cx)^{2}.
$$

Multiply out:

$$
a^{2}x^{2} - 2a^{2}cx + a^{2}c^{2} + a^{2}y^{2} = a^{4} - 2a^{2}cx + c^{2}x^{2}.
$$

Cancel $$-2a^{2}cx$$ and rearrange:

$$
a^{2}x^{2} - c^{2}x^{2} + a^{2}y^{2} = a^{4} - a^{2}c^{2}
\quad\Longrightarrow\quad
(a^{2} - c^{2})x^{2} + a^{2}y^{2} = a^{2}(a^{2} - c^{2}).
$$

Define $$b^{2} = a^{2} - c^{2} > 0$$. Then $$b^{2}x^{2} + a^{2}y^{2} = a^{2}b^{2}$$. Divide by $$a^{2}b^{2}$$:

$$
\frac{x^{2}}{a^{2}} + \frac{y^{2}}{b^{2}} = 1.
$$

Thus the two-focus definition yields the standard equation with $$c^{2} = a^{2} - b^{2}$$. Translating the center to $$(h,k)$$ replaces $$x$$ by $$x-h$$ and $$y$$ by $$y-k$$, giving $$\dfrac{(x-h)^{2}}{a^{2}} + \dfrac{(y-k)^{2}}{b^{2}} = 1$$.

For a vertical major axis, the same algebra applies after swapping the roles of $$x$$ and $$y$$ (foci on the vertical line through the center), which produces $$\dfrac{(x-h)^{2}}{b^{2}} + \dfrac{(y-k)^{2}}{a^{2}} = 1$$ with $$a > b$$ and again $$c^{2} = a^{2} - b^{2}$$.

</div>

### Applications of ellipses

Most planets orbit in ellipses! Johannes Kepler discovered the planets in our solar system did not orbit in a perfect circle (as previously believed), but orbited in ellipses! His three laws of planetary motion revolutionized astrophysics, and all of the physics are based on the properties of ellipses!

In addition, like a parabola, ellipses have cool reflective properties. If you start at one foci and point a ray and bounce it off of the ellipse, you will always pass through the other foci! The Griffin Museum's "Whispering Room," is based on this principle, where if you stand at one foci you can whisper something that can only be heard by a person standing at the other foci.

---

## Hyperbolas

A hyperbola is defined as the set of points the absolute difference of whose distances to two foci is constant (less than the distance between the foci).

### Basic definitions

In a hyperbola, the transverse axis is always defined as the axis that passes through the the hyperbola (perpendicualr to the directrix), while the conjugate axis is always defined as the other axis. The vertices of a hyperbola are the relative extrema (basically the points with slope of $$\infty$$ or $$0$$). The transverse axis passes through the vertices.

### Horizontal transverse axis (opens left/right, center $$(h,k)$$)

$$
\frac{(x - h)^{2}}{a^{2}} - \frac{(y - k)^{2}}{b^{2}} = 1
$$

- Center: $$(h,k)$$.
- Vertices: $$(h \pm a,\, k)$$.
- Foci: $$(h \pm c,\, k)$$ where $$c^{2} = a^{2} + b^{2}$$.
- Asymptotes (useful for sketching):

$$
y - k = \pm \frac{b}{a}(x - h)
$$

### Vertical transverse axis (opens up/down)

$$
\frac{(y - k)^{2}}{a^{2}} - \frac{(x - h)^{2}}{b^{2}} = 1
$$

- Vertices: $$(h,\, k \pm a)$$.
- Foci: $$(h,\, k \pm c)$$ with $$c^{2} = a^{2} + b^{2}$$.
- Asymptotes:

$$
y - k = \pm \frac{a}{b}(x - h)
$$

Eccentricity: $$\displaystyle e = \frac{c}{a} > 1$$.

The conjugate hyperbola swaps the roles of the terms (e.g. $$\frac{y^{2}}{a^{2}} - \frac{x^{2}}{b^{2}} = 1$$ vs $$\frac{x^{2}}{a^{2}} - \frac{y^{2}}{b^{2}} = 1$$) and shares the same asymptote rectangle but different vertices and branches.

<div class="theorem-box" markdown="1">

**Extension.** Prove the standard formula for a hyperbola. This procedure should be similar to the procedure for deriving the equation for an ellipse.

</div>

---

## Focus–directrix property

Fix a point $$F$$ (focus), a line $$\ell$$ (directrix), and a number $$e > 0$$ (eccentricity). The corresponding conic is the locus of points $$P$$ such that

$$
PF = e \cdot d(P,\ell),
$$

where $$PF$$ is the distance from $$P$$ to $$F$$ and $$d(P,\ell)$$ is the perpendicular distance from $$P$$ to $$\ell$$.

- $$e = 1$$: parabola.
- $$0 < e < 1$$: ellipse.
- $$e > 1$$: hyperbola.

(The case $$e = 0$$ would force $$PF = 0$$ for every point on the directrix in a naive reading; the circle is usually treated via the two-focus definition or as $$a = b$$ in the ellipse equation.)

For parabolas, this matches the equal-distance definition to focus and directrix. For ellipses and hyperbolas, the same relation holds once focus and directrix are chosen consistently (a second focus appears from symmetry in the standard pictures).

<div class="theorem-box" markdown="1">

**Proof (Focus-directrix property).** We show that in rectangular coordinates the locus $$PF = e\,d(P,\ell)$$ is always a parabola, ellipse, or hyperbola according to $$e$$. Take $$e > 0$$ and place the focus at the origin and the directrix as the vertical line $$x = -d$$ with $$d > 0$$, so the focus lies to the right of the directrix. For any point $$P = (x,y)$$ on the same side of the directrix as the focus (so that the foot of the perpendicular has $$x$$-coordinate $$-d$$ and $$x > -d$$), the perpendicular distance is

$$
d(P,\ell) = x + d.
$$

The defining relation is

$$
\sqrt{x^{2} + y^{2}} = e(x + d).
$$

Because the left side is nonnegative, every point on the locus satisfies $$x + d \ge 0$$. Square both sides:

$$
x^{2} + y^{2} = e^{2}(x + d)^{2} = e^{2}x^{2} + 2e^{2}d\,x + e^{2}d^{2}.
$$

Rearrange:

$$
(1 - e^{2})x^{2} - 2e^{2}d\,x + y^{2} = e^{2}d^{2}.
$$

Case $$e = 1$$. Then this equation becomes

$$
-2d\,x + y^{2} = d^{2}
\quad\Longrightarrow\quad
y^{2} = 2d\left(x + \frac{d}{2}\right),
$$

the equation of a parabola opening to the right with vertex at $$\left(-\frac{d}{2},\,0\right)$$.

Case 1: $$0 < e < 1$$. Then $$1 - e^{2} > 0$$. Divide the rearranged equation by $$1 - e^{2}$$ and complete the square in $$x$$:

$$
\left(x - \frac{e^{2}d}{1 - e^{2}}\right)^{2} + \frac{y^{2}}{1 - e^{2}} = \frac{e^{2}d^{2}}{(1 - e^{2})^{2}}.
$$

Both denominators on the left are positive after the division, so this is the equation of an ellipse in standard position (after translation of the $$x$$-axis).

Case 2: $$e > 1$$. Then $$1 - e^{2} < 0$$. Multiply the rearranged equation by $$-1$$ and write

$$
(e^{2} - 1)x^{2} + 2e^{2}d\,x - y^{2} = -e^{2}d^{2}.
$$

Complete the square in $$x$$:

$$
(e^{2} - 1)\left(x + \frac{e^{2}d}{e^{2} - 1}\right)^{2} - y^{2} = \frac{e^{2}d^{2}}{e^{2} - 1},
$$

which is the equation of a hyperbola (difference of squared terms with opposite signs).

Thus the focus–directrix condition with fixed $$e > 0$$ produces exactly one nondegenerate conic type in each case $$e = 1$$, $$0 < e < 1$$, and $$e > 1$$. Other placements of the focus and directrix (rotations and translations) only change coordinates, not the classification.

Much of the final algebra is not shown here and is left as practice.

</div>

---

## Conics in polar

Place a focus at the pole $$(0,0)$$ and align the directrix perpendicular to the polar axis. With eccentricity $$e \ge 0$$ and distance to directrix (from focus) $$d$$, a common form is:

$$
r = \frac{de}{1 + e\cos\theta}
$$

when the directrix is the vertical line $$x = -p$$ (to the left of the focus). Variants use $$e\sin\theta$$ in the denominator when the directrix is horizontal, and minus signs when the directrix lies on the other side of the focus, e.g.

$$
r = \frac{de}{1 - e\cos\theta}
$$

for a directrix $$x = p$$ to the right.

Reading the graph:

- $$e = 1$$: one unbounded branch (parabola opening toward the directrix side that makes the denominator able to go to $$0$$).
- $$e < 1$$: bounded curve (ellipse).
- $$e > 1$$: two branches (hyperbola); values of $$\theta$$ that make $$1 + e\cos\theta = 0$$ (or the corresponding denominator in your chosen form) are asymptotic directions (no finite points).

Always check your course’s exact convention for $$p$$ and the sign in the denominator so your formulas match the textbook’s figure of the focus and directrix.

## Practice

1. Complete the square for $$4x^{2}+9y^{2}-24x+36y+36=0$$. Write the equation in standard form and give the center, vertices, co-vertices, foci, eccentricity, and major/minor axis lengths.
2. Find the equation of the parabola whose focus is $$(5,-2)$$ and whose directrix is $$x=-1$$. Give the vertex, value of $$p$$, axis of symmetry, and latus rectum endpoints.
3. Find all lines with slope $$-2$$ that are tangent to the parabola $$(x-1)^{2}=8(y+3)$$.
4. An ellipse has foci $$(1,4)$$ and $$(1,-2)$$ and passes through $$(5,1)$$. Find its standard-form equation and its eccentricity.
5. The ellipse $$\dfrac{(x+2)^{2}}{36}+\dfrac{(y-1)^{2}}{20}=1$$ has foci $$F_1$$ and $$F_2$$. If $$P$$ is the point on the ellipse with $$x=1$$ and $$y>1$$, find $$PF_1$$ and $$PF_2$$ separately.
6. Find all real numbers $$m$$ such that the line $$y=mx+3$$ is tangent to the ellipse $$\dfrac{x^{2}}{9}+\dfrac{y^{2}}{4}=1$$.
7. Complete the square for $$9y^{2}-4x^{2}-54y-16x+29=0$$. Write the equation in standard form and give the center, vertices, foci, eccentricity, and asymptotes.
8. A hyperbola has center $$(2,-1)$$, asymptotes $$y+1=\pm\dfrac{3}{2}(x-2)$$, and one focus at $$(2+\sqrt{52},-1)$$. Assuming it opens left/right, find its standard-form equation.
9. Find all intersection points in $$\mathbb{R}^{2}$$ of the ellipse $$\dfrac{x^{2}}{16}+\dfrac{y^{2}}{9}=1$$ and the hyperbola $$\dfrac{x^{2}}{4}-\dfrac{y^{2}}{9}=1$$.
10. With focus at $$(0,0)$$, directrix $$x=-6$$, and eccentricity $$e=\dfrac{2}{3}$$, derive the Cartesian equation of the conic. Write it in standard form and identify the conic type.
11. Convert $$r=\dfrac{10}{2-\cos\theta}$$ to a Cartesian equation. Identify the conic type, eccentricity, center, vertices, and foci.
12. For $$r=\dfrac{12}{3+4\cos\theta}$$, identify the conic type and eccentricity, then find the values of $$\theta$$ where the denominator vanishes. Explain what those angles represent geometrically.
13. A circle is tangent to both axes in Quadrant I and its center lies on the ellipse $$\dfrac{x^{2}}{25}+\dfrac{y^{2}}{9}=1$$. Find the circle's radius.
14. Show that the conic $$Ax^{2}+Cy^{2}+Dx+Ey+F=0$$ has center $$(h,k)$$ when $$A\ne 0$$ and $$C\ne 0$$. Derive formulas for $$h$$ and $$k$$ in terms of $$A,C,D,E$$, then find the center of $$5x^{2}-3y^{2}+20x+18y-11=0$$.
15. For the parabola $$y^{2}=4px$$ with $$p>0$$, let a line through the focus $$(p,0)$$ have slope $$m\ne 0$$ and meet the parabola at two distinct points $$A$$ and $$B$$. Prove that the product of the $$y$$-coordinates of $$A$$ and $$B$$ equals $$-4p^{2}$$.
16. (Bonus, 2026 USAPHO) 

Charged particles in a central Coulomb field follow conic trajectories because the force magnitude obeys an inverse-square law. Fix a particle $$\alpha$$ with charge $$+1\ \mathrm{C}$$ at the origin. A second particle then moves on either an elliptic-type (bound) or hyperbolic-type (unbound) conic, with polar descriptions (using polar angle $$\phi$$ measured from the positive $$x$$-axis and radial distance from the origin):

$$
r = \frac{r_{0}}{1 + e\cos\phi} \qquad (0 < e < 1)
$$

for the attractive case, and

$$
R = \frac{r_{0}}{e\cos\phi - 1} \qquad (e > 1)
$$

for the repulsive case.

You also have a camera that records the exact position of the moving particle at three different times.

$$(A)$$ Particle $$\beta$$ has charge $$-1\ \mathrm{C}$$ (attractive interaction with $$\alpha$$). The camera records

$$
(0,\,-5\ \mathrm{m}),\qquad (3\ \mathrm{m},\,0),\qquad (0,\,5\ \mathrm{m}).
$$

Assume the only force on $$\beta$$ is the Coulomb force from $$\alpha$$, so the path is described by the attractive polar model above. Find the maximum distance $$\beta$$ ever reaches from the origin.

$$(B)$$ Particle $$\gamma$$ has charge $$+2\ \mathrm{C}$$ (repulsive interaction with $$\alpha$$). The camera records

$$
(3\ \mathrm{m},\,-4\ \mathrm{m}),\qquad (2\ \mathrm{m},\,0),\qquad (3\ \mathrm{m},\,4\ \mathrm{m}).
$$

Assume the only force on $$\gamma$$ is the Coulomb force from $$\alpha$$, so the path is described by the repulsive polar model above. After a very long time, find the angle $$\theta$$ that the velocity of $$\gamma$$ makes with the positive $$x$$-axis (give an exact answer using inverse trigonometric functions if needed).

$$(C)$$ Now imagine firing a family of particles identical to $$\gamma$$ from infinity, one at a time, along the same incident asymptotic line as $$\gamma$$, so they do not interact with each other and only interact with $$\alpha$$ (each trajectory is a repulsive hyperbola as above).

Define the **impact parameter** $$B$$ as the perpendicular distance from the origin (where $$\alpha$$ sits) to the incident asymptotic line of $$\gamma$$. To avoid a symbol clash with the label $$\alpha$$ for the fixed charge, denote the **deflection angle** by $$\theta$$: that is the angle by which $$\gamma$$’s outgoing asymptotic direction differs from its incoming asymptotic direction, after a very long time.

$$(i)$$ Determine $$B(\theta)$$: express $$B$$ in terms of $$\theta$$ (and any constants such as $$e$$ or $$r_{0}$$ that you think must appear).

$$(ii)$$ Determine $$B(r_{0})$$: express $$B$$ in terms of $$r_{0}$$ (eliminating $$\Theta$$ if your answer in (i) still contains it, or giving the cleanest relation you can between $$B$$ and $$r_{0}$$ for this family of trajectories—state clearly what you are holding fixed).

## Solutions

### Solution 1

Complete the square:

$$
4x^{2}+9y^{2}-24x+36y+36=0
$$

$$
4(x^{2}-6x)+9(y^{2}+4y)+36=0.
$$

Then

$$
4\bigl((x-3)^{2}-9\bigr)+9\bigl((y+2)^{2}-4\bigr)+36=0.
$$

Simplify:

$$
4(x-3)^{2}+9(y+2)^{2}=36.
$$

Divide by $$36$$:

$$
\frac{(x-3)^{2}}{9}+\frac{(y+2)^{2}}{4}=1.
$$

This is an ellipse centered at $$(3,-2)$$ with horizontal major axis. Here $$a^{2}=9$$, $$b^{2}=4$$, so $$a=3$$ and $$b=2$$. Also

$$
c^{2}=a^{2}-b^{2}=9-4=5,
$$

so $$c=\sqrt{5}$$ and $$e=\dfrac{c}{a}=\dfrac{\sqrt{5}}{3}$$.

Thus

$$
\boxed{\frac{(x-3)^{2}}{9}+\frac{(y+2)^{2}}{4}=1}
$$

with center $$\boxed{(3,-2)}$$, vertices $$\boxed{(0,-2),(6,-2)}$$, co-vertices $$\boxed{(3,-4),(3,0)}$$, foci $$\boxed{(3-\sqrt{5},-2),(3+\sqrt{5},-2)}$$, eccentricity $$\boxed{\frac{\sqrt{5}}{3}}$$, major axis length $$\boxed{6}$$, and minor axis length $$\boxed{4}$$.

### Solution 2

The focus is $$(5,-2)$$ and the directrix is $$x=-1$$, so the parabola opens horizontally. The vertex is halfway between the focus and directrix along the horizontal axis:

$$
\left(\frac{5+(-1)}{2},-2\right)=(2,-2).
$$

Thus $$h=2$$ and $$k=-2$$. Since the focus is $$(h+p,k)=(5,-2)$$,

$$
p=3.
$$

Use the horizontal parabola form

$$
(y-k)^{2}=4p(x-h).
$$

So

$$
\boxed{(y+2)^{2}=12(x-2)}.
$$

The axis of symmetry is $$\boxed{y=-2}$$. The latus rectum is vertical through the focus. Its length is $$\lvert 4p \rvert=12$$, so its endpoints are $$6$$ units above and below the focus:

$$
\boxed{(5,4)\text{ and }(5,-8)}.
$$

### Solution 3

A line with slope $$-2$$ has equation

$$
y=-2x+b.
$$

Substitute into the parabola

$$
(x-1)^{2}=8(y+3).
$$

Then

$$
(x-1)^{2}=8(-2x+b+3).
$$

Expand:

$$
x^{2}-2x+1=-16x+8b+24.
$$

Move everything to one side:

$$
x^{2}+14x-(8b+23)=0.
$$

For the line to be tangent, this quadratic must have exactly one solution, so its discriminant is $$0$$:

$$
14^{2}-4(1)(-(8b+23))=0.
$$

Thus

$$
196+32b+92=0
\quad\Longrightarrow\quad
32b=-288
\quad\Longrightarrow\quad
b=-9.
$$

Therefore the tangent line is

$$
\boxed{y=-2x-9}.
$$

### Solution 4

The foci $$(1,4)$$ and $$(1,-2)$$ have midpoint

$$
(h,k)=\left(1,\frac{4+(-2)}{2}\right)=(1,1).
$$

The foci are vertical, so the major axis is vertical. The distance from the center to either focus is

$$
c=3.
$$

The point $$(5,1)$$ lies on the ellipse. Its distances to the foci are

$$
\sqrt{(5-1)^{2}+(1-4)^{2}}=5
$$

and

$$
\sqrt{(5-1)^{2}+(1-(-2))^{2}}=5.
$$

The sum of distances is $$10$$, so $$2a=10$$ and $$a=5$$. Then

$$
b^{2}=a^{2}-c^{2}=25-9=16.
$$

Since the major axis is vertical,

$$
\boxed{\frac{(x-1)^{2}}{16}+\frac{(y-1)^{2}}{25}=1}.
$$

The eccentricity is

$$
\boxed{e=\frac{c}{a}=\frac{3}{5}}.
$$

### Solution 5

The ellipse

$$
\frac{(x+2)^{2}}{36}+\frac{(y-1)^{2}}{20}=1
$$

has center $$(-2,1)$$, $$a^{2}=36$$, and $$b^{2}=20$$. Therefore

$$
c^{2}=a^{2}-b^{2}=36-20=16,
$$

so $$c=4$$. The foci are

$$
(-2-4,1)=(-6,1)
\quad\text{and}\quad
(-2+4,1)=(2,1).
$$

Now use $$x=1$$:

$$
\frac{(1+2)^{2}}{36}+\frac{(y-1)^{2}}{20}=1.
$$

So

$$
\frac{9}{36}+\frac{(y-1)^{2}}{20}=1
\quad\Longrightarrow\quad
\frac{(y-1)^{2}}{20}=\frac{3}{4}.
$$

Thus

$$
(y-1)^{2}=15.
$$

Since $$y>1$$,

$$
y=1+\sqrt{15}.
$$

So $$P=(1,1+\sqrt{15})$$. Its distance to the right focus $$(2,1)$$ is

$$
\sqrt{(1-2)^{2}+(\sqrt{15})^{2}}=\sqrt{16}=4.
$$

Its distance to the left focus $$(-6,1)$$ is

$$
\sqrt{(1+6)^{2}+(\sqrt{15})^{2}}=\sqrt{64}=8.
$$

Therefore

$$
\boxed{PF_{\text{right}}=4\quad\text{and}\quad PF_{\text{left}}=8}.
$$

### Solution 6

Substitute $$y=mx+3$$ into

$$
\frac{x^{2}}{9}+\frac{y^{2}}{4}=1.
$$

Then

$$
\frac{x^{2}}{9}+\frac{(mx+3)^{2}}{4}=1.
$$

Multiply by $$36$$:

$$
4x^{2}+9(mx+3)^{2}=36.
$$

Expand:

$$
4x^{2}+9(m^{2}x^{2}+6mx+9)=36.
$$

So

$$
(4+9m^{2})x^{2}+54mx+45=0.
$$

For tangency, the discriminant must be $$0$$:

$$
(54m)^{2}-4(4+9m^{2})(45)=0.
$$

Simplify:

$$
2916m^{2}-180(4+9m^{2})=0
$$

$$
1296m^{2}-720=0
\quad\Longrightarrow\quad
m^{2}=\frac{5}{9}.
$$

Thus

$$
\boxed{m=\pm\frac{\sqrt{5}}{3}}.
$$

### Solution 7

Start with

$$
9y^{2}-4x^{2}-54y-16x+29=0.
$$

Group and complete the square:

$$
9(y^{2}-6y)-4(x^{2}+4x)+29=0.
$$

Then

$$
9\bigl((y-3)^{2}-9\bigr)-4\bigl((x+2)^{2}-4\bigr)+29=0.
$$

Simplify:

$$
9(y-3)^{2}-4(x+2)^{2}-36=0.
$$

So

$$
9(y-3)^{2}-4(x+2)^{2}=36.
$$

Divide by $$36$$:

$$
\boxed{\frac{(y-3)^{2}}{4}-\frac{(x+2)^{2}}{9}=1}.
$$

This is a vertical hyperbola. The center is $$(-2,3)$$. Here $$a^{2}=4$$, $$b^{2}=9$$, so $$a=2$$ and $$b=3$$. Also

$$
c^{2}=a^{2}+b^{2}=4+9=13,
$$

so $$c=\sqrt{13}$$ and $$e=\dfrac{\sqrt{13}}{2}$$.

The vertices are

$$
\boxed{(-2,1)\text{ and }(-2,5)}.
$$

The foci are

$$
\boxed{(-2,3-\sqrt{13})\text{ and }(-2,3+\sqrt{13})}.
$$

The asymptotes are

$$
\boxed{y-3=\pm\frac{2}{3}(x+2)}.
$$

### Solution 8

A horizontal hyperbola centered at $$(2,-1)$$ has form

$$
\frac{(x-2)^{2}}{a^{2}}-\frac{(y+1)^{2}}{b^{2}}=1.
$$

Its asymptotes are

$$
y+1=\pm\frac{b}{a}(x-2).
$$

We are given slope $$\frac{3}{2}$$, so

$$
\frac{b}{a}=\frac{3}{2}.
$$

Let $$a=2t$$ and $$b=3t$$. The focus distance satisfies

$$
c^{2}=a^{2}+b^{2}.
$$

Since one focus is $$(2+\sqrt{52},-1)$$, we have $$c=\sqrt{52}$$. Thus

$$
52=(2t)^{2}+(3t)^{2}=13t^{2}.
$$

So $$t^{2}=4$$, and therefore

$$
a^{2}=(2t)^{2}=16,
\qquad
b^{2}=(3t)^{2}=36.
$$

Thus the equation is

$$
\boxed{\frac{(x-2)^{2}}{16}-\frac{(y+1)^{2}}{36}=1}.
$$

### Solution 9

Solve the system

$$
\frac{x^{2}}{16}+\frac{y^{2}}{9}=1
$$

and

$$
\frac{x^{2}}{4}-\frac{y^{2}}{9}=1.
$$

Let $$X=x^{2}$$ and $$Y=y^{2}$$. Then

$$
\frac{X}{16}+\frac{Y}{9}=1
$$

and

$$
\frac{X}{4}-\frac{Y}{9}=1.
$$

From the second equation,

$$
X=4+\frac{4Y}{9}.
$$

Substitute into the first:

$$
\frac{4+\frac{4Y}{9}}{16}+\frac{Y}{9}=1.
$$

This gives

$$
\frac{1}{4}+\frac{Y}{36}+\frac{Y}{9}=1
\quad\Longrightarrow\quad
\frac{1}{4}+\frac{5Y}{36}=1.
$$

So

$$
\frac{5Y}{36}=\frac{3}{4}
\quad\Longrightarrow\quad
Y=\frac{27}{5}.
$$

Then

$$
X=4+\frac{4}{9}\cdot\frac{27}{5}
=4+\frac{12}{5}
=\frac{32}{5}.
$$

Therefore

$$
x=\pm\sqrt{\frac{32}{5}}=\pm\frac{4\sqrt{10}}{5},
\qquad
y=\pm\sqrt{\frac{27}{5}}=\pm\frac{3\sqrt{15}}{5}.
$$

All sign combinations work, so the intersection points are

$$
\boxed{\left(\pm\frac{4\sqrt{10}}{5},\,\pm\frac{3\sqrt{15}}{5}\right)}.
$$

### Solution 10

The focus is $$(0,0)$$ and the directrix is $$x=-6$$. For a point $$(x,y)$$ on the conic,

$$
PF=\sqrt{x^{2}+y^{2}}
$$

and

$$
d(P,\ell)=x+6
$$

on the appropriate side of the directrix. Since $$e=\dfrac{2}{3}$$,

$$
\sqrt{x^{2}+y^{2}}=\frac{2}{3}(x+6).
$$

Square both sides:

$$
x^{2}+y^{2}=\frac{4}{9}(x+6)^{2}.
$$

Multiply by $$9$$:

$$
9x^{2}+9y^{2}=4x^{2}+48x+144.
$$

So

$$
5x^{2}+9y^{2}-48x-144=0.
$$

Complete the square in $$x$$:

$$
5\left(x^{2}-\frac{48}{5}x\right)+9y^{2}=144.
$$

Since

$$
x^{2}-\frac{48}{5}x=\left(x-\frac{24}{5}\right)^{2}-\frac{576}{25},
$$

we get

$$
5\left(x-\frac{24}{5}\right)^{2}+9y^{2}=\frac{1296}{5}.
$$

Divide by $$\dfrac{1296}{5}$$:

$$
\boxed{\frac{\left(x-\frac{24}{5}\right)^{2}}{\frac{1296}{25}}+\frac{y^{2}}{\frac{144}{5}}=1}.
$$

Since $$0<e<1$$, this conic is an ellipse.

### Solution 11

Start with

$$
r=\frac{10}{2-\cos\theta}.
$$

Rewrite:

$$
2r-r\cos\theta=10.
$$

Use $$r=\sqrt{x^{2}+y^{2}}$$ and $$r\cos\theta=x$$:

$$
2\sqrt{x^{2}+y^{2}}-x=10.
$$

So

$$
2\sqrt{x^{2}+y^{2}}=x+10.
$$

Square both sides:

$$
4(x^{2}+y^{2})=(x+10)^{2}.
$$

Expand:

$$
4x^{2}+4y^{2}=x^{2}+20x+100.
$$

So

$$
3x^{2}+4y^{2}-20x-100=0.
$$

Complete the square:

$$
3\left(x^{2}-\frac{20}{3}x\right)+4y^{2}=100.
$$

Since

$$
x^{2}-\frac{20}{3}x=\left(x-\frac{10}{3}\right)^{2}-\frac{100}{9},
$$

we get

$$
3\left(x-\frac{10}{3}\right)^{2}+4y^{2}=\frac{400}{3}.
$$

Divide by $$\dfrac{400}{3}$$:

$$
\boxed{\frac{\left(x-\frac{10}{3}\right)^{2}}{\frac{400}{9}}+\frac{y^{2}}{\frac{100}{3}}=1}.
$$

The conic is an ellipse. From

$$
r=\frac{10}{2-\cos\theta}=\frac{5}{1-\frac{1}{2}\cos\theta},
$$

the eccentricity is $$\boxed{e=\frac{1}{2}}$$. The center is $$\boxed{\left(\frac{10}{3},0\right)}$$. Since $$a^{2}=\frac{400}{9}$$, $$a=\frac{20}{3}$$. The vertices are

$$
\boxed{\left(-\frac{10}{3},0\right)\text{ and }(10,0)}.
$$

Also $$c=ea=\frac{10}{3}$$, so the foci are

$$
\boxed{(0,0)\text{ and }\left(\frac{20}{3},0\right)}.
$$

### Solution 12

Rewrite

$$
r=\frac{12}{3+4\cos\theta}
$$

by factoring $$3$$ from the denominator:

$$
r=\frac{4}{1+\frac{4}{3}\cos\theta}.
$$

This matches polar conic form with eccentricity

$$
e=\frac{4}{3}.
$$

Since $$e>1$$, the conic is a hyperbola.

The denominator vanishes when

$$
3+4\cos\theta=0.
$$

Thus

$$
\cos\theta=-\frac{3}{4}.
$$

So the angles are

$$
\boxed{\theta=\arccos\left(-\frac{3}{4}\right)\quad\text{and}\quad \theta=2\pi-\arccos\left(-\frac{3}{4}\right)}.
$$

At those angles, $$r$$ is not finite. Geometrically, they give the asymptotic directions of the hyperbola.

### Solution 13

A circle tangent to both axes in Quadrant I has center $$(r,r)$$ and radius $$r$$. Since the center lies on

$$
\frac{x^{2}}{25}+\frac{y^{2}}{9}=1,
$$

substitute $$(r,r)$$:

$$
\frac{r^{2}}{25}+\frac{r^{2}}{9}=1.
$$

Then

$$
r^{2}\left(\frac{1}{25}+\frac{1}{9}\right)=1.
$$

Compute:

$$
\frac{1}{25}+\frac{1}{9}=\frac{9+25}{225}=\frac{34}{225}.
$$

So

$$
r^{2}\cdot\frac{34}{225}=1
\quad\Longrightarrow\quad
r^{2}=\frac{225}{34}.
$$

Since $$r>0$$,

$$
\boxed{r=\frac{15}{\sqrt{34}}=\frac{15\sqrt{34}}{34}}.
$$

### Solution 14

Start with

$$
Ax^{2}+Cy^{2}+Dx+Ey+F=0,
$$

where $$A\ne 0$$ and $$C\ne 0$$. Complete the square separately in $$x$$ and $$y$$:

$$
A\left(x^{2}+\frac{D}{A}x\right)+C\left(y^{2}+\frac{E}{C}y\right)+F=0.
$$

The centers of the completed squares occur at

$$
x=-\frac{D}{2A}
\qquad\text{and}\qquad
y=-\frac{E}{2C}.
$$

Therefore the center is

$$
\boxed{\left(-\frac{D}{2A},-\frac{E}{2C}\right)}.
$$

For

$$
5x^{2}-3y^{2}+20x+18y-11=0,
$$

we have $$A=5$$, $$C=-3$$, $$D=20$$, and $$E=18$$. Thus

$$
h=-\frac{20}{2(5)}=-2
$$

and

$$
k=-\frac{18}{2(-3)}=3.
$$

So the center is

$$
\boxed{(-2,3)}.
$$

### Solution 15

The parabola is

$$
y^{2}=4px,
$$

and its focus is $$(p,0)$$. A line through the focus with slope $$m\ne 0$$ has equation

$$
y=m(x-p).
$$

Solve this for $$x$$:

$$
x=p+\frac{y}{m}.
$$

Substitute into the parabola:

$$
y^{2}=4p\left(p+\frac{y}{m}\right).
$$

Expand:

$$
y^{2}=4p^{2}+\frac{4p}{m}y.
$$

Move everything to one side:

$$
y^{2}-\frac{4p}{m}y-4p^{2}=0.
$$

This quadratic has roots equal to the $$y$$-coordinates of the two intersection points $$A$$ and $$B$$. By Vieta's formula, the product of the roots is the constant term divided by the leading coefficient:

$$
y_Ay_B=\frac{-4p^{2}}{1}.
$$

Therefore

$$
\boxed{y_Ay_B=-4p^{2}}.
$$

### Solution 16

For part (A), use the attractive model

$$
r=\frac{r_0}{1+e\cos\phi}.
$$

The points $$(0,-5)$$ and $$(0,5)$$ have radial distance $$5$$ and satisfy $$\cos\phi=0$$. Therefore

$$
5=\frac{r_0}{1+e(0)}
\quad\Longrightarrow\quad
r_0=5.
$$

The point $$(3,0)$$ has $$r=3$$ and $$\cos\phi=1$$, so

$$
3=\frac{5}{1+e}.
$$

Thus

$$
1+e=\frac53
\quad\Longrightarrow\quad
e=\frac23.
$$

The maximum distance from the origin occurs when the denominator is smallest. Since $$0<e<1$$, this happens at $$\cos\phi=-1$$:

$$
r_{\max}=\frac{r_0}{1-e}
=\frac{5}{1-\frac23}
=15.
$$

So

$$
\boxed{r_{\max}=15\ \mathrm{m}}.
$$

For part (B), use the repulsive model

$$
R=\frac{r_0}{e\cos\phi-1}.
$$

The point $$(2,0)$$ has $$R=2$$ and $$\cos\phi=1$$, so

$$
2=\frac{r_0}{e-1}
\quad\Longrightarrow\quad
r_0=2(e-1).
$$

The points $$(3,-4)$$ and $$(3,4)$$ have $$R=5$$ and $$\cos\phi=\frac35$$, so

$$
5=\frac{r_0}{\frac35e-1}.
$$

Substitute $$r_0=2(e-1)$$:

$$
5\left(\frac35e-1\right)=2(e-1).
$$

Then

$$
3e-5=2e-2
\quad\Longrightarrow\quad
e=3.
$$

Therefore

$$
r_0=2(3-1)=4.
$$

The asymptotic directions occur when the denominator tends to $$0$$:

$$
e\cos\phi-1=0.
$$

Since $$e=3$$,

$$
\cos\phi=\frac13.
$$

Thus the outgoing asymptotic direction in the upper half-plane makes angle

$$
\boxed{\theta=\arccos\left(\frac13\right)}
$$

with the positive $$x$$-axis. Equivalently,

$$
\boxed{\theta=\arctan(2\sqrt2)}.
$$

For part (C), start from the general repulsive equation

$$
R=\frac{r_0}{e\cos\phi-1}.
$$

Since $$R\cos\phi=x$$, multiply through:

$$
R(e\cos\phi-1)=r_0
\quad\Longrightarrow\quad
ex-R=r_0.
$$

So

$$
R=ex-r_0.
$$

Square and use $$R^2=x^2+y^2$$:

$$
x^2+y^2=(ex-r_0)^2.
$$

Rearrange:

$$
(e^2-1)x^2-2er_0x+r_0^2-y^2=0.
$$

Complete the square in $$x$$:

$$
(e^2-1)\left(x-\frac{er_0}{e^2-1}\right)^2-y^2
=\frac{r_0^2}{e^2-1}.
$$

Divide by $$\dfrac{r_0^2}{e^2-1}$$:

$$
\frac{\left(x-\frac{er_0}{e^2-1}\right)^2}{\frac{r_0^2}{(e^2-1)^2}}
-
\frac{y^2}{\frac{r_0^2}{e^2-1}}
=1.
$$

Thus the asymptotes are

$$
y=\pm\sqrt{e^2-1}\left(x-\frac{er_0}{e^2-1}\right).
$$

The impact parameter $$B$$ is the perpendicular distance from the origin to either asymptote. For the line

$$
y=\sqrt{e^2-1}\left(x-\frac{er_0}{e^2-1}\right),
$$

this distance is

$$
B=
\frac{\sqrt{e^2-1}\cdot \frac{er_0}{e^2-1}}
{\sqrt{1+(e^2-1)}}.
$$

Since $$\sqrt{1+(e^2-1)}=e$$,

$$
\boxed{B=\frac{r_0}{\sqrt{e^2-1}}}.
$$

Now relate this to the deflection angle. The outgoing asymptote makes angle

$$
\alpha=\arccos\left(\frac1e\right)
$$

with the positive $$x$$-axis. The incoming and outgoing velocity directions differ by

$$
\theta=\pi-2\alpha.
$$

So

$$
\frac{\theta}{2}=\frac{\pi}{2}-\alpha.
$$

Because $$\cos\alpha=\frac1e$$,

$$
\sin\left(\frac{\theta}{2}\right)=\frac1e.
$$

Therefore

$$
\sqrt{e^2-1}=\cot\left(\frac{\theta}{2}\right),
$$

and

$$
\boxed{B(\theta)=r_0\tan\left(\frac{\theta}{2}\right)}.
$$

For the specific trajectory of $$\gamma$$ from part (B), $$e=3$$ and $$r_0=4$$, so

$$
B=\frac{4}{\sqrt{3^2-1}}
=\frac{4}{\sqrt8}
=\sqrt2.
$$

Thus, if the family is fired along the same incident asymptotic line as $$\gamma$$, the impact parameter is fixed:

$$
\boxed{B=\sqrt2\ \mathrm{m}}.
$$

If instead one holds the eccentricity $$e$$ fixed while varying $$r_0$$, then the clean relation is

$$
\boxed{B(r_0)=\frac{r_0}{\sqrt{e^2-1}}}.
$$

In particular, for the same eccentricity as $$\gamma$$, namely $$e=3$$,

$$
\boxed{B(r_0)=\frac{r_0}{2\sqrt2}}.
$$
