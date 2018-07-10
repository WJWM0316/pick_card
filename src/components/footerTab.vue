<template>
  <view class="wrap">
    <view class="footer " :class="{'ten': Adaptive == 'ten','small': Adaptive == 'small'}">
      <view class="ft_warp">
        <view class="left">
          <view class="name" :class="{'cur' : type === 1}" @tap="toTab(1)">Pick</view>
          <view class="name" :class="{'cur' : type === 2}" @tap="toTab(2)">名片夹</view>
          <view class="name" :class="{'cur' : type === 3}" @tap="toTab(3)">我的名片</view>
        </view>
        <view class="right"> 
          <view class="r_blo" @click="isShare">
            <image class="detail"  src="/static/images/home_tab_btn_share_nor@3x.png"></image>
          </view>
          <view class="r_blo" @click="toSharePeo">
            <image class="detail" src="/static/images/home_tab_btn_info_nor@3x.png"></image>
          </view>
        </view>
      </view>
    </view>
    <!-- 分享弹窗 -->
    <view class="pop_warp" v-if="isPop">
      <view class="share_pop"> 
        <image @click="cloSahre" class="share_clo" src="/static/images/popup_btn_close_nor@3x.png"></image>
        <image class="share_cont" src="/static/images/popup_pic_share@3x.png"></image>
        <view class="tit" @tap="toCardHolder">分享你的趣名片</view>
        <view class="txt">召唤你的朋友们一起来玩吧！</view>
        <view class="btns">
          <button class="btn friend" open-type="share">
            <image class="img_warp" src="/static/images/popup_btn_sharewechat@3x.png"></image>
            <view class="bt_txt">分享到微信</view>
          </button>
          <button class="btn friends" @tap="toPic">
            <image class="img_warp" src="/static/images/popup_btn_sharediscover@3x.png"></image>
            <view class="bt_txt">分享朋友圈</view>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    props: {
      type:{
        type: Number,
        default: 1
      },
      Adaptive:{
        type: String,
        default: 1
      },
      
    },
    data () {
      return {
        isPop: false,
        index: 0,
      }
    },
    mounted () {
      this.index = this.type
    },
    methods: {
      toTab (type) {
        if (this.$store.getters.userInfo.step !== 9) {
          this.toCreateCard()
          return
        }
        if (this.type === type) {
          return
        }
        switch (type) {
          case 1:
            wx.redirectTo({
              url: '/pages/index/main'
            })
            break
          case 2:
            wx.redirectTo({
              url: `/pages/cardHolder/main`
            })
            break
          case 3:
            wx.redirectTo({
              url: `/pages/center/main`
            })
            break
        }
      },
      isShare () {
        if (this.$store.getters.userInfo.step !== 9) {
          this.toCreateCard()
          return
        }
        this.isPop = true
      },
      toSharePeo () {
        wx.redirectTo({
          url: '/pages/sharePick/main'
        })
      },
      cloSahre () {
        this.isPop = false
      },
      toCreateCard () {
        wx.navigateTo({
          url: '/pages/createCard/main'
        })
      }
    }
  }
</script>
<style lang="less" type="text/less" scoped>
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
  //align-items: center;
  align-items: flex-start;
  &.ten {
    height: 164rpx;
  }
  &.small {
    height: 88rpx;
  }
  .ft_warp {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height:96rpx;
  }
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
        font-size:32rpx;
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
      position: relative;
      image { 
        width: 48rpx;
        height: 48rpx;
      }
    }
  }
}
</style>