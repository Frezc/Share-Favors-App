/** state tree
	{
		navOpen: bool, //侧边栏是否打开
	}
**/

import { combineReducers } from 'redux';
import { NAV_OPEN } from '../constants/actionTypes';

/** reducers **/
function navOpen(state = false, action) {
	switch (action.type) {
		case NAV_OPEN:
			return action.open;
		default:
			return state;
	}
}

const rootRuducer = combineReducers({
	navOpen
});

export default rootRuducer;