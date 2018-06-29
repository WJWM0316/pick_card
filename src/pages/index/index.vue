
<template>
  <view class="container" >
    <view class="op_top">
      <view class="left" @click="toFiltrate">筛选</view>
      <view class="right" @click="toSwop">交换申请<view class="new">NEW</view></view>
    </view>
    <view class="content">
      <view class="peopList">
        <block v-for="(item, index) in usersList" :key="key" >
          <view :index="index" class="peop_blo "
          :class="{
            'test': nowIndex==index, 
            'outLeft animated test': nowIndex-1==index&&moveData.style=='left',  'outRight animated test': 
            nowIndex-1==index&&moveData.style=='right'
          }" 
          @tap="toDeatil(item)" 
          @touchstart="tStart" 
          @touchend="tEnd" 
          @touchmove="tMove" >
            <view class="top">
              <image class="bage" :src="item.avatar_info.middleImgUrl" v-if="item.avatar_info.middleImgUrl"></image>
              <image class="bage" src="/static/images/img.jpg" v-else></image>
              <view class="location">
                <image class="adr" src="/static/images/home_icon_location_nor@3x.png"></image>
                广州市
              </view>
              <view class="text">
                <view class="name">{{item.nickname}}</view>
                <view class="title">{{index}}{{item.occupation}}</view>
                <image class="detail" src="/static/images/hone_btn_more_nor@3x.png"></image>
              </view>
            </view>
            <view class="bottom">
              <view class="signature" v-if="item.sign.length>0">{{item.sign}}</view>
              <view class="signature" v-else>这个人很懒，不想写个性签名~</view>
              <view class="labelList">
                <view class="label_blo">
                  移动互联网
                </view>
                <view class="label_blo">
                  移动互联网
                </view>
                <view class="label_blo">
                  移动互联网
                </view>
              </view>
            </view>
          </view>
        </block>
        <view class="btns" >
          <button class="btn delate" @click="likeOp('left')">
            <image src="/static/images/home_btn_unlike_nor@3x.png"></image>
          </button>
          <button class="btn like" @tap="likeOp('right')">
            <image src="/static/images/home_btn_like_nor@3x.png"></image>
          </button>
        </view>
        <image class="moveImg moveLeft"  src="/static/images/home_toast_unlike@3x.png"
        :class="{'fadeOutLeft animated show': 
          moveData.style=='left'
        }" 
        ></image>
        <image class="moveImg moveRight"  src="/static/images/home_toast_like@3x.png"
        :class="{'fadeOutRight animated show': 
          moveData.style=='right'
        }"  
        ></image>
        　
      </view>
    </view>
    <view class="footer">
      <view class="left">
        <view class="name cur" @tap="toCre">Pick</view>
        <view class="name" @tap="toCardHolder">名片夹</view>
        <view class="name"  @tap="toCenter">我的名片</view>
      </view>
      <view class="right">
        <view class="r_blo">
          <image class="detail" src="/static/images/home_tab_btn_info_nor@3x.png"></image>
        </view>
        <view class="r_blo" @click="isShare2">
          <image class="detail"  src="/static/images/home_tab_btn_share_nor@3x.png"></image>
        </view>
      </view>
    </view>
    <authorize-pop :isIndex='true'></authorize-pop>
    <mptoast />
    
    <!-- 分享弹窗 -->
    <view class="pop_warp" v-if="isPop">
      <view class="share_pop" v-if="isShare"> 
        <image @click="cloSahre" class="share_clo" src="/static/images/popup_btn_close_nor@3x.png"></image>
        <image class="share_cont" src="/static/images/popup_pic_share@3x.png"></image>
        <view class="tit" @tap="toCardHolder">分享你的趣名片</view>
        <view class="txt">召唤你的朋友们一起来玩吧！</view>

        <view class="btns">
          <button class="btn friend" @click="likeOp('left')">
            <view class="img_warp">
              <image src="/static/images/details_icon_wechat@3x.png"></image>
            </view>
            <view class="bt_txt">分享到微信</view>
          </button>
          <button class="btn friends" @tap="likeOp('right')">
            <view class="img_warp">
              <image src="/static/images/float_btn_share@3x.png"></image>
            </view>
            <view class="bt_txt">分享朋友圈</view>
          </button>
        </view>
      </view>
      <view class="guidance_pop" v-if="gdData.isGd" @click="firstGDClick">
        <image class="gd_cont" v-if="gdData.step == 1" src="/static/images/dafult_pic01@3x.png"></image>
        <image class="gd_cont" v-else src="/static/images/dafult_pic02@3x.png"></image>
        <view class="txt" @tap="toCardHolder">不感兴趣，没关系，看看下一个人吧 </view>
        <view class="txt">把卡片往左滑，或者点这个按钮也可以哦～</view>
        <view class="bot_cont">
          <image class="bot_img bot_left_icon1" src="/static/images/dafult_icom_unlike@3x.png" v-if="gdData.step==1"></image>
          <image class="bot_img bot_right_icon1" src="/static/images/dafult_icom_like@3x.png" v-else></image>
        </view>
      </view>

      <!-- 跳转创建 -->
      <view class="createMe" v-if="toMeCreate">
        <image class="close"  @tap="cloCrea" src="/static/images/popup_btn_close_nor@3x.png"></image>
        <image class="head" src="/static/images/img.jpg"></image>
        <view class="title">Opps！你还没创建自己的名片</view>
        <view class="msg">要和这几位大咖交换名片的话， 点击下方按钮，创建自己的名片吧!</view>
        <button class="btn" @tap="toCre" type="primary">创建自己的名片</button>
      </view>
    </view>
  </view>
</template>
<script>
  import mptoast from 'mptoast'
  import App from '@/App'
  import {loginApi} from '@/api/pages/login'
  import authorizePop from '@/components/authorize'
  import { getUserInfoApi, getIndexUsers, indexLike, indexUnlike } from '@/api/pages/user'

export default {
  
  components: {
    mptoast,
    authorizePop
  },
  data () {
    return { 
      interval: null,
      usersList: [],
      userInfo: [],
      toCreate: {
        isToCreate: false,
        num: 0
      },
      touchDot: 0,
      time: 0,
      nowIndex: 0,
      moveData: {
        isMove: false,
        style: '',  //left or right
      },
      isShare: false,
      gdData : {
        isGd: false,
        step: 1
      },  //
      getPage: {
        page: 1,
        count: 20,
      },// 首页列表信息参数
      toMeCreate: false,
      isPop: false,
    }
  },


  methods: {
    //是否第一次进入 展示引导图
    isFirst(){
      let that = this
      try {
        var value = wx.getStorageSync('pickCardFirst')
        if (!value) {
          that.gdData = {
            isGd: true,
            step: 1
          }
          that.isPop = true
            // Do something with return value
        }
      } catch (e) {
        // Do something when catch error
      }
    },
    firstGDClick(){
      if(this.gdData.step == 1){
        this.gdData.step = 2
      }else if(this.gdData.step == 2){
        this.gdData = {
          isGd: false,
          step: 1
        }
        this.isPop = false
        try {
            wx.setStorageSync('pickCardFirst', '1')
            this.isPop = true
            this.toMeCreate=true
        } catch (e) {    
        }
      }
    },
    cloSahre(){
      this.isPop = false
      this.isShare=false
    },
    cloCrea(){
      this.isPop = false
      this.toMeCreate=false
    },
    isShare2 () {
      this.isPop = true
      this.isShare = true
    },
    toDeatil (item) {
      wx.navigateTo({
        url: `/pages/detail/main?vkey=${item.vkey}`
      })
    },
    toCardHolder () {
      wx.navigateTo({
        url: `/pages/cardHolder/main`
      })
    },
    toCenter () {
      wx.navigateTo({
        url: `/pages/center/main`
      })
    },
    toFiltrate () {
      wx.navigateTo({
        url: `/pages/filtrate/main`
      })
    },
    toSwop () {
      wx.navigateTo({
        url: `/pages/swopList/main`
      })
    },
    toCre () {
      this.cloCrea()
      wx.navigateTo({
        url: `/pages/createCard/main`
      })
    },
    tStart (e) {
      let that = this
      that.touchDot = e.touches[0].pageX
      that.interval =  setInterval(function () {  
         that.time++;  
      }, 100);  

      that.moveData={
        isMove: true,
        style: '', 
      }
    },
    tMove (e) {
      let touchMove = e.touches[0].pageX
      let touchDot = this.touchDot
      let status = false
      /*console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot)); */
      // 向左滑动    

      if (touchMove - touchDot <= -40 && this.time < 10) {  
        status = 'left'
      }  
      // 向右滑动  
      else if (touchMove - touchDot >= 40 && this.time < 10) {  
        status = 'right'
      }  

      if(this.moveData.isMove && status){
        this.likeOp(status)
      }
    },
    tEnd (e) {
      clearInterval(this.interval); // 清除setInterval  
      this.time = 0;  
    },
    isCreate (){
      var value = wx.getStorageSync('pickCardFirst')
      if(this.userInfo.step<4 && value){
        this.isPop = true
        this.toMeCreate=true
      }
    },
    likeOp (status){
      let that = this
      let data = this.usersList[this.nowIndex]
      let msg = {
        to_uid: data.id, //data.unionid
      }
      if(status && status == 'right') {
        indexLike(msg).then((res)=>{
          console.log(res)

          this.nowIndex ++
        if(!this.toCreate.isToCreate){
          that.isCreate()
          this.toCreate.isToCreate = true
        }
          

          this.moveData={
            isMove: false,
            style: 'right', 
          }
        },(res)=>{
          console.log(res)
          this.$mptoast(res.msg)
        })

      }else if(status && status == 'left'){
        this.moveData = {
          isMove: false,
          style: 'left', 
        }
        this.nowIndex ++
        this.toCreate.num++
        if(this.toCreate.num == 2 && !this.toCreate.isToCreate){
          that.isCreate()

          this.toCreate.isToCreate = true
        }

      } 
      if(this.usersList.length-this.nowIndex == 4){
        console.log('next============todo=====')
        this.getPage.page++
        getIndexUsers(this.getPage).then((res)=>{
          this.usersList = [...this.usersList,...res.data]
          if(this.usersList.length==this.nowIndex){
            this.$mptoast('没有更多名片')
          }
        })
      }
    },
  },

  onShareAppMessage: function (res) {
    wx.showShareMenu({
      withShareTicket: true
    })
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '自定义转发标题',
      path: '/pages/index/main?type=share'
    }
  },
  

  onLoad(res) {
    let that = this

    App.methods.checkLogin().then((res)=>{
      getIndexUsers(this.getPage).then((res)=>{
        that.usersList = res.data
      })

      getUserInfoApi().then((res)=>{
        that.userInfo = res.data
        console.log('=============当前用户信息',res)
      })
      /*setTimeout(()=>{
        var value = wx.getStorageSync('pickCardFirst')
        if(this.$store.getters.userInfo.step<4 && value){
          this.isPop = true
          this.toMeCreate=true
        }
      },1000)*/
    },(res)=>{
      console.log('登陆失败',res)
    })

    

    that.isFirst()
  },
  onShow (res) {
  }
}
</script>
<style lang="less" type="text/less" scoped>
@import url("~@/styles/animate.less");

  .container {
    height: 100vh;
    background:rgba(250,251,252,1);
  }
  .createMe {
    width:670rpx;
    background: #fff;
    border-radius: 18rpx;
    padding: 40rpx 50rpx;
    text-align: center;
    position: relative;
    box-sizing: border-box;
    .close {
      width: 28rpx;
      height: 28rpx;
      position: absolute;
      top: 40rpx;
      right: 40rpx;
    }
    .head {
      width:342rpx;
      height:324rpx;
      margin: 0 auto;
      display: block;
    }
    .title {
      margin-top: 40rpx;
      font-size: 34rpx;
      color: #353943;
      line-height: 1.4;
      font-weight: 500;
    }
    .msg {
      margin-top: 28rpx;
      font-size:28rpx;
      color:#9AA1AB;
      line-height: 1.4;
      font-weight: light;
    }
    .btn {
      margin-top: 54rpx;
      width:100%;
      height:98rpx;
      line-height:98rpx;
      background:rgba(0,208,147,1);
      border-radius:49rpx;
    }
  }
  @keyframes outLeft {
    from {
    }

    to {
      -webkit-transform: translate3d(-200%, 0, 0);
      transform: translate3d(-200%, 0, 0);
    }
  }
  .outLeft {
    -webkit-animation-name: outLeft;
    animation-name: outLeft;
    z-index: 1;
  }
  @keyframes outRight {
    from {
    }
    to {
      -webkit-transform: translate3d(200%, 0, 0);
      transform: translate3d(200%, 0, 0);

    }
  }
  .outRight {
    -webkit-animation-name: outRight;
    animation-name: outRight;
    z-index: 1;
  }
  .moveImg {
    width:140rpx;
    height:140rpx;
    position: absolute;
    border-radius: 50%;
    top: 311rpx;
    display: none;
    &.moveRight {
      right: 160rpx;
    }
    &.moveLeft {
      left: 160rpx;
    }
    &.show {
      display: block;
    }
  }
  
  .pop_warp {
    background:rgba(0,0,0,0.7);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
    display: flex;
    justify-content: center;
    align-items: center;
    .guidance_pop {
      .gd_cont {
        width: 479rpx;
        height: 498rpx;
        margin:  138rpx auto 100rpx auto;
        display: block;
      }
      .txt {
        height:30rpx;
        font-size:30rpx;
        font-family:PingFangSC-Regular;
        color:rgba(255,255,255,1);
        line-height:30rpx;
        text-align: center;
        margin-bottom: 14rpx;
      }
      .bot_cont {
        width: 350rpx;
        height: 226rpx;
        position: relative;
        margin: 0 auto;
        margin-top: 47rpx;
        .bot_img {
          width: 350rpx;
          height: 226rpx;
          position: absolute;
        }
        .bot_left_icon1 {
          margin-right: 20rpx;
        }
        .bot_right_icon1 {
          margin-left: 15rpx;
        }
      }
      
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
      }
      .btns {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .btn {
          width:140rpx;
          height:104rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          &.friend {
            margin-right: 100rpx;
            image {
              width:50rpx;
              height:42rpx;
            }
          }
          &.friends {
            image {
              width:50rpx;
              height:49rpx;
            }
          }
          .bt_txt {
            font-size:28rpx;
            font-family:PingFangHK-Regular;
            color:rgba(178,182,194,1);
            line-height:26rpx;
          }
          image {
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
  }
  .op_top {
    height: 94rpx;
    padding: 0 40rpx;
    //width: 100%;
    line-height: 94rpx;
    font-size:32rpx;
    font-family:PingFangSC-Light;
    color:rgba(53,57,67,1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .right {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .new {
        width:60rpx;
        height:30rpx;
        background:rgba(255,81,80,1);
        box-shadow:0px 2rpx 4rpx 0rpx rgba(0,0,0,0.1);
        border-radius:87rpx;
        border:2rpx solid rgba(255,255,255,1);
        margin-left: 8rpx;
        font-size:16rpx;
        font-family:HelveticaNeue-Medium;
        color:rgba(255,255,255,1);
        line-height:30rpx;
        text-align: center;
      }
    }
  }
  .content {
    height: 930rpx;
    position: relative;
    .peopList {
      width:640rpx;
      height:930rpx;
      //height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
    }
    .peopList {
      position: relative;
    }
    .peop_blo {
      width:640rpx;
      height:930rpx;
      margin: 0 auto;
      border-radius: 18rpx;
      overflow: hidden;
      position: absolute;
      //border: 1rpx solid red;
      box-sizing: border-box;
      background: #ffffff;
      display: none;
      box-shadow:0rpx 17rpx 28rpx 0rpx rgba(220,227,238,0.2);
      &.test {
        display: block;
      }
      .top {
        width:640rpx;
        height:590rpx;
        
        border-radius:18rpx 18rpx 0rpx 0rpx;
        position: relative;
        .bage {
          width:640rpx;
          height:590rpx;
          position: absolute;
          left: 0;
          top: 0;
          //z-index: -1;
        }
        .location {
          width:140rpx;
          height:50rpx;
          background:rgba(53,57,67,0.2);
          border-radius:25rpx;
          display: flex;
          position: absolute;
          right: 20rpx;
          top: 20rpx;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          font-size:24rpx;
          font-family:PingFangHK-Regular;
          color:rgba(255,255,255,1);
          line-height: 50rpx;
          display: none;
          .adr {
            width:20rpx;
            height:24rpx;
            margin-right: 8rpx;
          }
        }
        .text {
          height: 120rpx;
          position: absolute;
          background:linear-gradient(180deg,rgba(255,255,255,0),rgba(0,0,0,0.4));
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 0 0 0 34rpx;
          box-sizing: border-box;
          .name {
            font-size:48rpx;
            font-family:PingFang-SC-Medium;
            color:rgba(250,251,252,1);
            line-height:48rpx;
            margin-bottom: 10rpx;
          }
          .title {
            width: 470rpx;
            font-size:32rpx;
            font-family:PingFangSC-Light;
            color:rgba(255,255,255,1);
            line-height:32rpx;
          }
          .detail {
            width:50rpx;
            height:50rpx;
            position: absolute;
            right: 20rpx;
            bottom: 20rpx;
          }
        }
      }
      .bottom {
        width:640rpx;
        height:340rpx;
        background: #ffffff;
        padding: 24rpx 34rpx;
        box-sizing: border-box;
        .signature {
          font-size:28rpx;
          font-family:PingFangSC-Light;
          color:rgba(154,161,171,1);
          line-height:28rpx;
          margin-bottom: 34rpx;
        }
        .labelList {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .label_blo {
            padding: 12rpx 26rpx;
            box-sizing: border-box;
            font-size:24rpx;
            font-family:PingFangHK-Regular;
            border-radius:24px;
            color:rgba(0,208,147,1);
            line-height:24rpx;
            text-align: center;
            border: 1rpx solid rgba(0,208,147,1);
            margin-right: 10rpx;
          }
        }
      }
    }
    .btns {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 132rpx;
      position: absolute;
      bottom: -66rpx;
      left: 50%;
      margin-left: -189rpx;
      width: 378rpx;
      z-index: 10;
      .btn {
        width:132rpx;
        height:132rpx;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .delate {
        background: rgba(220,227,238,1);
        image {
          width: 40rpx;
          height: 40rpx;
          display: block;
        }
      }
      .like {
        background: rgba(0,208,147,1);
        image {
          width: 60rpx;
          height: 46rpx;
          display: block;
        }

      }
    }
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
</style>
