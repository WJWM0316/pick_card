<template>
	<view class="detail" :class="{'self' : isSelf, 'noFriend': !isSelf && userInfo.handle_status === 4}">
		<!-- 主要展示 -->
		<!-- <view class="header" @tap="toFlaunt " v-if="isSelf && userInfo.apply_count > 10">
			{{userInfo.apply_count}}人想得到你的名片
			<view class="flaunt"><button open-type="share" data-type="flaunt" class="xuyao">炫耀一下<image class="icon" src="/static/images/deta_icon_chevron@3x.png"></image></button></view>
		</view> -->
		
		<view class="main card" >
			<view class="positon">
				<image class="headImg" v-if="userInfo.avatar_info" :src="userInfo.avatar_info.bigImgUrl"></image>
				<view class="floor"  :class="{'floor-t' : userInfo.apply_count > 10}">
					<view class="tapIndex"  @tap="toIndex">
						<form report-submit="true" class="from-box" @submit="fromClick">
						    <button formType="submit" class="from-mask  "></button>
						</form>

						<image class="icon toIndex" src="/static/images/float_btn_returnhome@3x.png"></image>
					</view>
					<button open-type="share" data-type="people" :data-self="isSelf" v-if="authorize" >
						<view class="tapShare"><image class="icon toShare" src="/static/images/float_btn_share@3x.png"></image></view>
					</button>
					<view class="tapShare" @tap="toShare" v-else>
						<image class="icon toShare" src="/static/images/float_btn_share@3x.png"></image>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="mycard" v-if="!isSelf && myCard || !authorize" @tap.stop="jumpMy">
					<image class="icon" src="/static/images/float_icon_add@3x.png"></image>
					<text>我的名片</text>
				</view>
				<view class="nameBox">
						<view class="name ellipsis">{{userInfo.nickname}}</view>
						<view class="gendor_warp">
							<image class="sex" src="/static/images/details_icon_female@3x.png" v-if="userInfo.gender === 2"></image>
							<image class="sex" src="/static/images/details_icon_man@3x.png" v-if="userInfo.gender === 1"></image>
							<image class="share" src="/static/images/deta_btn_edit@3x.png" @tap.stop="toEdit('edit')" v-if="isSelf"></image>
						</view>
				</view>
				<view class="job">{{userInfo.occupation}}</view>
				<view class="company">{{userInfo.company}}</view>
				<view class="signature">{{userInfo.sign}}</view>
				<view class="itemMsg" v-if="userInfo.user_location !== ''">
					<image class="icon" src="/static/images/details_icon_location@3x.png"></image>
					<text class="msg">{{userInfo.user_location}}</text>
				</view>
				<view class="itemMsg">
					<image class="icon" src="/static/images/details_icon_territory@3x.png"></image>
					<text class="msg">
						<block  v-for="(item, index) in checkedTextList" :key="index">
							<text class="field">{{item}}</text>
							<text v-if="index !== checkedTextList.length - 1"> | </text>
						</block>
					</text>
				</view>
				<view class="itemMsg" v-if="userInfo.mobile !== ''">
					<image class="icon" src="/static/images/details_icon_phone@3x.png"></image>
					<text class="msg" @tap="call(userInfo.mobile)" :class="{
						'isShow' : userInfo.mobile === '需要交换后才可见',
						'click' : userInfo.mobile !== '需要交换后才可见'}">
						{{userInfo.mobile}}
					</text>
				</view>
				<view class="itemMsg" v-if="userInfo.email !== ''">
					<image class="icon" src="/static/images/details_icon_email@3x.png"></image>
					<text class="msg" @tap="copy(userInfo.email)" :class="{

						'isShow' : userInfo.email === '需要交换后才可见',
						'click' : userInfo.mobile !== '需要交换后才可见'}">
						{{userInfo.email}}
					</text>
				</view>
				<view class="itemMsg" v-if="userInfo.wechat !== ''">
					<image class="icon" src="/static/images/details_icon_wechat@3x.png"></image>
					<text class="msg" @tap="copy(userInfo.wechat)" :class="{

						'isShow' : userInfo.wechat === '需要交换后才可见',
						'click' : userInfo.mobile !== '需要交换后才可见'}">
						{{userInfo.wechat}}
					</text>
				</view>
				<view class="itemMsg" v-if="userInfo.company_location !== ''">
					<image class="icon" src="/static/images/details_icon_company@3x.png"></image>
					<text class="msg" >
						{{userInfo.company_location}}
					</text>
				</view>
			</view>
		</view>
		<!-- 我的人設 -->
		<view class="other card" v-if="labelInfo.length > 0 || isSelf">
			<view class="content">
				<view class="title">
					<image class="icon" src="/static/images/details_icon_label@3x.png"></image>
					<text class="msg">我的人设</text>
					<image class="share more" v-if="isSelf" @tap="toEdit('label')" src="/static/images/deta_btn_edit@3x.png"></image>
				</view>
				<view class="labelBox" v-if="labelInfo.length > 0">
					<text class="label" v-for="(item, index) in labelInfo" :key="item.id">{{item.name}}</text>
				</view>
			</view>
		</view>
		<!-- 工作經歷 -->
		<view class="other card" v-if="workInfo && workInfo.length > 0 || isSelf">
			<view class="content">
				<view class="title">
					<image class="icon" src="/static/images/details_icon_work@3x.png"></image>
					<text class="msg">工作经历</text>
				</view>
				<view class="litm" v-for="(item, index) in workInfo" v-if="index < showWorkNum || isSelf" :key="index">
					<view class="date">{{item.start_time_desc}} - {{item.end_time_desc}}<image class="share" v-if="isSelf" @tap.stop="toEdit('work', item.id)" src="/static/images/deta_btn_edit@3x.png"></image></view>
					<view class="job">{{item.position}}</view>
					<view class="company">{{item.name}}</view>
				</view>
				<button class="open" v-if="!isSelf" v-show="workInfo.length > 2" @tap="open(1)"><text v-show="showWorkNum === 2">展开查看更多</text><text v-show="showWorkNum > 2">收起</text></button>
				<button class="open" v-if="isSelf" @tap="add(1)"><image class="iconAdd" src="/static/images/data_icon_add@3x.png"></image><text>添加工作经历</text></button>
			</view>
		</view>	
		<!-- 教育經歷 -->
		<view class="other card"  v-if="educationsInfo && educationsInfo.length > 0 || isSelf">
			<view class="content">
				<view class="title">
					<image class="icon" src="/static/images/details_icon_education@3x.png"></image>
					<text class="msg">教育经历</text>
				</view>
				<view class="litm" v-for="(item, index) in educationsInfo" v-if="index < showEducationNum || isSelf" :key="index">
					<view class="date">{{item.start_time_desc}} - {{item.end_time_desc}}<image class="share" v-if="isSelf"  @tap.stop="toEdit('education', item.id)"src="/static/images/deta_btn_edit@3x.png"></image></view>
					<view class="school">{{item.name}}</view>
				</view>
				<button class="open" v-if="!isSelf" v-show="educationsInfo.length > 2" @tap="open(2)"><text v-show="showEducationNum === 2">展开查看更多</text><text v-show="showEducationNum > 2">收起</text></button>
				<button class="open" v-if="isSelf" @tap="add(2)"><image class="iconAdd" src="/static/images/data_icon_add@3x.png"></image><text>添加教育经历</text></button>

			</view>
		</view>	
		<!-- 更多介紹 -->
		<view class="other card more" v-if="moreInfo.content !== '' || moreInfo.img_info.length > 0 || isSelf">
			<view class="content">
				<view class="title">
					<image class="icon" src="/static/images/details_icon_more@3x.png"></image>
					<text class="msg">更多介绍</text>
					<image class="share more" v-if="isSelf" @tap="toEdit('more')" src="/static/images/deta_btn_edit@3x.png"></image>
				</view>
				<view class="article" v-if="moreInfo.content || (moreInfo.content === '' && moreInfo.img_info.length === 0)" :class="{'noWord' : moreInfo.content === ''}">{{moreInfo.content === '' && moreInfo.img_info.length === 0 ? '留下些文字或作品吧，让别人更加了解你～' : moreInfo.content}}</view>
				<view class="imgBox" v-if="moreInfo.img_info && moreInfo.img_info.length > 0">
					<image  v-for="(i, index) in moreInfo.img_info" mode="aspectFill" :key="index" class="img" :src="i.smallImgUrl" @tap.stop="previewImg(index)"></image>
				</view>
			</view>
		</view>
		<form report-submit="true"  class="btnControl" :class="{'double' : userInfo.handle_status === 1 && userInfo.friend_info.friend_id, 'static' : userInfo.handle_status === 4}" v-if="!isSelf" @submit="fromClick">
				<button formType="submit" class="btn removeRecord" @tap="applyFun('removeRecord')" v-if="userInfo.handle_status === 1 && userInfo.friend_info.friend_id">移除名片</button>
		    <button formType="submit" class="btn apply" @tap="applyFun('authorize')" v-if="userInfo.handle_status === 0">申请和TA交换名片</button>
		    <button formType="submit" class="btn apply" :class="{'rightBtn' : userInfo.handle_status === 1 && userInfo.friend_info.friend_id}" @tap="applyFun('launch')" v-if="userInfo.handle_status === 1">申请和TA交换名片</button>
		    <button formType="submit" class="btn applying" v-if="userInfo.handle_status === 2" disabled=true>已申请和TA交换名片</button>
		    <button formType="submit" class="btn applyed" @tap="applyFun('agree')" v-if="userInfo.handle_status === 3">同意和TA交换名片</button>
		    <button formType="submit" class="btn remove" @tap="applyFun('remove')" v-if="userInfo.handle_status === 4">移除名片</button>
		</form>
			
		<authorize-pop :showPop='showPop' :routerInfo="routerInfo"></authorize-pop>
	</view>
</template>
<script>
	import {getUserInfo2Api, getUserInfoApi, indexLike, putLike, delLike, delDetFriend} from '@/api/pages/user'
	import {formatTime} from '@/utils/index'
	import authorizePop from '@/components/authorize'
	import {getShareImg} from '@/api/pages/login'
  import App from '@/App'

	export default {
		components: {
			authorizePop
	  },
		data () {
			return {
				isSelf: false,
				vkey: '',
				imgList: ['/static/images/img.jpg'],
				userInfo: {},
				educationsInfo: [],
				workInfo: [],
				labelInfo: [],
				moreInfo: {},
				showWorkNum: 2,
				showEducationNum: 2,
				checkedTextList: [],
				nowTime: '',
				isShareImg: '',
				stopShow: false, // 阻止onShow的进行
				showPop: false,
				routerInfo: {},

			}
		},
		computed: {
			authorize () {
				if (this.$store.getters.userInfo.vkey) {
					return true
				} else {
					return false
				}
			},
			myCard () {
				if (this.$store.getters.userInfo.step !== 9) {
					return true
				} else {
					return false
				}
			}
		},
		onLoad (option) {

			this.routerInfo = {
				path: 'pages/detail/main',
				query: option
			}
			let scene = decodeURIComponent(option.scene)
			let params = App.methods.getSceneParams(scene)
			
			if (params.vkey) {
				this.vkey = params.vkey
			} else {
				this.vkey = option.vkey
			}
			const vkey = this.vkey
			if (vkey === wx.getStorageSync('vkey')) {
				this.isSelf = true
			} else {
				this.isSelf = false
			}


		},
		onShow () {
			if (this.stopShow) {
				this.stopShow = false
				return
			}
			let that = this
			this.userInfo = {}
			this.educationsInfo = []
			this.workInfo = []
			this.labelInfo = []
			this.moreInfo = {}
			this.checkedTextList = []
			function list () {
				if (that.isSelf) {
		    	console.log('是本人')
					that.getUserUnfo()
		    } else {
					console.log('非本人')
					that.getOtherUserInfo()
				}
			}
			if (!this.authorize) {
	      authorizePop.methods.checkLogin().then(res => {
	      	list()
	      })
	    } else {
	    	list()
	    }
			
		},
		onShareAppMessage: function (res) {
			let path = '/pages/index/main?';
			let shareInfo = this.$store.getters.shareInfo
			let that = this
			let title = shareInfo.index.content
			let imageUrl = shareInfo.index.path
			this.stopShow = true
		    if (res.from === 'button') {
		      // 来自页面内转发按钮
		      if (res.target.dataset.type == 'flaunt') {
			      title = shareInfo.showCard.content,
			      path = `pages/sharePick/main?vkey=${this.$store.getters.userInfo.vkey}&type=me&shareUid=${this.$store.getters.userInfo.id}&shareType=${shareInfo.showCard.type}`,
			      imageUrl = shareInfo.showCard.path
		      }

		      if (res.target.dataset.type == "people") {
		      	let shareType
				if (res.target.dataset.self) {
					shareType = shareInfo.mycard.type
				} else {
					shareType = shareInfo.otherCard.type
				}
			      title = shareInfo.otherCard.content,
			      path = `pages/detail/main?vkey=${this.userInfo.vkey}&shareUid=${this.userInfo.id}&shareType=${shareType}`,
			      imageUrl = this.isShareImg
		      }
		    }
		    return {
		      title: title,
		      path: path,
		      imageUrl: imageUrl,
		    }
		 },
		methods: {
			copy (e) {
				if (e === '需要交换后才可见') {
					return
				}
				wx.setClipboardData({
				  data: e,
				  success: function(res) {
		      	wx.showToast({
						  title: '复制成功',
						  icon: 'success',
						  duration: 1000
						})
		      }
				})
			},


			call (phoneNumber) {
				if (phoneNumber.length === 11) {
					wx.makePhoneCall({
					  phoneNumber: phoneNumber
					})
				}
			},
			fromClick (e) {
			  App.methods.sendFormId({
			    fromId: e.mp.detail.formId,
			    fromAddress: '/pages/index'
			  })
			},
			getShareImg () {
		      let data = {
		      	uid: this.userInfo.id,
		      	name: this.userInfo.nickname,
		      	img: this.userInfo.avatar_info.smallImgUrl,
		      	occupation: this.userInfo.occupation,
		      	company: this.userInfo.company,
		      	label: [],
		      }
		      this.userInfo.other_info.realm_info.forEach(item => {
		      	data.label.push(`${item.name} | `)
		      })
		      data.label = data.label.join('')
		      data.label = data.label.slice(0, data.label.length-3)
		      getShareImg(data).then(res => {
		      	this.isShareImg = res.data
		      })
			},
			open (type) {
				if (type === 1) {
					if (this.showWorkNum === 2) {
						this.showWorkNum = this.workInfo.length
					} else {
						this.showWorkNum = 2
					}
				} else {
					if (this.showEducationNum === 2) {
						this.showEducationNum = this.educationsInfo.length
					} else {
						this.showEducationNum = 2
					}
				}
			},
			add (type) {
				if (type === 1) {
					this.toEdit('work')
				} else {
					this.toEdit('education')
				}
			},
			applyFun (type) {
				if (!this.authorize) {
					this.showPop = true
					authorizePop.methods.checkLogin().then(res => {
					})
					return
				}
				if (this.$store.getters.userInfo.step !== 9) {
					this.jumpMy()
					return
				}
				let data = {
					to_uid: this.userInfo.id,
					remarks: '约么'
				}
				if (type === 'launch') {
					indexLike(data).then(res => {

						//首页不刷新
						wx.setStorageSync('isDetail','2')
						
						this.userInfo.handle_status = 2
					})
				} else if (type === 'agree') {
					data = {
						id: this.userInfo.handle_apply_info.id,
						status: 1,
						remarks: '约么'
					}
					putLike(data).then(res => {
						this.userInfo.handle_status = 3
						this.getOtherUserInfo()
					})
				} else if (type === 'removeRecord') {
					let that = this
					wx.showModal({
		        content: '确定要移除名片？',
		        confirmColor: '#00D093',
		        success: function(res) {
		          if (res.confirm) {
								data = {
									friend_id : that.userInfo.friend_info.friend_id,
									remarks: '约么'
								}
								delDetFriend(data).then(res => {
									wx.navigateBack({
									  delta: 1
									})
								})
							}
						}
					})
				} else {
					let that = this
					wx.showModal({
		        content: '确定要移除名片？',
		        confirmColor: '#00D093',
		        success: function(res) {
		          if (res.confirm) {
								data = {
									friend_id : that.userInfo.id,
									remarks: '约么'
								}
								delDetFriend(data).then(res => {
									that.userInfo.handle_status = 1
									wx.navigateBack({
									  delta: 1
									})
								})
							}
						}
					})
				}
			},
			jumpMy () {
				if (!this.authorize) {
					this.showPop = true
					authorizePop.methods.checkLogin().then(res => {
					})
					return
				}
				wx.redirectTo({
	        url: `/pages/createCard/main`
	      })
			},
			toIndex () {
				wx.reLaunch({
	        url: `/pages/index/main`
	      })
			},
			toShare () {
				if (!this.authorize) {
					this.showPop = true
					authorizePop.methods.checkLogin().then(res => {
					})
					return
				}
			},
			toEdit (type, id) {
				switch (type) {
					case 'edit': 
						wx.navigateTo({
			        url: `/pages/edit/main?vkey=${this.vkey}`
			      })
			      break
			    case 'work': 
						wx.navigateTo({
			        url: `/pages/experience/main?type=work&id=${id}`
			      })
			      break
			    case 'education': 
						wx.navigateTo({
			        url: `/pages/experience/main?type=education&id=${id}`
			      })
			      break
			    case 'more': 
						wx.navigateTo({
			        url: `/pages/more/main`
			      })
			      break
			    case 'label': 
						wx.navigateTo({
			        url: `/pages/characters/main`
			      })
			      break  
				}
			},
			flterData (list) {
				list.forEach(item => {
					if (item.start_time_desc.indexOf('-') !== -1) {
						let start = item.start_time_desc.split('-')
						if (start[1][0] === '0') {
							start[1] = start[1][1]
						}
						item.start_time_desc = `${start[0]}年${start[1]}月`
					}
					if (item.end_time_desc.indexOf('-') !== -1) {
						let end = item.end_time_desc
						if (end !== '至今') {
							end = item.end_time_desc.split('-')
							if (end[1][0] === '0') {
								end[1] = end[1][1]
							}
							item.end_time_desc = `${end[0]}年${end[1]}月`
						}
					}
				})
			},
			getUserUnfo () {
				this.checkedTextList = []
				return getUserInfoApi().then(res => {
					this.userInfo = res.data
					this.educationsInfo = res.data.other_info.education_info
					this.flterData(this.educationsInfo)
					this.workInfo = res.data.other_info.career_info
					this.flterData(this.workInfo)
					this.labelInfo = res.data.other_info.label_info
					this.moreInfo = res.data.other_info.more_info
					this.$store.dispatch('userInfo', this.userInfo)
					this.userInfo.other_info.realm_info.forEach(e => {
						this.checkedTextList.push(e.name)
					})
					this.$store.dispatch('userInfo', res.data)
					this.getShareImg()
				})
			},                                                                                                                             
			getOtherUserInfo () {
				this.checkedTextList = []
				return getUserInfo2Api(this.vkey).then(res => {
					this.userInfo = res.data
					this.educationsInfo = res.data.other_info.education_info
					this.flterData(this.educationsInfo)
					this.workInfo = res.data.other_info.career_info
					this.flterData(this.workInfo)
					this.labelInfo = res.data.other_info.label_info
					this.moreInfo = res.data.other_info.more_info
					this.userInfo.other_info.realm_info.forEach(e => {
						this.checkedTextList.push(e.name)
					})
					this.getShareImg()
				})
			},
			previewImg (index) {
				const _this = this
				let list = []
				this.moreInfo.img_info.forEach(item => {
					list.push(item.bigImgUrl)
				})
				wx.previewImage({
				  current: list[index], // 当前显示图片的http链接
				  urls: list, // 需要预览的图片http链接列表
				  complete: function () {
				  	_this.stopShow = true
				  }
				})
			}
		}
	}
</script>
<style lang="less" type="text/less" scoped>
	@import url('~@/assets/css/mixins.less');
	.detail {
		background: #FAFBFC;
		padding: 30rpx 40rpx 170rpx;
		&.noFriend {
			padding: 30rpx 40rpx 0;
		}
		&.self {
			padding-bottom: 30rpx;
		}
		.header {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 40rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			font-weight: 300;
			background:rgba(255,252,240,1);
			position: absolute;
			top: 0;
			left: 0;
			color: #354048;
			.flaunt {
				float: right;
				color: #FFA200;
				.xuyao {
					font-size: 28rpx;
					color: #FFA200;
					height: 80rpx;
					line-height: 80rpx;
				}
				.icon {
					width: 14rpx;
					height: 24rpx;
					margin-left: 16rpx;
					vertical-align:-2rpx;
				}
			}
		}
		.card {
			width: 100%;
			background: #fff;
			border-radius: 18rpx;
			margin-bottom: 30rpx;
			box-shadow:0px 10px 30px 0px rgba(153,193,214,0.1), 0px -5px 40px 0px rgba(153,193,214,0.08);
			&.more {
				margin-bottom: 0;
			}
		}
		.main {
			.headImg {
				width: 670rpx;
				height: 670rpx;
				background:url('https://card-uploads-test.oss-cn-shenzhen.aliyuncs.com/Uploads/static/new_pic_defaulhead.jpg') no-repeat;
				background-size: 100% 100%;
				border-radius: 18rpx 18rpx 0 0;
			}
			.positon {
				position: relative;
			}
			.floor {
				width: 174rpx;
				height: 72rpx;
				display: flex;
				justify-content:center;
				align-items:center;
				position: fixed;
				top: 84rpx;
				right: 0;
				background:rgba(53,57,67,0.3);
				border-radius:36rpx 0px 0px 36rpx;
				z-index: 1;
				&.floor-t {
					top: 100rpx;
				}
				.tapIndex {
					position: relative;
					padding: 20rpx 0 20rpx 20rpx;
				}
				.tapShare {
					padding: 20rpx 20rpx 20rpx 0;
				}
				.icon {
					width: 32rpx;
					height: 32rpx;
					display: block;
					&.toIndex {
						padding-right: 24rpx;
						border-right: 1rpx solid #fff;
					}
					&.toShare {
						padding-left: 24rpx;
					}
				}
			}
			&.mTop {
				margin-top: 70rpx;
			}
			.content {
				padding: 30rpx 30rpx 40rpx 40rpx;
				position: relative;
				.mycard {
					position: absolute;
					right: 0;
					top: 60rpx;
					width:220rpx;
					height:88rpx;
					background: #fff;
					font-size: 28rpx;
					line-height: 1.4;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 0 0 18rpx 18rpx;
					padding: 24rpx 0 18rpx 0;
					box-sizing: border-box;
					box-shadow: 0rpx 18rpx 28rpx 0rpx rgba(220,227,238,0.2),0rpx -2rpx 8rpx 0rpx rgba(220,227,238,0.18);
					border-radius: 44rpx 0rpx 0rpx 44rpx;
					.icon {
						width: 54rpx;
						height: 46rpx;
						margin-right: 6rpx;
					}
				}
				.nameBox {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.setEllipsis();
					.name {
						font-size: 48rpx;
						font-weight: 700;
						color: #353943;
						line-height: 1.4;
					}
					.gendor_warp {
						min-width: 80rpx;
						position: relative;
						flex: 1;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
					}
					.sex {
						width: 40rpx;
						height: 40rpx;
						//float: left;
						margin-left: 10rpx;
						margin-right: 10rpx;
					}
					.share {
						width: 32rpx;
						height: 32rpx;
						//float: right;       
						display: block;
						padding:4rpx 0 4rpx 30rpx;
						//padding:20rpx 0 20rpx 20rpx;
						//vertical-align:sub;
					}
					.more {
						margin-top: 4rpx;
					}
				}
				.job {
					font-size: 34rpx;
					line-height: 1.4;
					margin: 2rpx 0 3rpx;
					color: #353943;
					.setEllipsis();
				}
				.company {
					font-size: 28rpx;
					line-height: 1.4;
					color: #353943;
					font-weight: 300;
					.setEllipsis();
				}
				.signature {
					color: #B2B6C2;
					font-size: 28rpx;
					line-height: 1.4;
					margin: 20rpx 0 39rpx;
					.setEllipsisLn(2);
				}
				.itemMsg {
					margin-bottom: 30rpx;
					display: flex;
					align-items: center;
					padding-left: 30rpx;
					box-sizing: border-box;
					position: relative;
					.icon {
						width: 30rpx;
						height: 30rpx;
						position: absolute;
						top: 50%;
						margin-top: -15rpx;
						left: 0;
						display: block;
					}
					.msg {
						font-size: 28rpx;
						line-height: 1.4;
						color: #353943;
						margin-left: 26rpx;
						.setEllipsis();
						&.isShow {
							color: #B2B6C2;
						}

						&.click {
							color: #4080ad;
						}
					}
					&:last-child {
						margin-bottom: 0;
					}
				}
				
			}
		}
		.other {
			.content {
				padding: 50rpx 40rpx;
				position: relative;
				.share {
					width: 32rpx;
					height: 32rpx;
					float: right;
					padding:4rpx 0 4rpx 30rpx;
					display: block;
				}
				.title {
					height: 40rpx;
					line-height: 1.4;
					font-weight: 700;
					.icon {
						width: 40rpx;
						height: 40rpx;
						vertical-align: sub;
						margin-right: 19rpx;
					}
					.msg {
						color: #353943;
						font-size: 34rpx;
						height: 40rpx;
						font-weight: 700;
						display: inline-block;
					}
				}
				.labelBox {
					margin-top: 16rpx;
					overflow: hidden;
					.label {
						margin-top: 14rpx;
						padding: 0 26rpx;
						font-size: 24rpx;
						height: 48rpx;
						line-height: 48rpx;
						color: #00D093;
						border: 1rpx #00D093 solid;
						margin-right: 10rpx;
						border-radius:24px;
						float: left;
					}
				}
				.litm {
					margin-top: 40rpx;
				}
				.date, .job, .company, .school {
					color: #9AA1AB;
					font-size: 28rpx;
					line-height: 1.4;
					font-weight: 300;
					margin-top: 30rpx;
				}
				.job, .company, .school {
					color: #353943;
					margin-top: 20rpx;
				}
				.company {
					margin-top: 14rpx;
				}
				.open {
					width: 100%;
					height: 70rpx;
					line-height: 70rpx;
					color: #9AA1AB;
					font-size: 28rpx;
					font-weight: 300;
					border-radius:50px;
					border:1rpx solid rgba(220,227,238,1);
					margin-top: 40rpx;
					.iconAdd {
						width: 24rpx;
						height: 24rpx;
						margin-right: 20rpx;
					}
				}
				.article {
					margin-top: 28rpx;
					font-size: 32rpx;
					color: #353943;
					line-height: 1.4;
					font-weight: 300;
					&.noWord {
						font-size:28rpx;
						color:#9AA1AB;
					}
				}
				.imgBox {
					overflow: hidden;
					margin-top: 20rpx;
					.img {
						width: 190rpx;
						height: 190rpx;
						border-radius:4px;
						margin-right: 10rpx;
						margin-top: 10rpx;
						float: left;
						&:nth-child(3n) {
							margin-right: 0;
						}
					}
				}
				
			}
		}
		.btnControl {
			width: 100%;
			padding: 30rpx 75rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			box-sizing: border-box;
			background:rgba(255,255,255,0.8);
			overflow: hidden;
			display: block;
			&.double {
				padding: 30rpx 40rpx;
			}
			&.static {
				padding: 30rpx 0;
				position: static;
				background: none;
			}
			.btn {
				font-size: 32rpx;
				line-height: 98rpx;
				border-radius:50px;
				color: #fff;
				&.removeRecord {
					width:260rpx;
					float: left;
					background: #DCE3EE;
				}
				&.rightBtn {
					width:380rpx;
					float: right;
				}
				&.apply, &.applyed {
					background: #00D093;	
				}
				&.applying {
					background: rgba(178, 240, 222, 1);
				}
				&.remove {
					width: 100%;
					background: #DCE3EE;
				}
			}
		} 
	}
</style>