<template>
	<view class="labelPop" v-if="isShow" @touchmove.stop="preventEvevt">
		<view class="inner" v-if="type === 'labelBox'">
			<view class="title">请选择1~3个领域<image @tap.stop="close" class="close" src="/static/images/popup_btn_close_nor@3x.png"></image></view>
			<view class="con">
				<labelBox class="labelBox">
					<label  v-for="(item, index) in labelList" :key="index">
						<text class="label" :class="{'check' : item.check}" @tap="select(item, index)">{{item.name}}</text>
					</label>
				</labelBox>
				<button @tap.stop="save" class="btn">保存</button>
			</view>
		</view>
		<view class="inner custom" v-show="type === 'custom'">
			<view class="title">添加自定义标签<image @tap.stop="close" class="close" src="/static/images/popup_btn_close_nor@3x.png"></image></view>
			<view class="con">
				<input class="labelInput" focus=true type="text" v-model="customText" maxlength="10" placeholder="有趣的标签更吸引关注哦~" placeholder-style="color:#B2B6C2" />
				<text class="textNum" v-show="customText.length > 0">{{10 - customText.length}}</text>
				<text class="textNum" v-else">10</text>
				<button @tap.stop="addFun" class="btn">添加标签</button>
			</view>
		</view>
	</view>
</template>
<script>
	import {postGetLabelByIds} from '@/api/pages/login'
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: 'labelBox'
			}
		},
		data () {
			return {
				labelList: [],
				checkedList: [],
				customText: '',
				num: 0
			}
		},
		watch: {
			isShow (val) {
				if (val) {
					this.customText = ''
				}
			},
			type () {},
			customText (val) {}
		},
		onLoad () {
			if (this.type !== 'custom') {
				this.getLabelList()
			}
		},
		methods: {
			getLabelList () {
				const data = {
					labelType: '1'
				}
				postGetLabelByIds(data).then(res => {
					this.labelList = res.data[0].son
				})
			},
			getLabel (index) {
				return index
			},
			close () {
				this.$emit('close')
			},
			addFun () {
				this.$emit('addLable', this.customText)
				this.$emit('close')
			},
			save () {
				if (this.num === 0) {
					wx.showToast({
					  title: '请至少选择一个标签',
					  icon: 'none',
					  duration: 2000
					})
					return
				}
				let labelId = []
				let labelText = []
				this.checkedList.filter(item => {
					labelId.push(item.id)
					labelText.push(item.name)
				})
				let showList = []
				labelId = labelId.join(',')
				this.$emit('getLabel', labelId, labelText)
			},
			select (item, index) {
				if (item.check) {
					let data = this.labelList[index]
					data.check = false
					this.labelList.splice(index, 1, data)
					this.num --
					this.checkedList.forEach((e, index) => {
						if (item.id === e.id) {
							this.checkedList.splice(index, 1)
						}
					})
				} else {
					let data = this.labelList[index]
					data.check = true
					this.labelList.splice(index, 1, data)
					this.checkedList.push(item)
					this.num ++
					if (this.num > 3) {
						this.labelList.forEach((e,index) => {
							if (this.checkedList[0].id === e.id) {
								this.labelList[index].check = false
								this.num --
							}
						})
						this.checkedList.splice(0, 1)

					}
				}
				console.log('已选择', this.checkedList)
			},
			preventEvevt (e) {
				e.preventDefault()
				e.stopPropagation()
			}
		}
	}
</script>
<style lang="less" type="text/less" scoped>
	.labelPop {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.4);
		padding: 138rpx 40rpx 0;
		box-sizing: border-box;
		z-index: 2;
		.inner {
			width: 670rpx;
			background: #fff;
			border-radius: 18rpx;
			.title {
				text-align: center;
				font-size: 32rpx;
				color: #353943;
				font-weight: 500;
				line-height: 92rpx;
				padding: 0 34rpx;
				box-shadow: 0px 1rpx 0px 0px rgba(53,57,67,0.1);
				.close {
					width: 28rpx;
					height: 28rpx;
					float: right;
					margin-top: 32rpx;
				}
			}
			.con {
				padding: 60rpx 30rpx 40rpx;
				font-size: 0;
				.labelBox {
					height: 500rpx;
					overflow-y: auto;
					display: block;
				}
				.label {
					padding: 0 30rpx;
					font-size: 28rpx;
					color: #9AA1AB;
					line-height: 58rpx;
					text-align: center;
					border-radius: 29rpx;
					border: 1rpx solid rgba(178,182,194,0.4);
					box-sizing: border-box;
					white-space: nowrap;
					display: inline-block;
					margin-right: 20rpx;
					margin-bottom: 30rpx;
					&.check {
						border-color: rgba(0,208,147,1);
						background: rgba(0,208,147,0.1);
						color: #00D093;
					}
				}
				.btn {
					width: 570rpx;
					height: 98rpx;
					line-height: 98rpx;
					box-sizing: border-box;
					background: rgba(0,208,147,1);
					border-radius: 49rpx;
					color: #fff;
					text-align: center;
					margin: 10rpx auto 0;
				}
			}
		}
		.custom {
			.con {
				position: relative;
				.labelInput {
					padding: 0 40rpx;
					box-sizing: border-box;
					width:550rpx;
					height:88rpx;
					background:rgba(249,249,249,1);
					border-radius:44rpx;
					margin: 0 auto 52rpx;
					color: #353943;
					font-size: 28rpx;
					display: block;
				}
				.textNum {
					position: absolute;
					top: 85rpx;
					right: 100rpx;
					font-size: 26rpx;
					color: #B2B6C2;
				}
			}
		}
	}
	checkbox  {
		appearance: none;
		display: none;
	}
	
</style>