<template>
	<view class="characters">
		<view class='occupation'>
			<view class="title">
				<view class="titlecon">已选择标签<text class="num">{{allNum}}</text><text>/5</text></view>
			</view>
			<view class="label-box">
				<view class="label-title">
					职业技能<text class="select">产品</text>
				</view>
				<view class="label-con">
					<checkbox-group class="labelBox" @change="skillFun">
						<label  v-for="(item, index) in skillList" :key="index">
							<checkbox class="checkbox" :value="index + ' ' +item"></checkbox>
							<text class="label">{{item}}</text>
						</label>
					</checkbox-group>
				</view>
			</view>
			<view class="label-box">
				<view class="label-title">
					职业素养
				</view>
				<view class="label-con">
					<checkbox-group class="labelBox" @change="qualityFun">
						<label  v-for="(item, index) in qualityList" :key="index">
							<checkbox class="checkbox" :value="index + ' ' +item"></checkbox>
							<text class="label">{{item}}</text>
						</label>
					</checkbox-group>
				</view>
			</view>
			<view class="other">
				<view class="other-title">找不到想要的标签？</view>
				<button class="addLabel" @tap="addLabel"><text class="add">+</text>添加自定义职业标签</button>
			</view>
		</view>
		<view class="btn">
			<button class="next">下一步</button>
		</view>
		<label-pop 
			:isShow="showLablePop"
			:type="'custom'"
			@close="close"
			@getLabel="getLabel"
		></label-pop>
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
				allNum: 0,
				qualityList: ['1asda','撒大声地', '奥术大师', '阿萨德','1asda','撒大声地', '奥术大师', '阿萨德','1asda','撒大声地', '奥术23大师', '阿萨德'],
				skillList: ['1asda','撒大123声地', '奥术12大师', '阿萨德','1asda','撒大123声地', '奥23术大师', '阿萨德','123asda','撒1大声地', '奥术2大师', '阿萨德'],
				quality: [],
				skill: [],
				showLablePop: false
			}
		},
		onLoad (option) {
			this.vkey = option.vkey
			this.userInfo = this.$store.getters('userInfo')
			this.region = [this.userInfo.user_location]
		},
		onReady () {
		},
		methods: {
			close () {
				this.showLablePop = false
			},
			addLabel () {
				this.showLablePop = true
			},
			skillFun (e) {
				this.skill = e.mp.detail.value
				this.allNum = this.skill.length + this.quality.length
				console.log(this.skill)
			},
			qualityFun (e) {
				this.quality = e.mp.detail.value
				this.allNum = this.skill.length + this.quality.length
				console.log(this.quality)
			}
		}
			
	}
</script>
<style lang="less" type="text/less" scoped>
	.characters {
		padding: 0 40rpx;
		.title {
			margin-bottom: 30rpx;
			.titlecon {
				border-bottom:1px solid rgba(53,57,67,0.1);
				height:42rpx;
				font-size:30rpx;
				color:#353943;
				line-height:42rpx;
				padding: 30rpx 0 47rpx 0;
				text {
					font-size: 28rpx;
					color: #B2B6C2;
					&.num {
						color: #FFBC47;
					}
				}
			}
		}
		.label-box {
			margin-top: 40rpx;
			.label-title {
				font-size:30rpx;
				color:#353943;
				line-height:54rpx;
				.select {
					font-size: 28rpx;
					line-height: 54rpx;
					color: #353943;
					border-radius:35px;
					padding: 0 30rpx;
					border: 1rpx solid rgba(178,182,194,0.4);
					margin-left: 48rpx;
					display:inline-block;
					box-sizing: border-box;
				}
			}
			.label-con {
				padding: 40rpx 0 20rpx;
				border-bottom:1px solid rgba(220,227,238,1);
				.labelBox {
					overflow: hidden;
					checkbox {
						display: none;
					}
					.label {	
						
						font-size: 28rpx;
						line-height: 54rpx;
						color: #DCE3EE;
						border-radius:35px;
						padding: 0 30rpx;
						border: 1rpx solid rgba(178,182,194,0.4);
						display:inline-block;
						box-sizing: border-box;
						margin-right: 20rpx;
						margin-bottom: 20rpx;
					}
					checkbox[checked] + .label {
						border-color: rgba(0,208,147,1);
						background: rgba(0,208,147,0.1);
						color: #00D093;
					}
				}
			}
		}
		.other {
			margin-top: 176rpx;
			.other-title {
				text-align: center;
				font-size:28rpx;
				color:#353943;
				line-height:28rpx;
			}
			.addLabel {
				margin: 26rpx auto 0;
				width:338rpx;
				height:68rpx;
				font-size: 28rpx;
				line-height: 68rpx;
				border-radius:34rpx;
				border:1rpx solid rgba(0,208,147,1);
				color: #00D093;
			}
		}
		.btn {
			background: #fff;
			margin-top: 80rpx;
			padding: 30rpx 0;
			.next {
				height:98rpx;
				background:#00D093;
				line-height: 98rpx;
				border-radius:49rpx;
				font-size: 32rpx;
				color: #fff;
			}
		}
	}
</style>