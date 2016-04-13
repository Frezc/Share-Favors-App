import md5 from './md5';
import { checkAuthExpired } from '../client/auth';
import fetch from 'isomorphic-fetch';

export function generateAvatarUrl(email, size) {
  let hash = md5(email.toLowerCase());
  return `https://cdn.v2ex.co/gravatar/${hash}?s=${size}&d=retro&r=pg`
}

export const isBrowser = new Function("try { return this === window; } catch(e) { return false; }");
export const isNode = new Function("try { return this === global; } catch(e) { return false; }");

export function saveItem(key, value) {
  if (isBrowser()) {
    localStorage && localStorage.setItem(key, value);
    return true;
  }

  return false;
}

export function getItem(key) {
  let item;
  if (isBrowser()) {
    item = localStorage && localStorage.getItem(key);
  }
  return item;
}

export function removeItem(key) {
  if (isBrowser()) {
    localStorage && localStorage.removeItem(key);
    return true;
  }

  return false;
}

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

// map to memory times
const timesMap = new WeakMap();
/**
 * retry code with delay and limit.
 * @param code Be sure code at same variable.
 * @param retryDelay milliseconds. [0, ]
 * @param retryLimit retry times [0, ]
 * @return the times code has retried. return 0 when retry end.
 */
export function retry(code, retryDelay = 1000, retryLimit = 3) {
  let times = timesMap.get(code);
  if (!times) {
    times = 0;
  }

  if (times >= retryLimit) {
    return 0;
  }

  setTimeout(code, retryDelay);
  times++;
  return times;
}

/**
 * Need auth in browser ?
 * Notice: In Node environment, needn't auth.
 */
export function needAuth(token, expired_at) {
  if (isBrowser()) {
    token = token ? token : getItem('token');
    if (!token) {
      return true;
    }
    return checkAuthExpired(expired_at);
  }
  
  return false;
}

/**
 * fetch with auto retry
 * @param url request url
 * @param params fetch params with { retry(int, default 3), deltaTime(int, default 1000(ms)) }
 */
export function fetchR(url, params) {
  // todo
}
