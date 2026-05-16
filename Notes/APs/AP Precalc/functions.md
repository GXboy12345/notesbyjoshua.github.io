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

A **function** assigns each input exactly **one** output. If $$f$$ is a function and $$x$$ is an input, then $$f(x)$$ is the output.

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

## Domain and Range

### Finding Domains

Most domain work comes from asking what operations are legal.

- Denominators cannot be $$0$$.
- Even roots (e.g. square roots) require the inside expression to be nonnegative.
- Logarithms require the input to be positive.
- Contextual functions like parametrics may have extra restrictions, such as time $$t\ge 0$$ or length $$x>0$$.

Always keep track of domain restrictions, and the legal domain is everything that is not part of the domain restriction.

---

### Finding Ranges

The range is often harder than the domain because it asks what output values are possible. Useful strategies include:

- Graphing the function
- Rewriting the formula by completing the square
- finding the inverse function's domain
- using known parent-function behavior and transformations

<div class="theorem-box" markdown="1">

**Example.** Find the domain and range of

$$
g(x)=\frac{\sqrt{x^2+4x}}{x+2}.
$$

For the domain, first use the square-root restriction:

$$
x^2+4x\ge 0.
$$

Factor:

$$
x(x+4)\ge 0.
$$

Using a sign chart,

$$
x\le -4
\quad\text{or}\quad
x\ge 0.
$$

The denominator also cannot be $$0$$, so $$x\ne -2$$. But $$x=-2$$ is not in the radical domain anyway, so it does not change the answer:

$$
\text{domain}=(-\infty,-4]\cup[0,\infty).
$$

For the range, rewrite the expression inside the radical by completing the square:

$$
x^2+4x=(x+2)^2-4.
$$

So

$$
g(x)=\frac{\sqrt{(x+2)^2-4}}{x+2}.
$$

Let $$y=g(x)$$. Then

$$
y=\frac{\sqrt{(x+2)^2-4}}{x+2}.
$$

Square both sides:

$$
y^2
=\frac{(x+2)^2-4}{(x+2)^2}
=1-\frac{4}{(x+2)^2}.
$$

From the domain, $$x\le -4$$ or $$x\ge 0$$, so

$$
|x+2|\ge 2.
$$

That means

$$
0\le \frac{4}{(x+2)^2}\le 1,
$$

so

$$
0\le y^2<1.
$$

Therefore $$-1<y<1$$. The value $$y=0$$ occurs at $$x=-4$$ and $$x=0$$, while $$y=1$$ and $$y=-1$$ are approached but never reached. Therefore,

$$
\text{range}=(-1,1).
$$
</div>

---

## Graphs of Functions

A graph represents a function exactly when each $$x$$-value has at most one $$y$$-value. This is tested with the **vertical line test**.

If any vertical line intersects the graph more than once, the graph is not a function. A circle, for example, is not the graph of $$y$$ as a function of $$x$$ because many vertical lines hit it twice.

Six parent functions are especially useful to recognize:

- $$y= \lvert x \rvert$$: absolute value, V-shaped.
- $$y = x^2$$: quadratic, a parabola opening upward.
- $$y = x^3$$: cubic, increasing through the origin, kind of doing a wiggly motion.
- $$y=\frac{1}{x}$$: reciprocal, a rotated hyperbola with asymptotes $$x=0$$ and $$y=0$$.
- $$y=\sqrt{x}$$: square-root curve, starting at $$(0,0)$$ and moving right.

Knowing these shapes makes it much easier to sketch transformed functions quickly, and later we will talk about transformations so that most types of problems can be quickly visualized. A chart is shown below, with many of the functions appearing later (exponential, logarithmic, and trig).

<img class="note-img note-img--w480" src="{{ '/assets/APs/AP%20Precalc/parfunc.png' | relative_url }}" alt="parent functions" loading="lazy" decoding="async" />

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

<div class="theorem-box" markdown="1">

**Example.** Find the explicit forms for the relation

$$
(x^2+y^2)^2-8x(x^2-3y^2)+18(x^2+y^2)=27.
$$

This looks intimidating, but the trick is to notice that only even powers of $$y$$ appear. Let

$$
u=y^2.
$$

Then rewrite the equation in terms of $$u$$:

$$
(x^2+u)^2-8x(x^2-3u)+18(x^2+u)=27.
$$

Expand and collect powers of $$u$$:

$$
u^2+(2x^2+24x+18)u+x^4-8x^3+18x^2-27=0.
$$

Now this is quadratic in $$u$$. Its discriminant simplifies nicely:

$$
(2x^2+24x+18)^2-4(x^4-8x^3+18x^2-27)=16(2x+3)^3.
$$

Using the quadratic formula,

$$
u=-(x^2+12x+9)\pm 2\sqrt{(2x+3)^3}.
$$

Since $$u=y^2$$,

$$
y^2=-(x^2+12x+9)\pm 2\sqrt{(2x+3)^3}.
$$

Finally, take the square root of both sides. This gives four possible explicit branches:

$$
y=\sqrt{-(x^2+12x+9)+2\sqrt{(2x+3)^3}},
$$

$$
y=-\sqrt{-(x^2+12x+9)+2\sqrt{(2x+3)^3}},
$$

$$
y=\sqrt{-(x^2+12x+9)-2\sqrt{(2x+3)^3}},
$$

$$
y=-\sqrt{-(x^2+12x+9)-2\sqrt{(2x+3)^3}}.
$$

The first two branches come from

$$
-(x^2+12x+9)+2\sqrt{(2x+3)^3}\ge 0,
$$

which gives

$$
-\frac{3}{2}\le x\le 3.
$$

The last two branches come from

$$
-(x^2+12x+9)-2\sqrt{(2x+3)^3}\ge 0,
$$

which gives

$$
-\frac{3}{2}\le x\le -1.
$$

So the original relation is not one function of $$x$$. It is made from multiple explicit branches, with the outer $$\pm$$ giving the top and bottom halves.

</div>

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

If $$h$$ becomes very small, this approaches $$4x-1$$, which equals to the functions derivative (a calculus topic).

</div>

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

For $$f(x)= \lvert x \rvert$$, the vertex form

$$
y=a|x-h|+k
$$

has vertex $$(h,k)$$.

- $$a>0$$ opens upward.
- $$a<0$$ opens downward.
- Larger $$\lvert a \rvert$$ makes the graph steeper.
- Smaller $$\lvert a \rvert$$ makes the graph wider.

### Quadratic transformations

For $$f(x)=x^2$$, the vertex form

$$
y=a(x-h)^2+k
$$

has vertex $$(h,k)$$ and axis of symmetry $$x=h$$.

- $$a>0$$ opens upward.
- $$a<0$$ opens downward.
- Larger $$\lvert a \rvert$$ makes the parabola narrower.
- Smaller $$\lvert a \rvert$$ makes the parabola wider.

### Square-root transformations

For

$$
y=a\sqrt{x-h}+k,
$$

the starting point is $$(h,k)$$. The basic domain is $$x\ge h$$ unless there is a reflection inside the radical. All transformations behave the same except it changes the domain/range of the radical.

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

for every $$x$$ in the domain of $$f$$. *BOTH* conditions must be sastisfied!

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

in general. The expression $$x^{-1}$$ means $$1/x$$, but $$f^{-1}$$ means an inverse function. Sometimes you will see the inverse written as $$fp$$, but this can be confused with the derivative notation (used in calculus) and is seldom used.

---

## Finding an Inverse

To find the inverse of a function:

1. Write $$y=f(x)$$.
2. Switch $$x$$ and $$y$$.
3. Solve for $$y$$.
4. Replace $$y$$ with $$f^{-1}(x)$$.

It is very improtant to note that the domain of $$f$$ becomes the range of $$f^{-1}$$, and the range of $$f$$ becomes the domain of $$f^{-1}$$.

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

---

## Injective, Surjective, and Bijective Functions

A function has an inverse that is also a function only if the original function is **one-to-one**, also called **injective**.

A function is **injective** if different inputs always produce different outputs. Equivalently, every output that the function actually hits comes from exactly one input. In symbols,

$$
f(a)=f(b)\quad\Longrightarrow\quad a=b.
$$

Graphically, injective functions pass the **horizontal line test**: every horizontal line intersects the graph at most once.

A function is **surjective**, or **onto**, if every element of the target set is hit by the function. In other words, for every allowed output $$y$$ in the codomain, there is at least one input $$x$$ in the domain such that

$$
f(x)=y.
$$

Surjectivity depends on the codomain you choose. For example,

$$
f(x)=x^2
$$

is not surjective as a function from $$\mathbb{R}$$ to $$\mathbb{R}$$, because negative outputs are never reached. But it is surjective as a function from $$\mathbb{R}$$ to $$[0,\infty)$$.

A function is **bijective** if it is both injective and surjective. This means every output in the codomain is hit exactly once. Bijective functions have inverse functions that undo them perfectly on the stated domain and codomain.

For example,

$$
y=x^2
$$

is a function because it passes the vertical line test, but it is not injective on $$\mathbb{R}$$ because it fails the horizontal line test. Both $$x=2$$ and $$x=-2$$ give the same output $$4$$.

To make $$y=x^2$$ injective, restrict the domain. For example, on $$x\ge 0$$,

$$
f(x)=x^2
$$

is injective. If we define it as a function from $$[0,\infty)$$ to $$[0,\infty)$$, then it is also surjective, so it is bijective. Its inverse is

$$
f^{-1}(x)=\sqrt{x}.
$$

On $$x\le 0$$, its inverse would instead be

$$
f^{-1}(x)=-\sqrt{x}.
$$

Domain restrictions are how we choose one branch when a relation would otherwise give more than one output.

A quick map of bijectivity, surjectivity, and injectivity is shown below (this image only works well in light mode):

<img class="note-img note-img--w480" src="{{ '/assets/APs/AP%20Precalc/BIS.png' | relative_url }}" alt="BIS" loading="lazy" decoding="async" />

---

## Practice

1. Find the domain and range of

$$
f(x)=\frac{\sqrt{9-(x-2)^2}}{x-2}.
$$

2. Let

$$
f(x)=
\begin{cases}
x^2-4x+1, & x<1,\\
ax+b, & 1\le x<4,\\
\sqrt{x+c}, & x\ge 4.
\end{cases}
$$

Find $$a$$, $$b$$, and $$c$$ so that the pieces connect at $$x=1$$ and $$x=4$$, and so that the middle piece has average rate of change $$3$$ on $$[1,4]$$.

3. Find the explicit forms for the relation

$$
(x^2+y^2)^2=4(x^2-y^2).
$$

4. Let

$$
f(x)=\frac{1}{x^2-9}
\qquad\text{and}\qquad
g(x)=\sqrt{x+1}.
$$

Find $$(f\circ g)(x)$$ and its domain. Then find $$(g\circ f)(x)$$ and its domain.

5. Let

$$
f(x)=(x-3)^2+2
$$

with domain $$x\ge 3$$. Find $$f^{-1}(x)$$, and state the domain and range of $$f^{-1}$$.

6. Let

$$
f:[-2,\infty)\to[-4,\infty)
$$

be defined by

$$
f(x)=(x+2)^2-4.
$$

Determine whether $$f$$ is injective, surjective, bijective, or none.

7. Simplify the difference quotient for

$$
f(x)=\frac{2}{x-1}.
$$

That is, simplify

$$
\frac{f(x+h)-f(x)}{h}.
$$

8. The graph of $$y=f(x)$$ has domain $$[-4,6]$$ and range $$[-2,5]$$. Find the domain and range of

$$
g(x)=-3f(x-2)+7.
$$

9. Find all values of $$k$$ for which

$$
f(x)=\frac{x+k}{x^2-5x+6}
$$

has exactly one vertical asymptote. Then state the simplified function and its domain for each value of $$k$$.

10. Let

$$
h(x)=\sqrt{4-|x-1|}.
$$

Find the domain and range of $$h$$, and describe the transformations from $$y=\sqrt{x}$$ as clearly as possible.

## Solutions

### 1.

The square root requires

$$
9-(x-2)^2\ge 0.
$$

So

$$
-3\le x-2\le 3
\quad\Longrightarrow\quad
-1\le x\le 5.
$$

The denominator also requires $$x\ne 2$$. Therefore,

$$
\text{domain}=[-1,2)\cup(2,5].
$$

Let $$t=x-2$$. Then $$t\in[-3,0)\cup(0,3]$$, and

$$
f(x)=\frac{\sqrt{9-t^2}}{t}.
$$

On $$t>0$$, the function moves from very large positive values down to $$0$$. On $$t<0$$, the function moves from $$0$$ down to very large negative values. Thus,

$$
\text{range}=(-\infty,\infty).
$$

---

### 2.

The average rate of change of the middle piece $$ax+b$$ is its slope, so

$$
a=3.
$$

At $$x=1$$, the left piece gives

$$
1^2-4(1)+1=-2.
$$

So the middle piece must satisfy

$$
3(1)+b=-2,
$$

which gives

$$
b=-5.
$$

At $$x=4$$, the middle piece approaches

$$
3(4)-5=7.
$$

The radical piece must start at that same value:

$$
\sqrt{4+c}=7.
$$

So

$$
4+c=49
\quad\Longrightarrow\quad
c=45.
$$

Therefore,

$$
a=3,\qquad b=-5,\qquad c=45.
$$

---

### 3.

Let

$$
u=y^2.
$$

Then

$$
(x^2+u)^2=4(x^2-u).
$$

Expand:

$$
x^4+2x^2u+u^2=4x^2-4u.
$$

Move everything to one side:

$$
u^2+(2x^2+4)u+x^4-4x^2=0.
$$

Use the quadratic formula:

$$
u=\frac{-(2x^2+4)\pm\sqrt{(2x^2+4)^2-4(x^4-4x^2)}}{2}.
$$

The discriminant simplifies:

$$
(2x^2+4)^2-4(x^4-4x^2)=16(2x^2+1).
$$

So

$$
u=-(x^2+2)\pm 2\sqrt{2x^2+1}.
$$

Since $$u=y^2$$,

$$
y^2=-(x^2+2)+2\sqrt{2x^2+1}
$$

or

$$
y^2=-(x^2+2)-2\sqrt{2x^2+1}.
$$

The second expression is always negative, so it gives no real branches. Therefore,

$$
y=\pm\sqrt{-(x^2+2)+2\sqrt{2x^2+1}}.
$$

For real outputs, the inside must be nonnegative:

$$
-(x^2+2)+2\sqrt{2x^2+1}\ge 0.
$$

This simplifies to

$$
x^2\le 4.
$$

Thus the explicit branches are

$$
y=\sqrt{-(x^2+2)+2\sqrt{2x^2+1}}
$$

and

$$
y=-\sqrt{-(x^2+2)+2\sqrt{2x^2+1}},
$$

both on $$[-2,2]$$.

---

### 4.

First,

$$
(f\circ g)(x)=f(\sqrt{x+1})
=\frac{1}{(\sqrt{x+1})^2-9}
=\frac{1}{x-8}.
$$

The inside function $$g$$ requires $$x\ge -1$$, and the denominator requires $$x\ne 8$$. So

$$
\text{domain of }f\circ g=[-1,8)\cup(8,\infty).
$$

Now,

$$
(g\circ f)(x)=g\left(\frac{1}{x^2-9}\right)
=\sqrt{\frac{1}{x^2-9}+1}.
$$

Combine the expression inside the radical:

$$
\frac{1}{x^2-9}+1=\frac{x^2-8}{x^2-9}.
$$

So

$$
(g\circ f)(x)=\sqrt{\frac{x^2-8}{x^2-9}}.
$$

For the domain, require

$$
\frac{x^2-8}{x^2-9}\ge 0
$$

and $$x\ne \pm 3$$. The critical values are

$$
-3,\quad -2\sqrt{2},\quad 2\sqrt{2},\quad 3.
$$

A sign chart gives

$$
\text{domain of }g\circ f=(-\infty,-3)\cup[-2\sqrt2,2\sqrt2]\cup(3,\infty).
$$

---

### 5.

Start with

$$
y=(x-3)^2+2.
$$

Switch $$x$$ and $$y$$:

$$
x=(y-3)^2+2.
$$

Solve:

$$
x-2=(y-3)^2.
$$

Since the original domain is $$x\ge 3$$, use the positive branch:

$$
y-3=\sqrt{x-2}.
$$

Thus

$$
f^{-1}(x)=3+\sqrt{x-2}.
$$

The inverse domain is the original range:

$$
[2,\infty).
$$

The inverse range is the original domain:

$$
[3,\infty).
$$

---

### 6.

On $$[-2,\infty)$$, the parabola starts at its vertex and increases. Therefore, it passes the horizontal line test and is injective.

Its minimum value is

$$
f(-2)=-4.
$$

As $$x\to\infty$$, $$f(x)\to\infty$$, so the range is exactly

$$
[-4,\infty).
$$

This matches the codomain, so the function is surjective. Since it is both injective and surjective, it is bijective.

---

### 7.

First,

$$
f(x+h)=\frac{2}{x+h-1}.
$$

Then

$$
\frac{f(x+h)-f(x)}{h}
=
\frac{\frac{2}{x+h-1}-\frac{2}{x-1}}{h}.
$$

Use a common denominator:

$$
=\frac{\frac{2(x-1)-2(x+h-1)}{(x+h-1)(x-1)}}{h}.
$$

Simplify:

$$
2(x-1)-2(x+h-1)=-2h.
$$

So

$$
\frac{f(x+h)-f(x)}{h}
=\frac{\frac{-2h}{(x+h-1)(x-1)}}{h}.
$$

Cancel $$h$$:

$$
\frac{f(x+h)-f(x)}{h}
=\frac{-2}{(x+h-1)(x-1)}.
$$

---

### 8.

For the domain, the input $$x-2$$ must lie in $$[-4,6]$$:

$$
-4\le x-2\le 6.
$$

Add $$2$$:

$$
-2\le x\le 8.
$$

So

$$
\text{domain}=[-2,8].
$$

For the range, start with

$$
-2\le f(x)\le 5.
$$

Multiply by $$-3$$ and reverse the inequalities:

$$
6\ge -3f(x)\ge -15.
$$

Rewrite in increasing order and add $$7$$:

$$
-8\le -3f(x)+7\le 13.
$$

Thus

$$
\text{range}=[-8,13].
$$

---

### 9.

Factor the denominator:

$$
x^2-5x+6=(x-2)(x-3).
$$

To have exactly one vertical asymptote, the numerator must cancel exactly one denominator factor.

If $$x+k=x-2$$, then $$k=-2$$. The function becomes

$$
f(x)=\frac{x-2}{(x-2)(x-3)}=\frac{1}{x-3},
$$

but the original domain still excludes $$x=2$$ and $$x=3$$. Thus $$x=2$$ is a hole and $$x=3$$ is the only vertical asymptote:

$$
\text{domain}=(-\infty,2)\cup(2,3)\cup(3,\infty).
$$

If $$x+k=x-3$$, then $$k=-3$$. The function becomes

$$
f(x)=\frac{x-3}{(x-2)(x-3)}=\frac{1}{x-2},
$$

with original domain still excluding $$x=2$$ and $$x=3$$. Thus $$x=3$$ is a hole and $$x=2$$ is the only vertical asymptote:

$$
\text{domain}=(-\infty,2)\cup(2,3)\cup(3,\infty).
$$

Therefore,

$$
k=-2\quad\text{or}\quad k=-3.
$$

---

### 10.

For the domain, require

$$
4-|x-1|\ge 0.
$$

So

$$
|x-1|\le 4.
$$

This gives

$$
-4\le x-1\le 4,
$$

so

$$
\text{domain}=[-3,5].
$$

The largest value occurs when $$|x-1|=0$$:

$$
h(1)=\sqrt4=2.
$$

The smallest value occurs at the endpoints, where $$|x-1|=4$$:

$$
h(-3)=h(5)=0.
$$

Thus

$$
\text{range}=[0,2].
$$

This graph is a square-root graph applied to the expression $$4-|x-1|$$. It is symmetric about $$x=1$$, has maximum $$(1,2)$$, and has endpoints $$(-3,0)$$ and $$(5,0)$$. It is not a single basic transformation of $$y=\sqrt{x}$$; it is better understood as two square-root branches joined at $$x=1$$:

$$
h(x)=
\begin{cases}
\sqrt{x+3}, & -3\le x\le 1,\\
\sqrt{5-x}, & 1\le x\le 5.
\end{cases}
$$
