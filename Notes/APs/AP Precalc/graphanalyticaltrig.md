---
layout: default
title: "Unit 8 & 9: Graphs and Analytics of Trig Functions"
parent: AP Precalculus
nav_order: 6
permalink: /notes/ap/precalc/graphanalyticaltrig/
---

# Unit 8 & 9: Graphs and Analytics of Trig Functions

:::summary{title="Unit overview"}
This unit covers graphing sinusoids, solving trigonometric equations, and the angle-addition, double-angle, and sum-to-product identities.
:::

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

The sine graph starts at the midline, reaches a maximum after one fourth of a period, returns to the midline after half a period, reaches a minimum after three fourths of a period, and returns to the midline after one full period.

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

The cosine graph starts at a maximum, crosses the midline after one fourth of a period, reaches a minimum after half a period, crosses the midline again after three fourths of a period, and returns to a maximum after one full period.

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

:::key{name="Sinusoid parameters"}
- $$\lvert A \rvert$$ is the **amplitude**.
- If $$A<0$$, the graph is reflected over the $$x$$-axis.
- $$\frac{2\pi}{\lvert B \rvert}$$ is the **period**.
- $$C$$ is the **phase shift**.
- $$D$$ is the **vertical shift**, so the midline is $$y=D$$.
- The range is $$[D-\lvert A \rvert,D+ \lvert A \rvert]$$.
:::

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
$$

All the transformations learned in Unit 4 apply here as well.

### Graphing transformed sine and cosine

To graph one full period:

1. Find the amplitude $$\lvert A \rvert$$.
2. Find the period $$\frac{2\pi}{\lvert B \rvert}$$.
3. Find the phase shift and starting point.
4. Divide the period into four equal increments.
5. Plot the five key points, then apply any reflection and vertical shift.
6. Repeat your graph for the amount of periods specified.

The increment between consecutive key points is

$$
\frac14\cdot\frac{2\pi}{\lvert B \rvert}
=\frac{\pi}{2\lvert B \rvert}.
$$

For example, if the period is $$\frac{2\pi}{3}$$, then each key-point increment is

$$
\frac14\cdot\frac{2\pi}{3}
=\frac{\pi}{6}.
$$

:::example{title="Find the amplitude, period, phase shift, midline, range, and key-point increment for $$..."}
Find the amplitude, period, phase shift, midline, range, and key-point increment for $$y=-2\cos\left(3\left(x-\frac{\pi}{4}\right)\right)+1.$$ Then graph the function.

Here

$$
A=-2,\qquad B=3,\qquad C=\frac{\pi}{4},\qquad D=1.
$$

So the amplitude is

$$
\lvert A\rvert=2.
$$

The period is

$$
\frac{2\pi}{\lvert B\rvert}
=\frac{2\pi}{3}.
$$

The phase shift is right $$\frac{\pi}{4}$$, and the midline is

$$
y=1.
$$

The range is

$$
[1-2,1+2]=[-1,3].
$$

Since one full period is $$\frac{2\pi}{3}$$, the key-point increment is

$$
\frac14\cdot\frac{2\pi}{3}
=\frac{\pi}{6}.
$$

Since $$A<0$$, the cosine graph is reflected over its midline.

A graph with many key points is shown below:

:::figure{width=480}
![parent functions](/assets/APs/AP%20Precalc/triggraph6.png)
:::

:::

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

:::example{title="Solve on $$[0,4\pi)$$: $$\sin x=\frac12.$$"}
Solve on $$[0,4\pi)$$: $$\sin x=\frac12.$$

The reference angle is

$$
\frac{\pi}{6},
$$

because

$$
\sin\left(\frac{\pi}{6}\right)=\frac12.
$$

Sine is positive in Quadrants I and II, so the two standard solutions are

$$
x=\frac{\pi}{6},\frac{5\pi}{6}.
$$

Since we repeat over 2 periods, we add on $$2\pi$$ to each solution:

$$
x=\frac{\pi}{6},\frac{5\pi}{6},\frac{13\pi}{6},\frac{17\pi}{6}.
$$

Graphically, the horizontal line $$y=\frac12$$ intersects one full sine cycle twice, and since there are two cycles there are four intersections.
:::

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
\frac{\pi}{\lvert B \rvert}.
$$

The distance from the center point to each neighboring vertical asymptote is one half of the period.

:::example{title="Graph $$y=3\tan\left(2\left(x+\frac{\pi}{8}\right)\right)-4,$$ and list all important f..."}
Graph $$y=3\tan\left(2\left(x+\frac{\pi}{8}\right)\right)-4,$$ and list all important features.

the period is

$$
\frac{\pi}{2}.
$$

The center of a tangent branch happens where the inside angle equals $$0$$:

$$
2\left(x+\frac{\pi}{8}\right)=0
\quad\Rightarrow\quad
x=-\frac{\pi}{8}.
$$

At this point, $$\tan(0)=0$$, so

$$
y=3(0)-4=-4.
$$

The center point is

$$
\left(-\frac{\pi}{8},-4\right).
$$

Since half the period is $$\frac{\pi}{4}$$, the neighboring vertical asymptotes are

$$
x=-\frac{\pi}{8}-\frac{\pi}{4}=-\frac{3\pi}{8}
\qquad\text{and}\qquad
x=-\frac{\pi}{8}+\frac{\pi}{4}=\frac{\pi}{8}.
$$

A graph with many key points is shown below:

:::figure{width=480}
![parent functions](/assets/APs/AP%20Precalc/triggraph7.png)
:::

:::

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
\frac{\pi}{\lvert B \rvert}.
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
\frac{2\pi}{\lvert B \rvert}.
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
\frac{2\pi}{\lvert B \rvert}.
$$

---

## Addition and subtraction formulas

The angle addition and subtraction formulas let us rewrite trig functions of sums and differences of angles.

:::theorem{name="Proof (Angle addition formulas)"}
**Proof (Angle addition formulas).** Let two points on the unit circle be

$$
P=(\cos A,\sin A)
$$

and

$$
Q=(\cos B,\sin B).
$$

The distance between them depends only on the angle between them, which is $$A-B$$. Using the distance formula:

$$
PQ^2=(\cos A-\cos B)^2+(\sin A-\sin B)^2.
$$

Expanding gives

$$
PQ^2=2-2(\cos A\cos B+\sin A\sin B).
$$

The same chord length can also be written using the angle difference:

$$
PQ^2=(1-\cos(A-B))^2+\sin^2(A-B)=2-2\cos(A-B).
$$

Set the two expressions equal:

$$
2-2(\cos A\cos B+\sin A\sin B)=2-2\cos(A-B).
$$

Therefore

$$
\cos(A-B)=\cos A\cos B+\sin A\sin B.
$$

The other addition and subtraction formulas follow from this identity, even/odd identities, and cofunction relationships. For example, a similar proof can be done for sine addition/subtraction, and the proof is left to the reader as an exercise.
:::

### List of identities

$$
\sin(A+B)=\sin A\cos B+\cos A\sin B
$$

$$
\sin(A-B)=\sin A\cos B-\cos A\sin B
$$

$$
\cos(A+B)=\cos A\cos B-\sin A\sin B
$$

$$
\cos(A-B)=\cos A\cos B+\sin A\sin B
$$

$$
\tan(A+B)=\frac{\tan A+\tan B}{1-\tan A\tan B}
$$

$$
\tan(A-B)=\frac{\tan A-\tan B}{1+\tan A\tan B}
$$

:::theorem{name="Proof (Tangent addition formula)"}
**Proof (Tangent addition formula).** Use the fact that tangent is sine divided by cosine: $$\tan(A+B)=\frac{\sin(A+B)}{\cos(A+B)}$$ to prove the tangent addition formula.

Substitute the addition formulas:

$$
\tan(A+B)
=\frac{\sin A\cos B+\cos A\sin B}{\cos A\cos B-\sin A\sin B}.
$$

Divide every term in the numerator and denominator by $$\cos A\cos B$$:

$$
\tan(A+B)
=\frac{\frac{\sin A\cos B}{\cos A\cos B}+\frac{\cos A\sin B}{\cos A\cos B}}
{\frac{\cos A\cos B}{\cos A\cos B}-\frac{\sin A\sin B}{\cos A\cos B}}.
$$

This simplifies to

$$
\tan(A+B)
=\frac{\tan A+\tan B}{1-\tan A\tan B}.
$$

The subtraction formula follows the same way using $$\sin(A-B)$$ and $$\cos(A-B)$$.
:::

These formulas are especially useful for finding exact trig values for angles that can be written as sums or differences of special angles, such as $$75^\circ=45^\circ+30^\circ$$.

:::example{title="Find the exact value of $$\sin 75^\circ$$."}
Find the exact value of $$\sin 75^\circ$$.

Rewrite the angle as a sum of special angles:

$$
75^\circ=45^\circ+30^\circ.
$$

Then use the sine addition formula:

$$
\sin(75^\circ)
=\sin(45^\circ+30^\circ)
=\sin45^\circ\cos30^\circ+\cos45^\circ\sin30^\circ.
$$

Substitute exact values:

$$
\sin75^\circ
=\frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2}
+\frac{\sqrt2}{2}\cdot\frac12
\frac{\sqrt6+\sqrt2}{4}.
$$
:::

---

## Double-angle formulas

Double-angle formulas are the addition formulas with the same angle used twice.

:::theorem{name="Proof"}
**Proof.** Start with the angle addition formula for sine:

$$
\sin(A+B)=\sin A\cos B+\cos A\sin B.
$$

Let $$A=\theta$$ and $$B=\theta$$:

$$
\sin(2\theta)
=\sin\theta\cos\theta+\cos\theta\sin\theta
=2\sin\theta\cos\theta.
$$

So

$$
\sin(2\theta)=2\sin\theta\cos\theta.
$$

The cosine double-angle formula comes from the cosine addition formula:

$$
\cos(2\theta)
=\cos(\theta+\theta)
=\cos^2\theta-\sin^2\theta.
$$

The alternate forms come from the Pythagorean identity:

$$
\sin^2\theta+\cos^2\theta=1.
$$

Since $$\sin^2\theta=1-\cos^2\theta$$,

$$
\cos^2\theta-\sin^2\theta
=\cos^2\theta-(1-\cos^2\theta)
=2\cos^2\theta-1.
$$

Since $$\cos^2\theta=1-\sin^2\theta$$,

$$
\cos^2\theta-\sin^2\theta
=(1-\sin^2\theta)-\sin^2\theta
=1-2\sin^2\theta.
$$

So

$$
\cos(2\theta)=\cos^2\theta-\sin^2\theta=(1-\sin^2\theta)-\sin^2\theta=1-2\sin^2\theta..
$$

Similarly, the tangent double angle formula can come from either dividing sine by cosine or using the tangent addition formula:

$$
\tan(2\theta)
=\tan(\theta+\theta)
=\frac{2\tan A}{1 - \tan^2 A}.
$$

$$
\tan(2\theta)=\frac{2\tan A}{1 - \tan^2 A}.
$$
:::

---

## Power-reducing and half-angle formulas

Power-reducing formulas come from the double-angle formulas for cosine.

$$
\cos^2\theta=\frac{1+\cos(2\theta)}{2}
$$

$$
\sin^2\theta=\frac{1-\cos(2\theta)}{2}
$$

These are useful when rewriting expressions with powers of sine or cosine. Later we will learn De Moivre's Theorem to generalize power formulas.

:::theorem{name="Proof (Power reduction formulas)"}
**Proof (Power reduction formulas).** Prove the two power reduction formulas.

Use the cosine double-angle identities:

$$
\cos(2\theta)=2\cos^2\theta-1.
$$

Solve for $$\cos^2\theta$$:

$$
2\cos^2\theta=1+\cos(2\theta)
$$

so

$$
\cos^2\theta=\frac{1+\cos(2\theta)}{2}.
$$

Similarly, use

$$
\cos(2\theta)=1-2\sin^2\theta.
$$

Solving for $$\sin^2\theta$$ gives

$$
\sin^2\theta=\frac{1-\cos(2\theta)}{2}.
$$
:::

### Half-angle formulas

The half-angle formulas come from replacing $$\theta$$ with $$\frac{\theta}{2}$$ in the power-reducing formulas.

$$
\cos\left(\frac{\theta}{2}\right)=\pm\sqrt{\frac{1+\cos\theta}{2}}
$$

$$
\sin\left(\frac{\theta}{2}\right)=\pm\sqrt{\frac{1-\cos\theta}{2}}
$$

The sign depends on the quadrant of $$\frac{\theta}{2}$$.

Another useful half-angle identity is

$$
\tan\left(\frac{\theta}{2}\right)=\frac{\sin\theta}{1+\cos\theta}
$$

which can also be written as

$$
\tan\left(\frac{\theta}{2}\right)=\frac{1-\cos\theta}{\sin\theta}.
$$

:::theorem{name="Extension"}
**Extension.** Prove the tangent half angle identity. As a bonus, try to solve it geometrically!
:::

:::example{title="Find the exact value of $$\sin 105^\circ$$."}
Find the exact value of $$\sin 105^\circ$$.

Since

$$
105^\circ=\frac{210^\circ}{2},
$$

use the half-angle formula:

$$
\sin\left(\frac{\theta}{2}\right)=\pm\sqrt{\frac{1-\cos\theta}{2}}.
$$

Here $$\theta=210^\circ$$, so $$\frac{\theta}{2}=105^\circ$$. Since $$105^\circ$$ is in Quadrant II, sine is positive:

$$
\sin105^\circ
=\sqrt{\frac{1-\cos210^\circ}{2}}.
$$

Because

$$
\cos210^\circ=-\frac{\sqrt3}{2},
$$

we get

$$
\sin105^\circ
=\sqrt{\frac{1+\frac{\sqrt3}{2}}{2}}
=\sqrt{\frac{2+\sqrt3}{4}}
=\frac{\sqrt{2+\sqrt3}}{2}.
$$
:::

---

## Product-to-sum and sum-to-product formulas

Product-to-sum formulas rewrite products of trig functions as sums or differences.

$$
\sin A\sin B=\frac12[\cos(A-B)-\cos(A+B)]
$$

$$
\cos A\cos B=\frac12[\cos(A-B)+\cos(A+B)]
$$

$$
\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]
$$

$$
\cos A\sin B=\frac12[\sin(A+B)-\sin(A-B)]
$$

Sum-to-product formulas reverse the idea.

$$
\sin A+\sin B=2\sin\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right)
$$

$$
\sin A-\sin B=2\cos\left(\frac{A+B}{2}\right)\sin\left(\frac{A-B}{2}\right)
$$

$$
\cos A+\cos B=2\cos\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right)
$$

$$
\cos A-\cos B=-2\sin\left(\frac{A+B}{2}\right)\sin\left(\frac{A-B}{2}\right)
$$

These formulas are useful for simplifying expressions and for rewriting functions in a graphable form.

:::theorem{name="Proof (Sum-to-product/Product-to-sum formulas)"}
**Proof (Sum-to-product/Product-to-sum formulas).** Prove the formulas above.

Add the cosine addition and subtraction formulas:

$$
\cos(A-B)=\cos A\cos B+\sin A\sin B
$$

and

$$
\cos(A+B)=\cos A\cos B-\sin A\sin B.
$$

Adding them gives

$$
\cos(A-B)+\cos(A+B)=2\cos A\cos B.
$$

Therefore

$$
\cos A\cos B=\frac12[\cos(A-B)+\cos(A+B)].
$$

Subtracting instead gives

$$
\cos(A-B)-\cos(A+B)=2\sin A\sin B,
$$

so

$$
\sin A\sin B=\frac12[\cos(A-B)-\cos(A+B)].
$$

The other product-to-sum formulas come from adding or subtracting the sine addition and subtraction formulas and is left as an exercise to the reader.
:::

:::example{title="Rewrite"}
Rewrite

$$
\cos(5x)+\cos(3x)
$$

as a product.

Use

$$
\cos A+\cos B=2\cos\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right).
$$

Let $$A=5x$$ and $$B=3x$$:

$$
\cos(5x)+\cos(3x)
=2\cos\left(\frac{5x+3x}{2}\right)\cos\left(\frac{5x-3x}{2}\right).
$$

So

$$
\cos(5x)+\cos(3x)=2\cos(4x)\cos x.
$$
:::

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
4. Use the interval and quadrant signs to list every solution. Always reject values outside the allowed domain and range!
5. Check for extraneous solutions if the work involved squaring, dividing by a variable expression, or using reciprocal functions.


:::example{title="Solve exactly on $$[0,2\pi)$$:"}
Solve exactly on $$[0,2\pi)$$:

$$
2\sin^2x+\sin x-1=0.
$$

Factor:

$$
(2\sin x-1)(\sin x+1)=0.
$$

So

$$
\sin x=\frac12
\qquad\text{or}\qquad
\sin x=-1.
$$

On $$[0,2\pi)$$,

$$
\sin x=\frac12
$$

at

$$
x=\frac{\pi}{6},\frac{5\pi}{6}.
$$

Also,

$$
\sin x=-1
$$

at

$$
x=\frac{3\pi}{2}.
$$

Thus

$$
x=\frac{\pi}{6},\frac{5\pi}{6},\frac{3\pi}{2}.
$$
:::

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

For inverse sine (arcsine),

$$
y=\sin^{-1}x
$$

means

$$
\sin y=x.
$$

The restricted sine function for the standard arcsine function uses the interval

$$
\left[-\frac{\pi}{2},\frac{\pi}{2}\right].
$$

So

- Domain of $$\sin^{-1}x$$: $$[-1,1]$$.
- Range of $$\sin^{-1}x$$: $$\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$$.

### Inverse cosine

For inverse cosine (arccosine),

$$
y=\cos^{-1}x
$$

means

$$
\cos y=x.
$$

The restricted cosine function for the standard arccosine function uses the interval

$$
[0,\pi].
$$

So

- Domain of $$\cos^{-1}x$$: $$[-1,1]$$.
- Range of $$\cos^{-1}x$$: $$[0,\pi]$$.

### Inverse tangent

For inverse tangent (arctangent),

$$
y=\tan^{-1}x
$$

means

$$
\tan y=x.
$$

The restricted tangent function for the standard arctangent function uses the interval

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

draw a triangle or use an identity and always inverse trig functions represent angles. If $$\theta=\cos^{-1}x$$, then $$\cos\theta=x$$ and $$\theta$$ is in $$[0,\pi]$$. The sign of the final answer should match the quadrant allowed by the inverse trig function.

:::example{title="Evaluate exactly:"}
Evaluate exactly:

$$
\sin\left(\cos^{-1}\frac35\right).
$$

Let

$$
\theta=\cos^{-1}\frac35.
$$

Then

$$
\cos\theta=\frac35,
$$

and $$\theta$$ must be in $$[0,\pi]$$. Since cosine is positive, $$\theta$$ is in Quadrant I.

Draw a right triangle with adjacent side $$3$$ and hypotenuse $$5$$. The opposite side is

$$
\sqrt{5^2-3^2}=\sqrt{16}=4.
$$

Therefore

$$
\sin\theta=\frac45.
$$

So

$$
\sin\left(\cos^{-1}\frac35\right)=\frac45.
$$
:::

---

## Practice

:::practice
:::frq{id=precalc-graphanalyticaltrig-1}
1. For $$f(x)=-3\sin\left(2\left(x-\frac{\pi}{6}\right)\right)+1$$, find the amplitude, period, phase shift, midline, range, and five key points for one full period. Then sketch one full period.

:::solution
The function is

$$
f(x)=-3\sin\left(2\left(x-\frac{\pi}{6}\right)\right)+1.
$$

The amplitude is

$$
\boxed{3}.
$$

The period is

$$
\frac{2\pi}{\lvert 2 \rvert}=\pi.
$$

So

$$
\boxed{\text{period}=\pi}.
$$

The phase shift is

$$
\boxed{\frac{\pi}{6}\text{ right}}.
$$

The midline is

$$
\boxed{y=1}.
$$

The range is

$$
1-3\le y\le 1+3,
$$

so

$$
\boxed{[-2,4]}.
$$

The key-point increment is one fourth of the period:

$$
\frac{\pi}{4}.
$$

Starting at $$x=\frac{\pi}{6}$$, the five key $$x$$-values are

$$
\frac{\pi}{6},\quad
\frac{5\pi}{12},\quad
\frac{2\pi}{3},\quad
\frac{11\pi}{12},\quad
\frac{7\pi}{6}.
$$

Because the sine graph is reflected over the $$x$$-axis, the corresponding $$y$$-values are

$$
1,\quad -2,\quad 1,\quad 4,\quad 1.
$$

Thus the five key points are

$$
\boxed{\left(\frac{\pi}{6},1\right),
\left(\frac{5\pi}{12},-2\right),
\left(\frac{2\pi}{3},1\right),
\left(\frac{11\pi}{12},4\right),
\left(\frac{7\pi}{6},1\right)}.
$$

A graph with many key points is shown below:
:::
:::

:::frq{id=precalc-graphanalyticaltrig-2}
2. A sinusoidal function has maximum value $$7$$ at $$x=\frac{\pi}{3}$$ and minimum value $$-1$$ at $$x=\frac{7\pi}{6}$$. Write a cosine model for the function, assuming the given maximum and minimum are consecutive. Then find five key points and sketch one full period.

:::solution
The maximum is $$7$$ and the minimum is $$-1$$. The midline is the average:

$$
D=\frac{7+(-1)}{2}=3.
$$

The amplitude is half the distance between max and min:

$$
A=\frac{7-(-1)}{2}=4.
$$

The distance from a maximum to the next minimum is half a period:

$$
\frac{7\pi}{6}-\frac{\pi}{3}
=\frac{7\pi}{6}-\frac{2\pi}{6}
=\frac{5\pi}{6}.
$$

So the period is

$$
2\cdot\frac{5\pi}{6}=\frac{5\pi}{3}.
$$

Thus

$$
B=\frac{2\pi}{\frac{5\pi}{3}}=\frac65.
$$

Since the function has a maximum at $$x=\frac{\pi}{3}$$, use a positive cosine model:

$$
\boxed{f(x)=4\cos\left(\frac65\left(x-\frac{\pi}{3}\right)\right)+3}.
$$

The key-point increment is

$$
\frac14\cdot\frac{5\pi}{3}=\frac{5\pi}{12}.
$$

Starting at the maximum $$x=\frac{\pi}{3}$$, the five key points are

$$
\boxed{\left(\frac{\pi}{3},7\right),
\left(\frac{3\pi}{4},3\right),
\left(\frac{7\pi}{6},-1\right),
\left(\frac{19\pi}{12},3\right),
\left(2\pi,7\right)}.
$$

A graph with many key points is shown below:
:::
:::

:::frq{id=precalc-graphanalyticaltrig-3}
3. For $$g(x)=2\tan\left(3\left(x+\frac{\pi}{12}\right)\right)-1$$, find the period, center point of one branch, vertical asymptotes surrounding that branch, and the $$x$$-intercept in that branch. Then sketch the branch.

:::solution
The function is

$$
g(x)=2\tan\left(3\left(x+\frac{\pi}{12}\right)\right)-1.
$$

The period of tangent is

$$
\frac{\pi}{\lvert 3 \rvert}=\frac{\pi}{3}.
$$

So

$$
\boxed{\text{period}=\frac{\pi}{3}}.
$$

The center point occurs where the tangent input is $$0$$:

$$
3\left(x+\frac{\pi}{12}\right)=0.
$$

Thus

$$
x=-\frac{\pi}{12}.
$$

At the center,

$$
g\left(-\frac{\pi}{12}\right)=2\tan(0)-1=-1.
$$

So the center point is

$$
\boxed{\left(-\frac{\pi}{12},-1\right)}.
$$

The distance from the center to each vertical asymptote is half the period:

$$
\frac12\cdot\frac{\pi}{3}=\frac{\pi}{6}.
$$

So the surrounding vertical asymptotes are

$$
-\frac{\pi}{12}-\frac{\pi}{6}=-\frac{\pi}{4}
$$

and

$$
-\frac{\pi}{12}+\frac{\pi}{6}=\frac{\pi}{12}.
$$

Thus

$$
\boxed{x=-\frac{\pi}{4}\quad\text{and}\quad x=\frac{\pi}{12}}.
$$

For the $$x$$-intercept, set $$g(x)=0$$:

$$
2\tan\left(3\left(x+\frac{\pi}{12}\right)\right)-1=0.
$$

Then

$$
\tan\left(3\left(x+\frac{\pi}{12}\right)\right)=\frac12.
$$

On the center branch,

$$
3\left(x+\frac{\pi}{12}\right)=\tan^{-1}\left(\frac12\right).
$$

Therefore

$$
\boxed{x=\frac13\tan^{-1}\left(\frac12\right)-\frac{\pi}{12}}.
$$

The branch should increase from the vertical asymptote $$x=-\frac{\pi}{4}$$ to the vertical asymptote $$x=\frac{\pi}{12}$$, passing through the center point $$\left(-\frac{\pi}{12},-1\right)$$ and the $$x$$-intercept above.

A graph with many key points is shown below:
:::
:::

:::frq{id=precalc-graphanalyticaltrig-4}
4. For $$h(x)=-2\sec\left(\frac12(x-\pi)\right)+3$$, find the period, midline, vertical asymptotes in one period starting at $$x=\pi$$, and range. Then sketch one full period, including the guiding cosine curve.
:::

:::frq{id=precalc-graphanalyticaltrig-5}
5. Solve exactly on $$[0,4\pi)$$. Then sketch $$y=2\sin^2x-\sin x-1$$ on $$[0,4\pi)$$ and label all $$x$$-intercepts: $$2\sin^2x-\sin x-1=0.$$
:::

:::frq{id=precalc-graphanalyticaltrig-6}
6. Solve on $$[0, 4\pi)$$: $$4\sin(4x)\cos(6x)= 2\sin(10x)+1$$.
:::

:::frq{id=precalc-graphanalyticaltrig-7}
7. Solve exactly on $$[0,2\pi)$$: $$\tan x+\cot x=4.$$
:::

:::frq{id=precalc-graphanalyticaltrig-8}
8. Evaluate each of these exactly: $$\sin 75^\circ, \cos 15^\circ,\tan 105^\circ.$$ The sine and cosine values for $$15^\circ$$ and $$75^\circ$$ are also useful to memorize as well.
:::

:::frq{id=precalc-graphanalyticaltrig-9}
9. Prove the identity: $$\frac{\sin(x+y)+\sin(x-y)}{\cos(x+y)+\cos(x-y)}=\tan x.$$
:::

:::frq{id=precalc-graphanalyticaltrig-10}
10. Solve exactly on $$[0,2\pi)$$. Then use the product-to-sum form to sketch enough of the graph to explain why your number of solutions makes sense: $$\cos(5x)+\cos(3x)=0.$$
:::

:::frq{id=precalc-graphanalyticaltrig-11}
11. Evaluate exactly: $$\sin\left(\cos^{-1}\frac35\right)+\cos\left(\sin^{-1}\left(-\frac5{13}\right)\right)+\tan\left(\cos^{-1}\left(-\frac45\right)\right).$$
:::

:::frq{id=precalc-graphanalyticaltrig-12}
12. How many solutions does the equation $$\tan(2x)=\cos(\tfrac{x}{2})$$ have on the interval $$[0,2\pi]$$?
:::

:::frq{id=precalc-graphanalyticaltrig-13}
13. Suppose $$\frac{\pi}{2}<\theta<\pi$$ and $$\cos\theta=-\frac35$$. Find exact values of $$\sin\left(\frac{\theta}{2}\right), \cos\left(\frac{\theta}{2}\right),$$ and $$\tan\left(\frac{\theta}{2}\right).$$
:::

:::frq{id=precalc-graphanalyticaltrig-14}
14. Let $$x$$ and $$y$$ be real numbers such that $$\frac{\sin x}{\sin y} = 3$$ and $$\frac{\cos x}{\cos y} = \frac{1}{2}$$. The value of $$\frac{\sin 2x}{\sin 2y} + \frac{\cos 2x}{\cos 2y}$$ can be expressed in the form $$\frac{p}{q}$$, where $$p$$ and $$q$$ are relatively prime positive integers. Find $$p+q$$. (2014 AIME II)
:::

:::frq{id=precalc-graphanalyticaltrig-15}
15. A tide height is modeled by a sinusoidal function of time. At $$t=2$$ hours, the tide is at a high of $$11$$ feet. At $$t=8$$ hours, the tide is at the next low of $$3$$ feet.
   $$(A)$$ Write a cosine model $$H(t)$$ for the tide height.
   $$(B)$$ Find the period and midline.
   $$(C)$$ Find the first time after $$t=2$$ when the tide height is $$9$$ feet.
   $$(D)$$ Sketch one full period of the tide model and label the high tide, low tide, midline, and the point where $$H(t)=9$$ first occurs after $$t=2$$.
:::

:::frq{id=precalc-graphanalyticaltrig-16}
16. (Bonus, Viète's formula for $$\pi$$)
Let
$$
a_1=\sqrt2
$$
and define
$$
a_{n+1}=\sqrt{2+a_n}.
$$
The nested radicals
$$
\sqrt2,\quad \sqrt{2+\sqrt2},\quad \sqrt{2+\sqrt{2+\sqrt2}},\quad \ldots
$$
are connected to repeated half-angle identities.
   $$(A)$$ Use the half-angle identity for cosine to show that
   $$
   a_n=2\cos\left(\frac{\pi}{2^{n+1}}\right).
   $$
   $$(B)$$ Use part $$(A)$$ and the identity $$\sin(2x)=2\sin x\cos x$$ to show how products of the terms $$\frac{a_n}{2}$$ are related to $$\frac{2}{\pi}$$.
   $$(C)$$ Explain why this leads to Viète's infinite product:
   $$
   \frac{2}{\pi}
   =\frac{\sqrt2}{2}\cdot
   \frac{\sqrt{2+\sqrt2}}{2}\cdot
   \frac{\sqrt{2+\sqrt{2+\sqrt2}}}{2}\cdots.
   $$
:::
:::
