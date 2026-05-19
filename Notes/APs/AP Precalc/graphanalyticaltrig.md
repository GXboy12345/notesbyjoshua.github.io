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
- $$\frac{2\pi}{\lvert B \rvert}$$ is the **period**.
- $$C$$ is the **phase shift**.
- $$D$$ is the **vertical shift**, so the midline is $$y=D$$.
- The range is $$[D-\lvert A \rvert,D+ \lvert A \rvert]$$.

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
\frac14\cdot\frac{2\pi}{\lvert B \rvert}
=\frac{\pi}{2\lvert B \rvert}.
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
\frac{\pi}{\lvert B \rvert}.
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

<div class="theorem-box" markdown="1">

**Extension.** Prove the formulas above.

</div>

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

---

## Practice

1. For $$f(x)=-3\sin\left(2\left(x-\frac{\pi}{6}\right)\right)+1$$, find the amplitude, period, phase shift, midline, range, and five key points for one full period. Then sketch one full period.
2. A sinusoidal function has maximum value $$7$$ at $$x=\frac{\pi}{3}$$ and minimum value $$-1$$ at $$x=\frac{7\pi}{6}$$. Write a cosine model for the function, assuming the given maximum and minimum are consecutive. Then find five key points and sketch one full period.
3. For $$g(x)=2\tan\left(3\left(x+\frac{\pi}{12}\right)\right)-1$$, find the period, center point of one branch, vertical asymptotes surrounding that branch, and the $$x$$-intercept in that branch. Then sketch the branch.
4. For $$h(x)=-2\sec\left(\frac12(x-\pi)\right)+3$$, find the period, midline, vertical asymptotes in one period starting at $$x=\pi$$, and range. Then sketch one full period, including the guiding cosine curve.
5. Solve exactly on $$[0,4\pi)$$. Then sketch $$y=2\sin^2x-\sin x-1$$ on $$[0,4\pi)$$ and label all $$x$$-intercepts:

$$
2\sin^2x-\sin x-1=0.
$$

6. Solve exactly on $$[0,2\pi)$$. Then sketch $$y=2\cos(2x)-1$$ on $$[0,2\pi)$$ and label all $$x$$-intercepts:

$$
2\cos(2x)-1=0.
$$

7. Solve exactly on $$[0,2\pi)$$:

$$
\tan x+\cot x=4.
$$

8. Evaluate exactly:

$$
\sin 75^\circ,\qquad \cos 15^\circ,\qquad \tan 105^\circ.
$$

9. Prove the identity:

$$
\frac{\sin(x+y)+\sin(x-y)}{\cos(x+y)+\cos(x-y)}=\tan x.
$$

10. Solve exactly on $$[0,2\pi)$$. Then use the product-to-sum form to sketch enough of the graph to explain why your number of solutions makes sense:

$$
\cos(5x)+\cos(3x)=0.
$$

11. Evaluate exactly:

$$
\sin\left(\cos^{-1}\frac35\right)
+\cos\left(\sin^{-1}\left(-\frac5{13}\right)\right)
+\tan\left(\cos^{-1}\left(-\frac45\right)\right).
$$

12. Evaluate exactly:

$$
\sin^{-1}\left(\sin\frac{11\pi}{6}\right),\qquad
\cos^{-1}\left(\cos\frac{7\pi}{4}\right),\qquad
\tan^{-1}\left(\tan\frac{5\pi}{4}\right).
$$

13. Suppose $$\frac{\pi}{2}<\theta<\pi$$ and $$\cos\theta=-\frac35$$. Find exact values of

$$
\sin\left(\frac{\theta}{2}\right),\qquad
\cos\left(\frac{\theta}{2}\right),\qquad
\tan\left(\frac{\theta}{2}\right).
$$

14. Rewrite

$$
4\sin^2x\cos^2x
$$

as an expression involving only $$\cos(4x)$$. Then find its maximum and minimum values.
15. A tide height is modeled by a sinusoidal function of time. At $$t=2$$ hours, the tide is at a high of $$11$$ feet. At $$t=8$$ hours, the tide is at the next low of $$3$$ feet.

$$(A)$$ Write a cosine model $$H(t)$$ for the tide height.

$$(B)$$ Find the period and midline.

$$(C)$$ Find the first time after $$t=2$$ when the tide height is $$9$$ feet.

$$(D)$$ Sketch one full period of the tide model and label the high tide, low tide, midline, and the point where $$H(t)=9$$ first occurs after $$t=2$$.

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

---

## Solutions

### Solution 1

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
\frac{2\pi}{|2|}=\pi.
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

**ADD IMAGE OF GRAPH**

### Solution 2

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

**ADD IMAGE OF GRAPH**

### Solution 3

The function is

$$
g(x)=2\tan\left(3\left(x+\frac{\pi}{12}\right)\right)-1.
$$

The period of tangent is

$$
\frac{\pi}{|3|}=\frac{\pi}{3}.
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

**ADD IMAGE OF GRAPH**

### Solution 4

The function is

$$
h(x)=-2\sec\left(\frac12(x-\pi)\right)+3.
$$

The period of secant is

$$
\frac{2\pi}{\left|\frac12\right|}=4\pi.
$$

So

$$
\boxed{\text{period}=4\pi}.
$$

The midline is

$$
\boxed{y=3}.
$$

One period starting at $$x=\pi$$ runs from

$$
x=\pi
$$

to

$$
x=\pi+4\pi=5\pi.
$$

Secant has vertical asymptotes when the cosine inside is $$0$$:

$$
\frac12(x-\pi)=\frac{\pi}{2}+k\pi.
$$

Multiply by $$2$$:

$$
x-\pi=\pi+2k\pi.
$$

Thus

$$
x=2\pi+2k\pi.
$$

In the period $$[\pi,5\pi]$$, the vertical asymptotes are

$$
\boxed{x=2\pi\quad\text{and}\quad x=4\pi}.
$$

The parent secant has range $$(-\infty,-1]\cup[1,\infty)$$. Multiplying by $$-2$$ gives $$(-\infty,-2]\cup[2,\infty)$$ with the branches swapped, and adding $$3$$ gives

$$
\boxed{(-\infty,1]\cup[5,\infty)}.
$$

The guiding cosine curve is

$$
y=-2\cos\left(\frac12(x-\pi)\right)+3.
$$

On $$[\pi,5\pi]$$, its key values are

$$
(\pi,1),\quad (2\pi,3),\quad (3\pi,5),\quad (4\pi,3),\quad (5\pi,1).
$$

The secant graph has vertices at $$(\pi,1)$$, $$(3\pi,5)$$, and $$(5\pi,1)$$, with vertical asymptotes at $$x=2\pi$$ and $$x=4\pi$$.

**ADD IMAGE OF GRAPH**

### Solution 5

Let

$$
u=\sin x.
$$

Then

$$
2u^2-u-1=0.
$$

Factor:

$$
(2u+1)(u-1)=0.
$$

Thus

$$
\sin x=-\frac12
\qquad\text{or}\qquad
\sin x=1.
$$

On $$[0,4\pi)$$,

$$
\sin x=1
$$

at

$$
x=\frac{\pi}{2},\frac{5\pi}{2}.
$$

Also,

$$
\sin x=-\frac12
$$

at

$$
x=\frac{7\pi}{6},\frac{11\pi}{6},\frac{19\pi}{6},\frac{23\pi}{6}.
$$

Therefore

$$
\boxed{x=\frac{\pi}{2},\frac{7\pi}{6},\frac{11\pi}{6},\frac{5\pi}{2},\frac{19\pi}{6},\frac{23\pi}{6}}.
$$

The graph of $$y=2\sin^2x-\sin x-1$$ crosses the $$x$$-axis exactly at those values on $$[0,4\pi)$$.

**ADD IMAGE OF GRAPH**

### Solution 6

Start with

$$
2\cos(2x)-1=0.
$$

Then

$$
\cos(2x)=\frac12.
$$

Let $$u=2x$$. Since $$x\in[0,2\pi)$$, we have

$$
u\in[0,4\pi).
$$

On $$[0,4\pi)$$,

$$
\cos u=\frac12
$$

at

$$
u=\frac{\pi}{3},\frac{5\pi}{3},\frac{7\pi}{3},\frac{11\pi}{3}.
$$

Divide by $$2$$:

$$
\boxed{x=\frac{\pi}{6},\frac{5\pi}{6},\frac{7\pi}{6},\frac{11\pi}{6}}.
$$

The graph of $$y=2\cos(2x)-1$$ has period $$\pi$$ and crosses the $$x$$-axis at those four values on $$[0,2\pi)$$.

**ADD IMAGE OF GRAPH**

### Solution 7

The equation is

$$
\tan x+\cot x=4.
$$

Let

$$
t=\tan x.
$$

Then $$\cot x=\frac1t$$, so

$$
t+\frac1t=4.
$$

Multiply by $$t$$:

$$
t^2+1=4t.
$$

So

$$
t^2-4t+1=0.
$$

Use the quadratic formula:

$$
t=\frac{4\pm\sqrt{16-4}}{2}
=2\pm\sqrt3.
$$

Since

$$
\tan\left(\frac{\pi}{12}\right)=2-\sqrt3
$$

and

$$
\tan\left(\frac{5\pi}{12}\right)=2+\sqrt3,
$$

the solutions on $$[0,2\pi)$$ are

$$
\boxed{x=\frac{\pi}{12},\frac{5\pi}{12},\frac{13\pi}{12},\frac{17\pi}{12}}.
$$

### Solution 8

Use angle addition and subtraction formulas.

First,

$$
\sin75^\circ=\sin(45^\circ+30^\circ).
$$

So

$$
\sin75^\circ
=\sin45^\circ\cos30^\circ+\cos45^\circ\sin30^\circ.
$$

Thus

$$
\sin75^\circ
=\frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2}
+\frac{\sqrt2}{2}\cdot\frac12
=\frac{\sqrt6+\sqrt2}{4}.
$$

Next,

$$
\cos15^\circ=\cos(45^\circ-30^\circ).
$$

So

$$
\cos15^\circ
=\cos45^\circ\cos30^\circ+\sin45^\circ\sin30^\circ
=\frac{\sqrt6+\sqrt2}{4}.
$$

Finally,

$$
\tan105^\circ=\tan(60^\circ+45^\circ).
$$

Then

$$
\tan105^\circ
=\frac{\sqrt3+1}{1-\sqrt3}.
$$

Rationalize:

$$
\frac{\sqrt3+1}{1-\sqrt3}\cdot\frac{1+\sqrt3}{1+\sqrt3}
=\frac{4+2\sqrt3}{-2}
=-2-\sqrt3.
$$

Therefore

$$
\boxed{\sin75^\circ=\frac{\sqrt6+\sqrt2}{4}},
$$

$$
\boxed{\cos15^\circ=\frac{\sqrt6+\sqrt2}{4}},
$$

and

$$
\boxed{\tan105^\circ=-2-\sqrt3}.
$$

### Solution 9

Start with the left-hand side:

$$
\frac{\sin(x+y)+\sin(x-y)}{\cos(x+y)+\cos(x-y)}.
$$

Use sum-to-product formulas:

$$
\sin(x+y)+\sin(x-y)
=2\sin x\cos y.
$$

Also,

$$
\cos(x+y)+\cos(x-y)
=2\cos x\cos y.
$$

Therefore

$$
\frac{\sin(x+y)+\sin(x-y)}{\cos(x+y)+\cos(x-y)}
=\frac{2\sin x\cos y}{2\cos x\cos y}.
$$

Cancel:

$$
\frac{2\sin x\cos y}{2\cos x\cos y}
=\frac{\sin x}{\cos x}
=\tan x.
$$

Thus

$$
\boxed{\frac{\sin(x+y)+\sin(x-y)}{\cos(x+y)+\cos(x-y)}=\tan x}.
$$

### Solution 10

Use the sum-to-product formula:

$$
\cos A+\cos B
=2\cos\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right).
$$

With $$A=5x$$ and $$B=3x$$,

$$
\cos(5x)+\cos(3x)
=2\cos(4x)\cos x.
$$

So the equation becomes

$$
2\cos(4x)\cos x=0.
$$

Thus

$$
\cos(4x)=0
$$

or

$$
\cos x=0.
$$

For $$\cos x=0$$ on $$[0,2\pi)$$,

$$
x=\frac{\pi}{2},\frac{3\pi}{2}.
$$

For $$\cos(4x)=0$$,

$$
4x=\frac{\pi}{2}+k\pi.
$$

So

$$
x=\frac{\pi}{8}+\frac{k\pi}{4}.
$$

On $$[0,2\pi)$$, this gives

$$
x=\frac{\pi}{8},\frac{3\pi}{8},\frac{5\pi}{8},\frac{7\pi}{8},
\frac{9\pi}{8},\frac{11\pi}{8},\frac{13\pi}{8},\frac{15\pi}{8}.
$$

Therefore

$$
\boxed{x=\frac{\pi}{8},\frac{3\pi}{8},\frac{\pi}{2},\frac{5\pi}{8},\frac{7\pi}{8},\frac{9\pi}{8},\frac{11\pi}{8},\frac{3\pi}{2},\frac{13\pi}{8},\frac{15\pi}{8}}.
$$

The product-to-sum form

$$
\cos(5x)+\cos(3x)=2\cos(4x)\cos x
$$

shows that zeros occur whenever either factor is zero. A sketch should mark the eight zeros from $$\cos(4x)=0$$ and the two zeros from $$\cos x=0$$.

**ADD IMAGE OF GRAPH**

### Solution 11

Let

$$
\alpha=\cos^{-1}\frac35.
$$

Then $$\cos\alpha=\frac35$$, and since $$\alpha\in[0,\pi]$$, $$\alpha$$ is in Quadrant I. Therefore

$$
\sin\alpha=\frac45.
$$

So

$$
\sin\left(\cos^{-1}\frac35\right)=\frac45.
$$

Next, let

$$
\beta=\sin^{-1}\left(-\frac5{13}\right).
$$

Since $$\beta\in\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$$ and sine is negative, $$\beta$$ is in Quadrant IV. Thus

$$
\cos\beta=\frac{12}{13}.
$$

So

$$
\cos\left(\sin^{-1}\left(-\frac5{13}\right)\right)=\frac{12}{13}.
$$

Finally, let

$$
\gamma=\cos^{-1}\left(-\frac45\right).
$$

Then $$\gamma\in[0,\pi]$$ and cosine is negative, so $$\gamma$$ is in Quadrant II. Hence

$$
\sin\gamma=\frac35,
$$

and

$$
\tan\gamma=\frac{\frac35}{-\frac45}=-\frac34.
$$

Now add:

$$
\frac45+\frac{12}{13}-\frac34.
$$

Using common denominator $$260$$:

$$
\frac{208}{260}+\frac{240}{260}-\frac{195}{260}
=\frac{253}{260}.
$$

Therefore

$$
\boxed{\frac{253}{260}}.
$$

### Solution 12

First,

$$
\sin\frac{11\pi}{6}=-\frac12.
$$

The inverse sine range is

$$
\left[-\frac{\pi}{2},\frac{\pi}{2}\right],
$$

so

$$
\boxed{\sin^{-1}\left(\sin\frac{11\pi}{6}\right)=-\frac{\pi}{6}}.
$$

Next,

$$
\cos\frac{7\pi}{4}=\frac{\sqrt2}{2}.
$$

The inverse cosine range is $$[0,\pi]$$, so

$$
\boxed{\cos^{-1}\left(\cos\frac{7\pi}{4}\right)=\frac{\pi}{4}}.
$$

Finally,

$$
\tan\frac{5\pi}{4}=1.
$$

The inverse tangent range is

$$
\left(-\frac{\pi}{2},\frac{\pi}{2}\right),
$$

so

$$
\boxed{\tan^{-1}\left(\tan\frac{5\pi}{4}\right)=\frac{\pi}{4}}.
$$

### Solution 13

We are given

$$
\frac{\pi}{2}<\theta<\pi,
$$

so $$\theta$$ is in Quadrant II. Therefore

$$
\frac{\theta}{2}
$$

is in Quadrant I.

Since

$$
\cos\theta=-\frac35,
$$

the half-angle formulas give

$$
\sin\left(\frac{\theta}{2}\right)
=\sqrt{\frac{1-\cos\theta}{2}}.
$$

Substitute:

$$
\sin\left(\frac{\theta}{2}\right)
=\sqrt{\frac{1-\left(-\frac35\right)}{2}}
=\sqrt{\frac{\frac85}{2}}
=\sqrt{\frac45}
=\frac{2\sqrt5}{5}.
$$

Also,

$$
\cos\left(\frac{\theta}{2}\right)
=\sqrt{\frac{1+\cos\theta}{2}}
=\sqrt{\frac{1-\frac35}{2}}
=\sqrt{\frac{\frac25}{2}}
=\sqrt{\frac15}
=\frac{\sqrt5}{5}.
$$

Thus

$$
\tan\left(\frac{\theta}{2}\right)
=\frac{\sin\left(\frac{\theta}{2}\right)}{\cos\left(\frac{\theta}{2}\right)}
=2.
$$

Therefore

$$
\boxed{\sin\left(\frac{\theta}{2}\right)=\frac{2\sqrt5}{5}},
\qquad
\boxed{\cos\left(\frac{\theta}{2}\right)=\frac{\sqrt5}{5}},
\qquad
\boxed{\tan\left(\frac{\theta}{2}\right)=2}.
$$

### Solution 14

Start with

$$
4\sin^2x\cos^2x.
$$

Since

$$
\sin(2x)=2\sin x\cos x,
$$

we have

$$
4\sin^2x\cos^2x=\sin^2(2x).
$$

Use the power-reducing formula:

$$
\sin^2 u=\frac{1-\cos(2u)}{2}.
$$

With $$u=2x$$,

$$
\sin^2(2x)=\frac{1-\cos(4x)}{2}.
$$

Therefore

$$
\boxed{4\sin^2x\cos^2x=\frac{1-\cos(4x)}{2}}.
$$

Since $$\cos(4x)$$ ranges from $$-1$$ to $$1$$, the expression

$$
\frac{1-\cos(4x)}{2}
$$

ranges from

$$
\frac{1-1}{2}=0
$$

to

$$
\frac{1-(-1)}{2}=1.
$$

So the minimum is

$$
\boxed{0}
$$

and the maximum is

$$
\boxed{1}.
$$

### Solution 15

The high tide is $$11$$ feet and the low tide is $$3$$ feet. The midline is

$$
D=\frac{11+3}{2}=7.
$$

The amplitude is

$$
A=\frac{11-3}{2}=4.
$$

The time from high to the next low is half a period:

$$
8-2=6.
$$

So the period is

$$
12.
$$

Thus

$$
B=\frac{2\pi}{12}=\frac{\pi}{6}.
$$

Since the tide is at a high when $$t=2$$, use a positive cosine model:

$$
\boxed{H(t)=4\cos\left(\frac{\pi}{6}(t-2)\right)+7}.
$$

The period is

$$
\boxed{12\text{ hours}},
$$

and the midline is

$$
\boxed{H=7}.
$$

Now solve for when $$H(t)=9$$:

$$
9=4\cos\left(\frac{\pi}{6}(t-2)\right)+7.
$$

Then

$$
2=4\cos\left(\frac{\pi}{6}(t-2)\right),
$$

so

$$
\cos\left(\frac{\pi}{6}(t-2)\right)=\frac12.
$$

The first time after the high occurs when the angle is $$\frac{\pi}{3}$$:

$$
\frac{\pi}{6}(t-2)=\frac{\pi}{3}.
$$

Multiply by $$\frac6\pi$$:

$$
t-2=2.
$$

So

$$
\boxed{t=4\text{ hours}}.
$$

One full period runs from $$t=2$$ to $$t=14$$. The main key points are

$$
(2,11),\quad (5,7),\quad (8,3),\quad (11,7),\quad (14,11).
$$

The point where $$H(t)=9$$ first occurs after $$t=2$$ is

$$
\boxed{(4,9)}.
$$

**ADD IMAGE OF GRAPH**

### Solution 16

For part $$(A)$$, first note that

$$
a_1=\sqrt2=2\cdot\frac{\sqrt2}{2}=2\cos\left(\frac{\pi}{4}\right).
$$

Since

$$
\frac{\pi}{4}=\frac{\pi}{2^{2}},
$$

this matches

$$
a_1=2\cos\left(\frac{\pi}{2^{1+1}}\right).
$$

Now assume

$$
a_n=2\cos\left(\frac{\pi}{2^{n+1}}\right).
$$

Then

$$
a_{n+1}
=\sqrt{2+a_n}
=\sqrt{2+2\cos\left(\frac{\pi}{2^{n+1}}\right)}.
$$

Use the half-angle identity

$$
\cos\left(\frac{u}{2}\right)=\sqrt{\frac{1+\cos u}{2}}
$$

for angles in Quadrant I. Rearranging gives

$$
2\cos\left(\frac{u}{2}\right)=\sqrt{2+2\cos u}.
$$

With

$$
u=\frac{\pi}{2^{n+1}},
$$

we get

$$
a_{n+1}
=2\cos\left(\frac{\pi}{2^{n+2}}\right).
$$

Thus

$$
\boxed{a_n=2\cos\left(\frac{\pi}{2^{n+1}}\right)}.
$$

For part $$(B)$$, part $$(A)$$ gives

$$
\frac{a_n}{2}=\cos\left(\frac{\pi}{2^{n+1}}\right).
$$

Consider the finite product

$$
P_N=\prod_{n=1}^{N}\frac{a_n}{2}
=\prod_{n=1}^{N}\cos\left(\frac{\pi}{2^{n+1}}\right).
$$

Use the repeated double-angle identity

$$
\sin(2x)=2\sin x\cos x.
$$

Starting with $$x=\frac{\pi}{2^{N+1}}$$,

$$
\sin\left(\frac{\pi}{2}\right)
=2^N\sin\left(\frac{\pi}{2^{N+1}}\right)
\prod_{n=1}^{N}\cos\left(\frac{\pi}{2^{n+1}}\right).
$$

Since $$\sin\left(\frac{\pi}{2}\right)=1$$,

$$
1=2^N\sin\left(\frac{\pi}{2^{N+1}}\right)P_N.
$$

Therefore

$$
P_N=\frac{1}{2^N\sin\left(\frac{\pi}{2^{N+1}}\right)}.
$$

For part $$(C)$$, let

$$
u_N=\frac{\pi}{2^{N+1}}.
$$

Then

$$
2^N=\frac{\pi}{2u_N}.
$$

So

$$
P_N=\frac{1}{2^N\sin u_N}
=\frac{1}{\frac{\pi}{2u_N}\sin u_N}
=\frac{2}{\pi}\cdot\frac{u_N}{\sin u_N}.
$$

As $$N\to\infty$$, $$u_N\to0$$, and

$$
\frac{u_N}{\sin u_N}\to1.
$$

Thus

$$
\lim_{N\to\infty}P_N=\frac2\pi.
$$

Since

$$
\frac{a_1}{2}=\frac{\sqrt2}{2},
$$

$$
\frac{a_2}{2}=\frac{\sqrt{2+\sqrt2}}{2},
$$

and so on, we get Viète's product:

$$
\boxed{
\frac{2}{\pi}
=\frac{\sqrt2}{2}\cdot
\frac{\sqrt{2+\sqrt2}}{2}\cdot
\frac{\sqrt{2+\sqrt{2+\sqrt2}}}{2}\cdots
}.
$$
