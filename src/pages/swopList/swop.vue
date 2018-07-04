
<template>
  <view class="container" >
    <view class="hint" v-if="listData.length>0">记录只保留14天，抓紧时间处理哦~</view>
    <view class="swopList" v-if="listData.length>0">
      <view class="swop_blo" v-for="(item, index) in listData" :key="key">

        <view class="blo_top">
          <image class="avatar" :src="item.avatar_info" v-if="item.avatar_info"></image>
          <image  class="avatar" src="/static/images/img.jpg" v-else></image>

          <view class="msg_detail ellipsis">
            <view class="msg_name ellipsis">{{item.apply_user_info.realname}} {{item.apply_user_info.occupation}}</view>
            <view class="msg_form ellipsis">{{item.apply_user_info.company}}</view>
          </view>
          <button class="top_btn" @tap="putApply(item.id,index)" v-if="item.status==0">同意</button>
          <text class="top_status" v-else>已交换</text>
        </view>

        <view class="blo_bot ">
          <image class="txt_img" src="/static/images/applylist_icon_like@3x.png"></image>
          <view class="txt ellipsis">{{item.remarks}}</view>
        </view>
      </view>
    </view>
    <view class="none_cont" v-else>
        <view class="none_txt_1">暂时没有新的申请</view>
        <view class="none_txt_2" @tap="toShare">推荐一下自己给你的朋友同事吧</view>
    </view>

    <!-- 分享弹窗 -->
    <view class="pop_warp" v-if="pop.isPop" @tap="cloPop">
      <view class="share_pop" v-if="pop.isShare"> 
        <image  class="share_clo" src="/static/images/popup_btn_close_nor@3x.png" ></image>
        <image class="share_cont" src="/static/images/popup_pic_share@3x.png"></image>
        <view class="tit" >恭喜你!</view>
        <view class="txt txt_2">你已经和TA成功互换名片了! 现在你可以</view>

        <view class="btns">
          <button class="btn friend" @click="likeOp('left')">
            <image class="img_warp" src="/static/images/popup_btn_godetails@3x.png"></image>
            <view class="bt_txt">看看TA的资料</view>
          </button>
          <button class="btn friends" @tap="likeOp('right')">
            <image class="img_warp" src="/static/images/popup_btn_sharenew@3x.png"></image>
            <view class="bt_txt">炫耀一下新朋友</view>
          </button>
        </view>
      </view>
    </view>

    <mptoast />

  </view>
</template>
<style lang="less" type="text/less" scoped>
  .pop_warp {
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
    height:800rpx;
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
      margin-top: 22rpx;

    }
    .txt {
      height:28rpx;
      font-size:28rpx;
      font-family:PingFangSC-Regular;
      color:rgba(154,161,171,1);
      line-height:28rpx;
      margin-top: 17rpx;
      margin-bottom: 82rpx;
      &.txt_2 {
        margin: 17rpx auto 34rpx auto;
        line-height:34rpx;
        width: 355rpx;
      }
    }
    .btns {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .btn {
        width:140rpx;
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
          background:rgba(0,208,147,1);
          margin-bottom: 15rpx;
          border-radius: 50%;
        }
      }
    }
  }
  .none_cont {
    height: 100vh;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    .none_txt_1 {
      height:28rpx;
      font-size:28rpx;
      font-family:PingFangSC-Light;
      color:#9AA1AB;
      line-height:28rpx;
      margin-bottom: 14rpx;
    }
    .none_txt_2 {
      height:28rpx;
      font-size:28rpx;
      font-family:PingFang-SC-Regular;
      color:#00D093;
      line-height:28rpx;
    } 
  }
  
  .hint {
    //display: none;
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
        listData: [],
        pop: {
          isPop: false,
          isShare: false,
        }
      }
    },
    methods: {
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


