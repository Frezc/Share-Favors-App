import { COMPONENT_STATUS_SET } from '../constants/actionTypes';

function componentStatus(state = {}, action) {
  switch (action.type) {
    case COMPONENT_STATUS_SET:
      return Object.assign({}, state, {
        [action.component]: action.status
      });
  }

  return state;
}


export default componentStatus;
