
<template>
  <div class="container" >
    <view class="swopList">
      <view class="swop_blo">

        <view class="blo_top">
          <image class="avatar" src=""></image>
          <view class="msg_detail">
            <view class="msg_name">吕美美 设计师</view>
            <view class="msg_form">自客网</view>
          </view>
          <button class="top_btn">同意</button>
        </view>

        <view class="blo_bot">
          <image class="txt_img" src="/static/images/home_btn_like_nor@3x.png"></image>
          <view class="txt">久仰大名！希望能和我交换名片~</view>
        </view>
      </view>
    </view>

    <mptoast />
  </div>
</template>
<style lang="less" type="text/less" scoped>
  .swopList {
    background: #ffffff;
    .swop_blo {
      border-bottom:1px solid rgba(53,57,67,0.1);
      padding: 40rpx;

      .blo_top {
        height: 110rpx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 34rpx;
        .avatar {
          width:110rpx;
          height:110rpx;
          border-radius: 50%;
          margin-right: 20rpx;
        }
        .msg_detail {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          .msg_name {
            font-size:32rpx;
            font-family:PingFangSC-Regular;
            color:rgba(53,57,67,1);
            line-height:32rpx;
            margin-bottom: 14rpx;
          }
          .msg_form {
            font-size:28rpx;
            font-family:PingFangSC-Light;
            color:rgba(154,161,171,1);
            line-height:28rpx;
          }
        }
        .top_btn {
          width:140rpx;
          height:60rpx;
          background:rgba(0,208,147,1);
          border-radius:33rpx;
          text-align: center;
          font-size:28rpx;
          font-family:PingFangSC-Regular;
          color:rgba(255,255,255,1);
          line-height:60rpx;
        }
      }
      .blo_bot {
        height:80rpx;
        background:rgba(250,251,252,1);
        border-radius:40rpx;
        display: flex;
        align-items: center;
        flex-direction: row;
        .txt_img {
          width:40rpx;
          height:30rpx;
          margin: 0 48rpx;
        }
        .txt {
          font-size:26rpx;
          font-family:PingFangSC-Light;
          color:rgba(154,161,171,1);
          line-height:37rpx;
        }
      }
    }
    
  }
  .container {
    padding-bottom: 160rpx;
    height: 100vh;
    background:rgba(250,251,252,1);
  }

  .hidden {
    display: none;
  }
</style>
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
      }
    }
  }
</script>


