/**
 * Permanent redirects for stable old URLs after permalink reorganization.
 * Keys and destinations use trailing slashes (matches astro.config trailingSlash: 'always').
 */
const AP_PHYSICS_C_EM_UNITS = [
  'electrostatics',
  'electricpot',
  'condcap',
  'circuits',
  'magnetism',
  'eminduction',
] as const;

const AP_PHYSICS_C_MECH_UNITS = [
  'kinematics',
  'forces',
  'work',
  'linearmomentum',
  'torque',
  'rotationalmomentum',
  'oscillations',
] as const;

function unitRedirects(
  units: readonly string[],
  course: 'ap-physics-c-em' | 'ap-physics-c-mechanics',
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const unit of units) {
    out[`/notes/physics/${unit}/`] = `/notes/ap/${course}/${unit}/`;
  }
  return out;
}

export const LEGACY_REDIRECTS: Record<string, string> = {
  ...unitRedirects(AP_PHYSICS_C_EM_UNITS, 'ap-physics-c-em'),
  ...unitRedirects(AP_PHYSICS_C_MECH_UNITS, 'ap-physics-c-mechanics'),
};
