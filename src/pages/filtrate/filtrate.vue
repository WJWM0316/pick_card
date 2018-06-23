
<template>
  <view class="container" >
    <view class="hint">会根据你选择的条件，来发现你的职场新朋友</view>
    <view class="op_two ">
      <view class="table_blo row_style_one">
        <view class="tit">最近任职公司</view>
        <input class="one_ipt" placeholder-style="font-size:32rpx;font-family:PingFangSC-Light;color:rgba(195,201,212,1);line-height:60rpx;" placeholder="例如：老虎科技"  />
      </view>

      <view class="table_blo row_style_two">
        <view class="tit">职位</view>
        <view class="list_selct">
          <view class="blo">不限</view>
          <view class="blo">运营</view>
          <view class="blo">设计</view>
          <view class="blo">市场</view>
          <view class="blo">技术</view>
          <view class="blo">职能</view>
          <view class="blo">金融</view>
          <view class="blo">运营</view>
        </view>
      </view>

      <view class="table_blo row_style_two">
        <view class="tit">领域</view>
        <view class="list_selct">
          <view class="blo cur">不限</view>
          <view class="blo">企业服务</view>
          <view class="blo">金融</view>
          <view class="blo">运营</view>
          <view class="blo">运营</view>
        </view>
      </view>
    </view>

    <view class="swopList">
      <view class="swop_blo">
        <view class="blo_top">
          <view class="top_msg">
            <image class="avatar" src=""></image>
            <view class="msg_detail">
              <view class="msg_name">asdasdasdasdasd</view>
              <view class="msg_form">asdasdasdasdasd</view>
            </view>
            
          </view>
          <view class="top_btn">同意</view>
        </view>

        <view class="blo_bot">
          <image class="txt_img" src=""></image>
          <view class="txt">asdasdasdasdasd</view>
        </view>
      </view>
    </view>

    <view class="footer">
      <button class="next toNext" @click="toNext(1)">提交</button>
      <!-- <button class="next" wx:else>完成创建</button> -->
    </view>
    <mptoast />
  </view>
</template>

<script>
  import mptoast from 'mptoast'
  import {firstSignApi} from '@/api/pages/login'

  export default {
    
    components: {
      mptoast
    },
    data () {
      return {
        focus: false,
        firstData: {
          unionid:'test',
          gender: 0, //性别 1女 2男
          realname: '',
          avatar_id: '111',
        },
        nowNum : 1,
      }
    },
    methods: {
      gender (res) {
        console.log(res)
        let that = this;
        if(res && res == 1||res == 2 && that.firstData.gender != res ){
          that.firstData.gender = res
        }
      },
      inputText (e) {
        console.log(e)

        let val = e.target.value
        if(val.length>0){
          this.firstData.realname = val
        }
      },
      toNext (num) {
        let that = this;

        firstSignApi(that.firstData).then((res)=>{
          console.log(res)
          that.nowNum = 2
        })
      }
    },
  }
</script>

<style lang="less" type="text/less" scoped>
  .container {
    padding-bottom: 160rpx;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 130rpx;
    background: #ffffff;
    width: 100%;
    .next {
      margin: 0 auto;
      width: 670rpx;
      height: 98rpx;
      background:rgba(0,208,147,0.3);
      border-radius: 49rpx;
      text-align: center;
      font-size: 32rpx;
      font-family:PingFangSC-Regular;
      color:rgba(255,255,255,1);
      line-height: 98rpx;
      &.toNext {
        background:rgba(0,208,147,1);
      }
    }
  }
  .op_one {
    .one_txt {
      padding-left: 40rpx;
      padding-top: 40rpx;
      margin-bottom: 64rpx;
      .tit1 {
        height:34rpx;
        font-size:34rpx;
        font-family:PingFangHK-Medium;
        color:rgba(53,57,67,1);
        line-height:34rpx;
        margin-bottom: 16rpx;
      }
      .tit2 {
        font-size:28rpx;
        font-family:PingFangSC-Light;
        color:rgba(154,161,171,1);
        line-height:28rpx;
      }
    }
    .one_pic {
      height: 360rpx;
      .img_wrap {
        width: 360rpx;
        height: 360rpx;
        border: 1rpx dashed #cccccc;
        position: relative;
        margin: 0 auto;
        .pic {
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        .up_wrap {
          position: absolute;
          right: 22rpx;
          top: 22rpx;
          width:60rpx;
          height:60rpx;
          background:rgba(0,208,147,1);
          border-radius: 50%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .up_img {
            width:34rpx;
            height:28rpx;
            background:rgba(255,255,255,1);
          }
        }
      }
    }
    .one_name {
      width: 440rpx;
      height: 90rpx;
      background: rgba(250,251,252,1);
      border-radius: 45rpx;
      margin: 30rpx auto 60rpx auto;
      text-align: center;
    }
    .one_gender {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .gender {
        width: 130rpx;
        height: 130rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        image {
          width:130rpx;
          height:130rpx;
        }
      }
      .boy {
        background: rgba(71,123,255,0.03);
        margin-right: 95rpx;

      }
      .girl {
        background: rgba(197,166,166,0.05);
      }
    }
  }
  .hintJoined {
    height:114rpx;
    background:rgba(255,252,240,1);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 18rpx 50rpx;
    .hint_img {
      width:78rpx;
      height:78rpx;
      background:rgba(255,233,143,1);
      border-radius:37rpx;
      opacity:0.2;
    }
    .hint_txt {
      font-size:26rpx;
      font-family:PingFangSC-Light;
      color:rgba(154,161,171,1);
      line-height:26rpx;
      margin-left: 28rpx;
    }
  }
  .op_two {
    padding-top: 37rpx;
    .table_blo {
      padding: 0 40rpx;
      margin-bottom: 47rpx;
      position: relative;
      .tit {
        height:34rpx;
        font-size:34rpx;
        font-family:PingFangHK-Medium;
        color:rgba(53,57,67,1);
        line-height:34rpx;
        position: relative;
        margin-bottom: 32rpx;
        text {
          font-size:26rpx;
          font-family:PingFangSC-Light;
          color:rgba(178,182,194,1);
          margin-left: 30rpx;
        }
      }
      .one_ipt {
        border-bottom:1rpx solid #cccccc;
      }
      .list_selct {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .blo {
          width:136rpx;
          height:60rpx;
          border-radius:34rpx;
          border:1rpx solid rgba(220,227,238,1);
          margin: 0 20rpx 20rpx 0;
          font-size:28rpx;
          font-family:PingFangSC-Light;
          color:rgba(154,161,171,1);
          line-height:60rpx;
          text-align: center;
        }
      }
      .area {
        border: 1rpx solid #cccccc;
        width: 100%;
        height: 140rpx;
      }
      .astrict {
        position: absolute;
        right: 40rpx;
        bottom: 0rpx;
      }
    }
    
  }
  .pclass {
    font-size:22rpx;
    font-family:PingFangSC-Light;
    color:rgba(195,201,212,1);
    line-height:60rpx;
    text-align: center;
  }
  .hidden {
    display: none;
  }
</style>
