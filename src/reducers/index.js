/** state tree
	{
		view: {
			navOpen: bool, //侧边栏是否打开
			dialogs: {      //对话框
				authDialog: {
					type: 'auth' or 'register',
					loading: bool,  //是否在加载状态
					visible: bool,  //是否显示
					error: string  //是否出现错误
				},
				linkDialog: {
					type: 'watch' or 'edit',
					visible: bool,
					loading: bool,
					link: {
						id: number,
						title: string,
						url: string,
						description: string,
						tags: [{
							id: number,
							text: string,
							used: number
						}],
						created_at: 创建时间,
						updated_at: 更新时间
					},
					error: string
				}
			},
			auth: {
				user: userId,
				token: string,
				expired_at: timestamp
			},
			snackbar: {
				visible: bool,  
				message: string  //显示的消息
			},
			sendEmail: {
				canSendEmail: bool, // 是否能发送邮件
				sendEmailCounting: bool //是否正在发送冷却中
			},
			content: {
				loading: bool, 主内容区域是否在加载
				error: string, 主内容区域显示的错误
				
				showUser: userId,  // none with -1
			}
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
					title,
					creatorId,
					creatorName,
					status,
					stars,
					created_at,
					updated_at,
					tags: [{
						id: number,
						text: string,
						used: number
					}],
					description,
					repoNum: number, // 仓库中的仓库数量
					linkNum: number, // 仓库中的链接数量
					items: [{
						type: 'repo' or 'link',
						id: ...repoId or linkId,
						/// if type == 'link'
						title: string,
						url: string,
						description: string,
						tags: [{
							id: number,
							text: string,
							used: number
						}],
						///
						created_at: 创建时间,
						updated_at: 更新时间
					}, ...],
					recentItems: [same]
				},
				...
			}
		}
	}
**/

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import view from './view';
import data from './data';

const rootRuducer = combineReducers({
	view,
	data,
	router
});

export default rootRuducer;
