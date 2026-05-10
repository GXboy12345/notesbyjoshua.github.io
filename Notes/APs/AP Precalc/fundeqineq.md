---
layout: default
title: "Unit 1 & 2: Fundamentals, Equations, and Inequalities"
parent: AP Precalculus
nav_order: 1
permalink: /notes/ap/precalc/fundeqineq/
---

# Unit 1 & 2: Fundamentals, Equations, and Inequalities

## Definitions

In Precalculus and beyond, we often use symbols to denote certain sets of numbers

- $$\cup = Union$$
- $$\cap = Intersection$$
- $$A \setminus B = Set A without B$$
- $$x \in A = x in Set A$$
- $$\mathbb{N} = Natural numbers = {1, 2, 3, \ldots}$$ (including $$0$$ creates the whole numbers)
- $$\mathbb{Z} = Integers = {x | x \in \mathbb{N}, -x \in \mathbb{N}, x=0}$$
- $$\mathbb{Q} = Rationals = {x = \frac{a}{b} | a, b \in \mathbb{Z}, b \ne 0}$$
- $$\mathbb{R} = Real numbers = Any number on the number line$$
- $$\mathbb{C} = Complex numbers = {a + bi | a, b \in R, i = \sqrt{-1}}$$

## Solving Equations

## Solving Equations

### Linear equations

Linear equations come in the form of $$y = mx + b$$, where $$m$$ is the "slope" of the line. To solve, you just isolate one variable and solve.

### Quadratic equations

A quadratic has the shape $$ax^2 + bx + c = 0$$ with $$a \ne 0$$.

- Factoring: write $$ax^2+bx+c$$ as a product of linear factors, then use zero-product property: if $$AB=0$$, then $$A=0$$ or $$B=0$$. NEVER DIVIDE BY A VARIABLE AS THIS WILL LOSE A SOLUTION!
- Completing the square: rearrange the quadratic to $$(x-h)^2 = k$$, then $$x = h \pm \sqrt{k}$$ (watch sign of $$k$$ in $$\mathbb{R}$$).
- Vieta's formula: Given a quadratic has two (not necessarily distinct or real) roots $$x_1$$ and $$x_2$$, $$x_1 + x_2 = -\frac{b}{a}$$ and $$x_1 x_2 = \frac{c}{a}$$
- Quadratic formula:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

The discriminant $$\Delta = b^2 - 4ac$$ tells you how many real roots there are: $$\Delta > 0$$ two distinct; $$\Delta = 0$$ one repeated; $$\Delta < 0$$ two nonreal complex conjugates. **ADD PROOF OF QUAD FORMULA**

### Rational equations

Equation with $$x$$ in denominators (e.g. \frac{1}{y} + 1 = \frac{3}{y} - \frac{1}{2y}).

- ALWAYS check for domain and range restrictions first!
- Strategy: multiply both sides by the least common denominator to clear fractions, then solve the resulting polynomial equation.
- Extraneous solutions: multiplying can enlarge the domain (you might introduce values that make an original denominator $$0$$). Always substitute candidates back into the original equation or exclude values where any denominator was $$0$$.

### Polynomial equations

- Polynomial equations are equations with only powers of x and real coefficients ($$y = a_0 x^n + a_1 x^(n-1) + ... + a_(n-1) x + a_n). Always push everything to one side if it isn't already!
- Factor if you can (GCF, grouping, recognizable patterns, etc.). Most precalculus problems can be solved by factoring somehow.
- Substitution: e.g. $$x^4 - 5x^2 + 4 = 0$$ → let $$u = x^2$$, solve for $$u$$ and then solve for $$x$$. Make sure ALWAYS keep track of domains when you do this!
- Higher degree: Rational Root Theorem suggests candidates for integer-coefficient polynomials; synthetic division / polynomial division lowers degree after you find a root (more in [Unit 4 & 13]({{ '/notes/ap/precalc/polyratopt/' | relative_url }})).

### Absolute value

Geometrically, $$\lvert x - h\rvert$$ is distance from $$x$$ to $$h$$ on the number line.

For $$a > 0$$:

$$
\lvert u\rvert = a \quad \Longrightarrow \quad u = a \ \text{ or }\ u = -a
$$

$$
\lvert u\rvert < a \quad \Longrightarrow \quad -a < u < a
$$

$$
\lvert u\rvert > a \quad \Longrightarrow \quad u < -a \ \text{ or }\ u > a
$$

If $$a = 0$$, $$\lvert u\rvert = 0$$ means $$u = 0$$. If $$a < 0$$, $$\lvert u\rvert = a$$ has **no solution** in $$\mathbb{R}$$.

### Exponential equations

Same base: if $$a^m = a^n$$ (with $$a>0$$, $$a \ne 1$$), then $$m = n$$.

Different bases: take logs after isolating the exponential (or use logarithm laws on $$a^{f(x)}$$).

Watch **domain**: bases must be positive where logs are used; avoid dividing by expressions that can be $$0$$.

### Fractional exponents

Rewrite $$x^{p/q}$$ using radicals: $$x^{p/q} = \sqrt[q]{x^p}$$ (or $$(\sqrt[q]{x})^p$$ when convenient).

**Even roots** require nonnegative radicands in $$\mathbb{R}$$ (unless you switch to $$\mathbb{C}$$). **Odd roots** are defined for all real $$x$$.

Raise both sides to a power to clear fractional exponents when safe—still **check domain** and plug back when both sides were raised to an **even** power (same extraneous-root issue as squaring).

### Radical equations

Isolate one radical, then **square both sides** (or raise to the $$n$$th power for $$\sqrt[n]{\phantom{x}}$$). Repeat if needed until no radicals remain.

**Squaring can introduce extraneous solutions**, so **check every candidate** in the **original** equation. Also enforce **domain**: even-index radicals need nonnegative insides in $$\mathbb{R}$$.
