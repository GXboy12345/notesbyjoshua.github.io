---
layout: default
title: "Unit 1 & 2: Fundamentals, Equations, and Inequalities"
parent: AP Precalculus
nav_order: 1
permalink: /notes/ap/precalc/fundeqineq/
---

# Unit 1 & 2: Fundamentals, Equations, and Inequalities

## Definitions

In Precalculus (**ADD EXAMPLES TO THIS PAGE!**) and beyond, we often use symbols to denote certain sets of numbers

- Union/OR: $$\cup$$
- Intersection/AND: $$\cap$$
- There exists: $$\exists$$ (e.g. $$\exists x$$ such that …); for all: $$\forall$$
- Set A excluding B: $$A \setminus B $$
- x in Set A: $$x \in A$$
- Natural numbers: $$\mathbb{N} = {1, 2, 3, \ldots}$$ (including $$0$$ creates the whole numbers)
- Integers: $$\mathbb{Z} = {x \mid x \in \mathbb{N}, -x \in \mathbb{N}, x=0}$$
- Rationals: $$\mathbb{Q} = {x = \frac{a}{b} \mid a, b \in \mathbb{Z}, b \ne 0}$$
- Real numbers: $$\mathbb{R}$$ = Any number on the number line
- Complex numbers: $$\mathbb{C} = {a + bi \mid a, b \in \mathbb{R}, i = \sqrt{-1}}$$

---

## Rectangular Coordinates

To graph functions and to do any analytical algebra, we need to define a coordinate system, where we can set things as points on a graph. One common method is rectangular (Cartesian) coordinates, although we will learn about more coordinate systems in the future.

The Cartesian plane is divided into four quadrants, starting with Quadrant I at the top right one and going counter-clockwise. The distance between two points is defined by the distance formula:

$$
d(A,B) = \sqrt{(x_A^{2} - x_B^{2}) + (y_A^{2} - y_B^{2})}
$$

You can think of the distance as the hypotenuse of a triangle made of the difference of the two $$x-$$ and $$y-$$ coordinates of the two points.

### Graphing lines

- Define $$m$$ as the slope of the line, which is $$m=\frac{rise}{run}=\frac{\Delta y}{\Delta x}$$.
- In slope-intercept form, the line can be defined as $$y=mx+b$$.
- In point-slope form, the line can be defined as $$y-y_1 = m(x-x_1)$$ with ($$x_1$$, $$y_1$$) being a point on the line.
- In standard form, the line becomes $$Ax + By = C$$, where $$A, B, C \in \mathbb{Z}$$ and $$A \ge 0$$ (if $$A=0$$, the line is horizontal). The slope would then be $$-\frac{A}{B}$$, with the $$x$$-int being $$\frac{C}{A}$$ and the $$y$$-int being $${C}\{B}$$.
- If two lines are perpendicular, the respective slopes are negative reciprocals of each other ($$m_1 = -\frac{1}{m_2}$$), and if two lines are parallel, they have the same slope ($$m_1 = m_2$$).
- To draw absolute value graphs, draw each section individually by getting rid of the absolute value sign and solving each section individually. Make sure to keep track of domain.

## Solving Equations

### Linear equations

Linear equations come in the form of $$y = mx + b$$, where $$m$$ is the "slope" of the line. To solve, you just isolate one variable and solve.

---

### Quadratic equations

A quadratic has the shape $$ax^2 + bx + c = 0$$ with $$a \ne 0$$.

- Factoring: write $$ax^2+bx+c$$ as a product of linear factors, then use zero-product property: if $$AB=0$$, then $$A=0$$ or $$B=0$$. NEVER DIVIDE BY A VARIABLE AS THIS WILL LOSE A SOLUTION!
- Completing the square: rearrange the quadratic to $$(x-h)^2 = k$$, then $$x = h \pm \sqrt{k}$$ (watch sign of $$k$$ in $$\mathbb{R}$$).
- Vieta's formula: Given a quadratic has two (not necessarily distinct or real) roots $$x_1$$ and $$x_2$$, $$x_1 + x_2 = -\frac{b}{a}$$ and $$x_1 x_2 = \frac{c}{a}$$
- Quadratic formula:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

The discriminant $$\Delta = b^2 - 4ac$$ tells you how many real roots there are: $$\Delta > 0$$ two distinct; $$\Delta = 0$$ one repeated; $$\Delta < 0$$ two nonreal complex conjugates.

<div class="theorem-box" markdown="1">

**Proof (Quadratic formula).** Let the quadratic be in the form of

$$
ax^2 + bx + c = 0
$$,

or equivalently:

$$
x^2 + \frac{b}{a} x + \frac{c}{a} = 0
$$.

Completing the square, we get

$$
(x + \frac{b}{2a})^2 - \frac{b^2}{4a^2} + \frac{c}{a} = 0
$$

$$
(x+\frac{b}{2a})^2 = \frac{b^2}{4a^2} - \frac{c}{a} = \frac{b^2 - 4ac}{4a^2}
$$

Taking the square root of both sides and rearranging gives the desired formula:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

</div>

---

### Rational equations

Equation with $$x$$ in denominators (e.g. $$\frac{1}{y} + 1 = \frac{3}{y} - \frac{1}{2y}$$).

- ALWAYS check for domain and range restrictions first!
- Strategy: multiply both sides by the least common denominator to clear fractions, then solve the resulting polynomial equation.
- Extraneous solutions: multiplying can enlarge the domain, so always substitute candidates back into the original equation or exclude values where any denominator was $$0$$.

---

### Polynomial equations

- Polynomial equations are equations with only powers of x and real coefficients ($$y = a_0 x^n + a_1 x^(n-1) + ... + a_(n-1) x + a_n$$). Always push everything to one side if it isn't already!
- Factor if you can (GCF, grouping, recognizable patterns, etc.). Most precalculus problems can be solved by factoring somehow.
- Substitution: e.g. $$x^4 - 5x^2 + 4 = 0$$ → let $$u = x^2$$, solve for $$u$$ and then solve for $$x$$. Make sure ALWAYS keep track of domains when you do this!
- Higher degree: Rational Root Theorem suggests candidates for integer-coefficient polynomials; synthetic division / polynomial division lowers degree after you find a root (more in [Unit 4 & 13]({{ '/notes/ap/precalc/polyratopt/' | relative_url }})).

---

### Absolute value equations

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

If $$a = 0$$, $$\lvert u\rvert = 0$$ means $$u = 0$$. If $$a < 0$$, $$\lvert u\rvert = a$$ has no solution in $$\mathbb{R}$$.

---

### Exponential equations

- Same base: if $$a^m = a^n$$ (with $$a>0$$, $$a \ne 1$$), then $$m = n$$.
- Different bases (e.g. $$2^{x-3} = 8^{x^2}$$): take logs after isolating the exponential (or use logarithm laws on $$a^{f(x)}$$), and then solve. Always watch domain: bases must be positive where logs are used, avoid dividing by expressions that can be $$0$$.

---

### Fractional exponents

- Rewrite $$x^{p/q}$$ using radicals: $$x^{p/q} = \sqrt[q]{x^p}$$ (or $$(\sqrt[q]{x})^p$$ when convenient).
- Even roots require nonnegative radicands in $$\mathbb{R}$$ (unless you switch to $$\mathbb{C}$$). Odd roots are defined for all real $$x$$. Always keep track of domain when doing problems to avoid extraneous solutions.
- Raise both sides to a power to clear fractional exponents when safe: still check domain and plug back when both sides were raised to an even power (same extraneous-root issue as squaring).

---

### Radical equations

- Isolate one radical, then square both sides (or raise to the $$n$$th power for $$\sqrt[n]{\phantom{x}}$$), and repeat if needed until no radicals remain. Squaring can introduce extraneous solutions, so check every candidate in the original equation. Also enforce domain: even-index radicals need nonnegative insides in $$\mathbb{R}$$.
- If there is more than one radical, deal with them one at a time.

---

## Inequalities

### Inequality basics

- When multiplying an inequality by a negative number, flip the inequality sign (e.g. $$-x > 5$$ becomes $$x < -5$$). Multiplying or dividing by a positive number does not flip the sign.
- Compound inequalities: $$\cap$$ means take the intersection of solution sets (overlap on a number line). If there is no overlap, the solution is empty ($$\emptyset$$). $$\cup$$ means take the union (everything that satisfies at least one part). If two “or” rays point away from each other on a line, the union can be all of $$\mathbb{R}$$ except possibly a gap in the middle—always sketch it.
- Interval notation: square brackets $$[\,,\,]$$ include endpoints; parentheses $$(\,,\,)$$ exclude endpoints. Infinity is always written with a parenthesis: $$(-\infty,\,2]$$, not $$[-\infty,2]$$.

---

### Absolute value inequalities

Absolute value inequalities follow the same distance idea as equations: $$\lvert u\rvert$$ measures size of $$u$$ from $$0$$. For $$a > 0$$:

$$
\lvert u\rvert < a \quad \Longleftrightarrow \quad -a < u < a
$$

$$
\lvert u\rvert \le a \quad \Longleftrightarrow \quad -a \le u \le a
$$

$$
\lvert u\rvert > a \quad \Longleftrightarrow \quad u < -a \ \text{ or }\ u > a
$$

$$
\lvert u\rvert \ge a \quad \Longleftrightarrow \quad u \le -a \ \text{ or }\ u \ge a
$$

If $$a \le 0$$: $$\lvert u\rvert < a$$ and $$\lvert u\rvert \le a$$ have no solution in $$\mathbb{R}$$; $$\lvert u\rvert > a$$ and $$\lvert u\rvert \ge a$$ reduce to “$$u \ne 0$$” or all $$\mathbb{R}$$ depending on $$a$$—check case by case.

Strategy: isolate $$\lvert \cdots\rvert$$ first, then rewrite without absolute value. For inequalities like $$\lvert x - h\rvert < a$$, the solution is an interval centered at $$h$$; for $$\lvert x - h\rvert > a$$, you get two rays (unless empty). Make sure to always check for extraneous solutions by plugging in a value from each of your components of your solution!

**ADD EXAMPLE**

---

### Polynomial inequalities

Polynomials take form of $$p(x) > 0$$ with $$p$$ a polynomial.

1. Move everything to one side (if it isn't already): $$p(x) > 0$$.
2. Factor $$p(x)$$ as far as you can over $$\mathbb{R$$ (usually these problems do not require solutions in the complex plane).
3. Mark zeros on a number line; they partition $$\mathbb{R}$$ into intervals.
4. End behavior: the sign of $$p(x)$$ as $$x \to \pm\infty$$ follows the leading term (eventually the highest-degree term dominates).
5. Move left to right across zeros: each simple real root (multiplicity $$1$$) flips the sign; a root of even multiplicity touches the axis but does not flip sign (the factor stays nonnegative or nonpositive on both sides locally).
6. Color in your desired region. Remember if the sign is inclusive, zero points will always count even if it wouldn't lie within a colored region!

Sketch the graph mentally if it helps: you want where the graph is strictly above ($$> 0$$) or below ($$< 0$$) the $$x$$-axis, respecting open vs closed when using $$\ge$$ or $$\le$$ at zeros.

**ADD EXAMPLE**

---

### Rational inequalities

Typical form: $$\dfrac{P(x)}{Q(x)} > 0$$, $$\ge 0$$, $$< 0$$, or $$\le 0$$ (strict vs non-strict matters at zeros of the denominator).

Standard method (sign chart / test points)

1. Move everything to one side so the inequality is compare to 0 (e.g. $$\dfrac{R(x)}{Q(x)} \ge 0$$). Do NOT multiply the denominator!
2. Factor numerator and denominator completely over $$\mathbb{R}$$ (linear and irreducible quadratic factors). To take the denominator out of the rational expression, multiply by an even power of a factored form of the denominator.
3. Do the steps you would do for a polynomial inequalities, but keep in mind the domain restrictions (the denominator cannot be $$0$$).

**ADD EXAMPLES**

---

### Radical inequalities

Example: $$\sqrt{f(x)} < g(x)$$.

1. Always check the domain first: require $$f(x) \ge 0$$ wherever the radical is real (even index). Odd roots have fewer domain restrictions but still need consistent definitions.
2. Get rid of all the roots by following the steps you would as if you are simplyfing a radical equation. Beware that if you take an even power, it is not always reversible because $$a < b$$ does not imply $$a^2 < b^2$$ without knowing signs. Common safe patterns:
- If both sides are known nonnegative on the domain (e.g. $$\sqrt{f(x)} \le g(x)$$ after you require $$g(x) \ge 0$$), then squaring preserves order: $$\sqrt{f(x)} \le g(x)$$ is equivalent to $$f(x) \le g(x)^2$$ together with $$g(x) \ge 0$$ and $$f(x) \ge 0$$.
- For $$\sqrt{f(x)} > g(x)$$, split cases: where $$g(x) < 0$$, the inequality often holds automatically on the domain of the radical (since LHS $$\ge 0$$); where $$g(x) \ge 0$$, square to get $$f(x) > g(x)^2$$ and intersect with those conditions.
- Quick check: If you have an even-powered radical that is less than $$0$$, there can't be any solutions!
3. Follow the process as you would for a polynomial inequality and check for domain restrictions. Always check to see if your solutions make sense!

## Symmetry

Symmetry occurs when you flip along an axis of symmetry and mpa one half of a shape to another.

### Symmetry about the axes

- $$x$$-axis symmetry: Graphs from $$QI$$ and $$QII$$ would get flipped over the $$x$$-axis to $$QIV$$ and $$QIII$$, respectively, and vice versa. If point $$(x,y)$$ sastisfies the equation and $$(x,-y)$$ also sastisfies the equation for all points $$(x,y)$$ on the graph, then the graph have $$x$$-axis symmetry.
- $$y$$-axis symmetry: Graphs from $$QI$$ and $$QIV$$ would get flipped over the $$y$$-axis to $$QII$$ and $$QIII$$, respectively, and vice versa. If point $$(x,y)$$ sastisfies the equation and $$(-x,y)$$ also sastisfies the equation for all points $$(x,y)$$ on the graph, then the graph have $$y$$-axis symmetry.
- Origin symmetry: Graphs from $$QI$$ and $$QII$$ would get flipped over the $$y$$-axis to $$QIII$$ and $$QIV$$, respectively, and vice versa. If point $$(x,y)$$ sastisfies the equation and $$(-x,-y)$$ also sastisfies the equation for all points $$(x,y)$$ on the graph, then the graph have origin symmetry.

<div class="theorem-box" markdown="1">

**Extension.** If a graph has both $$x$$-axis and $$y$$-axis symmetry, does it necessarily have origin symmetry? If a graph has origin symmetry, does it neccesarily have $$x$$-axis and $$y-axis$$ symmmetry?

</div>

## Practice

1. Hah you thought!
