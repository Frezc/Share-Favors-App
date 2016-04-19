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
  params = Object.assign({
    retry: 3,
    deltaTime: 1000
  }, params);

  return new Promise((resolve, reject) => {
    const wrappedFetch = (retry) => {
      fetch(url, params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          if (retry > 0) {
            setTimeout(() => {
              wrappedFetch(retry - 1);
            }, params.deltaTime);
          } else {
            reject(error);
          }
        })
    };
    wrappedFetch(params.retry);
  });
}

/**
 * check the element index in string array (not case sensitivity), if not, return 0
 * @param ele
 * @param arr
 */
export function checkInArray(ele = '', arr = []) {
  for(let i = 0; i < arr.length; i++) {
    if (arr[i].toLowerCase() == ele.toLowerCase()) {
      return i;
    }
  }
  
  return 0;
}

/**
 * calculate the items number of one page
 * @param itemsAll
 * @param page    page index (begin from 0)
 * @param perPage items per page
 */
export function getPageItemsNumber(itemsAll, page, perPage) {
  if ((page + 1) * perPage > itemsAll) {
    return itemsAll - page * perPage;
  }
  
  return perPage;
}
