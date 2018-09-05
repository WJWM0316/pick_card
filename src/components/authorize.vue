<template>
	<view class="authorize" v-if="needAuthorize && showPop" @touchmove.stop="preventEvevt">
		<view class="pop">
			<image class="close" v-if="!isIndex" @tap="close" src="/static/images/popup_btn_close_nor@3x.png"></image>
			<image class="head" src="/static/images/sou.png"></image>
			<view class="title">欢迎来到趣名片PickMe<br>使用名片功能需要获取你的授权</view>
			<view class="msg">趣名片PickMe向你保证不会将你的信息泄露给第三方，仅用于读取名片夹的信息和名片信息的展示。</view>
			<button class="btn" @getuserinfo="onGetUserinfo" open-type="getUserInfo" type="primary" lang="zh_CN">授权</button>
		</view>
	</view>
</template>
<script>
	import {grantInformationApi,getSessionKeyApi,getShareConfig} from '@/api/pages/login'
	import {getUserInfoApi,getIndexUsers} from '@/api/pages/user'
	import { mapState } from 'vuex'
	import Vue from 'vue'
	import index from '@/pages/index'
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			routeInfo: {
				type: String,
				default: `/pages/index/main`
			},
			isIndex: {
				type: Boolean,
				default: false
			},
			showPop: {
				type: Boolean,
				default: true
			},
			routerInfo: {
				type: Object,
				default: {}
			}
		},
		data () {
			return {
			}
		},
		computed: {
			...mapState ({
				needAuthorize: state => state.global.needAuthorize,
			})
		},
		watch: {
			needAuthorize (val) {},
			showPop () {},
			routerInfo () {}
		},
		onLoad () {
			console.log(this.routerInfo, '返回的路由信息')
		},
		methods: {
			checkLogin () {
	      return new Promise((resolve, reject) => {
	        // 调用微信登录获取本地session_key
	        wx.login({
	          success: function (res) {
	            // console.log('rquire login', res)
	            // 请求接口获取服务器session_key
	            const getSessionKeyParams = {
	              code: res.code,
	              shareUid: wx.getStorageSync('enterRouteInfo').query.shareUid || '',
	              shareType: wx.getStorageSync('enterRouteInfo').query.shareType || ''
	            }
	            
	            getSessionKeyApi(getSessionKeyParams).then(res => {
	              console.log('require:获取sessionkey成功', res)

	              if (res.data.token) {
	                wx.setStorageSync('token', res.data.token)
	              }
	              // 为了获取用户信息
	              if (res.data.key) {
	              	wx.setStorageSync('key', res.data.key)
	              }
	              if (res.data.vkey) {
	                wx.setStorageSync('vkey', res.data.vkey)
	              }
	              if (res.code === 0) {
	                console.log('用户在其他平台已完成授权，不需要再次授权')
	                // 获取用户信息存于store
	                getUserInfoApi().then(res => {
	                  Vue.prototype.$store.dispatch('userInfo', res.data)
	                  console.log('已将个人信息存入store', Vue.prototype.$store.getters.userInfo)
	                }).catch(e => {
	                  console.log(e)
	                })

	                getShareConfig().then(res => {
	                	Vue.prototype.$store.dispatch('shareInfo', res.data)
	                  console.log('已将分享信息存入store1', Vue.prototype.$store.getters.shareInfo)
	                })
	              }
	              if (res.code === 201) {    
	                Vue.prototype.$store.dispatch('needAuthorize', true) // 需要授权框
	              }
	              resolve(res)
	            }).catch(e => {
	            	console.log(e, 1111111111)
	              reject(e)
	            })
	          },
	          fail: function (e) {
	          	console.log('登录失败', e)
	          }
	        })
	      })
	    },
			onGetUserinfo (e) {
	    	console.log('用户手动同意微信授权', e.mp.detail)
	    	// 授权完毕 重新调回原页面刷新当前数据
		  	let params = ''
        let url = ''
        for (var i in this.routerInfo.query) {
        	params += `${i}=${this.routerInfo.query[i]}&`
        }
        if (params != '') {
        	url = `/${this.routerInfo.path}?${params}`
        } else {
        	url = `/${this.routerInfo.path}`
        }
        console.log(url, '授权返回路由')
	      // 这里不取微信返回的用户信息，而是将加密后的用户信息请求后端，后端将用户信息入库，再返回的整理后的给前端。
	      // console.log('微信userInfo换自己服务的userInfo,', res)
	      const data = {
	        encryptedData: e.mp.detail.encryptedData,
	        iv: e.mp.detail.iv,
	        key: wx.getStorageSync('key'),
	        shareUid: wx.getStorageSync('enterRouteInfo').query.shareUid || '',
	        shareType: wx.getStorageSync('enterRouteInfo').query.shareType || ''
	      }
	      
      	grantInformationApi(data).then(res => {
	        console.log('获取用户授权成功并交换userinfo成功', res)
	        wx.setStorageSync('token', res.data.token) // 更新token状态
          	wx.setStorageSync('key', res.data.key)
	        wx.setStorageSync('vkey', res.data.vkey) // 保存用户vkey用来识别是否本人
	        this.$store.dispatch('userInfo', res.data)
	        console.log('已将个人信息存入store', res.data)
	        this.$store.dispatch('needAuthorize', false)
	        getShareConfig().then(res => {
	        	this.$store.dispatch('shareInfo', res.data)
	          console.log('已将分享信息存入store2', this.$store.getters.shareInfo)
	        })

	        wx.reLaunch({
					  url: url
					})
      	}).catch(e => {
	        console.log('捕获 grantInformationApi', e)
    		})
    	},
	    close () {
	    	this.$store.dispatch('needAuthorize', false)
	    },
	    preventEvevt (e) {
				e.preventDefault()
				e.stopPropagation()
			}
    }
	}

</script>
<style lang="less" type="text/less" scoped>
	.authorize {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99999999;
		padding: 190rpx 40rpx 0;
		box-sizing: border-box;
		background: rgba(0, 0, 0, 0.7);
		.pop {
			background: #fff;
			border-radius: 18rpx;
			padding: 40rpx 50rpx;
			text-align: center;
			position: relative;
			.close {
				width: 28rpx;
				height: 28rpx;
				position: absolute;
				top: 0;
				right: 0;
				padding: 40rpx;
			}
			.head {
				width:342rpx;
				height:324rpx;
				margin: 0 auto;
				display: block;
			}
			.title {
				margin-top: 24rpx;
				font-size: 34rpx;
				color: #353943;
				line-height: 1.4;
				font-weight: 500;
			}
			.msg {
				margin-top: 28rpx;
				font-size:28rpx;
				color:#9AA1AB;
				line-height: 1.4;
				font-weight: light;
			}
			.btn {
				margin-top: 54rpx;
				width:100%;
				height:98rpx;
				line-height: 98rpx;
				background:rgba(0,208,147,1);
				border-radius:49rpx;
			}
		}
	}
</style>