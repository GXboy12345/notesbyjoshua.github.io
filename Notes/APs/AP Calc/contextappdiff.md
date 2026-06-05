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

If $$Q(t)$$ is a quantity depending on time, then:

- $$Q'(t)$$ is the instantaneous rate of change of $$Q$$,
- units of $$Q'(t)$$ are units of $$Q$$ per unit of $$t$$.

Always interpret both sign and units.

---

## Average vs instantaneous rate

Average rate on $$[a,b]$$:

$$
\frac{Q(b)-Q(a)}{b-a}
$$

Instantaneous rate at $$t=a$$:

$$
Q'(a).
$$

---

## Position, velocity, acceleration

If position is $$s(t)$$, then

$$
v(t) = s'(t), \qquad a(t) = v'(t) = s''(t).
$$

Interpret carefully:

- $$v(t) > 0$$ means motion in the positive direction,
- $$v(t) < 0$$ means motion in the negative direction,
- speed is $$\lvert v(t) \rvert$$.

Speed increasing:

- $$v(t) > 0$$ and $$a(t) > 0$$, or
- $$v(t) < 0$$ and $$a(t) < 0$$.

<div class="theorem-box" markdown="1">

**Why same signs mean speed increases.** Speed is $$|v(t)|$$, so it measures how far velocity is from $$0$$. If $$v>0$$ and $$a=v'>0$$, then velocity is positive and getting larger, so $$|v|$$ increases. If $$v<0$$ and $$a<0$$, then velocity is negative and becoming more negative, so it is moving farther from $$0$$, and $$|v|$$ also increases.

When velocity and acceleration have opposite signs, velocity moves closer to $$0$$, so speed decreases.

</div>

---

## Rate in, rate out, and accumulation

If a quantity changes because something enters and leaves, then:

$$
\text{net change rate} = \text{rate in} - \text{rate out}.
$$

If $$R(t)$$ is the rate entering a tank and $$L(t)$$ is the rate leaving, then:

$$
V'(t) = R(t) - L(t).
$$

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

> [Image Placeholder: contextual graph with slope interpretation at several labeled points]

---

## Related rates in context

Related rates problems are mostly about translation. The key source equations usually come from:

- Pythagorean theorem,
- volume formulas,
- area formulas,
- similar triangles.

If the problem asks how fast a quantity is changing, the final answer should usually be a value of a derivative with units.

---

## Linearization and differentials

Near $$x=a$$,

$$
L(x) = f(a) + f'(a)(x-a)
$$

approximates $$f(x)$$.

Differentials use the same idea:

$$
dy = f'(x)\,dx.
$$

If a measured input has small error $$dx$$, then the output error is approximately $$dy$$.

<div class="theorem-box" markdown="1">

**Why linearization works.** Differentiability at $$a$$ means

$$
f'(a)=\lim_{x\to a}\frac{f(x)-f(a)}{x-a}.
$$

For $$x$$ close to $$a$$, the difference quotient is close to $$f'(a)$$, so

$$
\frac{f(x)-f(a)}{x-a}\approx f'(a).
$$

Multiplying by $$x-a$$ gives

$$
f(x)\approx f(a)+f'(a)(x-a).
$$

</div>

---

## Marginal analysis

In economics-flavored problems:

- cost function $$C(x)$$,
- revenue function $$R(x)$$,
- profit $$P(x) = R(x)-C(x)$$.

Then:

- marginal cost is $$C'(x)$$,
- marginal revenue is $$R'(x)$$,
- marginal profit is $$P'(x)$$.

At large production levels, these are interpreted as approximate change from one additional unit.

---

## Common contextual verbs

- increasing means derivative positive,
- decreasing means derivative negative,
- at what rate means derivative value,
- how fast often means magnitude, but read carefully,
- changing more rapidly compares derivative magnitudes or second derivatives depending on context.

---

## Reading derivative statements in words

A derivative value is not just a number. A complete interpretation usually needs:

- the quantity changing,
- the input value or time,
- the direction of change if the sign matters,
- correct units.

If $$H(t)$$ is height in meters and $$H'(3)=-2$$, then at $$t=3$$ the height is decreasing at $$2$$ meters per unit of time. The negative sign means the height is going down; the magnitude $$2$$ describes the speed of that change.

<div class="theorem-box" markdown="1">

**AP language.** "At time $$t=a$$, the quantity is changing at a rate of ..." is usually safer than saying only "the derivative is ..."

</div>

---

## Derivatives of units

Units help you check whether your answer makes sense.

If a function measures gallons and the input is minutes, the derivative measures gallons per minute. If that derivative is integrated over minutes, the result returns to gallons.

This creates a useful loop:

$$
\text{quantity}
\xrightarrow{\text{differentiate}}
\text{rate}
\xrightarrow{\text{integrate}}
\text{change in quantity}.
$$

When a problem involves a rate in and a rate out, the sign of the net rate tells whether the total amount is increasing or decreasing.

---

## Motion interpretation

For motion on a line, position, velocity, acceleration, and speed are related but not interchangeable.

Velocity:

$$
v(t)=s'(t)
$$

includes direction. Speed:

$$
|v(t)|
$$

does not include direction.

Acceleration:

$$
a(t)=v'(t)
$$

tells how velocity is changing. Speed increases when velocity and acceleration point in the same direction, because the velocity value is moving farther from zero. Speed decreases when velocity and acceleration have opposite signs.

---

## Linearization in context

Linearization is an estimate of output near a known input:

$$
f(a+\Delta x)\approx f(a)+f'(a)\Delta x.
$$

In context, this means a small input change produces an approximate output change:

$$
\Delta f\approx f'(a)\Delta x.
$$

This is the same idea behind differentials:

$$
dy=f'(x)\,dx.
$$

The approximation is local. It is meant for small changes near the input where the derivative was measured.

---

## Related quantities and hidden variables

Contextual problems often include more variables than you actually need. The goal is to write one equation connecting the changing quantities, then identify which rate the question asks for.

Useful habits:

- define every variable before differentiating,
- record which variables are changing,
- keep constants as constants,
- substitute numerical values after differentiating.

If the independent variable is time, every changing quantity gets a rate such as $$dx/dt$$, $$dV/dt$$, or $$dA/dt$$.

---

## Justifying answers from graphs

When using a graph of $$f$$, slope describes $$f'$$. When using a graph of $$f'$$, height describes the rate of change of $$f$$.

That distinction is one of the biggest AP traps:

- graph of position: slope is velocity;
- graph of velocity: height is velocity and slope is acceleration;
- graph of acceleration: height is acceleration.

Always identify what the graph represents before interpreting signs, slopes, or areas.

---

## Common mistakes

- Reporting velocity when the question asks for speed.
- Giving a derivative without units.
- Using the wrong variable as the independent variable.
- Forgetting to evaluate at the specified time or input.
