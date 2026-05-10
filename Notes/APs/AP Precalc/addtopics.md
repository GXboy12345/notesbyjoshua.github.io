---
layout: default
title: "Unit 13 & 14: Roots of Polynomial Equations & Additional Topics in Algebra"
parent: AP Precalculus
nav_order: 9
permalink: /notes/ap/precalc/addtopics/
---

# Unit 13 & 14: Roots of Polynomial Equations & Additional Topics in Algebra

## Introduction to Partial Fractions

**Goal**: Write a proper rational function $$\dfrac{N(x)}{D(x)}$$ ($$\deg N < \deg D$$) as a sum of simpler fractions so it is easier to integrate, sum, or manipulate algebraically. If the fraction is improper ($$\deg N \ge \deg D$$): polynomial long division first:

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

**Solve for coefficients**: multiply through by the LCD and equate coefficients, or substitute convenient $$x$$ values plus compare powers of $$x$$. **ADD EXAMPLES**

---

## Mathematical Induction

Mathematical induction is agreat way to prove statements $$P(n)$$ for all integers $$n \ge n_0$$ when you don't know how to derive it.

1. **Base case**: Verify $$P(n_0)$$ is true.
2. **Inductive hypothesis**: Assume $$P(k)$$ holds for some $$k \ge n_0$$.
3. **Inductive step**: Prove $$P(k+1)$$ follows from $$P(k)$$.

If the step needs several earlier cases, use strong induction: assume $$P(n_0),\ldots,P(k)$$ and deduce $$P(k+1)$$.

**Tips**: Manipulate $$P(k+1)$$ so $$P(k)$$ appears; watch indexing (sums from $$1$$ to $$k+1$$ split into $$1$$ to $$k$$ plus one term). **ADD EXAMPLES**

---

## Binomial Theorem

For any nonnegative integer $$n$$,

$$
(a+b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k
$$

where $$\displaystyle \binom{n}{k} = \frac{n!}{k!(n-k)!}$$ (also $$_nC_k$$). For $$(a-b)^n$$, just replace $$b$$ in the original equation with $$-b$$

- Pascal’s triangle: rows give coefficients for $$(a+b)^n$$.
- Symmetry: $$\binom{n}{k}=\binom{n}{n-k}$$.
- Specific term: the term containing $$a^r b^{n-r}$$ has coefficient $$\binom{n}{r}$$ (fix exponents so they sum to $$n$$).

---

## Arithmetic & Geometric Sequences

### Arithmetic

An arithmetic sequence is a sequence where terms differ by a constant difference $$d$$:

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

A series is a sum of sequence terms; $$\sum$$ notation packs long sums neatly.

### Summation Notation

The $$\sum$$ notation is a compact way to write out series. For a sum $$f(1) + f(2) + ... + f(n)$$ for some function $$f(x)$$, you can rewrite it as $$\sum_{i=1}^{n} f(i)$$. You can always reindex to whatever is convenient (e.g. in the previous example you can start at $$i=3$$ by doing $$\sum_{i=3}^{n + 2} f(i - 2)$$)

### Finite arithmetic series

$$
\sum_{i=1}^{n} a_i = \frac{n}{2}\bigl(a_1 + a_n\bigr) = \frac{n}{2}\bigl(2a_1 + (n-1)d\bigr)
$$

<div class="theorem-box" markdown="1">

**Proof (finite arithmetic series).** Let $$S_n = \sum_{i=1}^{n} a_i$$ with $$a_i = a_1 + (i-1)d$$. Write the sum twice, forwards and backwards:

$$
S_n = a_1 + a_2 + \cdots + a_{n-1} + a_n,
$$

$$
S_n = a_n + a_{n-1} + \cdots + a_2 + a_1.
$$

Add column-wise. Pair $$a_k$$ with $$a_{n+1-k}$$: since $$a_k + a_{n+1-k} = \bigl(a_1+(k-1)d\bigr)+\bigl(a_1+(n-k)d\bigr) = 2a_1 + (n-1)d = a_1 + a_n$$, **every** pair totals $$a_1+a_n$$. There are $$n$$ such pairs, so

$$
2S_n = n(a_1+a_n) \quad\Longrightarrow\quad S_n = \frac{n}{2}(a_1+a_n).
$$

Substitute $$a_n = a_1+(n-1)d$$ to get $$\displaystyle S_n = \frac{n}{2}\bigl(2a_1+(n-1)d\bigr)$$.

</div>

### Finite geometric series ($$r \ne 1$$)

$$
\sum_{i=0}^{n-1} a_1 r^i = a_1 \frac{1-r^n}{1-r}, \qquad \sum_{i=1}^{n} a_1 r^{i-1} = a_1 \frac{1-r^n}{1-r}
$$

(Index shifts change exponents: always identify first term, ratio, and number of terms)

<div class="theorem-box" markdown="1">

**Proof (finite geometric series, $$r \ne 1$$).** Let

$$
S = \sum_{i=0}^{n-1} a_1 r^i = a_1 + a_1 r + a_1 r^2 + \cdots + a_1 r^{n-1}.
$$

Multiply by $$r$$:

$$
rS = a_1 r + a_1 r^2 + \cdots + a_1 r^n.
$$

Subtract $$rS$$ from $$S$$. Intermediate terms cancel (**telescoping**):

$$
S - rS = a_1 - a_1 r^n = a_1(1-r^n).
$$

Factor the left side: $$(1-r)S = a_1(1-r^n)$$. Because $$r \ne 1$$,

$$
S = a_1 \frac{1-r^n}{1-r}.
$$

If the series starts at index $$1$$ as $$\sum_{i=1}^{n} a_1 r^{i-1}$$, it is the same $$n$$ terms and the same sum.

</div>

### Infinite geometric series

If $$\lvert r\rvert < 1$$,

$$
\sum_{i=0}^{\infty} a r^i = \frac{a}{1-r}
$$

If $$\lvert r\rvert \ge 1$$, the series does **not** converge (unless $$a=0$$).

---

## More Sequences & Series (Recursion and Additional Ideas)

A sequence $$\{a_n\}$$ can be explicit ($$a_n$$ as a formula in $$n$$) or recursive ($$a_n$$ from previous terms).

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
