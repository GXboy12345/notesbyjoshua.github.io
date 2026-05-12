---
layout: default
title: "Unit 12: Conic Sections"
parent: AP Precalculus
nav_order: 8
permalink: /notes/ap/precalc/conicsections/
---

# Unit 12: Conic Sections

## Introduction to conics

A conic section is the curve you get when a plane meets a right circular cone: circle, ellipse, parabola, or hyperbola (the “degenerate” cases—point, line, pair of lines—show up when the plane passes through the vertex in special ways).

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

Proof (focus–directrix $$\Rightarrow$$ Cartesian conic). We show that in rectangular coordinates the locus $$PF = e\,d(P,\ell)$$ is always a parabola, ellipse, or hyperbola according to $$e$$. Take $$e > 0$$ and place the focus at the origin and the directrix as the vertical line $$x = -d$$ with $$d > 0$$, so the focus lies to the right of the directrix. For any point $$P = (x,y)$$ on the same side of the directrix as the focus (so that the foot of the perpendicular has $$x$$-coordinate $$-d$$ and $$x > -d$$), the perpendicular distance is

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

Case $$0 < e < 1$$. Then $$1 - e^{2} > 0$$. Divide the rearranged equation by $$1 - e^{2}$$ and complete the square in $$x$$:

$$
\left(x - \frac{e^{2}d}{1 - e^{2}}\right)^{2} + \frac{y^{2}}{1 - e^{2}} = \frac{e^{2}d^{2}}{(1 - e^{2})^{2}}.
$$

Both denominators on the left are positive after the division, so this is the equation of an ellipse in standard position (after translation of the $$x$$-axis).

Case $$e > 1$$. Then $$1 - e^{2} < 0$$. Multiply the rearranged equation by $$-1$$ and write

$$
(e^{2} - 1)x^{2} + 2e^{2}d\,x - y^{2} = -e^{2}d^{2}.
$$

Complete the square in $$x$$:

$$
(e^{2} - 1)\left(x + \frac{e^{2}d}{e^{2} - 1}\right)^{2} - y^{2} = \frac{e^{2}d^{2}}{e^{2} - 1},
$$

which is the equation of a hyperbola (difference of squared terms with opposite signs).

Thus the focus–directrix condition with fixed $$e > 0$$ produces exactly one nondegenerate conic type in each case $$e = 1$$, $$0 < e < 1$$, and $$e > 1$$. Other placements of the focus and directrix (rotations and translations) only change coordinates, not the classification.

</div>

---

## Conics in polar

Place a focus at the pole $$(0,0)$$ and align the directrix perpendicular to the polar axis. With eccentricity $$e \ge 0$$ and semi-latus rectum $$p > 0$$ (your book may define $$p$$ slightly differently—match its diagram), a common form is:

$$
r = \frac{ep}{1 + e\cos\theta}
$$

when the directrix is the vertical line $$x = -p$$ (to the left of the focus). Variants use $$e\sin\theta$$ in the denominator when the directrix is horizontal, and minus signs when the directrix lies on the other side of the focus, e.g.

$$
r = \frac{ep}{1 - e\cos\theta}
$$

for a directrix $$x = p$$ to the right.

Reading the graph:

- $$e = 1$$: one unbounded branch (parabola opening toward the directrix side that makes the denominator able to go to $$0$$).
- $$e < 1$$: bounded curve (ellipse).
- $$e > 1$$: two branches (hyperbola); values of $$\theta$$ that make $$1 + e\cos\theta = 0$$ (or the corresponding denominator in your chosen form) are asymptotic directions (no finite points).

Always check your course’s exact convention for $$p$$ and the sign in the denominator so your formulas match the textbook’s figure of the focus and directrix.
