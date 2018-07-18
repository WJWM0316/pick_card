<template>
	<view class="center">
		<view class="header" @tap="toDetail" v-if="info.data_complete_score < 80">
			完善资料信息，提高吸引力
			<text class="toEdit">立即完善</text>
		</view>
		<view class="content">
			<view style="height: 28rpx;"></view>
			<view class="main">
				<view @tap.stop="toDetail">
					<view class="head">
						<view class="msg">
							<view class="name">{{info.nickname}}</view>
							<view class="job">{{info.occupation}}</view>
						</view>
						<image class="headImg" :src="info.avatar_info.middleImgUrl"></image>
					</view>
					<view class="con">
						<view class="product"><image class="icon" src="/static/images/me_icon_company@2x.png"></image>{{info.company}}</view>
						<view class="position">
							<image class="icon" src="/static/images/me_icon_territory@2x.png"></image>
							<block  v-for="(item, index) in checkedTextList" :key="index">
								<text class="field">{{item}}</text>
								<text v-if="index !== checkedTextList.length - 1"> | </text>
							</block>
							<image class="san" src="/static/images/me_icon_edit_chevron@2x.png"></image></view>
					</view>
				</view>
				<button open-type="myDetail" class="share">发名片</button>
				<button class="save" @tap="toSaveImg">保存名片到相册</button>
			</view>
			<viwe class="setting">
				<view class="inner">
					<view class="item" @tap.stop="toJump()">
						<view class="itemCon">
							<view class="left">隐私设置</view>
							<view class="right">
								<image class="jumpIcon" src="/static/images/icon_chevron@2x.png"></image>
							</view>
						</view>
					</view>
					<navigator target="miniProgram" app-id="wxdf4966c8f6916d05" version="develop" url="pages/home/index" hover-class="none">
					<view class="item">
						<view class="itemCon">
							<view class="left">职场学习社区</view>
							<view class="right">
								<text class="txt">百万职场人都在学</text>
								<image class="hot" src="/static/images/icon_hot@2x.png"></image>
								<image class="jumpIcon" src="/static/images/icon_chevron@2x.png"></image>
							</view>
						</view>
					</view>
					</navigator>
				</view>
			</viwe>
			<view class="bottomH5">
				<navigator url="/pages/useHelp/index" open-type="navigate" hover-class="none" class="h5Txt"><text>使用帮助</text></navigator>
				<navigator url="/pages/userProtocol/index" open-type="navigate" hover-class="none" class="h5Txt"><text>用户协议</text></navigator>
				<text class="h5Txt noborder" @tap="service">联系客服</text>
			</view>
		</view>
		<footerTab :type=3 :adaptive=adaptive :isRed=swopRed></footerTab>
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	import footerTab from '@/components/footerTab'
	import {putPrivacyApi, getUserInfoApi} from '@/api/pages/user'
	import {getShareImg} from '@/api/pages/login'
  import { redDotApplys } from '@/api/pages/red'

	export default {
		components: {
			footerTab
	  },
		data () {
			return {
				info: {},
				checkedTextList: [],
				isShareImg: '',
				openSet: false,
				swopRed: 0,
				adaptive: null
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.global.userInfo,
				shareInfo: state => state.global.shareInfo,
			}),
		},
		onLoad (option) {
			this.vkey = option.vkey
			this.adaptive = wx.getStorageSync('adaptive')
			redDotApplys().then(res=>{
			  if(res.http_status==200){
			    that.swopRed = res.data.user_apply_show_red_dot
			  }
			})
		},
		onShow () {
			this.checkedTextList = []
			let that = this
			wx.getSetting({
        success(res) {
          console.log(res, res.authSetting['scope.writePhotosAlbum'])
          if (res.authSetting['scope.writePhotosAlbum']) {
          	that.openSet = false
        	}
        }
      })
      console.log('用户信息', this.userInfo)
			if (this.userInfo) {
				this.info = this.userInfo
				this.info.other_info.realm_info.forEach(e => {
					this.checkedTextList.push(e.name)
				})
			}
      let data = {
      	uid: this.info.id,
      	name: this.info.nickname,
      	img: this.info.avatar_info.bigImgUrl,
      	occupation: this.info.occupation,
      	company: this.info.company,
      	label: [],
      }
      this.info.other_info.realm_info.forEach(item => {
      	data.label.push(`${item.name} | `)
      })
      data.label = data.label.join('')
      data.label = data.label.slice(0, data.label.length-3)
      getShareImg(data).then(res => {
      	this.isShareImg = res.data
      })

		},
		onShareAppMessage: function (res) {
			console.log(res)
			let path = '/pages/index/main?';
			let shareInfo = this.$store.getters.shareInfo
			let that = this
			let title = shareInfo.index.content
			let imageUrl = shareInfo.index.path

    	if (res.from === 'button') {
			//footer 弹框分享
	    	if(res.target.dataset.type=="index"){
	    		title = shareInfo.index?shareInfo.index.content:''
	    		imageUrl = shareInfo.index.path
	    		path = `/pages/index/main?vkey=${that.info.vkey}&shareUid=${that.info.vkey}&shareType=${shareInfo.showCard.type}`
	    	} else if (res.target.dataset.type=='myDetail') {
	      	// 来自页面内转发按钮
	      	console.log(res.target)
		      title = shareInfo.mycard.content,
		      path= `pages/detail/main?vkey=${that.info.vkey}&shareUid=${that.info.vkey}&shareType=${shareInfo.mycard.type}`,
		      imageUrl= that.isShareImg
	    	}		
    	}

    	return {
    	  title: title,
    	  path: path,
    	  imageUrl: imageUrl,
    	}
 	 	},
		methods: {
			toJump () {
				wx.navigateTo({
	        url: `/pages/privacy/main`
	      })
			},
			toDetail () {
				wx.navigateTo({
	        url: `/pages/detail/main?vkey=${this.userInfo.vkey}`
	      })
			},
			toSaveImg () {
	      	wx.navigateTo({
		        url: `/pages/poster/main`
		      })
				},
				service () {
					wx.showModal({
					  title: '欢迎添加“Pick趣名片”公众号',
					  content: '了解更多，有疑问请添加客服微信： Pick官方客服',
					  confirmText: '复制微信',
					  success: function(res) {
					    if (res.confirm) {
					      wx.setClipboardData({
								  data: 'Pick官方客服',
								  success: function(res) {
								    wx.getClipboardData({
								      success: function(res) {
								      	wx.showToast({
												  title: '复制成功',
												  icon: 'success',
												  duration: 1000
												})
								        console.log(res.data) // data
								      }
								    })
								  }
								})
					    } else if (res.cancel) {
					      console.log('用户点击取消')
					    }
					  }
					})
				}
		  }
		}
</script>
<style lang="less" type="text/less" scoped>
@import url('~@/assets/css/mixins.less');
.center {
	padding: 0 0 28rpx;
	min-height: 100%;
	box-sizing: border-box;
	background: #F5F7FA;
	.header {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 40rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		font-weight: light;
		background:rgba(255,252,240,1);
		color: RGBA(122, 125, 131, 1);
		.toEdit {
			float: right;
			color: rgba(255,162,0,1);
		}
	}
	.content {
		padding: 0 40rpx 28rpx;
	}
	.main {
		background: #fff url('https://card-uploads-test.oss-cn-shenzhen.aliyuncs.com/Uploads/static/me_pic_bg%403x.png') no-repeat top left;
		background-size: 100% auto;
		padding: 40rpx 35rpx 44rpx;
		border-radius:18rpx;
		margin-bottom: 30rpx;
		.head {
			height: 160rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 5rpx;
			.msg {
				width: 394rpx;
			}
			.name {
				color: #353943;
				font-size: 56rpx;
				line-height: 56rpx;
				font-weight: 500;
				.setEllipsis();
			}
			.job {
				color: #353943;
				font-size: 32rpx;
				line-height: 32rpx;
				font-weight: light;
				margin-top: 10rpx;
				.setEllipsis();
			}
			.headImg {
				height: 160rpx;
				width: 160rpx;
				border-radius: 50%;
				background: url('https://card-uploads-test.oss-cn-shenzhen.aliyuncs.com/Uploads/static/new_pic_alert%403x.png') no-repeat;
				background-size: 100% 100%;
			}
		}
		.con {
			padding: 0 5rpx;
			margin-top: 18rpx;
			color: #9AA1AB;
			line-height:26rpx;
			font-size: 26rpx;
			.product {
				.setEllipsis();
			}
			.position {
				.setEllipsis();
				margin-top: 16rpx;
			}
			.icon {
				width: 30rpx;
				height: 30rpx;
				vertical-align:sub;
				padding-right: 11rpx;
			}
			.san {
				width: 14rpx;
				height: 23rpx;
				float: right;
				margin-top:4rpx
			}
		}
		.share, .save {
			margin: 70rpx 0 26rpx;
			height: 90rpx;
			background: #00D093;
			border-radius: 50rpx;
			font-size: 34rpx;
			line-height: 90rpx;
			color: #fff;
		}
		.save {
			margin: 0 5rpx;
			color: #00D093;
			background: #F5FDFB;
			border: 1rpx solid rgba(0,208,147,0.4);
		}
	}
	.setting {
		.inner {
			background: #fff;
			padding: 0 30rpx;
			border-radius: 18rpx;
		}
		.item {
	    height: 120rpx;
			.itemCon {
				height: 100%;
				border-bottom: 1rpx solid rgba(53,57,67,0.1);
				box-sizing: border-box;
				display: flex;
		    align-items: center;
		    justify-content: space-between;
		    font-size: 32rpx;
				line-height: 32rpx;
		    .left {
					color: #353943;
					font-weight: light;
					position: relative;
					.titleMsg {
						font-size: 32rpx;
						color: #C3C9D4;
						float: right;
					}
		  	}
		  	.right {
					text-align: right;
					overflow: hidden;
					.txt {
						color: #9AA1AB;
						font-size:28rpx;
					}
					.jumpIcon {
						width: 18rpx;
						height: 30rpx;
						margin-left: 10rpx;
						vertical-align:-2rpx;
					}
					.hot {
						width: 60rpx;
						height: 38rpx;
						vertical-align: -9rpx;
						margin: 0 7rpx 0 6rpx;
					}
		  	}
			}
			&:last-child {
				.itemCon {
					border: none;
				}
			}
		}
	}
	.bottomH5 {
		display: flex;
		justify-content:center;
		margin-top:46rpx;
		font-size: 28rpx;
		line-height: 30rpx;
		color: #9AA1AB;
		.h5Txt {
			padding: 0 12rpx;
			border-right: 1rpx solid #9AA1AB;
			&.noborder {
				border: none;
			}
		}
	}
}

</style>