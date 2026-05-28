---
layout: default
title: "Unit 1 & 2: Fundamentals, Equations, and Inequalities"
parent: AP Precalculus
nav_order: 1
permalink: /notes/ap/precalc/fundeqineq/
---

# Unit 1 & 2: Fundamentals, Equations, and Inequalities

:::summary{title="Unit overview"}
This unit covers number sets, coordinate geometry, equation-solving (linear through radical), inequalities, and symmetry— the algebraic foundation for the rest of AP Precalculus.
:::

## Definitions

Before we solve anything, we need a shared language for the kinds of numbers that can show up. These sets are nested: every natural number is an integer, every integer is rational, and every rational number is real.

- **Natural numbers**: $$\mathbb{N}=\{1,2,3,\ldots\}$$. These are the counting numbers.
- **Whole numbers**: $$\{0,1,2,3,\ldots\}$$. This is the natural numbers plus $$0$$.
- **Integers**: $$\mathbb{Z}=\{\ldots,-3,-2,-1,0,1,2,3,\ldots\}$$.
- **Rational numbers**: $$\mathbb{Q}=\left\{\frac{p}{q}\mid p,q\in\mathbb{Z},\ q\ne 0\right\}$$. These are numbers that can be written as fractions of integers.
- **Irrational numbers**: real numbers that are not rational, such as $$\pi$$, $$e$$, and $$\sqrt{2}$$.
- **Real numbers**: $$\mathbb{R}$$. These are all numbers on the number line.
- **Complex numbers**: $$\mathbb{C}=\{a+bi\mid a,b\in\mathbb{R},\ i=\sqrt{-1}\}$$.

Decimal form is often a good way to tell rational and irrational numbers apart. Rational decimals either terminate, like $$\frac{1}{2}=0.5$$, or repeat, like $$\frac{1}{3}=0.333\ldots$$. Irrational decimals do not terminate and do not repeat.

We also use set notation to describe groups of numbers:

- $$x\in A$$ means "$$x$$ is in set $$A$$."
- $$A\cup B$$ means "$$A$$ or $$B$$" (the **union**).
- $$A\cap B$$ means "$$A$$ and $$B$$" (the **intersection**).
- $$A\setminus B$$ means "in $$A$$ but not in $$B$$."
- $$\exists$$ means "there exists."
- $$\forall$$ means "for all."

**Interval notation** is another way to describe parts of the number line. Parentheses mean an endpoint is *not* included; brackets mean it is included:

$$
(3,5)=\{x\mid 3<x<5\},\qquad [3,5]=\{x\mid 3\le x\le 5\}.
$$

Infinity is never included, so it always uses a parenthesis:

$$
(-\infty,4]\quad\text{or}\quad (2,\infty).
$$

---

## Rectangular Coordinates

The **rectangular (Cartesian) coordinate plane** lets us turn algebra into geometry. A point $$(x,y)$$ records two movements: horizontal movement first, then vertical movement. The plane is divided into four quadrants, starting with Quadrant I in the upper right and moving counterclockwise. The signs of $$x$$ and $$y$$ tell you where the point is:

- Quadrant I: $$(+,+)$$
- Quadrant II: $$(-,+)$$
- Quadrant III: $$(-,-)$$
- Quadrant IV: $$(+,-)$$

The distance formula comes from the Pythagorean Theorem. For points $$A(x_1,y_1)$$ and $$B(x_2,y_2)$$,

$$
d(A,B)=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}.
$$

The midpoint formula averages the coordinates:

$$
M=\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right).
$$

These formulas are very useful later on for analytic geometry.

:::key{name="Distance and midpoint"}
For points $$A(x_1,y_1)$$ and $$B(x_2,y_2)$$,

$$
d(A,B)=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2},
\qquad
M=\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right).
$$
:::

### Graphing lines

**Slope** measures how fast $$y$$ changes compared with $$x$$:

$$
m=\frac{\text{rise}}{\text{run}}=\frac{\Delta y}{\Delta x}=\frac{y_2-y_1}{x_2-x_1}.
$$

The same line can be written in several useful forms:

- **Slope-intercept form**: $$y=mx+b$$. This is best when you know the slope and $$y$$-intercept.
- **Point-slope form**: $$y-y_1=m(x-x_1)$$. This is best when you know a point and a slope.
- **Standard form**: $$Ax+By=C$$, usually with $$A,B,C\in\mathbb{Z}$$ and $$A\ge 0$$.

From standard form, if $$B\ne 0$$, the slope is

$$
m=-\frac{A}{B}.
$$

The intercepts are found by setting the other variable equal to $$0$$. For example, in $$Ax+By=C$$, the $$x$$-intercept is $$\frac{C}{A}$$ when $$A\ne 0$$, and the $$y$$-intercept is $$\frac{C}{B}$$ when $$B\ne 0$$.

Also, parallel lines have the same slope, while perpendicular lines have slopes that are negative reciprocals:

$$
m_1m_2=-1.
$$

---

## Solving Equations

### Linear equations

Solving a **linear equation** is usually a matter of undoing operations until the variable is alone. The main danger is not algebraic difficulty; it is losing track of what operation you applied to both sides.

For example,

$$
3x-7=11
$$

becomes

$$
3x=18
\quad\Longrightarrow\quad
x=6.
$$

Linear equations usually have one solution, but there are two special cases:

- If the variables disappear and you get a *true* statement, such as $$0=0$$, the equation is true for all real $$x$$ that sastisfies the equation.
- If the variables disappear and you get a *false* statement, such as $$0=5$$, there is no solution.

---

### Quadratic equations

A quadratic equation has the form

$$
ax^2+bx+c=0,\qquad a\ne 0.
$$

The basic idea is to get the equation into a form where the zero-product property, square roots, or the quadratic formula can finish the job.

:::theorem{name="problem solving techniques (Quadratics)"}
**Examples of problem solving techniques (Quadratics).**

Factoring is the fastest method when it works:

$$
(x-3)(x+2)=0
\quad\Longrightarrow\quad
x=3\quad\text{or}\quad x=-2.
$$

Be careful not to divide by a variable expression unless you know it is nonzero. For example, dividing $$x^2=3x$$ by $$x$$ loses the solution $$x=0$$. Instead, move everything to one side:

$$
x^2-3x=0
\quad\Longrightarrow\quad
x(x-3)=0.
$$

Completing the square rewrites a quadratic as a perfect square:

$$
x^2+6x+5=0
\quad\Longrightarrow\quad
(x+3)^2=4.
$$

Then

$$
x+3=\pm 2,
$$

so $$x=-1$$ or $$x=-5$$.
:::

The quadratic formula works for every quadratic, but often times it is very inefficient to use compared to the techniques shown above. The solutions to any quadratic come in the form of:

:::key{name="Quadratic formula"}
$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$
:::

The discriminant $$b^2-4ac$$ tells you how many real roots the equation has:

- $$b^2-4ac>0$$: two distinct real solutions.
- $$b^2-4ac=0$$: one repeated real solution.
- $$b^2-4ac<0$$: no real solutions, but two complex solutions.

Vieta's formulas are also useful. If $$r_1$$ and $$r_2$$ are the roots of $$ax^2+bx+c=0$$, then

$$
r_1+r_2=-\frac{b}{a},\qquad r_1r_2=\frac{c}{a}.
$$

:::theorem{name="Proof (Quadratic formula)"}
**Proof (Quadratic formula).** Let the quadratic be in the form of

$$
ax^2 + bx + c = 0
$$

with $$a\ne 0$$. Divide both sides by $$a$$:

$$
x^2 + \frac{b}{a} x + \frac{c}{a} = 0
$$

Move the constant term to the other side:

$$
x^2+\frac{b}{a}x=-\frac{c}{a}.
$$

To complete the square, add $$\left(\frac{b}{2a}\right)^2$$ to both sides:

$$
\left(x+\frac{b}{2a}\right)^2
=-\frac{c}{a}+\frac{b^2}{4a^2}.
$$

Combine the right-hand side:

$$
\left(x+\frac{b}{2a}\right)^2
=\frac{b^2-4ac}{4a^2}.
$$

Take the square root of both sides:

$$
x+\frac{b}{2a}=\pm\frac{\sqrt{b^2-4ac}}{2a}.
$$

Subtract $$\frac{b}{2a}$$:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$
:::

---

### Rational equations

Rational equations contain variables in denominators. The first step is always domain restrictions: denominators cannot be $$0$$.

For example, in

$$
\frac{x+2}{x-3}=\frac{5}{x-3},
$$

we must have $$x\ne 3$$ before doing anything else.

The usual strategy is:

1. State the restrictions.
2. Multiply both sides by the least common denominator.
3. Solve the resulting equation.
4. Check that no answer violates the restrictions.

:::warning
Do not multiply by something like $$x-3$$ without remembering that $$x=3$$ was never allowed. That is how extraneous answers sneak in.
:::

### Polynomial equations

A polynomial equation uses whole-number powers of the variable:

$$
a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0=0.
$$

The usual first move is to put everything on one side and make the other side $$0$$. Then factor if possible.

Common factoring patterns include:

- Greatest common factor: $$x^3-4x=x(x^2-4)$$.
- Difference of squares: $$x^2-9=(x-3)(x+3)$$.
- Quadratic in form: $$x^4-5x^2+4=0$$.

For a quadratic-in-form equation, substitute. If

$$
x^4-5x^2+4=0,
$$

let $$u=x^2$$. Then

$$
u^2-5u+4=0.
$$

After solving for $$u$$, substitute back and solve for $$x$$. Do not stop at the substitution variable; the original question asked for $$x$$.

---

### Absolute value equations

Absolute value measures distance from $$0$$:

$$
\lvert x \rvert =\text{the distance between }x\text{ and }0.
$$

More generally, $$\lvert x-a \rvert$$ is the distance between $$x$$ and $$a$$. This distance interpretation is usually easier than memorizing cases.

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

Absolute value expressions are also naturally piecewise. For example,

$$
\lvert x-3 \rvert=
\begin{cases}
x-3, & x\ge 3,\\
3-x, & x<3.
\end{cases}
$$

When an equation has several absolute values, break the number line at the values where the inside expressions equal $$0$$, solve on each interval, and check that each answer belongs to the interval where you found it.

---

### Exponential equations

When the bases can be made the same, rewrite first:

$$
2^{x-3}=8^{x}
\quad\Longrightarrow\quad
2^{x-3}=(2^3)^x=2^{3x}.
$$

Since $$2^u$$ is one-to-one,

$$
x-3=3x.
$$

In general, if $$a>0$$ and $$a\ne 1$$, then

$$
a^m=a^n\quad\Longrightarrow\quad m=n.
$$

If the bases cannot be matched cleanly, isolate the exponential expression and use logarithms. Keep an eye on the domain: logarithms only accept positive inputs, and exponential bases must be positive and not equal to $$1$$ in the usual real-valued setting.

---

### Fractional exponents

Fractional exponents are another way to write radicals:

$$
x^{p/q}=\sqrt[q]{x^p}.
$$

For example,

$$
x^{1/2}=\sqrt{x},\qquad x^{2/3}=\sqrt[3]{x^2}.
$$

Even roots require nonnegative radicands in the real numbers. Odd roots allow negative radicands. This is why $$\sqrt{x-4}$$ requires $$x\ge 4$$, but $$\sqrt[3]{x-4}$$ does not.

One important simplification is

$$
\sqrt{x^2}=\lvert x \rvert,
$$

not just $$x$$. The square root symbol means the nonnegative square root.

---

### Radical equations

Radical equations are equations with roots, such as

$$
\sqrt{x-5}=x-7.
$$

The process is careful, not mysterious:

1. Write the domain restrictions.
2. Isolate one radical.
3. Raise both sides to the needed power.
4. Repeat if another radical remains.
5. Check every candidate in the original equation.

The check is not optional. Squaring both sides can create answers that solve the squared equation but not the original equation.

For example, if a step gives

$$
x-\sqrt{x}=20,
$$

then isolating and squaring may produce candidates. Each candidate must still be substituted back into the original radical equation.

---

## Inequalities

### Inequality basics

Solving inequalities feels like solving equations, but the answer is usually an interval or a union of intervals instead of a single number.

The key rule: multiplying or dividing by a negative number reverses the inequality sign:

$$
-2x<8
\quad\Longrightarrow\quad
x>-4.
$$

Compound inequalities describe overlaps or unions:

- $$-3<2x-1\le 5$$ means both inequalities must be true at the same time.
- $$x<-2$$ or $$x>4$$ means either interval works.

Graphing on a number line is often the cleanest way to avoid mistakes. Open circles go with $$<$$ and $$>$$; closed circles go with $$\le$$ and $$\ge$$.

---

### Absolute value inequalities

Absolute value inequalities are distance statements. For $$a>0$$:

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

The short version:

- "Less than" means between.
- "Greater than" means outside.

For example,

$$
\lvert 3x-2 \rvert \le 4
$$

means

$$
-4\le 3x-2\le 4.
$$

But

$$
\lvert 4-5x \rvert >1
$$

means

$$
4-5x>1
\quad\text{or}\quad
4-5x<-1.
$$

If the absolute value expression is compared to a negative number, pause. Since absolute value is never negative, statements like $$\lvert u \rvert <-3$$ have no solution.

---

### Polynomial inequalities

Polynomial inequalities ask where a polynomial is positive or negative:

$$
p(x)>0,\qquad p(x)\le 0,\qquad \text{etc.}
$$

The standard method is a sign chart:

1. Move everything to one side so the other side is $$0$$.
2. Factor the polynomial.
3. Mark the zeros on a number line.
4. Test one point in each interval, or use sign changes from multiplicity.
5. Include zeros only when the inequality has $$\le$$ or $$\ge$$.

Multiplicity matters. A simple root usually changes the sign. An even-multiplicity root touches the axis and does not change the sign.

For example,

$$
(x-1)^2(x+3)<0
$$

has critical numbers $$-3$$ and $$1$$. The squared factor is never negative and does not change sign at $$x=1$$, so the sign behavior is controlled mostly by $$x+3$$.

---

### Rational inequalities

Typical form: $$\dfrac{P(x)}{Q(x)} > 0$$, $$\ge 0$$, $$< 0$$, or $$\le 0$$ (strict vs non-strict matters at zeros of the denominator).

:::warning
The method is similar to polynomial inequalities, with one major warning: denominator zeros are never allowed.

Do not multiply both sides by the denominator unless you already know its sign. If the denominator could be positive or negative, multiplying by it may or may not reverse the inequality, which is exactly the problem the sign chart avoids.
:::

The safest process is:

1. Move everything to one side and combine into one fraction.
2. Factor the numerator and denominator.
3. Mark zeros of the numerator and denominator on a number line.
4. Test signs on each interval.
5. Include numerator zeros only if the inequality allows equality.
6. Never include denominator zeros.

### Radical inequalities

Example: $$\sqrt{f(x)} < g(x)$$.

Radical inequalities need more care than radical equations because squaring inequalities is only automatically safe when both sides are known to be nonnegative.

Always begin with the domain. For an even root,

$$
\sqrt{f(x)}
$$

requires $$f(x)\ge 0$$.

If the inequality is

$$
\sqrt{f(x)}\le g(x),
$$

then we also need $$g(x)\ge 0$$, because the left side is nonnegative. After those conditions are in place, squaring is safe:

$$
f(x)\le g(x)^2.
$$

For

$$
\sqrt{f(x)}>g(x),
$$

split into cases:

- If $$g(x)<0$$, the inequality is automatically true wherever the radical exists.
- If $$g(x)\ge 0$$, square both sides and solve $$f(x)>g(x)^2$$.

The final answer is the union of valid pieces that also satisfy the original domain.

---

## Symmetry

Symmetry asks what happens to a graph when you reflect or rotate it. The algebra tests come from replacing points with their reflected versions.

### Symmetry about the axes

- $$x$$-axis symmetry: if $$(x,y)$$ is on the graph, then $$(x,-y)$$ is also on the graph. Algebra test: replace $$y$$ with $$-y$$ and see whether the equation stays the same.
- $$y$$-axis symmetry: if $$(x,y)$$ is on the graph, then $$(-x,y)$$ is also on the graph. Algebra test: replace $$x$$ with $$-x$$.
- Origin symmetry: if $$(x,y)$$ is on the graph, then $$(-x,-y)$$ is also on the graph. Algebra test: replace both $$x$$ with $$-x$$ and $$y$$ with $$-y$$.

For example, the graph of

$$
y=x^2
$$

has $$y$$-axis symmetry because replacing $$x$$ with $$-x$$ gives

$$
y=(-x)^2=x^2.
$$

The graph of

$$
y=x^3
$$

has origin symmetry because replacing both variables gives

$$
-y=(-x)^3=-x^3,
$$

which simplifies back to $$y=x^3$$.

:::theorem{name="Extension"}
**Extension.** If a graph has both $$x$$-axis and $$y$$-axis symmetry, does it necessarily have origin symmetry? If a graph has origin symmetry, does it necessarily have $$x$$-axis and $$y$$-axis symmetry?
:::

---

## Practice

:::practice
:::frq{id=precalc-fundeqineq-1}
1. The taxicab distance between points $$(x_1, y_1)$$ and $$(x_2, y_2)$$ in the coordinate plane is given by $$\lvert x_1 - x_2 \rvert + \lvert y_1 - y_2 \rvert$$. For how many points $$P$$ with integer coordinates is the taxicab distance between $$P$$ and the origin less than or equal to $$20$$? (2022 AMC 12A)

:::solution
We want integer points $$(x,y)$$ satisfying

$$
\lvert x \rvert +\lvert y \rvert \le 20.
$$

For distance $$0$$, there is only the origin: $$1$$ point.

For each distance $$r\ge 1$$, the equation

$$
\lvert x \rvert +\lvert y \rvert =r
$$

has $$4r$$ integer points. Therefore the total number of points is

$$
1+\sum_{r=1}^{20}4r
=1+4\left(\frac{20\cdot 21}{2}\right)
=1+840
=841.
$$

Thus

$$
\boxed{841}.
$$
:::
:::

:::frq{id=precalc-fundeqineq-2}
2. Solve for $$x$$: $$x^4 - 13x^2 + 36 = 0$$.

:::solution
Let $$u=x^2$$. Then

$$
x^4-13x^2+36=0
$$

becomes

$$
u^2-13u+36=0.
$$

Factor:

$$
(u-9)(u-4)=0.
$$

So $$u=9$$ or $$u=4$$. Since $$u=x^2$$,

$$
x^2=9
\quad\text{or}\quad
x^2=4.
$$

Therefore

$$
\boxed{x=-3,-2,2,3}.
$$
:::
:::

:::frq{id=precalc-fundeqineq-3}
3. Simplify $$\sqrt{\frac{x^4}{256} + \frac{x^3}{32} + \frac{5x^2}{16} + x + 4 + 16x - 8\sqrt{4x-7} - 24 + 2(\frac{x^2}{16} + \frac{x}{4} + 2)(-2 + 2\sqrt{4x-7})}$$. (Hint: Use factor by grouping.)

:::solution
Let

$$
A=\frac{x^{2}}{16}+\frac{x}{4}+2
\qquad\text{and}\qquad
B=-2+2\sqrt{4x-7}.
$$

The first five terms under the square root are exactly $$A^2$$:

$$
\left(\frac{x^{2}}{16}+\frac{x}{4}+2\right)^2
=\frac{x^4}{256}+\frac{x^3}{32}+\frac{5x^2}{16}+x+4.
$$

The next three terms are exactly $$B^2$$:

$$
\left(-2+2\sqrt{4x-7}\right)^2
=16x-8\sqrt{4x-7}-24.
$$

The remaining term is $$2AB$$, so the expression under the radical is

$$
A^2+B^2+2AB=(A+B)^2.
$$

Thus the original expression is

$$
\sqrt{(A+B)^2}=\lvert A+B\rvert.
$$

Now

$$
A+B=\frac{x^2}{16}+\frac{x}{4}+2\sqrt{4x-7}.
$$

The domain requires $$4x-7\ge 0$$, so $$x\ge \frac74$$. On this domain, $$A+B\ge 0$$, so

$$
\boxed{\frac{x^2}{16}+\frac{x}{4}+2\sqrt{4x-7}}.
$$
:::
:::

:::frq{id=precalc-fundeqineq-4}
4. Solve for $$x$$ and discard any extraneous solutions: $$\dfrac{1}{x-1} + \dfrac{2}{x^2-1} = \dfrac{3}{x+1}$$.
:::

:::frq{id=precalc-fundeqineq-5}
5. Solve for $$x$$ in $$\mathbb{R}$$: $$9^x - 10\cdot 3^x + 9 = 0$$.
:::

:::frq{id=precalc-fundeqineq-6}
6. Solve for $$x$$ in $$\mathbb{R}$$ and check every candidate in the original equation: $$\sqrt{2x+3} + \sqrt{x+1} = 3$$.
:::

:::frq{id=precalc-fundeqineq-7}
7. Solve for $$x$$ in $$\mathbb{R}$$ and write the answer in interval notation: $$\dfrac{3x+1}{x-2} > 2$$.
:::

:::frq{id=precalc-fundeqineq-8}
8. Solve for $$x$$ in $$\mathbb{R}$$ and write the answer in interval notation: $$\lvert x - 2\rvert + \lvert x + 4\rvert \le 10$$.
:::

:::frq{id=precalc-fundeqineq-9}
9. Solve for $$x$$ in $$\mathbb{R}$$ and write the answer in interval notation: $$\lvert x^{2} - 9\rvert \le 5$$.
:::

:::frq{id=precalc-fundeqineq-10}
10. Solve in $$\mathbb{R}$$: $$(x-1)^{2}(x-4)(x+2) < 0$$. Explain how repeated roots change the sign chart compared with all simple roots.
:::

:::frq{id=precalc-fundeqineq-11}
11. Solve in $$\mathbb{R}$$: $$x^{3} - 5x^{2} + 6x \ge 0$$.
:::

:::frq{id=precalc-fundeqineq-12}
12. Solve in $$\mathbb{R}$$: $$\dfrac{x^{2} - 4}{x^{2} + x} \le 0$$. Give the domain, a single rational inequality of the form $$\dfrac{R(x)}{Q(x)} \le 0$$ with no common factors, and the solution in interval notation.
:::

:::frq{id=precalc-fundeqineq-13}
13. Solve in $$\mathbb{R}$$: $$\sqrt{4 - x^{2}} \ge x$$. Find the radical domain first, then split into $$x < 0$$ and $$x \ge 0$$ before squaring where legal.
:::

:::frq{id=precalc-fundeqineq-14}
14. Solve in $$\mathbb{R}$$: $$\sqrt{x^{2} + 5} \le x + 2$$. Impose all conditions needed before and after squaring.
:::

:::frq{id=precalc-fundeqineq-15}
15. Determine the symmetries of both graphs: $$f(x)=\dfrac{x^2}{x^2+1}$$ and $$g(x)=x\lvert x\rvert$$. For each, decide whether the graph has $$y$$-axis symmetry, $$x$$-axis symmetry, origin symmetry, or none.
:::

:::frq{id=precalc-fundeqineq-16}
16. (Bonus, Markov equations)
   Our goal is to find all positive integer solutions $$(x,y)$$ to
   $$
   x^2+y^2+1=3xy.
   $$
   This is a small version of a famous family of Diophantine equations (equations with positive integer solutions) known as Markov equations.
   $$(A)$$ Find the solutions with $$y=1$$.
   $$(B)$$ Treat the equation as a quadratic in $$x$$. If $$x$$ is one root, use Vieta's formulas to find the other root $$x'$$.
   $$(C)$$ Suppose $$(x,y)$$ is a positive integer solution with $$x\ge y\ge 2$$. Prove that the other root $$x'$$ is a positive integer and that $$x'<y$$.
   $$(D)$$ Explain why repeatedly replacing the larger coordinate by the smaller Vieta root must eventually reach a solution with one coordinate equal to $$1$$.
   $$(E)$$ Reverse the process to describe all positive integer solutions.
:::
:::
