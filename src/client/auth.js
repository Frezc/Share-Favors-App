import { getItem } from '../helpers';
import { refreshToken } from '../actions/authActions';

// app执行时需要自动刷新token
export function autoRefresh(store) {
  const token = getItem('token');
  if (!token) return false;

  store.dispatch(refreshToken(token));
}

// 在请求返回401时检查token有效期
export function checkAuthExpired(expired_at = getItem('expired_at')) {
  if (!expired_at) return true;
  return expired_at * 1000 <= Date.now();
}
