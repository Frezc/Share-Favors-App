/** state tree
	{
		view: {
			navOpen: bool, //侧边栏是否打开
			windowMode: 'normal' or 'widescreen', // 根据浏览器宽度的显示模式
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
				user: {
				  id,
				  email,
				  nickname
				},
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
				
				// desperate
				showUser: userId,  // none with -1
			},
			componentStatus: {
			  selfRepos: number, // 'loading': loading, the other: normal
			  selfStars: number,
			  userRepos,
			  userStars
			}
		},
		// 网页的缓存
		cache: {
			'/user/:id': user,
			'/user/:id/repositories?filter={XXX}': {
			  repoNumAll: number, // 所有仓库数
			  showAll: bool,      // 是否显示隐藏项
			  repoList: {         // 在该应用中都是50项一页
			    [page]: [{
            repository: repoAb,
            recentItems: [item, ...] // 默认3
          }]
        }
			},
			'/user/:id/stars': [{
			  repository: repoAb,
        recentItems: [item, ...] // 默认3
			}],
  		'/search/repo?keyword={kw}&filter={XXX}': [{
			  repository: repoAb,
        recentItems: [item, ...] // 默认3
			}],
			'/repository/:id'：{
			  repository: repoAb,  // except recentItems
			  items: [item, ...]
			},
			
   		'/search/link?keyword={kw}&filter={XXX}': [link],
   		'/search/tag?keyword={kw}&filter={XXX}': [tag],
   		'/search/user?keyword={kw}&filter={XXX}': [user],

      '/tags': [tag],
      '/tag/:text/repo?filter={XXX}': [{
			  repository: repoAb,
        recentItems: [item, ...] // 默认3
			}],
      '/tag/:text/link?filter={XXX}': [link]
		},

		// model
		user: {
		  id: number,
      email: string,
      nickname: string,
      sign: string,
      starlist: [repoAb, ...],     // 默认3个
      repositories: [repoAb, ...]  // 同上
		},
		repoAb: {
		  id: number,
      title,
      creator_id,
      creator_name,
      status,
      stars,
      created_at,
      updated_at,
      tags: [tag, ...],         // 最多12
      description,
      repoNum: number, // 仓库中的仓库数量
      linkNum: number, // 仓库中的链接数量
		},
		link: {
		  id,
		  title: string,
      url: string,
      description: string,
      tags: [tag, ...],        // 最多12
		},
		item: {
		  type: 0: 'repo' or 1: 'link',
			...repoAb or link      // 根据type判断
			created_at: 创建时间,
      updated_at: 更新时间
		},
		tag: {
		  id,
		  text,
		  used
		}

		// desperate
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
					creator_id,
					creator_name,
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
import cache from './cache';

const rootRuducer = combineReducers({
	view,
  cache,
	router
});

export default rootRuducer;
