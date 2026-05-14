---
layout: default
title: "Unit 1: Atomic Structure and Properties"
parent: AP Chemistry
nav_order: 1
permalink: /notes/ap/chem/atomicstrucprop/
---

# Unit 1: Atomic Structure and Properties

Unit 1 establishes the vocabulary and models used everywhere else in chemistry: how we count and report measurements, how the **periodic table** organizes the elements, how **electrons** occupy **orbitals**, and how atomic-scale structure shows up in macroscopic trends. It also sets up basic definition and rules that you will use for the rest of chemistry.

---

## Significant figures

**Significant figures** are the digits in a measurement that carry meaning—every digit we are entitled to report given how well we know the quantity. They matter whenever you round a calculated result so it does not pretend to be more precise than the data that produced it. On the AP exam they appear mainly in lab-style questions; in research they are non-negotiable.

- Nonzero digits are always significant.
- **Leading zeros** (as in $$0.0045$$) are not significant; they only locate the decimal point. **Captive zeros** between nonzero digits are significant (e.g. $$1.05$$ has three significant figures).
- **Trailing zeros** require care: if a decimal point is shown, trailing zeros are significant ($$12.0$$ has three); if there is no decimal, trailing zeros do not ocunt towards significant figures.
- **Exact numbers** (such as a counted dozen eggs or a defined conversion within a system) have effectively unlimited significant figures and do not limit your result.
- For addition and subtraction, round the result to the same number of *decimal places* as the term with the fewest. For multiplication and division, round to the same number of *significant figures* as the factor with the fewest.

---

## Matter and its classification

**Matter** is anything that has mass and occupies volume. Chemists classify it first by composition.

- **Elements** are made of one kind of atom
- **Compounds** contain two or more elements combined in definite proportion.
- A **pure substance** has fixed composition, meaning only one type of substance makes it up.
- A **mixture** combines substances without fixed proportion. A **homogeneous mixture** (solution) are uniform on a macroscopic scale, meaning you cannot tell the difference between molecules jsut by looking at it, while a **heterogeneous mixture** does not have this property.

<img class="note-img note-img--w480" src="{{ '/assets/APs/AP%20Chem/atomicstrucprop/Matter%20Chart.png' | relative_url }}" alt="Matter Chart" loading="lazy" decoding="async" />

---

## Reading the periodic table

The **periodic table** arranges elements by increasing **atomic number** $$Z$$. Horizontal rows are **periods**; vertical columns are **groups** (or families). Groups may be labeled $$1$$–$$18$$ or with Roman numerals and letters in older notation. Several families have traditional names that appear frequency:

- **Alkali metals** (group 1, excluding hydrogen)  
- **Alkaline earth metals** (group 2)  
- **Transition metals** (groups 3–12)  
- **Pnictogens** (group 15)  
- **Chalcogens** (group 16)  
- **Halogens** (group 17)  
- **Noble gases** (group 18)  

Below the main block, the **lanthanides** and **actinides** are the **inner transition metals** (often called **rare-earth metals** in informal usage for the lanthanides).

For any entry, the atomic number $$Z$$ is the number of **protons** in the nucleus and defines the element. The **mass number** $$A$$ counts protons plus **neutrons** in a given **isotope**:

$$
A = Z + N
$$

where $$N$$ is the neutron count. Isotopes of the same element share $$Z$$ but differ in $$A$$ (and therefore in $$N$$).

---

## Ions

An **ion** is an atom or group of atoms with a net electric charge from gain or loss of electrons. A **cation** is positive (fewer electrons than protons); an **anion** is negative (more electrons than protons). A good way to remember this is that cats are always positive so CATions are positively charged! **Metals** tend to form cations and **nonmetals** tend to form anions. In addition, many **transition metals** exhibit variable charge in compounds because several oxidation states are comparably stable (mentioned later in more detail) due to the availability of their $$d$$ orbital (mentioned later as well).

### Polyatomic ions

**Polyatomic ions** are charged covalent units that behave as a single piece in **ionic compounds** due to their lower eneergy state compared to their individual atomic states: for example, nitrate ($$\text{NO}_3^-$$), sulfate ($$\text{SO}_4^{2-}$$), and ammonium ($$\text{NH}_4^+$$) are all good exmamples of polyatomic ions. These are the polyatomic ions you need to memorize for AP Chem:

<img class="note-img note-img--w480" src="{{ '/assets/APs/AP%20Chem/atomicstrucprop/polyions.png' | relative_url }}" alt="Polyatomic Ions" loading="lazy" decoding="async" />

---

## Avogadro’s number, the mole, and molar mass

- The **mole** is the chemist’s unit of counting: one mole contains **Avogadro’s number** (sometimes denoted as $$N_A$$) of specified entities (atoms, molecules, ions, formula units, etc.):

$$
1 \text{ mol} = 6.022 \times 10^{23} \text{ entities}
$$

If you are ever confused by moles and molar conversions, just replace "moles" with "dozens" and think about it that way.

The **molar mass** of an element is the mass of one mole of its atoms, numerically equal (in $$\text{g/mol}$$) to the **average atomic mass** listed on the periodic table. For a **compound**, add the molar masses of all atoms in the formula to obtain the compound’s molar mass.

Lastly, the **mass percent** of an element in a compound compares the mass of that element in one mole of compound to the molar mass of the whole:

$$
\% \text{ element} = \frac{\text{mass of element in } 1 \text{ mol of compound}}{\text{molar mass of compound}} \times 100\%
$$

---

## Empirical and molecular formulas

The **molecular formula** gives the *actual numbers* of atoms of each element in one molecule of a molecular compound (or one formula unit of an ionic solid, where “molecule” is not literal). The **empirical formula** gives the *smallest whole-number ratio* of atoms in that substance. Ionic compounds are usually reported by their empirical formula anyway (e.g. $$\text{NaCl}$$, $$\text{CaF}_2$$) because the crystal is an extended lattice, not discrete $$\text{NaCl}$$ molecules.

For a molecular substance, the molecular formula is a *whole-number multiple* of the empirical formula:

$$
\text{molecular formula} = (\text{empirical formula})_n, \qquad n = 1,\,2,\,3,\,\ldots
$$

The **empirical formula mass** is the molar mass of the empirical formula as written. If you know the molar mass of the compound (from experiment, such as mass spectrometry, or from the problem), then

$$
n = \frac{M_{\text{compound}}}{M_{\text{empirical}}},
$$

and you round $$n$$ to the nearest integer when the data allows it (subject to measurement uncertainty).

### From mass percent to the empirical formula

When a problem gives **mass percentages** (or masses of elements in a sample), treat the sample as a sample of *$$100\ \text{g}$$* so each element’s mass in grams equals its *percent* numerically.

1. Convert each element’s mass to moles using its molar mass.  

2. Divide *every* mole amount by the *smallest* mole amount among the elements.

3. If ratios are not whole numbers within reasonable rounding, multiply all subscripts by a small integer ($$2$$, $$3$$, $$\ldots$$) to clear fractions (e.g. $$1 : 1 : 1.33$$ $$\rightarrow$$ multiply by $$3$$). If you see a ratio that is very hard to convert to integers, you likely did something wrong.

That yields the empirical formula. **Combustion analysis** problems follow the same logic: measured masses of $$\text{CO}_2$$ and $$\text{H}_2\text{O}$$ produced fix the carbon and hydrogen in the original sample; any oxygen is often obtained by difference from the original sample mass if the compound contains only C, H, and O.

---

## Mass spectrometry

**Mass spectrometry** separates ions by *mass-to-charge ratio* $$\frac{m}{z}$$. A typical spectrum plots *relative abundance* (or detector *intensity*) on the vertical axis against $$\frac{m}{z}$$ on the horizontal axis. For an element, the pattern of peaks reveals isotope masses and their approximate natural abundances; for molecules, *fragmentation* patterns can support structure assignment in advanced work. An example of a mass spectrometer chart is shown below:

<img class="note-img note-img--w480" src="{{ '/assets/APs/AP%20Chem/atomicstrucprop/Mass%20Spectrometry.png' | relative_url }}" alt="Mass spectrometry chart" loading="lazy" decoding="async" />

---

## Percent yield, percent error, and efficiency

In laboratory work, **theoretical yield** is the amount of product predicted from stoichiometry assuming complete conversion. **Actual yield** is what you isolate. **Percent yield** measures how much of the theoretical amount you obtained:

$$
\% \text{ yield} = \frac{\text{actual yield}}{\text{theoretical yield}} \times 100\%
$$

**Percent error** compares a measured value to an accepted or theoretical value:

$$
\% \text{ error} = \left| \frac{\text{actual} - \text{theoretical}}{\text{theoretical}} \right| \times 100\%
$$

**Efficiency** in an energy context is the fraction of input energy that appears as useful output:

$$
\text{efficiency} = \frac{\text{useful energy output}}{\text{energy input}} \times 100\%
$$

Do not confuse percent yield (a mass or mole recovery for a reaction) with thermodynamic efficiency (an energy ratio). Use percent error when judging how far a measurement sits from a reference value.

---

## Molarity

**Molarity** ($$M$$) expresses concentration as moles of solute per liter of solution:

$$
M = \frac{\text{moles of solute}}{\text{liters of solution}} = \frac{\text{mol}}{L}
$$

Because volume changes with temperature, molarity is *temperature-dependent*. It depends on the amount of solute per volume of solution, not on the total mass of the solution by itself.

---

## Oxidation numbers

An **oxidation number** (oxidation state) is a formal bookkeeping charge assigned to an atom in a compound or ion, as if electrons in every bond belonged entirely to the more **electronegative** partner. It tracks how electron density shifts relative to the element in its standard state.

Useful conventions include:

- Any **element** in its elemental form (e.g. $$\text{O}_2$$, $$\text{Na}$$) has oxidation number $$0$$.  
- A **monatomic ion** matches its charge (e.g. $$\text{Na}^+$$ is $$+1$$).  
- **Oxygen** is usually $$-2$$ except in **peroxides** such as $$\text{H}_2\text{O}_2$$ ($$-1$$ for O) and in compounds with fluorine.  
- **Hydrogen** is usually $$+1$$ except in **metal hydrides** (e.g. $$\text{NaH}$$), where it is $$-1$$.  
- **Fluorine** is $$-1$$ in all compounds. Other **halogens** are $$-1$$ unless bonded to a more electronegative element (such as oxygen).  

When atoms tie, use structure or further rules; the guiding idea is that more electronegative atoms receive the negative assignment in a bond.

---

## Electron configuration and quantum numbers

Each electron in an atom is described by four **quantum numbers** that arise from the *wave-mechanical* model.

The **principal quantum number** $$n$$ is a positive integer ($$n = 1, 2, 3, \ldots$$). It sets the shell and is the main contributor to orbital energy for hydrogen-like atoms.

The **azimuthal** (or **angular momentum**) quantum number $$l$$ runs from $$0$$ to $$n - 1$$ and labels subshell shape:

- $$l = 0$$ → **s** orbital  
- $$l = 1$$ → **p** orbital  
- $$l = 2$$ → **d** orbital  
- $$l = 3$$ → **f** orbital  

The **magnetic quantum number** $$m_l$$ takes integer values from $$-l$$ to $$+l$$ and distinguishes **orientations** of a subshell in space.

The **spin quantum number** $$m_s$$ is $$+\frac{1}{2}$$ or $$-\frac{1}{2}$$ for the two **spin** states of a single electron.

The **Pauli exclusion principle** states that no two electrons in the same atom may share the same set of four quantum numbers, so at most two electrons occupy any one atomic orbital, and they must have *opposite spin*.

The **Aufbau principle** directs you to fill orbitals in order of increasing energy. The familiar $$n s$$, $$(n-1) d$$, $$(n-2) f$$ crossing is why the periodic table has its shape. Exceptions (e.g. chromium $$\text{Cr}$$, copper $$\text{Cu}$$, and several heavier transition metals) reflect especially stable $$d^5$$ or $$d^{10}$$ arrangements; those same stability patterns contribute to variable metal oxidation states in compounds.

**Hund’s rule** favors placing electrons singly in degenerate orbitals of a subshell before pairing, with *parallel spins* where possible, to reduce *electron–electron repulsion*.

**Heisenberg’s uncertainty principle** limits how sharply *position* and *momentum* can be known simultaneously for a quantum particle—a conceptual foundation for why we speak in terms of orbitals (probability distributions) rather than classical orbits.

**Abbreviated configurations** use the previous noble gas core in brackets, e.g.

$$
\text{Cs}:\; [\text{Xe}]\, 6s^1
$$

Two species are **isoelectronic** if they have the same electron configuration (e.g. $$\text{Br}^-$$ and $$\text{Se}^{2-}$$). Among isoelectronic ions, **ionic radius** decreases as **nuclear charge** increases because the same electron count is pulled closer by more protons (e.g. $$\text{Na}^+$$ is smaller than $$\text{F}^-$$).

---

## Energy, light, and quantization

**Bohr’s model** correctly emphasized that an electron in an atom can occupy only certain allowed energies (**quantization**), but the picture of electrons in circular orbits is obsolete; quantum mechanics replaces orbits with orbitals.

For **electromagnetic radiation** (for AP Chemistry this is just light), **wavelength** $$\lambda$$ and **frequency** $$\nu$$ (or $$f$$) are related by

$$
c = \nu \lambda,
$$

where $$c \approx 3.00 \times 10^8 \text{ m/s}$$ is the **speed of light** in vacuum. **Frequency** is measured in **hertz** ($$\text{Hz}$$, or $$\text{s}^{-1}$$).

For the hydrogen atom, the energy of level $$n$$ is often written

$$
E_n = -2.178 \times 10^{-18} \frac{1}{n^2} \text{ J},
$$

with $$n$$ the *principal quantum number*. Spectroscopy probes **transitions** $$\Delta E$$ between levels and **emission** lines appear when an electron falls to a lower level and releases a photon (light particle).

**Planck** related photon energy to frequency:

$$
E = h\nu = \frac{hc}{\lambda},
$$

with **Planck’s constant** $$h \approx 6.626 \times 10^{-34} \text{ J}\cdot\text{s}$$. That relation explains **atomic spectra** and **line colors** in **flame tests** and discharge tubes: each transition corresponds to a specific $$\Delta E$$ and therefore a characteristic photon energy.

**de Broglie** associated a wavelength with any particle of momentum $$p$$:

$$
\lambda = \frac{h}{p} = \frac{h}{mv}
$$

for nonrelativistic speeds, linking particle and wave descriptions (wave-particle duality) at the quantum scale.

---

## Photoelectric effect and photoelectron spectroscopy

In the **photoelectric effect**, photons eject electrons from a metal surface only when the photon energy exceeds a threshold set by the material’s **work function** $$\Phi$$. Increasing frequency increases the maximum kinetic energy of emitted electrons according to

$$
K_{\max} = h\nu - \Phi,
$$ 

but for all purposes, memorizing this equation is not necessary for the AP Chemistry exam. Increasing *intensity* at fixed frequency increases the number of ejected electrons, not their maximum *kinetic energy*.

**Photoelectron spectroscopy** (**PES**) measures how much energy must be supplied to remove electrons from subshells in atoms or molecules. Peaks appear at **binding energies** characteristic of each orbital type; **relative peak areas** (after accounting for ionization cross sections) reflect electron counts in those subshells. An example problem is shown below, feel free to try it out (Answer on the bottom of the notes page)!

<img class="note-img note-img--w480" src="{{ '/assets/APs/AP%20Chem/atomicstrucprop/PES.png' | relative_url }}" alt="PES chart" loading="lazy" decoding="async" />

---

## Electromagnetic spectrum

The **electromagnetic spectrum** orders all **electromagnetic radiation** by **photon energy** (equivalently frequency or wavelength). **Visible light** spans roughly

$$
380\text{ nm} \text{ to } 760\text{ nm},
$$

a narrow window between **ultraviolet** and **infrared**. Moving toward shorter wavelength corresponds to higher photon energy (**gamma rays** and **X-rays** at the extreme) and longer wavelength to lower energy (**microwave**, **radio**). 

<img class="note-img note-img--w480" src="{{ '/assets/APs/AP%20Chem/atomicstrucprop/em.jpg' | relative_url }}" alt="EM Spectrum" loading="lazy" decoding="async" />

---

## Orbitals, nodes, shielding, and penetration

An **atomic orbital** is a three-dimensional region where the probability of finding an electron exceeds some threshold. The total number of **nodes** for a hydrogen-like orbital is $$n - 1$$, split between **radial** and **angular** contributions according to $$n$$ and $$l$$.

For a given $$n$$ in many-electron atoms, subshell energies usually follow

$$
E_{ns} < E_{np} < E_{nd} < E_{nf},
$$

because **s** orbitals *penetrate* closer to the nucleus and experience less **shielding** from inner electrons than **p**, **d**, or **f** orbitals at comparable $$n$$.

**Shielding** (screening) means inner and same-shell electrons reduce the **full nuclear charge** $$Z$$ felt by an electron of interest. More effective shielding lowers **effective nuclear charge** and stabilizes outer electrons less. Penetration explains why an $$ns$$ electron can be more tightly bound than an $$(n-1)d$$ electron despite the larger $$n$$ in the label—leading to the *aufbau* order you use when writing configurations.

---

## Effective nuclear charge

**Effective nuclear charge** $$Z_{\text{eff}}$$ is the net positive charge experienced by an electron in a many-electron atom after shielding. A simple textbook form is

$$
Z_{\text{eff}} = Z - S,
$$

where $$S$$ is a **shielding constant** summarizing electron–electron repulsion. **Slater’s rules** and more advanced models give numerical estimates; qualitatively, $$S$$ grows as you add *inner shells*, so going *down a group* increases shielding even though $$Z$$ increases.

Penetration order among subshell types at comparable $$n$$ is often summarized as

$$
s > p > d > f,
$$

meaning **s** electrons “see” more of the nucleus and are stabilized relative to **p**, **d**, and **f** in the same shell.

---

## Periodic trends

**Ionization energy** is the energy required to remove an electron from a gaseous atom or ion (first, second, … ionization energies for successive removals). **Electron affinity** is the energy change when an electron is added; *more exothermic* addition corresponds to a *more favorable* affinity in the usual sign convention used in textbooks (check your table’s sign choice).

**Atomic radius** gauges the size of the **electron cloud** (often defined by metallic or covalent radii in different contexts). **Metallic character** is the tendency to lose electrons and behave as a metal (cations); **nonmetallic character** is the tendency to gain or share electrons with nonmetals (anions).

Broad patterns: **atomic radius** increases *down a group* (new shells, more shielding) and decreases *across a period* (rising $$Z_{\text{eff}}$$). **Ionization energy** and **electron affinity** (for representative elements) generally show opposite **horizontal** trends to radius. **Metallic character** decreases across a period and increases down a group. Exceptions, such as the **ionization energy** dip at boron or the **electron affinity** anomaly for nitrogen, appear when subshell structure or pairing changes the cost of removing or adding an electron.

<img class="note-img note-img--w480" src="{{ '/assets/APs/AP%20Chem/atomicstrucprop/periodictrends.png' | relative_url }}" alt="Periodic Trends" loading="lazy" decoding="async" />

---

## Electrostatics and Coulomb’s law

**Electrostatics** describes forces and **potential energies** between charges at rest. The **Coulomb force** between two point charges is

$$
F = k \frac{Q_1 Q_2}{r^2},
$$

where $$r$$ is their separation, $$Q_1$$ and $$Q_2$$ carry signs, and $$k \approx 8.99 \times 10^9 \,\text{N}\cdot\text{m}^2/\text{C}^2$$. Like charges repel; opposite charges attract.

The **electric potential energy** of the pair is

$$
U = k \frac{Q_1 Q_2}{r}.
$$

These expressions reappear when you interpret **lattice energy**, **bond** formation, and **ionic** attraction in [Unit 2]({{ '/notes/ap/chem/compounds/' | relative_url }}): same inverse dependence on distance, same sensitivity to charge magnitude.
