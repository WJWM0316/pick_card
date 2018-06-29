<style lang="less" type="text/less" scoped>
@import url("~@/styles/animate.less");
  .container {
    height: 930rpx;
    position: relative;
    padding-bottom: 120rpx;
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
  .tit {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    background: rgba(255,255,255,1);
    box-shadow: 0rpx 11rpx 30rpx 0rpx rgba(153,193,214,0.08);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .item {
      width: 150rpx;
      font-size:34rpx;
      font-family:PingFangHK-Light;
      color:rgba(53,57,67,1);
      &.flock {
        margin-left: 100rpx;
      }
      &.cur {
        font-size:34rpx;
        font-family:PingFangHK-Medium;
        color:rgba(53,57,67,1);
        position: relative;
        &:after {
          content: '';
          width:20rpx;
          height:8rpx;
          background:rgba(0,208,147,1);
          border-radius:4rpx;
          position: absolute;
          bottom: 0rpx;
          left: 50%;
          margin-left: -10rpx;
        }
        &:before {
          content: '';
          width:14rpx;
          height:14rpx;
          background:rgba(255,81,80,1);
          background:red;
          border-radius:50%;
          position: absolute;
          top: 15rpx;
          right: 5rpx;
        }
      }
    }
  }
  .content {
    background:rgba(250,251,253,1);
    .ops {
      height: 120rpx;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 30rpx 0 50rpx 0;
      .ops_blo {
        width:322rpx;
        height:120rpx;
        background:rgba(63,209,165,1);
        box-shadow:0rpx 0rpx 0rpx 0rpx rgba(0,0,0,0.08);
        border-radius:16rpx;
        font-size:26rpx;
        font-family:PingFangHK-Regular;
        color:rgba(255,255,255,1);
        line-height:37rpx;
      }
      .createFlock {
        margin-left: 26rpx; 
      }
    }
    .card_block {
      position: relative;
      margin: 0 50rpx;
      display: flex;
      justify-content: flex-end;
      .blo_img {
        width:130rpx;
        height:130rpx;
        position: absolute;
        border-radius: 50%;
        left: -50rpx;
        top: 50rpx;
        box-shadow:0rpx 20rpx 40rpx 0rpx rgba(153,193,214,0.1);
      }
      .blo_msg {
        width:600rpx;
        height:230rpx;
        background:rgba(255,255,255,1);
        box-shadow:0rpx 10rpx 30rpx 0rpx rgba(153,193,214,0.1),0rpx -5rpx 40rpx 0rpx rgba(153,193,214,0.08);
        border-radius:18rpx;
        padding: 56rpx 0 56rpx 120rpx;
        box-sizing: border-box;
        text-align: left;
        position: relative;
        .msg_name {
          font-size:34rpx;
          font-family:PingFangHK-Medium;
          color:rgba(70,71,72,1);
          line-height:34rpx;
        }
        .msg_tit {
          font-size:28rpx;
          font-family:PingFangHK-Light;
          color:rgba(154,161,171,1);
          line-height:28rpx;
          margin: 18rpx 0 10rpx 0;
        }
        .msg_company {
          font-size:28rpx;
          font-family:PingFangHK-Light;
          color:rgba(154,161,171,1);
          line-height:28rpx;
        }
      }
    }
  }

</style>
<template>
  <view class="container" >
    <view class="tit">
      <view class="item cur ">个人名片</view>
      <view class="item flock">群名片</view>
    </view>
    <view class="content">
      <view class="ops">
        <view class="ops_blo shareMe">分享喔的名片</view>
        <view class="ops_blo createFlock">创建群名片</view>
      </view>
      <view class="personageList">
        <view class="card_block">
          <view class="blo_msg">
            <image class="blo_img" src="/static/images/img.jpg"></image>

            <view class="msg_name">吕美美</view>
            <view class="msg_tit">产品经理</view>
            <view class="msg_company">广州老虎信息科技有限公司</view>
          </view>
        </view>
      </view>
      <view class="flockList"></view>
    </view>
    <view class="footer">
      <view class="left">
        <view class="name" @tap="toIndex">Pick</view>
        <view class="name cur">名片夹</view>
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
  import { getUserInfoApi, getIndexUsers } from '@/api/pages/user'
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
      isMove: false,
    }
  },

  methods: {
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
    toIndex () {
      this.$mptoast('选择')
      wx.navigateTo({
        url: `/pages/index/main`
      })
    },
    tStart (e) {
      let that = this
      that.touchDot = e.touches[0].pageX
      that.interval =  setInterval(function () {  
         that.time++;  
      }, 100);  

      that.isMove = true;
    },
    tMove (e) {
      let touchMove = e.touches[0].pageX
      let touchDot = this.touchDot
      /*console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));  */
      // 向左滑动    
      if (touchMove - touchDot <= -40 && this.time < 10) {  

        console.log('左滑页面')
        if(this.isMove){
          this.nowIndex ++
          this.isMove = false
        }

      }  
      // 向右滑动  
      else if (touchMove - touchDot >= 40 && this.time < 10) {  
        console.log('向右滑动');  
        if(this.isMove){
          this.nowIndex ++
          this.isMove = false
        }
      }  
      else {
          //this.isMove = falses
      }
    },
    tEnd (e) {
      clearInterval(this.interval); // 清除setInterval  
      this.time = 0;  
      //this.isMove = false
    },
  },

  created () {
    /*wx.showModal({
      title: '提示',
      content: 'login',
      success: function(res) {

        if (res.confirm) {
          let data = {
            email: 18802090814,
            password: 123456
          }
          loginApi(data).then((res) => {
            console.log(res)
          },(res)=>{
            console.log('====',res)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })*/
  },

  onLoad() {
    let that = this
    getIndexUsers().then((res)=>{
      that.usersInfo = res
      console.log(res)
    })
  }
}
</script>

