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

<div class="theorem-box" markdown="1">

**Proof (Drift Current Formula).** In time $$dt$$, charge carriers drifting at speed $$v_d$$ move distance

$$
dx=v_d\,dt.
$$

The volume of wire crossing a chosen cross-section during that time is

$$
dV=A\,dx=Av_d\,dt.
$$

If the number density of carriers is $$n$$, the number of carriers in that volume is

$$
dN=nAv_d\,dt.
$$

The charge passing through is

$$
dQ=q\,dN=nqAv_d\,dt.
$$

Therefore

$$
I=\frac{dQ}{dt}=nqAv_d.
$$

</div>

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

<div class="theorem-box" markdown="1">

**Proof (Resistors in Series and Parallel).** In series, the same current $$I$$ passes through each resistor. The total voltage drop is

$$
\Delta V_{\text{tot}}=\Delta V_1+\Delta V_2+\cdots=IR_1+IR_2+\cdots.
$$

Since $$\Delta V_{\text{tot}}=IR_{\text{eq}}$$,

$$
R_{\text{eq}}=R_1+R_2+\cdots.
$$

In parallel, each branch has the same voltage $$\Delta V$$. The total current is

$$
I_{\text{tot}}=I_1+I_2+\cdots=\frac{\Delta V}{R_1}+\frac{\Delta V}{R_2}+\cdots.
$$

Since $$I_{\text{tot}}=\Delta V/R_{\text{eq}}$$,

$$
\frac{\Delta V}{R_{\text{eq}}}=\Delta V\left(\frac{1}{R_1}+\frac{1}{R_2}+\cdots\right).
$$

Cancel $$\Delta V$$:

$$
\frac{1}{R_{\text{eq}}}=\frac{1}{R_1}+\frac{1}{R_2}+\cdots.
$$

</div>

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

<div class="theorem-box" markdown="1">

**Proof (Charging RC Formula).** For a charging RC circuit,

$$
R\frac{dQ}{dt}+\frac{Q}{C}=\mathcal{E}.
$$

Rearrange:

$$
\frac{dQ}{dt}=\frac{C\mathcal{E}-Q}{RC}.
$$

Separate variables:

$$
\frac{dQ}{C\mathcal{E}-Q}=\frac{dt}{RC}.
$$

Integrate from $$Q=0$$ at $$t=0$$ to charge $$Q$$ at time $$t$$:

$$
\int_0^Q \frac{dQ'}{C\mathcal{E}-Q'}=\int_0^t \frac{dt'}{RC}.
$$

The left side is

$$
-\ln(C\mathcal{E}-Q)+\ln(C\mathcal{E}).
$$

So

$$
\ln\left(\frac{C\mathcal{E}}{C\mathcal{E}-Q}\right)=\frac{t}{RC}.
$$

Exponentiate and solve for $$Q$$:

$$
Q(t)=C\mathcal{E}\left(1-e^{-t/RC}\right).
$$

Then $$V_C=Q/C$$ and $$I=dQ/dt$$ give

$$
V_C(t)=\mathcal{E}\left(1-e^{-t/RC}\right),
$$

$$
I(t)=\frac{\mathcal{E}}{R}e^{-t/RC}.
$$

</div>

For discharging,

$$
R\frac{dQ}{dt}+\frac{Q}{C}=0,
$$

which gives exponential decay.

<div class="theorem-box" markdown="1">

**Proof (Discharging RC Formula).** For discharging,

$$
R\frac{dQ}{dt}+\frac{Q}{C}=0.
$$

Rearrange:

$$
\frac{dQ}{dt}=-\frac{Q}{RC}.
$$

Separate variables:

$$
\frac{dQ}{Q}=-\frac{dt}{RC}.
$$

Integrate:

$$
\ln Q=-\frac{t}{RC}+C_1.
$$

Exponentiating gives

$$
Q=Ae^{-t/RC}.
$$

Using $$Q(0)=Q_0$$ sets $$A=Q_0$$, so

$$
Q(t)=Q_0e^{-t/RC}.
$$

</div>

---

## Meters

An ideal ammeter has zero resistance and is placed in series with the element whose current is measured. An ideal voltmeter has infinite resistance and is placed in parallel across the element whose potential difference is measured.

Real meters disturb circuits slightly: an ammeter adds small series resistance, and a voltmeter draws small parallel current.
