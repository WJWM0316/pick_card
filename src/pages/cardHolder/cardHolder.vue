<template>
  <view class="container" >
    <view class="tit">
      <view class="item" :class="{'cur':nowIndex==0,'red':topRed.user_card_count>0}" @click="select(0)" >个人名片</view>
      <view class="item flock" :class="{'cur':nowIndex==1,'red':topRed.user_group_card_count>0}" @click="select(1)" >群名片</view>
    </view>
    <view class="content">
      <view class="ops">
        <button open-type="share" data-type="me" class="ops_blo shareMe" @tap="toMeDetail">
          <image src="/static/images/cardcase_banner_left@3x.png"></image>
          分享我的名片
        </button>
        <button open-type="share" data-type="flock" class="ops_blo createFlock" @tap="createFlock">
          <image src="/static/images/cardcase_banner_right@3x.png"></image>创建群名片
        </button>
      </view>
      <view :style="{ height: spHeight+'rpx' }" class="swip" >
          <block v-if="nowIndex == 0">
            <view class="friendList" v-if="friendList.length>0">
                <view class="card_block"  v-for="(item, index) in friendList" :key="key">
                  <view class="blo_msg " :class="{'one': item.has_red_dot == 1}" @tap="toDetail(item)">
                    <image class="blo_img"  :src="item.friend_user_info.avatar_info" v-if="item&&item.friend_user_info&&item.friend_user_info.avatar_info&&item.friend_user_info.avatar_info.length>0"></image>
                    <image class="blo_img" src="/static/images/new_pic_defaulhead.jpg" v-else></image>

                    <view class="msg_name ellipsis" >{{item.friend_user_info.nickname}}</view>
                    <view class="msg_tit  ellipsis">{{item.friend_user_info.occupation}}</view>
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
                <button class="none_btn" data-type="me" open-type="share">去分享 </button>
              </view>
            </block>
          </block>

          <block v-else>
            <view class="flockList" v-if="florkList && florkList.list&& florkList.list.length>0">

              <view class="card_block"  v-for="(item, index) in florkList.list" :key="key" @tap="toFlock(item)">
                <view class="blo_msg flock_blo" :class="{'two': item.userGroupTabRedDot == 1}" >
                  <image class="blo_img"  :src="item.listImg" v-if="item.listImg"></image>
                  <image class="blo_img"  src="/static/images/new_pic_defaulhead.jpg" v-else></image>
                  <open-data class="msg_name" type="groupName" :open-gid="item.openGid"></open-data>
                  <view class="msg_tit">已有{{item.memberCount}}张群成员名片</view>

                  <view class="new_msg" v-if="item.newJoinMemberCount>0">{{item.newJoinMemberCount}}</view>
                </view>
              </view>
            </view>
            <block  v-else>
              <view class="none_blo">
                <view class="none_txt">创建群名片，把微信群友变成你的职场人脉</view>
                <button class="none_btn" data-type="flock" open-type="share">去创建 </button>
              </view>
            </block>
          </block>
      </view>
    </view>
    <authorize-pop :isIndex='true'></authorize-pop>
    <mptoast />
    <footerTab :type=2 :adaptive=adaptive :isRed=swopRed></footerTab>
  </view>
</template>
<script>
  import mptoast from 'mptoast'
  import footerTab from '@/components/footerTab'
  import App from '@/App'
  import { getUserInfoApi } from '@/api/pages/user'
  import { getFriends, deleteFriends, getUserGroupList, getUserGroupInfo, joinUserGroup, setUserGroup, editGroupInfo, quitGroup } from '@/api/pages/cardcase'
  import { deleteRedDot, deleteRedFriends, redDotApplys, redDot } from '@/api/pages/red'
  import { getShareImg } from '@/api/pages/login'
export default {
  interval: '',
  components: {
    mptoast,
    footerTab
  },
  data () {
    return { 
      usersInfo: [],
      nowIndex: 0,
      friendList: [],
      florkList: [],
      systemInfo: {},
      spHeight: '80vh',
      adaptive: null,
      swopRed: 0,
      topRed: {},
      shareData: {}
    }
  },

  methods: {
    toDetail (item) {
      console.log(item)
      wx.navigateTo({
        url: `/pages/detail/main?vkey=${item.friend_user_info.vkey}`
      })
    },
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
  onLoad() {
    let that = this;

    that.adaptive = wx.getStorageSync('adaptive')
    getFriends().then((res)=>{
      console.log(res)
      that.friendList = res.data

      if(res.http_status==200){
        deleteRedFriends()
      }
    },(res)=>{})

    getUserGroupList().then((res)=>{
      console.log(res)
      that.florkList = res.data
    },(res)=>{})

    getUserInfoApi().then(data => {
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

    redDotApplys().then(res=>{
      if(res.http_status==200){
        that.swopRed = res.data.user_apply_show_red_dot
      }
    })
    redDot().then(res=>{
      that.topRed = res.data
    })
    wx.getSystemInfo({
      success: function(res) {
        that.systemInfo = res;
        console.log(res)
        that.spHeight = (res.windowHeight-44-60-40-50)*2;
      }
    })
  },
  onShareAppMessage: function (res) {
    console.log(res)
    let path = '/pages/index/main?',
        that = this,
        imageUrl = '';

    wx.showShareMenu({
      withShareTicket: true
    })

    if (res.from === 'button' ) {
      if(res.target.dataset.type=="flock"){
        path+='form=cardHolder&type=flock'
      }
      if(res.target.dataset.type=="me"){
        imageUrl = that.shareData.shareImg
        path = `/pages/detail/main?vkey=${this.usersInfo.vkey}`
      }
      // 来自页面内转发按钮
    }
    return {
      title: '自定义转发标题',
      path: path,
      imageUrl: imageUrl
    }
  },
  onShow(res){
    wx.showShareMenu({
      withShareTicket: true
    })
  }
}
</script>

<style lang="less" type="text/less" scoped>
@import url("~@/styles/animate.less");
  .container {
    height: 100vh;
    //height: 930rpx;
    position: relative;
    background: rgba(250,251,253,1)
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
      text-align: center;
      &.red {
        &.cur {
          &:before {
            content: '';
            width:14rpx;
            height:14rpx;
            background:rgba(255,81,80,1);
            background:red;
            border-radius:50%;
            position: absolute;
            top: 15rpx;
            right: -5rpx;
          }
        }
        &.flock{
          &.cur {
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
      //height: 90vh;
    }
    .friendList,.flockList {
      //display: flex;
      //flex-direction: column;
      height: 100%;
      text-align: center;
      overflow-y: scroll;
    }
    .card_block {
      position: relative;
      margin: 0 50rpx;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 40rpx;
      overflow-y: scroll;
      
      .blo_img {
        width:130rpx;
        height:130rpx;
        position: absolute;
        border-radius: 50%;
        left: -50rpx;
        top: 50rpx;
        //box-shadow:0rpx 20rpx 40rpx 0rpx rgba(153,193,214,0.1);
        border:4rpx solid rgba(255,255,255,1);
        box-sizing: border-box;
        
      }
      .blo_msg {
        width:600rpx;
        height:230rpx;
        background:rgba(255,255,255,1);
        //box-shadow:0rpx 10rpx 30rpx 0rpx rgba(153,193,214,0.1),0rpx -5rpx 40rpx 40rpx rgba(153,193,214,0.08);
        border-radius:18rpx;
        padding: 56rpx 30rpx 56rpx 120rpx;
        box-sizing: border-box;
        text-align: left;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &.one {
          &:after {
            content: '';
            width:20rpx;
            height:20rpx;
            border-radius: 50%;
            background:rgba(255,102,102,1);
            position: absolute; 
            top: 62rpx;
            left: 50rpx;
            //margin-left: -10rpx;
          }
        }
        &.two {
          &:after {
            content: '';
            width:20rpx;
            height:20rpx;
            border-radius: 50%;
            background:rgba(255,102,102,1);
            position: absolute;
            top: 0rpx;
            left: 0rpx;
            //margin-left: -10rpx;
          }
        }
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 78rpx;
    margin-bottom: 78rpx;
    text-align: center;
    color: #9AA1AB;
    button {
      color: #00D093;
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
    line-height:28rpx;
    margin-bottom: 46rpx;
    color: #9AA1AB;
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
