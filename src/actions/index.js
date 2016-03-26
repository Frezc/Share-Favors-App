import { NAV_OPEN } from '../constants/actionTypes';

/** action creator **/
export function setNavOpen (open) {
  return {
    type: NAV_OPEN,
    open: open
  }
}
