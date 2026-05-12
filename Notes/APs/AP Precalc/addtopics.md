---
layout: default
title: "Unit 13 & 14: Additional Topics in Algebra"
parent: AP Precalculus
nav_order: 9
permalink: /notes/ap/precalc/addtopics/
---

# Unit 13 & 14: Additional Topics in Algebra

## Introduction to Partial Fractions

**Goal**: Write a proper rational function $$\dfrac{N(x)}{D(x)}$$ ($$\deg N < \deg D$$) as a sum of simpler fractions so it is easier to integrate, sum, or manipulate algebraically. If the fraction is improper ($$\deg N \ge \deg D$$): polynomial long division first:

$$
\frac{N(x)}{D(x)} = Q(x) + \frac{R(x)}{D(x)}, \quad \deg R < \deg D
$$

Factor $$D(x)$$ into linear and irreducible quadratic factors over $$\mathbb{R}$$, then match this template:

| Factor in $$D(x)$$ | Partial fraction terms |
|--------------------|-------------------------|
| Distinct $$(x-a)$$ | $$\dfrac{A}{x-a}$$ |
| Repeated $$(x-a)^{m}$$ | $$\dfrac{A_1}{x-a}+\dfrac{A_2}{(x-a)^{2}}+\cdots+\dfrac{A_m}{(x-a)^{m}}$$ |
| Irreducible $$(ax^2+bx+c)$$ | $$\dfrac{Bx+C}{ax^2+bx+c}$$ |
| Repeated quadratic $$(ax^2+bx+c)^{m}$$ | Similar chain with numerators $$B_k x + C_k$$ |

**Solve for coefficients**: multiply through by the LCD and equate coefficients, or substitute convenient $$x$$ values plus compare powers of $$x$$.

<div class="theorem-box" markdown="1">

**Example.** Decompose

$$
\frac{x^6 + x^5 + 7x^4 + 6x^3 + 2x^2 + 16x - 24}{x^5 + 8x^2}.
$$

Factor the denominator:

$$
x^5 + 8x^2 = x^2(x^3 + 8) = x^2(x + 2)(x^2 - 2x + 4).
$$

The numerator has degree $$6$$ and the denominator degree $$5$$, so the fraction is improper. Do polynomial long division first:

$$
(x^6 + x^5 + 7x^4 + 6x^3 + 2x^2 + 16x - 24) \div (x^5 + 8x^2).
$$

You obtain

$$
\frac{x^6 + x^5 + 7x^4 + 6x^3 + 2x^2 + 16x - 24}{x^5 + 8x^2}
= x + 1 + \frac{7x^4 - 2x^3 - 6x^2 + 8x - 24}{x^2(x + 2)(x^2 - 2x + 4)}.
$$

Doing partial fractions on the remainder:

$$
\frac{7x^4 - 2x^3 - 6x^2 + 8x - 24}{x^2(x + 2)(x^2 - 2x + 4)}
= \frac{A}{x} + \frac{B}{x^2} + \frac{C}{x + 2} + \frac{Dx + E}{x^2 - 2x + 4}.
$$

Multiply through by $$x^2(x + 2)(x^2 - 2x + 4)$$:

$$
\begin{aligned}
7x^4 - 2x^3 - 6x^2 + 8x - 24 &= Ax(x + 2)(x^2 - 2x + 4) + B(x + 2)(x^2 - 2x + 4) \\
&\quad {}+ Cx^2(x^2 - 2x + 4) + (Dx + E)x^2(x + 2).
\end{aligned}
$$

Expand and **match coefficients** (or combine with strategic substitutions). One finds

$$
A = \frac{2}{5},\quad B = -3,\quad C = 1,\quad D = \frac{7}{2},\quad E = -2.
$$

So the full decomposition is

$$
\frac{x^6 + x^5 + 7x^4 + 6x^3 + 2x^2 + 16x - 24}{x^5 + 8x^2}
= x + 1 + \frac{2}{5x} - \frac{3}{x^2} + \frac{1}{x + 2} + \frac{\frac{7}{2}x - 2}{x^2 - 2x + 4},
$$

or equivalently,

$$
x + 1 + \frac{2}{5x} - \frac{3}{x^2} + \frac{1}{x + 2} + \frac{7x - 4}{2(x^2 - 2x + 4)}.
$$

</div>

---

## Mathematical Induction

Mathematical induction is a great way to prove statements $$P(n)$$ for all integers $$n \ge n_0$$ when you don't know how to derive it.

1. **Base case**: Verify $$P(n_0)$$ is true.
2. **Inductive hypothesis**: Assume $$P(k)$$ holds for some $$k \ge n_0$$.
3. **Inductive step**: Prove $$P(k+1)$$ follows from $$P(k)$$.

If the step needs several earlier cases, use strong induction: assume $$P(n_0),\ldots,P(k)$$ and deduce $$P(k+1)$$.

**Tips**: Manipulate $$P(k+1)$$ so $$P(k)$$ appears; watch indexing (sums from $$1$$ to $$k+1$$ split into $$1$$ to $$k$$ plus one term).

<div class="theorem-box" markdown="1">

**Example.** Prove that for every integer $$n \ge 1$$,

$$
\sum_{k=1}^{n} k(k!) = (n+1)! - 1.
$$

**Step 1: Base case.** For $$n = 1$$,

Left-hand side:

$$
\sum_{k=1}^{1} k(k!) = 1(1!) = 1.
$$

Right-hand side:

$$
(1+1)! - 1 = 2! - 1 = 2 - 1 = 1.
$$

So the statement holds for $$n = 1$$.

**Step 2: Inductive hypothesis.** Assume that for some $$n \ge 1$$,

$$
\sum_{k=1}^{n} k(k!) = (n+1)! - 1.
$$

We must prove

$$
\sum_{k=1}^{n+1} k(k!) = (n+2)! - 1.
$$

**Step 3: Inductive step.** Consider the left-hand side for $$n+1$$:

$$
\sum_{k=1}^{n+1} k(k!) = \sum_{k=1}^{n} k(k!) + (n+1)(n+1)!.
$$

Apply the induction hypothesis:

$$
= (n+1)! - 1 + (n+1)(n+1)!.
$$

Factor out $$(n+1)!$$:

$$
= (n+1)!\bigl(1 + (n+1)\bigr) - 1 = (n+1)!(n+2) - 1.
$$

Since $$(n+2)(n+1)! = (n+2)!$$,

$$
= (n+2)! - 1,
$$

which is exactly what we needed.

**Conclusion.** Therefore, by mathematical induction,

$$
\sum_{k=1}^{n} k(k!) = (n+1)! - 1 \quad \text{for all integers } n \ge 1.
$$

</div>

---

## Binomial Theorem

For any nonnegative integer $$n$$,

$$
(a+b)^{n} = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k
$$

where $$\displaystyle \binom{n}{k} = \frac{n!}{k!(n-k)!}$$ (read as “$$n$$ choose $$k$$”). For $$(a-b)^{n}$$, replace $$b$$ with $$-b$$ in the expansion.

- Pascal’s triangle: rows give coefficients for $$(a+b)^{n}$$ (Pascal's Triangle starts at Row 0 by convention)
- Symmetry: $$\binom{n}{k}=\binom{n}{n-k}$$
- Specific term: the term containing $$a^r b^{n-r}$$ has coefficient $$\binom{n}{r}$$ (fix exponents so they sum to $$n$$)

<div class="theorem-box" markdown="1">

**Proof (Sum of Pascal's Triangle and Binomial Theorem).** We will prove that the sum of the $$n$$th row of Pascal's Triangle is equal to $$2^{n}$$. Suppose we have the polynomial $$(1+x)^{n}$$. By the binomial theorem,

$$
(1+x)^{n} = \binom{n}{0} + \binom{n}{1}x + \binom{n}{2}x^{2} + \cdots + \binom{n}{n}x^{n}.
$$

Setting $$x = 1$$,

$$
(1+1)^{n} = \binom{n}{0} + \binom{n}{1} + \binom{n}{2} + \cdots + \binom{n}{n}.
$$

The RHS is the sum of the values of the $$n$$th row of Pascal's Triangle, and the LHS can be simplified to $$2^{n}$$. Thus, the sum of the values in the $$n$$th row of Pascal's Triangle is equal to $$2^{n}$$.

</div>

---

## Arithmetic & Geometric Sequences

### Arithmetic

An arithmetic sequence is a sequence where terms differ by a constant difference $$d$$:

$$
a_n = a_1 + (n-1)d \quad\text{equivalently}\quad a_n = a_m + (n-m)d
$$

### Geometric

A geometric sequence is a sequence where terms differ by a constant ratio $$r$$ ($$r\ne 0$$):

$$
a_n = a_1\, r^{\,n-1} \quad\text{equivalently}\quad a_n = a_m\, r^{\,n-m}
$$

## Arithmetic & Geometric Series

A series is a sum of sequence terms; $$\sum$$ notation packs long sums neatly.

### Summation Notation

The $$\sum$$ notation is a compact way to write out series. For a sum $$f(1) + f(2) + ... + f(n)$$ for some function $$f(x)$$, you can rewrite it as $$\sum_{i=1}^{n} f(i)$$. You can always reindex to whatever is convenient (e.g. in the previous example you can start at $$i=3$$ by doing $$\sum_{i=3}^{n + 2} f(i - 2)$$).

### Partial sums

A partial sum is defined as $$S_n = \sum_{k=1}^{n} a_k$$. Note that a partial sum always assumes that the starting index is $$1$$. The convergence of an infinite series studies $$\lim_{n\to\infty} S_n$$ when that limit exists.

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

If $$\lvert r\rvert \ge 1$$, the series does **not** converge (unless $$a=0$$). This formula can be proven by seeing that as $$n$$ approaches infinity, $$r^n$$ approaches $$0$$ if $$\lvert r \rvert < 1$$ and diverges otherwise.

---

## More Sequences & Series (Recursion and Additional Ideas)

A sequence $$\{a_n\}$$ can be explicit ($$a_n$$ as a formula in $$n$$) or recursive ($$a_n$$ from previous terms).

### Recursion

A rule $$a_n = f(a_{n-1},\ldots)$$ plus initial conditions defines the sequence. Closed form may be found by pattern, generating-function methods, or solving linear recurrences. Learn more in [this lesson]({{ '/notes/math/algebra/recursion/' | relative_url }}).

### Telescoping sums

If $$b_k = u_{k+1}-u_k$$, then $$\sum_{k=m}^{n} b_k = u_{n+1}-u_m$$. Partial fractions often produce telescopes. Telescoping is usually done to cancel all the intermediate terms except for the first and last terms.

<div class="theorem-box" markdown="1">

**Example.** Find

$$
S = \sum_{k=1}^{n} \frac{1}{k(k+1)}.
$$

Start by decomposing $$\frac{1}{k(k+1)}$$ with partial fractions (try this yourself):

$$
\frac{1}{k(k+1)} = \frac{1}{k} - \frac{1}{k+1}.
$$

Then $$S$$ becomes

$$
S = \frac{1}{1} - \frac{1}{2} + \frac{1}{2} - \frac{1}{3} + \cdots + \frac{1}{n} - \frac{1}{n+1}.
$$

Notice that all the terms in the middle will cancel out (e.g. $$-\frac{1}{2}$$ and $$+\frac{1}{2}$$), leaving

$$
S = 1 - \frac{1}{n+1} = \frac{n}{n+1}.
$$

</div>

## Practice

Problems below use only ideas from this page: partial fractions, induction, the binomial theorem, arithmetic/geometric sequences and series, $$\sum$$ notation, telescoping, and recursion as described here.

1. Decompose $$\dfrac{3x+5}{(x-1)^{3}(x+2)}$$ into partial fractions.
2. The rational function $$\frac{2x^3-x^2+3}{x^2-1}$$ is improper. Rewrite it using polynomial division in the form $$Q(x)+\dfrac{R(x)}{x^2-1}$$, then set up (you need not solve for constants) the partial-fraction form for $$\dfrac{R(x)}{(x-1)(x+1)}$$ over $$\mathbb{R}$$.
3. Factor $$x^3-x^2$$ and write the template for decomposing $$\frac{x^2+1}{x^3-x^2}$$ (distinct linear and repeated linear factors only).
4. Prove by induction that $$\sum_{k=1}^{n} k^3 = \frac{n^2 (n+1)^2}{4}$$ for all integers $$n \ge 1$$. Extension: This looks like the square of $$1 + 2 + ... + n = \frac{n(n+1)}{2}$$! Prove that this is true (you should not use induction here).
5. Prove by induction that $$8^{2n} - 3^{2n}$$ is divisible by $$55$$ for all integers $$n \ge 1$$.
6. Expand $$(x+y)^{5}$$ using the binomial theorem.
7. What is the coefficient of the term containing $$x^{20}$$ in $$\left(x^{3} - \dfrac{4}{\sqrt{x}}\right)^{12}$$?
8. Explain why the powers of $$11$$ from $$11^{0}$$ to $$11^{4}$$ appear to match the rows of Pascal's Triangle, but the pattern fails at $$11^{5}$$. Use the binomial theorem in your answer.
9. A sequence has $$a_3=-9$$ and $$a_6=243$$. Find the fifth term if the series is arithmetic and if the series is geometric.
10. The sequence $$1,x,y,z$$ is arithmetic. The sequence $$1,p,q,z$$ is geometric. Both sequences are strictly increasing and contain only integers, and $$z$$ is as small as possible. What is the value of $$x+y+z+p+q$$? (2025 AMC 10A)
11. Find $$\sum_{i=5}^{100}(3i-2)$$.
12. Evaluate $$\sum_{i=0}^{8} 3\cdot 2^i$$.
13. The first three terms of a geometric series are the integers $$a$$, $$720$$, and $$b$$, where $$a < 720 < b$$. What is the sum of the digits of the least possible value of $$b$$? (2024 AMC 10A).

## Solutions

### Solution 1

We want

$$
\frac{3x+5}{(x-1)^{3}(x+2)} = \frac{A}{x-1} + \frac{B}{(x-1)^{2}} + \frac{C}{(x-1)^{3}} + \frac{D}{x+2}.
$$

Multiply by $$(x-1)^{3}(x+2)$$:

$$
3x+5 = A(x-1)^{2}(x+2) + B(x-1)(x+2) + C(x+2) + D(x-1)^{3}.
$$

Set $$x=-2$$: $$-1 = D(-3)^{3} = -27D$$, so $$\displaystyle D = \frac{1}{27}$$.

Set $$x=1$$: $$8 = C(3)$$, so $$\displaystyle C = \frac{8}{3}$$.

Compare $$x^{3}$$ coefficients: $$A + D = 0$$, so $$\displaystyle A = -D = -\frac{1}{27}$$.

Compare $$x^{2}$$ coefficients: the $$x^{3}$$ term from $$A(x-1)^{2}(x+2)$$ has no $$x^{2}$$; from $$B(x-1)(x+2)$$ you get $$Bx^{2}$$; from $$D(x-1)^{3}$$ you get $$-3Dx^{2}$$. Thus $$B - 3D = 0$$, so $$\displaystyle B = 3D = \frac{1}{9}$$.

(You can double-check by comparing the $$x$$ or constant terms.) Therefore

$$
\frac{3x+5}{(x-1)^{3}(x+2)} = -\frac{1}{27(x-1)} + \frac{1}{9(x-1)^{2}} + \frac{8}{3(x-1)^{3}} + \frac{1}{27(x+2)}.
$$

### Solution 2

Divide $$2x^{3}-x^{2}+3$$ by $$x^{2}-1$$:

$$
2x^{3}-x^{2}+3 = (2x-1)(x^{2}-1) + (2x+2),
$$

so

$$
\frac{2x^{3}-x^{2}+3}{x^{2}-1} = 2x - 1 + \frac{2x+2}{x^{2}-1} = 2x - 1 + \frac{2(x+1)}{(x-1)(x+1)} = 2x - 1 + \frac{2}{x-1},
$$

with $$\deg(2x+2) < 2$$. For the remainder, use

$$
\frac{2x+2}{(x-1)(x+1)} = \frac{A}{x-1} + \frac{B}{x+1}.
$$

Then $$2x+2 = A(x+1) + B(x-1)$$. Plug $$x=1$$: $$4=2A$$ so $$A=2$$. Plug $$x=-1$$: $$0=-2B$$ so $$B=0$$. Template form: $$\dfrac{2}{x-1}$$ (only one nontrivial partial fraction).

### Solution 3

Factor: $$x^{3}-x^{2} = x^{2}(x-1)$$. Then

$$
\frac{x^{2}+1}{x^{3}-x^{2}} = \frac{x^{2}+1}{x^{2}(x-1)} = \frac{A}{x} + \frac{B}{x^{2}} + \frac{C}{x-1}
$$

for unknown constants $$A,B,C$$. (Denominator has a repeated linear factor $$x^{2}$$ and a simple factor $$x-1$$.)

### Solution 4

Base $$n=1$$: $$\sum_{k=1}^{1} k^{3} = 1$$ and $$\dfrac{1^{2}\cdot 2^{2}}{4}=1$$.

Assume $$\sum_{k=1}^{n} k^{3} = \dfrac{n^{2}(n+1)^{2}}{4}$$. Then

$$
\sum_{k=1}^{n+1} k^{3} = \frac{n^{2}(n+1)^{2}}{4} + (n+1)^{3} = (n+1)^{2}\left(\frac{n^{2}}{4} + (n+1)\right) = (n+1)^{2}\frac{n^{2}+4n+4}{4} = \frac{(n+1)^{2}(n+2)^{2}}{4}.
$$

Induction complete.

Extension (no induction): Let $$S_{n}=\sum_{k=1}^{n}k=\dfrac{n(n+1)}{2}$$. Then

$$
S_{n}^{2}-S_{n-1}^{2} = \left(\frac{n(n+1)}{2}\right)^{2}-\left(\frac{(n-1)n}{2}\right)^{2} = \frac{n^{2}}{4}\bigl((n+1)^{2}-(n-1)^{2}\bigr) = \frac{n^{2}}{4}\cdot 4n = n^{3}.
$$

Telescoping gives $$\sum_{k=1}^{n}k^{3}=S_{n}^{2}-S_{0}^{2}=S_{n}^{2}=\dfrac{n^{2}(n+1)^{2}}{4}$$ (with $$S_{0}=0$$).

### Solution 5

**Base case**: $$n=1$$: $$8^{2}-3^{2}=64-9=55$$, divisible by $$55$$.

**Induction Hypothesis**: Assume $$55 \mid 8^{2k}-3^{2k}$$ for some $$k \in \mathbb{N}$$.

**Inductive Step**: We need to show that

$$
55 \mid 8^{2(k+1)} - 3^{2(k+1)}.
$$

Start with the expression for $$k+1$$:

$$
8^{2(k+1)} - 3^{2(k+1)} = 8^{2k+2} - 3^{2k+2}.
$$

Rewrite using $$8^{2}=64$$ and $$3^{2}=9$$:

$$
8^{2k+2} - 3^{2k+2} = 64\cdot 8^{2k} - 9\cdot 3^{2k}.
$$

Now add and subtract $$64\cdot 3^{2k}$$ so that the induction hypothesis appears:

$$
64\cdot 8^{2k} - 9\cdot 3^{2k}
= 64(8^{2k}-3^{2k}) + 64\cdot 3^{2k} - 9\cdot 3^{2k}.
$$

Simplify:

$$
64(8^{2k}-3^{2k}) + (64-9)3^{2k}
= 64(8^{2k}-3^{2k}) + 55\cdot 3^{2k}.
$$

By the induction hypothesis, $$8^{2k}-3^{2k}$$ is divisible by $$55$$, so $$64(8^{2k}-3^{2k})$$ is also divisible by $$55$$. The term $$55\cdot 3^{2k}$$ is clearly divisible by $$55$$. Therefore, their sum is divisible by $$55$$.

Thus $$55 \mid 8^{2(k+1)} - 3^{2(k+1)}$$. By induction, $$8^{2n} - 3^{2n}$$ is divisible by $$55$$ for all integers $$n \ge 1$$.

### Solution 6

$$
(x+y)^{5} = \sum_{k=0}^{5} \binom{5}{k} x^{5-k} y^{k} = x^{5} + 5x^{4}y + 10x^{3}y^{2} + 10x^{2}y^{3} + 5xy^{4} + y^{5}.
$$

### Solution 7

Write $$\left(x^{3} - \dfrac{4}{\sqrt{x}}\right)^{12} = \left(x^{3} - 4x^{-1/2}\right)^{12}$$. A general term in the binomial expansion is

$$
\binom{12}{k} (x^{3})^{12-k}\left(-4x^{-1/2}\right)^{k} = \binom{12}{k}(-4)^{k}\, x^{36 - 7k/2}.
$$

We need $$36 - \dfrac{7k}{2} = 20$$, i.e. $$7k = 32$$, which has no integer solution $$k$$. So no term contains $$x^{20}$$; the coefficient is $$0$$.

(If you wanted a nonzero coefficient, change the target exponent—for example $$x^{15}$$ occurs when $$36 - 7k/2 = 15 \Rightarrow k=6$$, with coefficient $$\binom{12}{6}(-4)^{6}$$.)

### Solution 8

$$
11^{n} = (10+1)^{n} = \sum_{k=0}^{n} \binom{n}{k} 10^{k}.
$$

For $$n=0,1,2,3,4$$, each binomial coefficient $$\binom{n}{k}<10$$, so the decimal expansion of $$11^{n}$$ is just the digits of that sum with no carries—they read like row $$n$$ of Pascal’s triangle (e.g. $$11^{2}=121$$, $$11^{3}=1331$$).

For $$n=5$$, $$\binom{5}{2}=\binom{5}{3}=10$$. Then the “concatenated digits” $$1,5,10,10,5,1$$ cannot be read as base-$$10$$ digits without carrying (the two $$10$$’s force a carry into the hundreds place), so $$11^{5}=161051 \ne 15101051$$. The pattern breaks exactly when a binomial coefficient reaches $$10$$ or more.

### Solution 9

Arithmetic: $$a_{6}-a_{3}=3d = 243-(-9)=252$$, so $$d=84$$. Then $$a_{3}=a_{1}+2d$$ gives $$a_{1}=-9-168=-177$$. Hence $$a_{5}=a_{1}+4d=-177+336=159$$.

Geometric: $$\dfrac{a_{6}}{a_{3}}=r^{3}=\dfrac{243}{-9}=-27$$, so $$r=-3$$. From $$a_{3}=a_{1}r^{2}$$, $$-9=a_{1}\cdot 9$$, so $$a_{1}=-1$$. Then $$a_{5}=a_{1}r^{4}=(-1)(81)=-81$$.

### Solution 10

Arithmetic: $$1,x,y,z$$ with common difference $$d$$ gives $$x=1+d$$, $$y=1+2d$$, $$z=1+3d$$. Geometric $$1,p,q,z$$ gives $$p=r$$, $$q=r^{2}$$, $$z=r^{3}$$ for some rational ratio $$r$$; with integer strictly increasing terms, $$r$$ is a positive integer $$\ge 2$$. So $$z=r^{3}=1+3d$$. Try $$r=2$$: $$z=8$$, then $$3d=7$$, not integer. $$r=3$$: $$z=27$$, $$3d=26$$, not integer. $$r=4$$: $$z=64$$, $$3d=63$$, $$d=21$$, giving arithmetic $$1,22,43,64$$ and geometric $$1,4,16,64$$. Smaller $$r$$ fails, so minimal $$z$$ is $$64$$. Sum $$x+y+z+p+q=22+43+64+4+16=149$$.

### Solution 11

There are $$100-5+1=96$$ terms. $$\sum_{i=5}^{100}(3i-2)=3\sum_{i=5}^{100}i - 2\cdot 96$$. Now $$\sum_{i=5}^{100}i = \dfrac{(5+100)\cdot 96}{2}=5040$$. So the sum is $$3\cdot 5040 - 192 = 15120 - 192 = 14928$$.

### Solution 12

$$
\sum_{i=0}^{8} 3\cdot 2^{i} = 3\sum_{i=0}^{8}2^{i} = 3\cdot\frac{1-2^{9}}{1-2} = 3(2^{9}-1)=3\cdot 511 = 1533.
$$

### Solution 13

For a geometric sequence $$a,\,720,\,b$$ with integer terms, $$720^{2}=ab$$ (middle term squared equals product of neighbors). So $$b=\dfrac{720^{2}}{a}$$ with integers $$a<720<b$$. Minimizing $$b$$ means maximizing $$a$$ among positive divisors of $$720^{2}=2^{8}\cdot 3^{4}\cdot 5^{2}$$ with $$a<720$$.

The largest divisor of $$720^{2}$$ that is strictly less than $$720$$ is $$675=3^{3}\cdot 5^{2}$$, giving $$b=\dfrac{518400}{675}=768$$. (Any larger $$a<720$$ fails to divide $$518400$$.) Sum of digits of $$768$$ is $$7+6+8=21$$.
