<template>
	<view class="center">
		<view class="header" @tap="toDetail" v-if="info.data_complete_score < 80">
			完善资料信息，提高吸引力
			<view class="toEdit">立即完善<image class="icon" src="/static/images/deta_icon_chevron@3x.png"></image></view>
		</view>
		<view class="content" :class="{'ten': adaptive == 'ten'}">
			<view style="height: 28rpx;"></view>

			<view class="main">
				<view class="main_msg">
					<view @tap.stop="toDetail">
						<view class="head">
							<view class="msg">
								<view class="name">{{info.nickname}}</view>
								<view class="job">{{info.occupation}}</view>
							</view>
							<image class="headImg" :src="info.avatar_info.middleImgUrl"></image>
						</view>
						<view class="con">
							<view class="product">
								<image class="icon" src="/static/images/me_icon_company@2x.png"></image>
								<view class="ovTxt">{{info.company}}</view>
							</view>
							<view class="position">
								<image class="icon" src="/static/images/me_icon_territory@2x.png"></image>
								<view class="ovTxt">
									<block  v-for="(item, index) in checkedTextList" :key="index">
										<text class="field">{{item}}</text>
										<text v-if="index !== checkedTextList.length - 1"> | </text>
									</block>
								</view>
								<image class="san" src="/static/images/me_icon_edit_chevron@2x.png"></image></view>
						</view>
					</view>
					<button open-type="share" data-type="myDetail" class="share">发名片</button>
					<form report-submit="true" class="from-box" @submit="fromClick">
						<button formType="submit" class="save" @tap="toSaveImg">保存名片到相册</button>
					</form>
				</view>
				<!--  -->
				<view class="flaunt" v-if="info.apply_count > 10">
					<view class="number" v-if="info && info.apply_count"><text>{{info.apply_count}}</text>人想得到你的名片</view>
					<button open-type="share" data-type="flaunt" class="toFlaunt">
						炫耀一下
						<image src="/static/images/edit_icon_label_select@3x.png"></image>
					</button>
				</view>
			</view>

			<viwe class="setting">
				<view class="inner">
					<view class="item" @tap.stop="toJump()">
						<form report-submit="true" class="from-box" @submit="fromClick">
						    <button formType="submit" class="from-mask  "></button>
						</form>
						<view class="itemCon">
							<view class="left">
								隐私设置
							</view>
							<view class="right">
								<image class="jumpIcon" src="/static/images/icon_chevron@2x.png"></image>
							</view>
						</view>
					</view>

					<button class="item" open-type="feedback">
						<view class="itemCon">
							<view class="left">
								用户反馈
							</view>
							<view class="right">
								<image class="jumpIcon" src="/static/images/icon_chevron@2x.png"></image>
							</view>
						</view>
					</button>

					<navigator target="miniProgram" app-id="wxc3523caab5f5b865" version="develop" url="pages/home/index" hover-class="none">
					<view class="item">
						<form report-submit="true" class="from-box" @submit="fromClick">
						    <button formType="submit" class="from-mask  "></button>
						</form>
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
				<navigator url="/pages/help/main" open-type="navigate" hover-class="none" class="h5Txt"><text>使用帮助</text></navigator>
				<navigator url="/pages/pickProtocol/main" open-type="navigate" hover-class="none" class="h5Txt"><text>用户协议</text></navigator>
				<text class="h5Txt noborder" @tap="service">联系客服</text>
			</view>
		</view>
		<footerTab :type=3 :adaptive=adaptive :isRed=mainRed></footerTab>
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	import footerTab from '@/components/footerTab'
	import {putPrivacyApi, getUserInfoApi} from '@/api/pages/user'
	import {getShareImg} from '@/api/pages/login'
	import { redDot } from '@/api/pages/red'
	import App from '@/App'

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
				mainRed: 0,
				adaptive: null
			}
		},
		watch: {
			info(val){
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
			redDot().then(res=>{
				if(res.http_status==200){
				  this.mainRed = res.data.main_show_red_dot
				}
			})
		},
		onShow () {
			this.checkedTextList = []
			let that = this
			wx.getSetting({
        success(res) {
          if (res.authSetting['scope.writePhotosAlbum']) {
          	that.openSet = false
        	}
        }
      })
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
	    		path = `/pages/index/main?vkey=${that.info.vkey}&shareUid=${that.info.id}&shareType=${shareInfo.showCard.type}`
	    	} else if (res.target.dataset.type=='myDetail') {
		      title = shareInfo.mycard.content,
		      path= `pages/detail/main?vkey=${that.info.vkey}&shareUid=${that.info.id}&shareType=${shareInfo.mycard.type}`,
		      imageUrl= that.isShareImg
	    	} else if (res.target.dataset.type=='flaunt') {
	    		title = shareInfo.showCard.content,
	    		path = `pages/sharePick/main?vkey=${that.info.vkey}&type=me&shareUid=${that.info.id}&shareType=${shareInfo.showCard.type}`,
	    		imageUrl = shareInfo.showCard.path
	    	}
    	}
    	return {
    	  title: title,
    	  path: path,
    	  imageUrl: imageUrl,
    	}
 	 	},
		methods: {
			fromClick (e) {
			  App.methods.sendFormId({
			    fromId: e.mp.detail.formId,
			    fromAddress: '/pages/index'
			  })
			},
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
					  title: '趣名片PickMe',
					  content: '了解更多，有疑问请添加客服微信：zike03',
					  confirmText: '复制微信',
					  confirmColor: '#00D093',
					  success: function(res) {
					    if (res.confirm) {
					      wx.setClipboardData({
								  data: 'zike03',

								  success: function(res) {
								    wx.getClipboardData({
								      success: function(res) {
								      	wx.showToast({
										  title: '复制成功',
										  icon: 'success',
										  duration: 1000
										})
								      }
								    })
								  }
								})
					    } else if (res.cancel) {
					    }
					  }
					})
				}
		  }
		}
</script>
<style lang="less" type="text/less" scoped>
@import url('~@/assets/css/mixins.less');
.flaunt {
	height: 164rpx;
	line-height: 180rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	font-size:28rpx;
	font-family:PingFangSC-Light;
	font-weight:300;
	color: #00D093;
	margin-bottom: 30rpx;
	padding: 44rpx 40rpx 0 40rpx;
	border-radius:0px 0px 18rpx 18rpx ;
	box-sizing: border-box;
	background:rgba(255,255,255,1);
	margin-top: -44rpx;
	box-shadow:0px 7px 10px 0px rgba(153,193,214,0.05);
	position: relative;
	left: 0;
	z-index: -1;
	.number {
		flex: 1;
		color: #7A7D83;
		text {
			font-size:32rpx;
			font-family:SFUIDisplay-Medium;
			font-weight:500;
			color:rgba(0,208,147,1);
			margin-right: 6rpx;
		}
	}
	.toFlaunt {
		font-weight:400;
		margin-right: 12rpx;
		color: #00D093;
		font-size: 28rpx;
		image {
			width:20rpx;
			height:12rpx;
			transform:rotate(-90deg);
			position: relative;
			top: -6rpx;
		}
	}
}
.center {
	padding: 0 0 96rpx;
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
		font-weight: lighter;
		background:rgba(255,252,240,1);
		color: RGBA(122, 125, 131, 1);
		.toEdit {
			float: right;
			color: #FFA200;
			.icon {
				width: 14rpx;
				height: 24rpx;
				margin-left: 16rpx;
			}
		}
	}
	.content {
		padding: 0 40rpx 28rpx;
		&.ten {
			padding: 0 40rpx 100rpx;
		}
	}
	.main {
		position: relative;
		margin-bottom: 30rpx;
		z-index: 1;
		.main_msg {
			background: #fff url('https://card-uploads-test.oss-cn-shenzhen.aliyuncs.com/Uploads/static/me_pic_bg%403x.png') no-repeat top left;
			background-size: 100% auto;
			padding: 40rpx 35rpx 44rpx;
			border-radius:18rpx;
			box-shadow:0px 7px 12px 0px rgba(153,193,214,0.05);
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
					line-height: 1.3;
					font-weight: 700;
					.setEllipsis();
				}
				.job {
					color: #353943;
					font-size: 32rpx;
					line-height: 32rpx;
					font-weight: 300;
					margin-top: 10rpx;
					.setEllipsis();
				}
				.headImg {
					height: 160rpx;
					width: 160rpx;
					border-radius: 50%;
					background: url('https://card-uploads-test.oss-cn-shenzhen.aliyuncs.com/Uploads/static/new_pic_defaulhead.jpg') no-repeat;
					background-size: 100% 100%;
				}
			}
			.con {
				padding: 0 5rpx;
				margin-top: 18rpx;
				color: #9AA1AB;
				line-height:26rpx;
				font-size: 26rpx;
				font-weight: 300;
				.product {
					position: relative;
					padding: 0 70rpx 0 41rpx;
					.ovTxt {
						width: 470rpx;
						.setEllipsis();
					}
				}
				.position {
					padding: 0 70rpx 0 41rpx;
					margin-top: 16rpx;
					position: relative;
					.ovTxt {
						width: 470rpx;
						.setEllipsis();
					}
				}
				.icon {
					width: 30rpx;
					height: 30rpx;
					vertical-align:sub;
					padding-right: 11rpx;
					position: absolute;
					top: 50%;
					margin-top: -15rpx;
					left: 0;
				}
				.san {
					width: 14rpx;
					height: 23rpx;
					float: right;
					margin-top:4rpx;
					position: absolute;
					top: 50%;
					margin-top: -7rpx;
					right: 0;
				}
			}
			.share, .save {
				margin: 70rpx 0 26rpx;
				height: 90rpx;
				background: #00D093;
				border-radius: 50rpx;
				font-size: 34rpx;
				line-height: 90rpx;
				text-align: center;
				color: #fff;
			}
			.save {
				margin: 0 5rpx;
				color: #00D093;
				background: #F5FDFB;
				border: 1rpx solid rgba(0,208,147,0.4);
			}
		}
	}
	
	.setting {
		z-index: 2;
		.inner {
			background: #fff;
			padding: 0 30rpx;
			border-radius: 18rpx;
		}
		.item {
	    	height: 120rpx;
	    	position: relative;
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
					font-weight: 300;
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
					font-weight: 300;
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
						width: 68rpx;
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
		font-weight: 300;
		.h5Txt {
			padding: 0 24rpx;
			border-right: 1rpx solid #9AA1AB;
			&.noborder {
				border: none;
			}
		}
	}
}

</style>