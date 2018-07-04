<style lang="less" type="text/less" scoped>
@import url("~@/styles/animate.less");
  .container {
    height: 930rpx;
    position: relative;
    padding-bottom: 250rpx;
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
        line-height:120rpx;
        position: relative;
        &.shareMe {
          box-shadow:0rpx 0rpx 0rpx 0rpx rgba(0,0,0,0.08);
        }
        &.createFlock {
          box-shadow:0rpx 0rpx 0rpx 0rpx rgba(0,0,0,0.08);
        }
        image {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          display: block;
        }
      }
      .createFlock {
        margin-left: 26rpx; 
      }
    }
    .swip {
      height: 90vh;
    }
    .friendList {
      display: flex;
      flex-direction: column;

    }
    .card_block {
      position: relative;
      margin: 0 50rpx;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 40rpx;

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
        padding: 56rpx 30rpx 56rpx 120rpx;
        box-sizing: border-box;
        text-align: left;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &.flock_blo {
          height: 180rpx;
          .new_msg {

          }
          .msg_tit {
            font-size: 28rpx;
            font-family: PingFangHK-Light;
            color: rgba(154,161,171,1);
            line-height: 28rpx;
            margin: 18rpx 0 0rpx 0;
          }
          .blo_img {
            top: 28rpx;
            width:124rpx;
            height:124rpx;
          }
        }
        .new_msg {
          width:44rpx;
          height:44rpx;
          background:rgba(255,102,102,1);
          box-shadow:0rpx 2rpx 5rpx 0rpx rgba(255,102,102,0.2);
          border-radius: 50%;
          position: absolute;
          right: 26rpx;
          top: 68rpx;
          text-align: center;
          line-height: 44rpx;
          font-size:26rpx;
          font-family:PingFangHK-Medium;
          color:rgba(255,255,255,1);
        }
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
  .to_share {
    height:26rpx;
    font-size:26rpx;
    font-family:PingFangHK-Regular;
    line-height:26rpx;
    display: inline-block;
    margin-top: 38rpx;
    text-align: center;
    color: #9AA1AB;
    button {
      color: #00D093;
      display: inline-block;
      font-size: 26rpx;
      color:rgba(0,208,147,1);
    }
  }
  .none_blo {
    text-align: center;
    margin-top: 250rpx;
  }
  .none_txt {
    height:28rpx;
    font-size:28rpx;
    font-family:PingFangSC-Light;
    color:rgba(53,57,67,1);
    line-height:28rpx;
    margin-bottom: 46rpx;
  }
  .none_btn {
    width:570rpx;
    height:100rpx;
    background:rgba(0,208,147,1);
    border-radius:50rpx;
    font-size:32rpx;
    font-family:PingFangHK-Regular;
    color:rgba(255,255,255,1);
    line-height:100rpx;
    margin: 0 auto;
  }

</style>
<template>
  <view class="container" >
    <view class="tit">
      <view class="item" :class="{'cur':nowIndex==0}" @click="select(0)" >个人名片</view>
      <view class="item flock" :class="{'cur':nowIndex==1}" @click="select(1)" >群名片</view>
    </view>
    <view class="content">
      <view class="ops">
        <button open-type="share" class="ops_blo shareMe" @tap="toMeDetail">
          <image src="/static/images/cardcase_banner_left@3x.png"></image>
          分享喔的名片
        </button>
        <button open-type="share" data-type="flock" class="ops_blo createFlock" @tap="createFlock">
          <image src="/static/images/cardcase_banner_right@3x.png"></image>创建群名片
        </button>
      </view>
      <swiper class="swip" duration="500" :current="nowIndex"  circular="true" @change="swiperChange" @animationfinish="animationfinish">
        <swiper-item class="">
          <view class="friendList" v-if="friendList.length>0">
            <view class="card_block" v-for="(item, index) in friendList" :key="key">
              <view class="blo_msg" >
                <image class="blo_img" :src="item.friend_user_info.avatar_info" v-if="item.friend_user_info.avatar_info.length>0"></image>
                <image class="blo_img" src="/static/images/new_pic_defaulhead.jpg" v-else></image>

                <view class="msg_name ellipsis" >{{item.friend_user_info.nickname}}</view>
                <view class="msg_tit ellipsis">{{item.friend_user_info.occupation}}</view>
                <view class="msg_company ellipsis">{{item.friend_user_info.company}}</view>
              </view>
            </view>

            <view class="to_share">
              <button open-type="share">分享我的名片</button>，获取更多职场人脉
            </view>
          </view>
          <block  v-else>
            <view class="none_blo">
              <view class="none_txt">分享我的名片，获取更多职场人脉</view>
              <button class="none_btn" open-type="share">去分享 </button>
            </view>
          </block>
        </swiper-item>

        <swiper-item>
          <view class="flockList" v-if="florkList.length>0">
            <view class="card_block" v-for="(item, index) in florkList" :key="key" @tap="toFlock(item)"> 
              <view class="blo_msg flock_blo">
                <image class="blo_img" :src="item.listImg" v-if="item.listImg"></image>
                <image class="blo_img" src="/static/images/new_pic_defaulhead.jpg" v-else></image>
                <open-data class="msg_name" type="groupName" :open-gid="item.openGid"></open-data>
                <view class="msg_tit">已有{{item.memberCount}}张群成员名片</view>

                <view class="new_msg">0</view>
              </view>
            </view>
          </view>
          <block  v-else>
            <view class="none_blo">
              <view class="none_txt">创建群名片，把微信群友变成你的职场人脉</view>
              <button class="none_btn" data-type="flock" open-type="share">去创建 </button>
            </view>
          </block>
        </swiper-item>
      </swiper>
      
    </view>
    <view class="footer">
      <view class="left">
        <view class="name" @tap="toIndex">Pick</view>
        <view class="name cur">名片夹</view>
        <view class="name" @tap="toCenter">我的名片</view>
      </view>
      <view class="right">
        <view class="r_blo">
          <image class="detail" src="/static/images/home_tab_btn_share_nor@3x.png"></image>
        </view>
        <view class="r_blo">
          <image class="detail" src="/static/images/home_tab_btn_info_nor@3x.png"></image>
        </view>
        
      </view>
    </view>
    <authorize-pop :isIndex='true'></authorize-pop>
    <mptoast />
    
  </view>
</template>
<script>
  import mptoast from 'mptoast'
  import { getFriends, deleteFriends, getUserGroupList, getUserGroupInfo, joinUserGroup, setUserGroup, editGroupInfo, quitGroup } from '@/api/pages/cardcase'
export default {
  interval: '',
  components: {
    mptoast,
  },
  data () {
    return { 
      usersInfo: [],
      nowIndex: 0,
      friendList: [],
      florkList: [],
    }
  },

  methods: {
    toIndex () {
      wx.navigateTo({
        url: `/pages/index/main`
      })
    },
    createFlock(){

    },
    toFlock (res) {
      if(res.openGid){
        wx.navigateTo({
          url: `/pages/flock/main?id=${res.openGid}&vkey=${res.vkey}`
        })
      }else {
        this.$mptoast('缺少群id')
      }
    },
    toCenter () {
      wx.navigateTo({
        url: `/pages/center/main`
      })
    },
    select (type) {
      if(type==this.nowIndex){
        return
      }else {
        this.nowIndex = this.nowIndex == 1 ? 0: 1
      }
    },
  },

  created () {
  },

  onLoad() {
    let that = this

    getFriends().then((res)=>{

      console.log(res)
      that.friendList = res.data
    },(res)=>{

    })

    getUserGroupList().then((res)=>{

      console.log(res)
      that.florkList = res.data
    },(res)=>{

    })
  },
  onShareAppMessage: function (res) {
    console.log(res)
    let path = '/pages/index/main?'
    wx.showShareMenu({
      withShareTicket: true
    })
    if (res.from === 'button' ) {
      if(res.target.dataset.type=="flock"){
        path+='form=cardHolder&type=flock'
      }
      // 来自页面内转发按钮
    }
    console.log(path)

    return {
      title: '自定义转发标题',
      path: path
    }
  },
  onShow(res){
    wx.showShareMenu({
      withShareTicket: true
    })
    console.log('onshow',res)
  }
}
</script>

