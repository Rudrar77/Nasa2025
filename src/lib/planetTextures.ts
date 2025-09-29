// Import textures statically to ensure they're processed by Vite
import sunTexture from '@/assets/textures/sun.jpg';
import mercuryTexture from '@/assets/textures/mercury.jpg';
import venusTexture from '@/assets/textures/venus.jpg';
import earthTexture from '@/assets/textures/earth.jpg';
import marsTexture from '@/assets/textures/mars.jpg';
import jupiterTexture from '@/assets/textures/jupiter.jpg';
import saturnTexture from '@/assets/textures/saturn.jpg';
import uranusTexture from '@/assets/textures/uranus.jpg';
import neptuneTexture from '@/assets/textures/neptune.jpg';

export const planetTextures = {
  sun: sunTexture,
  mercury: mercuryTexture,
  venus: venusTexture,
  earth: earthTexture,
  mars: marsTexture,
  jupiter: jupiterTexture,
  saturn: saturnTexture,
  uranus: uranusTexture,
  neptune: neptuneTexture,
} as const;
