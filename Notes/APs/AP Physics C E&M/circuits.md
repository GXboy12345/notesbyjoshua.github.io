---
layout: default
title: Circuits
nav_title: "Unit 4: Circuits"
parent: AP Physics C E&M
nav_order: 4
permalink: /notes/physics/circuits/
---

# Circuits

Circuit analysis translates electric field and potential ideas into networks of elements. In AP Physics C, circuits are not just plug-and-chug resistance problems: you should connect current to charge flow, potential difference to energy per charge, and RC behavior to differential equations.

---

## Useful Variables

- $$I$$ = current (Units: amperes, $$\text{A}=\text{C/s}$$)
- $$V$$ or $$\Delta V$$ = potential difference (Units: volts)
- $$R$$ = resistance (Units: ohms, $$\Omega$$)
- $$\mathcal{E}$$ = emf of a battery or source
- $$P$$ = power
- $$\rho$$ = resistivity
- $$C$$ = capacitance
- $$\tau$$ = time constant

---

## Current

Electric current is the rate at which charge passes through a cross-section:

$$
I = \frac{dQ}{dt}.
$$

Conventional current is defined as the direction positive charge would move. In metal wires, the mobile charges are electrons, so electron drift is opposite conventional current.

For a wire with charge-carrier number density $$n$$, charge magnitude $$q$$, cross-sectional area $$A$$, and drift speed $$v_d$$,

$$
I = nqAv_d.
$$

Drift speeds are usually small; circuits respond quickly because the electric field is established throughout the circuit at near light-speed scales in the medium.

---

## Resistance and Ohm's Law

For an ohmic resistor,

$$
\Delta V = IR.
$$

The resistance of a uniform wire is

$$
R = \rho\frac{L}{A},
$$

where $$\rho$$ is resistivity, $$L$$ is length, and $$A$$ is cross-sectional area.

Ohm's law is not a universal law of nature; it is a material/model relationship. Devices such as diodes, light bulbs over large temperature ranges, and capacitors are not simple ohmic resistors.

---

## Power in Circuits

Power is energy per time. For a circuit element,

$$
P = I\Delta V.
$$

For an ohmic resistor, combine with $$\Delta V=IR$$:

$$
P=I^2R
$$

and

$$
P=\frac{(\Delta V)^2}{R}.
$$

Resistors convert electrical energy into thermal energy. Batteries or power supplies can deliver energy to charges by raising their electric potential.

---

## Resistors in Series and Parallel

For resistors in series, current is the same through each resistor and voltage drops add:

$$
R_{\text{eq}}=R_1+R_2+R_3+\cdots.
$$

For resistors in parallel, voltage is the same across each branch and currents add:

$$
\frac{1}{R_{\text{eq}}}=\frac{1}{R_1}+\frac{1}{R_2}+\frac{1}{R_3}+\cdots.
$$

Adding a parallel branch lowers the equivalent resistance because it gives charge another path.

---

## Kirchhoff's Rules

Kirchhoff's junction rule is conservation of charge:

$$
\sum I_{\text{in}}=\sum I_{\text{out}}.
$$

Kirchhoff's loop rule is conservation of energy:

$$
\sum \Delta V = 0
$$

around any closed loop.

When traversing a resistor in the direction of current, the potential change is $$-IR$$. Traversing against current gives $$+IR$$. Across an ideal battery from negative to positive terminal, the potential change is $$+\mathcal{E}$$.

---

## Batteries and Internal Resistance

An ideal battery maintains a fixed emf $$\mathcal{E}$$. A real battery can be modeled as an ideal emf in series with internal resistance $$r$$. When delivering current $$I$$, its terminal voltage is

$$
V_{\text{terminal}}=\mathcal{E}-Ir.
$$

When charging a battery, current enters the positive terminal and the terminal voltage can exceed the emf.

---

## RC Circuits

An RC circuit contains a resistor and capacitor. The product

$$
\tau = RC
$$

is the time constant.

For a charging capacitor connected to a battery of emf $$\mathcal{E}$$,

$$
Q(t)=C\mathcal{E}\left(1-e^{-t/RC}\right),
$$

$$
V_C(t)=\mathcal{E}\left(1-e^{-t/RC}\right),
$$

and

$$
I(t)=\frac{\mathcal{E}}{R}e^{-t/RC}.
$$

The capacitor initially behaves like a wire with zero voltage across it, then eventually like an open circuit.

For discharging from initial charge $$Q_0$$,

$$
Q(t)=Q_0e^{-t/RC},
$$

$$
V_C(t)=V_0e^{-t/RC},
$$

and

$$
I(t)=-\frac{V_0}{R}e^{-t/RC}
$$

if positive current is defined in the original charging direction.

---

## Differential Equation View of RC Circuits

For charging, Kirchhoff's loop rule gives

$$
\mathcal{E}-IR-\frac{Q}{C}=0.
$$

Since $$I=dQ/dt$$,

$$
R\frac{dQ}{dt}+\frac{Q}{C}=\mathcal{E}.
$$

The solution approaches the steady-state charge $$Q_{\infty}=C\mathcal{E}$$ exponentially.

For discharging,

$$
R\frac{dQ}{dt}+\frac{Q}{C}=0,
$$

which gives exponential decay.

---

## Meters

An ideal ammeter has zero resistance and is placed in series with the element whose current is measured. An ideal voltmeter has infinite resistance and is placed in parallel across the element whose potential difference is measured.

Real meters disturb circuits slightly: an ammeter adds small series resistance, and a voltmeter draws small parallel current.
