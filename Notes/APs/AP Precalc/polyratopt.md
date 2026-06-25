---
layout: default
title: "Unit 4 & 13: Polynomial & Rational Functions and Applications to Optimization"
parent: AP Precalculus
nav_order: 3
permalink: /notes/ap/precalc/polyratopt/
---

# Unit 4 & 13: Polynomial & Rational Functions and Applications to Optimization

:::summary{title="Unit overview"}
This unit covers polynomial and rational function behavior, zero-finding, asymptotes, and optimization problems built from single-variable models.

:::

---

## Basic polynomial families

Linear and quadratic functions are the first two polynomial families. They are worth separating out because they show up constantly in modeling and optimization.

### Linear functions

A **linear function** has the form

$$
f(x)=mx+b.
$$

The number $$m$$ is the slope and $$b=f(0)$$ is the $$y$$-intercept. If a line is written in standard form

$$
Ax+By=C,
$$

then, as long as $$B\ne 0$$, the slope is

$$
m=-\frac{A}{B}.
$$

:::example{title="Find a linear function $$f$$ such that $$f(2)=1$$ and the graph of $$y=f(x)$$ is perpen..."}
Find a linear function $$f$$ such that $$f(2)=1$$ and the graph of $$y=f(x)$$ is perpendicular to the graph of $$6x-3y=2$$.

First put the given line in slope-intercept form:

$$
6x-3y=2
\quad\Longrightarrow\quad
y=2x-\frac{2}{3}.
$$

Its slope is $$2$$, so a perpendicular line has slope $$-\frac12$$. Thus

$$
f(x)=-\frac12x+b.
$$

Use $$f(2)=1$$:

$$
1=-\frac12(2)+b=-1+b,
$$

so $$b=2$$. Therefore

$$
\boxed{f(x)=-\frac12x+2}.
$$

:::

### Quadratic functions

A **quadratic function** has the form

$$
f(x)=ax^{2}+bx+c,\qquad a\ne 0.
$$

Its graph is a parabola.

- If $$a>0$$, the parabola opens upward and has a minimum.
- If $$a<0$$, the parabola opens downward and has a maximum.

Sometimes it is useful to complete the square on a quadratic to see some of its properties.

:::example{title="Find the vertex of the quadratic $$ax^2+bx+c$$."}
Find the vertex of the quadratic $$ax^2+bx+c$$.

The vertex (minimum/maximum depending on the shape) of the quadratic occurs at

$$
x=-\frac{b}{2a}.
$$

You can see why by completing the square:

$$
\begin{aligned}
f(x)
&=ax^{2}+bx+c\\
&=a\left(x^{2}+\frac{b}{a}x\right)+c\\
&=a\left(x+\frac{b}{2a}\right)^{2}+c-\frac{b^{2}}{4a}.
\end{aligned}
$$

The corresponding output is

$$
f\left(-\frac{b}{2a}\right),
$$

so the vertex is

$$
(-\frac{b}{2a},\,c-\frac{b^2}{4a}).
$$

This is vertex form:

$$
f(x)=a(x-h)^{2}+k,
$$

where the vertex is $$(h,k)$$.

:::

If a function is built from this quadratic in a way that preserves order, the same input may still be optimal. For example,

$$
y=\sqrt{f(x)}
$$

is minimized at $$x=\frac12$$ because the square-root function is increasing, so the smallest legal value of $$f(x)$$ gives the smallest value of $$\sqrt{f(x)}$$.

:::warning
However, you have to be careful and always double-check your work for domain shifts or restrictions, since a function like $$\sqrt{(x-2.5)^2-5}$$ does not have a minimum at $$x=2.5$$ since it is not in the domain! In this case, the minimum are always the zeroes of the quadratic.

:::

---

## General polynomial functions

A **polynomial function** has the form

$$
f(x)=a_{n}x^{n}+a_{n-1}x^{n-1}+\cdots+a_{1}x+a_{0},
\qquad a_n\ne 0,
$$

where $$n$$ is a nonnegative integer and all coefficients are real numbers.

- $$n$$ is the **degree** of the polynomial.
- $$a_nx^n$$ is the **leading term**.
- $$a_n$$ is the **leading coefficient**.
- $$a_0$$ is the **constant term**.

Examples:

- $$3x^{4}-2x^{2}+5x-1$$ is a polynomial of degree $$4$$.
- $$5$$ is a polynomial of degree $$0$$.
- $$0$$ is usually called the zero polynomial and does not have a well-defined degree.
- $$\dfrac{x^2+1}{x-3}$$ is not a polynomial because the domain is not all real numbers.
- $$x^{3}-\sqrt{x}$$ is not a polynomial because $$\sqrt{x}=x^{1/2}$$ has a non-integer exponent.

---

## Graphing polynomial functions

When graphing a polynomial, start with the broad shape first, then add the important points. The broad shape comes from end behavior; the important points usually come from zeros and their multiplicities. In additino, when graphing polynomials, it is always a good idea to graph some non-zero points as a reference.

### End behavior

The end behavior of a polynomial is controlled by its leading term. For large positive or negative values of $$x$$, the leading term eventually dominates the rest of the polynomial. The reason comes from calculus, and we will not go into detail on the explanations.

For

$$
f(x)=a_nx^n+\cdots,
$$

use this table:

| Degree | Leading coefficient | Left end | Right end |
|---|---:|---:|---:|
| even | positive | up | up |
| even | negative | down | down |
| odd | positive | down | up |
| odd | negative | up | down |

For example,

$$
f(x)=-2x^{5}+7x^{2}-1
$$

has odd degree and negative leading coefficient, so

$$
x\to -\infty \Rightarrow f(x)\to \infty,
\qquad
x\to \infty \Rightarrow f(x)\to -\infty.
$$

### Zeros and multiplicity

If

$$
f(x)=a(x-r_1)^{m_1}(x-r_2)^{m_2}\cdots(x-r_k)^{m_k},
$$

then $$r_1,r_2,\ldots,r_k$$ are zeros of $$f$$. The exponent on each factor is the **multiplicity** of that zero.

Multiplicity tells you how the graph behaves near the $$x$$-intercept:

- odd multiplicity: the graph crosses the $$x$$-axis,
- even multiplicity: the graph touches the $$x$$-axis and turns around,
- multiplicity $$1$$: crosses normally,
- larger odd multiplicity: crosses while flattening or "wiggling" near the intercept.

For example,

$$
f(x)=(x-2)^3(x+1)(x+3)^2
$$

has zeros $$2,-1,-3$$. The graph crosses at $$x=2$$ and $$x=-1$$, and bounces at $$x=-3$$.

The degree is

$$
3+1+2=6,
$$

so the maximum possible number of turning points is

$$
6-1=5.
$$

In general, a polynomial of degree $$n$$ has at most $$n-1$$ turning points. This does not mean it must have $$n-1$$ turning points; it is only an upper bound.

:::example{title="Suppose $$P(x)=2x^{4}+5x^{3}-38x^{2}+28x+24$$ and we are given that $$P(2)=0$$ with a m..."}
Suppose $$P(x)=2x^{4}+5x^{3}-38x^{2}+28x+24$$ and we are given that $$P(2)=0$$ with a multiplicity of 2. Graph the polynomial.

Since $$P(2)=0$$, $$x-2$$ is a factor. Synthetic division by $$2$$ gives:

$$
\begin{array}{r|rrrrr}
2 & 2 & 5 & -38 & 28 & 24\\
  &   & 4 & 18 & -40 & -24\\ \hline
  & 2 & 9 & -20 & -12 & 0
\end{array}
$$

Thus

$$
P(x)=(x-2)(2x^{3}+9x^{2}-20x-12).
$$

Factoring the cubic further (you can first divide by $$x-2$$ again and then factoring the resulting quadratic):

$$
2x^{3}+9x^{2}-20x-12
=(x+6)(2x+1)(x-2).
$$

So

$$
P(x)=(x-2)^2(x+6)(2x+1),
$$

and the real zeros are

$$
\boxed{x=2,\ -6,\ -\frac12}.
$$

Since $$x=2$$ has multiplicity $$2$$, the graph touches/bounces at $$x=2$$. The end behavior of this function is up & up since the highest degree is even and the leading coefficient is positive. It goes through $$(-6,0)$$ and $$(-1/2,0)$$ while bouncing at $$(2,0)$$. A graph of the polynomial is shown below:

**ADD IMAGE OF GRAPH**

:::

---

## Finding zeros and factoring polynomials

Once you know the general graph behavior, the next job is usually to find zeros. A general formula for higher degree polynomials are either very complicated or don't exist (in fact, a formula doesn't exist for polynomials of degree 5 or higher!), but guessing rational roots is much easier to do.

### Remainder and Factor Theorems

The **Remainder Theorem** says:

If a polynomial $$f(x)$$ is divided by $$x-m$$, then the remainder is $$f(m)$$.

Why? Polynomial division gives

$$
f(x)=(x-m)q(x)+r,
$$

where $$r$$ is a constant and $$q(x)$$ is another polynomial. Substitute $$x=m$$:

$$
f(m)=(m-m)q(m)+r=r.
$$

The **Factor Theorem** is the most important special case:

:::key{name="Factor Theorem"}
$$
x-m \text{ is a factor of } f(x)
\quad\Longleftrightarrow\quad
f(m)=0.
$$

:::

So these statements all mean the same thing:

- $$m$$ is a zero of $$f$$,
- $$m$$ is a root of $$f(x)=0$$,
- $$(m,0)$$ is an $$x$$-intercept,
- $$x-m$$ is a factor of $$f(x)$$.

### Rational Root Theorem

The **Rational Root Theorem** helps list possible rational zeros. The Rational Root Theorem states that:

:::key{name="Rational Root Theorem"}
If

$$
f(x)=a_nx^n+\cdots+a_1x+a_0
$$

has integer coefficients and $$\frac{p}{q}$$ is a rational zero in lowest terms, then

$$
p\mid a_0
\qquad\text{and}\qquad
q\mid a_n.
$$

:::

So possible rational zeros are

$$
\pm\frac{\text{factor of constant term}}{\text{factor of leading coefficient}}.
$$

:::example{title="Find the possible rational zeros of $$f(x)=2x^{4}-x^{3}+7x^{2}+3x-3.$$"}
Find the possible rational zeros of $$f(x)=2x^{4}-x^{3}+7x^{2}+3x-3.$$

Here the constant term is $$-3$$ and the leading coefficient is $$2$$. Thus

$$
p=\pm1,\pm3
\qquad\text{and}\qquad
q=\pm1,\pm2.
$$

The possible rational zeros are

$$
\boxed{\pm1,\ \pm3,\ \pm\frac12,\ \pm\frac32}.
$$

This theorem only gives candidates. You still need to test them.

:::

---

## Complex and irrational zeros

The Rational Root Theorem helps find rational zeros, but polynomials can also have irrational and complex zeros. These results tell you how many zeros to expect and when zeros come in pairs.

### Fundamental Theorem of Algebra

The **Fundamental Theorem of Algebra** says that every polynomial of degree at least $$1$$ has at least one complex zero.

The more useful version for factoring is:

A polynomial of degree $$n$$ has exactly $$n$$ complex zeros, counted with multiplicity.

For example, the polynomial

$$
F(x)=(x^{2}-25)(x+1)^2(x^2+3)(2-3x)
$$

has degree

$$
2+2+2+1=7,
$$

so it has exactly $$7$$ complex zeros counted with multiplicity.

Over the real numbers,

$$
F(x)=(x-5)(x+5)(x+1)^2(x^2+3)(2-3x).
$$

Over the complex numbers,

$$
x^2+3=(x-i\sqrt3)(x+i\sqrt3),
$$

so a full complex factorization is

$$
F(x)=(x-5)(x+5)(x+1)^2(x-i\sqrt3)(x+i\sqrt3)(2-3x).
$$

The real zeros are

$$
\boxed{5,\ -5,\ -1,\ \frac23},
$$

with $$-1$$ counted twice.

### Complex conjugate roots

If a polynomial has real coefficients and $$a+bi$$ is a zero, then $$a-bi$$ is also a zero.

For example, if a real-coefficient quartic has zeros $$2$$, $$-3$$, and $$1+i$$, then the fourth zero must be $$1-i$$.

### Irrational conjugate roots

If a polynomial has rational coefficients and $$a+\sqrt{b}$$ is a zero, then $$a-\sqrt{b}$$ is also a zero, as long as $$\sqrt{b}$$ is irrational.

For example, if a rational-coefficient polynomial has zero $$3+\sqrt2$$, then $$3-\sqrt2$$ must also be a zero.

---

## Rational functions

A **rational function** is a function of the form

$$
R(x)=\frac{f(x)}{g(x)},
$$

where $$f(x)$$ and $$g(x)$$ are polynomials and $$g(x)\ne 0$$.

The domain excludes all real numbers that make the denominator zero.

For example,

$$
R(x)=\frac{2x+3}{x-1}
$$

has domain

$$
x\ne 1.
$$

### Intercepts

For

$$
R(x)=\frac{f(x)}{g(x)},
$$

the $$x$$-intercepts occur where $$f(x)=0$$ and the denominator is not zero (basically the zeros of the top polynomial). The $$y$$-intercept is $$R(0),$$ as long as $$0$$ is in the domain.

### Holes and vertical asymptotes

When solving out rational polynomials, always factor first. If a factor cancels, it creates a **hole** at that place, and the $$y$$-value would be the $$y$$-value of the point if it were on the rational polynomial's graph.

If a denominator factor does not cancel, it creates a **vertical asymptote**, where the values approach $$\pm \infinity$$.

:::example{title="Find the vertical asymptotes and holes of$$R(x)=\frac{(x-2)(x+1)}{(x-2)(x-3)}.$$"}
Find the vertical asymptotes and holes of$$R(x)=\frac{(x-2)(x+1)}{(x-2)(x-3)}.$$

The original denominator is zero at $$x=2$$ and $$x=3$$. After canceling,

$$
R(x)=\frac{x+1}{x-3},
\qquad x\ne 2,3.
$$

So:

- $$x=2$$ is a hole,
- $$x=3$$ is a vertical asymptote.

To find the hole's $$y$$-value, plug $$x=2$$ into the simplified function:

$$
\frac{2+1}{2-3}=-3.
$$

Thus the hole is at $$(2,-3).$$

:::

### Horizontal asymptotes

For

$$
R(x)=\frac{f(x)}{g(x)},
$$

a **horizontal asymptote** is the value of which $$y$$ approaches as $$x$$ approaches $$\infinity$$. If $$y$$ approaches $$\pm \infinity$$, it is NOT considered a horizontal asymptote!. To determine horizontal asymptotes, always compare the degree of the numerator and denominator.

- If denominator degree is bigger, the horizontal asymptote is $$y=0$$.
- If degrees are equal, the horizontal asymptote is the ratio of leading coefficients.
- If numerator degree is exactly one bigger, there is a slant asymptote from polynomial division.
- If numerator degree is more than one bigger, there is a polynomial asymptote from polynomial division.

:::theorem{name="Horizontal and slant asymptotes"}
Below are two common examples of rational polynomials and their horizontal asymptotes.

**Example (Horizontal asymptote).** Find the horizontal/slant asymptote of $$\frac{2x+3}{x-1}$$.

The numerator and denominator have equal degrees, so the horizontal asymptote is

$$
y=2.
$$

You can also see this by dividing numerator and denominator by $$x$$:

$$
\frac{2x+3}{x-1}
=\frac{2+\frac3x}{1-\frac1x}
\to \frac21=2
$$

as $$x\to \pm\infty$$.

**Example (Slant asymptote).** Find the horizontal/slant asymptote for $$R(x)=\frac{x^2+1}{x-2}.$$

The numerator degree is one more than the denominator degree. Divide:

$$
\frac{x^2+1}{x-2}
=x+2+\frac{5}{x-2}.
$$

Since

$$
\frac{5}{x-2}\to 0
$$

as $$x\to \pm\infty$$, the slant asymptote is

$$
y=x+2.
$$

:::

### Graphing checklist for rational functions

To graph a rational function:

1. Factor numerator and denominator.
2. State the domain.
3. Cancel common factors, but remember holes.
4. Find vertical asymptotes from uncanceled denominator factors.
5. Find $$x$$- and $$y$$-intercepts.
6. Find horizontal, slant, or polynomial asymptotes.
7. Use sign charts and test points to place branches.

:::exam{topic="Rational function graphs"}
When graphing, always list out these key features! They will make graphing the rational function much easier to do.

:::

---

## Optimization

An **optimization** problem asks for the input that makes a quantity as large or as small as possible.

The usual workflow is:

1. Decide what quantity you want to maximize or minimize.
2. Draw a picture if the problem is geometric.
3. Name variables.
4. Use constraints to write the target quantity as a function of one variable.
5. State the allowed domain from the context.
6. Find the maximum or minimum using algebra, graphing, or a calculator.
7. Answer the original question with units and in context.

:::theorem{name="largest rectangle with fixed perimeter"}
**Example (largest rectangle with fixed perimeter).**

What is the largest possible area of a rectangle with perimeter $$80\text{ cm}$$?

Let the rectangle have length $$x$$ and width $$y$$. Since

$$
2x+2y=80,
$$

we get

$$
y=40-x.
$$

The area is

$$
A(x)=xy=x(40-x)=40x-x^2.
$$

This parabola opens downward, so its maximum occurs at

$$
x=-\frac{40}{2(-1)}=20.
$$

Then

$$
y=40-20=20.
$$

So the largest rectangle is a square, and its maximum area is

$$
\boxed{400\text{ cm}^2}.
$$

:::

:::theorem{name="maximizing a rational model"}
**Example (maximizing a rational model).**

Suppose the efficiency of a machine after $$x$$ hours is modeled by

$$
E(x)=\frac{120x}{x^{2}+16},
\qquad x\ge 0.
$$

Find the time when the efficiency is largest.

Set $$y=E(x)$$:

$$
y=\frac{120x}{x^{2}+16}.
$$

Multiply:

$$
y(x^{2}+16)=120x.
$$

Rearrange as a quadratic in $$x$$:

$$
yx^{2}-120x+16y=0.
$$

For a real input $$x$$ to exist, the discriminant must be nonnegative:

$$
(-120)^2-4(y)(16y)\ge 0.
$$

Thus

$$
14400-64y^2\ge 0
\quad\Longrightarrow\quad
y^2\le 225.
$$

Since $$E(x)\ge 0$$ for $$x\ge 0$$, the largest possible value is $$y=15$$. To find where it happens:

$$
15=\frac{120x}{x^2+16}.
$$

Then

$$
15x^2+240=120x
\quad\Longrightarrow\quad
x^2-8x+16=0
\quad\Longrightarrow\quad
(x-4)^2=0.
$$

So the efficiency is largest at

$$
\boxed{x=4}.
$$

This method is useful when the equation can be rewritten as a quadratic in the input and the discriminant tells which output values are possible.

:::

---

## Practice

:::practice
:::frq{id=precalc-polyratopt-1}
1. Let $$f(x)=mx+b$$. Suppose $$f(a+b)=f(a)+f(b)-6$$ for all real numbers $$a,b$$ and $$f(4)=10$$. Find $$f(x)$$, its $$x$$-intercept, and the equation of the line perpendicular to $$f$$ through $$(4,10)$$.

:::solution
Let $$f(x)=mx+b$$. Then

$$
f(a+b)=m(a+b)+b=ma+mb+b,
$$

while

$$
f(a)+f(b)-6=(ma+b)+(mb+b)-6=ma+mb+2b-6.
$$

Since these are equal for all $$a,b$$,

$$
b=2b-6,
$$

so $$b=6$$. Use $$f(4)=10$$:

$$
4m+6=10,
$$

so $$m=1$$. Therefore

$$
\boxed{f(x)=x+6}.
$$

The $$x$$-intercept satisfies $$x+6=0$$, so it is

$$
\boxed{(-6,0)}.
$$

The slope of $$f$$ is $$1$$, so a perpendicular line has slope $$-1$$. Through $$(4,10)$$:

$$
y-10=-(x-4),
$$

so

$$
\boxed{y=-x+14}.
$$

:::
:::

:::frq{id=precalc-polyratopt-2}
2. A quadratic function has $$x$$-intercepts $$-1$$ and $$5$$ and passes through $$(0,10)$$. Find the function, its vertex, maximum/minimum value, and range.

:::solution
Since the zeros are $$-1$$ and $$5$$,

$$
q(x)=a(x+1)(x-5).
$$

Use $$(0,10)$$:

$$
10=a(1)(-5),
$$

so $$a=-2$$. Thus

$$
\boxed{q(x)=-2(x+1)(x-5)}.
$$

Expanding,

$$
q(x)=-2x^2+8x+10.
$$

The axis of symmetry is halfway between the zeros:

$$
x=\frac{-1+5}{2}=2.
$$

Then

$$
q(2)=-2(3)(-3)=18.
$$

The vertex is

$$
\boxed{(2,18)}.
$$

Since $$a<0$$, this is a maximum. The maximum value is $$18$$ and the range is

$$
\boxed{(-\infty,18]}.
$$

:::
:::

:::frq{id=precalc-polyratopt-3}
3. For $$h(x)=\sqrt{-2x^2+8x+10}$$, find the domain, range, and maximum value of $$h$$.

:::solution
The square root requires

$$
-2x^2+8x+10\ge 0.
$$

Factor:

$$
-2(x^2-4x-5)\ge 0
$$

so

$$
-2(x-5)(x+1)\ge 0.
$$

This is true for

$$
\boxed{-1\le x\le 5}.
$$

Thus the domain is

$$
\boxed{[-1,5]}.
$$

The inside quadratic has maximum at the midpoint of the roots:

$$
x=2.
$$

Its maximum value is

$$
-2(2)^2+8(2)+10=18.
$$

Since square root is increasing, the maximum of $$h$$ is

$$
\boxed{\sqrt{18}=3\sqrt2}.
$$

At the endpoints, $$h(x)=0$$, so the range is

$$
\boxed{[0,3\sqrt2]}.
$$

:::
:::

:::frq{id=precalc-polyratopt-4}
4. Find the lowest-degree polynomial $$p(x)$$ with real coefficients such that $$x=-3$$ is a zero of multiplicity $$2$$, $$x=1$$ is a zero of multiplicity $$3$$, and $$p(0)=-18$$. Give the end behavior.

:::

:::frq{id=precalc-polyratopt-5}
5. For $$f(x)=-\dfrac12(x+4)(x-1)^2(x-3)^3$$, give the degree, leading coefficient, end behavior, zeros with multiplicities, crossing/bouncing behavior, $$y$$-intercept, and maximum possible number of turning points. Give a rough graph of the function.

:::

:::frq{id=precalc-polyratopt-6}
6. Find the lowest-degree polynomial with real coefficients, leading coefficient positive, zeros $$2$$ with multiplicity $$2$$, $$-1$$, and $$3+i$$, and $$f(0)=100$$.

:::

:::frq{id=precalc-polyratopt-7}
7. Factor $$P(x)=x^4-3x^3-11x^2+39x-18$$ completely over the real numbers, given that $$P(3)=0$$.

:::

:::frq{id=precalc-polyratopt-8}
8. Use the Rational Root Theorem to list the possible rational zeros of $$f(x)=2x^4-x^3-20x^2+13x+30$$, then find all real zeros.

:::

:::frq{id=precalc-polyratopt-9}
9. A polynomial $$f(x)$$ leaves remainder $$5$$ when divided by $$x-2$$ and remainder $$-4$$ when divided by $$x+1$$. Find the remainder when $$f(x)$$ is divided by $$(x-2)(x+1)$$.

:::

:::frq{id=precalc-polyratopt-10}
10. Find the monic polynomial with rational coefficients whose zeros include $$1+i$$ and $$2-\sqrt3$$.

:::

:::frq{id=precalc-polyratopt-11}
11. For $$R(x)=\dfrac{(x-2)(x+1)^2}{(x+1)(x-3)}$$, state the domain, hole, vertical asymptote, slant asymptote, and intercepts. Give a rough graph of this function.

:::

:::frq{id=precalc-polyratopt-12}
12. Solve in $$\mathbb{R}$$: $$\dfrac{(x-4)(x+1)^2}{(x-2)(x+1)}\le 0$$.

:::

:::frq{id=precalc-polyratopt-13}
13. A box with no top is made by cutting squares of side length $$x$$ from each corner of a $$24\text{ in}$$ by $$18\text{ in}$$ sheet and folding up the sides. Write the volume function, state the practical domain, and use a graph or calculator to approximate the value of $$x$$ that maximizes the volume.

:::

:::frq{id=precalc-polyratopt-14}
14. A machine's output is modeled by $$M(x)=\dfrac{150x}{x^2+25}$$ for $$x\ge 0$$. Use an algebraic method to find the maximum possible output and the input where it occurs.

:::

:::frq{id=precalc-polyratopt-15}
15. A farmer has $$240$$ feet of fencing to build three identical rectangular pens side-by-side, sharing interior fences. If the pens together form one large rectangle split by two parallel dividers, find the dimensions of the large rectangle that maximize the total area.

:::

:::frq{id=precalc-polyratopt-16}
16. (Bonus, Rational Root Theorem)
   In this unit, we have introduced the Rational Root Theorem as a quick way of finding rational roots. We will now get a chance to prove this theorem.
   Let
   $$
   f(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0
   $$
   have integer coefficients. Suppose $$\frac{p}{q}$$ is a rational zero in lowest terms. Note that $$a \mid b$$ means $$a$$ divides $$b$$ and $$gcd$$ means greatest common divisor.
   $$(A)$$ Substitute $$\frac{p}{q}$$ into $$f(x)=0$$ and multiply by $$q^n$$ and rearrange your equation to show that $$p\mid a_0q^n$$. Also explain why $$\gcd(p,q)=1$$ implies $$p\mid a_0$$.
   $$(B)$$ Rearrange the equation from part $$(A)$$ in a different way to show that $$q\mid a_np^n$$ and explain why $$\gcd(p,q)=1$$ implies $$q\mid a_n$$.
   $$(C)$$ State the Rational Root Theorem in words.

:::
:::
