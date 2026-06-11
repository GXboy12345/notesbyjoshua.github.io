---
layout: default
title: Optics
parent: USAPhO Prep
nav_order: 8
permalink: /notes/physics/optics/
---

# Optics

**TODO: REARRANGE AND ADD EXAMPLES/MORE PROOFS!**
**ALSO ADD MORE STUFF**

---

## Introduction to optics

Light is an electromagnetic wave with wavelength $$\lambda \sim 400\text{–}700\text{ nm}$$ in the visible range. This notes pages will separate optics into two parts: geometric optics and wave optics. Whether to treat it as rays or as waves depends on the size $$d$$ of the features it interacts with:

- $$\lambda \ll d$$: diffraction is negligible, light goes in straight rays — use **geometric optics** (mirrors, lenses, shadows).
- $$\lambda \sim d$$: bending and interference matter — use **wave optics** (slits, gratings, thin films).

## Reflection

At a smooth surface, the **law of reflection** states that the angle of incidence equals the angle of reflection, both measured from the normal, and the incident ray, reflected ray, and normal are coplanar:

$$
\theta_i = \theta_r.
$$

A **plane mirror** forms a virtual, upright image the same size as the object, located as far behind the mirror as the object is in front. The image is reversed front-to-back (which is why text appears mirror-flipped). Think of it like staring into your standard bathroom mirror.

## Refraction and Snell's law

The **index of refraction** of a medium is

$$
n = \frac{c}{v},
$$

the ratio of the speed of light in vacuum to its speed in the medium ($$n \ge 1$$). Crossing a boundary, the ray bends according to **Snell's law**:

$$
n_1\sin\theta_1 = n_2\sin\theta_2.
$$

Going into a denser medium (larger $$n$$), the ray bends *toward* the normal. Across the boundary the **frequency stays fixed** (it is set by the source), so the wavelength must change:

$$
\lambda_{\text{medium}} = \frac{\lambda_0}{n}.
$$

## Total internal reflection

When light travels from a denser to a less dense medium ($$n_1 > n_2$$), Snell's law has no solution once $$\theta_2$$ would exceed $$90^\circ$$. Beyond the **critical angle**

$$
\sin\theta_c = \frac{n_2}{n_1},
$$

all the light is reflected back — **total internal reflection**. This is how optical fibers trap light and why a diamond ($$n\approx 2.4$$, so $$\theta_c \approx 24^\circ$$) sparkles.

## Fermat's principle

The deeper reason behind the laws of reflection and refraction is **Fermat's principle**: light travels between two points along the path that takes a **stationary** (usually minimum) time. This is why light sometimes won't take a straight path from one point to another.

<div class="theorem-box" markdown="1">

**Proof (Snell's Law).** Light goes from point $$A$$ in medium $$1$$ to point $$B$$ in medium $$2$$, crossing the boundary at horizontal position $$x$$. If $$A$$ is height $$a$$ above the boundary at horizontal $$0$$, and $$B$$ is depth $$b$$ below at horizontal $$d$$, the travel time is

$$
t(x) = \frac{\sqrt{a^2 + x^2}}{v_1} + \frac{\sqrt{b^2 + (d-x)^2}}{v_2}.
$$

Setting $$dt/dx = 0$$,

$$
\frac{x}{v_1\sqrt{a^2+x^2}} - \frac{d-x}{v_2\sqrt{b^2+(d-x)^2}} = 0.
$$

The two fractions are exactly $$\sin\theta_1/v_1$$ and $$\sin\theta_2/v_2$$, so

$$
\frac{\sin\theta_1}{v_1} = \frac{\sin\theta_2}{v_2}
\quad\Longrightarrow\quad
n_1\sin\theta_1 = n_2\sin\theta_2,
$$

using $$n = c/v$$. The law of reflection follows from the same principle with both points in one medium.

</div>

## Dispersion

The index of refraction actually depends slightly on wavelength, $$n(\lambda)$$, with blue light (short $$\lambda$$) refracting more than red in most glass. This **dispersion** is why a prism spreads white light into a spectrum and why rainbows form (refraction + internal reflection + dispersion in water droplets).

## Gradient-index refraction and mirages

When the index varies *continuously* rather than in a sharp jump, Snell's law still applies across each infinitesimal layer, and the quantity $$n\sin\theta$$ (angle from the vertical) is conserved along the ray. The ray curves smoothly, always **bending toward the region of higher $$n$$** — toward slower light. Applying Snell's law to two nearby heights, a ray climbing through an index gradient turns through an angle $$\approx (1/n)\,(dn/dh)$$ per unit horizontal distance.

This is the physics of **mirages**. In the atmosphere $$n - 1 \propto \rho \propto P/T$$, so a temperature gradient bends light:

- Over hot ground (desert road), the air is hottest at the bottom, so $$n$$ *increases* with height and rays bend upward. You see an inverted image of the sky on the ground — the shimmering "water" of an **inferior mirage**.
- In a thermal inversion (cold air below warm, e.g. over cold water), $$n$$ decreases with height, rays bend down to follow the Earth's curvature, and distant objects appear lifted above the horizon — a **superior mirage**.

If the downward bending is strong enough to match the Earth's curvature, $$dn/dh = -n/R$$, light rays literally orbit at constant height and you can see beyond the geometric horizon.

## Spherical mirrors

A spherical mirror of radius $$R$$ has focal length

$$
f = \frac{R}{2}.
$$

Object and image distances $$d_o, d_i$$ obey the **mirror equation**, and the **magnification** is

$$
\frac{1}{f} = \frac{1}{d_o} + \frac{1}{d_i},
\qquad
m = -\frac{d_i}{d_o}.
$$

**Sign conventions** (real-is-positive):

- $$d_o > 0$$ for a real object in front of the mirror.
- $$d_i > 0$$ for a real image (same side as object, in front); $$d_i < 0$$ for a virtual image (behind).
- $$f > 0$$ for a concave (converging) mirror; $$f < 0$$ for convex (diverging).
- $$m > 0$$ upright, $$m < 0$$ inverted; $$|m| > 1$$ enlarged.

The reason a curved mirror focuses at all comes out cleanly for **conic-section** shapes, which have exact reflection properties:

- An **ellipse** reflects every ray from one focus to the other focus.
- A **parabola** reflects all rays parallel to its axis to a single focus (and vice versa) — the principle behind satellite dishes, headlights, and reflecting telescopes. A parabola is just an ellipse with its second focus sent to infinity, which is why parallel rays (a source at infinity) come to a point.
- A **hyperbola** reflects rays aimed at one focus so they diverge as if from the other.

A spherical mirror only *approximates* a parabola near its axis; rays striking far from the axis miss the focus, an error called **spherical aberration**.

## Thin lenses

A thin lens obeys the same-looking **thin-lens equation** and magnification:

$$
\frac{1}{f} = \frac{1}{d_o} + \frac{1}{d_i},
\qquad
m = -\frac{d_i}{d_o}.
$$

The focal length is set by the surface curvatures and the index through the **lensmaker's equation**:

$$
\frac{1}{f} = (n-1)\left(\frac{1}{R_1} - \frac{1}{R_2}\right),
$$

with $$R$$ positive for a surface that bulges toward the incoming light. Converging (convex) lenses have $$f>0$$; diverging (concave) lenses have $$f<0$$. For lenses the sign convention puts real images on the *opposite* side from the object ($$d_i > 0$$ there).

<div class="theorem-box" markdown="1">

**Example.** An object sits $$30\text{ cm}$$ in front of a converging lens of focal length $$f = 10\text{ cm}$$. Where is the image, and what is its magnification?

From the thin-lens equation,

$$
\frac{1}{d_i} = \frac{1}{f} - \frac{1}{d_o} = \frac{1}{10} - \frac{1}{30} = \frac{2}{30},
\qquad
d_i = 15\text{ cm}.
$$

Since $$d_i > 0$$, the image is **real** and on the far side of the lens. The magnification is

$$
m = -\frac{d_i}{d_o} = -\frac{15}{30} = -0.5,
$$

so the image is **inverted** and **half** the object's size — exactly the behavior of a camera or a projected slide.

</div>

For a system of lenses, work through them one at a time: the image of the first lens becomes the object of the second (a real image on the incoming side of the next lens counts as a positive object distance; an image that would form behind it is a virtual object with negative distance). The total magnification is the product, $$m = m_1 m_2 \cdots$$.

## Huygens' principle

Wave optics rests on **Huygens' principle**: every point on a wavefront acts as a source of secondary spherical wavelets, and the new wavefront is their envelope a moment later. This reproduces straight-line propagation, reflection, and refraction, and — crucially — explains why waves bend (diffract) around edges and through gaps.

<div class="theorem-box" markdown="1">

**Coherence.** Interference fringes only appear if the two combining waves keep a *stable* phase relationship; such waves are called **coherent**. This is hard with ordinary light: even a single-frequency lamp's phase wobbles randomly on nanosecond timescales, and two separate lamps never stay in step, so their interference term averages to zero and you see no fringes. The 19th-century fix was to illuminate the experiment through a tiny pinhole, so that the light reaching both slits originates from the same point and is automatically in phase with itself — good enough that even sunlight works. Lasers make this trivial today, since they emit highly coherent light. For the idealized problems below we assume perfect coherence, but in any real setup it is the first thing to check.

</div>

## Interference: Young's double slit

Two coherent sources (or one wavefront split by two slits a distance $$d$$ apart) produce alternating bright and dark fringes on a distant screen. For a screen far away, the path difference to a point at angle $$\theta$$ is $$d\sin\theta$$, giving

$$
d\sin\theta = m\lambda \;\;(\text{bright}),
\qquad
d\sin\theta = (m+\tfrac12)\lambda \;\;(\text{dark}),
$$

for integer $$m$$. For small angles on a screen a distance $$L$$ away, the fringes are evenly spaced by

$$
\Delta y = \frac{\lambda L}{d}.
$$

<div class="theorem-box" markdown="1">

**Example.** Light of wavelength $$\lambda = 600\text{ nm}$$ falls on two slits $$d = 0.20\text{ mm}$$ apart, and the pattern is viewed on a screen $$L = 1.5\text{ m}$$ away. How far apart are adjacent bright fringes?

**Solution.** The fringe spacing is

$$
\Delta y = \frac{\lambda L}{d} = \frac{(600\times 10^{-9})(1.5)}{0.20\times 10^{-3}} = 4.5\times 10^{-3}\text{ m} = 4.5\text{ mm}.
$$

Measuring this spacing is a standard way to determine an unknown wavelength.

</div>

When mirrors or lenses are in the way, computing path-length differences directly is a nightmare. The shortcut is that **any image — real or virtual — can be treated as its own coherent point source**, so you measure path differences starting from the images rather than tracing all the way back to the original object. (For a real image this follows from Fermat's principle: every ray from object to image takes the same time, so they all arrive in phase and leave the image in phase.) Setups like **Lloyd's mirror** or two slightly tilted mirrors reduce to an ordinary double slit whose two "slits" are the image sources — even though there is only one real light source. A useful caution: reflection adds a phase of $$\pi$$, though it often cancels out when both images reflect the same way.

## Thin films

Light reflecting off the top and bottom of a thin film of thickness $$t$$ and index $$n$$ interferes. Two subtleties decide the condition:

1. The path difference inside the film is $$2nt$$ (using the wavelength in the film).
2. A reflection off a **higher-index** medium flips the phase by $$\pi$$ (half a wavelength); off a lower-index medium it does not.

For a film with a higher index than its surroundings on both sides (e.g. a soap film in air), only the top reflection flips, giving a net half-wavelength shift, so

$$
2nt = (m+\tfrac12)\lambda \;\;(\text{constructive}),
\qquad
2nt = m\lambda \;\;(\text{destructive}).
$$

If instead there is a phase flip at *both* surfaces (or neither), the conditions swap. Always count the $$\pi$$-shifts first — this is the most common place to go wrong. Anti-reflection coatings exploit the destructive case.

<div class="theorem-box" markdown="1">

**Example (Newton's rings).** A plano-convex lens of radius of curvature $$R$$ rests on a flat glass plate, leaving a thin air wedge between them. Illuminated from above with wavelength $$\lambda$$, it shows concentric bright and dark rings. Find the radii of the dark rings.

At radius $$r$$ from the contact point, the gap thickness $$t$$ satisfies $$r^2 = R^2 - (R-t)^2 \approx 2Rt$$ for $$t \ll R$$, so $$t \approx r^2/2R$$. The two interfering reflections are off the bottom of the lens (glass→air, no flip) and off the top of the plate (air→glass, $$\pi$$ flip). The net half-wavelength shift makes the **center dark** (where $$t\to 0$$), and dark rings occur when the round-trip path $$2t$$ is a whole number of wavelengths:

$$
2t = m\lambda
\quad\Longrightarrow\quad
r_m = \sqrt{m\lambda R}, \qquad m = 0,1,2,\dots
$$

The rings crowd together as $$r$$ grows (since $$r_m \propto \sqrt{m}$$), and measuring them is a classic way to find a wavelength or test how truly flat a surface is.

</div>

## Diffraction

A wave passing through a single slit of width $$a$$ spreads out, producing a broad central maximum flanked by weaker side maxima. The **minima** occur at

$$
a\sin\theta = m\lambda,
\qquad m = 1, 2, 3, \dots
$$

(note: this is the condition for *dark* fringes, the opposite of the double-slit bright condition). The central maximum is twice as wide as the others, with angular half-width $$\sin\theta \approx \lambda/a$$ — narrower slits diffract more.

A **diffraction grating** with $$N$$ closely spaced slits of separation $$d$$ produces very sharp bright lines (**principal maxima**) wherever

$$
d\sin\theta = m\lambda.
$$

Summing the $$N$$ equally spaced, equal-phase-step contributions as a geometric series gives the intensity

$$
I(\theta) \propto \frac{\sin^2\!\big(N\,\tfrac{k\Delta r}{2}\big)}{\sin^2\!\big(\tfrac{k\Delta r}{2}\big)},
\qquad \Delta r = d\sin\theta,
$$

a set of tall, sharp **principal maxima** (where all slits are in phase, $$d\sin\theta = m\lambda$$) separated by $$N-2$$ faint secondary maxima. More slits make the principal maxima sharper and brighter, which is why gratings outperform double slits for measuring wavelengths and separating spectral lines.

The quality of a grating as a spectrometer is its **resolving power** — the ratio $$R = \lambda/\Delta\lambda$$ of a wavelength to the smallest wavelength difference it can split apart. Taking two lines to be just resolved when the maximum of one sits on the first minimum of the other (the Rayleigh criterion again) gives a strikingly simple result:

$$
R = \frac{\lambda}{\Delta\lambda} = Nm,
$$

the number of slits times the diffraction order. To resolve finer spectral detail you either illuminate more lines or work at a higher order.

## Resolution and the Rayleigh criterion

Diffraction sets a fundamental limit on resolving two nearby point sources through an aperture of diameter $$D$$. By the **Rayleigh criterion**, they are just resolvable when the center of one diffraction pattern falls on the first minimum of the other, at angular separation

$$
\theta_{\min} = 1.22\,\frac{\lambda}{D}.
$$

Bigger apertures (telescope mirrors, eye pupils) and shorter wavelengths give finer resolution.

## Babinet's principle

**Babinet's principle** states that an opaque obstacle and an aperture of the *same shape* produce identical diffraction patterns (away from the central beam). The argument is short: the aperture and the obstacle are complementary, so their amplitudes add up to the wave you'd get with no screen at all — a single bright forward spot and darkness elsewhere. At any point that *would* be dark, the two amplitudes must therefore be equal and opposite, hence equal in magnitude, so they give the same intensity.

The practical payoff is that you can analyze diffraction off a small object (a wire, a strand of fiber, a dust speck, a circular disk) by pretending it is a slit or hole of the same size. It is what lets a laser pointer aimed at a helical spring — or X-rays aimed at the double helix of DNA — reveal the structure's spacing and pitch from the diffraction pattern alone.

## Polarization

Because light is a transverse wave, the orientation of its electric field — its **polarization** — matters. An ideal polarizer transmits only the field component along its axis. Unpolarized light passing through a polarizer loses half its intensity and emerges polarized.

For light already polarized at angle $$\theta$$ to a polarizer's axis, **Malus's law** gives the transmitted intensity:

$$
I = I_0\cos^2\theta.
$$

Light can also be polarized by **reflection**. At **Brewster's angle** the reflected ray is completely polarized (parallel to the surface), and this happens exactly when the reflected and refracted rays are perpendicular:

$$
\tan\theta_B = \frac{n_2}{n_1}.
$$

This is why polarized sunglasses cut glare from horizontal surfaces like water and roads.
