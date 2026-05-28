# Component fixture

Maintenance: see `src/dev/README.md`. Update this file when directives or practice UI change.

---

## Math

Inline $$E = mc^2$$ and display:

$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$

---

## Callouts

Callouts with an optional named field show the type label plus a filled name chip; omit the attribute for the default type label only.

### Theorem (`name`)

:::theorem{name="Rate law"}
For elementary steps, exponents match stoichiometric coefficients only when the step is rate-determining.
:::

:::theorem
Unnamed theorem—default label only.
:::

### Example (`title`)

:::example{title="Half-life from k"}
Compute $$t_{1/2}$$ when $$k = 0.0300\ \text{s}^{-1}$$.
:::

:::example
Unnamed example—default label only.
:::

### Proof (`of`)

:::proof{of="First-order integrated rate law"}
Assume first-order decay. Then $$\ln[A]_t = \ln[A]_0 - kt$$.
:::

:::proof
Unnamed proof—default label only.
:::

### Key (`name`)

:::key{name="First-order half-life"}
First order: $$t_{1/2} = \frac{0.693}{k}$$
:::

:::key
Unnamed key formula—default label only.
:::

### Exam (`topic`)

:::exam{topic="Linearized plots"}
AP often asks you to justify order from linearized plots.
:::

:::exam
Unnamed exam note—default label only.
:::

### Summary (`title`)

:::summary{title="Rate laws"}
Rate laws come from mechanism or experiment; order is not always equal to coefficients.
:::

:::summary
Unnamed summary—default label only.
:::

### Other callouts (no optional fields)

:::tip
Check units on $$k$$ before picking a integrated law.
:::

:::warning
Do not confuse rate constant units across reaction orders.
:::

:::mistakes
- Using first-order half-life when the reaction is second order.
- Dropping units on $$k$$ before comparing trials.
:::

:::note
Collisions must be correctly oriented for a reaction to occur.
:::

:::placeholder
Future widget slot—replace when a new directive ships.
:::

---

## Under construction

Inline badge (text directive, e.g. next to a heading): :under-construction

Block banner:

:::under-construction
This unit is still being written. Check the home page for course status.
:::

Custom inline label: :under-construction[Draft]

---

Standalone solution callout:

:::solution
$$t_{1/2} = \frac{0.693}{0.0300\ \text{s}^{-1}} = 23.1\ \text{s}$$
:::

---

## Figures

:::figure{width=480}
![Ellipse graph sample](/assets/APs/AP%20Precalc/ellipsegraph1.png)
Sample figure caption for lightbox + width class.
:::

:::figures{width=480}
![Hyperbola graph](/assets/APs/AP%20Precalc/hyperbolagraph1.png)
Multi-image figure wrapper (`figures` directive).
:::

---

## Practice block

:::practice

### MCQ—correct on first try

:::mcq{correct=B id=dev-components-mcq-1}
What is the half-life of a first-order process with $$k = 0.0300\ \text{s}^{-1}$$?

- [ ] 11.5 s
- [ ] 23.1 s
- [ ] 46.2 s
- [ ] 69.3 s

:::solution
$$t_{1/2} = \frac{0.693}{k} = \frac{0.693}{0.0300\ \text{s}^{-1}} = 23.1\ \text{s}$$
:::

### MCQ—wrong attempts before reveal

:::mcq{correct=C id=dev-components-mcq-2}
Which plot is linear for a first-order reaction?

- [ ] $$[A]$$ vs time
- [ ] $$1/[A]$$ vs time
- [ ] $$\ln[A]$$ vs time
- [ ] $$[A]^2$$ vs time

:::solution
For first order, $$\ln[A]$$ vs time is linear with slope $$-k$$.
:::

### FRQ—grade + reveal (manifest-backed)

Uses `chem-kinetics-frq-7` from the build manifest; `pagePath` points at the real note for the Worker lookup.

:::frq{id=chem-kinetics-frq-7 pagePath=/notes/ap/chem/kinetics/}
7. A first-order decomposition has rate constant $$k=0.0300\ \text{s}^{-1}$$.

   $$(A)$$ Calculate the half-life.

   $$(B)$$ If the initial concentration is $$0.800\ M$$, calculate the concentration after $$60.0\ \text{s}$$.

   $$(C)$$ Explain how the slope of a graph of $$\ln[A]$$ versus time is related to $$k$$.

:::solution
$$(A)$$ $$t_{1/2}=\frac{0.693}{k}=23.1\ \text{s}$$

$$(B)$$ $$[A]_t=[A]_0 e^{-kt}=0.132\ M$$

$$(C)$$ Slope of $$\ln[A]$$ vs time is $$-k$$.
:::

:::

---

## Links

Internal: `CONTRIBUTING.md` at repo root (not linked from site nav).

External (new tab + pop-out icon): [Kevin S. Huang](https://kevinshuang.com/).

---

## Lists and tables

| Quantity | Symbol |
| --- | --- |
| Rate constant | $$k$$ |
| Half-life | $$t_{1/2}$$ |

1. Identify order from data.
2. Write the rate law.
3. Check units.

---

## Code (prose styling)

```python
k = 0.0300
t_half = 0.693 / k
```
