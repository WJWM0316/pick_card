
<template>
  <view class="container" >
    <view class="hint" v-if="listData.length>0">记录只保留14天，抓紧时间处理哦~</view>
    <view class="swopList" v-if="listData.length>0">
      <view class="swop_blo" v-for="(item, index) in listData" :key="key" @tap="toDetail(item)">
        <view class="blo_top">
          <image class="avatar" :src="item.avatar_info" v-if="item.avatar_info"></image>
          <image  class="avatar" src="/static/images/new_pic_defaulhead.jpg" v-else></image>

          <view class="msg_detail ellipsis">
            <view class="msg_name ellipsis">{{item.apply_user_info.nickname}} {{item.apply_user_info.occupation}}</view>
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
        <button class="none_txt_2" data-type="me" open-type="share">推荐一下自己给你的朋友同事吧</button>
    </view>

    <mptoast />
    <hintPop :type='consent' :isShow=isShow :consentNowItem=nowItem ></hintPop>
  </view>
</template>
<style lang="less" type="text/less" scoped>
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
      border-bottom:2rpx solid #eaebec;
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
            margin-right: 30rpx;
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
          width:140rpx;
          text-align: center;
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
  import hintPop from '@/components/hintPop'

  import { getLikeList, putLike } from '@/api/pages/user'
  import { deleteRedDot } from '@/api/pages/red'
  import { getUserInfoApi } from '@/api/pages/user'
  import { getShareImg } from '@/api/pages/login'
  import Vue from 'vue'

  export default {
    
    components: {
      hintPop,
      mptoast
    },
    data () {
      return {
        usersInfo: {},
        shareInfo: {},
        listData: [],
        isShow: false,
        nowItem: {}
      }
    },
    methods: {
      //跳转====
      toDetail (item) {
        let data = {}
          data = item
        wx.navigateTo({
          url: `/pages/detail/main?vkey=${data.apply_user_info.vkey}`
        })
      },
      /*toShare(){
        console.log('to share me')
        let that = this
        if(that.listData[0].apply_user_info.vkey){
          wx.navigateTo({
            url: `/pages/sharePick/main?vkey=${that.listData[0].apply_user_info.vkey}?type=me`
          })
        }
      },*/

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
            that.nowItem = that.listData[index]
            that.isShow = true
          }
        },(res)=>{
          that.$mptoast('已发送','error',2000)
        })
      }
    },

    onLoad () {
      let that = this;
      getLikeList().then((res)=>{
        console.log('=====',res)
        that.listData = res.data

        if(res.http_status==200){
          deleteRedDot()
        }
      },(res)=>{
        that.$mptoast(res.msg)
      })

      getUserInfoApi().then( data => {
        let usersInfo = data.data

        let msg = {
          uid: usersInfo.id,
          name: usersInfo.name,
          img: usersInfo.avatar_info.smallImgUrl,
          occupation: usersInfo.occupation,
          company: usersInfo.company,
          label: [],
        }

        usersInfo.other_info.realm_info.forEach(item => {
          msg.label.push(`${item.name} | `)
        })

        msg.label = msg.label.join('')
        msg.label = msg.label.slice(0, msg.label.length-3)

        getShareImg(msg).then(res => {
          msg.shareImg = res.data
          that.shareData = msg
        })
      })
    },

    onShareAppMessage: function (res) {
      let path = '/pages/index/main?'
      let imageUrl = ''
      let title = ''
      let shareInfo = Vue.prototype.$store.getters.shareInfo

        console.log(shareInfo)
        wx.showShareMenu({
          withShareTicket: true
        })

      if (res.from === 'button' ) {
        if(res.target.dataset.type=="me"){
          title = shareInfo.showCard.content
          imageUrl = shareData.shareImg
          path = `/pages/detail?vkey=${this.usersInfo.vkey}`
        }
        if(res.target.dataset.type=="other"){
            title = shareInfo.otherCard.content
            imageUrl = shareInfo.otherCard.path
            path = `/pages/sharePick/main?vkey=${this.nowItem.apply_user_info.vkey}?type=other`
        }

        // 来自页面内转发按钮
      }
      return {
        title: title,
        path: path,
        imageUrl: imageUrl
      }
    },

    created () {
    }

  }
</script>


