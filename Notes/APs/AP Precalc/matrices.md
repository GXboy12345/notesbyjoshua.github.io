---
layout: default
title: "Unit 11: Matrices and Systems"
parent: AP Precalculus
nav_order: 8
permalink: /notes/ap/precalc/matrices/
---

# Unit 11: Matrices and Systems

---

## Systems of Linear Equations

A **system of equations** asks for the values of the variables that make every equation true at the same time. For two linear equations in two variables, there are three possibilities:

| Graphs of the lines | Number of solutions | Name |
|---|---:|---|
| Intersect once | $$1$$ | consistent and independent |
| Parallel and distinct | $$0$$ | inconsistent |
| Same line | infinitely many | consistent and dependent |

The same idea extends to larger linear systems: the solution set can be one point, no points, or infinitely many points.

### Substitution and elimination

The two basic algebraic methods are:

- **Substitution**: solve one equation for one variable, then substitute into the other equations.
- **Elimination**: add multiples of equations together until one variable disappears.

<div class="theorem-box" markdown="1">

**Example.** Solve

$$
\begin{cases}
2x+3y=13\\
5x-y=7
\end{cases}
$$

From the second equation,

$$
y=5x-7.
$$

Substitute into the first equation:

$$
2x+3(5x-7)=13.
$$

Then

$$
17x-21=13,\qquad 17x=34,\qquad x=2.
$$

Now

$$
y=5(2)-7=3.
$$

So the solution is

$$
\boxed{(2,3)}.
$$

</div>

---

## Matrices

A **matrix** is a rectangular array of numbers. The numbers inside the matrix are called **entries** or **elements**.

For example,

$$
A=
\begin{bmatrix}
2 & -1 & 4\\
0 & 3 & 5
\end{bmatrix}
$$

has $$2$$ rows and $$3$$ columns, so its size is $$2\times 3$$. The entry in row $$i$$ and column $$j$$ is often written $$a_{ij}$$. In the matrix above,

$$
a_{23}=5.
$$

### Coefficient and augmented matrices

For a linear system, the **coefficient matrix** stores the coefficients of the variables. The **augmented matrix** also includes the constants on the right side.

For

$$
\begin{cases}
x+2y-3z=4\\
3x+z=5\\
-x-3y+4z=0
\end{cases}
$$

the coefficient matrix is

$$
\begin{bmatrix}
1 & 2 & -3\\
3 & 0 & 1\\
-1 & -3 & 4
\end{bmatrix}
$$

and the augmented matrix is

$$
\left[
\begin{array}{ccc|c}
1 & 2 & -3 & 4\\
3 & 0 & 1 & 5\\
-1 & -3 & 4 & 0
\end{array}
\right].
$$

The vertical bar is only a visual separator. It reminds you where the equals signs were.

---

## Gaussian Elimination

Gaussian elimination rewrites a system into an easier equivalent system using row operations.

### Elementary row operations

The allowed row operations are:

1. Multiply a row by a nonzero constant.
2. Interchange two rows.
3. Add a multiple of one row to another row.

These operations do not change the solution set of the corresponding linear system.

The goal is usually to create **row echelon form**:

$$
\left[
\begin{array}{ccc|c}
\star & \star & \star & \star\\
0 & \star & \star & \star\\
0 & 0 & \star & \star
\end{array}
\right],
$$

where the leading nonzero entries move down and to the right. Then use **back substitution**.

<div class="theorem-box" markdown="1">

**Example.** Solve

$$
\begin{cases}
x+y+z=6\\
2x-y+z=3\\
x+2y-z=2
\end{cases}
$$

Start with the augmented matrix:

$$
\left[
\begin{array}{ccc|c}
1 & 1 & 1 & 6\\
2 & -1 & 1 & 3\\
1 & 2 & -1 & 2
\end{array}
\right].
$$

Eliminate below the first pivot:

$$
R_2\leftarrow R_2-2R_1,\qquad R_3\leftarrow R_3-R_1
$$

so

$$
\left[
\begin{array}{ccc|c}
1 & 1 & 1 & 6\\
0 & -3 & -1 & -9\\
0 & 1 & -2 & -4
\end{array}
\right].
$$

Swap rows $$2$$ and $$3$$, then eliminate below the second pivot:

$$
\left[
\begin{array}{ccc|c}
1 & 1 & 1 & 6\\
0 & 1 & -2 & -4\\
0 & -3 & -1 & -9
\end{array}
\right]
\quad\Longrightarrow\quad
\left[
\begin{array}{ccc|c}
1 & 1 & 1 & 6\\
0 & 1 & -2 & -4\\
0 & 0 & -7 & -21
\end{array}
\right].
$$

The last row gives $$z=3$$. The second row gives

$$
y-2z=-4 \quad\Longrightarrow\quad y=2.
$$

The first row gives

$$
x+y+z=6 \quad\Longrightarrow\quad x=1.
$$

Thus

$$
\boxed{(x,y,z)=(1,2,3)}.
$$

</div>

### Detecting special cases

During elimination, a row like

$$
\left[
\begin{array}{ccc|c}
0 & 0 & 0 & 5
\end{array}
\right]
$$

means

$$
0=5,
$$

so the system has **no solution**.

A row like

$$
\left[
\begin{array}{ccc|c}
0 & 0 & 0 & 0
\end{array}
\right]
$$

means one equation became redundant. If at least one variable is free, the system has **infinitely many solutions**.

---

## Matrix Operations

### Equality

Two matrices are equal only if they have the same size and all corresponding entries are equal.

### Addition and subtraction

You can add or subtract matrices only when they have the same size:

$$
\begin{bmatrix}
1 & 4\\
-2 & 3
\end{bmatrix}
+
\begin{bmatrix}
5 & -1\\
7 & 0
\end{bmatrix}
=
\begin{bmatrix}
6 & 3\\
5 & 3
\end{bmatrix}.
$$

### Scalar multiplication

To multiply a matrix by a scalar, multiply every entry by that scalar:

$$
-2
\begin{bmatrix}
3 & -1\\
0 & 5
\end{bmatrix}
=
\begin{bmatrix}
-6 & 2\\
0 & -10
\end{bmatrix}.
$$

### Matrix multiplication

The product $$AB$$ is defined only when the number of columns of $$A$$ equals the number of rows of $$B$$.

If $$A$$ is $$m\times n$$ and $$B$$ is $$n\times p$$, then $$AB$$ is $$m\times p$$.

Each entry of $$AB$$ is found by taking a row-column dot product:

$$
\begin{bmatrix}
1 & 2\\
3 & 4
\end{bmatrix}
\begin{bmatrix}
5 & 6\\
7 & 8
\end{bmatrix}
=
\begin{bmatrix}
1(5)+2(7) & 1(6)+2(8)\\
3(5)+4(7) & 3(6)+4(8)
\end{bmatrix}
=
\begin{bmatrix}
19 & 22\\
43 & 50
\end{bmatrix}.
$$

Matrix multiplication is **not usually commutative**:

$$
AB\ne BA
$$

in general. Sometimes one product is defined and the other is not.

---

## Identity and Inverse Matrices

A **square matrix** has the same number of rows and columns. The identity matrix is the matrix version of the number $$1$$.

For $$2\times 2$$ matrices,

$$
I_2=
\begin{bmatrix}
1 & 0\\
0 & 1
\end{bmatrix}.
$$

For any compatible square matrix $$A$$,

$$
AI=IA=A.
$$

If a square matrix $$A$$ has a matrix $$A^{-1}$$ such that

$$
AA^{-1}=A^{-1}A=I,
$$

then $$A^{-1}$$ is the **inverse** of $$A$$. A matrix with an inverse is **invertible** or **nonsingular**. A matrix without an inverse is **singular**.

### Inverse of a 2 by 2 matrix

For

$$
A=
\begin{bmatrix}
a & b\\
c & d
\end{bmatrix},
$$

the determinant is

$$
\det(A)=ad-bc.
$$

If $$ad-bc\ne 0$$, then

$$
A^{-1}
=
\frac{1}{ad-bc}
\begin{bmatrix}
d & -b\\
-c & a
\end{bmatrix}.
$$

If $$ad-bc=0$$, then the inverse does not exist.

<div class="theorem-box" markdown="1">

**Example.** Find the inverse of

$$
A=
\begin{bmatrix}
2 & 1\\
5 & 3
\end{bmatrix}.
$$

The determinant is

$$
2(3)-1(5)=1.
$$

Therefore

$$
A^{-1}
=
\frac{1}{1}
\begin{bmatrix}
3 & -1\\
-5 & 2
\end{bmatrix}
=
\boxed{
\begin{bmatrix}
3 & -1\\
-5 & 2
\end{bmatrix}
}.
$$

</div>

### Solving systems with inverses

A linear system can be written as

$$
AX=B,
$$

where $$A$$ is the coefficient matrix, $$X$$ is the variable column, and $$B$$ is the constant column. If $$A^{-1}$$ exists, then

$$
X=A^{-1}B.
$$

<div class="theorem-box" markdown="1">

**Example.** Solve

$$
\begin{cases}
2x+y=7\\
5x+3y=18
\end{cases}
$$

Write the system as

$$
\begin{bmatrix}
2 & 1\\
5 & 3
\end{bmatrix}
\begin{bmatrix}
x\\
y
\end{bmatrix}
=
\begin{bmatrix}
7\\
18
\end{bmatrix}.
$$

Using the inverse from the previous example,

$$
\begin{bmatrix}
x\\
y
\end{bmatrix}
=
\begin{bmatrix}
3 & -1\\
-5 & 2
\end{bmatrix}
\begin{bmatrix}
7\\
18
\end{bmatrix}
=
\begin{bmatrix}
21-18\\
-35+36
\end{bmatrix}
=
\begin{bmatrix}
3\\
1
\end{bmatrix}.
$$

So

$$
\boxed{(x,y)=(3,1)}.
$$

</div>

For larger square matrices, one way to find the inverse is to row-reduce the augmented matrix

$$
\left[
\begin{array}{c|c}
A & I
\end{array}
\right].
$$

If row operations transform it into

$$
\left[
\begin{array}{c|c}
I & B
\end{array}
\right],
$$

then

$$
B=A^{-1}.
$$

---

## Determinants and Cramer's Rule

The determinant is a number attached to a square matrix. For a $$2\times 2$$ matrix,

$$
\det
\begin{bmatrix}
a & b\\
c & d
\end{bmatrix}
=ad-bc.
$$

For a $$3\times 3$$ matrix, one useful expansion is along the first row:

$$
\det
\begin{bmatrix}
a & b & c\\
d & e & f\\
g & h & i
\end{bmatrix}
=
a(ei-fh)-b(di-fg)+c(dh-eg).
$$

If $$\det(A)\ne 0$$, then $$A$$ is invertible and the system $$AX=B$$ has exactly one solution.

### Cramer's Rule for 2 by 2 systems

For

$$
\begin{cases}
a_1x+b_1y=c_1\\
a_2x+b_2y=c_2
\end{cases}
$$

let

$$
D=
\begin{vmatrix}
a_1 & b_1\\
a_2 & b_2
\end{vmatrix}.
$$

If $$D\ne 0$$, then

$$
x=\frac{D_x}{D},\qquad y=\frac{D_y}{D},
$$

where

$$
D_x=
\begin{vmatrix}
c_1 & b_1\\
c_2 & b_2
\end{vmatrix},
\qquad
D_y=
\begin{vmatrix}
a_1 & c_1\\
a_2 & c_2
\end{vmatrix}.
$$

<div class="theorem-box" markdown="1">

**Example.** Solve

$$
\begin{cases}
3x+2y=16\\
x-4y=-6
\end{cases}
$$

Compute

$$
D=
\begin{vmatrix}
3 & 2\\
1 & -4
\end{vmatrix}
=3(-4)-2(1)=-14.
$$

Then

$$
D_x=
\begin{vmatrix}
16 & 2\\
-6 & -4
\end{vmatrix}
=16(-4)-2(-6)=-52,
$$

and

$$
D_y=
\begin{vmatrix}
3 & 16\\
1 & -6
\end{vmatrix}
=3(-6)-16(1)=-34.
$$

Thus

$$
x=\frac{-52}{-14}=\frac{26}{7},
\qquad
y=\frac{-34}{-14}=\frac{17}{7}.
$$

</div>

---

## Nonlinear Systems

A **nonlinear system** has at least one equation that is not linear. The solutions are still points that satisfy every equation at once, but the graphs may intersect in more than one point.

Common strategies:

- Use substitution when one equation is easy to solve for one variable.
- Use elimination when the nonlinear terms can be canceled.
- Check all answers, especially after squaring or multiplying by expressions involving variables.

<div class="theorem-box" markdown="1">

**Example.** Solve

$$
\begin{cases}
x^2+y^2=25\\
y=x+1
\end{cases}
$$

Substitute $$y=x+1$$ into the circle equation:

$$
x^2+(x+1)^2=25.
$$

Then

$$
2x^2+2x+1=25,
$$

so

$$
2x^2+2x-24=0.
$$

Divide by $$2$$:

$$
x^2+x-12=0.
$$

Factor:

$$
(x+4)(x-3)=0.
$$

Thus $$x=-4$$ or $$x=3$$. Since $$y=x+1$$, the solutions are

$$
\boxed{(-4,-3)\text{ and }(3,4)}.
$$

</div>

---

## Systems of Inequalities

A system of inequalities asks for the region that satisfies every inequality at the same time.

To graph a linear inequality:

1. Graph the boundary line.
2. Use a solid line for $$\le$$ or $$\ge$$.
3. Use a dashed line for $$<$$ or $$>$$.
4. Shade the side that satisfies the inequality.
5. Repeat for every inequality; the solution is the overlap.

<div class="theorem-box" markdown="1">

**Example.** Describe the solution region:

$$
\begin{cases}
y\ge 2x-1\\
y< -x+5
\end{cases}
$$

The first boundary is the solid line $$y=2x-1$$. Shade above it.

The second boundary is the dashed line $$y=-x+5$$. Shade below it.

The solution is the region between the two lines:

$$
2x-1\le y< -x+5.
$$

This region exists where

$$
2x-1<-x+5,
$$

so

$$
3x<6,\qquad x<2.
$$

</div>
