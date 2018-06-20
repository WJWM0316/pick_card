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
    .peopList {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .peopList {
      position: relative;
    }
    .peop_blo {
      border-radius: 18rpx;
      overflow: hidden;
      position: relative;
      border: 1rpx solid #333333;
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
        background:rgba(220,227,238,1);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>
<template>
  <div class="container" >
    <view class="op_top">
      <view class="left">筛选</view>
      <view class="right">交换申请<view class="new">NEW</view></view>
    </view>
    <view class="content">
      <view class="peopList">
        <view class="peop_blo">
          <view class="top" @tap.stop="jump()">
            <image class="bage" src=""></image>
            <view class="location">
              <image class="adr" src=""></image>
              广州市
            </view>
            <view class="text">
              <view class="name">邓陶陶</view>
              <view class="title">职场学习社区小灯塔</view>
              <image class="detail" src=""></image>
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
        <view class="btns">
          <button class="btn delate">
            <image src=""></image>
          </button>
          <button class="btn like">
            <image src=""></image>
          </button>
        </view>
        
      </view>
    </view>
    <view class="footer">
      <view class="left">
        <view class="name cur" @tap="toCreate">Pick</view>
        <view class="name">名片夹</view>
        <view class="name">我的名片</view>
      </view>
      <view class="right">
        <view class="r_blo">
          <image class="detail" src=""></image>
        </view>
        <view class="r_blo">
          <image class="detail" src=""></image>
        </view>
      </view>
    </view>
       <mptoast />
  </div>
</template>
<script>
  import mptoast from 'mptoast'
export default {
  components: {
    mptoast
  },
  data () {
    return { }
  },
  methods: {
    toCreate () {
      this.$mptoast('创建')

      wx.navigateTo({
        url: `/pages/createCard/main`
      })
    },
    jump () {
      wx.navigateTo({
        url: `/pages/test/main`
      })
    }

  },

  created () {}
}
</script>


