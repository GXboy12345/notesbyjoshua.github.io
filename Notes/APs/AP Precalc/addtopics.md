---
layout: default
title: "Unit 13 & 14: Roots of Polynomial Equations & Additional Topics in Algebra"
parent: AP Precalculus
nav_order: 9
permalink: /notes/ap/precalc/addtopics/
---

# Unit 13 & 14: Roots of Polynomial Equations & Additional Topics in Algebra

## Introduction to Partial Fractions

**Goal**: Write a proper rational function $$\dfrac{N(x)}{D(x)}$$ ($$\deg N < \deg D$$) as a sum of simpler fractions so it is easier to integrate, sum, or manipulate algebraically.

-If the fraction is improper ($$\deg N \ge \deg D$$): polynomial long division first:

$$
\frac{N(x)}{D(x)} = Q(x) + \frac{R(x)}{D(x)}, \quad \deg R < \deg D
$$

Factor $$D(x)$$ into linear and irreducible quadratic factors over $$\mathbb{R}$$, then match this template:

| Factor in $$D(x)$$ | Partial fraction terms |
|--------------------|-------------------------|
| Distinct $$(x-a)$$ | $$\dfrac{A}{x-a}$$ |
| Repeated $$(x-a)^m$$ | $$\dfrac{A_1}{x-a}+\dfrac{A_2}{(x-a)^2}+\cdots+\dfrac{A_m}{(x-a)^m}$$ |
| Irreducible $$(ax^2+bx+c)$$ | $$\dfrac{Bx+C}{ax^2+bx+c}$$ |
| Repeated quadratic $$(ax^2+bx+c)^m$$ | Similar chain with numerators $$B_k x + C_k$$ |

**Solve for coefficients**: multiply through by the LCD and **equate coefficients**, or substitute convenient $$x$$ values plus compare powers of $$x$$. **ADD EXAMPLES**

---

## Mathematical Induction

Used to prove statements $$P(n)$$ for all integers $$n \ge n_0$$.

1. **Base case**: Verify $$P(n_0)$$ is true.
2. **Inductive hypothesis**: Assume $$P(k)$$ holds for some $$k \ge n_0$$.
3. **Inductive step**: Prove $$P(k+1)$$ follows from $$P(k)$$.

If the step needs **several earlier cases**, use **strong induction**: assume $$P(n_0),\ldots,P(k)$$ and deduce $$P(k+1)$$.

**Tips**: Manipulate $$P(k+1)$$ so $$P(k)$$ appears clearly; watch indexing (sums from $$1$$ to $$k+1$$ split into $$1$$ to $$k$$ plus one term).

---

## Binomial Theorem

For any nonnegative integer $$n$$,

$$
(a+b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k
$$

where $$\displaystyle \binom{n}{k} = \frac{n!}{k!(n-k)!}$$ (also $$_nC_k$$).

- **Pascal’s triangle**: rows give coefficients for $$(a+b)^n$$.
- **Symmetry**: $$\binom{n}{k}=\binom{n}{n-k}$$.
- **Specific term**: the term containing $$a^r b^{n-r}$$ has coefficient $$\binom{n}{r}$$ (fix exponents so they sum to $$n$$).

---

## Arithmetic & Geometric Sequences

A **sequence** $$\{a_n\}$$ can be **explicit** ($$a_n$$ as a formula in $$n$$) or **recursive** ($$a_n$$ from previous terms).

### Arithmetic

Constant difference $$d$$:

$$
a_n = a_1 + (n-1)d \quad\text{equivalently}\quad a_n = a_m + (n-m)d
$$

### Geometric

Constant ratio $$r$$ ($$r\ne 0$$):

$$
a_n = a_1\, r^{\,n-1} \quad\text{equivalently}\quad a_n = a_m\, r^{\,n-m}
$$

---

## Arithmetic & Geometric Series

A **series** is a sum of sequence terms; $$\sum$$ notation packs long sums neatly.

### Finite arithmetic series

$$
\sum_{i=1}^{n} a_i = \frac{n}{2}\bigl(a_1 + a_n\bigr) = \frac{n}{2}\bigl(2a_1 + (n-1)d\bigr)
$$

### Finite geometric series ($$r \ne 1$$)

$$
\sum_{i=0}^{n-1} a_1 r^i = a_1 \frac{1-r^n}{1-r}, \qquad \sum_{i=1}^{n} a_1 r^{i-1} = a_1 \frac{1-r^n}{1-r}
$$

(Index shifts change exponents—always identify **first term**, **ratio**, and **number of terms**.)

### Infinite geometric series

If $$\lvert r\rvert < 1$$,

$$
\sum_{i=0}^{\infty} a r^i = \frac{a}{1-r}
$$

If $$\lvert r\rvert \ge 1$$, the series does **not** converge (unless $$a=0$$).

---

## More Sequences & Series (Recursion and Additional Ideas)

### Recursion

A rule $$a_n = f(a_{n-1},\ldots)$$ plus **initial conditions** defines the sequence. **Closed form** may be found by pattern, generating-function methods (later courses), or solving **linear recurrences** when taught (characteristic equation for $$a_n = pa_{n-1}+qa_{n-2}$$).

### Sigma manipulation

$$
\sum (c_k \pm d_k) = \sum c_k \pm \sum d_k, \qquad \sum (c\cdot a_k) = c\sum a_k
$$

Index shifts: $$\sum_{k=m}^{n} a_k = \sum_{k=m+r}^{n+r} a_{k-r}$$.

### Telescoping sums

If $$b_k = u_{k+1}-u_k$$, then $$\sum_{k=m}^{n} b_k = u_{n+1}-u_m$$. Partial fractions often produce telescopes.

### Partial sums

$$S_n = \sum_{k=1}^{n} a_k$$. Convergence of an infinite series studies $$\lim_{n\to\infty} S_n$$ when that limit exists.
