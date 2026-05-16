---
layout: default
title: "Unit 3: Functions"
parent: AP Precalculus
nav_order: 2
permalink: /notes/ap/precalc/functions/
---

# Unit 3: Functions

Functions are a way to describe dependence: one quantity is chosen as an input, and the rule returns exactly one output. In AP Precalculus, the most important habits are reading a function from multiple representations, keeping track of domain restrictions, and understanding how graphs change when the formula changes.

---

## Definition of a Function

A **function** assigns each input exactly one output. If $$f$$ is a function and $$x$$ is an input, then $$f(x)$$ is the output.

The **domain** is the set of all allowed inputs. The **range** is the set of all outputs the function actually produces.

For example,

$$
f(x)=x^2+4x=x(x+4)
$$

has domain $$(-\infty,\infty)$$ because every real number can be substituted. To find the range, complete the square:

$$
f(x)=x^2+4x=(x+2)^2-4.
$$

Since $$(x+2)^2\ge 0$$, the smallest possible value is $$-4$$. Therefore,

$$
\text{range}=[-4,\infty).
$$

---

## Domain Restrictions

Most domain work comes from asking what operations are legal.

- Denominators cannot be $$0$$.
- Even roots require the inside expression to be nonnegative.
- Logarithms require the input to be positive.
- Contextual functions may have extra restrictions, such as time $$t\ge 0$$ or length $$x>0$$.

For a rational function such as

$$
g(x)=\frac{1}{x^2+4x},
$$

the denominator cannot equal $$0$$:

$$
x^2+4x=x(x+4)\ne 0.
$$

So $$x\ne 0$$ and $$x\ne -4$$, giving

$$
\text{domain}=(-\infty,-4)\cup(-4,0)\cup(0,\infty).
$$

For a radical function such as

$$
h(x)=\sqrt{x^2+4x},
$$

the radicand must be nonnegative:

$$
x^2+4x\ge 0
\quad\Longrightarrow\quad
x(x+4)\ge 0.
$$

Using a sign chart,

$$
\text{domain}=(-\infty,-4]\cup[0,\infty).
$$

---

## Range

The range is often harder than the domain because it asks what output values are possible. Useful strategies include:

- graphing the function,
- rewriting the formula by completing the square,
- solving $$y=f(x)$$ for $$x$$ and seeing which $$y$$-values allow real solutions,
- using known parent-function behavior and transformations.

For

$$
g(x)=\frac{1}{x^2+4x},
$$

rewrite the denominator:

$$
x^2+4x=(x+2)^2-4.
$$

The denominator can be any value in $$[-4,\infty)$$ except $$0$$. Therefore $$g(x)=1/u$$ where $$u\in[-4,\infty)$$ and $$u\ne 0$$. This gives

$$
\text{range}=(-\infty,-1/4]\cup(0,\infty).
$$

The missing interval $$(-1/4,0]$$ occurs because the denominator cannot be less than $$-4$$ and cannot equal $$0$$.

---

## Graphs of Functions

A graph represents a function exactly when each $$x$$-value has at most one $$y$$-value. This is tested with the **vertical line test**.

If any vertical line intersects the graph more than once, the graph is not a function. A circle, for example, is not the graph of $$y$$ as a function of $$x$$ because many vertical lines hit it twice.

Six parent functions are especially useful to recognize:

- $$y=|x|$$: absolute value, V-shaped.
- $$y=x^2$$: quadratic, a parabola opening upward.
- $$y=x^3$$: cubic, increasing through the origin.
- $$y=\frac{1}{x}$$: reciprocal, a hyperbola with asymptotes $$x=0$$ and $$y=0$$.
- $$y=\sqrt{x}$$: square-root curve, starting at $$(0,0)$$ and moving right.
- $$y=\sqrt{1-x^2}$$: the top half of the unit circle $$x^2+y^2=1$$.

Knowing these shapes makes it much easier to sketch transformed functions quickly.

---

## Piecewise Functions

A **piecewise function** uses different formulas on different parts of its domain. The rule depends on which interval contains the input.

For example,

$$
f(x)=
\begin{cases}
\dfrac{1}{x}, & x>2,\\[4pt]
\dfrac{1}{2}x^2, & x\le 2.
\end{cases}
$$

To graph it, graph each formula only on the part of the domain where it applies. Endpoints matter:

- use a closed dot when the endpoint is included,
- use an open dot when the endpoint is not included.

At $$x=2$$, the second rule applies because $$x\le 2$$. Therefore,

$$
f(2)=\frac{1}{2}(2)^2=2.
$$

The reciprocal rule would approach $$1/2$$ near $$x=2$$ from the right, but it does not include $$x=2$$.

---

## Implicit Functions

Some equations describe relationships between $$x$$ and $$y$$ without directly solving for $$y$$. These are called **implicit equations**. For example,

$$
x^2+y^2=1
$$

describes a circle, not a function of $$x$$, because many $$x$$-values have two possible $$y$$-values.

Sometimes an implicit equation can be solved for $$y$$, but it may produce multiple branches. If solving gives

$$
y=\pm\sqrt{1-x^2},
$$

then the plus branch is the top half of the circle and the minus branch is the bottom half. Each branch is a function, but the whole circle is not.

When an equation is complicated but quadratic in $$y$$, it can sometimes be rearranged into

$$
ay^2+by+c=0,
$$

where $$a$$, $$b$$, and $$c$$ may contain $$x$$. Then the quadratic formula gives

$$
y=\frac{-b\pm\sqrt{b^2-4ac}}{2a}.
$$

The $$\pm$$ is a warning that the relation may split into two separate function branches.

---

## Average Rate of Change

The **average rate of change** of $$f$$ on $$[a,b]$$ is the slope of the secant line through $$(a,f(a))$$ and $$(b,f(b))$$:

$$
\frac{\Delta y}{\Delta x}
=\frac{f(b)-f(a)}{b-a}.
$$

If the interval is written as $$[x,x+h]$$, then the same idea becomes the **difference quotient**:

$$
\frac{f(x+h)-f(x)}{h}.
$$

This measures the average rate of change from $$x$$ to $$x+h$$.

<div class="theorem-box" markdown="1">

**Example.** Let

$$
f(x)=2x^2-x+1.
$$

Find the average rate of change from $$a$$ to $$x$$:

$$
\frac{f(x)-f(a)}{x-a}
=\frac{(2x^2-x+1)-(2a^2-a+1)}{x-a}.
$$

Simplify the numerator:

$$
2x^2-x+1-2a^2+a-1
=2(x^2-a^2)-(x-a).
$$

Factor:

$$
2(x-a)(x+a)-(x-a)
=(x-a)(2x+2a-1).
$$

So

$$
\frac{f(x)-f(a)}{x-a}=2x+2a-1,\qquad x\ne a.
$$

</div>

For the difference quotient of the same function,

$$
\frac{f(x+h)-f(x)}{h}
=\frac{2(x+h)^2-(x+h)+1-(2x^2-x+1)}{h}.
$$

After expanding and canceling,

$$
\frac{f(x+h)-f(x)}{h}
=4x+2h-1.
$$

If $$h$$ becomes very small, this approaches $$4x-1$$, which previews the derivative in calculus.

---

## Transformations of Functions

Transformations move or change a graph while preserving the basic shape of the parent function.

If $$c>0$$:

- $$y=f(x)+c$$ shifts the graph up $$c$$ units.
- $$y=f(x)-c$$ shifts the graph down $$c$$ units.
- $$y=f(x+c)$$ shifts the graph left $$c$$ units.
- $$y=f(x-c)$$ shifts the graph right $$c$$ units.
- $$y=-f(x)$$ reflects the graph over the $$x$$-axis.
- $$y=f(-x)$$ reflects the graph over the $$y$$-axis.

The input changes happen in the opposite direction from how they look. For example, $$f(x-3)$$ shifts right $$3$$ because the inside of the function reaches the old input value when $$x$$ is $$3$$ larger.

### Absolute value transformations

For $$f(x)=|x|$$, the vertex form

$$
y=a|x-h|+k
$$

has vertex $$(h,k)$$.

- $$a>0$$ opens upward.
- $$a<0$$ opens downward.
- Larger $$|a|$$ makes the graph steeper.
- Smaller $$|a|$$ makes the graph wider.

### Quadratic transformations

For $$f(x)=x^2$$, the vertex form

$$
y=a(x-h)^2+k
$$

has vertex $$(h,k)$$ and axis of symmetry $$x=h$$.

- $$a>0$$ opens upward.
- $$a<0$$ opens downward.
- Larger $$|a|$$ makes the parabola narrower.
- Smaller $$|a|$$ makes the parabola wider.

### Square-root transformations

For

$$
y=a\sqrt{x-h}+k,
$$

the starting point is $$(h,k)$$. The basic domain is $$x\ge h$$ unless there is a reflection inside the radical.

For example,

$$
f(x)=\sqrt{-x+3}
$$

requires

$$
-x+3\ge 0
\quad\Longrightarrow\quad
x\le 3.
$$

So the graph starts at $$(3,0)$$ and extends left.

---

## Combining Functions

Functions can be combined using arithmetic operations:

$$
(f+g)(x)=f(x)+g(x)
$$

$$
(f-g)(x)=f(x)-g(x)
$$

$$
(fg)(x)=f(x)g(x)
$$

$$
\left(\frac{f}{g}\right)(x)=\frac{f(x)}{g(x)},\qquad g(x)\ne 0.
$$

The domain of a combined function is the intersection of the domains of the pieces, with any extra restrictions from the operation. For a quotient, the denominator must not be $$0$$.

For example, if

$$
f(x)=\frac{1}{x^2-2},
\qquad
g(x)=\sqrt{x},
\qquad
h(x)=\frac{1}{x},
$$

then

$$
\text{domain of }f: x\ne \pm\sqrt{2},
$$

$$
\text{domain of }g: x\ge 0,
$$

$$
\text{domain of }h: x\ne 0.
$$

Any arithmetic combination must respect the restrictions from all functions involved.

---

## Composition of Functions

The composition $$f\circ g$$ means "apply $$g$$ first, then apply $$f$$":

$$
(f\circ g)(x)=f(g(x)).
$$

Composition is not usually commutative, so $$f(g(x))$$ and $$g(f(x))$$ are usually different.

<div class="theorem-box" markdown="1">

**Example.** Let

$$
f(x)=\frac{1}{x^2-2}
\qquad\text{and}\qquad
g(x)=\sqrt{x}.
$$

Then

$$
(f\circ g)(x)=f(\sqrt{x})
=\frac{1}{(\sqrt{x})^2-2}
=\frac{1}{x-2}.
$$

The domain must satisfy both conditions:

1. $$x$$ must be in the domain of $$g$$, so $$x\ge 0$$.
2. $$g(x)$$ must be in the domain of $$f$$, so $$(\sqrt{x})^2-2\ne 0$$, meaning $$x\ne 2$$.

Therefore,

$$
\text{domain}=[0,2)\cup(2,\infty).
$$

</div>

For

$$
(g\circ f)(x)=g(f(x)),
$$

the domain would be different because $$f$$ is the inside function and the output of $$f$$ must be allowed inside the square root.

---

## Writing a Function as a Composition

Sometimes a complicated formula can be understood as one function inside another.

For example,

$$
F(x)=(3x-2)^2
$$

can be written as

$$
F(x)=h(g(x)),
$$

where

$$
g(x)=3x-2
\qquad\text{and}\qquad
h(x)=x^2.
$$

Another valid decomposition is

$$
g(x)=3x
\qquad\text{and}\qquad
h(x)=(x-2)^2.
$$

There may be more than one correct way to express a function as a composition.

---

## Inverse Functions

Two functions $$f$$ and $$g$$ are **inverse functions** if they undo each other:

$$
f(g(x))=x
$$

for every $$x$$ in the domain of $$g$$, and

$$
g(f(x))=x
$$

for every $$x$$ in the domain of $$f$$.

For example, let

$$
f(x)=3x-2
\qquad\text{and}\qquad
g(x)=\frac{1}{3}x+\frac{2}{3}.
$$

Then

$$
f(g(x))=3\left(\frac{1}{3}x+\frac{2}{3}\right)-2=x+2-2=x,
$$

and

$$
g(f(x))=\frac{1}{3}(3x-2)+\frac{2}{3}
=x-\frac{2}{3}+\frac{2}{3}
=x.
$$

So $$f$$ and $$g$$ are inverses.

The notation $$f^{-1}(x)$$ means "the inverse function of $$f$$." It does **not** mean reciprocal. In other words,

$$
f^{-1}(x)\ne \frac{1}{f(x)}
$$

in general. The expression $$x^{-1}$$ means $$1/x$$, but $$f^{-1}$$ means an inverse function.

---

## Finding an Inverse

To find the inverse of a function:

1. Write $$y=f(x)$$.
2. Switch $$x$$ and $$y$$.
3. Solve for $$y$$.
4. Replace $$y$$ with $$f^{-1}(x)$$.

<div class="theorem-box" markdown="1">

**Example.** Find the inverse of

$$
f(x)=\frac{2x+1}{3x-4}.
$$

Start with

$$
y=\frac{2x+1}{3x-4}.
$$

Switch $$x$$ and $$y$$:

$$
x=\frac{2y+1}{3y-4}.
$$

Solve for $$y$$:

$$
x(3y-4)=2y+1
$$

$$
3xy-4x=2y+1
$$

$$
3xy-2y=4x+1
$$

$$
y(3x-2)=4x+1
$$

$$
y=\frac{4x+1}{3x-2}.
$$

Therefore,

$$
f^{-1}(x)=\frac{4x+1}{3x-2}.
$$

</div>

The domain of $$f$$ becomes the range of $$f^{-1}$$, and the range of $$f$$ becomes the domain of $$f^{-1}$$.

---

## One-to-One Functions

A function has an inverse that is also a function only if the original function is **one-to-one**.

A function is one-to-one if every output comes from exactly one input. In symbols,

$$
f(a)=f(b)\quad\Longrightarrow\quad a=b.
$$

Graphically, one-to-one functions pass the **horizontal line test**: every horizontal line intersects the graph at most once.

For example,

$$
y=x^2
$$

is a function because it passes the vertical line test, but it is not one-to-one because it fails the horizontal line test. Both $$x=2$$ and $$x=-2$$ give the same output $$4$$.

To make $$y=x^2$$ one-to-one, restrict the domain. For example, on $$x\ge 0$$,

$$
f(x)=x^2
$$

has inverse

$$
f^{-1}(x)=\sqrt{x}.
$$

On $$x\le 0$$, its inverse would instead be

$$
f^{-1}(x)=-\sqrt{x}.
$$

Domain restrictions are how we choose one branch when a relation would otherwise give more than one output.

---

## Solving With Inverses

Inverse functions are useful because they undo each other. If

$$
f(2)=3,
$$

then

$$
f^{-1}(3)=2.
$$

For example, suppose

$$
-4+f^{-1}(x-1)=-2
$$

and you know $$f(2)=3$$. Then

$$
f^{-1}(x-1)=2.
$$

Apply $$f$$ to both sides:

$$
f(f^{-1}(x-1))=f(2).
$$

So

$$
x-1=3
\quad\Longrightarrow\quad
x=4.
$$

The key idea is that $$f$$ and $$f^{-1}$$ cancel when the inputs are in the correct domains.
