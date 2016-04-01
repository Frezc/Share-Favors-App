import md5 from './md5';

export function generateAvatarUrl(email, size) {
  let hash = md5(email.toLowerCase());
  return `https://cdn.v2ex.co/gravatar/${hash}?s=${size}&d=retro&r=pg`
}

export const isBrowser = new Function("try { return this === window; } catch(e) { return false; }");
export const isNode = new Function("try { return this === global; } catch(e) { return false; }");
