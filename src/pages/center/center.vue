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
						<image class="headImg" :src="info.avatar_info.smallImgUrl || '/static/images/new_pic_defaulhead.jpg'"></image>
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
				<button open-type="share" class="share">发名片</button>
				<button class="save">保存我的名片</button>
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
					<navigator target="miniProgram" app-id="wxdf4966c8f6916d05" version="develop" url="pages/home/index">
					<view class="item">
						<view class="itemCon">
							<view class="left">职场学习社区</view>
							<view class="right">
								<text>百万职场人都在学</text>
								<image class="hot" src="/static/images/icon_hot@2x.png"></image>
								<!-- <image src="/static/images/"></image> -->
							</view>
						</view>
					</view>
					</navigator>
				</view>
			</viwe>
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
			if (this.userInfo) {
				this.info = this.userInfo
				this.info.other_info.realm_info.forEach(e => {
					this.checkedTextList.push(e.name)
				})
			}
			if (!this.isShareImg) {
			      let data = {
			      	uid: this.info.id,
			      	name: this.info.name,
			      	img: this.info.avatar_info.smallImgUrl,
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
		      }
		},
		onShareAppMessage: function (res) {
	    if (res.from === 'button') {
	      // 来自页面内转发按钮
	      console.log(res.target)
      	return {
		      title: this.shareInfo.mycard.content,
		      path: `/pages/detail?vkey=${this.info.vkey}`,
		      imageUrl: this.isShareImg
		    }
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
		background: #fff;
		padding: 40rpx 35rpx 44rpx;
		border-radius:18rpx;
		margin-bottom: 30rpx;
		.head {
			height: 160rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 5rpx;
			.name {
				color: #353943;
				font-size: 56rpx;
				line-height: 56rpx;
				font-weight: 500;
			}
			.job {
				color: #353943;
				font-size: 32rpx;
				line-height: 32rpx;
				font-weight: light;
				margin-top: 10rpx;
			}
			.headImg {
				height: 160rpx;
				width: 160rpx;
				border-radius: 50%;
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
			background: rgba(0,208,147,0.04);
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
		    font-size: 28rpx;
				line-height: 28rpx;
		    .left {
					color: #353943;
					font-weight: light;
					position: relative;
					.titleMsg {
						font-size: 28rpx;
						color: #C3C9D4;
						float: right;
					}
		  	}
		  	.right {
					text-align: right;
					overflow: hidden;
					.jumpIcon {
						width: 18rpx;
						height: 30rpx;
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
}

</style>