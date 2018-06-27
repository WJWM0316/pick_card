
<template>
  <view class="container" >
    <view class="op_top">
      <view class="left" @click="toFiltrate">筛选</view>
      <view class="right" @click="toSwop">交换申请<view class="new">NEW</view></view>
    </view>
    <view class="content">
      <view class="peopList" >
        <block v-for="(item, index) in usersInfo" :key="key" >
          <view :index="index" class="peop_blo "
          :class="{
            'fadeIn animated test': nowIndex==index, 
            'fadeOutLeft animated test': nowIndex-1==index&&moveData.style=='left',  'fadeOutRight animated test': 
            nowIndex-1==index&&moveData.style=='right'
          }" 
          @tap="toDeatil(item)" 
          @touchstart="tStart" 
          @touchend="tEnd" 
          @touchmove="tMove" >
            <view class="top">
              <image class="bage" src="/static/images/img.jpg"></image>
              <view class="location">
                <image class="adr" src="/static/images/home_icon_location_nor@3x.png"></image>
                广州市
              </view>
              <view class="text">
                <view class="name">{{item.realname}}</view>
                <view class="title">{{index}}职场学习社区小灯塔</view>
                <image class="detail" src="/static/images/hone_btn_more_nor@3x.png"></image>
              </view>
            </view>
            <view class="bottom">
              <view class="signature">这个人很懒，不想写个性签名~</view>
              <view class="labelList">
                <view class="label_blo">
                  移动互联网
                </view>
                <view class="label_blo">
                  移动互联网
                </view>
                <view class="label_blo">
                  移动互联网
                </view>
              </view>
            </view>
          </view>
        </block>
        <view class="btns" >
          <button class="btn delate" @click="unLike">
            <image src="/static/images/home_btn_unlike_nor@3x.png"></image>
          </button>
          <button class="btn like" @tap="like">
            <image src="/static/images/home_btn_like_nor@3x.png"></image>
          </button>
        </view>
      </view>
    </view>
    <view class="footer">
      <view class="left">
        <view class="name cur" @tap="toCreate">Pick</view>
        <view class="name" @tap="toCardHolder">名片夹</view>
        <view class="name">我的名片</view>
      </view>
      <view class="right">
        <view class="r_blo">
          <image class="detail" src="/static/images/home_tab_btn_info_nor@3x.png"></image>
        </view>
        <view class="r_blo">
          <image class="detail" src="/static/images/home_tab_btn_share_nor@3x.png"></image>
        </view>
      </view>
    </view>
    <authorize-pop :isIndex='true'></authorize-pop>
    <mptoast />
    
  </view>
</template>
<script>
  import mptoast from 'mptoast'
  import {loginApi} from '@/api/pages/login'
  import authorizePop from '@/components/authorize'
  import { getUserInfoApi, getIndexUsers, indexLike, indexUnlike } from '@/api/pages/user'
export default {
  interval: '',
  components: {
    mptoast,
    authorizePop
  },
  data () {
    return { 
      usersInfo: [],
      touchDot: 0,
      time: 0,
      nowIndex: 0,
      moveData: {
        isMove: false,
        style: '',  //left or right
      }
    }
  },

  methods: {
    toDeatil (item) {
      console.log(item, 22222222222)
      wx.navigateTo({
        url: `/pages/detail/main?vkey=${item.vkey}`
      })
    },
    toCardHolder () {
      this.$mptoast('名片夹')
      wx.navigateTo({
        url: `/pages/cardHolder/main`
      })
    },
    toFiltrate () {
      this.$mptoast('筛选')

      wx.navigateTo({
        url: `/pages/filtrate/main`
      })
    },
    toSwop () {
      this.$mptoast('选择')

      wx.navigateTo({
        url: `/pages/swopList/main`
      })
    },
    toCreate () {
      this.$mptoast('创建')

      wx.navigateTo({
        url: `/pages/createCard/main`
      })
    },
    tStart (e) {
      let that = this
      that.touchDot = e.touches[0].pageX
      that.interval =  setInterval(function () {  
         that.time++;  
      }, 100);  

      that.moveData={
        isMove: true,
        style: '', 
      }
    },
    tMove (e) {
      let touchMove = e.touches[0].pageX
      let touchDot = this.touchDot
      /*console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));  */
      // 向左滑动    
      if (touchMove - touchDot <= -40 && this.time < 10) {  
        console.log('左滑页面')
        if(this.moveData.isMove){
          this.unLike()
        }
      }  
      // 向右滑动  
      else if (touchMove - touchDot >= 40 && this.time < 10) {  
        console.log('向右滑动');  
        if(this.moveData.isMove){
          this.like()
        }
      }  
    },
    tEnd (e) {
      clearInterval(this.interval); // 清除setInterval  
      this.time = 0;  
    },
    like () {
      console.log('like')

      let data = this.usersInfo[this.nowIndex]
      let msg = {
        to_uid: '123123',//data.unionid
        remarks: 'biangbiangbiangqiang'
      }
      indexLike(msg).then((res)=>{
        console.log(res)
        this.nowIndex ++
        this.moveData={
          isMove: false,
          style: 'right', 
        }
      },(res)=>{
        console.log(res)
        this.$mptoast(res.msg)
      })
    },

    unLike () {
      console.log('unlike')

      let data = this.usersInfo[this.nowIndex]
      let msg = {
        to_uid: '123123',//data.unionid
        remarks: 'biangbiangbiangqiang'
      }
      this.moveData={
        isMove: false,
        style: 'left', 
      }
      this.nowIndex ++
    },
  },

  onLoad() {
    let that = this
    getIndexUsers().then((res)=>{
      that.usersInfo = res.data
      console.log(res.data, 22222)
    })
  }
}
</script>
<style lang="less" type="text/less" scoped>
  .op_top {
    height: 94rpx;
    padding: 0 40rpx;
    //width: 100%;
    line-height: 94rpx;
    font-size:32rpx;
    font-family:PingFangSC-Light;
    color:rgba(53,57,67,1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .right {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .new {
        width:60rpx;
        height:30rpx;
        background:rgba(255,81,80,1);
        box-shadow:0px 2rpx 4rpx 0rpx rgba(0,0,0,0.1);
        border-radius:87rpx;
        border:2rpx solid rgba(255,255,255,1);
        margin-left: 8rpx;
        font-size:16rpx;
        font-family:HelveticaNeue-Medium;
        color:rgba(255,255,255,1);
        line-height:30rpx;
        text-align: center;
      }
    }
  }
  .content {
    height: 930rpx;
    position: relative;
    .peopList {
      width:640rpx;
      height:930rpx;
      //height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
    }
    .peopList {
      position: relative;
    }
    .peop_blo {
      width:640rpx;
      height:930rpx;
      margin: 0 auto;
      border-radius: 18rpx;
      overflow: hidden;
      position: absolute;
      border: 1rpx solid red;
      box-sizing: border-box;
      background: #ffffff;
      display: none;
      &.test {
        display: block;
      }
      .top {
        width:640rpx;
        height:590rpx;
        
        border-radius:18rpx 18rpx 0rpx 0rpx;
        position: relative;
        .bage {
          width:640rpx;
          height:590rpx;
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
        }
        .location {
          width:140rpx;
          height:50rpx;
          background:rgba(53,57,67,0.2);
          border-radius:25rpx;
          display: flex;
          position: absolute;
          right: 20rpx;
          top: 20rpx;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          font-size:24rpx;
          font-family:PingFangHK-Regular;
          color:rgba(255,255,255,1);
          line-height: 50rpx;
          .adr {
            width:20rpx;
            height:24rpx;
            margin-right: 8rpx;
          }
        }
        .text {
          height: 120rpx;
          position: absolute;
          background:linear-gradient(180deg,rgba(255,255,255,0),rgba(0,0,0,0.4));
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 0 0 0 34rpx;
          box-sizing: border-box;
          .name {
            font-size:48rpx;
            font-family:PingFang-SC-Medium;
            color:rgba(250,251,252,1);
            line-height:48rpx;
            margin-bottom: 10rpx;
          }
          .title {
            width: 470rpx;
            font-size:32rpx;
            font-family:PingFangSC-Light;
            color:rgba(255,255,255,1);
            line-height:32rpx;
          }
          .detail {
            width:50rpx;
            height:50rpx;
            position: absolute;
            right: 20rpx;
            bottom: 20rpx;
          }
        }
      }
      .bottom {
        width:640rpx;
        height:340rpx;
        background: #ffffff;
        padding: 24rpx 34rpx;
        box-sizing: border-box;
        .signature {
          font-size:28rpx;
          font-family:PingFangSC-Light;
          color:rgba(154,161,171,1);
          line-height:28rpx;
          margin-bottom: 34rpx;
        }
        .labelList {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .label_blo {
            padding: 12rpx 26rpx;
            box-sizing: border-box;
            font-size:24rpx;
            font-family:PingFangHK-Regular;
            border-radius:24px;
            color:rgba(0,208,147,1);
            line-height:24rpx;
            text-align: center;
            border: 1rpx solid rgba(0,208,147,1);
            margin-right: 10rpx;
          }
        }
      }
    }
    .btns {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 132rpx;
      position: absolute;
      bottom: -66rpx;
      left: 50%;
      margin-left: -189rpx;
      width: 378rpx;
      .btn {
        width:132rpx;
        height:132rpx;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .delate {
        background: rgba(220,227,238,1);
        image {
          width: 40rpx;
          height: 40rpx;
          display: block;
        }
      }
      .like {
        background: rgba(0,208,147,1);
        image {
          width: 60rpx;
          height: 46rpx;
          display: block;
        }

      }
    }
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1000;
    width:750rpx;
    height:96rpx;
    background:rgba(255,255,255,1);
    box-shadow:0rpx -10rpx 20rpx 0rpx rgba(153,193,214,0.08);
    display: flex;
    flex-direction: row;
    align-items: center;
    .left{
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      font-size:32rpx;
      font-family:PingFangHK-Light;
      color:rgba(117,121,128,1);
      .name {
        &.cur {
          font-size:36rpx;
          font-family:SFUIDisplay-Semibold;
          color:rgba(53,64,72,1);
          position: relative;
          &:after {
            content: '';
            width:20rpx;
            height:8rpx;
            background:rgba(0,208,147,1);
            border-radius:4rpx;
            position: absolute;
            bottom: -8rpx;
            left: 50%;
            margin-left: -10rpx;
          }
        }
      }
      
    }
    .right {
      width: 136rpx;
      margin: 40rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .r_blo {
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        image { 
          width: 48rpx;
          height: 48rpx;
        }
      }
    }
  }
</style>
