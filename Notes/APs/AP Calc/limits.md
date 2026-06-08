---
layout: default
title: "Unit 1: Limits and Continuity"
parent: "AP Calculus AB/BC"
nav_order: 1
permalink: /notes/math/limits/
---

# Unit 1: Limits and Continuity

<div class="example-box" markdown="1">

**Example — Trig limit with linear scaling**

Problem: Evaluate $$\displaystyle\lim_{x\to0}\frac{\sin(5x)}{x}.$$ 

Strategy: Manipulate the expression to match the standard limit $$\lim_{u\to0}\frac{\sin u}{u}=1$$ by substituting $$u=5x$$.

Solution:

\begin{align*}
\frac{\sin(5x)}{x} &= 5\cdot\frac{\sin(5x)}{5x}\\
&=5\cdot\frac{\sin u}{u}\quad( u=5x ).
\end{align*}

As $$x\to0$$, we have $$u\to0$$, and therefore $$\frac{\sin u}{u}\to1$$. Hence the limit equals $$5\cdot1=5$$.

Answer: $$5$$.

</div>

---

## Practice

1. Evaluate $$\displaystyle\lim_{x\to 1}\frac{x^3-1}{x-1}$$.
2. Find the one-sided limits and determine whether the two-sided limit exists for

	$$f(x)=\begin{cases}x+2,&x<0,\\3-x,&x\ge0.\end{cases}$$
3. Compute $$\displaystyle\lim_{x\to0}x^2\ln(1+x)$$.
4. Evaluate $$\displaystyle\lim_{x\to0}\frac{\sin(3x)-3x}{x^3}$$.
5. Find $$\displaystyle\lim_{x\to\infty}\frac{5x^3-2x}{x^3+4}$$ and state any horizontal asymptote.
6. Let $$h(x)=\begin{cases}\frac{\sqrt{x+4}-2}{x-0},&x\ne0,\\a,&x=0.\end{cases}$$ Find $$a$$ so that $$h$$ is continuous at $$0$$.

---

## Solutions

<div class="theorem-box" markdown="1">

**Solutions (detailed)**

1. Factor numerator: $$x^3-1=(x-1)(x^2+x+1)$$. Cancel and evaluate: $$\lim_{x\to1}(x^2+x+1)=3.$$ 

2. Left: $$\lim_{x\to0^-}(x+2)=2$$. Right: $$\lim_{x\to0^+}(3-x)=3$$. Two-sided limit DNE (values differ).

3. Use expansion: $$\ln(1+x)=x-\tfrac{x^2}{2}+O(x^3)$$, so $$x^2\ln(1+x)=x^3+O(x^4)\to0$$. Limit is 0.

4. Use Taylor expansions: $$\sin(3x)=3x-\frac{(3x)^3}{6}+O(x^5)=3x-\frac{27x^3}{6}+O(x^5).$$ Thus numerator $$\sin(3x)-3x\sim -\frac{27x^3}{6}$$ and dividing by $$x^3$$ gives $$-\frac{27}{6}=-\frac{9}{2}$$.

5. Divide by $$x^3$$: $$\frac{5-2/x^2}{1+4/x^3}\to5$$. Horizontal asymptote $$y=5$$.

6. For $$x\ne0$$, simplify numerator using conjugate: $$\frac{\sqrt{x+4}-2}{x}=\frac{x}{x(\sqrt{x+4}+2)}=\frac{1}{\sqrt{x+4}+2}$$. Taking limit as $$x\to0$$ gives $$\frac{1}{4}$$. Therefore set $$a=1/4$$ to make $$h$$ continuous.

</div>

Limits describe the value a function approaches as the input gets close to a point. In AP Calculus, we use limits to analyze nearby behavior, compare one-sided approaches, study asymptotes, and prepare for the derivative.

---

## What a limit means

We write

$$
\lim_{x \to a} f(x) = L
$$

if we can make $$f(x)$$ as close to $$L$$ as we want by taking $$x$$ sufficiently close to $$a$$, with $$x \ne a$$.

This is about nearby behavior, not direct substitution. It is possible for:

- the limit to exist while $$f(a)$$ is undefined,
- the limit to exist while $$f(a) \ne L$$,
- the limit to fail even though $$f(a)$$ exists.

A quick check is direct substitution. If substituting $$x = a$$ gives a finite number and the expression is defined there, the limit is usually that number.
 
<div class="example-box" markdown="1">

**Example — Direct substitution**

Problem: Find $$\displaystyle\lim_{x\to 2}\bigl(3x^2-1\bigr).$$

Strategy: Polynomials are continuous everywhere, so evaluate the function at the point.

Solution:

\begin{align*}
\lim_{x\to 2}(3x^2-1) &= 3(2)^2-1\\
&= 3\cdot4-1\\
&=11.
\end{align*}

Answer: $$11$$.

Note: When a function is continuous at the point, direct substitution is the quickest method.

</div>

---

## One-sided and two-sided limits

A one-sided limit describes the value approached from one direction only.

- Left-hand limit: $$\lim_{x \to a^-} f(x)$$
- Right-hand limit: $$\lim_{x \to a^+} f(x)$$

A two-sided limit exists exactly when both one-sided limits exist and agree:

$$
\lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L.
$$

If the left-hand and right-hand limits disagree, then the two-sided limit does not exist.

Common reasons a limit fails to exist:

- Jump discontinuity,
- Vertical asymptote with unbounded behavior,
- Oscillation, such as $$\sin(1/x)$$ near $$x = 0$$.

> [Image Placeholder: left-hand vs right-hand limit examples, including a jump discontinuity]

<div class="example-box" markdown="1">

**Example — One-sided limits (jump discontinuity)**

Problem: Let $$f(x)=\begin{cases}1,&x<0,\\2,&x\ge0.\end{cases}$$ Determine the one-sided limits at $$0$$ and decide if the two-sided limit exists.

Strategy: Compute the left- and right-hand limits separately by approaching 0 from each side.

Solution:

- Left-hand limit: $$\displaystyle\lim_{x\to0^-}f(x)=1$$ because for values slightly less than 0 the function value is 1.
- Right-hand limit: $$\displaystyle\lim_{x\to0^+}f(x)=2$$ because for values slightly greater than or equal to 0 the function value is 2.

Since the two one-sided limits are different, the two-sided limit $$\lim_{x\to0}f(x)$$ does not exist.

Answer: Left limit = 1; right limit = 2; two-sided limit does not exist (DNE).

</div>


---

## Limit laws and direct substitution

If $$\lim_{x \to a} f(x) = L$$ and $$\lim_{x \to a} g(x) = M$$, then:

$$
\lim_{x \to a} (f(x) \pm g(x)) = L \pm M,
$$

$$
\lim_{x \to a} (f(x)g(x)) = LM,
$$

$$
\lim_{x \to a} \frac{f(x)}{g(x)} = \frac{L}{M}, \qquad M \ne 0,
$$

$$
\lim_{x \to a} [f(x)]^n = L^n.
$$

For polynomials and rational functions, direct substitution works whenever the denominator is nonzero. If substitution gives a finite number, the limit is usually that number.

<div class="theorem-box" markdown="1">

**Proof (Limit Laws).** A limit statement means the function values can be forced arbitrarily close to a target value. If $$f(x)$$ is close to $$L$$ and $$g(x)$$ is close to $$M$$, then their sum is close to $$L + M$$, their product is close to $$LM$$, and their quotient is close to $$L/M$$ as long as $$M \ne 0$$.

A key idea is that the limit might not be exactly at the input value, but the function values can get arbitrarily close to the target. In AP Calculus, we often think of the small error as $$\varepsilon$$, which becomes negligible when the limit exists.

</div>

---

## Indeterminate forms and algebraic techniques

Direct substitution sometimes gives an indeterminate form, which means the algebraic structure must be simplified before the limit can be found. Common indeterminate forms include:

- $$0/0$$
- $$\infty/\infty$$
- $$0 \cdot \infty$$
- $$\infty - \infty$$
- $$1^\infty$$
- $$0^0$$
- $$\infty^0$$

In AP Calculus AB/BC, most of these are handled with algebra rather than advanced rules.

Common algebraic techniques:

- Factor and cancel a common factor,
- Multiply by a conjugate when radicals are involved,
- Combine fractions into a single rational expression,
- Use a known trig limit after rewriting the angle,
- Divide by the dominant power of $$x$$ for limits at infinity.

Most AP limit work is about recognizing whether direct substitution works or whether the expression hides competing behavior.

<div class="example-box" markdown="1">

**Example — Factor and cancel (removable form)**

Problem: Evaluate $$\displaystyle\lim_{x\to3}\frac{x^2-9}{x-3}.$$ 

Strategy: Factor the numerator to reveal and cancel the removable factor producing the indeterminate form $$0/0$$.

Solution:

\begin{align*}
\frac{x^2-9}{x-3} &= \frac{(x-3)(x+3)}{x-3}\quad(x\ne3)\\
&= x+3.
\end{align*}

Now take the limit of the simplified expression:

$$\lim_{x\to3}(x+3)=6.$$ 

Answer: $$6$$.

Remark: Cancelling is safe because limit concerns values arbitrarily close to, but not equal to, the point.

</div>

<div class="example-box" markdown="1">

**Example — Conjugate trick (radicals)**

Problem: Compute $$\displaystyle\lim_{x\to0}\frac{\sqrt{x+1}-1}{x}.$$ 

Strategy: Multiply numerator and denominator by the conjugate to eliminate the radical and remove the indeterminate form $$0/0$$.

Solution:

Multiply by the conjugate:

\begin{align*}
\frac{\sqrt{x+1}-1}{x}&=\frac{(\sqrt{x+1}-1)(\sqrt{x+1}+1)}{x(\sqrt{x+1}+1)}\\
&=\frac{x}{x(\sqrt{x+1}+1)}\\
&=\frac{1}{\sqrt{x+1}+1},\qquad x\ne0.
\end{align*}

Take the limit as $$x\to0$$:

$$\lim_{x\to0}\frac{1}{\sqrt{x+1}+1}=\frac{1}{\sqrt{1}+1}=\frac{1}{2}.$$ 

Answer: $$\tfrac12$$.

</div>


It is very important to note that if you get a form that is NOT one of these you cannot do any operation to simplify it! For example, if you get the limit is $$\infty/3$$, it is not an indeterminate form!

---

## Squeeze Theorem

If

$$
g(x) \le f(x) \le h(x)
$$

for all $$x$$ near $$a$$, and

$$
\lim_{x \to a} g(x) = \lim_{x \to a} h(x) = L,
$$

then

$$
\lim_{x \to a} f(x) = L.
$$

<div class="theorem-box" markdown="1">

**Proof (Squeeze Theorem).** If $$g(x) \le f(x) \le h(x)$$ and both outside functions are forced close to $$L$$, then $$f(x)$$ has nowhere else to go. For inputs close enough to $$a$$, both $$g(x)$$ and $$h(x)$$ lie inside a tiny band around $$L$$. Since $$f(x)$$ is trapped between them, it must lie inside the same band.

</div>

<div class="example-box" markdown="1">

**Example — Squeeze Theorem (oscillatory factor)**

Problem: Show that $$\displaystyle\lim_{x\to0}x\sin\frac{1}{x}=0.$$ 

Strategy: Use inequalities that bound the oscillatory factor and then apply the Squeeze Theorem.

Solution:

We have for all real $$t$$ that $$-1\le\sin t\le1$$. Set $$t=1/x$$ to get

$$-1\le\sin\frac{1}{x}\le1.$$ 

Multiplying the inequality by $$|x|$$ (which is nonnegative) yields

$$-\lvert x\rvert\le x\sin\frac{1}{x}\le\lvert x\rvert.$$ 

Since $$\lim_{x\to0}-\lvert x\rvert=0$$ and $$\lim_{x\to0}\lvert x\rvert=0$$, the Squeeze Theorem implies

$$\lim_{x\to0}x\sin\frac{1}{x}=0.$$ 

Answer: $$0$$.

</div>

---

## Important trig limits

Two core limits that appear often are:

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1,
$$

$$
\lim_{x \to 0} \frac{\tan x}{x} = 1.
$$

These are valid only in radians. They are frequently used after rewriting a trig expression into a form that matches one of these limits. It is important to note that $$cos x$$ is not a part of this because the limit of $$\lim_{x \to 0} \frac{\cos x}{x}$$ can be easily solved by plugging $$0$$ into the expression.

<div class="example-box" markdown="1">

**Example (Trig limit):** Evaluate $$\lim_{x\to 0} \frac{\sin(5x)}{x}$$.

Rewrite as $$5\cdot\frac{\sin(5x)}{5x}$$. As $$x\to0$$, $$\frac{\sin(5x)}{5x}\to1$$, so the limit is $$5$$.

</div>

---

## Limits at infinity and asymptotic behavior

We also study

$$
\lim_{x \to \infty} f(x), \qquad \lim_{x \to -\infty} f(x),
$$

or as more commonly known as end behavior.

For rational functions:

- If degree numerator < degree denominator: the limit is $$0$$,
- If the degrees are equal: the limit is the ratio of leading coefficients,
- If degree numerator > degree denominator: there is no finite horizontal asymptote (the function may have a slant or oblique asymptote).

A useful asymptotic idea is:

$$
\sqrt{x^2 + C} \sim \lvert x \rvert
$$ (where C is a constant)

for large $$\lvert x \rvert$$, but be careful with the sign when $$x \to -\infty$$.

<div class="example-box" markdown="1">

**Example (Limit at infinity):** Evaluate $$\lim_{x\to\infty} \frac{3x^2+5x}{2x^2-7}$$.

Divide numerator and denominator by $$x^2$$ to get $$\frac{3+5/x}{2-7/x^2}\to\frac{3}{2}$$, so the horizontal asymptote is $$y=3/2$$.

</div>

---

## Continuity

A function is continuous at $$x = a$$ when:

1. $$f(a)$$ exists,
2. $$\lim_{x \to a} f(x)$$ exists,
3. $$\lim_{x \to a} f(x) = f(a).$$

Continuity means the nearby behavior of the function matches the value at the point.

Types of discontinuities:

- Removable: a hole, often fixable by redefining one point,
- Jump: left and right limits differ,
- Infinite: a vertical asymptote,
- Oscillatory: no single nearby trend.

Functions that are continuous on their natural domains include:

- Polynomials,
- Rational functions where the denominator is nonzero,
- Exponential and logarithmic functions on their domains,
- Trigonometric functions on their domains,
- Compositions of continuous functions where defined.

<div class="example-box" markdown="1">

**Example (Removable discontinuity):** Let

$$
g(x)=\begin{cases} \frac{x^2-1}{x-1} & x\ne1,\\ 5 & x=1. \end{cases}
$$

For $$x\ne1$$, $$g(x)=x+1$$. The limit as $$x\to1$$ is $$2$$, but $$g(1)=5$$, so the function has a removable discontinuity at 1. Redefining $$g(1)=2$$ makes it continuous.

</div>

---

## Intermediate Value Theorem

If $$f$$ is continuous on $$[a,b]$$ and $$N$$ lies between $$f(a)$$ and $$f(b)$$, then there exists some $$c \in (a,b)$$ such that $$f(c) = N$$.

This theorem guarantees at least one solution, but it does not tell you how many.

> [Image Placeholder: continuous curve crossing a horizontal line to illustrate IVT]

<div class="theorem-box" markdown="1">

**Proof (IVT).** Continuity means the graph cannot jump over a height. If the function starts below $$N$$ and ends above $$N$$, then moving from $$a$$ to $$b$$ forces the output to pass through every intermediate height. A discontinuity could skip the height, but a continuous function cannot.

</div>

---

<div class="example-box" markdown="1">

**Example (IVT):** Suppose $$f$$ is continuous on $$[0,2]$$ with $$f(0)=-1$$ and $$f(2)=3$$. By the IVT, for any value between -1 and 3 (for instance, 0), there exists $$c\in(0,2)$$ with $$f(c)=0$$.

</div>

## Average rate of change (Introduction to derivatives)

On $$[a,b]$$, the average rate of change is modeled by

$$
\frac{f(b) - f(a)}{b-a}
$$.

This is also the slope of the secant line. The derivative will be the limit of this expression as the interval shrinks toward a single point. This will be explored more in Unit 2.

<div class="example-box" markdown="1">

**Example (Average rate of change):** For $$f(x)=x^2$$ on $$[1,3]$$, the average rate of change is

$$\frac{f(3)-f(1)}{3-1}=\frac{9-1}{2}=4.$$ This is the slope of the secant line between the two points. The derivative at a point is the limit of such secant slopes; for $$f(x)=x^2$$, $$f'(x)=2x$$.

</div>
