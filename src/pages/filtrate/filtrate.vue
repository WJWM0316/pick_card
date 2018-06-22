
<template>
  <div class="container" >
    <view class="hint">会根据你选择的条件，来发现你的职场新朋友</view>

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

    <view class="footer">
      <button class="next " @click="toNext(1)">提交</button>
    </view>
    <mptoast />
  </div>
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

    created () {}
  }
</script>

<style lang="less" type="text/less" scoped>
  .hint {
    padding:0 40rpx;
    font-size:26rpx;
    font-family:PingFangSC-Light;
    color:rgba(154,161,171,1);
    line-height:38rpx;
    margin-bottom:47rpx;
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
      background:rgba(0,208,147,1);
      border-radius: 49rpx;
      text-align: center;
      font-size: 32rpx;
      font-family:PingFangSC-Regular;
      color:rgba(255,255,255,1);
      line-height: 98rpx;
    }
  }
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
  .hidden {
    display: none;
  }
</style>
