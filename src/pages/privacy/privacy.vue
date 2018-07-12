<template>
	<view class="privacy">
		<view class="item">
			<view class="itemCon">
				<view class="left">手机号码</view>
				<view class="right">
					<picker mode='selector' @change="mobileChange" :value="mobile" :range="list">
						<view class="picker">
				     	{{list[mobile]}}
				     	<image class="icon" src="/static/images/icon_chevron@2x.png"></image>
				    </view>
				   
					</picker>
				</view>
			</view>
		</view>
		<view class="item">
			<view class="itemCon">
				<view class="left">微信号</view>
				<view class="right">
					<picker mode='selector' @change="weChatChange" :value="weChat" :range="list">
						<view class="picker">
				     	{{list[weChat]}}
				     	<image class="icon" src="/static/images/icon_chevron@2x.png"></image>
				    </view>
					</picker>
				</view>
			</view>
		</view>
		<view class="item">
			<view class="itemCon noborder">
				<view class="left">邮箱</view>
				<view class="right">
					<picker mode='selector' @change="emailChange" :value="email" :range="list">
						<view class="picker">
				     	{{list[email]}}
				     	<image class="icon" src="/static/images/icon_chevron@2x.png"></image>
				    </view>
					</picker>
				</view>
			</view>
		</view>
		<view class="item last">
			<view class="itemCon noborder">
				<view class="left">右滑直接交换名片</view>
				<view class="right">
					<switch :checked="card === 1" @change="switchChange" color="#00D093"/>
				</view>
			</view>
		</view>
		<view class="tip">开启后，其他人右滑我的名片，双方即可直接交换名片</view>
	</view>
</template>
<script>
	import {putPrivacyApi} from '@/api/pages/user'
	export default {
		components: {
	  },
		data () {
			return {
				userInfo: {},
				list: ['互换名片后可见', '任何人可见', '任何人都不可见'],
				mobile: 0,
				weChat: 0,
				email: 0,
				card: 1,
			}
		},
		onLoad (option) {
			this.vkey = option.vkey
		},
		onShow () {
			this.userInfo = this.$store.getters.userInfo
			this.mobile = this.userInfo.privacy_mobile - 1
			this.weChat = this.userInfo.privacy_wechat - 1
			this.email = this.userInfo.privacy_email - 1
			this.card = this.userInfo.can_change_card
		},
		methods: {
			mobileChange (e) {
				this.mobile = e.mp.detail.value
				this.submit()
			},
			weChatChange (e) {
				this.weChat = e.mp.detail.value
				this.submit()
			},
			emailChange (e) {
				this.email = e.mp.detail.value
				this.submit()
			},
			switchChange (e) {
				if (e.mp.detail.value) {
					this.card = 1
				} else {
					this.card = 0
				}
				this.submit()
			},
			submit () {
				const data = {
					privacy_mobile: parseInt(this.mobile) + 1,
					privacy_wechat: parseInt(this.weChat) + 1,
					privacy_email: parseInt(this.email) + 1,
					can_change_card: this.card
				}
				this.userInfo.privacy_mobile = data.privacy_mobile
				this.userInfo.privacy_wechat = data.privacy_wechat
				this.userInfo.privacy_email = data.privacy_email
				this.userInfo.can_change_card = data.can_change_card
				this.$store.dispatch('userInfo', this.userInfo)
				putPrivacyApi(data).then(res => {
					console.log(res, "设置成功")
				})
			}
	  }
	}
</script>
<style lang="less" type="text/less" scoped>
.privacy {
	width: 100%;
	min-height: 100%;
	background: #F5F7FA;
	padding-top: 20rpx;
	box-sizing: border-box;
	.item {
			padding: 0 0 0 40rpx;
	    height: 120rpx;
	    background: #fff;
	    &.last {
				margin-top: 20rpx;
	  	}
			.itemCon {
				padding-right: 40rpx;
				height: 100%;
				border-bottom: 1rpx solid rgba(53,57,67,0.1);
				box-sizing: border-box;
				display: flex;
		    align-items: center;
		    justify-content: space-between;
		    font-size: 28rpx;
				line-height: 28rpx;
				&.noborder {
					border: none;
				}
				&.labelBox {
					justify-content: start;
					aligh-items: space-between;
					flex-wrap: wrap;
					padding: 46rpx 0 40rpx;
					.left {
						width: 100%;
					}
				}
		    .left {
					color: #353943;
					font-weight: light;
					position: relative;
					.titleMsg {
						font-size: 28rpx;
						color: #C3C9D4;
						float: right;
					}
					&.requst::after {
						content: '*';
						color: #FF3636;
						font-size: 28rpx;
						position: absolute;
						top: 50%;
						margin-top: -8rpx;
						left: 0;
					}
		  	}
		  	.right {
					text-align: right;
					overflow: hidden;
					input {
						width: 450rpx;
						height: 120rpx;
						line-height: 120rpx;
					}
					.placeholder {
						color: #B2B6C2;
					}
					.radio {
						font-size: 0;
						margin-left: 50rpx;
						width: 44rpx;
						height: 44rpx;
						text {
							font-size: 28rpx;
							vertical-align: middle;
							margin-left: 12rpx;
						}
					}
					.picker {
						height: 120rpx;
						line-height: 120rpx;
						font-size: 28rpx;
						color: #353943;
						.placeholder {
							color: #C3C9D4;
						}
						.icon {
							width: 18rpx;
							height: 30rpx;
							margin-left: 16rpx;
							vertical-align:-4rpx;
						}
					}
					.label {
						float: left;
						margin-right: 22rpx;
						margin-top: 26rpx;
						text-align: center;
						width: 146rpx;
						height: 58rpx;
						border-radius: 29rpx;
						border: 1rpx solid rgba(178,182,194,0.4);
						box-sizing: border-box;
						color: #9AA1AB;
						line-height: 58rpx;
						&:nth-child(4n) {
							margin-right: 0;
						}
					}
					.fieldBox {
						white-space: nowrap;
					}
		  	}
			}
			&.sign {
				height: 180rpx;
				padding: 30rpx 50rpx;
				box-sizing: border-box;
				.itemCon {
					display: block;
				}
				textarea {
					width: 100%;
					height: 74rpx;
					font-size: 28rpx;
					line-height: 1.4;
					overflow:hidden;
				}
				.number {
					float: right;
					color: #B2B6C2;
					margin-top: 10rpx;
					font-weight: light;
					line-height: 40rpx;
					font-size:28rpx;
				}
			}
			&:last-child {
				.itemCon {
					border: none;
				}
			}
	}
	.tip {
		font-size:26rpx;
		line-height: 26rpx;
		color: #B2B6C2;
		margin: 24rpx 40rpx;
	}
	switch {
		
	}
}
</style>