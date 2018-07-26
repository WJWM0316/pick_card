
<template>
  <view class="container" :class="{'bg1' : !test}">
    <view :class="{'bg' : !test}">
    <view class="state_1" v-if="test">
      <image  class="one_bg" src="/static/images/share_match_pic_share@3x.png"></image>
      <view class="cont_tit">哇，一张名片就勾搭到一位大咖！ 你也来试</view>
      <view class="cont_txt" style="text-align: center">趣名片PickMe，职场新人脉勾搭平台</view>
      <view class="cont_txt" style="text-align: center">有趣社交，从这里开始</view>
    </view>
    <view class="state_2" v-else>
      <view class="head_msg">
        <view class="msg_left">
          <view class="cont_tit">{{shareData.nickname}}</view>
          <view class="cont_txt">{{shareData.occupation}}</view>
          <view class="cont_txt">{{shareData.company}}</view>
        </view>
        <image class="msg_right" v-if="shareData.avatar" :src="shareData.avatar[0].middleImgUrl"></image>
      </view>
      <image  class="two_bottom" src="/static/images/share_icon_chevron@3x.png" ></image>
      <view class="peaple">
        <view class="ple_num">{{shareData.userApplyNum}}</view>个人
      </view>
      <view class="title">都想得到我的名片</view>
      <image  class="two_pic" src="/static/images/share_pic_fontbg@3x.png" ></image>
    </view>
    <view class="footer">
      <button class="btn " @tap="toDetail">
        去看看TA的趣名片
      </button>
      <button class="btn more" @tap="toIndex">
        结识更多有趣的职场人
      </button>
    </view>
    </view>
    <mptoast />
  </view>
</template>
<style lang="less" type="text/less" scoped>
  @import url('~@/assets/css/mixins.less');
  .container {
    height: 100vh;
    .bg1 {
      background: rgba(250,251,252,1) url('https://card-uploads-test.oss-cn-shenzhen.aliyuncs.com/Uploads/static/share_bg1%402x.png') no-repeat top left;
      background-size: 100% auto;
    }
    .bg {
      background: url('https://card-uploads-test.oss-cn-shenzhen.aliyuncs.com/Uploads/static/share_bg2%402x.png') no-repeat 0 474rpx;
      background-size: 100% auto;
    }
  }
  .state_2 {
    margin: 0 70rpx;
    padding-top: 70rpx;
    .head_msg {
      overflow: hidden;
      .msg_left {
        width: 394rpx;
        float: left;
        height: 190rpx;
        display: flex;
        align-items: center;
        flex-direction: column;
        .cont_txt {
          height:28rpx;
          font-size:28rpx;
          color:rgba(53,57,67,1);
          line-height:28rpx;
          margin-bottom: 10rpx;
          .setEllipsis();
        }
        .cont_tit {
          width: 100%;
          font-size:56rpx;
          font-weight: bold;
          color:rgba(53,57,67,1);
          line-height:56rpx;
          margin-bottom: 20rpx;
        }
      }
      .msg_right {
        width:190rpx;
        height:190rpx;
        float: right;
        border-radius:100rpx;
        border:4rpx solid rgba(0,208,147,1);
        display: block;
      }
    }
    .two_bottom {
      width:28rpx;
      height:30rpx;
      margin: 32rpx 0 68rpx 10rpx;
    }
    .peaple {
      height:100rpx;
      font-size:38rpx;
      color:rgba(53,57,67,1);
      .ple_num {
        font-size:150rpx;
        color:rgba(0,208,147,1);
        line-height:100rpx;
        display: inline-block;
        font-weight: 700;
      }
    }
    .title {
      height:60rpx;
      font-size:62rpx;
      color:rgba(53,57,67,1);
      line-height:60rpx;
      text-align: left;
      margin: 34rpx 0 110rpx 0;
    }
    .two_pic {
      height:82rpx;
      width: 443rpx;
    }
  }
  .state_1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .one_bg {
      width: 590rpx;
      height: 456rpx;
      margin: 80rpx auto 52rpx;
    }
    .cont_tit {
      width: 480rpx;
      line-height:39rpx;
      font-size:32rpx;
      padding-bottom: 66rpx;
      text-align: center;

    }
    .cont_txt {
      width: 480rpx;
      line-height:34rpx;
      font-size:27rpx;
      color:rgba(53,57,67,0.81);
      text-align: center;
      .setEllipsis();
    }
  }
  .footer {
    margin-top: 120rpx;
    .btn {
      width:670rpx;
      height:98rpx;
      line-height:98rpx;
      background:rgba(0,208,147,1);
      border-radius:49rpx;
      font-size:32rpx;
      color:rgba(255,255,255,1);
      text-align: center;
      box-sizing: border-box;
      margin: 0 40rpx 30rpx 40rpx;
      &.more {
        background:rgba(0,208,147,0.05);
        border:2rpx solid rgba(152,236,212,1);
        color:rgba(0,208,147,1);
      }
    }
  }
  .hidden {
    display: none;
  }
</style>
<script>
  import {getSharePickApi} from '@/api/pages/login'
  import mptoast from 'mptoast'
  import { getLikeList, putLike } from '@/api/pages/user'

  export default {
    
    components: {
      mptoast
    },
    data () {
      return {
        test: false,
        listData: [],
        pop: {
          isPop: false,
          isShare: false,
        },
        shareData: {}
      }
    },
    methods: {
      toDetail(){
        let that = this
        wx.reLaunch({
          url: `/pages/detail/main?vkey=${that.vkey}`
        })
      },
      toIndex(){
        wx.reLaunch({
          url: '/pages/index/main'
        })
      },
      toShare(res){
        console.log('to share me')
      },
      cloPop (res) {
        console.log(res)
        this.pop = {
          isPop: false,
          isShare: false,
        }
        console.log(res)

      },

      openPop () {
        this.pop = {
          isPop: true,
          isShare: true,
        }
      },

      putApply (id,index) {
        if(!id){return}
        let data = {
          id: id,
          status: '1'
        }
        let that = this
        putLike(data).then((res)=>{
          console.log('=====',res)
          if(res.http_status == 200){
            that.$mptoast('已发送')
            that.listData[index].status = 1
            that.openPop()
          }
        })
      }

    },

    onLoad (res) {
      let that = this;
      if(res.type=='other'){
        that.test = true
      }
      if(res.vkey){
        that.vkey = res.vkey
      }
      console.log(res)
      getSharePickApi({vkey:res.vkey}).then((msg)=>{
        console.log(msg)
        that.shareData = msg.data
      })
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

    created () {
    }

  }
</script>


