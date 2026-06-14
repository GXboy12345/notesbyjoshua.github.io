---
layout: default
title: Force and Translational Dynamics
nav_title: "Unit 2: Force and Translational Dynamics"
parent: AP Physics C Mechanics
nav_order: 2
permalink: /notes/physics/forces/
---

# Force and Translational Dynamics

---

## Useful Variables

- $$\vec{F}$$ = force (Units: newtons, $$\text{N} = \text{kg}\cdot\text{m}/\text{s}^2$$)
- $$m$$ = mass (Units: kilograms, $$\text{kg}$$)
- $$\vec{a}$$ = acceleration (Units: $$\text{m}/\text{s}^2$$)
- $$g$$ = gravitational field strength near Earth = $$9.8\ \text{m}/\text{s}^2$$
- $$\vec{W}$$ or $$\vec{F}_g$$ = weight / gravitational force
- $$F_N$$ or $$N$$ = normal force
- $$T$$ = tension
- $$f_s$$ = static friction
- $$f_k$$ = kinetic friction
- $$\mu_s$$ = coefficient of static friction
- $$\mu_k$$ = coefficient of kinetic friction
- $$k$$ = spring constant (Units: $$\text{N/m}$$)
- $$r$$ = radius of circular path
- $$v$$ = speed
- $$\omega$$ = angular speed (Units: $$\text{rad/s}$$)

---

## Newton's Three Laws of Motion

In 1687, Newton formulated the three laws of motion. They work extremely well for ordinary macroscopic objects moving much slower than the speed of light. At quantum, relativistic, or very strong-gravity scales, Newtonian mechanics must be replaced or extended, but for AP purposes, Newtonian mechanics suffices.

1. **Newton's First Law**: An object has constant velocity unless acted on by a nonzero net external force. If $$\sum \vec{F} = 0$$, then $$\vec{a} = 0$$.
2. **Newton's Second Law**: The net external force equals mass times acceleration:

$$
\sum \vec{F} = m\vec{a}.
$$

3. **Newton's Third Law**: If object $$A$$ exerts a force on object $$B$$, then object $$B$$ exerts an equal-magnitude, opposite-direction force on object $$A$$:

$$
\vec{F}_{A\text{ on }B} = -\vec{F}_{B\text{ on }A}.
$$

Third-law forces act on different objects, so they never cancel for one object. They can cancel only when you treat both interacting objects as one system and the force pair becomes internal.

---

## Free-body diagrams

A **free-body diagram** is a force diagram for one object or one chosen system. It should show only external forces acting on that object/system, not forces the object applies to something else. Forces are treated as vectors and can be composed accordingly.

<img class="note-img note-img--w480" src="{{ '/assets/APs/AP%20Physics%20C%20Mech/forces/freebodydiagram.png' | relative_url }}" alt="Free body diagram placeholder" loading="lazy" decoding="async" />

Good procedure:

1. Choose the object or system.
2. Draw a dot or simple sketch.
3. Add one arrow for each external force.
4. Choose axes, usually one axis parallel to the expected acceleration or along a surface.
5. Resolve angled forces into components using vector decomposition.
6. Write Newton's second law separately for each direction.

For a particle in two dimensions,

$$
\sum F_x = ma_x, \qquad \sum F_y = ma_y.
$$

If acceleration is zero in one direction, the net force in that direction is zero even if forces are present.

---

## Common types of forces

In AP Physics C, most force problems are built from a small set of common forces.

### Weight

**Weight** is the gravitational force on an object. Near Earth's surface,

$$
\vec{F}_g = m\vec{g},
$$

so its magnitude is

$$
F_g = mg.
$$

Weight points downward, toward Earth's center. Mass is not weight: mass is an object's inertia, while weight is a force caused by gravity. Weight is always drawn from the center of the object, and sometimes drawing out the whole object (as opposed to just a dot) is very important! For example, when the force of gravity passes through the corner of the object, it will start to topple!

### Normal force

The **normal force** is a contact force **perpendicular** to a surface and opposes gravity. It adjusts to prevent objects from passing through each other, but it is not automatically equal to $$mg$$. For example, on an incline or in an accelerating elevator, the normal force differs from the object's weight. Normally, you need to solve out force equations to get the normal force. The normal force acts along the entire surface of contact but is usually drawn out in the center of the contact plane.

### Tension

**Tension** is a pulling force transmitted by a rope, string, or cable. In an ideal world, strings are massless and inextensible, and pulleys are massless and frictionless. Under those assumptions, the tension is the same throughout a continuous string.

If a string or pulley has mass, or if the pulley has rotational inertia, tension may differ on different sides. Those cases usually belong more naturally with rotational dynamics.

### Friction

**Friction** is a contact force parallel to a surface that opposes relative motion or impending relative motion.

Static friction adjusts up to a maximum value:

$$
0 \le f_s \le f_{s,\text{max}} = \mu_s F_N.
$$

Kinetic friction has approximately constant magnitude:

$$
f_k = \mu_k F_N.
$$

Static friction is not always equal to $$\mu_sF_N$$; that expression gives the maximum possible static friction before slipping begins. Usually $$\mu_s > \mu_k$$.

### Spring force

For an ideal spring, **Hooke's law** gives

$$
\vec{F}_s = -k\vec{x},
$$

where $$\vec{x}$$ is displacement from equilibrium. The negative sign means the spring force points opposite the displacement. This force is more relevant in [Unit 7: Oscillations]({{ '/notes/physics/oscillations/' | relative_url }}).

### Drag and resistive forces

Air resistance and fluid drag are often ignored in AP mechanics unless specified. When included, drag points opposite velocity. Two common models are

$$
\vec{F}_d = -b\vec{v}
$$

for low-speed linear drag, and

$$
\vec{F}_d = c\vec{v}^2
$$

for high-speed quadratic drag. Linear drag leads naturally to differential equations, so it is a good Physics C extension.

---

## Solving Newton's second law problems

The most reliable method is:

1. Draw a free-body diagram for each object.
2. Pick axes that simplify the motion.
3. Write $$\sum F = ma$$ along each axis.
4. Connect objects with constraints, such as equal accelerations for an ideal string.
5. Solve algebraically before substituting numbers.
6. Check the sign and units of the result.

For multiple-object systems, you can choose either:

- Treat each object separately to find internal forces like tension.
- Treat several objects as one system to eliminate internal forces.

If the question asks only for acceleration of a connected system, the system approach is often faster. If the question asks for tension or contact force, individual free-body diagrams are usually required.

---

## Inclined planes

For a block on an incline of angle $$\theta$$, it is usually best to choose axes parallel and perpendicular to the plane. The weight decomposes into

$$
F_{g,\parallel} = mg\sin\theta,
$$

down the incline, and

$$
F_{g,\perp} = mg\cos\theta,
$$

into/perpendicular to the incline.

If there is no acceleration perpendicular to the surface,

$$
F_N = mg\cos\theta.
$$

For a frictionless incline, the acceleration down the plane is

$$
a = g\sin\theta.
$$

<img class="note-img note-img--w480" src="{{ '/assets/APs/AP%20Physics%20C%20Mech/forces/inclinedplane.png' | relative_url }}" alt="Inclined plane force components placeholder" loading="lazy" decoding="async" />

With friction, decide whether the block is moving or about to move. If it is moving, use kinetic friction. If it is at rest, static friction takes whatever value is needed up to $$\mu_sF_N$$. It is also helpful to use geometry/similar triangles to determine certain angles for vector decompositions. ALWAYS remember your normal force!

---

## Friction and the slipping condition

The condition for impending slip is

$$
f_s = \mu_s F_N.
$$

For a block resting on an incline, slipping begins when

$$
mg\sin\theta = \mu_s mg\cos\theta.
$$

Thus,

$$
\tan\theta = \mu_s.
$$

This is the maximum angle before sliding for a simple block on a rough incline (rough meaning that there is friction). If external forces or other constraints are present, the slipping condition must be rederived from the free-body diagram.

---

## Connected objects and pulleys

For ideal ropes and pulleys, connected objects share related accelerations. A common Atwood machine has two hanging masses connected by a massless string over a frictionless pulley.
<!--
<img class="note-img note-img--w480" src="{{ '/assets/APs/AP%20Physics%20C%20Mech/forces/pulley-system.png' | relative_url }}" alt="Pulley system placeholder" loading="lazy" decoding="async" /> -->

If $$m_2 > m_1$$, the acceleration magnitude is

$$
a = \frac{(m_2 - m_1)g}{m_1 + m_2},
$$

and the tension is

$$
T = \frac{2m_1m_2}{m_1 + m_2}g.
$$

These formulas are worth understanding, not just memorizing. They come from

$$
T - m_1g = m_1a,
$$

$$
m_2g - T = m_2a.
$$

For pulley systems with movable pulleys, the acceleration constraints may involve factors of 2. Write the string-length constraint first, then differentiate with respect to time to relate velocities and accelerations.

---

## Apparent weight and elevators

**Apparent weight** is the normal force a scale reads. In an elevator,

$$
F_N - mg = ma
$$

if upward is positive.

So,

$$
F_N = m(g + a).
$$

If the elevator accelerates upward, $$F_N > mg$$. If it accelerates downward, $$F_N < mg$$. In free fall, $$a = -g$$ and $$F_N = 0$$, so the object is weightless in the apparent-weight sense even though gravity still acts.

---

## Equilibrium

An object is in **translational equilibrium** when

$$
\sum \vec{F} = 0.
$$

This means its acceleration is zero, so the object is either at rest or moving with constant velocity. In two dimensions,

$$
\sum F_x = 0, \qquad \sum F_y = 0.
$$

Do not assume equilibrium just because an object is momentarily at rest. If a ball is thrown upward, it has zero velocity at the top but still has downward acceleration.

For static equilibrium of extended objects, torque must also balance:

$$
\sum \tau = 0.
$$

Torque is treated in [Unit 5]({{ '/notes/physics/torque/' | relative_url }}), but it is useful to remember that translational equilibrium alone is not enough to prevent rotation.

---

## Uniform circular motion

In **uniform circular motion**, speed is constant but velocity changes direction, so the object accelerates toward the center of the circle. The centripetal acceleration is

$$
a_c = \frac{v^2}{r} = \omega^2 r.
$$

Newton's second law in the radial direction is

$$
\sum F_r = m\frac{v^2}{r}.
$$

There is no special "centripetal force." The phrase describes the net inward force required for circular motion. Gravity, tension, friction, the normal force, or a combination of forces can provide the centripetal force.

<!-- <img class="note-img note-img--w480" src="{{ '/assets/APs/AP%20Physics%20C%20Mech/forces/circular-motion-forces.png' | relative_url }}" alt="Circular motion force diagram placeholder" loading="lazy" decoding="async" /> -->

Examples:

- A ball on a string: tension can provide the inward force.
- A car on a flat curve: static friction provides the inward force.
- A satellite in orbit: gravity provides the inward force.
- A roller coaster at the bottom of a loop: normal force and gravity combine to give the net inward force.

For a car on a flat curve with static friction,

$$
f_s \le \mu_sF_N = \mu_smg.
$$

At the maximum speed before slipping,

$$
\frac{mv^2}{r} = \mu_smg,
$$

so

$$
v_{\text{max}} = \sqrt{\mu_sgr}.
$$

---

## Nonuniform circular motion

For **nonuniform circular motion**, acceleration has both radial and tangential components:

$$
a_r = \frac{v^2}{r},
$$

$$
a_t = \frac{dv}{dt}.
$$

The radial component changes the direction of velocity. The tangential component changes the speed. Write Newton's second law separately in radial and tangential directions:

$$
\sum F_r = m\frac{v^2}{r}, \qquad \sum F_t = m\frac{dv}{dt}.
$$

This is common in vertical circle problems, where gravity has a tangential component except at the top and bottom.

---

## Banked curves

For a frictionless banked curve, the horizontal component of the normal force provides centripetal acceleration, while the vertical component balances weight:

$$
F_N\cos\theta = mg,
$$

$$
F_N\sin\theta = \frac{mv^2}{r}.
$$

Dividing gives

$$
\tan\theta = \frac{v^2}{rg}.
$$

So the design speed is

$$
v = \sqrt{rg\tan\theta}.
$$

With friction, static friction points whichever way prevents slipping: up the slope if the car would slide down, and down the slope if the car would slide up.

---

## Inertial and non-inertial frames

Newton's laws have their simplest form in an **inertial frame**, a frame that is not accelerating. In an accelerating frame, you may introduce a **pseudo-force** so Newton's second law appears to work inside that frame.

For a frame accelerating with $$\vec{a}_{\text{frame}}$$, the pseudo-force on a mass $$m$$ is

$$
\vec{F}_{\text{pseudo}} = -m\vec{a}_{\text{frame}}.
$$

Pseudo-forces are not interaction forces and do not have third-law partners. They are bookkeeping tools for working in non-inertial frames. AP Physics C usually lets you solve from an inertial frame, but pseudo-forces can be useful for accelerating elevators, accelerating wedges, and rotating-frame intuition.

---

## Variable forces and calculus form

For constant mass, Newton's second law can be written as

$$
\vec{F}_{\text{net}} = m\frac{d\vec{v}}{dt} = m\frac{d^2\vec{r}}{dt^2}.
$$

If force depends on position, velocity, or time, this becomes a differential equation. For example, a falling object with linear drag satisfies

$$
m\frac{dv}{dt} = mg - bv
$$

if downward is positive. The terminal velocity occurs when acceleration becomes zero:

$$
mg - bv_t = 0,
$$

so

$$
v_t = \frac{mg}{b}.
$$

Solving the differential equation from rest gives

$$
v(t) = v_t\left(1 - e^{-bt/m}\right).
$$

This is slightly beyond the most common AP force problems, but it is a classic Physics C use of calculus.

---

## Center of mass and systems

For a system of particles, the net external force determines the acceleration of the center of mass:

$$
\sum \vec{F}_{\text{ext}} = M\vec{a}_{\text{CM}}.
$$

Internal forces between particles cancel in pairs by Newton's third law when considering the system as a whole. This is why a person cannot accelerate a closed system's center of mass by pushing only on internal parts.

This idea becomes central in [Unit 4: Linear Momentum and Impulse]({{ '/notes/physics/linearmomentum/' | relative_url }}).

---

## Common mistakes

1. Treating $$F_N$$ as always equal to $$mg$$.
2. Setting static friction equal to $$\mu_sF_N$$ when the object is not at the threshold of slipping.
3. Drawing third-law partner forces on the same free-body diagram.
4. Calling $$mv^2/r$$ a force by itself instead of the required net radial force.
5. Forgetting that tension can differ if the rope or pulley is not ideal.
6. Assuming zero velocity means zero acceleration.
7. Mixing up the direction of friction; friction opposes relative motion or impending relative motion, not always the direction of motion.

---

## Working checklist

1. Choose the system carefully.
2. Draw a clean free-body diagram.
3. Pick axes that match the geometry or acceleration.
4. Break forces into components.
5. Write $$\sum F_x = ma_x$$ and $$\sum F_y = ma_y$$.
6. Add constraints for ropes, pulleys, or circular motion.
7. Solve symbolically when possible.
8. Check limiting cases: frictionless, very large mass, zero angle, or zero acceleration.

---

## Key equations

| Idea | Equation |
| --- | --- |
| Newton's second law | $$\sum \vec{F} = m\vec{a}$$ |
| Components | $$\sum F_x = ma_x,\quad \sum F_y = ma_y$$ |
| Weight near Earth | $$F_g = mg$$ |
| Static friction | $$0 \le f_s \le \mu_sF_N$$ |
| Kinetic friction | $$f_k = \mu_kF_N$$ |
| Hooke's law | $$\vec{F}_s = -k\vec{x}$$ |
| Incline components | $$mg\sin\theta,\quad mg\cos\theta$$ |
| Uniform circular acceleration | $$a_c = v^2/r = \omega^2r$$ |
| Radial Newton's second law | $$\sum F_r = mv^2/r$$ |
| Frictionless banked curve | $$v = \sqrt{rg\tan\theta}$$ |
| Center of mass dynamics | $$\sum \vec{F}_{\text{ext}} = M\vec{a}_{\text{CM}}$$ |
