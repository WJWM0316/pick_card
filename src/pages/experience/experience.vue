<template>
	<view class="experience">
		<view class="work" v-if="option.type == 'work'">
			<view class="item">
				<view class="itemCon">
					<view class="left requst">公司</view>
					<view class="right">
						<input type="text" v-model.lazy="info.name" placeholder="请输入公司名字" placeholder-style="color:#B2B6C2" maxlength="50">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">职位</view>
					<view class="right">
						<input type="text" v-model.lazy="info.position" placeholder="请输入您的职位" placeholder-style="color:#B2B6C2" maxlength="20">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">开始时间</view>
					<view class="right">
						<picker mode='date' @change="startDateChange" :value="info.start_time_desc || nowTime" fields=month>
							<view class="picker">
					      <text class="placeholder" v-show="info.start_time_desc === ''">开始时间</text>{{info.start_time_desc}}
					      <image class="icon" src="/static/images/icon_chevron@2x.png"></image>
					    </view>
						</picker>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">结束时间</view>
					<view class="right endTime">
						<view class="choseNow">
							<image class="icon" v-if="isNow" @tap="choseNow('isNowWork')" src="/static/images/edittime_btn_select_sel@3x.png"></image>
							<image class="icon" v-if="!isNow" @tap="choseNow('isNowWork')" src="/static/images/edittime_btn_select_nor@3x.png"></image>
							至今
						</view>
						<picker mode='date' @change="endDateChange" :value="info.end_time_desc || nowTime" fields=month :disabled="isNow">
							<view class="picker" :class="{'disabled' : isNow}">
					      <text class="placeholder" v-show="info.end_time_desc === ''">结束时间</text>{{info.end_time_desc}}
					      <image class="icon" src="/static/images/icon_chevron@2x.png"></image>
					    </view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="education" v-if="option.type == 'education'">
			<view class="item">
				<view class="itemCon">
					<view class="left requst">学校</view>
					<view class="right">
						<input type="text" v-model.lazy="info.name" placeholder="请输入学校名称" placeholder-style="color:#B2B6C2" maxlength="20">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">开始时间</view>
					<view class="right">
						<picker mode='date' @change="startDateChange" :value="info.start_time_desc || nowTime" fields=month>
							<view class="picker">
					      <text class="placeholder" v-show="info.start_time_desc === ''">开始时间</text>{{info.start_time_desc}}
					      <image class="icon" src="/static/images/icon_chevron@2x.png"></image>
					    </view>
						</picker>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">结束时间</view>
					<view class="right endTime">
						<view class="choseNow">
							<image class="icon" v-if="isNow" @tap="choseNow('isNowStudy')" src="/static/images/edittime_btn_select_sel@3x.png"></image>
							<image class="icon" v-if="!isNow" @tap="choseNow('isNowStudy')" src="/static/images/edittime_btn_select_nor@3x.png"></image>
							至今
						</view>
						<picker mode='date' @change="endDateChange" :value="info.end_time_desc || nowTime" fields=month :disabled="isNow">
							<view class="picker" :class="{'disabled' : isNow}">
					      <text class="placeholder" v-show="info.end_time_desc === ''">结束时间</text>{{info.end_time_desc}}
					      <image class="icon" src="/static/images/icon_chevron@2x.png"></image>
					    </view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="btn">
			<button class="remove" @tap="remove" v-show="option.id !== 'undefined'">删除</button>
			<button class="save" @tap="save">保存</button>
		</view>
	</view>
</template>
<script>
	import {getEducationsInfoApi, postEducationsInfoApi, putEducationsInfoApi, deleteEducationsInfoApi, getWorkInfoApi, postWorkInfoApi, putWorkInfoApi, deleteWorkInfoApi} from '@/api/pages/user'
	import {mapState} from 'vuex'
	import {formatTime} from '@/utils/index'
	export default {
		
		components: {
	  },
		data () {
			return {
				option: {},
				type: '',
				title: '',
				info: {
					name: '',
					position: '',
					start_time_desc: '',
					end_time_desc: ''
				},
				nowTime: '',
				isNow: false,
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.global.userInfo
			})
		},
		onLoad (option) {
			this.option = option
		},
		onShow () {
			if (this.option.type == 'education') {
				wx.setNavigationBarTitle({
				  title: '编辑教育经历'
				})
			} else {
				wx.setNavigationBarTitle({
				  title: '编辑工作经历'
				})
			}
			this.isNow = false
			this.nowTime = formatTime(new Date(), 'YYYY-MM')
			if (this.option.id !== 'undefined') {
				this.getInfo()
			} else {
				this.info = {
					name: '',
					position: '',
					start_time_desc: '',
					end_time_desc: ''
				}
			}
			console.log(this.nowTime, this.info.end_time_desc, this.nowTime === this.info.end_time_desc, 11111111111)
			if (this.nowTime === this.info.end_time_desc) {
				this.isNow = true
			}
		},
		onReady () {
		},
		methods: {
			choseNow () {
				this.isNow = !this.isNow
			},
			save () {
				let title = ''
				let isForbid = false
				if (this.option.type == 'education') {
					if (this.info.name === '' || this.info.name.length < 2 || this.info.name.length > 100) {
						if (this.info.name === '') {
							title = '请填写学校名称'
						} else if (this.info.name.length < 2) {
							title = '学校名称需为2-100个字'
						} else if (this.info.name.length > 100) {
							title = '学校名称最多输入100个字'
						}
						wx.showToast({
						  title: title,
						  icon: 'none',
						  duration: 1000
						})
						return
					}
					if (this.info.start_time_desc === '') {
						title = '请选择起始时间'
						wx.showToast({
						  title: title,
						  icon: 'none',
						  duration: 1000
						})
						return
					}
					if (this.info.end_time_desc === '' && !this.isNow) {
						title = '请选择结束时间'
						wx.showToast({
						  title: title,
						  icon: 'none',
						  duration: 1000
						})
						return
					}
				}
				if (this.option.type == 'work') {
					if (this.info.name === '' || this.info.name.length < 2 || this.info.name.length > 50) {
						if (this.info.name === '') {
							title = '请填写公司名称'
						} else if (this.info.name.length < 2) {
							title = '公司名称需为2-50个字'
						} else if (this.info.name.length > 50) {
							title = '公司名称最多输入50个字'
						}
						wx.showToast({
						  title: title,
						  icon: 'none',
						  duration: 1000
						})
						return
					}
					if (this.info.position === '' || this.info.position.length < 2 || this.info.position.length > 20) {
						if (this.info.position === '') {
							title = '请填写职位'
						} else if (this.info.position.length < 2) {
							title = '职位名称需为2-20个字'
						} else if (this.info.position.length > 20) {
							title = '职位名称最多输入20个字'
						}
						wx.showToast({
						  title: title,
						  icon: 'none',
						  duration: 1000
						})
						return
					}
					if (this.info.start_time_desc === '') {
						title = '请选择起始时间'
						wx.showToast({
						  title: title,
						  icon: 'none',
						  duration: 1000
						})
						return
					}
					if (this.info.end_time_desc === '' && !this.isNow) {
						title = '请选择结束时间'
						wx.showToast({
						  title: title,
						  icon: 'none',
						  duration: 1000
						})
						return
					}
				}
				if ((this.info.start_time_desc > this.info.end_time_desc && this.info.end_time_desc) || (this.isNow && this.info.start_time_desc > this.nowTime)) {
					wx.showToast({
						title: '开始时间不能大于于结束时间',
						icon: 'none'
					})
					this.info.start_time_desc = ''
					return
				}
				function saveFun () {
					wx.showToast({
						title: '保存成功',
						icon: 'success',
						success: function () {
							setTimeout(function () {
								wx.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				}
				const {type, id} = this.option
				if (type === 'education') {
					let data = {
						name: this.info.name,
						start_time :this.info.start_time_desc,
						end_time: this.info.end_time_desc
					}
					if (this.isNow) {
						data.end_time = this.nowTime
					}
					if (id !== 'undefined') {
						data.id = id
						putEducationsInfoApi(data).then(res => {
							saveFun()
						})
					} else {
						postEducationsInfoApi(data).then(res => {
							saveFun()
						})
					}
				} else if (type === 'work') {
					let data = {
						name: this.info.name,
						position: this.info.position,
						start_time : this.info.start_time_desc,
						end_time: this.info.end_time_desc
					}
					if (this.isNow) {
						data.end_time = this.nowTime
					}
					if (id !== 'undefined') {
						data.id = id
						putWorkInfoApi(data).then(res => {
							saveFun()
						})
					} else {
						postWorkInfoApi(data).then(res => {
							saveFun()
						})
					}
					
				}
			},
			remove () {
				let _this = this
				let title = ''
				if (this.option.type === 'work') {
					title = '是否删除本段工作经历'
				} else {
					title = '是否删除本段教育经历'
				}
				wx.showModal({
					content: title,
					success: function (res) {
						if (res.confirm) {
				      function removeFun () {
								wx.showToast({
									title: '删除成功',
									icon: 'success',
									success: function () {
										setTimeout(function () {
											wx.navigateBack({
												delta: 1
											})
										}, 1000)
									}
								})
							}
							const {type, id} = _this.option
							if (type === 'education') {
								deleteEducationsInfoApi({id}).then(res => {
									removeFun()
								})
							} else if (type === 'work') {
								deleteWorkInfoApi({id}).then(res => {
									removeFun()
								})
							}
				    } else if (res.cancel) {
				      console.log('用户点击取消')
				    }
					}
				})
			},
			getInfo () {
				console.log(this.userInfo.other_info)
				const {type, id} = this.option
				let list = {}
				if (type === 'work') {
					list = this.userInfo.other_info.career_info
				} else {
					list = this.userInfo.other_info.education_info
				}
				list.filter(item => {
					if (item.id == id) {
						this.info = item
					}
				})
			},
			startDateChange (e) {
				this.info.start_time_desc = e.mp.detail.value
				console.log(this.info.start_time_desc, this.info.end_time_desc, this.info.start_time_desc > this.info.end_time_desc)
				
			},
			endDateChange (e) {
				this.info.end_time_desc = e.mp.detail.value
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
						&.endTime {
							display: flex;
							justify-content: space-between;
							align-items: center;
							.choseNow {
								font-size: 28rpx;
								color: #9AA1AB;
								margin-right: 47rpx;
								.icon {
									width: 40rpx;
									height: 40rpx;
									margin-right: 10rpx;
									vertical-align:-10rpx;
								}
							}
						}
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
							&.disabled {
								color: #C3C9D4;
							}
							.icon {
								width: 18rpx;
								height: 30rpx;
								margin-left: 16rpx;
								vertical-align: -4rpx;
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
			display: flex;
			overflow: hidden;
			.remove {
				flex-basic: 260rpx;
				width: 260rpx;
				height: 98rpx;
				line-height: 98rpx;
				font-size:32rpx;
				color: #fff;
				background: #DCE3EE;
				float: left;
				border-radius: 50rpx;
				margin-right: 30rpx;
			}
			.save {
				flex: 1;
				height: 98rpx;
				line-height: 98rpx;
				font-size:32rpx;
				color: #fff;
				background: #00D093;
				float: left;
				border-radius: 50rpx;
			}
		}
	}
</style>