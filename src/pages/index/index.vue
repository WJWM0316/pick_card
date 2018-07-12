
<template>
  <view class="container" :class="{'ten': adaptive == 'ten','small': adaptive == 'small'}">
    <view class="op_top">
      <view class="left" @click="toFiltrate">筛选<image class="single" src="/static/images/home_icon_select.jpg" ></image></view>
      <view class="right" @click="toSwop">交换申请<view class="new" v-if="swopRed==1">NEW</view></view>
    </view>
    <view class="content">
      <view class="peopList">
        <block v-for="(item, index) in usersList" :key="key" >
          <view :index="index" class="peop_blo "
          :class="{
            'test': nowIndex==index, 
            'outLeft animated test': nowIndex-1==index&&moveData.style=='left',  
            'outRight animated test': nowIndex-1==index&&moveData.style=='right'
          }" 
          @tap="toDetail(item)" 
          @touchstart="tStart" 
          @touchend="tEnd" 
          @touchmove="tMove" >
            <view class="top">
              <image class="bage" :src="item.avatar_info.middleImgUrl" v-if="item.avatar_info.middleImgUrl"></image>
              <image class="bage" src="/static/images/new_pic_defaulhead.jpg" v-else></image>
              <view class="location">
                <image class="adr" src="/static/images/home_icon_location_nor@3x.png"></image>
                广州市
              </view>
              <view class="text">
                <view class="name ellipsis">{{item.nickname}}</view>
                <view class="title ellipsis">{{item.occupation}}{{item.company}}</view>
                <image class="detail" src="/static/images/hone_btn_more_nor@3x.png"></image>
              </view>
            </view>
            <view class="bottom">
              <view class="signature" v-if="item.sign.length>0">{{item.sign}}</view>
              <view class="signature" v-else>这个人很懒，不想写个性签名~</view>
              <view class="labelList" >
                <block v-for="(itm, idx) in item.other_info.label_info" :key="key">
                  <block v-if="adaptive=='small'">
                    <view class="label_blo"  v-if="idx<3">
                      {{itm.name}}
                    </view>
                  </block>
                  <block v-else>
                    <view class="label_blo"  v-if="idx<6">
                      {{itm.name}}
                    </view>
                  </block>
                </block>
              </view>
            </view>
          </view>
        </block>
        <!-- 冷却 -->
        <view class="peop_blo blo_type2 blo_cooling" v-if="isCooling">
            <image class="cool_img" src="/static/images/home_dafulpage_pic_time@3x.png"></image>
            <view class="cool_time">{{coolTime}}</view>
            <view class="cool_cont">
              <view class="blo_hint_txt">你已经看了很多新朋友了，休息一下吧~</view>
              <view class="blo_hint_txt">分享邀请3位新朋友，即可立刻刷新冷却时间</view>
            </view>
        </view>
        <!-- 到底 -->
        <view class="peop_blo blo_type2 blo_end" v-if="isEnd">
            <image class="end_img" src="/static/images/home_dafulpage_pic_nomore@3x.png"></image>
            <view class="end_cont">
              <view class="blo_hint_txt">很遗憾...暂时没有新的朋友啦，建议你放宽 筛选范围。也可以分享给小伙伴们，大家 一起来玩趣名片哦！</view>
            </view>
        </view>
        <view class="btns" >
          <button class="btn type2" data-type="me" open-type="share" v-if="isCooling || isEnd">
            <image src="/static/images/dafulpage_btn_share@3x.png"></image>
          </button>
          <block v-else>
            <button class="btn delate" @click="likeOp('left')">
              <image src="/static/images/home_btn_unlike_nor@3x.png"></image>
            </button>
            <button class="btn like" @tap="likeOp('right')">
              <image src="/static/images/home_btn_like_nor@3x.png"></image>
            </button>
          </block>
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
    <!-- <view class="footer">
      <view class="ft_warp">
        <view class="left">
          <view class="name cur" @tap="isCreate">Pick</view>
          <view class="name" @tap="toCardHolder">名片夹</view>
          <view class="name"  @tap="toCenter">我的名片</view>
        </view>
        <view class="right"> 
          <view class="r_blo" @click="isShare2">
            <image class="detail"  src="/static/images/home_tab_btn_share_nor@3x.png"></image>
          </view>
          <view class="r_blo" >
            <form report-submit="true" class="from-box" @submit="fromClick">
              <button formType="submit" class="from-mask"></button>
            </form>
            <image class="detail" src="/static/images/home_tab_btn_info_nor@3x.png"></image>
          </view>
        </view>
      </view>
    </view> -->
    <authorize-pop :isIndex='true'></authorize-pop>
    <mptoast />
    <footerTab :type=1 :adaptive=adaptive :isRed=swopRed></footerTab>
    <!-- 分享弹窗 -->
    <view class="pop_warp" v-if="isPop">
      <view class="guidance_pop" v-if="gdData.isGd" @tap.stop="firstGDClick">
        <image class="gd_cont" src="/static/images/dafult_pic02@3x.png" v-if="gdData.step == 1"></image>
        <image class="gd_cont" v-else  src="/static/images/dafult_pic01@3x.png"></image>

        <block v-if="gdData.step==1">
          <view class="txt">想和TA交朋友？快向TA发起交换名片申请吧！ </view>
          <view class="txt">把卡片往右滑，或者点这个按钮也可以哦～</view>
        </block>

        <block v-else>
          <view class="txt">不感兴趣，没关系，看看下一个人吧 </view>
          <view class="txt">把卡片往左滑，或者点这个按钮也可以哦～</view>
        </block>

        <view class="bot_cont">
          <image class="bot_img bot_right_icon1" src="/static/images/dafult_icom_like@3x.png"  v-if="gdData.step==1"></image>
          
          <image class="bot_img bot_left_icon1" src="/static/images/dafult_icom_unlike@3x.png" v-else></image>
        </view>
      </view>

      <!-- 跳转创建 -->
      <view class="createMe" v-if="toMeCreate">
        <image class="close"  @tap="cloCrea" src="/static/images/popup_btn_close_nor@3x.png"></image>
        <image class="head" src="/static/images/img.jpg"></image>
        <view class="title">Opps！你还没创建自己的名片</view>
        <view class="msg">要和这几位大咖交换名片的话， 点击下方按钮，创建自己的名片吧!</view>
        <button class="btn" @tap="isCreate" type="primary">创建自己的名片</button>
      </view>
    </view>
  </view>
</template>
<script>
  import mptoast from 'mptoast'
  import footerTab from '@/components/footerTab'
  import App from '@/App'
  import {loginApi,getShareImg} from '@/api/pages/login'
  import authorizePop from '@/components/authorize'
  import { getUserInfoApi, getIndexUsers, indexLike, indexUnlike } from '@/api/pages/user'
  import { redDotApplys, deleteRedDot, redDot } from '@/api/pages/red'
export default {

  components: {
    mptoast,
    footerTab,
    authorizePop
  },
  data () {
    return { 
      adaptive: '1',   //ten  small
      interval: null,
      usersList: [],
      usersInfo: [],
      toCreate: {
        isToCreate: true,
        num: 0
      },

      touchDot: 0,
      time: 0,

      nowIndex: 0,    // 当地卡片位置
      moveData: {     // 滑动
        isMove: false,
        style: '',       //left or right
      },
      gdData : {        //第一次引导图
        isGd: false,
        step: 1
      },  //
      getPage: {       // 首页列表信息参数
        count: 10,
        occupation_label_id: '',
        realm_label_id: '',
      },                
      isPop: false,     //遮罩
      isCooling: false, //冷却
      isShare: false,    //分享弹窗
      coolTime: 123123123,//冷却倒计时
      isEnd: false,   //翻完
      isNext: true,  //翻页

      systemInfo: {}, //
      beforeCreateStep: 0,
      swopRed: 0,   //交换红点
      shareData: {},
    }
  },
  methods: {
    //测试去创建
    testCreate(){
      wx.navigateTo({
        url: `/pages/createCard/main`
      })
    },
    fromClick (e) {
      App.methods.sendFormId({
        fromId: e.mp.detail.formId,
        fromAddress: '/pages/index'
      })
    },
    //是否第一次进入 展示引导图
    isFirst(){
      let that = this
      try {
        let value = wx.getStorageSync('pickCardFirst')
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
        if(this.usersList.length<1){
          this.isCreate()
        }
        try {
            wx.setStorageSync('pickCardFirst', '1')
            //this.isPop = true
            //this.toMeCreate=true
        } catch (e) {    
        }
      }
    },
    cloSahre(){
      this.isPop = false
      this.isShare=false
    },
    isShare2 () {
      this.isPop = true
      this.isShare = true
    },
    //跳转====
    toDetail (item) {
      wx.navigateTo({
        url: `/pages/detail/main?vkey=${item.vkey}`
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
    toCardHolder () {
      wx.navigateTo({
        url: `/pages/cardHolder/main`
      })
    },

    isCreate (){
      if(this.usersInfo.step!=9){
        this.isPop = false
        this.toMeCreate=true
        wx.navigateTo({
          url: `/pages/createCard/main`
        })
      }else if(this.usersInfo.step == 9){
        this.toCreate.isToCreate = true
      }
    },
    //跳转====

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
      if (touchMove - touchDot <= -80 && this.time < 10) {  
        status = 'left'
      }  
      // 向右滑动  
      else if (touchMove - touchDot >= 80 && this.time < 10) {  
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
    
    //左右划操作
    likeOp (status){
      console.log(this.nowIndex,this.usersList.length,status,this.isNext)
      if(!this.isNext){return}
      this.isNext = false
      let that = this,
          data = this.usersList[this.nowIndex],
          beforeCreateStep = this.beforeCreateStep,
          step = this.usersInfo.step,
          msg = {
            to_uid: data.id, //data.unionid
          };
      if(status && status == 'right') {
        if(beforeCreateStep<3&&step<9){
          that.firstOp(status);
        }else {
          that.like(msg);
        }
      }else if(status && status == 'left'){
        if(beforeCreateStep<3&&step<9){
          that.firstOp(status);
        }else {
          that.unlike(msg);
        }
      } 
    },
    isGetUers(){
      let that = this
      if(this.usersList.length-this.nowIndex == 1){
        console.log('next============todo=====')
        getIndexUsers(this.getPage).then((res)=>{
          if(res.data.length<1){
            that.isEnd = true;
          }
          this.usersList = [...this.usersList,...res.data];
          //this.nowIndex = 0;
        },(res)=>{
          if(res.http_status == 400 && res.code == 99){
            that.isCooling = true;
            that.interval = setInterval(()=>{
              that.transformTime(res.data.rest_time);
              res.data.rest_time--;
            },1000);
          }
          this.$mptoast(res.msg);
        })
      }
      
    },
    firstOp(type){
      let that = this,
          beforeCreateStep = this.beforeCreateStep;

      beforeCreateStep++;
      if(beforeCreateStep == 3){
        wx.setStorageSync('beforeCreateStep', beforeCreateStep);
        that.isNext = true;
        that.isCreate()
        return
      }
      console.log(beforeCreateStep)
      if(type=='left'){
        that.moveData={
          isMove: false,
          style: 'left', 
        }
      }else {
        that.moveData={
          isMove: false,
          style: 'right', 
        }
      }
      that.nowIndex ++;
      this.beforeCreateStep = beforeCreateStep;

      setTimeout(()=>{
        that.moveData.style = '';
        that.isNext = true;
        that.isGetUers()
      },800)

    },
    like(msg){
      let that = this;
      indexLike(msg).then((res)=>{
        console.log(res)
        that.nowIndex ++
        if(res.code==101){
          //
        }
        that.moveData={
          isMove: false,
          style: 'right', 
        }
        that.isGetUers()
        setTimeout(()=>{
          that.moveData.style = ''
          that.isNext = true
        },800)
      },(res)=>{
        if(res.http_status == 400 && res.code == 99){
          that.isCooling = true
          that.transformTime(res.data.rest_time)
        }
        that.$mptoast(res.msg)
        that.isNext = true
      })
    },

    unlike(msg){
      let that = this
      indexUnlike(msg).then((res)=>{

        that.moveData = {
          isMove: false,
          style: 'left', 
        }
        that.nowIndex ++
        that.toCreate.num++

        that.isGetUers()

        setTimeout(()=>{
          that.moveData.style = ''
          that.isNext = true
        },800)

        
      },(res)=>{
        console.log(res)
        that.$mptoast(res.msg)
        that.isNext = true
      })
    },

    //转换时分秒
    transformTime(s){
      if(!s){return 0}

      let t;
      if(s > -1){
          let hour = Math.floor(s/3600);
          let min = Math.floor(s/60) % 60;
          let sec = s % 60;
          if(hour < 10) {
              t = '0'+ hour + ":";
          } else {
              t = hour + ":";
          }

          if(min < 10){t += "0";}
          t += min + ":";
          if(sec < 10){t += "0";}
          t += sec;
      }
      this.coolTime = t
      //return t;
    },

    getShareImg(){
      let that = this,
      usersInfo = that.usersInfo,
      msg = {
        uid: usersInfo.id,
        name: usersInfo.nickname,
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
    },

  },
  onShareAppMessage: function (res) {
    console.log(res)
    let path = '/pages/index/main?',
        that = this,
        imageUrl = '';

    wx.showShareMenu({
      withShareTicket: true
    })
    if (res.from === 'button') {
      // 来自页面内转发按钮
      if(res.target.dataset.type=="me"){
        imageUrl = that.shareData.shareImg
        path = `/pages/detail?vkey=${this.usersInfo.vkey}`
      }
    }

    return {
      title: '趣名片',
      path: path,
      imageUrl: imageUrl
    }
  },
  onLoad(res) {
    console.log(res)
    let that = this,
    value = wx.getStorageSync('pickCardFirst'),
    beforeCreateStep =wx.getStorageSync('beforeCreateStep').length>0?wx.getStorageSync('beforeCreateStep'):0;
    that.beforeCreateStep = beforeCreateStep;

    wx.getSystemInfo({
      success: function(res) {
        that.systemInfo = res
        if(res.screenHeight>780){
           that.adaptive = 'ten'
        }else if(res.screenHeight<650){
           that.adaptive = 'small'
        }

        wx.setStorageSync('adaptive', that.adaptive)
        console.log(res)
      }
    })

    authorizePop.methods.checkLogin().then(res => {
      if (res.code !== 201) { // 不需要主动授权的时候才出现引导层， 授权完毕才出现
         that.isFirst()
      }
      getIndexUsers(that.getPage).then((res)=>{
        that.usersList = res.data
        that.usersInfo = that.$store.getters.userInfo
        console.log(that.usersInfo, '用户信息')
        if(that.usersInfo.step!=9){
          that.toCreate.isToCreate = false
          if(res.data.length<1 && value){
            that.isCreate()
            return
          }
        }

        redDot().then(res=>{
          that.swopRed = res.data.main_show_red_dot
        })

        that.getShareImg()
        if(res.data.length<1){
          that.isEnd = true
        }
      },(res)=>{
        if(res.http_status == 400 && res.code == 99){
          that.isCooling = true
          that.interval = setInterval(()=>{
            that.transformTime(res.data.rest_time)
            res.data.rest_time --
          },1000);
        }
        this.$mptoast(res.msg)
      })
     
    })

    //筛选
    if(res.from && res.from == 'filtrate'){
      this.getPage.occupation_label_id = res.occupation_label_id
      this.getPage.realm_label_id = res.realm_label_id
    }


    
    
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    &.small{
      //height: 1020rpx;
      .content {
        top: -66rpx;
        height: 736rpx;
        .peopList {
          width: 530rpx;
          height: 736rpx;
          .peop_blo {
            width: 530rpx;
            height: 736rpx;
            .top {
              width: 530rpx;
              height: 489rpx;
            }
            .bottom {
              height: 247rpx;
            }
          }
          .btns {

          }
        }
      }
    }
    &.ten {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .content {
        top: -66rpx;
      }
    }
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
          width: 317rpx;
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
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    .right {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .new {
        width:60rpx;
        height:30rpx;
        background:rgba(255,81,80,1);
        box-shadow:0rpx 2rpx 4rpx 0rpx rgba(0,0,0,0.1);
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
    .left {
      .single {
        width:18rpx;
        height:12rpx;
        background:rgba(53,57,67,1);
        margin-left: 8rpx;
        position: relative;
        top: -5rpx;
      }
    }
  }
  .content {
    height: 930rpx;
    position: relative;
    top: -45rpx;

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
      &.blo_type2 {
        display: block;
        //z-index: 100;
        text-align: center;
        padding: 0 45rpx;
        .cool_img {
          width:398rpx;
          height:442rpx;
          margin: 0 auto;
          margin-top: 84rpx;
        }
        .end_img {
          width:422rpx;
          height:568rpx;
          margin: 0 auto;
          margin-top: 62rpx;
        }
        .blo_hint_txt {
          font-size:28rpx;
          font-family:PingFangSC-Light;
          color:rgba(53,57,67,1);
          line-height:35rpx;
        }
        .cool_time {
          font-size:48rpx;
          font-family:SFUIDisplay-Medium;
          color:rgba(53,57,67,1);
          line-height:48rpx;
          margin: 60rpx 0 20rpx 0;
        }
        .cool_cont {

        }
        .end_cont {
          margin-top: 30rpx;
        }

      }
      &.test {
        display: block;
      }
      .top {
        width:100%;
        height:590rpx;
        
        border-radius:18rpx 18rpx 0rpx 0rpx;
        position: relative;
        .bage {
          width: 100%;
          height: 100%;
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
        width:100%;
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
            margin-bottom: 14rpx;
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
      .type2 {
        background: rgba(0,208,147,1);
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -66rpx;
        margin-top: -66rpx;
        image {
          width: 100%;
          height: 100%;
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
    //height:150rpx;
    background:rgba(255,255,255,1);
    box-shadow:0rpx -10rpx 20rpx 0rpx rgba(153,193,214,0.08);
    display: flex;
    flex-direction: row;
    //align-items: center;
    align-items: flex-start;
    .ft_warp {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      height:96rpx;

    }
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
          font-size:32rpx;
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
        &.red {
          position: relative;
          &:before {
            content: '';
            width:20rpx;
            height:20rpx;
            background:red;
            border-radius:50%;
            position: absolute;
            top: 15rpx;
            right: -5rpx;
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
        position: relative;
        image { 
          width: 48rpx;
          height: 48rpx;
        }
      }
    }
  }
</style>
