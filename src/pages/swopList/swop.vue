
<template>
  <view class="container" >
    <view class="hint" v-if="listData.length>0">
      <form report-submit="true" class="from-box" @submit="fromClick">
          <button formType="submit" class="from-mask  "></button>
      </form>
      记录只保留14天，抓紧时间处理哦~
    </view>
    <view class="swopList" v-if="listData.length>0">
      <view class="swop_blo" v-for="(item, index) in listData" :key="key" @tap="toDetail(item)">
        <form report-submit="true" class="from-box" @submit="fromClick">
            <button formType="submit" class="from-mask  "></button>
        </form>
        <view class="blo_top">
          <image class="avatar" :src="item.apply_user_info.avatar_info.smallImgUrl" v-if="item.apply_user_info&&item.apply_user_info.avatar_info&&item.apply_user_info.avatar_info.smallImgUrl"></image>
          <image  class="avatar" src="/static/images/new_pic_defaulhead.jpg" v-else></image>

          <view class="msg_detail ellipsis">
            <view class="msg_name ellipsis">{{item.apply_user_info.nickname}} {{item.apply_user_info.occupation}}</view>
            <view class="msg_form ellipsis">{{item.apply_user_info.company}}</view>
          </view>

          <form report-submit="true" class="top_btn" @submit="fromClick" v-if="item.status==0">
              <button formType="submit" class="top_btn" @tap.stop="putApply(item.id,index)"  >同意</button>
          </form>

          <text class="top_status" v-else>已交换</text>
        </view>

        <view class="blo_bot ">
          <image class="txt_img" src="/static/images/applylist_icon_like@3x.png"></image>
          <view class="txt ellipsis">{{item.remarks}}</view>
        </view>
      </view>
    </view>
    <view class="none_cont" v-else>
        <image class="none_img" src="/static/images/interchanger_pic_dafulpage@3x.png"></image>

        <view class="none_txt_1">与其被动等待，不如主动出击</view>
        <button class="none_txt_2" data-type="me" open-type="share">向朋友同事推荐自己吧</button>
    </view>

    <mptoast />
    <!-- <hintPop :type='consent' :isShow=isShow :consentNowItem=nowItem ></hintPop> -->
  </view>
</template>
<style lang="less" type="text/less" scoped>
  .none_cont {
    height: 320rpx;
    width: 400rpx;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100rpx;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200rpx;
    margin-top: -230rpx;
    .none_img {
      width:288rpx;
      height:198rpx;
      margin-bottom: 48rpx;
    }
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
    position: relative;
  }
  .swopList {
    background: #ffffff;
    .swop_blo {
      border-bottom:1rpx solid #eaebec;
      padding: 40rpx;
      position: relative;
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
            line-height: 40rpx;
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
          position: relative;
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
  import App from '@/App'

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
        nowItem: {},
        shareData: {},

        getListData: {
          count: 20,
          id:''
        },
        getNext: true,
        isNext: true,
      }
    },
    onPullDownRefresh(res){
      let that = this;

      //doing some thing
      console.log('下拉刷新执行完毕要停止当前页面下拉刷新',res)
      this.getListData.id = ''
      this.getNext = true
      this.isNext = true
      that.getList('first')
      setTimeout(function(){
          wx.stopPullDownRefresh()
      },1500)
    },

    onReachBottom(res){
      console.log(111)
      let that = this;

      if(this.getNext && this.isNext ){
        this.getNext = false
        this.getListData.id = this.listData[this.listData.length-1].id
        this.getList()
      }
      
    },

    methods: {
      fromClick (e) {
        App.methods.sendFormId({
          fromId: e.mp.detail.formId,
          fromAddress: '/pages/index'
        })
      },
      //跳转====
      toDetail (item) {
        let data = {}
          data = item
        wx.navigateTo({
          url: `/pages/detail/main?vkey=${data.apply_user_info.vkey}`
        })
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
            that.listData[index].status = 1
            that.nowItem = that.listData[index]
            that.$mptoast('交换成功',2000)
            //that.isShow = true
          }
        },(res)=>{
          that.$mptoast(res.msg,'error',2000)
        })
      },
      getList(isFirst){
        let that = this;
        console.log(isFirst)
        getLikeList(that.getListData).then((res)=>{
          console.log('=====',res)
          if(isFirst == 'first'){
            that.listData = res.data
          }else {
            that.listData = [...that.listData,...res.data]
          }

          that.getNext = true
          if(res.data.length<that.getListData.count){
            that.isNext = false
          }

          if(res.http_status==200){
            deleteRedDot()
          }
        },(res)=>{
          that.$mptoast(res.msg)
        })
      },
    },

    onLoad () {
      let that = this;
      getUserInfoApi().then( data => {
        let usersInfo = data.data

        let msg = {
          uid: usersInfo.id,
          name: usersInfo.nickname,
          img: usersInfo.avatar_info.smallImgUrl,
          occupation: usersInfo.occupation?usersInfo.occupation:'test',
          company: usersInfo.company,
          label: [],
        }

        usersInfo.other_info.realm_info.forEach(item => {
          msg.label.push(`${item.name} | `)
        })

        msg.label = msg.label.join('')
        msg.label = msg.label.slice(0, msg.label.length-3)
        console.log(msg)
        getShareImg(msg).then(res => {
          msg.shareImg = res.data
          that.shareData = msg
        })
      })
    },

    onShareAppMessage: function (res) {
      let path = '/pages/index/main?'
      let shareInfo = this.$store.getters.shareInfo
      let that = this
      let title = shareInfo.index.content
      let imageUrl = shareInfo.index.path

        console.log(shareInfo)
        wx.showShareMenu({
          withShareTicket: true
        })

      if (res.from === 'button' ) {
        if(res.target.dataset.type=="me"){
          title = shareInfo.showCard.content
          imageUrl = that.shareData.shareImg
          path = `/pages/detail/main?vkey=${this.usersInfo.vkey}`
        }
        if(res.target.dataset.type=="other"){
            that.isShow = false   //弹框消失
            title = shareInfo.otherCard.content
            imageUrl = shareInfo.otherCard.path
            path = `/pages/sharePick/main?vkey=${this.nowItem.apply_user_info.vkey}?type=other`
        }
        // 来自页面内转发按钮
      }
      
      return {
        title: title,
        path: path,
        imageUrl: imageUrl,

      }
    },

    onShow(){
      let that = this;
      that.isShow = false

      that.getListData = {
        count: 20,
        id:''
      },
      that.getNext =true,
      that.isNext =true,
      that.getList('first')
    },

    created () {
    }

  }
</script>


