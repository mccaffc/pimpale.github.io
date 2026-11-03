// FAI-mapped stand-in for ../styles/palette. The article widgets draw on a
// Cod Gray chart panel (the FAI screen-chart treatment), so the gruvbox
// "dark" roles map onto Cod Gray steps and FAI program hues.
import type { PaletteKey } from '../styles/palette';

export const palette: Readonly<Record<PaletteKey, string>> = {
  bg0h: '#121212',  // Cod Gray (panel ground)
  bg0: '#121212',
  bg1: '#1E1E1E',
  bg2: '#2C2C2C',
  bg3: '#3A3A3A',
  bg4: '#5A5A58',
  gray: '#6E6E6B',
  fg4: '#9A9A96',   // hero bubble-chamber tracks
  fg3: '#9A9A96',
  fg2: '#BDBDB9',
  fg1: '#F3F3F3',   // Smoke White
  fg0: '#FFFFFF',
  red: '#C8102E',
  green: '#0E8C88',  // Deep Teal (AI program)
  yellow: '#FFA300', // Chrome Yellow
  blue: '#4997D0',   // Celestial Blue
  purple: '#7150D6',
  aqua: '#0E8C88',
  orange: '#FF4F00',
  brightRed: '#FF4F00',     // IBD detectors
  brightGreen: '#268B41',
  brightYellow: '#FFA300',  // CEvNS detectors
  brightBlue: '#4997D0',
  brightPurple: '#9C86E8',  // BEC (Iris Violet, lifted for contrast on Cod Gray)
  brightAqua: '#4997D0',    // spin-transition
  brightOrange: '#FF4F00',
};
