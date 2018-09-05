
<template>
  <view class="container" v-if="show">
    <view class="hint">会根据你选择的条件,来发现你的职场新朋友,可多选噢～</view>
    <view class="op_two ">
      <view class="table_blo row_style_two">
        <view class="tit">职位</view>
        <view class="list_selct">
          <view class="blo" v-for="(item, index) in jobData" :class="{'cur':item.isCur}" :key="key" @click="clickOp(index,'job')" v-if="jobSet===0 || (index < jobSet || !jobOp) " >
          {{item.name}}
          </view>

          <block v-if="jobSet !== 0">
            <view class="detBlo open" @click="detailOp(1)" v-if="jobOp">
              更多
              <image class="bage" src="/static/images/deta_icon_base@3x.png" ></image>
            </view>
            <view class="detBlo close" @click="detailOp(1)" v-else>
              收起
              <image class="bage" src="/static/images/deta_icon_top@3x.png" ></image>
            </view>
          </block>
          
        </view>
      </view>

      <view class="table_blo row_style_two">
        <view class="tit">领域</view>
        <view class="list_selct">
          <view class="blo" v-for="(item, index) in liveData" :class="{'cur':item.isCur}" :key="key" @click="clickOp(index,'live')" v-if="liveSet===0 || ( index < liveSet || !liveOp)">
            {{item.name}}
          </view>

          <block v-if="liveSet !== 0">
            <view class="detBlo open" @click="detailOp(2)" v-if="liveOp">
              更多
              <image class="bage" src="/static/images/deta_icon_base@3x.png" ></image>
            </view>
            <view class="detBlo close" @click="detailOp(2)" v-else>
              收起
              <image class="bage" src="/static/images/deta_icon_top@3x.png" ></image>
            </view>
          </block>
          
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
  import { postGetLabelByIds, getChoiceLabel, getLabelConfig } from '@/api/pages/login'
  import App from '@/App'

  export default {
    components: {
      mptoast
    },
    data () {
      return {
        show: false,
        jobData: [],
        jobData2: [],
        jobAry:[],
        liveAry:[],
        liveData: [],
        liveData2: [],
        jobOp: true,
        liveOp: true,

        liveSet: 0,
        jobSet: 0,
      }
    },
    watch: {
      liveSet () {
      },
      jobSet () {
      },
    },
    methods: {
      fromClick (e) {
        App.methods.sendFormId({
          fromId: e.mp.detail.formId,
          fromAddress: '/pages/index'
        })
      },

      toIndex(){
        let occupation_label_id = this.jobAry.join(',')
        let realm_label_id = this.liveAry.join(',')
        let url

        if(occupation_label_id == 0 && realm_label_id == 0){
          url = '/pages/index/main'
        }
        
        let data = {
          occupation_label_id: occupation_label_id,
          realm_label_id: realm_label_id
        }
        console.log(data, 1111111111111)
        wx.setStorageSync('labelId', data)
        url = `/pages/index/main?occupation_label_id=${occupation_label_id}&realm_label_id=${realm_label_id}&from=filtrate`
        wx.reLaunch({
          url:url
        })
      },

      gender (res) {
        let that = this;
        if(res && res == 1||res == 2 && that.firstData.gender != res ){
          that.firstData.gender = res
        }
      },

      inputText (e) {
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

      clickOp (index,style){
        let that = this
        let listData = []
        let selAry =[]
        let reset = null
        let id = ''
        let a 
        if(style == 'job'){
          listData = that.jobData
          selAry = that.jobAry
          reset = that.jobData2
        }else if(style == 'live'){
          listData = that.liveData
          selAry = that.liveAry
          reset = that.liveData2
        }

        if(listData[index].id!=0){
          listData[0].isCur = false
          if(selAry.indexOf(0) > -1){
            selAry.splice(selAry.indexOf(0),1)
          }
        }else {

          console.log(selAry)
          a = JSON.stringify(reset)
          a = JSON.parse(a.concat())

          if(style == 'job'){
            that.jobData = a
            that.jobAry = [0]
          }else {
            that.liveAry = [0]
            that.liveData = a
          }
          return
        }

        if (listData[index].id === 0 && !listData[index].isCur) {
          listData.forEach(e => {
            if (e.id !== 0) {
              e.isCur = false
            }
          })
        }

        id = listData[index].id

        if(listData[index].isCur){
          listData[index].isCur = false
          selAry.splice(selAry.indexOf(id), 1)
        }else {
          listData[index].isCur = true
          selAry.push(id)
        }
      },

      detailOp (state){
        console.log(state)
        if(state && state === 1){
          this.jobOp = !this.jobOp
        }else if(state && state === 2){
          this.liveOp = !this.liveOp
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

      let one
      let two


      getLabelConfig().then(msg => {
        that.liveSet = parseInt(msg.data[0].fieldCount) 
        that.jobSet = parseInt(msg.data[0].jobCount)

        if(that.liveSet === 0){
          that.liveOp = false
        }else {
          that.liveOp = true
        }

        if(that.jobSet === 0){
          that.jobOp = false
        }else {
          that.jobOp = true
        }

        postGetLabelByIds(data).then((res)=>{
          let jobList = []
          let liveList = []

          res.data.forEach((value,index,array)=>{

            value.son.forEach((item,idx,ary)=>{

              if(value.id === 1 && that.liveSet !==0 ){
                if(idx<that.liveSet ){
                  liveList.push(item.id)
                }
              }else if(value.id === 3 && that.jobSet !==0 ){
                if(idx < that.jobSet ){
                  jobList.push(item.id)
                }
              }
              item['isCur'] = false
        　   });
        　 });

          that.jobData = [{id:0,name:'不限',isCur:false},...res.data[1].son]
          that.liveData = [{id:0,name:'不限',isCur:false},...res.data[0].son]

          one = JSON.stringify(that.jobData)
          that.jobData2 = JSON.parse(one.concat())
          that.jobData2[0].isCur = true

          two = JSON.stringify(that.liveData)
          that.liveData2 = JSON.parse(two.concat())
          that.liveData2[0].isCur = true

          //获取上一次筛选
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
                if(that.jobSet !==0){
                  console.log(that.jobSet,jobList,item.id,jobList.indexOf(item.id))
                  if(jobList.indexOf(item.id)<0 && that.jobOp && item.id !== 0){
                    that.jobOp = false
                  }
                }

              } else if (item.oneLevel === 1) {
                console.log(item.id)
                that.liveAry.push(item.id)
                that.liveData.forEach((e,index) => {
                  console.log(item.id,e.id,item.id == e.id)
                  if (item.id == e.id) {
                  console.log('======',item.id,e.id)

                    that.liveData[index].isCur = true
                  }
                })
                if(that.liveSet !==0 ){
                  if(liveList.indexOf(item.id)<0 && that.liveOp && item.id !== 0){
                    that.liveOp = false
                  }
                }
              }
            })
          })
        })
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
  .detBlo {
    width:136rpx;
    height:58rpx;
    display: flex;
    flex-direction: row;
    justify-content: flex-first;
    align-items: center;
    font-size:28rpx;
    font-weight:400;
    color: #9aa1ab;
    line-height:28rpx;
    width: 100%;
    margin-left: 20rpx;
    image {
      width: 24rpx;
      height: 14rpx;
      margin-left: 8rpx;
    }
  }

  .container {
    padding: 0 40rpx;
    padding-bottom: 160rpx;
  }
  .hint {
    height:120rpx;
    font-size:26rpx;
    color:rgba(154,161,171,1);
    line-height:120rpx;
    font-weight: 300;
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
        color:rgba(53,57,67,1);
        line-height:34rpx;
        margin-bottom: 16rpx;
      }
      .tit2 {
        font-size:28rpx;
        color:rgba(154,161,171,1);
        line-height:28rpx;
        font-weight: 300;

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
      color:rgba(154,161,171,1);
      line-height:26rpx;
      margin-left: 28rpx;
      font-weight: 300;

    }
  }
  .op_two {
    .table_blo {
      margin-bottom: 47rpx;
      position: relative;
      .tit {
        height:34rpx;
        font-size:34rpx;
        color:rgba(53,57,67,1);
        line-height:34rpx;
        position: relative;
        margin-bottom: 32rpx;
        font-weight: 700;

        text {
          font-size:26rpx;
          color:rgba(178,182,194,1);
          margin-left: 30rpx;
          font-weight: 300;

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
          color:rgba(154,161,171,1);
          line-height:60rpx;
          text-align: center;
          box-sizing: border-box;
          position: relative;
          font-weight: 300;

          &.cur {
            background:rgba(0,208,147,0.05);
            border:1rpx solid rgba(0,208,147,1);
            color:rgba(0,208,147,1);
            font-weight: 500;
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
    color:rgba(195,201,212,1);
    line-height:60rpx;
    text-align: center;
    font-weight: 300;

  }
  .hidden {
    display: none;
  }
</style>
