<template>
	<view class="hintPop" v-if="isShow">
		<!-- 分享弹窗 -->
	  <view class="share_pop" v-show="type=='consent'"> 
	    <image  class="share_clo" src="/static/images/popup_btn_close_nor@3x.png" @tap="cloPop"></image>
	    <image class="share_cont" src="/static/images/popup_pic_newmatch@3x.png"></image>
	    <view class="tit" >恭喜你!</view> 
	    <view class="txt ">
		    <view class=" txt_2">你已经和TA成功互换名片了!</view>
		    <view class=" txt_2">现在你可以</view>
		</view>

	    <view class="btns" :class="{'index':consentForm=='index'}">
	      <button class="btn friend" @click="toDetail">
	        <image class="img_warp" src="/static/images/popup_btn_godetails@3x.png"></image>
	        <view class="bt_txt">看看TA的资料</view>
	      </button>
	      <button class="btn friends" data-type="other" open-type="share" >
	        <image class="img_warp" src="/static/images/popup_btn_sharenew@3x.png"></image>
	        <button data-type="other" open-type="share" class="bt_txt">炫耀一下新朋友</button>
	      </button>

	    </view>
      <view class="again" v-show="consentForm=='index'" @tap="cloPop">继续寻找新朋友>></view>
	  </view>
	</view>
</template>
<script>
	import Vue from 'vue'
	import {postGetLabelByIds} from '@/api/pages/login'
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: 'consent'
			},
			consentForm: {
				type: String,
				default: ''
			},
			consentNowItem: {
				type: Object,
				default: {}
			},
		},
		data () {
			return {
				shareData : {}
			}
		},
		watch: {
			isShow (res) {
			console.log(res)

			},
			type () {},
			consentNowItem(){},
			consentForm(){

			},
		},
		onLoad () {},
		onPullDownRefresh(res){
		  let that = this;

		  //doing some thing
		  console.log('下拉刷新执行完毕要停止当前页面下拉刷新',res)
		  //that.getList()
		  setTimeout(function(){
		      wx.stopPullDownRefresh()
		  },2000)
		},

		onReachBottom(res){
			console.log(res)
		  let that = this;
		},
		methods: {
			//跳转====
			toDetail () {
				console.log('跳转toDetail',this.consentNowItem)
				let url = '/pages/detail/main?vkey='
				if(this.consentForm =='index'){
					url += this.consentNowItem.vkey
				}else {
					url += this.consentNowItem.apply_user_info.vkey
				}
			  	this.isShow = false
				this.$emit('changeshow', false)
			  	
			  	wx.navigateTo({
				    url: url
			  	})
			},
			cloPop () {
				console.log('clopop')
				this.isShow = false
				this.$emit('changeshow', false)
			},

			preventEvevt (e) {
				e.preventDefault()
				e.stopPropagation()
			}
		},
	}
</script>
<style lang="less" type="text/less" scoped>
	.hintPop {
	  background:rgba(0,0,0,0.7);
	  position: fixed;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  z-index: 1001;
	}
	.share_pop {
	  width:670rpx;
	  //height:800rpx;
	  background:rgba(255,255,255,1);
	  border-radius:18rpx;
	  position: absolute;
	  left: 50%;
	  top: 50%;
	  transform: translate(-50%,-50%);
	  text-align: center;
	  box-sizing: border-box;
	  padding-top: 54rpx;
	  .share_clo {
	    width:28rpx;
	    height:28rpx;
	    position: absolute;
	    right: 40rpx;
	    top: 40rpx;
	  }
	  .share_cont {
	    width:375rpx;
	    height:349rpx;
	    margin: 0 auto;
	  }
	  .tit {
	    height:32rpx;
	    font-size:34rpx;
	    font-family:PingFangSC-Semibold;
	    color:rgba(53,57,67,1);
	    line-height:32rpx;
	    margin-top: 48rpx;

	  }
	  .txt {
	    font-size:28rpx;
	    font-family:PingFangSC-Regular;
	    color:rgba(154,161,171,1);
	    line-height:28rpx;
      	margin: 17rpx auto 34rpx auto;
  		text-align: center;
	    .txt_2 {
	      	line-height:40rpx;
	    }
	  }
	  .btns {
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
	    align-items: center;
	    margin-bottom: 68rpx;
	    &.index {
	    	margin-bottom: 30rpx;
	    }
	    .btn {
	      //width:140rpx;
	      display: flex;
	      flex-direction: column;
	      align-items: center;
	      &.friend {
	        margin-right: 100rpx;
	      }
	      .bt_txt {
	        font-size:28rpx;
	        font-family:PingFangHK-Regular;
	        color:rgba(178,182,194,1);
	        line-height:26rpx;
	      }
	      .img_warp {
	        width:104rpx;
	        height:104rpx;
	        margin-bottom: 15rpx;
	        border-radius: 50%;
	      }
	    }
	  }

	  .again {
	    	font-size:28rpx;
	    	font-family:PingFangHK-Regular;
	    	color:rgba(0,208,147,1);
	    	line-height:40rpx;
	    	margin-bottom: 38rpx;
    }
	}
</style>