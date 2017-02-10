/* @flow */

/**
 * Given a color returns a different luminance.
 * @param {string} hexColor - The color.
 * @param {number} luminance - The color luminance to apply (in e.g. -0.2 for a darker luminance).
 * @return {string} The color with the applied luminance.
 */
const getDifferentLuminance = (hexColor: string, luminance: number): string => {
  // Validate hex string
  let hex = String(hexColor).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const lum = luminance || 0;

  // Convert to decimal and change luminosity
  let rgb = '#';
  let c;
  let i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += `00${c}`.substr(c.length);
  }

  return rgb;
};

export default {
  getDifferentLuminance,
};
