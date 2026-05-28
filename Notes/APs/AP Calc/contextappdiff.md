---
layout: default
title: "Unit 4: Contextual Applications of Differentiation"
parent: "AP Calculus AB/BC"
nav_order: 4
permalink: /notes/math/contextappdiff/
---

# Unit 4: Contextual Applications of Differentiation

This unit translates derivative ideas into real-world language. The math is usually not harder than earlier differentiation, but the interpretation must be precise.

---

## Rates of change in context

:::theorem{name="Rates of change in context"}
If $$Q(t)$$ is a quantity depending on time, then:

- $$Q'(t)$$ is the instantaneous rate of change of $$Q$$,
- units of $$Q'(t)$$ are units of $$Q$$ per unit of $$t$$.
:::

:::tip
Always interpret both sign and units.
:::

---

## Average vs instantaneous rate

:::theorem{name="Average vs instantaneous rate"}
Average rate on $$[a,b]$$:

$$
\frac{Q(b)-Q(a)}{b-a}
$$

Instantaneous rate at $$t=a$$:

$$
Q'(a).
$$
:::

---

## Position, velocity, acceleration

If position is $$s(t)$$, then

:::theorem{name="Position, velocity, acceleration"}
$$
v(t) = s'(t), \qquad a(t) = v'(t) = s''(t).
$$

Interpret carefully:

- $$v(t) > 0$$ means motion in the positive direction,
- $$v(t) < 0$$ means motion in the negative direction,
- speed is $$\lvert v(t) \rvert$$.
:::

:::tip
Speed increasing:

- $$v(t) > 0$$ and $$a(t) > 0$$, or
- $$v(t) < 0$$ and $$a(t) < 0$$.
:::

---

## Rate in, rate out, and accumulation

If a quantity changes because something enters and leaves, then:

:::theorem{name="Net change rate"}
$$
\text{net change rate} = \text{rate in} - \text{rate out}.
$$

If $$R(t)$$ is the rate entering a tank and $$L(t)$$ is the rate leaving, then:

$$
V'(t) = R(t) - L(t).
$$
:::

---

## Interpreting graphs in context

Given a graph of a function:

- slope tells rate of change,
- steep positive slope means rapid increase,
- slope near zero means little short-term change,
- concavity tells whether the rate itself is increasing or decreasing.

Given a graph of a derivative:

- positive derivative means original function is increasing,
- negative derivative means decreasing,
- derivative crossing zero may indicate an extremum in the original function.

:::placeholder
[Image Placeholder: contextual graph with slope interpretation at several labeled points]
:::

---

## Related rates in context

Related rates problems are mostly about translation. The key source equations usually come from:

- Pythagorean theorem,
- volume formulas,
- area formulas,
- similar triangles.

:::tip
If the problem asks how fast a quantity is changing, the final answer should usually be a value of a derivative with units.
:::

---

## Linearization and differentials

Near $$x=a$$,

:::key{name="Linearization"}
$$
L(x) = f(a) + f'(a)(x-a)
$$
:::

approximates $$f(x)$$.

Differentials use the same idea:

:::key{name="Differential"}
$$
dy = f'(x)\,dx.
$$
:::

If a measured input has small error $$dx$$, then the output error is approximately $$dy$$.

---

## Marginal analysis

:::theorem{name="Marginal analysis"}
In economics-flavored problems:

- cost function $$C(x)$$,
- revenue function $$R(x)$$,
- profit $$P(x) = R(x)-C(x)$$.

Then:

- marginal cost is $$C'(x)$$,
- marginal revenue is $$R'(x)$$,
- marginal profit is $$P'(x)$$.
:::

At large production levels, these are interpreted as approximate change from one additional unit.

---

## Common contextual verbs

:::tip
- increasing means derivative positive,
- decreasing means derivative negative,
- at what rate means derivative value,
- how fast often means magnitude, but read carefully,
- changing more rapidly compares derivative magnitudes or second derivatives depending on context.
:::

---

:::mistakes
- Reporting velocity when the question asks for speed.
- Giving a derivative without units.
- Using the wrong variable as the independent variable.
- Forgetting to evaluate at the specified time or input.
:::
