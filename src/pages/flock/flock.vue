
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
        <view class="r_wrap" v-if="!authorize" @tap="toShare">
          <image class="r_icon" src="/static/images/float_btn_share@3x.png"></image>
        </view>
        <button class="r_wrap" v-else open-type="share" data-type="flock">
          <image class="r_icon" src="/static/images/float_btn_share@3x.png"></image>
        </button>
      </view>
    </view>
    <view class="content">
      <view class="peoList" :style="{ height: spHeight+'rpx' }">

        <block v-for="(item, index) in flockInfo.groupMemberList"  :key="key">
            <block v-if="!isJoin">
              <view class="card_block" v-if="index<10">
              <view class="blo_msg" @tap="toDetail(item)" :class="{'cur': item.id!=userInfo.id&&item.memberRedDot>0}" >
                <image class="blo_img" :src="item.avatar_info.smallImgUrl" v-if="item.avatar_info&&item.avatar_info.smallImgUrl"></image>
                <image class="blo_img" src="/static/images/pic_defaulhead@3x.png" v-else></image>
                <view class="msg_name ellipsis">{{item.nickname}}</view>
                <view class="msg_tit ellipsis">{{item.occupation}}</view>
                <view class="msg_company ellipsis">{{item.company}}</view>
                <view class="flock_style" @tap.stop="swopSlock(item.id,index)" v-if="item.id!=userInfo.id && item.handle_status == 1">交换名片</view>
                <view class="flock_style type_2" v-else-if="item.id!=userInfo.id && (item.handle_status == 2 ||item.handle_status == 3)">已申请</view>
                <view class="flock_style type_2" v-else-if="item.id!=userInfo.id && item.handle_status == 4">已交换</view>
              </view>
              </view>
            </block>

            <block v-else>
              <view class="card_block" >
              <view class="blo_msg" @tap="toDetail(item)" :class="{'cur': item.id!=userInfo.id&&item.memberRedDot>0}" >
                <image class="blo_img" :src="item.avatar_info.smallImgUrl" v-if="item.avatar_info&&item.avatar_info.smallImgUrl"></image>
                <image class="blo_img" src="/static/images/pic_defaulhead@3x.png" v-else></image>
                <view class="msg_name ellipsis">{{item.nickname}}</view>
                <view class="msg_tit ellipsis">{{item.occupation}}</view>
                <view class="msg_company ellipsis">{{item.company}}</view>
                <view class="flock_style" @tap.stop="swopSlock(item.id,index)" v-if="item.id!=userInfo.id && item.handle_status == 1">交换名片</view>
                <view class="flock_style type_2" v-else-if="item.id!=userInfo.id && (item.handle_status == 2 ||item.handle_status == 3)">已申请</view>
                <view class="flock_style type_2" v-else-if="item.id!=userInfo.id && item.handle_status == 4">已交换</view>
              </view>
              </view>
            </block>
        </block>

        
        <view class="hintJoin" v-if="!isJoin">—— 加入后即可查看所有群成员的名片 ——</view>
      </view>

      
    </view>
    <view class="footer">
      <block v-if="isJoin">
        <view class="quit" @tap="quit">退出该群</view>
        <button open-type="share" data-type="flock" class="joinShare">邀请群里的成员加入</button>
      </block>
      <block v-if="!isJoin">
        <button class="joinShare" @tap="join">加入该群名片</button>
      </block>
    </view>
    <mptoast />
    <authorize-pop :showPop='showPop'></authorize-pop>
    
  </view>
</template>
<script>
  import mptoast from 'mptoast'
  import { joinUserGroup, isJoinUserGroup,getUserGroupInfo, getFriends, deleteFriends, getUserGroupList, setUserGroup, editGroupInfo, quitGroup } from '@/api/pages/cardcase'
  import {  indexLike  } from '@/api/pages/user'
  import { deleteRedFlock } from '@/api/pages/red'
  import authorizePop from '@/components/authorize'
  import { getUserInfoApi } from '@/api/pages/user'
  import {mapState} from 'vuex'
export default {
  components: {
    mptoast,
    authorizePop
  },
  data () {
    return { 
      userInfo: [],
      flockInfo:[],
      isJoin: false,
      isFirstFlock: true,
      spHeight: '',
      msg: {
        id: '',
        vkey: ''
      },
      needAuthorize: null,
      shareData: {},
      showPop: false,
      isFlockId: false,
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.global.userInfo,
    })
  },
  computed: {
    authorize () {
      if (this.$store.getters.userInfo.vkey) {
        return true
      } else {
        return false
      }
    }
  },

  onLoad(res) {
    console.log(res,'群详情页面')
    let that = this
    let adaptive = wx.setStorageSync('adaptive')
    if(!adaptive){
      wx.getSystemInfo({
        success: function(res) {
          that.spHeight = (res.windowHeight-120-50)*2;
        }
      })
    }

    if(res&&res.id){
      that.msg= {
        id: res.id,
        vkey: res.vkey
      }

      that.isFlockId = true
      isJoinUserGroup({userGroupId: res.vkey}).then((msg)=>{
        if(msg.code == 201){
          that.isJoin = false
        }else if(msg.code==0){
          that.isJoin = true
        }
      })
    }else {
      wx.navigateTo({
        url: `/pages/index/main`
      })
      return
    }

    getUserInfoApi().then(data => {
      that.userInfo = data.data
      let msg = {
        uid: that.userInfo.id,
        name: that.userInfo.nickname,
        img: that.userInfo.avatar_info.bigImgUrl,
        occupation: that.userInfo.occupation,
        company: that.userInfo.company,
        label: [],
      }

      that.userInfo.other_info.realm_info.forEach(item => {
        msg.label.push(`${item.name} | `)
      })

      console.log(msg)
      msg.label = msg.label.join('')
      msg.label = msg.label.slice(0, msg.label.length-3)

      getShareImg(msg).then(res => {
        msg.shareImg = res.data
        that.shareData = msg
      })
    })
  },

  onShow(){
    this.needAuthorize = this.$store.getters.needAuthorize

    if (!this.authorize) {
      authorizePop.methods.checkLogin().then(res => {
      })
    }

    if (this.isFlockId){
       this.updateData()
    }
  },

  onShareAppMessage: function (res) {
    let  path = '/pages/flock/main?';
    let shareInfo = this.$store.getters.shareInfo
    let that = this
    let title = shareInfo.index.content
    let imageUrl = shareInfo.index.path

    wx.showShareMenu({
      withShareTicket: true
    })

    if (res.from === 'button' ) {
      if(res.target.dataset.type=="flock"){
        title = shareInfo.createGroupCard?shareInfo.createGroupCard.content:'' 
        imageUrl = shareInfo.createGroupCard.path?shareInfo.createGroupCard.path:''
        path='/pages/index/main?form=cardHolder&type=flock'
      }
      // 来自页面内转发按钮
    }
    console.log(path)

    return {
      title: title,
      path: path,
      imageUrl: imageUrl
    }
  },


  methods: {
    toShare () {
      if (!this.authorize) {
        this.showPop = true
        authorizePop.methods.checkLogin().then(res => {
        })
        return
      }
    },
    toIndex () {
      wx.reLaunch({
        url: `/pages/index/main`
      })
    },
    toDetail (item) {
      if (!this.authorize) {
        this.showPop = true
        authorizePop.methods.checkLogin().then(res => {
        })
        return
      }
      if (this.$store.getters.userInfo.step !== 9) {
        wx.navigateTo({
          url: `/pages/createCard/main`
        })
        return
      }
      console.log(item)
      wx.navigateTo({
        url: `/pages/detail/main?vkey=${item.vkey}`
      })
    },
    join () {
      if (!this.authorize) {
        this.showPop = true
        authorizePop.methods.checkLogin().then(res => {
        })
        return
      }
      if (this.$store.getters.userInfo.step !== 9) {
        wx.navigateTo({
          url: `/pages/createCard/main`
        })
        return
      }
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
      if (!this.authorize) {
        this.showPop = true
        authorizePop.methods.checkLogin().then(res => {
        })
        return
      }
      if (this.$store.getters.userInfo.step !== 9) {
        wx.navigateTo({
          url: `/pages/createCard/main`
        })
        return
      }
      let that = this
      wx.showModal({
        content: '群里面的大咖都勾搭完了吗',
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

    swopSlock (id,index) {
      if (!this.authorize) {
        this.showPop = true
        authorizePop.methods.checkLogin().then(res => {
        })
        return
      }
      if (this.$store.getters.userInfo.step !== 9) {
        wx.navigateTo({
          url: `/pages/createCard/main`
        })
        return
      }
      let that = this
      wx.showModal({
        content: '我要勾搭这个大咖',
        success: function(res) {
          let msg = {
              to_uid: id, //data.unionid
          }
          if (res.confirm) {
            indexLike(msg).then((res)=>{
              console.log(res)
              if(res.http_status == 200){
                that.flockInfo.groupMemberList[index].handle_status = 2
                that.$mptoast('申请成功')
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
          if(that.isFirstFlock){
            deleteRedFlock(that.msg.vkey).then((res)=>{
              that.isFirstFlock = false
            })
          }
        }else {
          that.$mptoast(res.msg)
        }
      })
    },
  },

}
</script>

<style lang="less" type="text/less" scoped>
@import url("~@/styles/animate.less");
  .container {
    height: 100vh;
    position: relative;
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
        font-family:PingFangSC-Semibold;
        color:rgba(53,57,67,1);
        line-height:48rpx;
      }
      .txt {
        font-size:28rpx;
        font-family:PingFangSC-Light;
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
          padding: 50rpx 30rpx 50rpx 120rpx;
          box-sizing: border-box;
          text-align: left;
          position: relative;
          &.cur {
            &:after {
              content: '';
              width:20rpx;
              height:20rpx;
              border-radius: 50%;
              background:rgba(255,102,102,1);
              position: absolute; 
              top: 62rpx;
              left: 50rpx;
            }
          }
          .msg_name {
            font-size:34rpx;
            font-family:PingFangSC-Medium;
            color:rgba(70,71,72,1);
            line-height:34rpx;
            width: 180rpx;
            margin-right: 20rpx;
            height: 38rpx;
          }
          .msg_tit {
            font-size:28rpx;
            font-family:PingFangSC-Light;
            color:rgba(154,161,171,1);
            line-height:28rpx;
            margin: 26rpx 0 10rpx 0;
          }
          .msg_company {
            font-size:28rpx;
            font-family:PingFangSC-Light;
            color:rgba(154,161,171,1);
            line-height:28rpx;
          }
          .flock_style {
            width:170rpx;
            height:66rpx;
            position: absolute;
            right: 32rpx;
            top: 30rpx;
            background:rgba(0,208,147,1);
            border-radius:33rpx;
            font-size:28rpx;
            font-family:PingFangSC-Regular;
            color:rgba(255,255,255,1);
            line-height:66rpx;
            text-align: center;
            &.type_2 {
              font-size:28rpx;
              font-family:PingFangHK-Light;
              background:rgba(255,255,255,1);
              color:rgba(154,161,171,1);
            }
          }
        }
      }
      .hintJoin {
        height:37rpx;
        font-size:26rpx;
        font-family:PingFangSC-Regular;
        color:rgba(195,201,212,1);
        line-height:37rpx;
        text-align: center;
      }
    }
    .peoList {
      padding-bottom: 60rpx;
      overflow-y:scroll;
      -webkit-overflow-scrolling: touch;
      box-sizing: border-box;
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
    font-family:PingFangSC-Regular;
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
      font-family:PingFangSC-Regular;
      color:rgba(255,255,255,1);
      height: 96rpx;
      font-size:32rpx;
      line-height: 96rpx;
    }
  }
</style>