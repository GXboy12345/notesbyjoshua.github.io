---
layout: default
title: "Unit 8 & 9: Graphs and Analytics of Trig Functions"
parent: AP Precalculus
nav_order: 6
permalink: /notes/ap/precalc/graphanalyticaltrig/
---

# Unit 8 & 9: Graphs and Analytics of Trig Functions

---

## Graphs of sine and cosine

The parent sine and cosine functions are periodic, meaning that their values repeat over regular intervals.

For every integer $$k$$,

$$
\sin(t+2\pi k)=\sin t
$$

and

$$
\cos(t+2\pi k)=\cos t.
$$

So both $$y=\sin x$$ and $$y=\cos x$$ have **period** $$2\pi$$.

### Sine

For

$$
y=\sin x,
$$

the key facts are:

- Domain: $$(-\infty,\infty)$$.
- Range: $$[-1,1]$$.
- Period: $$2\pi$$.
- Amplitude: $$1$$.
- $$x$$-intercepts: $$x=k\pi$$, where $$k\in\mathbb Z$$.

One cycle of sine can be tracked with the five key points:

$$
\begin{array}{c|ccccc}
x & 0 & \frac{\pi}{2} & \pi & \frac{3\pi}{2} & 2\pi\\
\hline
\sin x & 0 & 1 & 0 & -1 & 0
\end{array}
$$

The sine graph starts at the midline, reaches a maximum after one fourth of a period, returns to the midline after half a period, reaches a minimum after three fourths of a period, and returns to the midline after one full period. These 5 points should be always graphed when graphing the cosine function.

### Cosine

For

$$
y=\cos x,
$$

the key facts are:

- Domain: $$(-\infty,\infty)$$.
- Range: $$[-1,1]$$.
- Period: $$2\pi$$.
- Amplitude: $$1$$.
- $$x$$-intercepts: $$x=\frac{\pi}{2}+k\pi$$, where $$k\in\mathbb Z$$.

One cycle of cosine can be tracked with the five key points:

$$
\begin{array}{c|ccccc}
x & 0 & \frac{\pi}{2} & \pi & \frac{3\pi}{2} & 2\pi\\
\hline
\cos x & 1 & 0 & -1 & 0 & 1
\end{array}
$$

The cosine graph starts at a maximum, crosses the midline after one fourth of a period, reaches a minimum after half a period, crosses the midline again after three fourths of a period, and returns to a maximum after one full period. These 5 points should be always graphed when graphing the cosine function.

---

## Transformations of sine and cosine

A transformed sine or cosine function often has the form

$$
y=A\sin(B(x-C))+D
$$

or

$$
y=A\cos(B(x-C))+D.
$$

The constants control the shape of the graph:

- $$|A|$$ is the **amplitude**.
- If $$A<0$$, the graph is reflected over the $$x$$-axis.
- $$\frac{2\pi}{|B|}$$ is the **period**.
- $$C$$ is the **phase shift**.
- $$D$$ is the **vertical shift**, so the midline is $$y=D$$.
- The range is $$[D-|A|,D+|A|]$$.

If the function is written as

$$
y=A\sin(Bx-C)+D
$$

or

$$
y=A\cos(Bx-C)+D,
$$

factor the inside first:

$$
Bx-C=B\left(x-\frac{C}{B}\right).
$$

So the phase shift is

$$
\frac{C}{B}.
$$.

All the transformations learned in Unit 4 apply here as well.

### Graphing transformed sine and cosine

To graph one full period:

1. Find the amplitude $$|A|$$.
2. Find the period $$\frac{2\pi}{|B|}$$.
3. Find the phase shift and starting point.
4. Divide the period into four equal increments.
5. Plot the five key points, then apply any reflection and vertical shift.
6. Repeat your graph for the amount of periods specified.

The increment between consecutive key points is

$$
\frac14\cdot\frac{2\pi}{|B|}
=\frac{\pi}{2|B|}.
$$

For example, if the period is $$\frac{2\pi}{3}$$, then each key-point increment is

$$
\frac14\cdot\frac{2\pi}{3}
=\frac{\pi}{6}.
$$

---

## Solving with sine and cosine graphs

Graphs are useful for understanding why trigonometric equations often have more than one solution.

For example, solving

$$
\sin x=a
$$

on $$[0,2\pi)$$ means finding every point on one full sine cycle with height $$a$$. If $$-1<a<1$$ and $$a\ne 0$$, there are usually two solutions in one period.

Similarly,

$$
\cos x=a
$$

usually has two solutions on $$[0,2\pi)$$ when $$-1<a<1$$ and $$a\ne 0$$.

Use the unit circle to find the reference angle, then use the sign of sine or cosine to choose the correct quadrants.

For all real solutions, add the period:

$$
x=\text{solution}+2\pi k,\qquad k\in\mathbb Z.
$$

---

## Graphs of tangent and reciprocal functions

The remaining trig graphs come from tangent, cotangent, secant, and cosecant.

### Tangent

Since

$$
\tan x=\frac{\sin x}{\cos x},
$$

tangent is undefined wherever $$\cos x=0$$.

For

$$
y=\tan x,
$$

the key facts are:

- Domain: all real numbers except $$x=\frac{\pi}{2}+k\pi$$.
- Range: $$(-\infty,\infty)$$.
- Period: $$\pi$$.
- Vertical asymptotes: $$x=\frac{\pi}{2}+k\pi$$.
- $$x$$-intercepts: $$x=k\pi$$.

A transformed tangent function has the form

$$
y=A\tan(B(x-C))+D.
$$

Its period is

$$
\frac{\pi}{|B|}.
$$

The distance from the center point to each neighboring vertical asymptote is one half of the period.

### Cotangent

Since

$$
\cot x=\frac{\cos x}{\sin x},
$$

cotangent is undefined wherever $$\sin x=0$$.

For

$$
y=\cot x,
$$

the key facts are:

- Domain: all real numbers except $$x=k\pi$$.
- Range: $$(-\infty,\infty)$$.
- Period: $$\pi$$.
- Vertical asymptotes: $$x=k\pi$$.
- $$x$$-intercepts: $$x=\frac{\pi}{2}+k\pi$$.

A transformed cotangent function

$$
y=A\cot(B(x-C))+D
$$

has period

$$
\frac{\pi}{|B|}.
$$

### Secant

Since

$$
\sec x=\frac1{\cos x},
$$

secant is undefined wherever $$\cos x=0$$.

For

$$
y=\sec x,
$$

the key facts are:

- Domain: all real numbers except $$x=\frac{\pi}{2}+k\pi$$.
- Range: $$(-\infty,-1]\cup[1,\infty)$$.
- Period: $$2\pi$$.
- Vertical asymptotes: $$x=\frac{\pi}{2}+k\pi$$.

The graph of secant follows the reciprocal of cosine. Where cosine has a maximum of $$1$$, secant has a point at $$1$$. Where cosine has a minimum of $$-1$$, secant has a point at $$-1$$. Where cosine is $$0$$, secant has a vertical asymptote.

For

$$
y=A\sec(B(x-C))+D,
$$

the period is

$$
\frac{2\pi}{|B|}.
$$

### Cosecant

Since

$$
\csc x=\frac1{\sin x},
$$

cosecant is undefined wherever $$\sin x=0$$.

For

$$
y=\csc x,
$$

the key facts are:

- Domain: all real numbers except $$x=k\pi$$.
- Range: $$(-\infty,-1]\cup[1,\infty)$$.
- Period: $$2\pi$$.
- Vertical asymptotes: $$x=k\pi$$.

The graph of cosecant follows the reciprocal of sine. Where sine has a maximum of $$1$$, cosecant has a point at $$1$$. Where sine has a minimum of $$-1$$, cosecant has a point at $$-1$$. Where sine is $$0$$, cosecant has a vertical asymptote.

For

$$
y=A\csc(B(x-C))+D,
$$

the period is

$$
\frac{2\pi}{|B|}.
$$

---

## Addition and subtraction formulas

The angle addition and subtraction formulas let us rewrite trig functions of sums and differences of angles.

### Sine

$$
\boxed{\sin(A+B)=\sin A\cos B+\cos A\sin B}
$$

$$
\boxed{\sin(A-B)=\sin A\cos B-\cos A\sin B}
$$

### Cosine

$$
\boxed{\cos(A+B)=\cos A\cos B-\sin A\sin B}
$$

$$
\boxed{\cos(A-B)=\cos A\cos B+\sin A\sin B}
$$

Notice that cosine has the opposite sign pattern from the angle expression.

### Tangent

$$
\boxed{\tan(A+B)=\frac{\tan A+\tan B}{1-\tan A\tan B}}
$$

$$
\boxed{\tan(A-B)=\frac{\tan A-\tan B}{1+\tan A\tan B}}
$$

These formulas are especially useful for finding exact trig values for angles that can be written as sums or differences of special angles, such as $$75^\circ=45^\circ+30^\circ$$.

---

## Double-angle formulas

Double-angle formulas are the addition formulas with the same angle used twice.

### Sine

$$
\boxed{\sin(2\theta)=2\sin\theta\cos\theta}
$$

### Cosine

There are three common forms:

$$
\boxed{\cos(2\theta)=\cos^2\theta-\sin^2\theta}
$$

$$
\boxed{\cos(2\theta)=2\cos^2\theta-1}
$$

$$
\boxed{\cos(2\theta)=1-2\sin^2\theta}
$$

The best version depends on what information is given.

### Tangent

$$
\boxed{\tan(2\theta)=\frac{2\tan\theta}{1-\tan^2\theta}}
$$

---

## Power-reducing and half-angle formulas

Power-reducing formulas come from the double-angle formulas for cosine.

$$
\boxed{\cos^2\theta=\frac{1+\cos(2\theta)}{2}}
$$

$$
\boxed{\sin^2\theta=\frac{1-\cos(2\theta)}{2}}
$$

These are useful when rewriting expressions with even powers of sine or cosine.

### Half-angle formulas

The half-angle formulas come from replacing $$\theta$$ with $$\frac{\theta}{2}$$ in the power-reducing formulas.

$$
\boxed{\cos\left(\frac{\theta}{2}\right)=\pm\sqrt{\frac{1+\cos\theta}{2}}}
$$

$$
\boxed{\sin\left(\frac{\theta}{2}\right)=\pm\sqrt{\frac{1-\cos\theta}{2}}}
$$

The sign depends on the quadrant of $$\frac{\theta}{2}$$.

Another useful half-angle identity is

$$
\boxed{\tan\left(\frac{\theta}{2}\right)=\frac{\sin\theta}{1+\cos\theta}}
$$

which can also be written as

$$
\boxed{\tan\left(\frac{\theta}{2}\right)=\frac{1-\cos\theta}{\sin\theta}}.
$$

---

## Product-to-sum and sum-to-product formulas

Product-to-sum formulas rewrite products of trig functions as sums or differences.

$$
\boxed{\sin A\sin B=\frac12[\cos(A-B)-\cos(A+B)]}
$$

$$
\boxed{\cos A\cos B=\frac12[\cos(A-B)+\cos(A+B)]}
$$

$$
\boxed{\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]}
$$

$$
\boxed{\cos A\sin B=\frac12[\sin(A+B)-\sin(A-B)]}
$$

Sum-to-product formulas reverse the idea.

$$
\boxed{\sin A+\sin B=2\sin\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right)}
$$

$$
\boxed{\sin A-\sin B=2\cos\left(\frac{A+B}{2}\right)\sin\left(\frac{A-B}{2}\right)}
$$

$$
\boxed{\cos A+\cos B=2\cos\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right)}
$$

$$
\boxed{\cos A-\cos B=-2\sin\left(\frac{A+B}{2}\right)\sin\left(\frac{A-B}{2}\right)}
$$

These formulas are useful for simplifying expressions and for rewriting functions in a graphable form.

---

## Trigonometric equations

When solving trigonometric equations, the main goal is to reduce the equation to a familiar trig statement such as

$$
\sin x=a,\qquad \cos x=a,\qquad \tan x=a.
$$

A general strategy is:

1. Use identities to rewrite the equation using one trig function when possible.
2. Factor if the equation is quadratic in a trig expression.
3. Find the reference angle using the unit circle.
4. Use the interval and quadrant signs to list every solution.
5. Check for extraneous solutions if the work involved squaring, dividing by a variable expression, or using reciprocal functions.

For example, an equation like

$$
2\sin^2 x+\sin x-1=0
$$

can be treated like a quadratic:

$$
(2\sin x-1)(\sin x+1)=0.
$$

Then solve

$$
\sin x=\frac12
$$

or

$$
\sin x=-1.
$$

### General solutions

If the problem asks for all real solutions, use periodicity.

For sine and cosine, add $$2\pi k$$:

$$
x=\text{solution}+2\pi k,\qquad k\in\mathbb Z.
$$

For tangent and cotangent, add $$\pi k$$:

$$
x=\text{solution}+\pi k,\qquad k\in\mathbb Z.
$$

If the equation has a coefficient inside the trig function, solve the inside angle first, then isolate $$x$$.

---

## Inverse trigonometric functions

A function needs to be one-to-one in order to have an inverse function. The original sine, cosine, and tangent graphs are not one-to-one on their full domains, so their domains are restricted before defining inverse trig functions.

### Inverse sine

For inverse sine,

$$
y=\sin^{-1}x
$$

means

$$
\sin y=x.
$$

The restricted sine function uses the interval

$$
\left[-\frac{\pi}{2},\frac{\pi}{2}\right].
$$

So

- Domain of $$\sin^{-1}x$$: $$[-1,1]$$.
- Range of $$\sin^{-1}x$$: $$\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$$.

### Inverse cosine

For inverse cosine,

$$
y=\cos^{-1}x
$$

means

$$
\cos y=x.
$$

The restricted cosine function uses the interval

$$
[0,\pi].
$$

So

- Domain of $$\cos^{-1}x$$: $$[-1,1]$$.
- Range of $$\cos^{-1}x$$: $$[0,\pi]$$.

### Inverse tangent

For inverse tangent,

$$
y=\tan^{-1}x
$$

means

$$
\tan y=x.
$$

The restricted tangent function uses the interval

$$
\left(-\frac{\pi}{2},\frac{\pi}{2}\right).
$$

So

- Domain of $$\tan^{-1}x$$: $$(-\infty,\infty)$$.
- Range of $$\tan^{-1}x$$: $$\left(-\frac{\pi}{2},\frac{\pi}{2}\right)$$.

### Compositions with inverse trig functions

Inverse trig compositions work cleanly only when the angle lies in the chosen restricted range.

For all $$x$$ in the domain of the inverse function,

$$
\sin(\sin^{-1}x)=x,
$$

$$
\cos(\cos^{-1}x)=x,
$$

and

$$
\tan(\tan^{-1}x)=x.
$$

But expressions like

$$
\sin^{-1}(\sin x)
$$

do not always equal $$x$$, because the answer must be forced into the range of inverse sine:

$$
\left[-\frac{\pi}{2},\frac{\pi}{2}\right].
$$

When evaluating a composition such as

$$
\sin(\cos^{-1}x),
$$

draw a triangle or use an identity. If $$\theta=\cos^{-1}x$$, then $$\cos\theta=x$$ and $$\theta$$ is in $$[0,\pi]$$. The sign of the final answer should match the quadrant allowed by the inverse trig function.
