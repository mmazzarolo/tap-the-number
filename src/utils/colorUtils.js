/* @flow */
const getContrastYIQ = (hc) => {
  const [r, g, b] = [1, 3, 5].map(p => parseInt(hc.substr(p, 2), 16))
  return ((r * 299) + (g * 587) + (b * 114)) / 1000 >= 128 ? 'black' : 'white'
}

export default {
  getContrastYIQ
}
