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

If $$y = f(g(x))$$, then

$$
\frac{dy}{dx} = f'(g(x))g'(x).
$$

The outside derivative is evaluated at the inside function, and then multiplied by the derivative of the inside function.

---

## Implicit differentiation

When a curve is defined by an equation relating $$x$$ and $$y$$, differentiate both sides with respect to $$x$$ and remember that $$y$$ depends on $$x$$.

Every time a derivative hits a term involving $$y$$, multiply by $$dy/dx$$ because $$y$$ is changing as $$x$$ changes.

> [Image Placeholder: circle with tangent line showing slope found implicitly]

---

## Derivatives of inverse functions

If $$f$$ is differentiable and invertible with $$f'(a) \ne 0$$, then

$$
(f^{-1})'(b) = \frac{1}{f'(a)}
$$

where $$b = f(a)$$.

Equivalent formula:

$$
(f^{-1})'(x) = \frac{1}{f'(f^{-1}(x))}.
$$

---

## Derivatives of inverse trig functions

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

---

## Exponential and logarithmic differentiation

Useful rules:

$$
\frac{d}{dx} e^{u(x)} = e^{u(x)}u'(x)
$$

$$
\frac{d}{dx} \ln(\lvert u(x) \rvert) = \frac{u'(x)}{u(x)}
$$

Logarithmic differentiation is especially helpful when powers and products are mixed or when both base and exponent contain variables.

When the variable appears in both the base and the exponent, take the logarithm of both sides first, use logarithm rules to simplify, and then differentiate implicitly.

---

## Related rates

Strategy:

1. Draw and label a diagram.
2. Write an equation relating the variables.
3. Differentiate implicitly with respect to time.
4. Substitute the requested instant.
5. Keep units consistent.

> [Image Placeholder: ladder against wall with changing x and y distances]

---

## Advanced chain-rule patterns

You should be comfortable stacking rules:

- product + chain,
- quotient + chain,
- trig + chain,
- inverse trig + chain,
- exponential/log + chain.

---

## Parametric preview

Later, if

$$
x = f(t), \qquad y = g(t),
$$

then

$$
\frac{dy}{dx} = \frac{dy/dt}{dx/dt}
$$

when $$dx/dt \ne 0$$. This is the parametric analogue of the chain rule.

---

## Chain rule intuition

The chain rule is about layered change. If $$x$$ changes, then the inside function $$g(x)$$ changes first. That change then causes the outside function $$f(g(x))$$ to change.

Symbolically,

$$
\frac{dy}{dx}
=
\frac{dy}{du}\cdot\frac{du}{dx}.
$$

This notation is not just a cancellation trick. It reminds you that a composite function changes through an intermediate variable.

AP problems often hide the chain rule inside:

- powers of expressions,
- trig functions with nontrivial angles,
- exponentials with nontrivial exponents,
- logarithms of expressions,
- inverse trig functions with expressions inside.

Whenever you differentiate an outside function, pause and ask what the inside function is.

---

## Implicit differentiation intuition

Implicit equations describe a relationship rather than a solved function. The variable $$y$$ still depends on $$x$$, even if the equation does not say so explicitly.

That is why

$$
\frac{d}{dx}(y^2)=2y\frac{dy}{dx}.
$$

The derivative of the outside power is $$2y$$, and the derivative of the inside variable $$y$$ is $$dy/dx$$.

Implicit differentiation is especially useful when solving for $$y$$ would be messy or impossible. It also lets you find slopes on curves that are not functions globally, such as circles, ellipses, and many algebraic curves.

<div class="theorem-box" markdown="1">

**AP language.** In an implicit derivative, the final answer may contain both $$x$$ and $$y$$. To find a numerical slope at a point, substitute both coordinates after differentiating.

</div>

---

## Inverse function derivative intuition

Inverse functions undo each other. If $$f(a)=b$$, then $$f^{-1}(b)=a$$.

The graph of an inverse is the reflection of the original graph across $$y=x$$. Reflection swaps horizontal and vertical change, so slopes become reciprocals:

$$
(f^{-1})'(b)=\frac{1}{f'(a)}.
$$

This formula only works when the original slope is nonzero. If $$f'(a)=0$$, the inverse graph would have a vertical tangent at the reflected point.

---

## Logarithmic differentiation

Logarithmic differentiation is a strategy, not a new derivative rule. It works because logarithms turn complicated multiplication, division, and powers into simpler operations:

$$
\ln(ab)=\ln a+\ln b,
$$

$$
\ln\left(\frac{a}{b}\right)=\ln a-\ln b,
$$

$$
\ln(a^r)=r\ln a.
$$

This is especially helpful when a function has many factors or when a variable appears in both the base and the exponent.

After differentiating, remember that differentiating $$\ln y$$ gives

$$
\frac{1}{y}\frac{dy}{dx},
$$

so the final derivative usually comes from multiplying by $$y$$.

---

## Related rates as implicit differentiation

Related rates are implicit differentiation with time as the independent variable. The equation relates quantities, and each quantity may be changing with respect to time.

If a length $$x$$ depends on time, then differentiating $$x^2$$ with respect to $$t$$ gives

$$
\frac{d}{dt}(x^2)=2x\frac{dx}{dt}.
$$

The variable value and the rate value are different pieces of information. Substitute them after differentiating so the equation still represents rates.

---

## Calculator and exact form expectations

AP problems often accept exact forms unless a decimal approximation is requested. For inverse trig derivatives, keep radicals and rational expressions organized:

$$
\frac{d}{dx}\arcsin(u)
=
\frac{u'}{\sqrt{1-u^2}}.
$$

The domain restriction is part of the meaning. For real-valued inverse sine and inverse cosine derivatives, the expression inside the square root must be positive for the derivative formula to describe an ordinary finite slope.

---

## Common mistakes

- Forgetting to multiply by the derivative of the inside.
- Treating $$y$$ as a constant during implicit differentiation.
- Dropping the factor $$dy/dx$$.
- Using inverse notation incorrectly: $$\sin^{-1}x$$ means $$\arcsin x$$, not $$1/\sin x$$.
