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
					<view class="right"><input type="text" maxlength="10" placeholder="请输入姓名" placeholder-style="color:#C3C9D4" v-model.lazy="userInfo.nickname"></view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">性别</view>
					<view class="right">
						<radio-group class="radio-group" @change="sexChange">
						  <label class="radio">
						    <radio value=1 color="#00D093" :checked="userInfo.gender == 1"/><text>男</text>
						  </label>
						  <label class="radio">
						    <radio value=2 color="#00D093" :checked="userInfo.gender == 2"/><text>女</text>
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
					      <text class="placeholder" v-show="region[1] === ''">请选择所在地</text>{{region[1]}}
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
					<view class="left requst">职位</view>
					<view class="right">
						<input type="text" maxlength="20" placeholder="请输入职位" placeholder-style="color:#C3C9D4" v-model.lazy="userInfo.occupation">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left requst">最近任职公司</view>
					<view class="right">
						<input type="text" maxlength="50" placeholder="请输入公司名称" placeholder-style="color:#C3C9D4"  v-model.lazy="userInfo.company">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left">公司地址</view>
					<view class="right">
						<input type="text" maxlength="20" placeholder="请输入公司地址" placeholder-style="color:#C3C9D4" v-model.lazy="userInfo.company_location">
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
						<input type="number" disabled placeholder="请输入手机号码" placeholder-style="color:#C3C9D4"  v-model.lazy="userInfo.mobile">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left">微信号</view>
					<view class="right">
						<input type="text" placeholder="请输入微信号" placeholder-style="color:#C3C9D4"  v-model.lazy="userInfo.wechat">
					</view>
				</view>
			</view>
			<view class="item">
				<view class="itemCon">
					<view class="left">邮箱地址</view>
					<view class="right">
						<input type="text" placeholder="请输入邮箱地址" placeholder-style="color:#C3C9D4"  v-model.lazy="userInfo.email">
					</view>
				</view>
			</view>
		</section>
		<section class="block" :class="{'signBox' : isPos}">
			<view class="title">个人签名</view>
			<view class="item sign">
				<view class="itemCon">
					<!-- @focus="isPos = true" @blur="isPos = false" auto-height=true  -->
					<input cursor-spacing="100" maxlength="25" placeholder="用一句话介绍你自己吧~" placeholder-style="color:#C3C9D4" :value="userInfo.sign" @input="signText"></input>
					<text class="number">{{userInfo.sign ? userInfo.sign.length : 0}}/25</text>
				</view>
			</view>
		</section>

		<cover-view class="btn">
			<cover-view @tap.stop="saveUserInfo" class="light">保存资料</cover-view>
		</cover-view>
		<labelPop :isShow="showLablePop" :type="labelBox" :choseList="checkedIdList" @getLabel="getLabel" @close="closePop"></labelPop>
	</view>
</template>
<script>
	import labelPop from '@/components/labelPop'
	import { uploadImage } from '@/mixins/uploader'
	import {upDataUserInfoApi} from '@/api/pages/user'
	import {postGetLabelByIds} from '@/api/pages/login'
	export default {
		components: {
			labelPop,
	  },
	  watch: {
	  	userInfo (val) {
	  		if (this.userInfo.avatar_id !== '' && this.userInfo.nickname !== '' && this.userInfo.gender !== ''  && this.userInfo.occupation !== '' && this.userInfo.mobile !== '') {
	  			this.isLight = true
	  		}
	  	},
	  },
		data () {
			return {
				nickname: '',
				isLight: false,
				isSelf: false,
				vkey: '',
				imgList: ['/static/images/img.jpg'],
				userInfo: {},
				educationsInfo: {},
				workInfo: {},
				region: [],
				careerList: [],
				careerListId: [],
				showLablePop: false, // 擅长领域
				career: null,
				checkedIdList: '',
				checkedTextList: [],
				filePath: '',
				careerId: '',
				isPos: false
			}
		},
		onLoad (option) {
			this.vkey = option.vkey
			this.userInfo = this.$store.getters.userInfo
			this.region = [this.userInfo.province, this.userInfo.city]
			this.checkedTextList = []
			if(this.userInfo && this.userInfo.avatar_info && this.userInfo.avatar_info.middleImgUrl){
				this.filePath = this.userInfo.avatar_info.smallImgUrl
				let realm_info = this.userInfo.other_info.realm_info
				let array = []
				realm_info.forEach(e => {
					this.checkedTextList.push(e.name)
					array.push(e.id)
				})
				this.checkedIdList = array.join(',')
				console.log(this.checkedTextList, this.checkedIdList)
			}
		},
		onShow () {
			this.upLoad()
			this.getJobList()
		},
		onShareAppMessage: function (res) {
		  console.log(res)
		  let path = '/pages/index/main?';
		  let shareInfo = this.$store.getters.shareInfo
		  let that = this
		  let title = shareInfo.index.content
		  let imageUrl = shareInfo.index.path

		  return {
		    title: title,
		    path: path,
		    imageUrl: imageUrl,
		  }
		},
		methods: {
			upLoad () {
				const info = wx.getStorageSync('cutImgInfo')
				if (info.path) {
					const data = {
						path: info.path,
						size: info.size
					}
					this.filePath = info.path
					
				}
			},
			signText (e) {
				this.userInfo.sign = e.target.value
			},
			getJobList () {
				const data = {
					labelType: '3'
				}
				postGetLabelByIds(data).then(res => {
					this.careerListId = res.data[0].son
					res.data[0].son.forEach((item,index) => {
						this.careerList.push(item.name)
						if (item.id === this.userInfo.other_info.occupation_info.id) {
							console.log(item.id, this.userInfo.other_info.occupation_info.id, 222222)
							this.career = index
							this.careerId = item.id
						}
					})
				})
			},
			saveUserInfo () {
				const info = wx.getStorageSync('cutImgInfo')
				let data1 = {}
				if (info.path) {
					data1 = {
						path: info.path,
						size: info.size
					}
					wx.showLoading({
						title: '加载中...',
						mask: true
					})
					uploadImage(data1, {
		        onItemSuccess: (resp, file, index) => {
		        }
		      }).then(res => {
		        const cutImgInfo = {
		          fileId: res.file.fileId,
		          path: res.file.path,
		          size: res.file.size
		        }
		        wx.hideLoading()
						this.userInfo.avatar_id = res.file.fileId
						wx.removeStorageSync('cutImgInfo')
						this.save()
					}).catch((e, index) => {
		        console.log(e, 2)
		      })
	      } else {
	      	this.save()
	      }
			},
			save () {
				let title = ''
				if (this.userInfo.avatar_id === '') {
					wx.showToast({
					  title: '请选择头像',
					  icon: 'none',
					  duration: 1000
					})
					return
				}
				if (this.userInfo.nickname === '' || this.userInfo.nickname.length < 2) {
					if (this.userInfo.nickname === '') {
						title = '请填写姓名'
					} else if (this.userInfo.nickname.length < 2 || this.userInfo.nickname.length > 10) {
						title = '姓名需为2-10个字'
					}
					wx.showToast({
					  title: title,
					  icon: 'none',
					  duration: 1000
					})
					return
				}
				if (this.userInfo.gender === '') {
					wx.showToast({
					  title: '请选择性别',
					  icon: 'none',
					  duration: 1000
					})
					return
				}
				if (this.careerId === '') {
					wx.showToast({
					  title: '请选择职业方向',
					  icon: 'none',
					  duration: 1000
					})
					return
				}
				if (this.checkedIdList === '') {
					wx.showToast({
					  title: '请选择擅长领域',
					  icon: 'none',
					  duration: 1000
					})
					return
				}
				if (this.userInfo.occupation === '' || this.userInfo.occupation.length < 2 || this.userInfo.occupation.length > 20) {
					if (this.userInfo.occupation === '') {
						title = '请填写职位'
					} else if (this.userInfo.occupation.length < 2 || this.userInfo.occupation.length > 20) {
						title = '职位需为2-20个字'
					}
					wx.showToast({
					  title: title,
					  icon: 'none',
					  duration: 1000
					})
					return
				}
				if (this.userInfo.company === '' || this.userInfo.company.length < 2 || this.userInfo.company.length > 50) {
					if (this.userInfo.company === '') {
						title = '请填写最近任职公司'
					} else if (this.userInfo.company.length < 2 || this.userInfo.company.length > 50) {
						title = '公司需为2-50个字'
					}
					wx.showToast({
					  title: title,
					  icon: 'none',
					  duration: 1000
					})
					return
				}

				let reg1 = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/
				let regPhone = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
				if (this.userInfo.wechat !== '' && !reg1.test(this.userInfo.wechat) && !regPhone.test(this.userInfo.wechat)) { 
					wx.showToast({
					  title: '微信号格式不正确',
					  icon: 'none',
					  duration: 1000
					})
					return
				}
				let reg2 = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
				if (this.userInfo.email !== '' && !reg2.test(this.userInfo.email)) {
					wx.showToast({
					  title: '邮箱地址格式不正确',
					  icon: 'none',
					  duration: 1000
					})
					return
				}
				let data = {
					avatar_id: this.userInfo.avatar_id,
					nickname: this.userInfo.nickname.trim(),
					gender: this.userInfo.gender,
					user_location: this.region[1],
					occupation: this.userInfo.occupation.trim(),
					company: this.userInfo.company.trim(),
					company_location: this.userInfo.company_location.trim(),
					// mobile: this.userInfo.mobile,
					wechat: this.userInfo.wechat.trim(),
					email: this.userInfo.email.trim(),
					sign: this.userInfo.sign.trim(),
					occupation_label_id: this.careerId.toString() || '',
					realm_label_id: this.checkedIdList,
					city: this.region[1],
					province: this.region[0],
					country: '中国'
				}
				upDataUserInfoApi(data).then(res => {
					console.log('成功了', res)
					wx.navigateBack({
						delta: 1
					})
				}).catch(e => {
					wx.showToast({
					  title: e.msg,
					  icon: 'none',
					  duration: 1000
					})
					console.log('错误了', e)
				})
	      
			},
			closePop () {
				this.showLablePop = false
			},
			getLabel (a, b) {
				console.log('xuanz le ', a, b)
				this.checkedIdList = a
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
				console.log(this.userInfo.gender, this.userInfo.gender == 1, 22222222)
			},
			careerChange (e) {		
				this.career = e.mp.detail.value
				this.careerId = this.careerListId[e.mp.detail.value].id
				console.log('picker发送选择改变，携带值为', this.careerId)
			},
			regionChange (e) {
				console.log('picker发送选择改变，携带值为', e.mp.detail.value)
				this.region = e.mp.detail.value
			},
			chooseImg () {
				wx.navigateTo({
				  url: '/pages/cutInside/main'
				})
			}
		}
			
	}
</script>
<style lang="less" type="text/less" scoped>
	.edit {
		background: #FAFBFC;
		padding-bottom: 198rpx;
		.block {
			background: #fff;
			&.signBox {
				width: 100%;
				height: 100%;
				background: #fff;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 10;
			}
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
						height: 100%;
						display:flex;
						align-items:center;
						overflow: hidden;
						input {
							width: 400rpx;
							height: 120rpx;
							line-height: 120rpx;
						}
						.placeholder {
							color: #C3C9D4;
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
							min-width: 30rpx;
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
					padding: 20rpx 50rpx;
					box-sizing: border-box;
					.itemCon {
						display: block;
					}
					textarea {
						width: 100%;
						height: 74rpx;
						font-size: 28rpx;
						overflow:hidden;
						min-height:74rpx;
					}
					.number {
						float: right;
						color: #C3C9D4;
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
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			margin-top: 99rpx;
			background: #fff;
			padding: 30rpx 40rpx;
			box-sizing: border-box;
			.light {
				width: 100%;
				height: 98rpx;
				line-height: 98rpx;
				text-align: center;
				color: #fff;
				font-size: 32rpx;
				background: rgba(0,208,147,1);
				border-radius: 49rpx;
			}
		}
	}
</style>