<template>
	<view class="labelPop" v-if="isShow" @touchmove.stop="preventEvevt">
		<view class="inner">
			<view class="title">请选择1~3个领域<image @tap.stop="close" class="close" src="/static/images/popup_btn_close_nor@3x.png"></image></view>
			<view class="con">
				<checkbox-group class="labelBox" @change="checkboxChange">
					<label  v-for="(item, index) in labelList" :key="index">
						<checkbox class="checkbox" :value="index"></checkbox>
						<text class="label">{{item}}</text>
					</label>
				</checkbox-group>
				
				<button @tap.stop="save" class="btn">保存</button>
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
				]
			}
		},
		watch: {
			isShow () {}
		},
		methods: {
			close () {
				this.isShow = false
			},
			save () {
				this.isShow = false
				this.$emit('getLabel', )
			},
			checkboxChange (e) {
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
	}
	checkbox  {
		appearance: none;
		display: none;
	}
	
</style>