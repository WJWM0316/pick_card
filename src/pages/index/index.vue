
<template>
  <view class="container" :class="{'ten': adaptive == 'ten','small': adaptive == 'small'}">
    <view class="op_top">
      <view class="left" @click="toFiltrate">
        <form report-submit="true" class="from-box" @submit="fromClick">
            <button formType="submit" class="from-mask  "></button>
        </form>
        筛选<image class="single" src="/static/images/home_icon_select.jpg" ></image>
      </view>
      <view class="right" @click="toSwop">
        <form report-submit="true" class="from-box" @submit="fromClick">
            <button formType="submit" class="from-mask  "></button>
        </form>
        交换申请<view class="new" v-if="swopRed==1">NEW</view>
      </view>
    </view>
    <view class="content">
      <image class="card_bg" src="/static/images/home_bg@3x.png"></image>

      <view class="peopList" >
        <block v-for="(item, index) in usersList" :key="key" >
          <view :index="index" class="peop_blo "
          :class="{
            'test': nowIndex==index, 
            'outLeft animated test': nowIndex-1==index&&moveData.style=='left',  
            'outRight animated test': nowIndex-1==index&&moveData.style=='right'
          }"
          @touchstart="tStart" 
          @touchend="tEnd" 
          @touchmove="tMove" >
            <form report-submit="true" class="top" @submit="fromClick">
            <button class="top" @tap="toDetail(item)" formType="submit">
              <image class="bage" :src="item.avatar_info.bigImgUrl" mode=widthFix v-if="item.avatar_info.bigImgUrl"></image>
              <image class="bage" src="/static/images/new_pic_defaulhead.jpg" v-else></image>
              <view class="location">
                <image class="adr" src="/static/images/home_icon_location_nor@3x.png"></image>
                广州市
              </view>
              <view class="text">
                <view class="name ellipsis">{{item.nickname}}</view>
                <view class="title ellipsis">{{item.occupation}} | {{item.company}}</view>
                <image class="detail" src="/static/images/hone_btn_more_nor@3x.png" v-if="item.other_info&&item.other_info.more_info&&(item.other_info.more_info.img_info.length>1||item.other_info.more_info.content.length>1)"></image>
              </view>
            </button>
            </form>

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
            <view class="cool_time" v-if="coolTime!=0">{{coolTime}}</view>
            <view class="cool_cont">
              <view class="blo_hint_txt">你已经看了很多新朋友了，休息一下吧~</view>
              <view class="blo_hint_txt">你也可以分享自己的名片给好友，</view>
              <view class="blo_hint_txt">邀请3位新朋友，立马刷新冷却时间哦～</view>
            </view>
        </view>
        <!-- 到底 -->
        <view class="peop_blo blo_type2 blo_end" v-if="isEnd">
            <image class="end_img" src="/static/images/home_dafulpage_pic_nomore@3x.png"></image>
            <view class="end_cont">
              <view class="blo_hint_txt">好友名片已经到底啦～放宽筛选范围试试吧 </view>
              <view class="blo_hint_txt">也可邀请好友一起来玩趣名片哦～</view>
            </view>
        </view>

        <view class="btns" >
          <form report-submit="true" class="btn type2" @submit="fromClick" v-if="isCooling || isEnd">
            <button formType="submit" class="btn type2" data-type="myDetail" open-type="share"  >
              <image src="/static/images/dafulpage_btn_share@3x.png"></image>
            </button>
          </form>
          <block v-else>
            <form report-submit="true" class="btn delate" @submit="fromClick">
              <button class="btn delate" formType="submit" @click="likeOp('left')">
                <image src="/static/images/home_btn_unlike_nor@3x.png"></image>
              </button>
            </form>
            <form report-submit="true" class="btn delate" @submit="fromClick">
              <button class="btn like" formType="submit" @click="likeOp('right')">
                <image src="/static/images/home_btn_like_nor@3x.png"></image>
              </button>
            </form>
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
    
    <!-- 分享弹窗 -->
    <view class="pop_warp" v-if="isPop">
      <view class="guidance_pop" v-if="gdData.isGd" @tap.stop="firstGDClick">
        <image class="gd_cont" src="/static/images/dafult_pic02@3x.png" v-if="gdData.step == 1"></image>
        <image class="gd_cont" v-else  src="/static/images/dafult_pic01@3x.png"></image>

        <block v-if="gdData.step==1">
          <view class="txt"><text>向右划</text> 与TA互换名片</view>
        </block>

        <block v-else>
          <view class="txt"><text>向左划</text> 对TA不感兴趣</view>
        </block>

        <view class="bot_cont">
          <image class="bot_img bot_right_icon1" src="/static/images/dafult_icom_like@3x.png"  v-if="gdData.step==1"></image>
          <image class="bot_img bot_left_icon1" src="/static/images/dafult_icom_unlike@3x.png" v-else></image>
        </view>
      </view>
    </view>
    <!-- 跳转编辑电话好吗 -->
    <view class="editWarp" v-if="isShowEditWc && usersInfo2 && usersInfo2.wechat">
      <view class="editWC" >
        <view class="edit_content">
          <view class="title">丰富的联系方式有助于职场社交 请确认你的微信号是否正确</view>
          <view class="msg" v-if="usersInfo2 && usersInfo2.wechat">{{usersInfo2.wechat}}</view>
        </view>
        <view class="btns">
          <view class="btn true" @click="toEditWC">错了，去编辑</view>
          <view class="btn" @click="closeWc">没有错</view>
        </view>
      </view>
    </view>
    

    <!-- 同意弹窗 -->
    <hintPop 
      :type='consent' 
      :consentForm=consentForm 
      :isShow=isShowTrue 
      :consentNowItem=usersList[nowIndex-1] 
      @changeshow="changeShow" 
      @form-id="fromClick">
    </hintPop>

    <authorize-pop :isIndex='true' :routerInfo="routerInfo"></authorize-pop>
    <mptoast />
    <!-- :isPop=isShowFt -->
    <footerTab :type=1 :adaptive=adaptive :isRed=mainRed :isPop=isShowFt></footerTab>
  </view>
</template>
<script>
  import {mapState} from 'vuex'
  import mptoast from 'mptoast'
  import footerTab from '@/components/footerTab'
  import hintPop from '@/components/hintPop'
  import authorizePop from '@/components/authorize'

  import App from '@/App'
  import Vue from 'vue'

  import {loginApi, getShareImg, getChoiceLabel, saveUserIdByLabelSelect} from '@/api/pages/login'
  import { getIndexUsers, indexLike, indexUnlike } from '@/api/pages/user'
  import { redDotApplys, deleteRedDot, redDot } from '@/api/pages/red'

export default {

  components: {
    mptoast,
    footerTab,
    authorizePop,
    hintPop
  },
  computed: {
    ...mapState({
      usersInfo: state => state.global.userInfo,
      shareInfo: state => state.global.shareInfo,
    }),
  },
  watch: {
    usersInfo (val) {
      this.usersInfo2 = val
    },
  },
  data () {
    return { 
      adaptive: '1',   //ten  small
      interval: null,
      interval2: null,
      usersList: [],
      usersInfo: [],
      usersInfo2: [],

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
        occupation_label_id: 0,
        realm_label_id: 0,
        exclude_uid: ''
      },                
      isPop: false,     //遮罩
      isCooling: false, //冷却
      isShare: false,    //分享弹窗
      coolTime: '0',//冷却倒计时
      isEnd: false,   //翻完
      isNext: true,  //翻页

      systemInfo: {}, //
      mainRed: 0,   //交换红点
      swopRed: 0,   //交换红点
      shareData: {},

      onShowSock: true,
      toCreateSock: true,

      isShowTrue: false,  //同意
      consentForm: 'index',
      isShowFt: null,   

      routerInfo: {},

      isShowEditWc: false,  //是否显示编辑微信
    }
  },
  onShareAppMessage: function (res) {
    let path = '/pages/index/main?'
    let shareInfo = this.$store.getters.shareInfo
    let that = this
    let title = shareInfo.index.content
    let imageUrl = shareInfo.index.path

    wx.showShareMenu({
      withShareTicket: true
    })

    console.log(shareInfo)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      if(res.target.dataset.type=="myDetail"){
        title = shareInfo.mycard.content
        imageUrl = that.shareData.shareImg
        path = `/pages/detail/main?vkey=${this.usersInfo.vkey}&shareUid=${this.usersInfo.id}&shareType=${shareInfo.mycard.type}`;
      }

      if(res.target.dataset.type=="other"){
        imageUrl = shareInfo.matchingCard.path
        title = shareInfo.matchingCard.content

        path = `/pages/sharePick/main?vkey=${this.usersList[this.nowIndex-1].vkey}&type=other`;
        
      }

      if(res.target.dataset.type=="index"){
        title = shareInfo.index.content
        imageUrl = shareInfo.index.path
        path = `/pages/index/main?vkey=${this.usersInfo.vkey}&shareUid=${this.usersInfo.id}&shareType=${shareInfo.showCard.type}`
      }
    }


    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
      success(){
        that.isShowTrue = false
        that.isShowFt = false
      }
    }
  },
  onLoad(res) {
    console.log('onload',res)
    this.routerInfo = {
      path: 'pages/index/main',
      query: res
    }
    let that = this
    let value = wx.getStorageSync('pickCardFirst')
    let saveData = {
      occupation_label_id: 0,
      realm_label_id: 0
    }
    
    wx.getSystemInfo({
      success: function(res) {
        that.systemInfo = res
        if(res.model.toString().indexOf("iPhone X") != -1){
           that.adaptive = 'ten'
        }else if(res.screenHeight<650){
           that.adaptive = 'small'
        }

        wx.setStorageSync('adaptive', that.adaptive)
      }
    })

    if(res.occupation_label_id){
      saveData.occupation_label_id = res.occupation_label_id
    }

    if(res.realm_label_id){
      saveData.realm_label_id = res.realm_label_id
    }


    if(res.from && res.from == 'filtrate'){
      saveUserIdByLabelSelect(saveData)
      this.getPage.occupation_label_id = res.occupation_label_id || 0
      this.getPage.realm_label_id = res.realm_label_id || 0
    } else {
      let occupation_label = []
      let realm_label = []
      if (this.$store.getters.userInfo.vkey) {
        getChoiceLabel().then(res => {
          res.data.forEach(item => {
            if (item.oneLevel === 1) {
              realm_label.push(item.id)
              console.log('!!!!!',item.id)
            } else {
              occupation_label.push(item.id)
            }
          })
          this.getPage.occupation_label_id = occupation_label.join(',') || 0
          this.getPage.realm_label_id = realm_label.join(',') || 0
        })
      }
    }
  },
  onShow (res) {
    let that = this
    this.isNext = true
    this.toCreateSock = true

    this.isShowTrue = false  //防止切换出去。刷新拿不到之前的数据。 隐藏掉
    if (!this.$store.getters.userInfo.vkey) {
      authorizePop.methods.checkLogin().then(res => {
        if (res.code !== 201) { // 不需要主动授权的时候才出现引导层， 授权完毕才出现
           this.isFirst()
        }
        this.dataList()
      })
    } else {
      this.isFirst()

      let isDetail = wx.getStorageSync('isDetail')
      if(isDetail != 1){
        wx.setStorageSync('isDetail','2')
        this.dataList()
      }else {
        wx.setStorageSync('isDetail','2')
      }
    }
  },
  methods: {
    closeWc (){
      this.isShowEditWc = false
    },
    toEditWC(){
      this.isShowEditWc = false
      wx.navigateTo({
        url: `/pages/edit/main?vkey=${this.usersInfo.vkey}&from=index`
      })
    },

    changeShow (res){
      this.isShowTrue = false
    },

    dataList () {
      let that = this
      //that.usersInfo = that.$store.getters.userInfo
      getIndexUsers(that.getPage).then((res)=>{
        that.usersInfo = that.$store.getters.userInfo
        //排除uid
        let exclude_uid = []
        if(res.data.length > 0 && that.usersInfo == 9){
          for(let i = 0;res.data.length>i;i++){
            exclude_uid[i] = res.data[i].id
          }
          exclude_uid = exclude_uid.join(',')
        }
        that.getPage.exclude_uid = exclude_uid

        that.usersList = res.data
        this.nowIndex = 0
        if(that.usersInfo.step!=9){
            if(res.data.length<1){
              that.isCreate()
            }
          return
        }else {
          redDot().then(res=>{
            that.mainRed = res.data.main_show_red_dot
          })

          redDotApplys().then(res=>{
            that.swopRed = res.data.user_apply_show_red_dot
          })
          that.getShareImg()
        }
        if(res.data.length<1){
          that.isEnd = true
          console.log('没有数据了。冷却===》',that.isEnd)
        }else {
          that.isEnd = false
          that.isCooling = false;
        } 
      },(res)=>{
        if(res.http_status == 400 && res.code == 99){
          that.intervalTime(res.data.rest_time)
        }else {
          that.isCooling = false
          that.$mptoast(res.msg)
        }
        that.usersInfo = that.$store.getters.userInfo
        that.getShareImg()
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
        try {
            wx.setStorageSync('pickCardFirst', '1')
        } catch (e) {    
        }
      }
    },
    cloSahre(){
      this.isPop = false
      this.isShare = false
    },
    isShare2 () {
      this.isPop = true
      this.isShare = true
    },
    //跳转====
    toDetail (item) {

      wx.setStorageSync('isDetail', '1')
      wx.navigateTo({
        url: `/pages/detail/main?vkey=${item.vkey}`
      })
    },
    toFiltrate () {
      if (this.$store.getters.userInfo.step !== 9) {
        wx.redirectTo({
          url: `/pages/createCard/main`
        })
        return
      }
      wx.navigateTo({
        url: `/pages/filtrate/main`
      })
    },
    toSwop () {
      if (this.$store.getters.userInfo.step !== 9) {
        wx.redirectTo({
          url: `/pages/createCard/main`
        })
        return
      }
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
        if(!this.toCreateSock){
            return 
        }
        this.toCreateSock = false
        setTimeout(()=>{
          this.canNav = true 
        },1000)
        wx.redirectTo({
          url: `/pages/createCard/main`
        })
      }
    },
    //跳转====

    tStart (e) {
      let that = this
      that.touchDot = e.touches[0].pageX

      clearInterval(that.interval2)
      that.interval2 =  setInterval(function () {  
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
      clearInterval(this.interval2) // 清除setInterval  
      this.time = 0
    },
    
    //左右划操作
    likeOp (status){
      if(!this.isNext){return}
      this.isNext = false
      let that = this
      let data = this.usersList[this.nowIndex]
      let step = this.usersInfo.step
      let msg = {
            to_uid: data.id //data.unionid
          }

      let isShowEdit = wx.getStorageSync('isShowEdit')
      let showEditNum = wx.getStorageSync('showEditNum')?wx.getStorageSync('showEditNum'):0

      if(status){
        if(step<9){
          that.firstOp(status,msg)
        }else {
          //创建成功之后
          
          //第一次显示微信号码          
          if(!isShowEdit){
            showEditNum = parseInt(showEditNum)
            showEditNum+=1
            wx.setStorageSync('showEditNum',showEditNum)
            if(showEditNum>=10){
              this.isShowEditWc = true
              wx.setStorageSync('isShowEdit',1)
            }
          }
          if(status == 'left'){
            that.unlike(msg)

          }else if(status == 'right'){
            that.like(msg)
          }
        }
      }
    },
    isGetUers(){
      let that = this
      let step = this.usersInfo.step

      if(this.usersList.length-this.nowIndex <= 1){
        getIndexUsers(that.getPage).then((res)=>{
          if(step!=9 && step){
            that.isCreate()
            return
          }else {
          }
          if(res.data.length<1){
            that.isEnd = true;
            console.log('没有数据了。冷却===》',that.isEnd)
          }else {
            //排除uid
            let exclude_uid = []
            if(res.data.length > 0 && that.usersInfo.step == 9){
              for(let i = 0;res.data.length>i;i++){
                exclude_uid[i] = res.data[i].id
              }
              exclude_uid = exclude_uid.join(',')
            }
            that.getPage.exclude_uid = exclude_uid

            that.isEnd = false
            if(that.usersList.length>0 && res.data[0].id == that.usersList[that.nowIndex].id){
              res.data.splice(0,1)
            }
            that.usersList = [...that.usersList,...res.data]
          }
          that.isCooling = false
          //this.nowIndex = 0;
        },(res)=>{
          if(res.http_status == 400 && res.code == 99){
            that.intervalTime(res.data.rest_time)
          }else {
            that.$mptoast(res.msg)
          }
        })
      }else {
        that.isCooling = false
      }
    },

    firstOp(type,msg){
      let that = this
      let usersList = this.usersList

      if(usersList.length > 0 && usersList.length-1 <= this.nowIndex){
        that.isNext = true
        that.isCreate()
        return
      }else {
        indexUnlike(msg)
      }
      if(type == 'left'){
        that.moveData = {
          isMove: false,
          style: 'left', 
        }
      }else {
        that.moveData = {
          isMove: false,
          style: 'right', 
        }
      }
      that.nowIndex ++;

      setTimeout(()=>{
        that.moveData.style = ''
        that.isNext = true
        that.isGetUers()
      },700)
    },
    like(msg){
      let that = this
      indexLike(msg).then((res)=>{
        that.nowIndex ++
        if(res.code==101||res.code==102){
          that.isShowTrue = true
        }
        that.moveData={
          isMove: false,
          style: 'right', 
        }
        that.isGetUers()
        setTimeout(()=>{
          that.moveData.style = ''
          that.isNext = true
        },700)
      },(res)=>{
        if(res.http_status == 400 && res.code == 99){
          that.intervalTime(res.data.rest_time)
        }else {
          that.$mptoast(res.msg)
        }
        that.isNext = true
      })
    },

    intervalTime(time){
      let that = this
      let num = time
      that.isCooling = true

      clearInterval(that.interval)
      that.interval = setInterval(()=>{
        that.transformTime(num)
        num--;
        if(num<0){
          that.isGetUers()
          clearInterval(that.interval)
          this.coolTime = '0'
        }
      },1000);
    },

    unlike(msg){

      let that = this
      indexUnlike(msg).then((res)=>{

        that.moveData = {
          isMove: false,
          style: 'left', 
        }
        that.nowIndex ++

        that.isGetUers()

        setTimeout(()=>{
          that.moveData.style = ''
          that.isNext = true
        },700)
      },(res)=>{
        if(res.http_status == 400 && res.code == 99){
          that.intervalTime(res.data.rest_time)
        }else {
          that.$mptoast(res.msg)
        }
        that.isNext = true
      })
    },

    //转换时分秒
    transformTime(s){
      if(!s){
        this.coolTime = '0'
        return 0
      }
      let t = null
      if(s > -1){
          let hour = Math.floor(s/3600)
          let min = Math.floor(s/60) % 60
          let sec = s % 60
          if(hour < 10) {
              t = '0'+ hour + ":"
          } else {
              t = hour + ":"
          }

          if(min < 10){t += "0"}
          t += min + ":"
          if(sec < 10){t += "0"}
          t += sec;
      }
      this.coolTime = t
      //return t;
    },
    getShareImg(){
      let that = this
      let usersInfo = that.usersInfo
      let msg = {
        uid: usersInfo.id,
        name: usersInfo.nickname,
        img: usersInfo.avatar_info.bigImgUrl,
        occupation: usersInfo.occupation?usersInfo.occupation:'test',
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
  }
}
</script>
<style lang="less" type="text/less" scoped>
  @import url("~@/styles/animate.less");
  .editWarp {
    background:rgba(0,0,0,0.7);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
  }
  .editWC {
    position: absolute;
    top: 50%;
    left: 50%;
    background:rgba(255,255,255,1);
    border-radius:18rpx;
    z-index: 10000;
    width: 560rpx;
    margin-left: -280rpx;
    margin-top: -160rpx;
    .edit_content {
      width: 100%;
      box-sizing: border-box;
      text-align: center;
      padding: 58rpx 84rpx 36rpx 84rpx;
    }
    .title {
      font-size:28rpx;
      font-weight:300;
      color:rgba(154,161,171,1);
      line-height:34rpx;
    }
    .msg {
      font-size:34rpx;
      font-family:Helvetica;
      color:rgba(53,64,72,1);
      line-height:41rpx;
      margin-top: 14rpx;
    }
    .btns {
      height: 100rpx;
      width: 100%;
      //position: absolute;
      //bottom: 0;
      //left: 0;
      line-height: 100rpx;
      font-size:32rpx;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color: rgba(53,57,67,1);
      border-top: 1rpx solid rgba(229,229,229,1);
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      .btn {
        flex: 1;
        text-align: center;
        &.true {
          color:#00D093;
          border-right: 1rpx solid rgba(229,229,229,1);
        }
      }
    }
  }
  .container {
    height: 100vh;
    background:rgba(250,251,252,1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    &.small{
      .content {
        //top: -66rpx;
        height: 836rpx;
        .peopList {
          height: 836rpx;
          .peop_blo {
            height: 836rpx;
            .top {
              height: 580rpx;
            }
            .bottom {
              height: 247rpx;
              .labelList {
                overflow: hidden;
                height: 52rpx;
              }
            }
          }
          .btns {

          }
          .blo_end {
            padding: none;
            .end_img {
              //width: 338rpx;
              margin-top: 60rpx;
              height: 454rpx;
            }
            .end_cont {
              margin-top: 47rpx;
              .blo_hint_txt {
                font-size: 26rpx;
                color: #9AA1AB;
                letter-spacing: 0;
                text-align: center;
                line-height: 37rpx;
                font-weight: 300;
              }
            }
          }
          .blo_cooling {
            padding: none;
            .cool_time {
              margin-top: 48rpx;
            }
            .cool_img {
              //width: 322rpx;
              height: 358rpx;
              margin-top: 49rpx;
            }
            .cool_cont {
              padding: 0 13rpx;
              .blo_hint_txt {
                font-size: 26rpx;
                color: #9AA1AB;
                letter-spacing: 0;
                text-align: center;
                font-weight: 300;
                line-height: 37rpx;
              }
            }
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
        margin: 0 auto ;
        display: block;
      }
      .txt {
        text-align: center;
        font-size:36rpx;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color: #ffffff;
        margin: 67rpx 0 120rpx 0;
        text {
          color:rgba(0,208,147,1);
        }
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
    font-weight: 300;
    color:rgba(53,57,67,1);
    background:rgba(250,251,252,1);
    z-index: 20;
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
      position: relative;
      .new {
        width:60rpx;
        height:30rpx;
        background:rgba(255,81,80,1);
        box-shadow:0rpx 2rpx 4rpx 0rpx rgba(0,0,0,0.1);
        border-radius: 120rpx;
        border:2rpx solid rgba(255,255,255,1);
        margin-left: 8rpx;
        font-size:16rpx;
        color:rgba(255,255,255,1);
        line-height:30rpx;
        text-align: center;
        font-weight: 700;
      }
    }
    .left {
      width: 200rpx;
      position: relative;
      .single {
        width:18rpx;
        height:12rpx;
        background:rgba(53,57,67,1);
        position: absolute;
        top: 40rpx;
        left: 88rpx;
      }
    }
  }
  .content {
    height: 930rpx;
    position: relative;
    top: -38rpx;

    .peopList {
      width:640rpx;
      height:900rpx;
      //height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
    }
    .card_bg {
      width: 740rpx;
      height: 820rpx;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -410rpx 0  0 -370rpx; 
    }
    .peopList {
      position: relative;

    }
    .peop_blo {
      width:640rpx;
      height:900rpx;
      margin: 0 auto;
      border-radius: 18rpx;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      //border: 1rpx solid red;
      box-sizing: border-box;
      background: #ffffff;
      display: none;
      box-shadow:0rpx 17rpx 28rpx 0rpx rgba(220,227,238,0.2);

      &.blo_type2 {
        display: block;
        //z-index: 100;
        text-align: center;
        //padding: 0 45rpx;
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
          margin-top: 80rpx;
        }
        .blo_hint_txt {
          font-size:28rpx;
          font-weight: 300;
          color: #9AA1AB;
          line-height:38rpx;
        }
        .cool_time {
          font-size:48rpx;
          color:rgba(53,57,67,1);
          line-height:48rpx;
          margin: 60rpx 0 20rpx 0;
        }
        .cool_cont {

        }
        .end_cont {
          margin-top: 54rpx;
        }

      }
      &.test {
        display: block;
      }
      .top {
        width:100%;
        height:590rpx;
        overflow:hidden;
        border-radius:18rpx 18rpx 0rpx 0rpx;
        position: relative;
        .bage {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background:url('https://card-uploads-test.oss-cn-shenzhen.aliyuncs.com/Uploads/static/new_pic_defaulhead.jpg') no-repeat;
          background-size: 100% 100%;
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
          height: 200rpx;
          position: absolute;
          background:linear-gradient(180deg,rgba(255,255,255,0),rgba(0,0,0,0.4));
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 0 0 0 34rpx;
          box-sizing: border-box;
          text-align: left;
          .name {
            font-size:48rpx;
            line-height: 1.4;
            color:rgba(250,251,252,1);
            padding-top: 60rpx;
            font-weight: 700;
          }
          .title {
            width: 470rpx;
            font-size:32rpx;
            line-height: 1.4;
            color:rgba(255,255,255,1);
          }
          .detail {
            width:50rpx;
            height:50rpx;
            position: absolute;
            right: 30rpx;
            bottom: 28rpx;
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
          height: 70rpx;
          font-size:28rpx;
          font-weight: 300;
          color:rgba(154,161,171,1);
          line-height:35rpx;
          margin-bottom: 14rpx;
          overflow: hidden;
        }
        .labelList {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          height: 116rpx;
          overflow: hidden;
          padding-left: 11rpx;
          box-sizing: border-box;
          .label_blo {
            padding: 0 26rpx;
            box-sizing: border-box;
            font-size:24rpx;
            border-radius:24rpx;
            color:rgba(0,208,147,1);
            //line-height:48rpx;
            text-align: center;
            border: 2rpx solid #66E3BF;
            margin-right: 10rpx;
            margin-bottom: 14rpx;
            height: 48rpx;
            display: flex;
            align-items: center;
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
      font-weight: 300;
      color:rgba(117,121,128,1);
      .name {
        &.cur {
          font-size:32rpx;
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
