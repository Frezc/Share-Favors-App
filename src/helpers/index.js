import md5 from './md5';

export function generateAvatarUrl(email, size) {
  let hash = md5(email.toLowerCase());
  return `https://cdn.v2ex.co/gravatar/${hash}?s=${size}&d=retro&r=pg`
}

export const isBrowser = new Function("try { return this === window; } catch(e) { return false; }");
export const isNode = new Function("try { return this === global; } catch(e) { return false; }");

/**
 * cut string with max length
 *
 * @param string input string
 * @param len the character length in alphabet. other character length 2.
 * @param ellipse when string length exceed len, this will be append to it.
 * @return the string of fixed length. if exceed, return with '...'
 */
export function generateCutString(string = '', len = 1, ellipse = '...') {
  let alphaLen = 0;
  let i;
  for (i = 0; i < string.length; i++) {
    if (alphaLen >= len) {
      break;
    }

    if (string.charCodeAt(i) > 127 || string.charCodeAt(i) == 94) {
      alphaLen += 2;
    } else {
      alphaLen ++;
    }
  }

  let newString = string.slice(0, i);
  if (i < string.length) {
    newString += ellipse;
  }

  return newString;
}
