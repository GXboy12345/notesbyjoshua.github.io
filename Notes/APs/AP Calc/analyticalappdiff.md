---
layout: default
title: "Unit 5: Analytical Applications of Differentiation"
parent: "AP Calculus AB/BC"
nav_order: 5
permalink: /notes/math/analyticalappdiff/
---

# Unit 5: Analytical Applications of Differentiation

This unit uses derivatives to analyze the full shape of a function: where it rises or falls, where it bends, where extrema occur, and how to justify conclusions rigorously.

---

## Critical points

A critical point of $$f$$ occurs at $$x=c$$ where:

- $$f'(c) = 0$$, or
- $$f'(c)$$ does not exist,

provided $$c$$ is in the domain of $$f$$.

---

## Increasing and decreasing

- $$f'(x) > 0$$ on an interval implies $$f$$ is increasing there.
- $$f'(x) < 0$$ on an interval implies $$f$$ is decreasing there.

Sign charts are the cleanest way to justify interval behavior.

---

## First Derivative Test

If $$f'$$ changes:

- positive to negative at $$c$$: local maximum,
- negative to positive at $$c$$: local minimum,
- no sign change: neither.

---

## Concavity and second derivative

- $$f''(x) > 0$$ means $$f$$ is concave up.
- $$f''(x) < 0$$ means $$f$$ is concave down.

An inflection point is a point where concavity changes.

> [Image Placeholder: graph showing local extrema and inflection points with sign charts]

---

## Second Derivative Test

If $$f'(c)=0$$ and:

- $$f''(c)>0$$, then $$f$$ has a local minimum at $$c$$,
- $$f''(c)<0$$, then $$f$$ has a local maximum at $$c$$,
- $$f''(c)=0$$, the test is inconclusive.

---

## Absolute extrema on a closed interval

To find absolute max/min of $$f$$ on $$[a,b]$$:

1. Find critical points inside $$ (a,b) $$.
2. Evaluate $$f$$ at each critical point.
3. Evaluate $$f(a)$$ and $$f(b)$$.
4. Compare all values.

---

## Mean Value Theorem

If $$f$$ is continuous on $$[a,b]$$ and differentiable on $$(a,b)$$, then there exists $$c \in (a,b)$$ such that

$$
f'(c) = \frac{f(b)-f(a)}{b-a}.
$$

Rolle's Theorem is the special case where $$f(a)=f(b)$$.

---

## Curve sketching framework

A solid derivative-based sketch includes:

- intercepts,
- asymptotes if relevant,
- intervals increasing/decreasing,
- local extrema,
- intervals concave up/down,
- inflection points,
- end behavior.

---

## Optimization

Standard process:

1. Identify the quantity to optimize.
2. Write it as a function of one variable.
3. Determine the feasible domain.
4. Differentiate and find critical points.
5. Test candidates and interpret.

---

## L'Hopital's Rule

If a limit produces $$0/0$$ or $$\infty/\infty$$ and the hypotheses are satisfied, then

$$
\lim_{x \to a} \frac{f(x)}{g(x)}
=
\lim_{x \to a} \frac{f'(x)}{g'(x)}
$$

provided the new limit exists in a usable way.

---

## Linearization and Newton's method

Linearization:

$$
L(x) = f(a)+f'(a)(x-a).
$$

Newton's method for approximating roots:

$$
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}.
$$

> [Image Placeholder: Newton's method tangent-line iteration toward a root]

---

## Function analysis as a sign story

Most of this unit is about reading signs:

- the sign of $$f'$$ tells whether $$f$$ is increasing or decreasing,
- the sign of $$f''$$ tells whether $$f'$$ is increasing or decreasing,
- a sign change in $$f'$$ identifies local extrema,
- a sign change in $$f''$$ identifies changes in concavity.

This is why sign charts are more than bookkeeping. They translate derivative information into graph behavior.

<div class="theorem-box" markdown="1">

**Key idea.** A zero of $$f'$$ is only a candidate for an extremum. The behavior around that point decides what actually happens.

</div>

---

## Critical points and candidates

Critical points occur where $$f'(c)=0$$ or $$f'(c)$$ does not exist, as long as $$c$$ is in the domain of $$f$$.

For local extrema, critical points are candidates. For absolute extrema on a closed interval, endpoints are also candidates.

That distinction matters:

- endpoints can be absolute extrema,
- endpoints are not local extrema under the usual AP definition,
- interior critical points may or may not be extrema.

When justifying an absolute maximum or minimum, compare function values, not derivative values.

---

## Concavity as rate behavior

Concavity describes how the slope changes.

If $$f''(x)>0$$, then $$f'(x)$$ is increasing. The graph of $$f$$ bends upward because its slopes are becoming more positive or less negative.

If $$f''(x)<0$$, then $$f'(x)$$ is decreasing. The graph bends downward because its slopes are becoming less positive or more negative.

An inflection point requires a change in concavity. The equation $$f''(x)=0$$ only gives a possible location.

---

## The Mean Value Theorem in words

The Mean Value Theorem says that under the right smoothness conditions, some instantaneous rate equals the average rate over the interval.

The hypotheses are essential:

- continuous on $$[a,b]$$,
- differentiable on $$(a,b)$$.

If either hypothesis fails, the theorem may not apply, even if the conclusion happens to be true.

Rolle's Theorem is the same idea when the average rate is zero. If a smooth function starts and ends at the same height, then somewhere in between it has a horizontal tangent.

---

## Optimization structure

Optimization problems mix modeling with calculus. The derivative only works after the quantity being optimized is written as a one-variable function.

The domain is part of the model. A critical point outside the feasible domain does not answer the contextual question.

For closed feasible intervals, compare endpoint and critical-point values. For open or unbounded domains, use derivative sign changes or limiting behavior to justify the optimum.

---

## L'Hopital's Rule carefully

L'Hopital's Rule applies to limits that produce

$$
\frac{0}{0}
\quad\text{or}\quad
\frac{\infty}{\infty}.
$$

It does not apply just because a fraction is present. Check the original form first.

For other indeterminate forms, rewrite before using the rule. For instance, products, differences, and powers may need algebra or logarithms before they become a quotient form.

---

## Newton's method intuition

Newton's method uses tangent lines to approximate roots. Starting from $$x_n$$, the tangent line to $$f$$ at $$x_n$$ crosses the $$x$$-axis at

$$
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}.
$$

The method works best when the starting guess is close to the root and the derivative is not near zero. If the tangent line is nearly horizontal, the next approximation can jump far away.

---

## Common mistakes

- Calling every critical point an extremum.
- Using the second derivative test when $$f'(c) \ne 0$$.
- Forgetting endpoints in absolute-extrema problems.
- Claiming an inflection point from $$f''=0$$ without checking concavity change.
