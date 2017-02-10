/* @flow */

/**
 * Simple syntactic sugar over setTimeout that looks good when using the async/await pattern.
 * @param {ms} number - Time to wait for in milliseconds.
 * @return {Promise<void>} A promise that resolves when the given time has ended.
 */
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export default {
  delay,
};
