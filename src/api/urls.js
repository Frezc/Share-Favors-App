
// notice: fetch默认https. 这里需要注明
// const HOST = 'http://192.168.2.236';
const HOST = 'http://sharefavors.com'

// 登录
export const AUTH_URL = HOST + '/auth';

// 注册
export const REGISTER_URL = HOST + '/register';

// 刷新token
export const REFRESHTOKEN_URL = HOST + '/refreshToken';
export function refreshTokenUrl(token) {
  return `${REFRESHTOKEN_URL}?token=${token}`;
}

// 发送验证邮件
export const SENDEMAIL_URL = HOST + '/sendVerifiedEmail';
export function sendEmailUrl(email) {
  return `${SENDEMAIL_URL}?email=${email}`;
}

// 重置密码
export const RESETPASSWORD_URL = HOST + '/resetPassword';

// 取消授权
export const UNAUTH_URL = HOST + '/unauth';
export function unauthUrl(token) {
  return `${UNAUTH_URL}?token=${token}`
}

// 得到用户信息
export function userInfoUrl(id, starListMax = 3, repositoriesMax = 3) {
  return `${HOST}/user/${id}?starListMax=${starListMax}&repositoriesMax=${repositoriesMax}`;
}

// 得到用户的仓库列表
export function userReposUrl(id, offset = 0, limit = 50, orderby = 'recent updated', token) {
  const tokenParam = token ? `&token=${token}` : '';
  return `${HOST}/user/${id}/repository?offset=${offset}&orderby=${orderby}&limit=${limit}${tokenParam}`;
}

// 得到用户的starList
export function userStarlistUrl(id, offset = 0, limit = 50, token) {
  const tokenParam = token ? `&token=${token}` : '';
  return `${HOST}/user/${id}/starList?offset=${offset}&limit=${limit}${tokenParam}`;
}
