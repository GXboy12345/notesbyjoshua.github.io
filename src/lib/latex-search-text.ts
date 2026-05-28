const LATEX_MACRO_ALIASES: Record<string, string[]> = {
  alpha: ['alpha'],
  beta: ['beta'],
  gamma: ['gamma'],
  Gamma: ['gamma', 'uppercase gamma'],
  delta: ['delta'],
  Delta: ['delta', 'uppercase delta', 'change'],
  epsilon: ['epsilon'],
  varepsilon: ['epsilon'],
  theta: ['theta'],
  vartheta: ['theta'],
  lambda: ['lambda'],
  mu: ['mu'],
  pi: ['pi'],
  rho: ['rho'],
  sigma: ['sigma'],
  Sigma: ['sigma', 'uppercase sigma', 'summation'],
  phi: ['phi'],
  varphi: ['phi'],
  omega: ['omega'],
  Omega: ['omega', 'uppercase omega'],
  sum: ['sum', 'summation', 'sigma'],
  prod: ['product', 'multiplication'],
  int: ['integral', 'integration'],
  iint: ['double integral'],
  lim: ['limit'],
  frac: ['fraction', 'ratio', 'over', 'divide'],
  dfrac: ['fraction', 'ratio', 'over', 'divide'],
  tfrac: ['fraction', 'ratio', 'over', 'divide'],
  sqrt: ['sqrt', 'square root', 'radical'],
  cdot: ['dot', 'times', 'multiply'],
  times: ['times', 'multiply'],
  div: ['divide', 'division'],
  pm: ['plus minus'],
  mp: ['minus plus'],
  le: ['less equal', 'less than or equal'],
  leq: ['less equal', 'less than or equal'],
  ge: ['greater equal', 'greater than or equal'],
  geq: ['greater equal', 'greater than or equal'],
  neq: ['not equal'],
  ne: ['not equal'],
  approx: ['approximately', 'approx'],
  sim: ['similar', 'approximately'],
  equiv: ['equivalent', 'congruent'],
  in: ['in', 'element of'],
  notin: ['not in', 'not element of'],
  subset: ['subset'],
  subseteq: ['subset equal'],
  infinity: ['infinity'],
  infty: ['infinity'],
  sin: ['sin', 'sine'],
  cos: ['cos', 'cosine'],
  tan: ['tan', 'tangent'],
  csc: ['csc', 'cosecant'],
  sec: ['sec', 'secant'],
  cot: ['cot', 'cotangent'],
  log: ['log', 'logarithm'],
  ln: ['ln', 'natural log', 'natural logarithm'],
  exp: ['exp', 'exponential'],
};

const COMMON_EXPR_ALIASES: Array<[RegExp, string]> = [
  [/\\?K_\{?sp\}?/gi, ' ksp solubility product equilibrium constant '],
  [/\\?K_\{?a\}?/g, ' ka acid dissociation constant '],
  [/\\?K_\{?b\}?/g, ' kb base dissociation constant '],
  [/\\?pH\b/g, ' ph acidity acid base '],
  [/\\?pOH\b/g, ' poh base hydroxide '],
  [/\\?E_\{?cell\}?/gi, ' cell potential electrochemical potential voltage '],
  [/\\?Q\b/g, ' reaction quotient q '],
];

const ELEMENT_NAMES: Record<string, string> = {
  H: 'hydrogen',
  He: 'helium',
  Li: 'lithium',
  Be: 'beryllium',
  B: 'boron',
  C: 'carbon',
  N: 'nitrogen',
  O: 'oxygen',
  F: 'fluorine',
  Ne: 'neon',
  Na: 'sodium',
  Mg: 'magnesium',
  Al: 'aluminum',
  Si: 'silicon',
  P: 'phosphorus',
  S: 'sulfur',
  Cl: 'chlorine',
  K: 'potassium',
  Ca: 'calcium',
  Fe: 'iron',
  Cu: 'copper',
  Zn: 'zinc',
  Ag: 'silver',
  Ba: 'barium',
  Pb: 'lead',
};

export function chemicalFormulaAliases(input: string): string {
  return input.replace(/\b(?:[A-Z][a-z]?\d*){2,}\b/g, (formula) => {
    const pieces = formula.match(/[A-Z][a-z]?|\d+/g) ?? [];
    const names = pieces.map((piece) => ELEMENT_NAMES[piece] ?? piece).filter(Boolean);
    return `${formula} ${pieces.join(' ')} ${names.join(' ')}`;
  });
}

export function latexToSearchText(src: string): string {
  let s = src.normalize('NFKC');
  const emitted: string[] = [s];

  for (const [pattern, alias] of COMMON_EXPR_ALIASES) {
    if (pattern.test(s)) emitted.push(alias);
    pattern.lastIndex = 0;
  }

  s = s.replace(/\\(?:text|mathrm|operatorname|ce)\s*\{([^{}]*)\}/g, ' $1 ');
  s = s.replace(/\\ce\s*\{([^{}]*)\}/g, (_match, body: string) => {
    return ` ${body} ${chemicalFormulaAliases(body)} `;
  });

  s = s.replace(
    /\\(?:dfrac|tfrac|frac)\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g,
    (_match, num: string, den: string) =>
      ` fraction ratio over numerator ${num} denominator ${den} ${num} ${den} `,
  );

  s = s.replace(
    /\\sqrt(?:\s*\[([^[]*)\])?\s*\{([^{}]*)\}/g,
    (_match, degree: string | undefined, radicand: string) =>
      degree
        ? ` root radical ${degree} root of ${radicand} ${radicand} `
        : ` square root sqrt radical ${radicand} `,
  );

  s = s.replace(/([A-Za-z0-9]+)_\{([^{}]+)\}/g, '$1 sub $2 $1_$2');
  s = s.replace(/([A-Za-z0-9]+)_([A-Za-z0-9]+)/g, '$1 sub $2 $1_$2');
  s = s.replace(/([A-Za-z0-9]+)\^\{?2\}?/g, '$1 squared $1 power 2');
  s = s.replace(/([A-Za-z0-9]+)\^\{?3\}?/g, '$1 cubed $1 power 3');
  s = s.replace(/([A-Za-z0-9]+)\^\{([^{}]+)\}/g, '$1 power $2');
  s = s.replace(/([A-Za-z0-9]+)\^([A-Za-z0-9+-]+)/g, '$1 power $2');

  s = s.replace(/\\([A-Za-z]+)\b/g, (_match, name: string) => {
    const aliases = LATEX_MACRO_ALIASES[name] ?? [name];
    emitted.push(...aliases);
    return ` ${aliases.join(' ')} `;
  });

  s = s
    .replace(/≤/g, ' less equal less than or equal ')
    .replace(/≥/g, ' greater equal greater than or equal ')
    .replace(/≠/g, ' not equal ')
    .replace(/≈/g, ' approximately approx ')
    .replace(/∞/g, ' infinity ')
    .replace(/[=]/g, ' equals ')
    .replace(/[+]/g, ' plus ')
    .replace(/[-−]/g, ' minus ')
    .replace(/[*/×]/g, ' times multiply ');

  emitted.push(s);
  emitted.push(chemicalFormulaAliases(s));

  return emitted.join(' ').replace(/\s+/g, ' ').trim();
}
