/** state tree
	{
		view: {
			navOpen: bool, //侧边栏是否打开
			dialogs: {      //对话框
				authDialog: {
					type: 'auth' or 'register',
					loading: bool,  //是否在加载状态
					show: bool,  //是否显示
					error: bool  //是否出现错误
				},
				linkDialog: {
					type: 'watch' or 'edit',
					show: bool,
					loading: bool,
					link: linkId,
					error: bool
				}
			},
			showUser: userId,  // none with -1
			loginUser: userId
		},
		data: {
			users: {
				[id]: {
					id: number,
					email: string,
			    nickname: string,
			    sign: string,
			    starlist: [...repoId],
			    repositories: [...repoId]
				},
				...
			},
			repositories: {
				[id]: {
					id: number,
					name,
					creatorId,
					creatorName,
					status,
					stars,
					created_at,
					updated_at,
					tags: [...tagId],
					description,
					items: [{
						type: 'repo' or 'link',
						id: ...repoId or linkId
					}, ...],
					recentItems: [same]
				},
				...
			},
			links: {
				[id]: {
					id: number,
					title: string,
					url: string,
					description: string,
					tags: [...tagId]
				},
				...
			},
			tags: {
				[id]: {
					id: number,
					text: string,
					used: number
				},
				...
			}
		}
	}
**/

import { combineReducers } from 'redux';
import view from './view';
import data from './data';
import { NAV_OPEN, DIALOG_SHOW, DIALOG_SET_CONTENT, TYPE_USER } from '../constants/actionTypes';

/** default state **/
/*const NONEUSER = {
	email: 'youremail@email.com',
	nickname: 'click to login',
	sign: 'you can login to save and share your favorites',
	starlist: [],
	repositories: []
};*/

/** reducers **/

const rootRuducer = combineReducers({
	view,
	data
});

export default rootRuducer;
