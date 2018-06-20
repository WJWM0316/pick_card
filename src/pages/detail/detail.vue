<template>
	<view class="detail">
		<!-- 主要展示 -->
		<view class="main card">
			<image class="headImg" src="/static/images/img.jpg"></image>
			<view class="content">
				<view class="mycard" v-if="false">
					<image class="icon" src="/static/images/float_icon_add@3x.png"></image>
					<text>我的名片</text>
				</view>
				<view class="nameBox">
					<view>
						<text class="name">大眼睛</text>
						<image class="sex" src="/static/images/details_icon_female@3x.png"></image>
					</view>
					<image class="share" src="/static/images/deta_btn_edit@3x.png"></image>
				</view>
				<view class="job">絕地雞霸</view>
				<view class="company">職場學習小社區</view>
				<view class="signature">这个人很懒，并不想写个性签名~</view>
				<view class="itemMsg">
					<image class="icon" src="/static/images/details_icon_location@3x.png"></image>
					<text class="msg">廣州市</text>
				</view>
				<view class="itemMsg">
					<image class="icon" src="/static/images/details_icon_territory@3x.png"></image>
					<text class="msg">廣州市</text>
				</view>
				<view class="itemMsg">
					<image class="icon" src="/static/images/details_icon_phone@3x.png"></image>
					<text class="msg isShow">廣州市</text>
				</view>
				<view class="itemMsg">
					<image class="icon" src="/static/images/details_icon_email@3x.png"></image>
					<text class="msg isShow">廣州市</text>
				</view>
				<view class="itemMsg">
					<image class="icon" src="/static/images/details_icon_wechat@3x.png"></image>
					<text class="msg isShow">廣州市</text>
				</view>
			</view>
		</view>
		<!-- 我的人設 -->
		<view class="other card">
			<view class="content">
				<view class="title">
					<image class="icon" src="/static/images/details_icon_label@3x.png"></image>
					<text class="msg">我的人设</text>
				</view>
				<view class="labelBox">
					<text class="label">移动互联网</text>
					<text class="label">前端开发</text>
					<text class="label">爬蟲</text>
					<text class="label">移动互联网</text>
					<text class="label">前端开发</text>
					<text class="label">爬蟲</text>
				</view>
			</view>
		</view>
		<!-- 工作經歷 -->
		<view class="other card">
			<view class="content">
				<image class="share" src="/static/images/deta_btn_edit@3x.png"></image>
				<view class="title">
					<image class="icon" src="/static/images/details_icon_label@3x.png"></image>
					<text class="msg">工作经历</text>
				</view>
				<view class="litm">
					<view class="date">2018年3月 - 2030年8月</view>
					<view class="job">產品經歷</view>
					<view class="company">職場學習小社區</view>
				</view>
				<view class="litm">
					<view class="date">2018年3月 - 2030年8月</view>
					<view class="job">產品經歷</view>
					<view class="company">職場學習小社區</view>
				</view>
				<button class="open">展开查看更多</button>
			</view>
		</view>	
		<!-- 教育經歷 -->
		<view class="other card">
			<view class="content">
				<image class="share" src="/static/images/deta_btn_edit@3x.png"></image>
				<view class="title">
					<image class="icon" src="/static/images/details_icon_label@3x.png"></image>
					<text class="msg">教育经历</text>
				</view>
				<view class="litm">
					<view class="date">2018年3月 - 2030年8月</view>
					<view class="school">產品經歷</view>
				</view>
				<button class="open">展开查看更多</button>
			</view>
		</view>	
		<!-- 更多介紹 -->
		<view class="other card more">
			<view class="content">
				<image class="share more" src="/static/images/deta_btn_edit@3x.png"></image>
				<view class="title">
					<image class="icon" src="/static/images/details_icon_more@3x.png"></image>
					<text class="msg">更多介紹</text>
				</view>
				<view class="article">我就是不写个性签名我就是不写个性签名 我我就是不写个性签名我就是不写个性签名 我我就是不写个性签名我就是不写个性签名 我我就是不写个性签名我就是不写个性签名 我我就是不写个性签名我就是不写个性签名 我我就是不写个性签名我就是不写个性签名 我我就是不写个性签名我就是不写个性签名 我我就是不写个性签名我就是不写个性签名 我</view>
				<view class="imgBox">
					<image  v-for="i in 9" class="img" src="/static/images/img.jpg"></image>
				</view>
			</view>
		</view>
		<view style="height: 140rpx"></view>
		<view class="btnControl">
			<button class="btn apply" v-if="false">申请和TA交换名片</button>
			<button class="btn applying"  v-if="false">已申请和TA交换名片</button>
			<button class="btn applyed" >同意和TA交换名片</button>
			<button class="btn remove" v-if="false">移除名片</button>
		</view>
	</view>
</template>
<script>
	
</script>
<style lang="less" type="text/less">
	.detail {
		background: #FAFBFC;
		padding: 30rpx 40rpx;
		.card {
			width: 100%;
			background: #fff;
			border-radius: 18rpx;
			margin-bottom: 30rpx;
			overflow: hidden;
			box-shadow:0px 10px 30px 0px rgba(153,193,214,0.1), 0px -5px 40px 0px rgba(153,193,214,0.08);
			&.more {
				margin-bottom: 0;
			}
		}
		.main {
			.headImg {
				width: 700rpx;
				height: 700rpx;
			}
			.content {
				padding: 40rpx 30rpx 40rpx 40rpx;
				position: relative;
				.mycard {
					position: absolute;
					right: 0;
					top: 60rpx;
					width:220rpx;
					height:88rpx;
					background: #fff;
					font-size: 28rpx;
					line-height: 28rpx;
					display: flex;
					align-items: center;
					border-radius: 0 0 18rpx 18rpx;
					padding: 24rpx 16rpx 18rpx 32rpx;
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
					.name {
						font-size: 48rpx;
						color: ##353943;
						line-height: 48rpx;
					}
					.sex {
						width: 32rpx;
						height: 32rpx;
						display: inline-block;
						margin-left: 10rpx;
					}
					.share {
						width: 32rpx;
						height: 32rpx;
						float: right;
					}
				}
				.job {
					font-size: 34rpx;
					line-height: 34rpx;
					color: #353943;
					margin-top: 20rpx;
				}
				.company {
					font-size: 28rpx;
					line-height: 28rpx;
					color: #C3C9D4;
					margin-top: 13rpx;
				}
				.signature {
					color: #B2B6C2;
					font-size: 28rpx;
					line-height: 28rpx;
					margin: 40rpx 0 40rpx;
				}
				.itemMsg {
					margin-bottom: 30rpx;
					display: flex;
					align-items: center;
					.icon {
						width: 30rpx;
						height: 30rpx;
						display: inline-block;
						vertical-align: top;
					}
					.msg {
						font-size: 28rpx;
						line-height: 28rpx;
						color: #353943;
						margin-left: 26rpx;
						&.isShow {
							color: #B2B6C2;
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
					position: absolute;
					width: 32rpx;
					height: 32rpx;
					right: 40rpx;
					top: 128rpx;
					&.more {
						top: 55rpx;	
					}
				}
				.title {
					height: 40rpx;
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
						font-weight: 500;
						display: inline-block;
					}
				}
				.labelBox {
					margin-top: 16rpx;
					overflow: hidden;
					.label {
						margin-top: 14rpx;
						padding: 12rpx 26rpx;
						font-size: 24rpx;
						line-height: 24rpx;
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
					line-height: 28rpx;
					font-weight: light;
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
					font-weight: light;
					border-radius:50px;
					border:1rpx solid rgba(220,227,238,1);
					margin-top: 40rpx;
				}
				.article {
					margin-top: 28rpx;
					font-size: 32rpx;
					color: #353943;
					line-height: 46rpx;
					font-weight: light;
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
			height: 140rpx;
			padding: 12rpx 75rpx 30rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			box-sizing: border-box;
			background:rgba(255,255,255,0.8);
			.btn {
				font-size: 32rpx;
				line-height: 98rpx;
				border-radius:50px;
				color: #fff;
				&.apply, &.applyed {
					background: #00D093;	
				}
				&.applying {
					background: rgba(178, 240, 222, 1);
				}
				&.remove {
					background: #DCE3EE;
				}
			}
		} 
	}
</style>