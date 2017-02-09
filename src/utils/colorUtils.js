/* @flow */
const getContrastYIQ = (hc: string) => {
  const [r, g, b] = [1, 3, 5].map(p => parseInt(hc.substr(p, 2), 16));
  return (r * 299 + g * 587 + b * 114) / 1000 >= 128 ? 'black' : 'white';
};

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
  getContrastYIQ,
  getDifferentLuminance,
};
