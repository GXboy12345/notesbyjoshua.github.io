---
layout: default
title: "Unit 4 & 13: Polynomial & Rational Functions and Applications to Optimization"
parent: AP Precalculus
nav_order: 3
permalink: /notes/ap/precalc/polyratopt/
---

# Unit 4 & 13: Polynomial & Rational Functions and Applications to Optimization

This unit is about building functions from algebra and then reading the algebra back into the graph. Polynomial functions are built from powers of $$x$$, rational functions are ratios of polynomials, and optimization problems ask us to choose the input that gives the largest or smallest possible output.

The order below follows the usual workflow:

1. start with basic polynomial families,
2. use degree, leading coefficient, and zeros to understand graphs,
3. use factoring theorems to find zeros,
4. extend the same ideas to rational functions,
5. build one-variable functions for optimization.

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

<div class="theorem-box" markdown="1">

**Example.** Find a linear function $$f$$ such that $$f(2)=1$$ and the graph of $$y=f(x)$$ is perpendicular to the graph of $$6x-3y=2$$.

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

</div>

### Quadratic functions

A **quadratic function** has the form

$$
f(x)=ax^{2}+bx+c,\qquad a\ne 0.
$$

Its graph is a parabola.

- If $$a>0$$, the parabola opens upward and has a minimum.
- If $$a<0$$, the parabola opens downward and has a maximum.

Sometimes it is useful to complete the square on a quadratic to see some of its properties.

<div class="theorem-box" markdown="1">

**Example.** Find the vertex of the quadratic $$ax^2+bx+c$$.

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
\left(-\frac{b}{2a},\,c-\frac{b^2}{4a}).
$$

This is vertex form:

$$
f(x)=a(x-h)^{2}+k,
$$

where the vertex is $$(h,k)$$.

</div>

If a function is built from this quadratic in a way that preserves order, the same input may still be optimal. For example,

$$
y=\sqrt{f(x)}
$$

is minimized at $$x=\frac12$$ because the square-root function is increasing, so the smallest legal value of $$f(x)$$ gives the smallest value of $$\sqrt{f(x)}$$. However, you have to be careful and always double-check your work for domain shifts or restrictions.

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

<div class="theorem-box" markdown="1">

**Example.** Suppose $$P(x)=2x^{4}+5x^{3}-38x^{2}+28x+24$$ and we are given that $$P(2)=0$$. Graph the polynomial.

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

Factoring the cubic further:

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

</div>

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

$$
x-m \text{ is a factor of } f(x)
\quad\Longleftrightarrow\quad
f(m)=0.
$$

So these statements all mean the same thing:

- $$m$$ is a zero of $$f$$,
- $$m$$ is a root of $$f(x)=0$$,
- $$(m,0)$$ is an $$x$$-intercept,
- $$x-m$$ is a factor of $$f(x)$$.

### Rational Root Theorem

The **Rational Root Theorem** helps list possible rational zeros. The Rational Root Theorem states that:

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

So possible rational zeros are

$$
\pm\frac{\text{factor of constant term}}{\text{factor of leading coefficient}}.
$$

#### Example

Find the possible rational zeros of

$$
f(x)=2x^{4}-x^{3}+7x^{2}+3x-3.
$$

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

<div class="theorem-box" markdown="1">

**Example.** Find the vertical asymptotes and holes of$$R(x)=\frac{(x-2)(x+1)}{(x-2)(x-3)}.$$

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

</div>

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

<div class="theorem-box" markdown="1">

Below are two common examples of rational polynomials and their horizontal asymptotes.

**Example 1.** Find the horizontal/slant asymptote of $$\frac{2x+3}{x-1}$$.

The numerator and debominator have equal degrees, so the horizontal asymptote is

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

**Example 2.** Find the horizontal/slant asymptote for $$R(x)=\frac{x^2+1}{x-2}.$$

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
\boxed{y=x+2}.
$$

</div>

### Graphing checklist for rational functions

To graph a rational function:

1. Factor numerator and denominator.
2. State the domain.
3. Cancel common factors, but remember holes.
4. Find vertical asymptotes from uncanceled denominator factors.
5. Find $$x$$- and $$y$$-intercepts.
6. Find horizontal, slant, or polynomial asymptotes.
7. Use sign charts and test points to place branches.

When graphing, always list out these key features! They will make graphing the rational function much easier to do.

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
7. Answer the original question with units.

<div class="theorem-box" markdown="1">

**Example (two numbers with fixed sum).**

Find two numbers that add to $$20$$ such that the sum of their squares is as small as possible.

Let the numbers be $$x$$ and $$20-x$$. The quantity to minimize is

$$
S(x)=x^2+(20-x)^2.
$$

Simplify:

$$
S(x)=x^2+400-40x+x^2
=2x^2-40x+400.
$$

This parabola opens upward, so its minimum occurs at

$$
x=-\frac{b}{2a}
=-\frac{-40}{2(2)}
=10.
$$

Thus the two numbers are

$$
\boxed{10\text{ and }10}.
$$

</div>

<div class="theorem-box" markdown="1">

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

</div>

<div class="theorem-box" markdown="1">

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

</div>

---

## Practice

1. Find the linear function $$f(x)$$ such that $$f(4)=-3$$ and the graph of $$y=f(x)$$ is parallel to $$5x+2y=8$$.
2. Let $$f(x)=mx+b$$. If $$f(a+b)=f(a)+f(b)$$ for all real numbers $$a,b$$, prove that the graph of $$f$$ passes through the origin.
3. Find the vertex, axis of symmetry, maximum/minimum value, and range of $$q(x)=-2x^2+12x-11$$.
4. Find the two real numbers with sum $$30$$ whose product is as large as possible.
5. Determine the degree, leading coefficient, end behavior, and maximum possible number of turning points for $$p(x)=-4x^{7}+2x^{5}-9x+1$$.
6. Sketch the main features of $$f(x)=-(x+2)(x-3)^2$$. Give the zeros, multiplicities, $$y$$-intercept, end behavior, and crossing/bouncing behavior.
7. Given $$P(x)=2x^4+5x^3-38x^2+28x+24$$ and $$P(2)=0$$, factor $$P(x)$$ completely over the real numbers.
8. List all possible rational zeros of $$f(x)=3x^4-2x^3+5x^2-4x+2$$.
9. Use the Remainder Theorem to find the remainder when $$f(x)=4x^5-3x^2+7x-10$$ is divided by $$x+2$$.
10. A real-coefficient polynomial of degree $$5$$ has zeros $$-2$$, $$4$$, $$1+i$$, and $$3-\sqrt5$$. Find the fifth zero and write one possible polynomial with these zeros.
11. For $$R(x)=\dfrac{(x-1)(x+4)}{(x-1)(x-3)}$$, state the domain, hole, vertical asymptote, horizontal asymptote, and intercepts.
12. For $$g(x)=\dfrac{x^2-4}{x+1}$$, find the domain, intercepts, vertical asymptote, and slant asymptote.
13. Solve in $$\mathbb{R}$$: $$\dfrac{x^2-9}{x^2-4x+3}\le 0$$.
14. A rectangle has perimeter $$96$$. Find the dimensions that maximize its area, and state the maximum area.
15. A box with no top is made by cutting squares of side length $$x$$ from each corner of a $$20\text{ in}$$ by $$12\text{ in}$$ sheet and folding up the sides. Write the volume as a function of $$x$$, state the practical domain, and use a calculator or graph to approximate the value of $$x$$ that maximizes the volume.
16. (Bonus, Rational Root Theorem)

Prove the Rational Root Theorem:

If

$$
f(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0
$$

has integer coefficients and $$\frac{p}{q}$$ is a rational zero in lowest terms, then $$p\mid a_0$$ and $$q\mid a_n$$.

---

## Solutions

### Solution 1

Rewrite the given line:

$$
5x+2y=8
\quad\Longrightarrow\quad
y=-\frac52x+4.
$$

A parallel line has slope $$-\frac52$$, so

$$
f(x)=-\frac52x+b.
$$

Use $$f(4)=-3$$:

$$
-3=-\frac52(4)+b=-10+b,
$$

so $$b=7$$. Therefore

$$
\boxed{f(x)=-\frac52x+7}.
$$

### Solution 2

Write

$$
f(x)=mx+b.
$$

Then

$$
f(a+b)=m(a+b)+b=ma+mb+b,
$$

while

$$
f(a)+f(b)=(ma+b)+(mb+b)=ma+mb+2b.
$$

These are equal for all $$a,b$$ only if

$$
b=2b,
$$

so $$b=0$$. Thus

$$
f(x)=mx
$$

and the graph passes through $$(0,0)$$.

### Solution 3

For

$$
q(x)=-2x^2+12x-11,
$$

we have $$a=-2$$ and $$b=12$$. The vertex's $$x$$-coordinate is

$$
x=-\frac{b}{2a}
=-\frac{12}{2(-2)}
=3.
$$

Then

$$
q(3)=-2(3)^2+12(3)-11=-18+36-11=7.
$$

The vertex is

$$
\boxed{(3,7)}.
$$

The axis of symmetry is

$$
\boxed{x=3}.
$$

Since $$a<0$$, the parabola opens downward, so the maximum value is

$$
\boxed{7}.
$$

The range is

$$
\boxed{(-\infty,7]}.
$$

### Solution 4

Let the numbers be $$x$$ and $$30-x$$. The product is

$$
P(x)=x(30-x)=30x-x^2.
$$

This parabola opens downward, so its maximum occurs at

$$
x=-\frac{30}{2(-1)}=15.
$$

The other number is also $$15$$. The maximum product is

$$
15\cdot 15=225.
$$

Thus the numbers are

$$
\boxed{15\text{ and }15}.
$$

### Solution 5

The highest power is $$x^7$$, so the degree is

$$
\boxed{7}.
$$

The leading coefficient is

$$
\boxed{-4}.
$$

The degree is odd and the leading coefficient is negative, so

$$
x\to -\infty \Rightarrow p(x)\to \infty,
\qquad
x\to \infty \Rightarrow p(x)\to -\infty.
$$

A degree $$7$$ polynomial has at most

$$
7-1=6
$$

turning points, so the maximum possible number is

$$
\boxed{6}.
$$

### Solution 6

The factored form is

$$
f(x)=-(x+2)(x-3)^2.
$$

The zeros are:

$$
x=-2
\quad\text{with multiplicity }1,
$$

and

$$
x=3
\quad\text{with multiplicity }2.
$$

The graph crosses at $$x=-2$$ and bounces at $$x=3$$.

The $$y$$-intercept is

$$
f(0)=-(2)(9)=-18,
$$

so it is

$$
\boxed{(0,-18)}.
$$

The degree is $$3$$, and the leading term is

$$
-x^3.
$$

Thus

$$
x\to -\infty \Rightarrow f(x)\to \infty,
\qquad
x\to \infty \Rightarrow f(x)\to -\infty.
$$

### Solution 7

Since $$P(2)=0$$, divide by $$x-2$$:

$$
\begin{array}{r|rrrrr}
2 & 2 & 5 & -38 & 28 & 24\\
  &   & 4 & 18 & -40 & -24\\ \hline
  & 2 & 9 & -20 & -12 & 0
\end{array}
$$

So

$$
P(x)=(x-2)(2x^3+9x^2-20x-12).
$$

The cubic is not friendly by grouping:

$$
2x^3+9x^2-20x-12
=x^2(2x+9)-4(5x+3),
$$

so test another rational root. Since $$x=2$$ works again,

$$
\begin{array}{r|rrrr}
2 & 2 & 9 & -20 & -12\\
  &   & 4 & 26 & 12\\ \hline
  & 2 & 13 & 6 & 0
\end{array}
$$

Thus

$$
P(x)=(x-2)^2(2x^2+13x+6).
$$

Now factor:

$$
2x^2+13x+6=(2x+1)(x+6).
$$

Therefore

$$
\boxed{P(x)=(x-2)^2(2x+1)(x+6)}.
$$

### Solution 8

The constant term is $$2$$ and the leading coefficient is $$3$$.

Thus

$$
p=\pm1,\pm2
\qquad\text{and}\qquad
q=\pm1,\pm3.
$$

The possible rational zeros are

$$
\boxed{\pm1,\ \pm2,\ \pm\frac13,\ \pm\frac23}.
$$

### Solution 9

Dividing by $$x+2$$ means dividing by $$x-(-2)$$, so the remainder is $$f(-2)$$.

$$
f(-2)=4(-2)^5-3(-2)^2+7(-2)-10.
$$

Compute:

$$
4(-32)-3(4)-14-10
=-128-12-14-10
=-164.
$$

The remainder is

$$
\boxed{-164}.
$$

### Solution 10

Since the polynomial has real coefficients, the complex conjugate of $$1+i$$ must also be a zero:

$$
\boxed{1-i}.
$$

If the problem had said rational coefficients, then $$3+\sqrt5$$ would also be required. But the problem only said real coefficients, so the necessary fifth zero is only $$1-i$$.

One possible real-coefficient polynomial is

$$
\boxed{(x+2)(x-4)\bigl(x-(1+i)\bigr)\bigl(x-(1-i)\bigr)\bigl(x-(3-\sqrt5)\bigr)}.
$$

Since

$$
\bigl(x-(1+i)\bigr)\bigl(x-(1-i)\bigr)=(x-1)^2+1,
$$

this can also be written as

$$
\boxed{(x+2)(x-4)\bigl((x-1)^2+1\bigr)(x-3+\sqrt5)}.
$$

### Solution 11

Start with

$$
R(x)=\frac{(x-1)(x+4)}{(x-1)(x-3)}.
$$

The original denominator is zero at $$x=1$$ and $$x=3$$, so the domain is

$$
\boxed{x\ne 1,3}.
$$

Cancel the common factor:

$$
R(x)=\frac{x+4}{x-3},
\qquad x\ne 1,3.
$$

The canceled factor creates a hole at $$x=1$$. Its $$y$$-value is

$$
\frac{1+4}{1-3}=-\frac52,
$$

so the hole is

$$
\boxed{\left(1,-\frac52\right)}.
$$

The uncanceled denominator gives the vertical asymptote:

$$
\boxed{x=3}.
$$

The degrees are equal, so the horizontal asymptote is the ratio of leading coefficients:

$$
\boxed{y=1}.
$$

The $$x$$-intercept comes from the simplified numerator:

$$
x+4=0
\quad\Longrightarrow\quad
x=-4,
$$

so the $$x$$-intercept is

$$
\boxed{(-4,0)}.
$$

The $$y$$-intercept is

$$
R(0)=\frac{(-1)(4)}{(-1)(-3)}=-\frac43,
$$

so it is

$$
\boxed{\left(0,-\frac43\right)}.
$$

### Solution 12

The function is

$$
g(x)=\frac{x^2-4}{x+1}.
$$

The domain is

$$
\boxed{x\ne -1}.
$$

Factor the numerator:

$$
g(x)=\frac{(x-2)(x+2)}{x+1}.
$$

There is no common factor, so $$x=-1$$ is a vertical asymptote:

$$
\boxed{x=-1}.
$$

The $$x$$-intercepts are

$$
\boxed{(-2,0)\text{ and }(2,0)}.
$$

The $$y$$-intercept is

$$
g(0)=\frac{-4}{1}=-4,
$$

so it is

$$
\boxed{(0,-4)}.
$$

Divide to find the slant asymptote:

$$
\frac{x^2-4}{x+1}
=x-1-\frac{3}{x+1}.
$$

Thus the slant asymptote is

$$
\boxed{y=x-1}.
$$

### Solution 13

Factor:

$$
\frac{x^2-9}{x^2-4x+3}
=\frac{(x-3)(x+3)}{(x-1)(x-3)}.
$$

The domain excludes

$$
x=1,\ 3.
$$

For sign-chart purposes, use the original critical numbers:

$$
-3,\ 1,\ 3.
$$

After canceling the common factor, the expression equals

$$
\frac{x+3}{x-1}
$$

except there is still a hole at $$x=3$$.

Test intervals:

- On $$(-\infty,-3)$$, the expression is positive.
- At $$x=-3$$, the expression is $$0$$, so include it.
- On $$(-3,1)$$, the expression is negative.
- At $$x=1$$, the expression is undefined.
- On $$(1,3)$$, the expression is positive.
- At $$x=3$$, the expression is undefined.
- On $$(3,\infty)$$, the expression is positive.

Therefore the solution is

$$
\boxed{[-3,1)}.
$$

### Solution 14

Let the rectangle have length $$x$$ and width $$y$$. Since the perimeter is $$96$$,

$$
2x+2y=96
\quad\Longrightarrow\quad
x+y=48.
$$

Thus

$$
y=48-x.
$$

The area is

$$
A(x)=x(48-x)=48x-x^2.
$$

This parabola opens downward, so its maximum occurs at

$$
x=-\frac{48}{2(-1)}=24.
$$

Then

$$
y=48-24=24.
$$

The maximum area is

$$
24\cdot 24=576.
$$

Thus the rectangle is a square with dimensions

$$
\boxed{24\text{ by }24}
$$

and maximum area

$$
\boxed{576}.
$$

### Solution 15

Cutting squares of side length $$x$$ from a $$20$$ by $$12$$ sheet leaves box dimensions:

$$
\text{length}=20-2x,
$$

$$
\text{width}=12-2x,
$$

$$
\text{height}=x.
$$

So the volume is

$$
V(x)=x(20-2x)(12-2x).
$$

The practical domain requires all dimensions to be positive:

$$
x>0,\qquad 20-2x>0,\qquad 12-2x>0.
$$

Thus

$$
\boxed{0<x<6}.
$$

Expanding,

$$
V(x)=4x^{3}-64x^{2}+240x.
$$

Using a graph or calculator on $$0<x<6$$, the maximum occurs at approximately

$$
\boxed{x\approx 2.39\text{ in}}.
$$

The maximum volume is approximately

$$
V(2.39)\approx 262.7\text{ in}^3.
$$

### Solution 16

Suppose

$$
\frac{p}{q}
$$

is a rational zero of $$f$$ in lowest terms, so $$\gcd(p,q)=1$$ and $$q\ne 0$$.

Then

$$
a_n\left(\frac{p}{q}\right)^n
+a_{n-1}\left(\frac{p}{q}\right)^{n-1}
+\cdots
+a_1\left(\frac{p}{q}\right)+a_0=0.
$$

Multiply by $$q^n$$:

$$
a_np^n+a_{n-1}p^{n-1}q+\cdots+a_1pq^{n-1}+a_0q^n=0.
$$

Move the constant-term part to the other side:

$$
a_np^n+a_{n-1}p^{n-1}q+\cdots+a_1pq^{n-1}=-a_0q^n.
$$

Every term on the left has a factor of $$p$$, so $$p$$ divides the left side. Therefore $$p$$ divides the right side:

$$
p\mid a_0q^n.
$$

Since $$p$$ and $$q$$ are relatively prime, $$p$$ is relatively prime to $$q^n$$. Therefore

$$
\boxed{p\mid a_0}.
$$

Now move the leading-term part to the other side:

$$
a_{n-1}p^{n-1}q+\cdots+a_1pq^{n-1}+a_0q^n=-a_np^n.
$$

Every term on the left has a factor of $$q$$, so $$q$$ divides the right side:

$$
q\mid a_np^n.
$$

Since $$p$$ and $$q$$ are relatively prime, $$q$$ is relatively prime to $$p^n$$. Therefore

$$
\boxed{q\mid a_n}.
$$

This proves the Rational Root Theorem.
