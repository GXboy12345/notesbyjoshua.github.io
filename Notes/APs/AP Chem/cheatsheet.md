---
layout: default
title: "AP Chemistry Cheat Sheet"
parent: AP Chemistry
nav_order: 0
permalink: /notes/ap/chem/cheatsheet/
---

# AP Chemistry Cheat Sheet

Units 1-9. [Official AP formula sheet](https://apcentral.collegeboard.org/media/pdf/ap-chemistry-equations-sheet.pdf).

---

## Constants

:::key{name="Constants"}

- $N_A = 6.022 \times 10^{23}\ \text{mol}^{-1}$
- $R = 0.08206\ \text{L·atm/(mol·K)} = 8.314\ \text{J/(mol·K)}$
- $F = 96485\ \text{C/mol e}^-$
- $c_{\text{water}} \approx 4.18\ \text{J g}^{-1}\,^\circ\text{C}^{-1}$
- $1\ \text{atm} = 760\ \text{mmHg} = 760\ \text{torr} = 101.325\ \text{kPa}$
- STP: $273.15\ \text{K}$, $1\ \text{atm}$; $V_m \approx 22.4\ \text{L/mol}$
- $K_w = 1.0 \times 10^{-14}$ at $25^\circ\text{C}$

:::

---

## Unit 1 — Atomic Structure

:::summary{title="Unit 1 — Atomic Structure"}

- $A = p + n$; $Z = p$
- avg atomic mass: isotope-weighted
- $M = \dfrac{n_{\text{solute}}}{V_{\text{solution}}}$

:::theorem{name="Electron configuration rules"}
Aufbau; Pauli (2 e⁻/orbital, opposite spin); Hund (singlet before pair)

:::

:::tip
$1s \to 2s \to 2p \to 3s \to 3p \to 4s \to 3d \to 4p \to 5s \to 4d \to 5p \to 6s \to 4f \to 5d \to 6p$

:::

| Trend | Down group | Across period |
| --- | --- | --- |
| $r$ | ↑ | ↓ |
| IE, EN | ↓ | ↑ |
| EA | — | ↑ (usual) |

- PES: lower binding energy = easier removal; peak height ∝ e⁻ count; position = subshell

:::figure{width=480}
![Periodic trends](/assets/APs/AP%20Chem/atomicstrucprop/periodictrends.png)

:::

:::figure{width=480}
![PES](/assets/APs/AP%20Chem/atomicstrucprop/PES.png)

:::

:::

---

## Unit 2 — Structure and Bonding

:::summary{title="Unit 2 — Structure and Bonding"}

| Bond | Pattern |
| --- | --- |
| Ionic | metal + nonmetal |
| Covalent | nonmetal + nonmetal |
| Metallic | metal lattice + delocalized e⁻ |

:::tip
**Lewis:** count valence e⁻; central atom; single bonds; octets on outers; remainder on center; multiple bonds; check FC

:::

:::key{name="Formal charge"}
$$
\text{FC} = V - N - \tfrac{1}{2}B
$$

:::

| e⁻ groups | Electron geometry |
| --- | --- |
| 2 | linear |
| 3 | trigonal planar |
| 4 | tetrahedral |
| 5 | trigonal bipyramidal |
| 6 | octahedral |

Molecular shape: subtract lone pairs from geometry above.

:::figure{width=480}
![VSEPR](/assets/APs/AP%20Chem/compounds/VSEPR.png)

:::

| e⁻ groups | Hybridization |
| --- | --- |
| 2 | $sp$ |
| 3 | $sp^2$ |
| 4 | $sp^3$ |
| 5 | $sp^3d$ |
| 6 | $sp^3d^2$ |

- ↑ bond order: shorter, stronger bond

:::

---

## Unit 3 — Substances and Mixtures

:::summary{title="Unit 3 — Substances and Mixtures"}

:::tip
**IMF (weak to strong):** London dispersion, dipole-dipole, H-bond, ion-dipole

:::

- Polar ∥ polar; nonpolar ∥ nonpolar; ionic in polar solvent

:::key{name="Ideal gas law"}
$$
PV = nRT \qquad P_{\text{total}} = \sum P_i \qquad P_i = x_i P_{\text{total}}
$$

:::

:::theorem{name="Graham's law"}
$$
KE_{\text{avg}} = \tfrac{3}{2}RT \quad \text{(ideal gas)} \qquad \frac{r_1}{r_2} = \sqrt{\frac{M_2}{M_1}} \quad \text{(Graham)}
$$

:::

:::key{name="Colligative properties"}
$$
\Delta T_b = iK_bm \qquad \Delta T_f = iK_fm \qquad \Pi = iMRT
$$

:::

:::

---

## Unit 4 — Reactions

:::summary{title="Unit 4 — Reactions"}

**Types:** synthesis, decomposition, single replacement, double replacement, combustion, acid-base, redox

**Net ionic:** split strong electrolytes; keep s, l, g, weak intact; cancel spectators

:::tip
**Solubility (memorize):**

- Always: Group 1, $\text{NH}_4^+$, $\text{NO}_3^-$, acetate, chlorate, perchlorate
- Usually: halides (except $\text{Ag}^+$, $\text{Pb}^{2+}$, $\text{Hg}_2^{2+}$); sulfates (except $\text{Ba}^{2+}$, $\text{Sr}^{2+}$, $\text{Pb}^{2+}$, often $\text{Ca}^{2+}$)
- Usually insoluble: carbonates, phosphates, chromates, sulfides, hydroxides (except Group 1, $\text{NH}_4^+$)

:::

:::figure{width=480}
![Solubility rules](/assets/APs/AP%20Chem/chemrxns/solubility.jpg)

:::

:::theorem{name="Oxidation number rules"}
**Oxidation #:** element alone 0; monatomic ion = charge; O usually −2; H +1 (nonmetals) / −1 (metals); sum = overall charge

:::

:::

---

## Unit 5 — Kinetics

:::summary{title="Unit 5 — Kinetics"}

:::key{name="Rate law"}
$$
\text{rate} = k[A]^m[B]^n
$$

:::

Orders from experiment (not balanced eqn unless elementary). Catalyst: ↓ $E_a$; no change to $\Delta H$ or $K$.

| Order | Integrated | $t_{1/2}$ |
| --- | --- | --- |
| 0 | $[A] = [A]_0 - kt$ | $[A]_0/(2k)$ |
| 1 | $\ln[A] = \ln[A]_0 - kt$ | $0.693/k$ |
| 2 | $1/[A] = 1/[A]_0 + kt$ | $1/(k[A]_0)$ |

:::theorem{name="Arrhenius equation"}
$$
k = Ae^{-E_a/(RT)} \qquad \ln k = -\frac{E_a}{R}\frac{1}{T} + \ln A
$$

:::

:::

---

## Unit 6 — Thermochemistry

:::summary{title="Unit 6 — Thermochemistry"}

:::key{name="Heat and enthalpy"}
$$
q = mc\Delta T \qquad \Delta U = q + w \qquad w = -P_{\text{ext}}\Delta V \qquad \Delta H = q_p
$$

:::

:::theorem{name="Hess's law"}
**Hess:** reverse: flip sign; multiply: scale $\Delta H$; add eqns: add $\Delta H$

:::

:::key{name="Standard enthalpy of reaction"}
$$
\Delta H^\circ_{\text{rxn}} = \sum \nu \Delta H_f^\circ(\text{products}) - \sum \nu \Delta H_f^\circ(\text{reactants})
$$

:::

:::key{name="Bond enthalpy approximation"}
$$
\Delta H_{\text{rxn}} \approx \sum D(\text{broken}) - \sum D(\text{formed})
$$

:::

:::

---

## Unit 7 — Equilibrium

:::summary{title="Unit 7 — Equilibrium"}

At eqm: $r_f = r_r$; $[ ]$ constant (not necessarily equal).

For $aA + bB \rightleftharpoons cC + dD$:

:::key{name="Equilibrium constant"}
$$
K_c = \frac{[C]^c[D]^d}{[A]^a[B]^b}
$$

:::

Omit pure s, l. $Q < K$: shift right; $Q > K$: shift left; $Q = K$: at eqm.

:::key{name="K_p and ΔG°"}
$$
K_p = K_c(RT)^{\Delta n_{\text{gas}}}
$$

:::

:::tip
**ICE:** Initial, Change ($\pm nx$), Equilibrium; small-$x$ approx when $x \ll$ initial $[ ]$

:::

:::theorem{name="Le Châtelier's principle"}
**Le Châtelier:** +reactant: right; +product: left; ↑$P$: fewer gas moles; ↑$T$: changes $K$; catalyst: no $K$ change

:::

:::key{name="K_sp and ΔG°"}
$$
K_{sp} = [\text{ions}]^{\text{coeff}} \qquad \Delta G^\circ = -RT\ln K
$$

:::

:::

---

## Unit 8 — Acids and Bases

:::summary{title="Unit 8 — Acids and Bases"}

| Model | Acid | Base |
| --- | --- | --- |
| Arrhenius | ↑ $[\text{H}^+]$ | ↑ $[\text{OH}^-]$ |
| Brønsted-Lowry | proton donor | proton acceptor |
| Lewis | e⁻-pair acceptor | e⁻-pair donor |

:::tip
**Strong acids:** $\text{HCl}$, $\text{HBr}$, $\text{HI}$, $\text{HNO}_3$, $\text{HClO}_4$, $\text{HClO}_3$, $\text{H}_2\text{SO}_4$ (1st proton)

**Strong bases:** Group 1 OH⁻; $\text{Ca(OH)}_2$, $\text{Sr(OH)}_2$, $\text{Ba(OH)}_2$

:::

:::key{name="K_a, K_b, and pH"}
$$
K_a = \frac{[\text{H}_3\text{O}^+][\text{A}^-]}{[\text{HA}]} \qquad K_b = \frac{[\text{BH}^+][\text{OH}^-]}{[\text{B}]} \qquad K_a K_b = K_w
$$

$$
\text{pH} = -\log[\text{H}_3\text{O}^+] \qquad \text{pOH} = -\log[\text{OH}^-] \qquad \text{pH} + \text{pOH} = 14 \ \text{at } 25^\circ\text{C}
$$

:::

:::theorem{name="Henderson-Hasselbalch"}
$$
\text{pH} = \text{p}K_a + \log\frac{[\text{A}^-]}{[\text{HA}]}
$$

:::

| Titration | Eq. pt. pH |
| --- | --- |
| SA / SB | ≈ 7 |
| WA / SB | > 7 |
| WB / SA | < 7 |
| Half-eq. (WA/WB) | $\text{pH} = \text{p}K_a$ or $\text{pOH} = \text{p}K_b$ |

:::figure{width=480}
![Titration curves](/assets/APs/AP%20Chem/acidbase/titrationcurve.gif)

:::

:::

---

## Unit 9 — Thermodynamics and Electrochemistry

:::summary{title="Unit 9 — Thermodynamics and Electrochemistry"}

:::theorem{name="Second law (entropy)"}
$$
\Delta S_{\text{univ}} = \Delta S_{\text{sys}} + \Delta S_{\text{surr}} \qquad \text{spontaneous if } \Delta S_{\text{univ}} > 0
$$

:::

:::key{name="Gibbs free energy"}
$$
\Delta G = \Delta H - T\Delta S \qquad \text{spontaneous if } \Delta G < 0 \qquad \Delta G^\circ = -RT\ln K
$$

:::

:::key{name="Cell potential"}
$$
\Delta G = -nFE_{\text{cell}} \qquad E^\circ_{\text{cell}} = E^\circ_{\text{cathode}} - E^\circ_{\text{anode}}
$$

:::

:::theorem{name="Nernst equation"}
$$
E_{\text{cell}} = E^\circ_{\text{cell}} - \frac{RT}{nF}\ln Q \qquad E_{\text{cell}} = E^\circ_{\text{cell}} - \frac{0.0592}{n}\log Q \ \text{at } 25^\circ\text{C}
$$

:::

:::key{name="Electrolysis charge and mass"}
$$
q = It = nF \qquad m = \frac{MIt}{nF}
$$

:::

| | Galvanic | Electrolytic |
| --- | --- | --- |
| $\Delta G$ | < 0 | > 0 |
| Anode sign | − | + |
| Cathode sign | + | − |

Oxidation at anode; reduction at cathode.

:::figure{width=480}
![Galvanic cell](/assets/APs/AP%20Chem/thermoelectro/galvaniccell.jpg)

:::

:::figure{width=480}
![Electrolytic cell](/assets/APs/AP%20Chem/thermoelectro/electrolyticcell.png)

:::

:::

---

:::mistakes
- K in gas/eqm/thermo; not °C
- No s, l in $K$
- Rate-law orders from data, not coefficients
- Stoichiometry before eqm (titration, buffer)
- Catalyst: no $K$, no $\Delta G^\circ$
- Bond polarity ≠ molecular polarity
- Anode/cathode signs flip (galvanic vs electrolytic)

:::
