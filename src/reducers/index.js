/** state tree
	{
		navOpen: bool, //侧边栏是否打开
		dialog: {      //对话框
			show: bool,  //是否显示
			loading: bool,  //是否在加载状态
			contentType: enum //内容类型
		},
		showUserData: {     //显示的用户数据
			email: string,
	    nickname: string,
	    sign: string,
	    starlist: [{
				id: number,
				name,
				creatorId,
				creatorName,
				status,
				stars,
				created_at,
				updated_at,
				tags,
				description
	    }],
	    repositories: [{
				// same
	    }]
		}
	}
**/

import { combineReducers } from 'redux';
import { NAV_OPEN, DIALOG_SHOW, DIALOG_SET_CONTENT, TYPE_USER } from '../constants/actionTypes';

/** default state **/
const DIALOGSTATE = {
	show: false,
	loading: false,
	contentType: TYPE_USER
};

const NONEUSER = {
	email: 'youremail@email.com',
	nickname: 'click to login',
	sign: 'you can login to save and share your favorites',
	starlist: [],
	repositories: []
};

/** reducers **/
function navOpen(state = false, action) {
	switch (action.type) {
		case NAV_OPEN:
			return action.open;
		default:
			return state;
	}
}

function dialog(state = DIALOGSTATE, action) {
	switch (action.type) {
		case DIALOG_SHOW:
			return Object.assign({}, state, {
				show: action.show,
				loading: action.loading
			});
		case DIALOG_SET_CONTENT:
			return Object.assign({}, state, {
				loading: false,
				contentType: action.contentType
			});
		default: 
			return state;
	}
}

function showUserData(state = NONEUSER, action) {
	switch (action.type) {
		case DIALOG_SET_CONTENT:
			if (action.contentType === TYPE_USER) { 
				return action.data;
			} else {
				return state;
			}
		default:
			return state;
	}
}

const rootRuducer = combineReducers({
	navOpen,
	dialog,
	showUserData
});

export default rootRuducer;