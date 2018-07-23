<template>
  <view class="container" >
    <view class="tit">
      
      <view class="item "  :class="{'cur':nowIndex==0,'red':topRed.user_card_count>0}" @click="select(0)" >
        个人名片
        <form report-submit="true" class="from-box" @submit="fromClick">
            <button formType="submit" class="from-mask  "></button>
        </form>
      </view>
      <view class="item flock " :class="{'cur':nowIndex==1,'red':topRed.user_group_card_count>0}" @click="select(1)" >
        群名片
        <form report-submit="true" class="from-box" @submit="fromClick">
            <button formType="submit" class="from-mask  "></button>
        </form>
      </view>
    </view>
    <view class="content">
      
      <view :style="{ height: spHeight+'rpx' }" class="swip" >
          <view class="ops">
            <button open-type="share" data-type="myDetail" class="ops_blo shareMe" >
              <image src="/static/images/cardcase_banner_left@3x.png"></image>
              分享我的名片
            </button>
            <button class="ops_blo createFlock" open-type="share" data-type="flock" >
              <image src="/static/images/cardcase_banner_right@3x.png"></image>创建群名片
            </button>
          </view>
          <block v-if="nowIndex == 0">
            <scroll-view @scrolltolower="loadNext" scroll-y=true class="friendList" v-if="friendList.length>0">
                
                  <form report-submit="true" class="card_block" @submit="fromClick" v-for="(item, index) in friendList" :key="key">
                      <button formType="submit" @tap="toDetail(item)">
                        <view class="blo_msg listone" :class="{'one': item.has_red_dot == 1}" >
                          <image class="blo_img" :src="item.friend_user_info.avatar_info.smallImgUrl" v-if="item.friend_user_info.avatar_info"></image>
                          <image class="blo_img" src="/static/images/pic_defaulhead@3x.png" v-else></image>

                          <view class="msg_name ellipsis" >{{item.friend_user_info.nickname}}</view>
                          <view class="msg_tit  ellipsis">{{item.friend_user_info.occupation}}</view>
                          <view class="msg_company ellipsis">{{item.friend_user_info.company}}</view>
                        </view>
                      </button>
                  </form>
              <view class="to_share" :class="{ten: adaptive == 'ten'}">
                <button open-type="share" data-type="myDetail">分享我的名片</button>，获取更多职场人脉
              </view>
            </scroll-view>
            <block  v-else>
              <scroll-view @scrolltolower="loadNext" scroll-y=true class="none_blo">
                <view class="none_txt">让名片替你说话，不动声色展现实力</view>
                <button class="none_btn" data-type="myDetail" open-type="share">去分享 </button>
              </scroll-view>
            </block>
          </block>

          <block v-else>
            <view class="flockList" v-if="florkList && florkList.list&& florkList.list.length>0">
              <form report-submit="true" class="" @submit="fromClick">
                <button formType="submit" class="card_block"  v-for="(item, index) in florkList.list" :key="key" @tap="toFlock(item,index)">

                <view class="blo_msg flock_blo" >
                  <image class="blo_img"  :src="item.listImg" v-if="item.listImg"></image>
                  <image class="blo_img"  src="/static/images/pic_defaulhead@3x.png" v-else></image>
                  <open-data class="msg_name" type="groupName" :open-gid="item.openGid"></open-data>
                  <view class="msg_tit">已有{{item.memberCount}}张群成员名片</view>

                  <view class="new_msg" v-if="item.newJoinMemberCount&&item.newJoinMemberCount>0">{{item.newJoinMemberCount}}</view>
                </view>
                </button>
              </form>
            </view>
            <block  v-else>
              <view class="none_blo">
                <view class="none_txt">创建群名片，把微信群友变成你的职场人脉</view>
                <button class="none_btn" data-type="flock" open-type="share" >去创建 </button>
              </view>
            </block>
          </block>
      </view>
    </view>

    <view class="hintPop" v-if="isShow">
      <!-- 分享弹窗 -->
      <view class="hint_cont" > 
        <view class="cont_tit" >小阔爱，sorry啦~</view>
        <view class="cont_txt">因为微信平台有限制。你分享之后，需要到对应的微信群聊里边，点击你分享的小程序卡片才能成功创建群名片喔~</view>
        <view class="cont_line"></view>

        <view class="cont_tit2">步骤详解：</view>
        <view class="cont_txt2">1.点击创建群名片——分享群名片到相应群 </view>
        <view class="cont_txt2">2.打开需要创建群名片的微信群聊 </view>
        <view class="cont_txt2">3.点击你分享的小程序卡片 </view>
        <view class="cont_txt2">4.完成创建</view>
        <view class="cont_btn " @tap="cloShow">知道了</view>

        <view class="radio-group" @tap="radioChange">
          <image class="radio-group_img" src="/static/images/popup_btn_select_nor@3x.png" v-if="!isCheck"></image>
          <image class="radio-group_img" src="/static/images/popup_btn_select_sel@3x.png" v-if="isCheck"></image>
          不再提示
        </view>
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
      shareData: {},    //
      isShow: false,   //创建群提示
      onShowSock: true,
      isCheck: false,

      getFriends: {
        id: '',
        count: 2
      },
      getFlock: {
        id: '',
        count: 2
      },
      flockNext: {
        load: true,
        isNext: true,
      },

      friendNext: {
        load: true,
        isNext: true,
      },
    }
  },
  onLoad() {
    let that = this;
    let isCheck =  wx.getStorageSync('isCheck');

    console.log('=-=-=-=-',isCheck)
    if(isCheck>0){
      this.isCheck = true
    }
    this.shareInfo = this.$store.getters.shareInfo
    that.adaptive = wx.getStorageSync('adaptive')

    getUserInfoApi().then(data => {
      that.usersInfo = data.data
      let msg = {
        uid: that.usersInfo.id,
        name: that.usersInfo.nickname,
        img: that.usersInfo.avatar_info.smallImgUrl,
        occupation: that.usersInfo.occupation,
        company: that.usersInfo.company,
        label: [],
      }

      that.usersInfo.other_info.realm_info.forEach(item => {
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
    
    wx.getSystemInfo({
      success: function(res) {
        that.systemInfo = res;
        console.log(res)
        that.spHeight = (res.windowHeight-40-50)*2;
      }
    })
  },
  onShareAppMessage: function (res) {
    console.log(res)
    let path = '/pages/index/main?';
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
        path='/pages/test/main?form=cardHolder&type=flock'
      }
      if(res.target.dataset.type=="myDetail"){
        title = shareInfo.mycard?shareInfo.mycard.content:''
        imageUrl = that.shareData.shareImg
        path = `/pages/detail/main?vkey=${this.usersInfo.vkey}`
      }
      if(res.target.dataset.type=="index"){
        title = shareInfo.index?shareInfo.index.content:''
        imageUrl = shareInfo.index.path
        path = `/pages/index/main?vkey=${this.usersInfo.vkey}&shareUid=${this.usersInfo.id}&shareType=${shareInfo.showCard.type}`
      }
      // 来自页面内转发按钮
    }

    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
      success(){
        console.log(that.isCheck)

        if(res.target.dataset.type=="flock" && !that.isCheck){
          that.isShow = true;
        }
      },
      fail(){
      },
      complete(){
        
      }
    }
  },
  onShow(res){
    let that = this;
    that.getList();
  },
  onPullDownRefresh(res){
    let that = this;

    //doing some thing
    console.log('下拉刷新执行完毕要停止当前页面下拉刷新',res)
    that.getList()
    setTimeout(function(){
        wx.stopPullDownRefresh()
    },2000)
  },

  onReachBottom(res){
    let that = this;
  },

  methods: {
    loadNext(){

      console.log(111)
      let that = this
      let flockNext = this.flockNext
      let friendNext = this.friendNext

      if(that.nowIndex==0){
        if(friendNext.getNext && friendNext.isNext ){
          this.getFriends.id = this.getFriends[this.getFriends.length-1]
          that.getFriends()
          return
        }

      }else {
        if(flockNext.getNext && flockNext.isNext ){
          this.page++
          that.getFlock()
          return
        }
      }
    },
    getFriends(){
      let that = this
      getUserGroupInfo(that.getFriends).then((res)=>{
        console.log('更新',res)
        that.friendList = res.data
        that.getNext = true
        if(res.data.length<that.getFriends.count){
          that.isNext = false
        }

      })
    },
    getFlock(){
      let that = this
      getUserGroupList(that.getListData).then((res)=>{
        console.log('更新',res)
        that.flockNext.getNext = true
        if(res.data.length<that.getFlock.count){
          that.flockNext.isNext = false
        }
        
        console.log(res)
        that.florkList = res.data
      })
    },
    getList(num){
      let that = this;
      getFriends(that.getFriends).then((res)=>{
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

      redDot().then(res=>{
        that.topRed = res.data
        that.swopRed = res.data.main_show_red_dot
      })
    },

    fromClick (e) {
      console.log(e)
      App.methods.sendFormId({
        fromId: e.mp.detail.formId,
        fromAddress: '/pages/index'
      })
    },
    radioChange(e){
      this.isCheck = !this.isCheck
    },
    cloShow(){
      this.isShow = false

      if(this.isCheck){
        wx.setStorageSync('isCheck', 1)
      }
    },
    
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
    toFlock (res,index) {
      console.log(index)
      if(res.openGid){
        this.florkList.list[index].newJoinMemberCount = 0
        this.florkList.list[index].userGroupTabRedDot = 0
        this.swopRed = 0
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

}
</script>

<style lang="less" type="text/less" scoped>
@import url("~@/styles/animate.less");
  .radio-group {
    text-align: center;
    font-size:30fpx;
    font-family:PingFangSC-Regular;
    color:rgba(154,161,171,1);
    margin-top: 40rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    image {
      width: 40rpx;
      height: 40rpx;
      margin-right: 14rpx;
    }
  }
  .hintPop {
    background:rgba(0,0,0,0.7);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
    .hint_cont{
      width:670rpx;
      background:rgba(255,255,255,1);
      border-radius:18rpx;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
      box-sizing: border-box;
      padding: 80rpx 70rpx 40rpx 70rpx;
      text-align: left;
      .cont_tit {
        font-size:36rpx;
        font-family:PingFangSC-Semibold;
        color:rgba(53,57,67,1);
        line-height:34rpx;
        margin-bottom: 40rpx;
        text-align: center;
      }
      .cont_txt {
        font-size:28rpx;
        font-family:PingFangSC-Regular;
        color:rgba(154,161,171,1);
        line-height:36rpx;
      }
      .cont_tit2 {
        font-size:28rpx;
        font-family:PingFangSC-Regular;
        color:rgba(53,57,67,1);
        line-height:40rpx;
        margin-bottom: 14rpx;
      }
      .cont_txt2 {
        font-size:28rpx;
        font-family:PingFangSC-Regular;
        color:rgba(154,161,171,1);
        line-height:50rpx;
      }
      .cont_line {
        width: 100%;
        height: 2rpx;
        background: rgba(221,221,221,1);
        margin: 40rpx 0;
      }
      .cont_btn {
        height:98rpx;
        background:rgba(0,208,147,1);
        border-radius:49rpx;
        margin: 0 auto;
        font-size:32rpx;
        font-family:PingFangSC-Regular;
        color:rgba(255,255,255,1);
        line-height:98rpx;
        text-align: center;
        margin-top: 20rpx;
      }
    }
  }
  .container {
    height: 100vh;
    //height: 930rpx;
    position: relative;
    padding-bottom: 96rpx;
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
      font-family:PingFangSC-Light;
      color:rgba(53,57,67,1);
      text-align: center;
      position: relative;
      &.red {
        &:before {
          content: '';
          width:14rpx;
          height:14rpx;
          border: 3rpx solid #ffffff;
          background:rgba(255,81,80,1);
          background:red;
          border-radius:50%;
          position: absolute;
          top: 15rpx;
          right: -10rpx;
        }
      }
      &.flock {
        margin-left: 100rpx;
        &.red {
          &:before {
            content: '';
            width:14rpx;
            height:14rpx;
            border: 3rpx solid #ffffff;
            background:rgba(255,81,80,1);
            background:red;
            border-radius:50%;
            position: absolute;
            top: 15rpx;
            right: 5rpx;
          }
        }
      }
      &.cur {
        font-size:34rpx;
        font-family:PingFangSC-Medium;
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
      height: 160rpx;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 30rpx 0 10rpx 0;
      .ops_blo {
        width:322rpx;
        height:160rpx;
        border-radius:16rpx;
        font-size:26rpx;
        font-family:PingFangSC-Regular;
        color:rgba(255,255,255,1);
        line-height:120rpx;
        position: relative;
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
      height: 100%;
      text-align: center;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .friendList,.flockList {
      
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
        box-shadow:0rpx 10rpx 30rpx 0rpx rgba(153,193,214,0.1),0rpx -5rpx 40rpx 0rpx rgba(153,193,214,0.08);
        border: 4rpx solid rgba(255,255,255,1);
        box-sizing: border-box;
        
      }
      .blo_msg {
        width:600rpx;
        height:230rpx;
        background:rgba(255,255,255,1);
        border-radius:18rpx;
        padding: 0rpx 30rpx 0rpx 120rpx;
        box-sizing: border-box;
        text-align: left;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(153,193,214,0.1),0rpx -5rpx 40rpx 0rpx rgba(153,193,214,0.08);
        &.listone {
          padding: 0 30rpx 0 120rpx;
        }
        &.one {
          &:after {
            content: '';
            width: 20rpx;
            height: 20rpx;
            border-radius: 50%;
            background: #ff5150;
            position: absolute; 
            top: 62rpx;
            left: 50rpx;
            box-sizing: border-box;
            border: 3rpx solid #ffffff;
          }
        }
        &.two {
          &:after {
            content: '';
            width:20rpx;
            height:20rpx;
            border-radius: 50%;
            background: #ff5150;
            position: absolute;
            top: 33rpx;
            left: 50rpx;
            box-sizing: border-box;
            border: 3rpx solid #ffffff;
          }
        }
        &.flock_blo {
          height: 180rpx;
          .msg_tit {
            font-size: 28rpx;
            font-family: PingFangSC-Light;
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
          background: #ff5150;
          box-shadow:0rpx 2rpx 5rpx 0rpx rgba(255,102,102,0.2);
          border-radius: 50%;
          position: absolute;
          right: 26rpx;
          top: 68rpx;
          text-align: center;
          line-height: 44rpx;
          font-size:26rpx;
          font-family:PingFangSC-Medium;
          color:rgba(255,255,255,1);
        }
        .msg_name {
          font-size:34rpx;
          font-family:PingFangSC-Medium;
          color:rgba(70,71,72,1);
          line-height:60rpx;
          height: 60rpx;

        }
        .msg_tit {
          font-size:28rpx;
          font-family:PingFangSC-Light;
          color:rgba(154,161,171,1);
          line-height:40rpx;
          height: 40rpx;
          margin: 10rpx 0 0 0;
        }
        .msg_company {
          font-size:28rpx;
          font-family:PingFangSC-Light;
          color:rgba(154,161,171,1);
          line-height:40rpx;
          height: 40rpx;
        }
      }
    }
  }
  .to_share {
    height:26rpx;
    font-size:26rpx;
    font-family:PingFangSC-Regular;
    line-height:26rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 78rpx;
    margin-bottom: 78rpx;
    text-align: center;
    color: #9AA1AB;
    &.ten {
      margin-bottom: 158rpx;
    }
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
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
    line-height:100rpx;
    margin: 0 auto;
  }
</style>
