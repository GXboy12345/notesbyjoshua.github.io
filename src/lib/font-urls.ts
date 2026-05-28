import cabinBold from '../assets/fonts/cabin-sketch/CabinSketch-Bold.ttf?url';
import cabinRegular from '../assets/fonts/cabin-sketch/CabinSketch-Regular.ttf?url';
import playpen from '../assets/fonts/playpen-sans/PlaypenSans-VariableFont_wght.ttf?url';
import sairaMedium from '../assets/fonts/saira/Saira_SemiCondensed-Medium.ttf?url';
import sairaRegular from '../assets/fonts/saira/Saira_SemiCondensed-Regular.ttf?url';
import sairaSemiBold from '../assets/fonts/saira/Saira_SemiCondensed-SemiBold.ttf?url';

/** Self-hosted font URLs for `<link rel="preload">` (must match @font-face sources). */
export const fontPreloads = [
  sairaRegular,
  sairaMedium,
  sairaSemiBold,
  cabinRegular,
  cabinBold,
  playpen,
] as const;
