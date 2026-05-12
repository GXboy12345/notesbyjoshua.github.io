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
- There exists: $$\exists$$ (e.g. $$\exists x$$ such that …)
- For all: $$\forall$$
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
- In standard form, the line becomes $$Ax + By = C$$, where $$A, B, C \in \mathbb{Z}$$ and $$A \ge 0$$ (if $$A=0$$, the line is horizontal). The slope would then be $$-\frac{A}{B}$$, with the $$x$$-int being $$\frac{C}{A}$$ and the $$y$$-int being $$\frac{C}{B}$$.
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
2. Factor $$p(x)$$ as far as you can over $$\mathbb{R}$$ (usually these problems do not require solutions in the complex plane).
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

**Extension.** If a graph has both $$x$$-axis and $$y$$-axis symmetry, does it necessarily have origin symmetry? If a graph has origin symmetry, does it neccesarily have $$x$$-axis and $$y$$-axis symmmetry?

</div>

## Practice

Problems are meant to match this page only: coordinates and lines, solving equations, inequalities (including absolute value, polynomial, rational, and radical types), and symmetry. Use interval notation where appropriate.

### Rectangular coordinates and lines

1. Find the distance between $$(1,-3)$$ and $$(5,5)$$ and write the equation of the line that contain both points in slope-intercept form.
2. Find the equation of the line through $$(2,4)$$ that is perpendicular to $$3x - 4y = 12$$. Write your answer in point-slope form.
3. The taxicab distance between points $$(x_1, y_1)$$ and $$(x_2, y_2)$$ in the coordinate plane is given by $$\lvert x_1 - x_2 \rvert + \lvert y_1 - y_2 \rvert$$. For how many points $P$ with integer coordinates is the taxicab distance between $P$ and the origin less than or equal to $$20$$? (2022 AMC 12A).

### Linear, quadratic, and polynomial equations

4. Solve for $$x$$: $$\dfrac{2x-1}{3} - \dfrac{x+4}{2} = 1$$.
5. Solve for $$x$$: $$x^4 - 13x^2 + 36 = 0$$.
6. Simplify $$\sqrt{\frac{x^4}{256} + \frac{x^3}{32} + \frac{5x^2}{16} + x + 4 + 16x - 8\sqrt{4x-7} - 24 + 2(\frac{x^2}{16} + \frac{x}{4} + 2)(-2 + 2\sqrt{4x-7})}$$ (Hint: Use factor by grouping).
7. Suppose $$p(x) = 3x^2 + 5x + c$$ for some $$c \ne 0$$. If $$r_1$$ and $$r_2$$ are the roots of $$p(x) = 0$$, find the value of $$\frac{1}{r_1} + \frac{1}{r_2}$$ in terms of $$c$$.
8. Solve for $$x$$ and discard any extraneous solutions: $$\dfrac{1}{x-1} + \dfrac{2}{x^2-1} = \dfrac{3}{x+1}$$.
9. Solve for $$x$$ in $$\mathbb{R}$$: $$\lvert 2x - 5\rvert = \lvert x + 1\rvert$$.
10. Solve for $$x$$ in $$\mathbb{R}$$: $$9^{x} - 10\cdot 3^{x} + 9 = 0$$.
11. Solve for $$x$$ in $$\mathbb{R}$$ and check every candidate in the original equation: $$\sqrt{2x+3} + \sqrt{x+1} = 3$$.
12. Solve for $$x$$ in $$\mathbb{R}$$ and write the answer in interval notation: $$\dfrac{3x+1}{x-2} > 2$$.
13. Solve for $$x$$ in $$\mathbb{R}$$ and write the answer in interval notation: $$\lvert x - 2\rvert + \lvert x + 4\rvert \le 10$$.
14. Solve for $$x$$ in $$\mathbb{R}$$ and write the answer in interval notation: $$\lvert x^{2} - 9\rvert \le 5$$.
15. Solve for $$x$$: $$\frac{\lvert x - \lvert x \rvert \rvert}{x} > 0$$.
16. Solve in $$\mathbb{R}$$: $$(x-1)^{2}(x-4)(x+2) < 0$$. Explain how repeated roots change the sign chart compared with all simple roots.
17. Solve in $$\mathbb{R}$$: $$x^{3} - 5x^{2} + 6x \ge 0$$.
18. Solve in $$\mathbb{R}$$: $$\dfrac{x^{2} - 4}{x^{2} + x} \le 0$$. Give the domain, a single rational inequality of the form $$\dfrac{R(x)}{Q(x)} \le 0$$ with no common factors, and the solution in interval notation.
19. Solve in $$\mathbb{R}$$: $$\sqrt{4 - x^{2}} \ge x$$ (domain of the radical first, then split into $$x < 0$$ vs $$x \ge 0$$ before squaring where legal).
20. Solve in $$\mathbb{R}$$: $$\sqrt{x^{2} + 5} \le x + 2$$ (impose all conditions needed before and after squaring, then intersect with the domain).
21. For $$f(x) = \dfrac{x^{2}}{x^{2} + 1}$$, determine whether the graph has $$y$$-axis symmetry, $$x$$-axis symmetry, origin symmetry, or some combination (use the point tests from this page; note the domain is all $$\mathbb{R}$$).
22. For $$g(x) = x\lvert x\rvert$$, decide which symmetries the graph has and relate your answer to the fact that $$g(x) = x^{2}$$ when $$x \ge 0$$ and $$g(x) = -x^{2}$$ when $$x < 0$$.

## Solutions

### Solution 1

Use the distance formula:

$$
d=\sqrt{(5-1)^{2}+(5-(-3))^{2}}
=\sqrt{4^{2}+8^{2}}
=\sqrt{80}
=4\sqrt{5}.
$$

The slope of the line through $$(1,-3)$$ and $$(5,5)$$ is

$$
m=\frac{5-(-3)}{5-1}=\frac{8}{4}=2.
$$

Use $$y=mx+b$$ with point $$(1,-3)$$:

$$
-3=2(1)+b \quad\Longrightarrow\quad b=-5.
$$

So

$$
\boxed{d=4\sqrt{5}\quad\text{and}\quad y=2x-5}.
$$

### Solution 2

First find the slope of $$3x-4y=12$$:

$$
-4y=-3x+12
\quad\Longrightarrow\quad
y=\frac{3}{4}x-3.
$$

The slope is $$\frac{3}{4}$$, so a perpendicular line has slope $$-\frac{4}{3}$$. Through $$(2,4)$$, point-slope form is

$$
\boxed{y-4=-\frac{4}{3}(x-2)}.
$$

### Solution 3

We want integer points $$(x,y)$$ satisfying

$$
|x|+|y|\le 20.
$$

For distance $$0$$, there is only the origin: $$1$$ point.

For each distance $$r\ge 1$$, the equation $$|x|+|y|=r$$ has $$4r$$ integer points. Therefore the total number of points is

$$
1+\sum_{r=1}^{20}4r
=1+4\left(\frac{20\cdot 21}{2}\right)
=1+840
=841.
$$

So the answer is

$$
\boxed{841}.
$$

### Solution 4

Clear denominators by multiplying both sides by $$6$$:

$$
6\left(\frac{2x-1}{3}\right)-6\left(\frac{x+4}{2}\right)=6(1).
$$

Then

$$
2(2x-1)-3(x+4)=6.
$$

Simplify:

$$
4x-2-3x-12=6
\quad\Longrightarrow\quad
x-14=6
\quad\Longrightarrow\quad
x=20.
$$

Thus

$$
\boxed{x=20}.
$$

### Solution 5

Let $$u=x^{2}$$. Then

$$
x^{4}-13x^{2}+36=0
$$

becomes

$$
u^{2}-13u+36=0.
$$

Factor:

$$
(u-9)(u-4)=0.
$$

So $$u=9$$ or $$u=4$$. Since $$u=x^{2}$$,

$$
x^{2}=9 \quad\text{or}\quad x^{2}=4.
$$

Therefore

$$
\boxed{x=-3,-2,2,3}.
$$

### Solution 6

Let

$$
A=\frac{x^{2}}{16}+\frac{x}{4}+2
\qquad\text{and}\qquad
B=-2+2\sqrt{4x-7}.
$$

The first five terms under the square root are exactly $$A^{2}$$:

$$
\left(\frac{x^{2}}{16}+\frac{x}{4}+2\right)^{2}
=\frac{x^{4}}{256}+\frac{x^{3}}{32}+\frac{5x^{2}}{16}+x+4.
$$

The next three terms are exactly $$B^{2}$$:

$$
\left(-2+2\sqrt{4x-7}\right)^{2}
=16x-8\sqrt{4x-7}-24.
$$

The remaining term is $$2AB$$. Therefore the expression under the square root is

$$
A^{2}+B^{2}+2AB=(A+B)^{2}.
$$

So the original expression is

$$
\sqrt{(A+B)^{2}}=|A+B|.
$$

Now simplify $$A+B$$:

$$
A+B
=\frac{x^{2}}{16}+\frac{x}{4}+2+\left(-2+2\sqrt{4x-7}\right)
=\frac{x^{2}}{16}+\frac{x}{4}+2\sqrt{4x-7}.
$$

The domain requires $$4x-7\ge 0$$, so $$x\ge \frac{7}{4}$$. On this domain, $$A+B\ge 0$$, so the absolute value can be removed:

$$
\boxed{\frac{x^{2}}{16}+\frac{x}{4}+2\sqrt{4x-7}}.
$$

### Solution 7

For

$$
p(x)=3x^{2}+5x+c,
$$

we have $$a=3$$, $$b=5$$, and constant term $$c$$. By Vieta's formulas,

$$
r_{1}+r_{2}=-\frac{5}{3}
\qquad\text{and}\qquad
r_{1}r_{2}=\frac{c}{3}.
$$

Since $$c\ne 0$$, the product $$r_{1}r_{2}$$ is not $$0$$, so the reciprocal expression is defined. Then

$$
\frac{1}{r_{1}}+\frac{1}{r_{2}}
=\frac{r_{1}+r_{2}}{r_{1}r_{2}}
=\frac{-5/3}{c/3}
=-\frac{5}{c}.
$$

Thus

$$
\boxed{-\frac{5}{c}}.
$$

### Solution 8

The denominators show that $$x\ne 1$$ and $$x\ne -1$$. Start with

$$
\frac{1}{x-1}+\frac{2}{x^{2}-1}=\frac{3}{x+1}.
$$

Factor $$x^{2}-1=(x-1)(x+1)$$ and multiply both sides by $$(x-1)(x+1)$$:

$$
x+1+2=3(x-1).
$$

Solve:

$$
x+3=3x-3
\quad\Longrightarrow\quad
6=2x
\quad\Longrightarrow\quad
x=3.
$$

Since $$3$$ is allowed in the original equation,

$$
\boxed{x=3}.
$$

### Solution 9

Solve

$$
|2x-5|=|x+1|.
$$

Since equal absolute values have equal squares,

$$
(2x-5)^{2}=(x+1)^{2}.
$$

Expand and solve:

$$
4x^{2}-20x+25=x^{2}+2x+1
$$

$$
3x^{2}-22x+24=0.
$$

Factor:

$$
(3x-4)(x-6)=0.
$$

Thus

$$
\boxed{x=\frac{4}{3},\,6}.
$$

### Solution 10

Let

$$
u=3^{x}.
$$

Then $$9^{x}=(3^{2})^{x}=3^{2x}=(3^{x})^{2}=u^{2}$$. The equation becomes

$$
u^{2}-10u+9=0.
$$

Factor:

$$
(u-1)(u-9)=0.
$$

So $$u=1$$ or $$u=9$$. Returning to $$u=3^{x}$$:

$$
3^{x}=1 \quad\Longrightarrow\quad x=0,
$$

or

$$
3^{x}=9 \quad\Longrightarrow\quad x=2.
$$

Therefore

$$
\boxed{x=0,\,2}.
$$

### Solution 11

The domain requires

$$
2x+3\ge 0
\qquad\text{and}\qquad
x+1\ge 0,
$$

so $$x\ge -1$$. Start with

$$
\sqrt{2x+3}+\sqrt{x+1}=3.
$$

Isolate one radical:

$$
\sqrt{2x+3}=3-\sqrt{x+1}.
$$

Square both sides:

$$
2x+3=9-6\sqrt{x+1}+x+1.
$$

Simplify:

$$
x-7=-6\sqrt{x+1}.
$$

Multiply by $$-1$$:

$$
7-x=6\sqrt{x+1}.
$$

Square again:

$$
(7-x)^{2}=36(x+1).
$$

Expand and solve:

$$
x^{2}-14x+49=36x+36
$$

$$
x^{2}-50x+13=0.
$$

Use the quadratic formula:

$$
x=\frac{50\pm\sqrt{2500-52}}{2}
=\frac{50\pm\sqrt{2448}}{2}
=\frac{50\pm 12\sqrt{17}}{2}
=25\pm 6\sqrt{17}.
$$

Check candidates. The value $$25+6\sqrt{17}$$ does not work because it makes $$7-x$$ negative in the step $$7-x=6\sqrt{x+1}$$. The value $$25-6\sqrt{17}$$ checks in the original equation. Therefore

$$
\boxed{x=25-6\sqrt{17}}.
$$

### Solution 12

Start by moving everything to one side:

$$
\frac{3x+1}{x-2}>2
\quad\Longrightarrow\quad
\frac{3x+1}{x-2}-2>0.
$$

Combine into one rational expression:

$$
\frac{3x+1-2(x-2)}{x-2}>0.
$$

Simplify:

$$
\frac{x+5}{x-2}>0.
$$

Critical values are $$x=-5$$ and $$x=2$$. The denominator also shows $$x\ne 2$$. A sign chart gives positive values on $$(-\infty,-5)$$ and $$(2,\infty)$$. Since the inequality is strict, $$x=-5$$ is not included.

Thus

$$
\boxed{(-\infty,-5)\cup(2,\infty)}.
$$

### Solution 13

The expression

$$
|x-2|+|x+4|
$$

is the sum of the distances from $$x$$ to $$2$$ and from $$x$$ to $$-4$$. Break at $$x=-4$$ and $$x=2$$.

If $$x<-4$$, then

$$
|x-2|+|x+4|=-(x-2)-(x+4)=-2x-2.
$$

So

$$
-2x-2\le 10
\quad\Longrightarrow\quad
x\ge -6.
$$

This gives $$[-6,-4)$$.

If $$-4\le x\le 2$$, then

$$
|x-2|+|x+4|=(2-x)+(x+4)=6,
$$

which is always at most $$10$$. This gives $$[-4,2]$$.

If $$x>2$$, then

$$
|x-2|+|x+4|=(x-2)+(x+4)=2x+2.
$$

So

$$
2x+2\le 10
\quad\Longrightarrow\quad
x\le 4.
$$

This gives $$(2,4]$$. Combining all pieces,

$$
\boxed{[-6,4]}.
$$

### Solution 14

Start with

$$
|x^{2}-9|\le 5.
$$

Rewrite as a compound inequality:

$$
-5\le x^{2}-9\le 5.
$$

Add $$9$$ to all three parts:

$$
4\le x^{2}\le 14.
$$

Thus $$x^{2}$$ must be at least $$4$$ and at most $$14$$. Therefore

$$
\boxed{[-\sqrt{14},-2]\cup[2,\sqrt{14}]}.
$$

### Solution 15

The expression is

$$
\frac{|x-|x||}{x}>0.
$$

The denominator shows $$x\ne 0$$.

If $$x>0$$, then $$|x|=x$$, so

$$
\frac{|x-|x||}{x}=\frac{|x-x|}{x}=\frac{0}{x}=0,
$$

which is not greater than $$0$$.

If $$x<0$$, then $$|x|=-x$$, so

$$
\frac{|x-|x||}{x}
=\frac{|x-(-x)|}{x}
=\frac{|2x|}{x}.
$$

Since $$x<0$$, $$|2x|=-2x$$. Thus

$$
\frac{|2x|}{x}=\frac{-2x}{x}=-2,
$$

which is also not greater than $$0$$. Therefore there are no real solutions:

$$
\boxed{\emptyset}.
$$

### Solution 16

The inequality is already factored:

$$
(x-1)^{2}(x-4)(x+2)<0.
$$

The critical values are

$$
x=-2,\quad x=1,\quad x=4.
$$

The root $$x=1$$ has even multiplicity because of $$(x-1)^{2}$$. That means the sign does not change when crossing $$x=1$$. Simple roots, like $$x=-2$$ and $$x=4$$, do change the sign.

Using a sign chart:

- The expression is positive on $$(-\infty,-2)$$.
- It is negative on $$(-2,1)$$.
- It stays negative on $$(1,4)$$ because $$x=1$$ is a repeated root.
- It is positive on $$(4,\infty)$$.

Because the inequality is strict, none of the zeros are included. Thus

$$
\boxed{(-2,1)\cup(1,4)}.
$$

### Solution 17

Factor:

$$
x^{3}-5x^{2}+6x=x(x^{2}-5x+6)=x(x-2)(x-3).
$$

Solve

$$
x(x-2)(x-3)\ge 0.
$$

The critical values are $$0$$, $$2$$, and $$3$$. A sign chart gives:

- negative on $$(-\infty,0)$$,
- positive on $$(0,2)$$,
- negative on $$(2,3)$$,
- positive on $$(3,\infty)$$.

Since the inequality is $$\ge 0$$, include the zeros. Therefore

$$
\boxed{[0,2]\cup[3,\infty)}.
$$

### Solution 18

The domain comes from the denominator:

$$
x^{2}+x=x(x+1)\ne 0.
$$

So

$$
x\ne 0,\qquad x\ne -1.
$$

Factor the rational expression:

$$
\frac{x^{2}-4}{x^{2}+x}
=\frac{(x-2)(x+2)}{x(x+1)}.
$$

There are no common factors, so the rational inequality is

$$
\frac{(x-2)(x+2)}{x(x+1)}\le 0.
$$

The critical values are $$-2,-1,0,2$$. Remember that $$-1$$ and $$0$$ cannot be included because they make the denominator zero. A sign chart gives nonpositive values on

$$
[-2,-1)\quad\text{and}\quad(0,2].
$$

Thus

$$
\boxed{\text{domain: } x\ne -1,0;\quad \frac{(x-2)(x+2)}{x(x+1)}\le 0;\quad [-2,-1)\cup(0,2]}.
$$

### Solution 19

First find the domain:

$$
4-x^{2}\ge 0
\quad\Longrightarrow\quad
-2\le x\le 2.
$$

Now solve

$$
\sqrt{4-x^{2}}\ge x.
$$

If $$x<0$$, the right side is negative and the left side is nonnegative, so the inequality is automatically true on the domain. This gives

$$
[-2,0).
$$

If $$x\ge 0$$, both sides are nonnegative, so we can square both sides:

$$
4-x^{2}\ge x^{2}.
$$

Then

$$
4\ge 2x^{2}
\quad\Longrightarrow\quad
x^{2}\le 2.
$$

With $$x\ge 0$$, this gives

$$
0\le x\le \sqrt{2}.
$$

Combining both cases,

$$
\boxed{[-2,\sqrt{2}]}.
$$

### Solution 20

The radical is always defined because

$$
x^{2}+5>0
$$

for all real $$x$$. But since

$$
\sqrt{x^{2}+5}\ge 0,
$$

we also need the right side to be nonnegative:

$$
x+2\ge 0
\quad\Longrightarrow\quad
x\ge -2.
$$

Now square both sides:

$$
x^{2}+5\le (x+2)^{2}.
$$

Expand:

$$
x^{2}+5\le x^{2}+4x+4.
$$

Cancel $$x^{2}$$:

$$
5\le 4x+4
\quad\Longrightarrow\quad
1\le 4x
\quad\Longrightarrow\quad
x\ge \frac{1}{4}.
$$

This already satisfies $$x\ge -2$$, so

$$
\boxed{\left[\frac{1}{4},\infty\right)}.
$$

### Solution 21

For

$$
f(x)=\frac{x^{2}}{x^{2}+1},
$$

test $$f(-x)$$:

$$
f(-x)=\frac{(-x)^{2}}{(-x)^{2}+1}
=\frac{x^{2}}{x^{2}+1}
=f(x).
$$

Since $$f(-x)=f(x)$$, the graph has $$y$$-axis symmetry.

It does not have $$x$$-axis symmetry because reflecting a point $$(x,y)$$ to $$(x,-y)$$ would usually not stay on the graph of the same function. It does not have origin symmetry because origin symmetry would require $$f(-x)=-f(x)$$, but here $$f(-x)=f(x)$$.

Thus

$$
\boxed{\text{the graph has } y\text{-axis symmetry only}}.
$$

### Solution 22

For

$$
g(x)=x|x|,
$$

test $$g(-x)$$:

$$
g(-x)=(-x)|-x|=-x|x|=-g(x).
$$

Since $$g(-x)=-g(x)$$, the graph has origin symmetry.

This also matches the piecewise description:

$$
g(x)=x^{2}\quad\text{when }x\ge 0,
$$

and

$$
g(x)=-x^{2}\quad\text{when }x<0.
$$

The right side of the graph is the upper half of a parabola, and the left side is the lower half after a $$180^\circ$$ rotation around the origin.

It does not have $$y$$-axis symmetry because $$g(-x)\ne g(x)$$ in general. It does not have $$x$$-axis symmetry because reflecting a nonzero function value across the $$x$$-axis would not stay on the graph.

Therefore

$$
\boxed{\text{the graph has origin symmetry only}}.
$$
