
<template>
  <div class="container" >
    <view class="hint">记录只保留14天，抓紧时间处理哦~</view>
    <view class="swopList">

      <view class="swop_blo" v-for="(item, index) in listData" :key="key">

        <view class="blo_top">
          <image class="avatar" src="/static/images/img.jpg"></image>
          <view class="msg_detail">
            <view class="msg_name">{{item.apply_user_info.realname}} {{item.apply_user_info.occupation}}</view>
            <view class="msg_form">{{item.apply_user_info.company}}</view>
          </view>
          <button class="top_btn" @tap="putApply(item.id,index)" v-if="item.status==0">同意</button>
          <text class="top_status" v-else>已交换</text>
        </view>

        <view class="blo_bot ">
          <image class="txt_img" src="/static/images/applylist_icon_like@3x.png"></image>
          <view class="txt ellipsis">{{item.apply_user_info.sign}}</view>
        </view>
      </view>
    </view>

    <mptoast />
  </div>
</template>
<style lang="less" type="text/less" scoped>
  .hint {
    font-size:28rpx;
    font-family:PingFangSC-Light;
    color:rgba(154,161,171,1);
    line-height:140rpx;
    height:140rpx;
    background:rgba(250,251,252,1);
    text-align: center;
  }
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
        align-items: center;
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
          justify-content: center;
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
        .top_status {
          font-size:28rpx;
          font-family:PingFangSC-Regular;
          color:rgba(195,201,212,1);
          line-height:40rpx;
        }
      }
      .blo_bot {
        height:80rpx;
        background:rgba(250,251,252,1);
        border-radius:40rpx;
        display: flex;
        align-items: center;
        flex-direction: row;
        overflow: hidden;
        padding: 0 40rpx;
        box-sizing: border-box;
        .txt_img {
          width:40rpx;
          height:30rpx;
          margin-right: 40rpx;
        }
        .txt {
          font-size:26rpx;
          font-family:PingFangSC-Light;
          color:rgba(154,161,171,1);
          line-height:37rpx;
          flex: 1;
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
  import { getLikeList, putLike } from '@/api/pages/user'

  export default {
    
    components: {
      mptoast
    },
    data () {
      return {
        listData: []
      }
    },
    methods: {
      gender (res) {
        console.log(res)
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
          }
        })
      }

    },

    onLoad () {
      let that = this;
      console.log(this.listData )
      getLikeList().then((res)=>{
        console.log('=====',res)
        that.listData = res.data

      })
    },

    created () {
    }

  }
</script>


