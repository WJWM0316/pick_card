<template>
	<view class="experience">
		<view class="work" v-if="type == 'work'">
			<view class="item">
				<view class="itemCon">
					<view class="left requst">公司</view>
					<view class="right">
						<input type="text" v-model="name" placeholder="请输入公司名字" placeholder-style="color:#B2B6C2">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">职位</view>
					<view class="right">
						<input type="text" v-model="position" placeholder="请输入您的职位" placeholder-style="color:#B2B6C2">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">开始时间</view>
					<view class="right">
						<picker mode='date' @change="startDateChange" :value="startTime" fields=month>
							<view class="picker">
					      <text class="placeholder" v-show="startTime === ''">开始时间</text>{{startTime}}
					    </view>
						</picker>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">结束时间</view>
					<view class="right">
						<picker mode='date' @change="endDateChange" :value="endTime" fields=month>
							<view class="picker">
					      <text class="placeholder" v-show="endTime === ''">结束时间</text>{{endTime}}
					    </view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="education" v-if="type == 'education'">
			<view class="item">
				<view class="itemCon">
					<view class="left requst">学校</view>
					<view class="right">
						<input type="text" v-model="name" placeholder="请输入学校名称" placeholder-style="color:#B2B6C2">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">开始时间</view>
					<view class="right">
						<picker mode='date' @change="startDateChange" :value="startTime">
							<view class="picker">
					      <text class="placeholder" v-show="startTime === ''">开始时间</text>{{startTime}}
					    </view>
						</picker>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">结束时间</view>
					<view class="right">
						<picker mode='date' @change="endDateChange" :value="endTime">
							<view class="picker">
					      <text class="placeholder" v-show="endTime === ''" custom-item="至今">结束时间</text>{{endTime}}
					    </view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="btn">
			<button class="remove">删除</button>
			<button class="save" @tap="save">保存</button>
		</view>
	</view>
</template>
<script>
	import {getEducationsInfoApi, postEducationsInfoApi, putEducationsInfoApi, deleteEducationsInfoApi} from '@/api/pages/user'
	export default {
		components: {
	  },
		data () {
			return {
				type: '',
				name: '',
				position: '',
				startTime: '',
				endTime: ''
			}
		},
		onLoad (option) {
			this.type = option.type
			this.vkey = option.vkey
		},
		onReady () {
		},
		methods: {
			save () {
				if (this.type === 'education') {
					const data = {
						name: this.name,
						start_time : this.startTime,
						end_time: this.endTime
					}
					postEducationsInfoApi(data).then(res => {

					})
				}
				
			},
			startDateChange (e) {
				this.startTime = e.mp.detail.value
			},
			endDateChange (e) {
				this.endTime = e.mp.detail.value
				if (this.startTime === this.endTime) {
					wx.showToast({
						title: '结束时间不能等于开始时间',
						icon: 'none'
					})
					this.endTime = ''
				}
				if (this.startTime > this.endTime) {
					wx.showToast({
						title: '结束时间不能小于开始时间',
						icon: 'none'
					})
					this.endTime = ''
				}

			}
		}
			
	}
</script>
<style lang="less" type="text/less" scoped>
	.experience {
		width: 100%;
		min-height: 100%;
		background: #F5F7FA;
		padding-top: 20rpx;
		box-sizing: border-box;
		.item {
				padding: 0 0 0 50rpx;
		    height: 120rpx;
		    background: #fff;
				.itemCon {
					padding-right: 50rpx;
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
		.btn {
			width: 100%;
			padding: 30rpx 40rpx;
			box-sizing: border-box;
			position: fixed;
			background: #fff;
			left: 0;
			bottom: 0;
			overflow: hidden;
			.remove {
				width: 260rpx;
				height: 98rpx;
				line-height: 98rpx;
				font-size:32rpx;
				color: #fff;
				background: #DCE3EE;
				float: left;
				border-radius: 50rpx;
			}
			.save {
				width: 380rpx;
				height: 98rpx;
				line-height: 98rpx;
				font-size:32rpx;
				color: #fff;
				background: #00D093;
				float: left;
				margin-left: 30rpx;
				border-radius: 50rpx;
			}
		}
	}
</style>