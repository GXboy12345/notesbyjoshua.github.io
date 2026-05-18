---
layout: default
title: "Unit 5: Exponential & Logarithmic Functions"
parent: AP Precalculus
nav_order: 4
permalink: /notes/ap/precalc/explog/
---

# Unit 5: Exponential & Logarithmic Functions

---

## Exponential functions

An **exponential function** has the form

$$
y=b^x,
$$

where

$$
b>0
\qquad\text{and}\qquad
b\ne 1.
$$

The base $$b$$ is constant, and the variable is in the exponent. This is different from a power function like

$$
y=x^n,
$$

where the base is variable and the exponent is constant.

We require $$b>0$$ because negative bases can break continuity over the real numbers. For example, with

$$
y=(-2)^x,
$$

integer inputs are fine, but many fractional inputs are not real-valued in a consistent way. We also exclude $$b=1$$ because

$$
y=1^x=1
$$

is just a constant function, not exponential growth or decay.

### Growth and decay

For

$$
y=b^x,
$$

there are two basic shapes:

- If $$b>1$$, the function is increasing and represents **exponential growth**.
- If $$0<b<1$$, the function is decreasing and represents **exponential decay**.

Both have:

- Domain: $$(-\infty,\infty)$$.
- Range: $$(0,\infty)$$.
- Horizontal asymptote: $$y=0$$.
- $$y$$-intercept: $$(0,1)$$.

The decay case can always be rewritten using a reciprocal base:

$$
b^{-x}=\left(\frac1b\right)^x.
$$

For example,

$$
2^{-x}=\left(\frac12\right)^x.
$$

But, you should always be careful with signs:

$$
-2^x=-(2^x),
$$

which is a reflection of $$2^x$$ over the $$x$$-axis. It is not the same as $$(-2)^x$$.

### Transformations

A transformed exponential function often looks like

$$
y=a\cdot b^{x-h}+k.
$$

The transformation rules are the same as other parent functions:

- $$a$$ vertically stretches/compresses and reflects over the $$x$$-axis if $$a<0$$.
- $$h$$ shifts the graph horizontally.
- $$k$$ shifts the graph vertically.

The horizontal asymptote moves from $$y=0$$ to

$$
y=k.
$$

A good idea is to always plot a couple of integer points to start with.

<div class="theorem-box" markdown="1">

**Example.** Graph the function and give the domain and range of

$$
y=\frac12(4)^{x-3}+2.
$$

The parent function $$4^x$$ is exponential growth because $$4>1$$. The expression $$x-3$$ shifts the graph right $$3$$ units, the factor $$\frac12$$ vertically compresses it, and the $$+2$$ shifts it up $$2$$ units.

The horizontal asymptote is

$$
y=2.
$$

The domain is

$$
(-\infty,\infty).
$$

Since $$\frac12(4)^{x-3}>0$$ for every real $$x$$, the range is

$$
(2,\infty).
$$

The graph is shown below (Note that the scale is a bit off, the dashed line is the horizontal asymptote):

<img class="note-img note-img--w480" src="{{ '/assets/APs/AP%20Precalc/expgraph1.png' | relative_url }}" alt="parent functions" loading="lazy" decoding="async" />

</div>

---

## The natural exponential function

The **natural exponential function** is defined as

$$
y=e^x,
$$

where $$e$$ (Euler's number) is a special constant. One property of $$e$$ is that:

$$
e=\lim_{x\to\infty}\left(1+\frac1x\right)^x.
$$

Numerically, as $$x$$ gets very large, the expression gets closer and closer to $$e$$. After plugging in larger and larger values of $$x$$, you find that $$e\approx 2.71828$$. In addition, the instantaneous rate of change of $$y=e^x$$ is equal to itself! We will demonstrate this below:

<div class="theorem-box" markdown="1">

**Example.** Approximate the rate of change of $$e^x$$ for smaller and smaller intervals.

Rhe average rate of change on $$[1,1.1]$$ is

$$
\frac{e^{1.1}-e^1}{1.1-1}\approx 2.8588.
$$

On smaller intervals:

$$
[1,1.01]\quad\Rightarrow\quad 2.7319,
$$

$$
[1,1.001]\quad\Rightarrow\quad 2.7196,
$$

$$
[1,1.0000001]\quad\Rightarrow\quad 2.71829.
$$

As the interval gets smaller, the rate of change becomes increasingly instantaneous. One reason why $$e^x$$ is studied so much is topics like calculus is that it is equal to its own instantaneous rate of change, like derivatives!

</div>

$$e^x$$ is an exponential growth function because $$e>1$$. Like other exponential functions, it has domain $$(-\infty,\infty)$$, range $$(0,\infty)$$, horizontal asymptote $$y=0$$, and $$y$$-intercept $$(0,1)$$.

### Hyperbolic sine and cosine

The exponential function also appears in the definitions of the hyperbolic sine and hyperbolic cosine functions:

$$
\sinh x=\frac12(e^x-e^{-x}),
$$

and

$$
\cosh x=\frac12(e^x+e^{-x}).
$$

These are pronounced "cinch" and "cosh." They behave somewhat like trigonometric functions, but they are built from exponentials.

<div class="theorem-box" markdown="1">

**Example.** Show that

$$
(\cosh x)^2=\frac12(\cosh(2x)+1).
$$

Using the definition,

$$
(\cosh x)^2
=\left(\frac12(e^x+e^{-x})\right)^2.
$$

Square:

$$
(\cosh x)^2
=\frac14(e^{2x}+2+e^{-2x}).
$$

Rewrite:

$$
\frac14(e^{2x}+2+e^{-2x})
=\frac12\left(\frac12(e^{2x}+e^{-2x})+1\right).
$$

Since

$$
\cosh(2x)=\frac12(e^{2x}+e^{-2x}),
$$

we get

$$
(\cosh x)^2=\frac12(\cosh(2x)+1).
$$

</div>

Similarly,

$$
(\sinh x)^2=\frac12(\cosh(2x)-1).
$$

---

## Logarithmic functions

A **logarithm** is the inverse function of an exponent. The expression

$$
y = \log_b x
$$

means "$$y$$ is the the exponent you put on $$b$$ to get $$x$$."

In equation form:

$$
\log_b x=y
\quad\Longleftrightarrow\quad
b^y=x.
$$

The base must satisfy

$$
b>0
\qquad\text{and}\qquad
b\ne 1.
$$

The input must satisfy

$$
x>0.
$$

So the parent logarithmic function

$$
y=\log_b x
$$

has:

- Domain: $$(0,\infty)$$.
- Range: $$(-\infty,\infty)$$.
- Vertical asymptote: $$x=0$$.
- $$x$$-intercept: $$(1,0)$$.

Note that this is the opposite of the exponent function, which is expected since they are inverses! Accordingly, the graph of $$y=\log_b x$$ is the reflection of $$y=b^x$$ across the line $$y=x$$.

<div class="theorem-box" markdown="1">

**Example.** Evaluate each logarithm.

$$
1. \log_3 9
2. \log_5\left(\frac1{25}\right)
3. \log_8 32
$$

First,

$$
\log_3 9=2
$$

because

$$
3^2=9.
$$

Also,

$$
\log_5\left(\frac1{25}\right)=-2
$$

because

$$
5^{-2}=\frac1{25}.
$$

Finally,

$$
\log_8 32=\frac53
$$

because

$$
8^{5/3}=(2^3)^{5/3}=2^5=32.
$$

</div>

### Increasing and decreasing logs

For

$$
y=\log_b x,
$$

the shape depends on the base:

- If $$b>1$$, then $$\log_b x$$ is increasing.
- If $$0<b<1$$, then $$\log_b x$$ is decreasing.

This matters for inequalities. If $$b>1$$, then

$$
\log_b x>\log_b y
\quad\Longleftrightarrow\quad
x>y.
$$

But if $$0<b<1$$, the inequality reverses:

$$
\log_b x>\log_b y
\quad\Longleftrightarrow\quad
x<y.
$$

Just like negative numbers, bases $$0<b<1$$ require the inequality to reverse.

### Natural logarithm

When the base is $$e$$, the logarithm is called the **natural logarithm**:

$$
\log_e x=\ln x.
$$

Thus

$$
y=\ln x
$$

is the inverse of

$$
y=e^x.
$$

The natural logarithm has domain $$(0,\infty)$$, range $$(-\infty,\infty)$$, vertical asymptote $$x=0$$, and $$x$$-intercept $$(1,0)$$. It is also good to note that $$log_10 x$$ is often just abbreviated as $$\log x$$.

---

## Logarithm properties

Logarithm rules come from exponent rules. For $$M>0$$, $$N>0$$, and valid base $$b$$:

- **Product rule**:

$$
\log_b(MN)=\log_b M+\log_b N.
$$

- **Quotient rule**:

$$
\log_b\left(\frac{M}{N}\right)=\log_b M-\log_b N.
$$

- **Power rule**:

$$
\log_b(M^r)=r\log_b M.
$$

- **Change of base**:

$$
\log_b M=\frac{log_a M}{log_a b}.
$$

for some valid base $$a$$. It is often convenient on the calculator to change to base $$10$$ or base $$e$$.

These rules only apply when every logarithm is defined. For example, do not split

$$
\ln(a+b)
$$

as $$\ln a+\ln b$$. There is no sum rule for logarithms.

<div class="theorem-box" markdown="1">

**Example.** Rewrite as a single logarithm with coefficient $$1$$:

$$
\log(x^2-16)-3\bigl(\log(x+4)+2\log x\bigr).
$$

First factor:

$$
x^2-16=(x-4)(x+4).
$$

Then use the product rule and power rule:

$$
\log(x^2-16)-3\bigl(\log(x+4)+2\log x\bigr)
$$

$$
=\log(x-4)+\log(x+4)-3\log(x+4)-6\log x.
$$

Use the power rule:

$$
=\log(x-4)+\log(x+4)-\log((x+4)^3)-\log(x^6).
$$

Combine:

$$
=\log\left(\frac{(x-4)(x+4)}{(x+4)^3x^6}\right).
$$

Cancel one factor of $$x+4$$:

$$
\boxed{\log\left(\frac{x-4}{(x+4)^2x^6}\right)}.
$$

The original expression requires

$$
x^2-16>0,\qquad x+4>0,\qquad x>0,
$$

so actually $$x>4$$.

</div>

<div class="theorem-box" markdown="1">

**Example.** Expand:

$$
\log_5\sqrt[3]{\frac{x+3}{x}}.
$$

Rewrite the radical as a power:

$$
\log_5\sqrt[3]{\frac{x+3}{x}}
=\log_5\left(\frac{x+3}{x}\right)^{1/3}.
$$

Use the power rule:

$$
=\frac13\log_5\left(\frac{x+3}{x}\right).
$$

Then use the quotient rule:

$$
\boxed{\frac13\log_5(x+3)-\frac13\log_5 x}.
$$

</div>

<div class="theorem-box" markdown="1">

**Example.** Simplify

$$
\log_{e^2}2.
$$

Using change of base with base $$e$$:

$$
\log_{e^2}2=\frac{\ln 2}{\ln(e^2)}.
$$

Since

$$
\ln(e^2)=2,
$$

we get

$$
\boxed{\frac{\ln 2}{2}}.
$$

</div>

---

## Equations and inequalities with logarithms and exponentials

There are three common strategies:

1. If the bases match, set exponents equal.
2. If the bases do not match, take logs of both sides.
3. If logs are involved, rewrite as exponentials or combine logs first.

Always check domain restrictions when logarithms appear.

### Exponential equations

<div class="theorem-box" markdown="1">

**Example.** Solve

$$
3^{x-1}=4^{2x}.
$$

Take natural logs of both sides:

$$
\ln(3^{x-1})=\ln(4^{2x}).
$$

Use the power rule:

$$
(x-1)\ln 3=2x\ln 4.
$$

Expand and collect $$x$$:

$$
x\ln 3-\ln 3=2x\ln 4,
$$

$$
x(\ln 3-2\ln 4)=\ln 3.
$$

Therefore

$$
\boxed{x=\frac{\ln 3}{\ln 3-2\ln 4}}.
$$

</div>

Sometimes graphing technology is a good way to check your answer. For the previous example, you could graph

$$
y_1=3^{x-1}
\qquad\text{and}\qquad
y_2=4^{2x}
$$

and find their intersection.

### Quadratic-type exponential equations

Some exponential equations become quadratics after substitution.

<div class="theorem-box" markdown="1">

**Example.** Solve

$$
e^x+e^{-x}=2.
$$

Rewrite $$e^{-x}$$ as $$\frac1{e^x}$$:

$$
e^x+\frac1{e^x}=2.
$$

Multiply by $$e^x$$:

$$
e^{2x}+1=2e^x.
$$

Rearrange:

$$
e^{2x}-2e^x+1=0.
$$

Factor:

$$
(e^x-1)^2=0.
$$

Thus

$$
e^x=1,
$$

so

$$
\boxed{x=0}.
$$

</div>

### Logarithmic equations and inequalities

When solving logarithmic equations or inequalities, first impose the domain. Every logarithm input must be positive.

<div class="theorem-box" markdown="1">

**Example.** Solve

$$
\ln\left(\frac{3x-2}{4x+1}\right)>\ln 4.
$$

First require the logarithm input to be positive:

$$
\frac{3x-2}{4x+1}>0.
$$

The critical numbers are

$$
x=\frac23
\qquad\text{and}\qquad
x=-\frac14.
$$

So the domain is

$$
\left(-\infty,-\frac14\right)\cup\left(\frac23,\infty\right).
$$

Now use that $$\ln x$$ is increasing:

$$
\frac{3x-2}{4x+1}>4.
$$

Move everything to one side:

$$
\frac{3x-2-4(4x+1)}{4x+1}>0.
$$

Simplify:

$$
\frac{-13x-6}{4x+1}>0.
$$

The critical numbers are

$$
x=-\frac6{13}
\qquad\text{and}\qquad
x=-\frac14.
$$

The rational inequality is true on

$$
\left(-\frac6{13},-\frac14\right).
$$

This interval is inside the logarithm's domain, so the solution is

$$
\boxed{\left(-\frac6{13},-\frac14\right)}.
$$

</div>

If the logarithm base is between $$0$$ and $$1$$, remember that the logarithm is decreasing, so inequalities reverse when you compare inputs.

---

## Practice

1. Let $$f(x)=3-2\cdot 5^{x+1}$$. State the domain, range, horizontal asymptote, intercepts, intervals of increase/decrease, and find an explicit formula for $$f^{-1}(x)$$ with the domain and range of the inverse.
2. The points $$(-1,17)$$ and $$(2,1)$$ lie on the graph of $$g(x)=a\cdot b^{x-h}+k$$. The horizontal asymptote is $$y=-1$$, and $$h=1$$. Find $$a$$ and $$b$$, then determine whether $$g$$ represents exponential growth or decay.
3. Find all real solutions to $$4^{x+1}-10\cdot 2^x+1=0$$. Give exact answers.
4. Solve in $$\mathbb{R}$$: $$3^{2x}-28\cdot 3^x+27\le 0$$. Write the answer in interval notation.
5. Solve for $$x$$ exactly: $$2^{x+1}=5^{2x-3}.$$
6. Solve in $$\mathbb{R}$$: $$e^x+e^{-x}=\frac{13}{6}.$$
7. Rewrite the following expression as a single logarithm with coefficient $$1$$, and state the full domain of the original expression: $$\frac12\ln(x^2-9)-2\ln(x-3)+\ln\left(\frac{x+1}{x}\right).$$
8. Expand completely using logarithm properties, and state all restrictions on $$x$$ and $$y$$: $$\log_3\left(\frac{x^4\sqrt{y-2}}{(x^2+1)^3(5-y)}\right).$$
9. Solve in $$\mathbb{R}$$: $$\log_{1/3}(2x-1)\ge \log_{1/4}(7-x).$$
10. Solve in $$\mathbb{R}$$: $$\ln(x^2-5x+6)\le \ln(2x+3).$$
11. Let $$h(x)=\log_4(16-4x)-2$$. State the domain, range, vertical asymptote, intercepts, intervals of increase/decrease, and find $$h^{-1}(x)$$. Graph both equations.
12. A population is modeled by $$P(t)=\dfrac{1200}{1+19e^{-0.4t}}$$ for $$t\ge 0$$. Find the initial population, the limiting population (aka horizontal asymptote), and the exact time when $$P(t)=900$$.
13. Find the unique positive integer $$n$$ such that $$\log_2 (\log_16 n) = \log_4 (\log_4 n)$$ (2020 AMC 12A).
14. Let $$F(x)=\ln\left(\dfrac{x-a}{b-x}\right)$$, where $$a<b$$. Find the domain, intercepts in terms of $$a$$ and $$b$$, the vertical asymptotes, and an explicit formula for $$F^{-1}(x)$$. Then determine the range of $$F$$.
15. Find the exact value of the product $$\prod_{k=4}^{63}\frac{\log_k\left(5^{k^2-1}\right)}{\log_{k+1}\left(5^{k^2-4}\right)}$$. $$\Pi$$ represents the multiplication function, research about it if you don't understand the notation.
16. (Bonus, logarithmic means)

For positive numbers $$a\ne b$$, define

$$
L(a,b)=\frac{b-a}{\ln b-\ln a}.
$$

$$(A)$$ Show that $$L(a,b)$$ is unchanged if $$a$$ and $$b$$ are switched.

$$(B)$$ Prove that $$a<L(a,b)<b$$ whenever $$0<a<b$$.

$$(C)$$ Let $$f(x)=\ln x$$. Interpret $$L(a,b)$$ using the average rate of change of $$f$$ on $$[a,b]$$.

$$(D)$$ Explain why part $$(B)$$ is consistent with the fact that $$\ln x$$ is increasing and concave down on $$x>0$$.

---

## Solutions
