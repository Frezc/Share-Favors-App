import { getItem } from '../helpers';
import { refreshToken } from '../actions/authActions';

export function preAuth(store) {
  const token = getItem('token');
  if (!token) return false;

  store.dispatch(refreshToken(token));
}

export function checkAuthNotExpired() {
  const expired_at = getItem('expired_at');
  if (!expired_at) return false;

  if (expired_at * 1000 > Date.now()) {
    return true;
  }

  return false;
}
