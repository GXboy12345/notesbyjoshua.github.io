---
layout: default
title: "Unit 8: Applications of Integration"
parent: "AP Calculus AB/BC"
nav_order: 8
permalink: /notes/math/appintegration/
---

# Unit 8: Applications of Integration

This unit turns integrals into geometry and accumulated quantities. You should be able to move flexibly between signed area, total change, volume, and other physical interpretations.

---

## Area between curves

If $$f(x) \ge g(x)$$ on $$[a,b]$$, then the area between the curves is

$$
\int_a^b [f(x)-g(x)]\,dx.
$$

For horizontal slicing with respect to $$y$$:

$$
\int_c^d [x_{\text{right}}(y)-x_{\text{left}}(y)]\,dy.
$$

> [Image Placeholder: region between two curves with top-minus-bottom and right-minus-left labeling]

---

## Accumulation and net change

If $$R(t)$$ is a rate, then

$$
\int_a^b R(t)\,dt
$$

gives net change over $$[a,b]$$.

So if $$P'(t)=R(t)$$, then

$$
P(b)-P(a)=\int_a^b R(t)\,dt.
$$

---

## Distance vs displacement

If velocity is $$v(t)$$, then:

$$
\text{displacement} = \int_a^b v(t)\,dt
$$

$$
\text{total distance} = \int_a^b \lvert v(t) \rvert\,dt
$$

Split total distance at sign changes of $$v(t)$$.

---

## Volume by cross sections

If cross-sectional area perpendicular to the axis is $$A(x)$$, then volume is

$$
V = \int_a^b A(x)\,dx.
$$

Common cross sections:

- squares,
- rectangles,
- semicircles,
- equilateral triangles.

---

## Disk and washer methods

Disk method:

$$
V = \pi \int_a^b [R(x)]^2\,dx
$$

Washer method:

$$
V = \pi \int_a^b \left([R(x)]^2-[r(x)]^2\right)\,dx
$$

> [Image Placeholder: disk vs washer setup with labeled radii]

---

## Volume by cylindrical shells

$$
V = 2\pi \int_a^b (\text{radius})(\text{height})\,dx.
$$

Shell method is often simpler when washers would require solving for inverse functions or splitting many pieces.

---

## Arc length

For a smooth function $$y=f(x)$$ on $$[a,b]$$:

$$
L = \int_a^b \sqrt{1+[f'(x)]^2}\,dx.
$$

This is useful BC-level enrichment even when not emphasized heavily in every AP class.

---

## Improper integrals

An integral is improper if:

- an interval is infinite, or
- the integrand is unbounded.

Interpret through limits, for example:

$$
\int_1^\infty \frac{1}{x^2}\,dx
=
\lim_{b \to \infty} \int_1^b \frac{1}{x^2}\,dx.
$$

---

## Choosing a slicing direction

Applications of integration usually begin with a geometric slice.

Vertical slices use $$dx$$ and usually compare top minus bottom:

$$
\int_a^b [\text{top}-\text{bottom}]\,dx.
$$

Horizontal slices use $$dy$$ and usually compare right minus left:

$$
\int_c^d [\text{right}-\text{left}]\,dy.
$$

The correct choice depends on which direction makes the region easiest to describe without unnecessary splitting.

<div class="theorem-box" markdown="1">

**Key idea.** Draw the slice first, then write the formula. The slice tells you the width, height, radius, or cross-sectional area.

</div>

---

## Area between curves

Area between curves is geometric area, so it must be nonnegative. If the curves cross, the "top" and "bottom" functions may switch. Split the interval at intersection points so the subtraction matches the geometry on each piece.

For functions of $$y$$, use right minus left instead. This is often cleaner when the region is bounded sideways or when solving for $$y$$ would produce multiple branches.

---

## Volumes from cross sections

For cross-sectional volume, the integral adds thin slabs:

$$
dV=A(x)\,dx.
$$

The base region determines the side length, diameter, radius, or height needed for the cross-sectional area formula.

Common area formulas:

$$
\text{square: } A=s^2,
$$

$$
\text{semicircle: } A=\frac12\pi r^2,
$$

$$
\text{equilateral triangle: } A=\frac{\sqrt3}{4}s^2.
$$

The calculus part is the accumulation. The geometry part is building $$A(x)$$ correctly.

---

## Washers vs shells

Washers and disks come from slices perpendicular to the axis of rotation. Shells come from slices parallel to the axis of rotation.

Washer volume:

$$
V=\pi\int [R^2-r^2]\,d(\text{slice variable}).
$$

Shell volume:

$$
V=2\pi\int(\text{radius})(\text{height})\,d(\text{slice variable}).
$$

The radius is always a distance to the axis of rotation, so it should be nonnegative. If the axis is not one of the coordinate axes, write the distance carefully.

---

## Motion and accumulation

If velocity is given, displacement and distance are different:

$$
\text{displacement}=\int_a^b v(t)\,dt,
$$

$$
\text{total distance}=\int_a^b |v(t)|\,dt.
$$

Displacement keeps direction. Total distance counts all movement as positive. Split total-distance integrals at times when velocity changes sign.

If acceleration is given, integrate acceleration to get change in velocity. If velocity is given, integrate velocity to get change in position.

---

## Arc length intuition

Arc length adds tiny straight-line distances along a curve. For $$y=f(x)$$,

$$
dL\approx \sqrt{(dx)^2+(dy)^2}.
$$

Since

$$
dy=f'(x)\,dx,
$$

the length element becomes

$$
dL=\sqrt{1+[f'(x)]^2}\,dx.
$$

This explains why the derivative appears inside the arc length formula: the steepness of the curve affects how much length is packed into each small horizontal interval.

---

## Improper integral meaning

Improper integrals are always limits. Infinite intervals are handled by letting an endpoint move without bound. Infinite discontinuities are handled by approaching the problematic point from the correct side.

Convergence means the limiting accumulated value is finite. Divergence means the accumulated value does not settle to a finite number.

---

## Common mistakes

- Forgetting to split total distance when velocity changes sign.
- Using top-minus-bottom when the curves cross inside the interval without splitting.
- Using wrong radii in washer problems.
- Mixing shell and washer formulas without matching the slice geometry.
