import md5 from './md5';

function generateAvatarUrl(email, size) {
  let hash = md5(email.toLowerCase());
  return `https://cdn.v2ex.co/gravatar/${hash}?s=${size}&d=retro&r=pg`
}

export { generateAvatarUrl };
