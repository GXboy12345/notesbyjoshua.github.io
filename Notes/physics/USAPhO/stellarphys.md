---
layout: default
title: Stellar Physics
parent: USAPhO Prep
nav_order: 5
permalink: /notes/physics/stellarphys/
---

# Stellar Physics

This page is dedicated to equations/concepts of stellar physics that will show up on USAPhO that is NOT discussed in the AP Physics C Mechanics or F=ma notes.

Stellar physics is unusual on the olympiad: it almost never requires new *laws*, only the willingness to apply mechanics, thermodynamics, gravitation, and radiation to an enormous object. A star is a self-gravitating ball of hot gas that has settled into a balance between gravity (pulling in) and pressure (pushing out), radiating away energy that nuclear fusion replaces from inside. Almost every problem is some version of "set up that balance, then estimate." Order-of-magnitude reasoning and clean dimensional analysis matter more here than anywhere else — see the [Math Tricks]({{ '/notes/physics/mathtricks/' | relative_url }}) and [Problem Solving Techniques]({{ '/notes/physics/techniques/' | relative_url }}) notes.

> **[Image placeholder — star trails]** A long-exposure star-trail photo, circumpolar arcs about the celestial pole. Mostly decorative for the chapter opener.

---

## Light from stars

Almost everything we know about a star comes from the light it sends us. A star's surface radiates very nearly as a **blackbody**, so the thermal-radiation laws are the backbone of observational stellar physics. The microscopic justification (Planck's law, derived from summing photon modes in a cavity) lives in the [Quantum & Nuclear Physics]({{ '/notes/physics/quantnucphys/' | relative_url }}) notes; here we take the macroscopic results and run with them.

### Blackbody radiation: Stefan–Boltzmann and Wien

A blackbody at temperature $$T$$ radiates power per unit surface area

$$
j=\sigma T^4,\qquad \sigma=5.67\times10^{-8}\ \text{W m}^{-2}\text{K}^{-4}.
$$

Multiplying by the star's surface area gives its total radiated power, the **luminosity**:

$$
\boxed{\ L=4\pi R^2\,\sigma T^4\ }.
$$

This one equation ties together the three numbers we most want to know about a star — its size $$R$$, surface temperature $$T$$, and energy output $$L$$. Know any two and you have the third.

The spectrum peaks at a wavelength given by **Wien's displacement law**:

$$
\lambda_{\text{peak}}=\frac{b}{T},\qquad b=2.90\times10^{-3}\ \text{m K}.
$$

Hot stars peak in the blue/UV and look bluish; cool stars peak in the red. This is why a star's *color* is a direct thermometer.

> **[Image placeholder — blackbody curves]** Planck spectral-radiance curves for a few temperatures (e.g. 3000 K, 5800 K, 10000 K) on the same axes, with the dashed Wien-peak locus through the maxima. Shows both the $$T^4$$ growth in area and the leftward shift of the peak.

<div class="theorem-box" markdown="1">

**Example (the Sun's temperature).** The Sun's luminosity is $$L_\odot=3.8\times10^{26}\ \text{W}$$ and radius $$R_\odot=7.0\times10^{8}\ \text{m}$$. From $$L=4\pi R^2\sigma T^4$$,

$$
T=\left(\frac{L}{4\pi R^2\sigma}\right)^{1/4}\approx 5800\ \text{K}.
$$

Wien's law then predicts $$\lambda_{\text{peak}}=b/T\approx 500\ \text{nm}$$ — green-yellow, right in the middle of the visible band, which is no accident given that our eyes evolved under this star.

</div>

### Flux and the inverse-square law

Luminosity is intrinsic; what we actually measure is **flux** — power per unit area arriving at our detector. A star radiating $$L$$ isotropically spreads it over a sphere of radius $$d$$, so

$$
F=\frac{L}{4\pi d^2}.
$$

The inverse-square falloff is the central difficulty of astronomy: a faint star might be intrinsically dim and close, or luminous and far. Breaking that degeneracy — measuring $$d$$ independently — is what the magnitude and parallax machinery below is for.

### Spectral classification and the Doppler shift

A star's spectrum carries more than temperature. Superimposed on the blackbody continuum are dark **absorption lines** from atoms in the cooler outer layers (the reverse of the bright emission lines discussed in [Quantum & Nuclear Physics]({{ '/notes/physics/quantnucphys/' | relative_url }})). Their pattern identifies the elements present and, through line strengths, the temperature. The classical sequence from hot to cool is **O B A F G K M** (mnemonic: "Oh Be A Fine Guy/Girl, Kiss Me"); the Sun is a G star.

Because lines sit at known rest wavelengths, any shift reveals motion along the line of sight via the **Doppler effect**. For speeds $$v\ll c$$,

$$
\frac{\Delta\lambda}{\lambda_0}=\frac{v_r}{c},
$$

with redshift ($$\Delta\lambda>0$$) for recession and blueshift for approach. This single measurement drives the detection of binary stars, exoplanets (the star wobbles), stellar rotation (lines broaden), and ultimately cosmic expansion (Hubble's law). The relativistic version is in the [Relativity]({{ '/notes/physics/relativity/' | relative_url }}) notes.

---

## Measuring stars

### Parallax and the parsec

As the Earth orbits the Sun, a nearby star appears to shift against the distant background. Half the angular shift over a 1 AU baseline is the **parallax angle** $$p$$. For small angles,

$$
d=\frac{1\ \text{AU}}{p}.
$$

This *defines* the **parsec**: the distance at which $$1\ \text{AU}$$ subtends $$p=1''$$ (one arcsecond). Then the relation is beautifully simple:

$$
d\,[\text{pc}]=\frac{1}{p\,['']},\qquad 1\ \text{pc}=3.086\times10^{16}\ \text{m}=3.26\ \text{ly}.
$$

Parallax is the only *direct* (geometric) distance method and the foundation on which all the others are calibrated.

> **[Image placeholder — stellar parallax]** Earth at two points six months apart on its orbit, the 1 AU baseline, sightlines to a nearby star projecting onto the distant background, and the parallax angle $$p$$ marked at the star.

### The magnitude system

Astronomers report brightness on the ancient, logarithmic, *backwards* **magnitude** scale: brighter objects have *smaller* magnitudes. The scale is defined so that a difference of 5 magnitudes is exactly a factor of 100 in flux. Hence a one-magnitude difference is a factor $$100^{1/5}\approx 2.512$$, and

$$
m_1-m_2=-2.5\log_{10}\!\frac{F_1}{F_2}
$$

(**Pogson's relation**). The **apparent magnitude** $$m$$ describes how bright a star *looks*; the **absolute magnitude** $$M$$ is defined as the apparent magnitude it *would* have at a standard distance of 10 pc. Combining Pogson with the inverse-square law gives the **distance modulus**:

$$
\boxed{\ m-M=5\log_{10}\!\frac{d}{10\ \text{pc}}\ }.
$$

So $$m-M$$ (the "distance modulus") converts directly to distance, and conversely, if you know a star's intrinsic luminosity (its $$M$$) and measure $$m$$, you get $$d$$ — the logic behind every "standard candle."

<div class="theorem-box" markdown="1">

**Example (distance modulus).** A star has apparent magnitude $$m=8.0$$ and, from its spectral type, absolute magnitude $$M=3.0$$. Then $$m-M=5.0$$, so $$\log_{10}(d/10\,\text{pc})=1$$, giving $$d=100\ \text{pc}$$. A 5-magnitude modulus always means exactly $$10\times$$ the reference distance.

</div>

### The Hertzsprung–Russell diagram

Plot stars' luminosity (or absolute magnitude) against their temperature (or color, or spectral type), with temperature increasing *to the left* by convention, and they do not scatter randomly. Most lie along a diagonal **main sequence** running from hot-luminous (upper left) to cool-dim (lower right); these are stars fusing hydrogen in their cores. Cool but very luminous stars in the upper right must be huge (large $$R$$ in $$L=4\pi R^2\sigma T^4$$) — **giants** and **supergiants**. Hot but dim stars in the lower left must be tiny — **white dwarfs**. The HR diagram is the single most important organizing picture in stellar astrophysics, and reading off positions with $$L=4\pi R^2\sigma T^4$$ is a common problem type.

> **[Image placeholder — HR diagram]** Hertzsprung–Russell diagram: x-axis temperature/spectral type (O→M, hot left), y-axis luminosity in $$L_\odot$$ (log). Mark the main sequence diagonal, the giant/supergiant branch (upper right), and the white-dwarf region (lower left), with lines of constant radius shown as faint diagonals.

---

## The mechanics of a star

We now turn from observing stars to modeling their interiors. The governing idea is **hydrostatic equilibrium**: at every depth, the pressure difference across a shell must support the weight of the material above it. This is exactly the [fluid hydrostatic equation]({{ '/notes/physics/fluiddynamics/' | relative_url }}), but with the local, depth-dependent gravity of a self-gravitating mass.

### Hydrostatic equilibrium

Consider a thin spherical shell at radius $$r$$, thickness $$dr$$, with $$m(r)$$ the mass enclosed. Balancing the pressure force against gravity on the shell gives

$$
\boxed{\ \frac{dP}{dr}=-\frac{G\,m(r)\,\rho(r)}{r^2}\ },
$$

paired with the mass-continuity relation $$dm/dr=4\pi r^2\rho$$. These two coupled equations are the start of all stellar-structure modeling. We rarely solve them exactly in olympiad settings; instead we *estimate*.

<div class="theorem-box" markdown="1">

**Order-of-magnitude central pressure.** Approximate $$dP/dr\sim -P_c/R$$ (pressure drops from the center $$P_c$$ to ~0 at the surface over a length $$R$$), and use mean values $$m\sim M$$, $$\rho\sim M/R^3$$, $$r\sim R$$:

$$
\frac{P_c}{R}\sim \frac{G M}{R^2}\cdot\frac{M}{R^3}
\quad\Longrightarrow\quad
P_c\sim \frac{GM^2}{R^4}.
$$

For the Sun this gives $$P_c\sim 10^{14}\ \text{Pa}$$ — the right order of magnitude (the true value is $$\sim 2\times10^{16}\ \text{Pa}$$; the factor reflects how centrally concentrated real stars are). The point of such estimates is the *scaling*: $$P_c\propto GM^2/R^4$$.

</div>

If we then assume the interior is an ideal gas, $$P=\rho k_B T/(\mu m_H)$$, the same estimate gives a central temperature

$$
k_B T_c \sim \frac{G M\mu m_H}{R}\quad\Longrightarrow\quad T_c\sim 10^7\ \text{K for the Sun},
$$

hot enough for hydrogen fusion. Notice this is just the statement that a proton's thermal energy is comparable to its gravitational binding energy in the star — a recurring theme.

### The virial theorem

For any self-gravitating system in equilibrium bound by an inverse-square force, the **virial theorem** relates the time-averaged kinetic and potential energies:

$$
2\langle K\rangle+\langle U\rangle=0.
$$

For a star, $$U=-\alpha\,GM^2/R$$ (with $$\alpha$$ an order-unity constant depending on the density profile; $$\alpha=3/5$$ for a uniform sphere) and $$K$$ is the thermal energy of the gas. The consequences are profound:

- The total energy is $$E=K+U=\tfrac12 U<0$$ — the star is bound.
- The thermal energy is $$K=-\tfrac12 U>0$$.

The startling corollary: a star has a **negative heat capacity**. If it radiates energy away ($$E$$ decreases, becomes more negative), then $$U$$ decreases, the star *contracts*, and $$K$$ — hence the temperature — *increases*. Losing energy makes a star hotter. This instability drives a contracting gas cloud to heat up until fusion ignites, and it governs the runaway phases of stellar evolution.

### The Kelvin–Helmholtz timescale

Before fusion was understood, Kelvin and Helmholtz asked: how long could the Sun shine on gravitational contraction alone? If its luminosity is supplied by releasing gravitational potential energy, the characteristic time is

$$
t_{\text{KH}}\sim\frac{|U|}{L}\sim\frac{GM^2}{R\,L}.
$$

For the Sun this gives $$\sim 3\times10^{7}$$ years. Geology and biology demanded a far older Sun, and this discrepancy was a genuine 19th-century crisis — resolved only when nuclear fusion was identified as the real, vastly larger energy reservoir.

### Nuclear timescale and the energy source

Fusion of hydrogen into helium converts a fraction $$\epsilon\approx 0.007$$ of the rest-mass energy of the burned hydrogen (via $$E=mc^2$$; the binding-energy details and the Gamow-window tunneling physics are in [Quantum & Nuclear Physics]({{ '/notes/physics/quantnucphys/' | relative_url }})). If a fraction $$f\sim0.1$$ of the star's mass is available as core hydrogen, the **nuclear timescale** is

$$
t_{\text{nuc}}\sim\frac{\epsilon f M c^2}{L}.
$$

For the Sun, $$t_{\text{nuc}}\sim 10^{10}$$ years — a thousand times longer than $$t_{\text{KH}}$$, and consistent with the age of the solar system. This resolved the Kelvin–Helmholtz crisis.

---

## Radiation pressure and the Eddington limit

Inside a hot star, photons carry significant momentum and exert **radiation pressure**. For blackbody radiation,

$$
P_{\text{rad}}=\frac{1}{3}aT^4,\qquad a=\frac{4\sigma}{c}.
$$

In low-mass stars gas pressure dominates; in very massive, hot stars radiation pressure can rival or exceed it. This sets an upper limit on how luminous a star can be while staying bound. The outward radiation force on the surface layers (via electron scattering, opacity $$\kappa$$) must not exceed gravity:

$$
\boxed{\ L_{\text{Edd}}=\frac{4\pi G M c}{\kappa}\ }.
$$

Above this **Eddington luminosity**, radiation blows the outer layers off. It caps the masses and luminosities of stars and regulates accretion onto compact objects.

### Mass–luminosity relation

Combining hydrostatic equilibrium, the ideal-gas law, and radiative energy transport (a derivation beyond F=ma/USAPhO scope, but the scaling is testable) yields an approximate **mass–luminosity relation** for main-sequence stars:

$$
L\propto M^{\alpha},\qquad \alpha\approx 3\text{–}4.
$$

A star ten times the Sun's mass is thousands of times more luminous. Combined with $$t_{\text{nuc}}\propto M/L$$, this means massive stars are spendthrifts:

$$
t_{\text{MS}}\propto\frac{M}{L}\propto M^{1-\alpha}\sim M^{-2.5}.
$$

The most massive stars live only a few million years, while low-mass red dwarfs will outlast the present age of the universe many times over.

---

## Star formation: the Jeans criterion

A cloud of gas collapses under its own gravity only if gravity beats the supporting thermal pressure. Comparing the gravitational potential energy $$\sim GM^2/R$$ to the thermal energy $$\sim N k_B T$$ of the cloud (a virial-type argument) gives a threshold mass — the **Jeans mass** — above which collapse runs away:

$$
M_J\sim\left(\frac{k_B T}{G\mu m_H}\right)^{3/2}\rho^{-1/2}.
$$

Cold, dense clouds have small Jeans masses and fragment readily into many stars; warm diffuse gas resists collapse. Equivalently, there is a **Jeans length** $$\lambda_J$$ — the wavelength above which a density perturbation grows rather than oscillating as a sound wave. This is the seed of both star and (on far larger scales) galaxy formation.

<div class="theorem-box" markdown="1">

**Where the Jeans criterion comes from.** Set the magnitude of gravitational PE equal to thermal KE for a uniform sphere of $$N$$ particles, mass $$M=N\mu m_H$$, radius $$R$$:

$$
\frac{GM^2}{R}\sim N k_B T .
$$

Substitute $$R\sim (M/\rho)^{1/3}$$ and solve for the mass at which the two balance; collapse wins when $$M>M_J$$. The $$\rho^{-1/2}$$ dependence is the key qualitative result: as a collapsing fragment gets denser, its Jeans mass *drops*, so it keeps fragmenting into smaller pieces — which is why stars form in clusters rather than as single giant objects.

</div>

---

## Stellar endpoints

When a star exhausts its nuclear fuel, pressure support fails and the core collapses until something new halts it. What stops the collapse — and therefore the final state — depends almost entirely on the remaining mass.

### Degeneracy pressure

At extreme densities, the **Pauli exclusion principle** forces electrons into ever-higher momentum states even at $$T\to 0$$, producing a pressure that does not depend on temperature: **electron degeneracy pressure**. A quick estimate uses the uncertainty principle. Packing electrons to number density $$n$$ confines each to $$\Delta x\sim n^{-1/3}$$, so $$p\sim\hbar n^{1/3}$$, and the pressure $$P\sim n\cdot p\cdot v$$ scales (non-relativistically, $$v=p/m_e$$) as

$$
P_{\text{deg}}\sim\frac{\hbar^2}{m_e}n^{5/3}.
$$

Because it is independent of $$T$$, degeneracy pressure can support a cooling, dead star indefinitely. This is what holds up a **white dwarf** — the exposed core left behind by a low-mass star like the Sun.

### The Chandrasekhar mass

Degeneracy pressure has a limit. As a white dwarf gains mass it shrinks, the electrons are squeezed denser and become **relativistic** ($$v\to c$$), which softens the pressure law to $$P\propto n^{4/3}$$. A relativistic degenerate gas scales with mass and radius in exactly the same way as self-gravity, so for masses above a critical value no equilibrium exists — gravity always wins:

$$
M_{\text{Ch}}\approx 1.4\,M_\odot.
$$

A white dwarf above the **Chandrasekhar mass** cannot exist. Beyond it the core collapses further, crushing electrons and protons into neutrons; **neutron degeneracy pressure** then supports a **neutron star** (with its own, higher mass limit). Above that limit, nothing known halts collapse and a **black hole** forms.

<div class="theorem-box" markdown="1">

**Why a maximum mass exists (scaling argument).** For a relativistic degenerate gas, $$P\propto n^{4/3}\propto (M/R^3)^{4/3}$$. The central pressure needed for hydrostatic support scales as $$P_c\propto GM^2/R^4$$. Setting the available degeneracy pressure $$\propto M^{4/3}/R^4$$ equal to the required $$\propto M^2/R^4$$, the radius $$R$$ *cancels entirely* — leaving a single special mass. Below it degeneracy can always win at small enough $$R$$; above it it never can. That mass is $$M_{\text{Ch}}$$, and it depends only on fundamental constants: $$M_{\text{Ch}}\sim\left(\frac{\hbar c}{G}\right)^{3/2}\frac{1}{(\mu_e m_H)^2}$$.

</div>

### Black holes and the Schwarzschild radius

For a sufficiently compact mass, escape velocity reaches $$c$$. Setting $$v_{\text{esc}}=\sqrt{2GM/r}=c$$ gives the **Schwarzschild radius**

$$
r_s=\frac{2GM}{c^2}
$$

— remarkably, the exact general-relativistic answer, even though this Newtonian "escape velocity" derivation is only heuristic. Within $$r_s$$ nothing escapes. The full treatment belongs to the [Relativity]({{ '/notes/physics/relativity/' | relative_url }}) notes.

---

## Binary stars and stellar masses

Mass is the single most important property of a star, yet $$L=4\pi R^2\sigma T^4$$ and the spectrum never give it directly. The one reliable way to *weigh* a star is to watch something orbit it and apply gravitation — see the orbital-mechanics treatment in the [Advanced Mechanics]({{ '/notes/physics/advmech/' | relative_url }}) notes.

For two stars of masses $$M_1,M_2$$ orbiting their common center of mass with period $$P$$ and total separation $$a$$, **Kepler's third law** in its full Newtonian form reads

$$
\boxed{\ P^2=\frac{4\pi^2 a^3}{G(M_1+M_2)}\ }.
$$

Measuring $$P$$ and $$a$$ gives the *total* mass. The individual masses follow from the center-of-mass condition $$M_1 a_1=M_2 a_2$$ — the more massive star traces the smaller orbit. In a **spectroscopic binary**, the Doppler shifts of the two stars' spectral lines give the velocity ratio, hence the mass ratio, closing the system. This is essentially the only direct stellar mass measurement we have, and it is what calibrates the mass–luminosity relation above.

> **[Image placeholder — binary orbit]** Two stars on elliptical orbits about a shared center of mass, with $$a_1$$ and $$a_2$$ labeled and $$M_1 a_1 = M_2 a_2$$ indicated; optionally an inset of the two sinusoidal radial-velocity curves, antiphase, with amplitudes in the inverse mass ratio.

---

## Problem-solving strategy

Stellar problems reward a small set of reusable moves:

1. **Photometry questions** (temperature, size, distance, brightness): reach for $$L=4\pi R^2\sigma T^4$$, $$F=L/4\pi d^2$$, Wien's law, and the magnitude/distance-modulus relations. Watch the backwards, logarithmic magnitude scale.
2. **Distance questions:** parallax for nearby stars ($$d[\text{pc}]=1/p['']$$); standard candles (known $$M$$) plus the distance modulus for far ones.
3. **Interior/structure questions:** start from hydrostatic equilibrium and *estimate* with $$P_c\sim GM^2/R^4$$; bring in the ideal-gas law for $$T_c$$ and the virial theorem for energetics.
4. **Timescale questions:** $$t_{\text{KH}}\sim GM^2/RL$$ (gravitational) versus $$t_{\text{nuc}}\sim\epsilon f Mc^2/L$$ (nuclear); compare them.
5. **Limits and endpoints:** Eddington luminosity caps brightness; Chandrasekhar mass caps white dwarfs; degeneracy-pressure scaling arguments explain the endpoints.
6. **Mass measurement:** binary stars + Kepler's third law are the only direct route.

Common pitfalls:

- Mixing up the magnitude scale's direction (smaller = brighter) or forgetting the factor of $$2.5$$ vs. $$5$$ in Pogson's relation.
- Confusing flux (measured) with luminosity (intrinsic) — always ask whether the distance has entered.
- Applying Kepler's third law in its Earth-Sun "$$P^2=a^3$$" form to a binary where neither mass is negligible; you need the full $$G(M_1+M_2)$$ version.
- Treating degeneracy pressure as temperature-dependent — its independence from $$T$$ is the whole point.
- Forgetting that the virial theorem gives a *negative* heat capacity: losing energy heats a star up.
