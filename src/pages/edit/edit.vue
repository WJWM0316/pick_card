<template>
	<view class="edit">
		<section class="block">
			<view class="title">基本信息</view>
			<view class="head item">
				<view class="itemCon">
					<view class="left requst">头像</view>
					<view class="right"><image class="headImg" src="/static/images/img.jpg"></image></view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">姓名</view>
					<view class="right"><input type="text" placeholder="请输入姓名" placeholder-style="color:#B2B6C2"></view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">性别</view>
					<view class="right">
						<radio-group class="radio-group" @change="radioChange">
						  <label class="radio">
						    <radio value="1" color="#00D093"/><text>男</text>
						  </label>
						  <label class="radio">
						    <radio value="2" color="#00D093"/><text>女</text>
						  </label>
						</radio-group>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left">所在地</view>
					<view class="right">
						<picker mode='region' @change="regionChange" :value="region">
							<view class="picker">
					      <text class="placeholder" v-show='region.length === 0'>请选择所在地</text>{{region[0]}} {{region[1]}} {{region[2]}}
					    </view>
						</picker>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">职业方向</view>
					<view class="right">
						<picker mode='selector' :range="careerList" @change="careerChange" :value="career">
							<view class="picker">
					      <text class="placeholder" v-show='career === null'>请选择职业方向</text><text></text>{{careerList[career]}}
					    </view>
						</picker>
					</view>
					<!-- <view class="right">
						<label class="label">设计</label>
						<label class="label">设计</label>
						<label class="label">设计</label>
						<label class="label">设计</label>
						<label class="label">设计</label>
						<label class="label">设计</label>
						<label class="label">设计</label>
						<label class="label">设计</label>
					</view> -->
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">擅长领域</view>
					<view class="right" @tap.stop="showLablePopFun">
						<view class="fieldBox">
							<text class="field">知识付费 | 知识付费</text>
						</view>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">职业</view>
					<view class="right">
						<input type="text" placeholder="请输入职业" placeholder-style="color:#B2B6C2">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">最近入职公司</view>
					<view class="right">
						<input type="text" placeholder="请输入公司名称" placeholder-style="color:#B2B6C2">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left">公司地址</view>
					<view class="right">
						<input type="text" placeholder="请输入公司地址" placeholder-style="color:#B2B6C2">
					</view>
				</view>
			</view>
		</section>
		<section class="block">
			<view class="title">联系方式</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">手机号码</view>
					<view class="right">
						<input type="number" placeholder="请输入手机号码" placeholder-style="color:#B2B6C2">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left">微信号</view>
					<view class="right">
						<input type="text" placeholder="请输入微信号" placeholder-style="color:#B2B6C2">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left">邮箱地址</view>
					<view class="right">
						<input type="text" placeholder="请输入邮箱地址" placeholder-style="color:#B2B6C2">
					</view>
				</view>
			</view>
		</section>
		<section class="block">
			<view class="title">个人签名</view>
			<view class="item sign">
				<view class="itemCon">
					<textarea name="" maxlength="25" placeholder="用一句话介绍你自己吧~" placeholder-style="color:#B2B6C2"></textarea>
					<text class="number">1/25</text>
				</view>
			</view>
		</section>
		<section class="btn">
			<button>保存资料</button>
		</section>
		<label-pop :isShow="showLablePop"></label-pop>
	</view>
</template>
<script>
	import labelPop from '@/components/labelPop'
	export default {
		components: {
			labelPop
	  },
		data () {
			return {
				isSelf:
				 false,
				vkey: '',
				imgList: ['/static/images/img.jpg'],
				userInfo: {},
				educationsInfo: {},
				workInfo: {},
				region: [],
				careerList: [
					'吃鸡吧',
					'吃鸭吧',
					'吃狗吧',
					'吃猫吧',
					'吃屎吧',
				],
				showLablePop: false, // 擅长领域
				career: null
			}
		},
		onLoad (option) {
			this.vkey = option.vkey
		},
		onReady () {

		},
		methods: {
			showLablePopFun () {
				this.showLablePop = true
			},
			careerChange (e) {
				console.log('picker发送选择改变，携带值为', e.mp.detail.value)
				this.career = e.mp.detail.value
			},
			regionChange (e) {
				console.log('picker发送选择改变，携带值为', e.mp.detail.value)
				this.region = e.mp.detail.value
			}
		}
			
	}
</script>
<style lang="less" type="text/less" scoped>
	.edit {
		background: #FAFBFC;
		.block {
			background: #fff;
			.title {
				font-size: 32rpx;
				color: #353943;
				line-height: 80rpx;
				padding: 0 40rpx;
				background: #FAFBFC;
			}
			.item {
				padding: 0 50rpx;
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
						padding-left: 22rpx;
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
							font-size: 28rpx;
							color: #353943;
							.placeholder {
								color: #C3C9D4;
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
			.head {
				height: 200rpx;
				padding: 0 40rpx 0 50rpx;
				.headImg {
					width: 140rpx;
					height: 140rpx;
					display: block;
					border-radius: 50%;
				}
			}
			.occupation {
				height: 302rpx;
			}
		}
		.btn {
			margin-top: 99rpx;
			background: #fff;
			padding: 30rpx 40rpx;
			button {
				width: 100%;
				height: 98rpx;
				line-height: 98rpx;
				color: #fff;
				font-size: 32rpx;
				background: rgba(0,208,147,1);
				border-radius: 49rpx;
			}
		}
	}
</style>