<template>
	<view class="wrap">
		<view class="content">
			<image class="icon" src="/static/images/interchanger_pic_dafulpage@3x.png"></image>
			<view class="txt">世间最遥远的距离是，我在网络这头，</view>
			<view class="txt">你在网络那头，却断网啦！</view>
			<button class="btn" @tap="back">刷新试试缩短距离</button>
		</view>
	</view>
</template>
<script>
	export default {
		methods: {
			back () {
				wx.navigateBack({
				  delta: 1
				})
			}
		}
	}	
	</script>
<style lang="less" type="text/less" scoped>
	.wrap {
		width: 100%;
		height: 100%;
		background: #F5F7FA;
		display: flex;
		justify-content:center;
		align-items:center;
		.content {
			display: flex;
			justify-content:center;
			align-items:center;
			flex-direction:column;
		}
		.icon {
			width: 288rpx;
			height: 198rpx;
			margin: 0 auto 40rpx;
		}
		.txt {
			color: #9AA1AB;
			font-size: 28rpx;
			line-height: 1.4;
			text-align: center;
		}
		.btn {
			width:570rpx;
			height:100rpx;
			background:rgba(0,208,147,1);
			border-radius:50rpx;
			border:1rpx solid rgba(0,208,147,1);
			color: #fff;
			font-size: 32rpx;
			line-height: 100rpx;
			margin: 100rpx auto 0;
		}
	}
</style>