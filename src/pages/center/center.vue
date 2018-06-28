<template>
	<view class="center">
		<view class="main">
			<view class="head">
				<view class="msg">
					<view class="name">{{info.nickname}}</view>
					<view class="job">{{info.occupation}}</view>
				</view>
				<image class="headImg" :src="info.avatar_info.middleImgUrl"></image>
			</view>
			<view class="con">
				<view class="product"><image class="icon" src="/static/images/me_icon_company@2x.png"></image>{{info.company}}</view>
				<view class="position"><image class="icon" src="/static/images/me_icon_territory@2x.png"></image>实打实大所<image class="san" src="/static/images/me_icon_edit_chevron@2x.png"></image></view>
			</view>
			<button class="share">发名片</button>
			<button class="save">保存我的名片</button>
		</view>
		<viwe class="setting">
			<view class="inner">
				<view class="item" @tap="toJump()">
					<view class="itemCon">
						<view class="left">隐私设置</view>
						<view class="right">
							<image class="jumpIcon" src="/static/images/icon_chevron@2x.png"></image>
						</view>
					</view>
				</view>
				<navigator target="miniProgram" app-id="wxdf4966c8f6916d05" version="trial" url="pages/home/index">
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
</template>
<script>
	import {mapState} from 'vuex'
	import {putPrivacyApi} from '@/api/pages/user'
	export default {
		components: {
	  },
		data () {
			return {
				info: {

				}
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.global.userInfo
			}),
		},
		onLoad (option) {
			this.vkey = option.vkey
			if (this.userInfo && this.userInfo.other_info.more_info) {
				this.info = this.userInfo.other_info.more_info
			}
		},
		onShow () {
		},
		methods: {
			toJump () {
				wx.navigateTo({
	        url: `/pages/privacy/main`
	      })
			}
	  }
	}
</script>
<style lang="less" type="text/less" scoped>
.center {
	padding: 28rpx 40rpx;
	min-height: 100%;
	box-sizing: border-box;
	background: #F5F7FA;
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
			.position {
				margin-top: 16rpx;
			}
			.icon {
				width: 30rpx;
				height: 30rpx;
				vertical-align:sub;
				magrin-right: 11rpx;
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