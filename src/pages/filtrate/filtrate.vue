
<template>
  <view class="container" v-if="show">
    <view class="hint">会根据你选择的条件,来发现你的职场新朋友,可多选噢～</view>
    <view class="op_two ">
      <view class="table_blo row_style_two">
        <view class="tit">职位</view>
        <view class="list_selct">
          <view class="blo" v-for="(item, index) in jobData" :class="{'cur':item.isCur}" :key="key" @click="clickOp(index,'job')">
          {{item.name}}
            <form report-submit="true" class="from-box" @submit="fromClick">
                <button formType="submit" class="from-mask  "></button>
            </form>
          </view>
        </view>
      </view>

      <view class="table_blo row_style_two">
        <view class="tit">领域</view>
        <view class="list_selct">
          <view class="blo" v-for="(item, index) in liveData" :class="{'cur':item.isCur}" :key="key" @click="clickOp(index,'live')">
            {{item.name}}
            <form report-submit="true" class="from-box" @submit="fromClick">
                <button formType="submit" class="from-mask  "></button>
            </form>
          </view>
        </view>
      </view>
    </view>

      <form report-submit="true" class="footer" @submit="fromClick">
          <button formType="submit" class="next toNext"  @click="toIndex(1)">提交</button>
      </form>
    <mptoast />
  </view>
</template>

<script>
  import mptoast from 'mptoast'
  import { postGetLabelByIds, getChoiceLabel } from '@/api/pages/login'
  import App from '@/App'

  export default {
    
    components: {
      mptoast
    },
    data () {
      return {
        show: false,
        jobData: [],
        jobAry:[],
        liveAry:[],
        liveData: [],
      }
    },
    methods: {
      fromClick (e) {
        console.log(111)
        App.methods.sendFormId({
          fromId: e.mp.detail.formId,
          fromAddress: '/pages/index'
        })
      },
      toIndex(){
        let occupation_label_id = this.jobAry.join(',')
        let realm_label_id = this.liveAry.join(',')
        let url
        if(this.jobAry.indexOf(0) !== -1){
          occupation_label_id = 0
        }

        if(this.liveAry.indexOf(0) !== -1){
          realm_label_id = 0
        }

        if(occupation_label_id == 0 && realm_label_id == 0){
          url = '/pages/index/main'
        }
        
        let data = {
          occupation_label_id: occupation_label_id,
          realm_label_id: realm_label_id
        }
        console.log(data, 1111111111111)
        wx.setStorageSync('labelId', data)
        url =  `/pages/index/main?occupation_label_id=${occupation_label_id}&realm_label_id=${realm_label_id}&from=filtrate`
        wx.reLaunch({
          url:url
        })
      },

      gender (res) {
        console.log(res)
        let that = this;
        if(res && res == 1||res == 2 && that.firstData.gender != res ){
          that.firstData.gender = res
        }
      },

      inputText (e) {
        console.log(e)

        let val = e.target.value
        if(val.length>0){
          this.firstData.nickname = val
        }
      },

      toNext (num) {
        let that = this;

        firstSignApi(that.firstData).then((res)=>{
          console.log(res)
          that.nowNum = 2
        })
      },

      clickOp(index,style){
        let that = this
        let str = ''
        let str2 = ''
        let id = ''
        if(style == 'job'){
          str = 'jobData'
          str2 = 'jobAry'
        }else if(style == 'live'){
          str = 'liveData'
          str2 = 'liveAry'
        }
        id = that[str][index].id
        if(that[str][index].isCur){
          that[str][index].isCur = false
          that[str2].splice(that[str2].indexOf(id), 1)
        }else {
          that[str][index].isCur = true
          that[str2].push(id)
        }
      }
    },
    onLoad(){
      this.jobData = []
      this.jobAry = []
      this.liveAry = []
      this.liveData = []
      let that = this
      let data = {
        labelType: '1,3'
      }
      postGetLabelByIds(data).then((res)=>{
        res.data.forEach((value,index,array)=>{
          value.son.forEach((item,idx,ary)=>{
            item['isCur'] = false
      　   });
      　 });
        that.jobData = [{id:0,name:'不限',isCur:false},...res.data[1].son]
        that.liveData = [{id:0,name:'不限',isCur:false},...res.data[0].son]

        getChoiceLabel().then(res => {
          let list = res.data
          that.show = true
          list.forEach(item => {
            if (item.oneLevel === 3) {
              that.jobAry.push(item.id)
              that.jobData.forEach((e,index) => {
                if (item.id == e.id) {
                  that.jobData[index].isCur = true
                }
              })
            } else if (item.oneLevel === 1) {
              that.liveAry.push(item.id)
              that.liveData.forEach((e,index) => {
                if (item.id == e.id) {
                  that.liveData[index].isCur = true
                }
              })
            }
          })
        })

      },(res)=>{
        
      })
    },
    onShareAppMessage: function (res) {
      console.log(res)
      let path = '/pages/index/main?';
      let shareInfo = this.$store.getters.shareInfo
      let that = this
      let title = shareInfo.index.content
      let imageUrl = shareInfo.index.path

      return {
        title: title,
        path: path,
        imageUrl: imageUrl,
      }
    },
  }
</script>

<style lang="less" type="text/less" scoped>
  .container {
    padding: 0 40rpx;
    padding-bottom: 160rpx;
  }
  .hint {
    height:120rpx;
    font-size:26rpx;
    font-family:PingFangSC-Light;
    color:rgba(154,161,171,1);
    line-height:120rpx;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 128rpx;
    background: #ffffff;
    width: 100%;
    .next {
      margin: 0 auto;
      width: 670rpx;
      height: 98rpx;
      background:rgba(0,208,147,0.3);
      border-radius: 49rpx;
      text-align: center;
      font-size: 32rpx;
      font-family:PingFangSC-Regular;
      color:rgba(255,255,255,1);
      line-height: 98rpx;
      &.toNext {
        background:rgba(0,208,147,1);
      }
    }
  }
  .op_one {
    .one_txt {
      padding-left: 40rpx;
      padding-top: 40rpx;
      margin-bottom: 64rpx;
      .tit1 {
        height:34rpx;
        font-size:34rpx;
        font-family:PingFangHK-Medium;
        color:rgba(53,57,67,1);
        line-height:34rpx;
        margin-bottom: 16rpx;
      }
      .tit2 {
        font-size:28rpx;
        font-family:PingFangSC-Light;
        color:rgba(154,161,171,1);
        line-height:28rpx;
      }
    }
    .one_pic {
      height: 360rpx;
      .img_wrap {
        width: 360rpx;
        height: 360rpx;
        border: 1rpx dashed #cccccc;
        position: relative;
        margin: 0 auto;
        .pic {
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        .up_wrap {
          position: absolute;
          right: 22rpx;
          top: 22rpx;
          width:60rpx;
          height:60rpx;
          background:rgba(0,208,147,1);
          border-radius: 50%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .up_img {
            width:34rpx;
            height:28rpx;
            background:rgba(255,255,255,1);
          }
        }
      }
    }
    .one_name {
      width: 440rpx;
      height: 90rpx;
      background: rgba(250,251,252,1);
      border-radius: 45rpx;
      margin: 30rpx auto 60rpx auto;
      text-align: center;
    }
    .one_gender {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .gender {
        width: 130rpx;
        height: 130rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        image {
          width:130rpx;
          height:130rpx;
        }
      }
      .boy {
        background: rgba(71,123,255,0.03);
        margin-right: 95rpx;

      }
      .girl {
        background: rgba(197,166,166,0.05);
      }
    }
  }
  .hintJoined {
    height:114rpx;
    background:rgba(255,252,240,1);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 18rpx 50rpx;
    .hint_img {
      width:78rpx;
      height:78rpx;
      background:rgba(255,233,143,1);
      border-radius:37rpx;
      opacity:0.2;
    }
    .hint_txt {
      font-size:26rpx;
      font-family:PingFangSC-Light;
      color:rgba(154,161,171,1);
      line-height:26rpx;
      margin-left: 28rpx;
    }
  }
  .op_two {
    .table_blo {
      margin-bottom: 47rpx;
      position: relative;
      .tit {
        height:34rpx;
        font-size:34rpx;
        font-family:PingFangHK-Medium;
        color:rgba(53,57,67,1);
        line-height:34rpx;
        position: relative;
        margin-bottom: 32rpx;
        text {
          font-size:26rpx;
          font-family:PingFangSC-Light;
          color:rgba(178,182,194,1);
          margin-left: 30rpx;
        }
      }
      .one_ipt {
        border-bottom:1rpx solid #cccccc;
      }
      .list_selct {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .blo {
          padding: 0 30rpx;
          height:60rpx;
          border-radius:34rpx;
          border:1rpx solid rgba(220,227,238,1);
          margin: 0 20rpx 20rpx 0;
          font-size:28rpx;
          font-family:PingFangSC-Light;
          color:rgba(154,161,171,1);
          line-height:60rpx;
          text-align: center;
          box-sizing: border-box;
          position: relative;
          &.cur {
            background:rgba(0,208,147,0.05);
            border:1rpx solid rgba(0,208,147,1);
            font-family:SFUIDisplay-Regular;
            color:rgba(0,208,147,1);
          }
        }
      }
      .area {
        border: 1rpx solid #cccccc;
        width: 100%;
        height: 140rpx;
      }
      .astrict {
        position: absolute;
        right: 40rpx;
        bottom: 0rpx;
      }
    }
    
  }
  .pclass {
    font-size:22rpx;
    font-family:PingFangSC-Light;
    color:rgba(195,201,212,1);
    line-height:60rpx;
    text-align: center;
  }
  .hidden {
    display: none;
  }
</style>
