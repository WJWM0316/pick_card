<template>
	<view class="labelPop" v-if="isShow" @touchmove.stop="preventEvevt">
		<view class="inner" v-if="type === 'labelBox'">
			<view class="title">请选择1~3个领域<image @tap.stop="close" class="close" src="/static/images/popup_btn_close_nor@3x.png"></image></view>
			<view class="con">
				<checkbox-group class="labelBox" @change="checkboxChange">
					<label  v-for="(item, index) in labelList" :key="index">
						<checkbox class="checkbox" :value="index + ' ' +item"></checkbox>
						<text class="label">{{item}}</text>
					</label>
				</checkbox-group>
				<button @tap.stop="save" class="btn">保存</button>
			</view>
		</view>
		<view class="inner custom" v-show="type === 'custom'">
			<view class="title">添加自定义标签<image @tap.stop="close" class="close" src="/static/images/popup_btn_close_nor@3x.png"></image></view>
			<view class="con">
				<input class="labelInput" type="text" v-model="customText" maxlength="10" placeholder="有趣的标签更吸引关注哦~" placeholder-style="color:#B2B6C2" data-num="5"/>
				<text class="textNum">{{10 - customText.length}}</text>
				<button @tap.stop="addFun" class="btn">添加标签</button>
			</view>
		</view>
	</view>
</template>
<script>
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
				labelList: [
					'萨达奥术大师',
					'萨达大师',
					'奥术大师',
					'萨达奥术大师',
					'萨达大师',
					'奥术大师',
					'萨达奥术大师',
					'萨达大师',
					'奥术大师',
					'萨达奥术大师',
					'萨达大师',
					'奥术大师',
					'萨达奥术大师',
					'萨达大师',
					'奥术大师',
					'萨达奥术大师',
					'萨达大师',
					'奥术大师',
				],
				checkedList: [],
				customText: ''
			}
		},
		watch: {
			isShow () {},
			type () {},
			customText (val) {}
		},
		methods: {
			getLabel (index) {
				return index
			},
			close () {
				this.$emit('close')
			},
			addFun () {
				this.$emit('close')
			},
			save () {
				let labelIndex = []
				let labelText = []
				this.checkedList.filter(item => {
					let a = item.split(' ')
					labelIndex.push(a[0])
					labelText.push(a[1])
				})
				let showList = []
				this.$emit('getLabel', labelIndex, labelText)
			},
			change () {
				console.log(1111111111)
			},
			checkboxChange (e) {
				this.checkedList = e.mp.detail.value
				console.log(e.mp.detail.value)
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
				}
				checkbox[checked] + .label {
					border-color: rgba(0,208,147,1);
					background: rgba(0,208,147,0.1);
					color: #00D093;
				}
				.labelBox {
					height: 500rpx;
					overflow-y: auto;
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