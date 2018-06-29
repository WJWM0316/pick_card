<template>
	<view class="edit">
		<section class="block">
			<view class="title">基本信息</view>
			<view class="head item">
				<view class="itemCon">
					<view class="left requst">头像</view>
					<view class="right"><image @tap.stop="chooseImg" class="headImg" :src="filePath"></image></view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">姓名</view>
					<view class="right"><input type="text" maxlength="10" placeholder="请输入姓名" placeholder-style="color:#B2B6C2" v-model="userInfo.realname"></view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">性别</view>
					<view class="right">
						<radio-group class="radio-group" @change="radioChange">
						  <label class="radio">
						    <radio value="1" color="#00D093" :checked="userInfo.gender === 1"/><text>男</text>
						  </label>
						  <label class="radio">
						    <radio value="2" color="#00D093" :checked="userInfo.gender === 2"/><text>女</text>
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
					      <text class="placeholder" v-show='region.length === 0'>请选择所在地</text>{{region[0]}}{{region[1]}}
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
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">擅长领域</view>
					<view class="right" @tap.stop="showPop">
						<text class="placeholder" v-if="checkedTextList.length === 0">请选择擅长领域</text>
						<view class="fieldBox" v-else>
							<block  v-for="(item, index) in checkedTextList" :key="index">
								<text class="field">{{item}}</text>
								<text v-if="index !== checkedTextList.length - 1"> | </text>
							</block>
						</view>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">职业</view>
					<view class="right">
						<input type="text" maxlength="20" placeholder="请输入职业" placeholder-style="color:#B2B6C2" v-model="userInfo.occupation">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">最近入职公司</view>
					<view class="right">
						<input type="text" maxlength="50" placeholder="请输入公司名称" placeholder-style="color:#B2B6C2"  v-model="userInfo.company">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left">公司地址</view>
					<view class="right">
						<input type="text" maxlength="20" placeholder="请输入公司地址" placeholder-style="color:#B2B6C2" v-model="userInfo.company_location">
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
						<input type="number" disabled placeholder="请输入手机号码" placeholder-style="color:#B2B6C2"  v-model="userInfo.mobile">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left">微信号</view>
					<view class="right">
						<input type="text" placeholder="请输入微信号" placeholder-style="color:#B2B6C2"  v-model="userInfo.wechat">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left">邮箱地址</view>
					<view class="right">
						<input type="text" placeholder="请输入邮箱地址" placeholder-style="color:#B2B6C2"  v-model="userInfo.email">
					</view>
				</view>
			</view>
		</section>
		<section class="block">
			<view class="title">个人签名</view>
			<view class="item sign">
				<view class="itemCon">
					<textarea name="" maxlength="25" placeholder="用一句话介绍你自己吧~" placeholder-style="color:#B2B6C2" v-model="userInfo.sign"></textarea>
					<text class="number">{{userInfo.sign ? userInfo.sign.length : 0}}/25</text>
				</view>
			</view>
		</section>
		<section class="btn">
			<button @tap.stop="saveUserInfo" class="light">保存资料</button>
		</section>
		<label-pop 
			:isShow="showLablePop"
			@close="close"
			@getLabel="getLabel"
		></label-pop>
<!-- 		<cut-img :isShow="isShow"
						 :filePath="filePath"
						 @getImgcut="getImgcut"
						 @isHide="isHide"
		></cut-img> -->
	</view>
</template>
<script>
	// import cutImg from '@/components/cutImg'
	import labelPop from '@/components/labelPop'
	import {upDataUserInfoApi} from '@/api/pages/user'
	import { uploadImage } from '@/mixins/uploader'
	export default {
		components: {
			labelPop,
			// cutImg
	  },
	  watch: {
	  	userInfo (val) {
	  		if (this.userInfo.avatar_id !== '' && this.userInfo.realname !== '' && this.userInfo.gender !== ''  && this.userInfo.occupation !== '' && this.userInfo.mobile !== '') {
	  			this.isLight = true
	  		}
	  	},
	  },
		data () {
			return {
				realname: '',
				isLight: false,
				isSelf: false,
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
				career: null,
				checkedIndexList: [],
				checkedTextList: [],
				filePath: '',
				isShow: false
			}
		},
		onLoad (option) {
			this.vkey = option.vkey
			this.userInfo = this.$store.getters.userInfo
			this.region = [this.userInfo.user_location]

			if(this.userInfo && this.userInfo.avatar_info && this.userInfo.avatar_info.middleImgUrl){
				this.filePath = this.userInfo.avatar_info.middleImgUrl
			}
		},
		onShow () {
			this.isShow = false
		},
		methods: {
			isHide (e) {
				this.isShow = false
			},
			getImgcut (fileId, url) {
				this.userInfo.avatar_id = fileId
				this.filePath = url
			},
			saveUserInfo () {
				let user_location
				if (this.region[1]) {
					user_location = this.region[0] + this.region[1]
				} else {
					user_location = this.region[0]
				}
				let data = {
					avatar_id: this.userInfo.avatar_id,
					realname: this.userInfo.realname,
					gender: this.userInfo.gender,
					user_location: user_location,
					// occupation: this.userInfo.occupation,
					company: this.userInfo.company,
					company_location: this.userInfo.company_location,
					// mobile: this.userInfo.mobile,
					wechat: this.userInfo.wechat,
					email: this.userInfo.email,
					sign: this.userInfo.sign,
					// occupation_label_id: 11,
					// realm_label_id: 22,
					// build_label_id: 33
				}
				console.log(data)
				upDataUserInfoApi(data).then(res => {
					wx.navigateBack({
						delta: 1
					})
				})
			},
			closePop () {
				this.showLablePop = false
			},
			getLabel (a, b) {
				this.checkedIndexList = a
				this.checkedTextList = b
				this.showLablePop = false
			},
			close () {
				this.showLablePop = false
			},
			showPop () {
				this.showLablePop = true
			},
			sexChange(e) {
				this.userInfo.gender = e.mp.detail.value
			},
			careerChange (e) {
				console.log('picker发送选择改变，携带值为', e.mp.detail.value)
				this.career = e.mp.detail.value
			},
			regionChange (e) {
				console.log('picker发送选择改变，携带值为', e.mp.detail.value)
				this.region = e.mp.detail.value
			},
			chooseImg () {
				const that = this
				wx.chooseImage({  
          count: 1, // 默认9  
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
          success: function (res0) {  
            that.filePath = res0.tempFilePaths[0]
            const data = {
              path: that.filePath,
              size: 0
            }
            uploadImage(data, {
              onItemSuccess: (resp, file, index) => {
              }
            }).then(res => {
            }).catch((e, index) => {
              console.log(e, 2)
            })
          }  
        })  
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
							font-size: 28rpx;
							color: #353943;
							height: 120rpx;
							line-height: 120rpx;
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
				background: rgba(179, 240, 222, 1);
				border-radius: 49rpx;
				&.light {
					background: rgba(0,208,147,1);
				}
			}
		}
	}
</style>