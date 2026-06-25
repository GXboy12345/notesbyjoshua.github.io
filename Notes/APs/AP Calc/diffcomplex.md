---
layout: default
title: "Unit 3: Differentiation: Composite, Implicit, and Inverse Differentiation"
parent: "AP Calculus AB/BC"
nav_order: 3
permalink: /notes/math/diffcomplex/
---

# Unit 3: Differentiation: Composite, Implicit, and Inverse Differentiation

This unit is where derivatives become flexible. Instead of only differentiating simple formulas, we learn how derivatives behave under composition, implicit relationships, and inverse functions.

---

## Chain rule

:::theorem
If $$y = f(g(x))$$, then

$$
\frac{dy}{dx} = f'(g(x))g'(x).
$$

:::

:::example

$$
\frac{d}{dx} (3x^2+1)^5 = 5(3x^2+1)^4(6x)
$$

$$
\frac{d}{dx} \sin(x^2) = \cos(x^2)(2x)
$$

:::

---

## Implicit differentiation

When a curve is defined by an equation relating $$x$$ and $$y$$, differentiate both sides with respect to $$x$$ and remember that $$y$$ depends on $$x$$.

:::example

$$
x^2 + y^2 = 25
$$

Differentiate:

$$
2x + 2y\frac{dy}{dx} = 0
$$

so

$$
\frac{dy}{dx} = -\frac{x}{y}.
$$

:::

:::placeholder
[Image Placeholder: circle with tangent line showing slope found implicitly]

:::

---

## Derivatives of inverse functions

:::theorem
If $$f$$ is differentiable and invertible with $$f'(a) \ne 0$$, then

$$
(f^{-1})'(b) = \frac{1}{f'(a)}
$$

where $$b = f(a)$$.

Equivalent formula:

$$
(f^{-1})'(x) = \frac{1}{f'(f^{-1}(x))}.
$$

:::

---

## Derivatives of inverse trig functions

:::theorem
$$
\frac{d}{dx}(\arcsin x) = \frac{1}{\sqrt{1-x^2}}
$$

$$
\frac{d}{dx}(\arccos x) = -\frac{1}{\sqrt{1-x^2}}
$$

$$
\frac{d}{dx}(\arctan x) = \frac{1}{1+x^2}
$$

Chain-rule forms:

$$
\frac{d}{dx}\arcsin(u) = \frac{u'}{\sqrt{1-u^2}}, \qquad
\frac{d}{dx}\arctan(u) = \frac{u'}{1+u^2}.
$$

:::

---

## Exponential and logarithmic differentiation

Useful rules:

:::theorem
$$
\frac{d}{dx} e^{u(x)} = e^{u(x)}u'(x)
$$

$$
\frac{d}{dx} \ln(\lvert u(x) \rvert) = \frac{u'(x)}{u(x)}
$$

:::

Logarithmic differentiation is especially helpful when powers and products are mixed or when both base and exponent contain variables.

:::example

If

$$
y = x^x,
$$

then

$$
\ln y = x\ln x
$$

and differentiating gives

$$
y' = x^x(\ln x + 1).
$$

:::

---

## Related rates

:::tip{title="Strategy"}
1. Draw and label a diagram.
2. Write an equation relating the variables.
3. Differentiate implicitly with respect to time.
4. Substitute the requested instant.
5. Keep units consistent.

:::

:::placeholder
[Image Placeholder: ladder against wall with changing x and y distances]

:::

---

## Advanced chain-rule patterns

:::note
You should be comfortable stacking rules:

- product + chain,
- quotient + chain,
- trig + chain,
- inverse trig + chain,
- exponential/log + chain.

:::

---

## Parametric preview

:::note
Later, if

$$
x = f(t), \qquad y = g(t),
$$

then

$$
\frac{dy}{dx} = \frac{dy/dt}{dx/dt}
$$

when $$dx/dt \ne 0$$. This is the parametric analogue of the chain rule.

:::

---

:::mistakes
- Forgetting to multiply by the derivative of the inside.
- Treating $$y$$ as a constant during implicit differentiation.
- Dropping the factor $$dy/dx$$.
- Using inverse notation incorrectly: $$\sin^{-1}x$$ means $$\arcsin x$$, not $$1/\sin x$$.

:::
