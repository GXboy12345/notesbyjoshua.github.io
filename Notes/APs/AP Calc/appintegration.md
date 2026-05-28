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

:::theorem{name="Area between curves"}
If $$f(x) \ge g(x)$$ on $$[a,b]$$, then the area between the curves is

$$
\int_a^b [f(x)-g(x)]\,dx.
$$

For horizontal slicing with respect to $$y$$:

$$
\int_c^d [x_{\text{right}}(y)-x_{\text{left}}(y)]\,dy.
$$
:::

:::note
[Image Placeholder: region between two curves with top-minus-bottom and right-minus-left labeling]
:::

---

## Accumulation and net change

:::theorem{name="Net change from a rate"}
If $$R(t)$$ is a rate, then

$$
\int_a^b R(t)\,dt
$$

gives net change over $$[a,b]$$.

So if $$P'(t)=R(t)$$, then

$$
P(b)-P(a)=\int_a^b R(t)\,dt.
$$
:::

---

## Distance vs displacement

If velocity is $$v(t)$$, then:

:::key{name="Displacement"}
$$
\text{displacement} = \int_a^b v(t)\,dt
$$
:::

:::key{name="Total distance"}
$$
\text{total distance} = \int_a^b \lvert v(t) \rvert\,dt
$$
:::

Split total distance at sign changes of $$v(t)$$.

---

## Volume by cross sections

:::theorem{name="Volume by cross sections"}
If cross-sectional area perpendicular to the axis is $$A(x)$$, then volume is

$$
V = \int_a^b A(x)\,dx.
$$
:::

Common cross sections:

- squares,
- rectangles,
- semicircles,
- equilateral triangles.

---

## Disk and washer methods

:::key{name="Disk method"}
$$
V = \pi \int_a^b [R(x)]^2\,dx
$$
:::

:::key{name="Washer method"}
$$
V = \pi \int_a^b \left([R(x)]^2-[r(x)]^2\right)\,dx
$$
:::

:::note
[Image Placeholder: disk vs washer setup with labeled radii]
:::

---

## Volume by cylindrical shells

:::key{name="Shell method"}
$$
V = 2\pi \int_a^b (\text{radius})(\text{height})\,dx.
$$
:::

:::tip
Shell method is often simpler when washers would require solving for inverse functions or splitting many pieces.
:::

---

## Arc length

:::key{name="Arc length"}
For a smooth function $$y=f(x)$$ on $$[a,b]$$:

$$
L = \int_a^b \sqrt{1+[f'(x)]^2}\,dx.
$$
:::

:::note
This is useful BC-level enrichment even when not emphasized heavily in every AP class.
:::

---

## Improper integrals

:::theorem{name="Improper integrals"}
An integral is improper if:

- an interval is infinite, or
- the integrand is unbounded.

Interpret through limits, for example:

$$
\int_1^\infty \frac{1}{x^2}\,dx
=
\lim_{b \to \infty} \int_1^b \frac{1}{x^2}\,dx.
$$
:::

---

## Common mistakes

:::warning
- Forgetting to split total distance when velocity changes sign.
- Using top-minus-bottom when the curves cross inside the interval without splitting.
- Using wrong radii in washer problems.
- Mixing shell and washer formulas without matching the slice geometry.
:::
