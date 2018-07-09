<style lang="less" type="text/less" scoped>
@import url("~@/styles/animate.less");
  .container {
    height: 100vh;
    position: relative;
    padding-bottom: 120rpx;
    background: #fafbfd;
    .flock_msg {
      width:750rpx;
      height:240rpx;
      background:rgba(255,255,255,1);
      box-sizing: border-box;
      padding: 48rpx 0 40rpx 40rpx;
      text-align: left;
      position: relative;
      .name {
        font-size:48rpx;
        font-family:PingFangHK-Semibold;
        color:rgba(53,57,67,1);
        line-height:48rpx;
      }
      .txt {
        font-size:28rpx;
        font-family:PingFangHK-Light;
        color:rgba(154,161,171,1);
        line-height:28rpx;
        &.one {
          margin: 32rpx 0 16rpx 0;
        }
      }

      .right {
        width:174rpx;
        height:72rpx;
        background:rgba(220,227,238,1);
        border-radius:36rpx 0rpx 0rpx 36rpx;
        position: absolute;
        right: 0;
        top: 84rpx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .r_wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          &.cur {
            position: relative;
            &:after {
              width:2rpx;
              height:36rpx;
              background: rgba(255,255,255,1);
              content: '';
              border-radius:4rpx;
              position: absolute;
              top: 0rpx;
              right: 0;
            }
          }
          
        }
        .r_icon {
          width: 32rpx;
          height: 32rpx;
          
        }
      }
    }
    .content {
      background:rgba(250,251,253,1);
      .card_block {
        position: relative;
        margin: 0 50rpx;
        display: flex;
        justify-content: flex-end;
        margin-top: 40rpx;
        .blo_img {
          width:130rpx;
          height:130rpx;
          position: absolute;
          border-radius: 50%;
          left: -50rpx;
          top: 50rpx;
          box-shadow:0rpx 20rpx 40rpx 0rpx rgba(153,193,214,0.1);
          border:4rpx solid rgba(255,255,255,1);
          box-sizing: border-box;
        }
        .blo_msg {
          width:600rpx;
          height:230rpx;
          background:rgba(255,255,255,1);
          box-shadow:0rpx 10rpx 30rpx 0rpx rgba(153,193,214,0.1),0rpx -5rpx 40rpx 0rpx rgba(153,193,214,0.08);
          border-radius:18rpx;
          padding: 56rpx 0 56rpx 120rpx;
          box-sizing: border-box;
          text-align: left;
          position: relative;
          .msg_name {
            font-size:34rpx;
            font-family:PingFangHK-Medium;
            color:rgba(70,71,72,1);
            line-height:34rpx;
            width: 180rpx;
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
          .flock_style {
            width:170rpx;
            height:66rpx;
            position: absolute;
            right: 32rpx;
            top: 32rpx;
            background:rgba(0,208,147,1);
            border-radius:33rpx;
            font-size:28rpx;
            font-family:PingFangHK-Regular;
            color:rgba(255,255,255,1);
            line-height:66rpx;
            text-align: center;
            &.type_2 {
              background:rgba(255,255,255,1);
              color:rgba(154,161,171,1);
            }
          }
        }
      }
      .hintJoin {
        height:37rpx;
        font-size:26rpx;
        font-family:PingFangHK-Regular;
        color:rgba(195,201,212,1);
        line-height:37rpx;
        text-align: center;
        margin-top: 70rpx;
      }
    }
    .peoList {
    }
  }
  .footer {
    height: 96rpx;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1000;
    width:100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    font-family:PingFangHK-Regular;
    line-height: 96rpx;
    .quit {
      width:222rpx;
      color:#B2B6C2;
      font-size:32rpx;
      background:#ffffff; 
    }
    .joinShare {
      flex: 1;
      background:rgba(0,208,147,1);
      font-family:PingFangHK-Regular;
      color:rgba(255,255,255,1);
      height: 96rpx;
      font-size:32rpx;
      line-height: 96rpx;
    }
  }
</style>
<template>
  <view class="container" >
    <view class="flock_msg">
      <view class="left">
        <open-data class="name cur" type="groupName" :open-gid="msg.id"></open-data>
        <view class="txt one">已有{{flockInfo.memberCount}}张群成员名片</view>
        <view class="txt">此群名片仅本群成员可见</view>
      </view>
      <view class="right">
        <view class="r_wrap cur" @tap="toIndex">
          <image class="r_icon" src="/static/images/float_btn_returnhome@3x.png"></image>
        </view>
        <button class="r_wrap" open-type="share" data-type="flock">
          <image class="r_icon" src="/static/images/float_btn_share@3x.png"></image>
        </button>
      </view>
    </view>
    <view class="content">
      <view class="peoList">
        <view class="card_block" v-for="(item, index) in flockInfo.groupMemberList"  :key="key">
          <view class="blo_msg" @tap="toDetail(item)">
            <image class="blo_img" :src="item.headimgurl" v-if="item.headimgurl"></image>
            <image class="blo_img" src="/static/images/new_pic_defaulhead.jpg" v-else></image>
            <view class="msg_name ellipsis">{{item.nickname}}</view>
            <view class="msg_tit ellipsis">{{item.occupation}}</view>
            <view class="msg_company ellipsis">{{item.company}}</view>
            <view class="flock_style" @tap.stop="swopSlock(item.id)" v-if="item.id!=userInfo.id && item.handle_status == 1">交换名片</view>
            <view class="flock_style type_2" v-else-if="item.id!=userInfo.id && (item.handle_status == 2 ||item.handle_status == 3)">已申请</view>
            <view class="flock_style type_2" v-else-if="item.id!=userInfo.id && item.handle_status == 4">已交换</view>
          </view>
        </view>
      </view>

      <view class="hintJoin" v-if="!isJoin && isFirst">—— 加入后即可查看所有群成员的名片 ——</view>
    </view>
    <view class="footer">
      <block v-if="isJoin">
        <view class="quit" @tap="quit">退出该群</view>
        <button open-type="share" data-type="flock" class="joinShare">邀请群里的成员加入</button>
      </block>
      <block v-if="!isJoin && isFirst">
        <button class="joinShare" @tap="join">加入该群名片</button>
      </block>
    </view>
    <mptoast />
    
  </view>
</template>
<script>
  import mptoast from 'mptoast'
  import { joinUserGroup, isJoinUserGroup,getUserGroupInfo, getFriends, deleteFriends, getUserGroupList, setUserGroup, editGroupInfo, quitGroup } from '@/api/pages/cardcase'
  import {  indexLike  } from '@/api/pages/user'

export default {
  components: {
    mptoast
  },
  data () {
    return { 
      userInfo: [],
      flockInfo:[],
      isJoin: false,
      isFirst: true,
      msg: {
        id: '',
        vkey: ''
      }
    }
  },

  methods: {
    toIndex () {
      wx.reLaunch({
        url: `/pages/index/main`
      })
    },
    toDetail (item) {
      wx.navigateTo({
        url: `/pages/detail/main?vkey=${item.friend_user_info.vkey}`
      })
    },
    join () {
      let that = this
      console.log('jiaru=========')
      joinUserGroup({userGroupId:this.msg.vkey}).then((res)=>{
        if(res.http_status == 200){
          that.$mptoast('成功加入')
          that.isJoin = true
          that.updateData()
        }
        console.log(1111,res)
      },(res)=>{
        that.$mptoast(res.msg)
        console.log('error1111',res)
      })
    },

    quit () {
      let that = this
      wx.showModal({
        title: '提示',
        content: '确定要退出 “群名片名称” 群名片么？',
        success: function(res) {
          if (res.confirm) {
            quitGroup({id:that.msg.vkey}).then((res)=>{
              console.log(res)
              if(res.http_status == 200){
                that.$mptoast('成功退出')
                that.isJoin = false
                that.updateData()
              }else {
                that.$mptoast(res.msg)
              }
            },(res)=>{
              that.$mptoast(res.msg)
            }).catch(function(error) {
              that.$mptoast(res.msg)
            });
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    swopSlock (id) {
      let that = this
      wx.showModal({
        title: '提示',
        content: '是否申请与该用户交换名片',
        success: function(res) {
          let msg = {
              to_uid: id, //data.unionid
          }
          if (res.confirm) {
            indexLike(msg).then((res)=>{
              console.log(res)
              if(res.http_status == 200){
                that.$mptoast('成功')
              }else{
                that.$mptoast(res.msg)
              }
            })
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    toCreate () {
      this.$mptoast('创建')

      wx.navigateTo({
        url: `/pages/createCard/main`
      })
    },

    updateData(){
      let that = this
      getUserGroupInfo(that.msg.vkey).then((res)=>{
        console.log('更新',res)
        that.flockInfo = res.data

        if(res.http_status == 200){ 

        }else {
          that.$mptoast(res.msg)
        }
      })
    },
  },

  created () {
  },

  onLoad(res) {

    console.log(res,'群详情页面')
    let that = this
    let user = this.$store.getters.userInfo
    that.userInfo = user

    if(res&&res.id){
      that.msg= {
        id: res.id,
        vkey: res.vkey
      }

      isJoinUserGroup({userGroupId
        : res.vkey}).then((msg)=>{
        console.log(msg)
        if(msg.code == 201){
          console.log('weijiaru')
          that.isJoin = false
        }else if(msg.code==0){
          that.isJoin = true
        }
      })
      that.updateData()
    }else {
      that.$mptoast('缺少信息')
    }

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
}
</script>

