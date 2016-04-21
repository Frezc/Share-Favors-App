import { fetchR } from '../helpers';


// notice: fetch默认https. 这里需要注明
// const HOST = 'http://192.168.2.236';
const HOST = 'http://sharefavors.com';


// 登录
const AUTH_URL = HOST + '/auth';
export function auth(email, password) {
  let data = new FormData();
  data.append('email', email);
  data.append('password', password);

  return fetchR(AUTH_URL, {
    method: 'POST',
    mode: 'cors',
    body: data
  });
}


// 发送验证邮件
const SENDEMAIL_URL = HOST + '/sendVerifiedEmail';
export function sendEmail(email) {
  return fetchR(`${SENDEMAIL_URL}?email=${email}`);
}


// 注册
const REGISTER_URL = HOST + '/register';
export function register(email, password, nickname, code) {
  let data = new FormData();
  data.append('email', email);
  data.append('password', password);
  data.append('nickname', nickname);
  data.append('code', code);

  return fetchR(REGISTER_URL, {
    method: 'POST',
    mode: 'cors',
    body: data
  });
}

// 刷新token
const REFRESHTOKEN_URL = HOST + '/refreshToken';
export function refreshToken(token) {
  return fetchR(`${REFRESHTOKEN_URL}?token=${token}`);
}

// 得到用户信息
export function userInfo(id, starListMax = 3, repositoriesMax = 3) {
  return fetchR(`${HOST}/user/${id}?starListMax=${starListMax}&repositoriesMax=${repositoriesMax}`);
}


// 得到用户的仓库列表
export function userRepository(id, orderby = 'recent updated', offset = 0, token, limit = 50) {
  const tokenParam = token ? `&token=${token}` : '';

  return fetchR(`${HOST}/user/${id}/repository?offset=${offset}&orderby=${orderby.toLowerCase()}&limit=${limit}${tokenParam}`)
}

// 得到用户的starList
export function userStarlist(id, offset = 0, token, limit = 50) {
  const tokenParam = token ? `&token=${token}` : '';

  return fetchR(`${HOST}/user/${id}/starList?offset=${offset}&limit=${limit}${tokenParam}`);  
}


// 重置密码
const RESETPASSWORD_URL = HOST + '/resetPassword';

// 取消授权
const UNAUTH_URL = HOST + '/unauth';
export function unauthUrl(token) {
  return `${UNAUTH_URL}?token=${token}`
}

