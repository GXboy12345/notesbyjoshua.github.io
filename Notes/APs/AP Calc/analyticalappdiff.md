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

:::theorem{name="Critical point"}
A critical point of $$f$$ occurs at $$x=c$$ where:

- $$f'(c) = 0$$, or
- $$f'(c)$$ does not exist,

provided $$c$$ is in the domain of $$f$$.
:::

---

## Increasing and decreasing

- $$f'(x) > 0$$ on an interval implies $$f$$ is increasing there.
- $$f'(x) < 0$$ on an interval implies $$f$$ is decreasing there.

:::tip
Sign charts are the cleanest way to justify interval behavior.
:::

---

## First Derivative Test

:::theorem{name="First Derivative Test"}
If $$f'$$ changes:

- positive to negative at $$c$$: local maximum,
- negative to positive at $$c$$: local minimum,
- no sign change: neither.
:::

---

## Concavity and second derivative

:::theorem{name="Concavity and inflection"}
- $$f''(x) > 0$$ means $$f$$ is concave up.
- $$f''(x) < 0$$ means $$f$$ is concave down.

An inflection point is a point where concavity changes.
:::

:::placeholder
[Image Placeholder: graph showing local extrema and inflection points with sign charts]
:::

---

## Second Derivative Test

:::theorem{name="Second Derivative Test"}
If $$f'(c)=0$$ and:

- $$f''(c)>0$$, then $$f$$ has a local minimum at $$c$$,
- $$f''(c)<0$$, then $$f$$ has a local maximum at $$c$$,
- $$f''(c)=0$$, the test is inconclusive.
:::

---

## Absolute extrema on a closed interval

To find absolute max/min of $$f$$ on $$[a,b]$$:

1. Find critical points inside $$ (a,b) $$.
2. Evaluate $$f$$ at each critical point.
3. Evaluate $$f(a)$$ and $$f(b)$$.
4. Compare all values.

---

## Mean Value Theorem

:::theorem{name="Mean Value Theorem"}
If $$f$$ is continuous on $$[a,b]$$ and differentiable on $$(a,b)$$, then there exists $$c \in (a,b)$$ such that

$$
f'(c) = \frac{f(b)-f(a)}{b-a}.
$$

Rolle's Theorem is the special case where $$f(a)=f(b)$$.
:::

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

:::theorem{name="L'Hopital's Rule"}
If a limit produces $$0/0$$ or $$\infty/\infty$$ and the hypotheses are satisfied, then

$$
\lim_{x \to a} \frac{f(x)}{g(x)}
=
\lim_{x \to a} \frac{f'(x)}{g'(x)}
$$

provided the new limit exists in a usable way.
:::

---

## Linearization and Newton's method

Linearization:

:::key{name="Linearization"}
$$
L(x) = f(a)+f'(a)(x-a).
$$
:::

Newton's method for approximating roots:

:::key{name="Newton's method"}
$$
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}.
$$
:::

:::placeholder
[Image Placeholder: Newton's method tangent-line iteration toward a root]
:::

---

:::mistakes
- Calling every critical point an extremum.
- Using the second derivative test when $$f'(c) \ne 0$$.
- Forgetting endpoints in absolute-extrema problems.
- Claiming an inflection point from $$f''=0$$ without checking concavity change.
:::
