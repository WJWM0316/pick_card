
<template>
  <div class="container" >
    <view class="hintJoined hidden">
     <!--  <image class="hint_img" src=""></image> -->
      <view class="hint_txt">系统检测到你在自客或小灯塔旗下相关产品有</view>
    </view>
    <view class="op_one " v-if="nowNum === 0">
      <view class="one_txt">
        <view class="tit1">创建名片，开启有趣的职场社交</view>
        <view class="tit2">真实可靠的职场形象总能碰到机遇</view>
      </view>

      <view class="one_pic">
        <view class="img_wrap" @tap="chooseImg">
          <view class="up_wrap">
            <image class="up_img" src="/static/images/as.png"></image>
          </view>
          <image class="pic" :src="filePath"></image>
        </view>
      </view>
      <!-- //focus="{{focus}}" -->
      <input class="one_name" @blur="inputText" v-model="firstData.nickname" placeholder-style="text-align:center;font-size:32rpx;font-family:PingFangHK-Light;color:rgba(195,201,212,1);" placeholder="请输入姓名" maxlength="10" />

      <view class="one_gender">
        <view class="gender boy" @click.stop="gender(1)">
          <image class="" src="/static/images/new_btn_man_sel@3x.png" v-if="firstData.gender == 1"></image>
          <image class="" src="/static/images/new_btn_man_nor@3x.png" v-else></image>
        </view>
        <view class="gender girl" @click.stop="gender(2)">
          <image class="" src="/static/images/new_btn_female_sel@3x.png" v-if="firstData.gender == 2"></image>
          <image class="" src="/static/images/new_btn_female_nor@3x.png" v-else></image>
        </view>
      </view>
    </view>


    <view class="op_blo op_two " v-if="nowNum === 1 && listData.length>0">
      <view class="table_blo row_style_one">
        <view class="tit">最近任职公司</view>
        <input class="one_ipt" v-model="secondData.company" placeholder-style="font-size:32rpx;font-family:PingFangSC-Light;color:rgba(195,201,212,1);line-height:60rpx;" placeholder="例如：老虎科技"  />
      </view>
      <view class="table_blo row_style_one">
        <view class="tit">职位</view>
        <input class="one_ipt"  v-model="secondData.occupation"  placeholder-style="font-size:32rpx;font-family:PingFangSC-Light;color:rgba(195,201,212,1);line-height:60rpx;" placeholder="例如：产品经理"  />
      </view>

      <view class="table_blo row_style_two">
        <view class="tit">职业方向  <text>请选1个职业方向</text></view>
        <view class="list_selct">
          <view class="blo" v-for="(item, index) in listData[2].son" :class="{'cur':item.isCur}" :key="key" @click="secondOne(index)">{{item.name}}</view>
        </view>
      </view>

      <view class="table_blo row_style_two">
        <view class="tit">擅长领域 <text>请选择1~3个领域</text></view>
        <view class="list_selct">
          <view class="blo" v-for="(item, index) in listData[0].son" :class="{'cur':item.isCur}" :key="key" @click="secondTwo(index)">{{item.name}}</view>
        </view>
      </view>
    </view>

    <view class=" op_blo  op_third" v-if="nowNum === 2 && thirdData">
      <view class="tit">我的人设</view>
      <view class="table_blo row_style_two">
        <view class="tit_small">职业标签
          <text>请选择1~5个职业标签</text>
        </view>
        <view class="list_selct">
          <view class="blo" v-for="(item, index) in thirdRule.jobData" :class="{'cur':item.isCur}" :key="key" @click="thirdOp(index,'work')">{{item.name}}</view>
        </view>
      </view>
      <view class="table_blo row_style_two">
        <view class="tit_small">生活标签
          <text>请选择1~5个生活标签</text>
        </view>
        <view class="list_selct">
          <view class="blo" v-for="(item, index) in thirdRule.liveData" :class="{'cur':item.isCur}" :key="key" @click="thirdOp(index,'live')">{{item.name}}</view>
        </view>
      </view>
      <view class="table_blo row_style_three">
        <view class="tit">个人签名</view>
        <textarea maxlength="25" class="area" v-model="thirdData.sign" placeholder="这个只有在按钮点击的时候才聚焦" placeholder-style="font-size:32rpx;font-family:PingFangSC-Light;color:rgba(195,201,212,1);line-height:60rpx;" />
        <text class="astrict">{{thirdData.sign.length}}/25</text>
      </view>
    </view>


    <view class="pop_warp" v-if="bindPhone.isPh">
      <view class="sign_iphone" >
        <view class="ip_top">绑定手机号完善联系方式<image src="/static/images/popup_btn_close_nor@3x.png" ></image></view>
        <view class="ip_cont">
          <view class="ipt_blo">
            <text class="getcode" @tap="sms">获取验证码</text>
            <input placeholder="请输入手机号" v-model="bindPhone.number"  type="number" name=""  />
          </view>
          <view class="ipt_blo">
            <input placeholder="请输入验证码" maxlength="6" v-model="bindPhone.code" type="" name="" />
          </view>
          <view class="hint_1">该手机号已经在“自客”注册，请更换手机号</view>
          <button class="ip_btn" @click="toCode">完成绑定</button>
          <view class="hint_2">点击快速绑定手机号码 > ></view>
        </view>
        
      </view>
    </view>
    <view class="footer">
      <block v-if="nowNum === 0">
        <button class="next toNext" @click="toNext(nowNum)" v-if="firstData.gender!==0 && firstData.avatar_id&&firstData.nickname.length>0">
        下一步
        </button>
        <button class="next" v-else >下一步</button>
      </block>
      <block v-if="nowNum === 1">
        <button class="before" @click="before(0)">上一步</button>
        <button class="next toNext type_2" @click="toNext(nowNum)" v-if="secondData.company.length>0&& secondData.occupation.length>0&&secondRule.rli.length>0 && secondRule.oli.length>0 ">下一步</button>
        
        <button class="next type_2" v-else >下一步</button>
      </block>
      
      <block v-if="nowNum === 2">
        <button class="before" @click="before(1)">上一步</button>
        <button class="next toNext type_2"  v-if="thirdData.sign.length<=25&& thirdData.sign.length>1&&thirdRule.job.length>0 && thirdRule.live.length>0 " open-type="getPhoneNumber" @getphonenumber="getPhone">下一步</button>
        <button class="next type_2" v-else >下一步</button>
      </block>
    </view>
    <mptoast />
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  import { firstSignApi, secondSignApi, thirdSignApi, smsApi,postGetLabelByIds,postGetCreatedThreeLable } from '@/api/pages/login'
  import { getUserInfoApi } from '@/api/pages/user'
  import { uploadImage } from '@/mixins/uploader'
  export default {
    components: {
      mptoast,
    },
    data () {
      return {
        listData: [],  //第二步
        focus: false,
        firstData: {
          gender: 0, //性别 1女 2男 0没有选择
          nickname: '',
          avatar_id: '',
        },
        secondData: {
          company: '', //最近任职公司
          occupation: '',  //occupation
          realm_label_id: '', //擅长领域id，多个以英文逗号隔开
          occupation_label_id: '', //职业方向id，多个以英文逗号隔开
        },
        secondRule: {
          oli: [],
          rli: [],
        },
        thirdData: {
          build_label_id: [], //人设id，多个以英文逗号隔开
          sign: '', //个性签名
          //mobile: '',
          //smsCode: '',  //验证码
          //key: '',
          //iv: '',
          //encryptedData: '',
        },
        thirdRule: {
          jobData: [],
          liveData: [],
          job:[],
          live: [],
        },
        bindPhone: {
          isPh: false,
          number: '',
          code: ''
        },
        nowNum : 0,
        isIp: false,
        filePath: '/static/images/new_pic_defaulhead.jpg',
        isShow: false,
      }
    },
    computed: {
    },
    methods: {
      before(type){
        let that = this

        that.nowNum = type
      },
      getPhone(e){
        //bindgetphonenumber 从1.2.0 开始支持，但是在1.5.3以下版本中无法使用wx.canIUse进行检测，建议使用基础库版本进行判断。
        if(!e.mp.detail.iv){
          this.bindPhone.isPh = true
        }else {
          this.thirdData.key = wx.getStorageSync('key')
          this.thirdData.iv = e.mp.detail.iv
          this.thirdData.encryptedData = e.mp.detail.encryptedData
          this.thirdPost(1)
        }
      },
      thirdPost(type){
        let job = [],
              live = []
        this.thirdRule.job.forEach((value,index)=>{
          console.log(value)
          this.thirdData['build_label_id'].push(this.thirdRule.jobData[value])
      　 });
        this.thirdRule.live.forEach((value,index)=>{
          console.log(value)
          this.thirdData['build_label_id'].push(this.thirdRule.liveData[value])
      　 });
        //this.thirdData['build_label_id'] = [job,live]
        if(type==1){
        }else {
          this.thirdData['mobile'] = this.bindPhone.number
          this.thirdData['smsCode'] = this.bindPhone.code
        }
        thirdSignApi(this.thirdData).then((res)=>{
          if(res.http_status==200){
            this.$mptoast('创建成功')
            this.nowNum = 0
            wx.redirectTo({
              url: `/pages/index/main`
            })
          }
          //that.nowNum = 3;
        })
      },
      secondOne (index) {
        console.log(index)
        let that = this
        if(that.secondRule.oli.length>0){
          let oldIndex = that.secondRule.oli[0]
          if(index == oldIndex){ return }
          that.listData[2].son[oldIndex].isCur = false
        }
        that.secondRule.oli[0] = index 
        that.listData[2].son[index].isCur = true
      },
      secondTwo (index) {
        let that = this
        if(that.secondRule.rli.length>0){
          let oldIndex = that.secondRule.rli[0]

          if(that.secondRule.rli.indexOf(index) != -1){
            return
          }
          if(that.secondRule.rli.length>=3){
            that.listData[0].son[oldIndex].isCur = false
            that.secondRule.rli.splice(0, 1)
          }
        }
        
        that.listData[0].son[index].isCur = true
        that.secondRule.rli.push(index)
      },
      thirdOp (index,style) {
        let that = this
        let str = ''
        let str2 = ''
        if(style == 'work'){
          str = 'jobData'
          str2 = 'job'
        }else if(style == 'live'){
          str = 'liveData'
          str2 = 'live'
        }
        if(that.thirdRule[str2].length>0){
          let oldIndex = that.thirdRule[str2][0]

          if(that.thirdRule[str2].indexOf(index) != -1){
            return
          }
          if(that.thirdRule[str2].length>=5){
            that.thirdRule[str][oldIndex].isCur = false
            that.thirdRule[str2].splice(0, 1)
          }
        }
        
        that.thirdRule[str][index].isCur = true
        that.thirdRule[str2].push(index)
      },
      chooseImg () {
        wx.navigateTo({
          url: '/pages/cutInside/main'
        })
      },
      gender (res) {
        console.log(res)
        let that = this;
        if(res && res == 1||res == 2 && that.firstData.gender != res ){
          that.firstData.gender = res
        }
      },
      toCode () {
        this.thirdPost(2)
        this.bindPhone = {
          isPh: false,
          number: '',
          code: ''
        }
      },
      toNext (num) {
        let that = this;
        let data = {}
        if(that.nowNum == 0){
          data = that.firstData
          firstSignApi(data).then((res)=>{
            that.nowNum = 1;
          })
        }else if(that.nowNum == 1){

          data = that.secondData
          data.realm_label_id = '10'
          data.occupation_label_id = '96'
          secondSignApi(data).then((res)=>{
            that.nowNum = 2;
          },(res)=>{
            this.$mptoast(res.msg)
          })

          postGetCreatedThreeLable({
            id : data.occupation_label_id 
          }).then((res)=>{
            that.nowNum = 2;
            res.data.forEach((value,index)=>{
              value.forEach((item,idx)=>{
                item['isCur'] = false
          　   });
          　 });
            that.thirdRule.jobData = res.data[0]
            that.thirdRule.liveData = res.data[1]
          },(res)=>{
            this.$mptoast(res.msg)
          })
        }
        else if(that.nowNum == 2){}
      }, 
      //  
      iphoneOp(){
        this.isIp = true
      },
      sms() {
        console.log('获取验证码')
        let data = {
          mobile : this.bindPhone.number
        }
        smsApi(data).then((res)=>{
          console.log(res)
        })
        let that = this
      },
      upLoad () {
        const info = wx.getStorageSync('cutImgInfo')
        if (info.path) {
          const data = {
            path: info.path,
            size: info.size
          }
          this.filePath = info.path
          console.log(this.filePath, 2222222222222)
          uploadImage(data, {
            onItemSuccess: (resp, file, index) => {
            }
          }).then(res => {
            const cutImgInfo = {
              fileId: res.file.fileId,
              path: res.file.path,
              size: res.file.size
            }
            this.firstData.avatar_id = res.file.fileId
            wx.removeStorageSync('cutImgInfo')
          }).catch((e, index) => {
            console.log(e, 2)
          })
        }
      }
    },
    onLoad(){
      let that = this
      let data = {
        labelType: '1,2,3,4' //标签类型。1擅长领域,2生活标签,3职业方向,4职业素养
      } 
      console.log('==============',this.$store.getters.userInfo)

      if(this.$store.getters.userInfo){

        let userInfo = this.$store.getters.userInfo
        this.firstData = {
          gender: userInfo.gender,
          nickname: userInfo.nickname,
          avatar_id: userInfo.avatar_id,
        }
        this.filePath = userInfo.avatar_info.middleImgUrl
        this.secondData={
          company: userInfo.company, 
          occupation: userInfo.occupation, 
          realm_label_id: '', 
          occupation_label_id: '', 
        }
        this.thirdData =  {
          build_label_id: [], //人设id，多个以英文逗号隔开
          sign: userInfo.sign, //个性签名
        }

        this.bindPhone= {
          isPh: false,
          number: userInfo.mobile,
          code: ''
        }
      }
      postGetLabelByIds(data).then((res)=>{
        res.data.forEach((value,index,array) => {
          value.son.forEach((item,idx,ary) => {
            item['isCur'] = false
      　   });
      　 });
        console.log(res.data)
        that.listData = res.data
      },(res)=>{
      })
    },
    onShow () {
      this.upLoad()
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .container {
    padding-bottom: 160rpx;
  }
  .pop_warp {
    position: fixed;
    left: 0;
    background:rgba(0,0,0,0.7);
    right:0;
    top:0;
    bottom:0;
    z-index:2222;
  }

  .sign_iphone {
    width:670rpx;
    height:670rpx;
    background:rgba(255,255,255,1);
    border-radius:18rpx;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .ip_top {
      width:670rpx;
      height:92rpx;
      box-shadow:0rpx 1rpx 0rpx 0rpx rgba(53,57,67,0.1);
      border-radius:18rpx 18rpx 0rpx 0rpx;
      line-height:92rpx;
      font-size:32rpx;
      font-family:PingFangHK-Medium;
      color:rgba(53,57,67,1);
      border-bottom: 1rpx solid #ededed;
      text-align: center;
      position: relative;
      image {
        width:28rpx;
        height:28rpx;
        position: absolute;
        right: 33rpx;
        top: 33rpx;
      }
    }
    .ip_cont {
        padding: 80rpx 60rpx 60rpx;

      .hint_1 {
        height:24rpx;
        font-size:24rpx;
        font-family:PingFangSC-Light;
        color:rgba(255,102,102,1);
        line-height:24rpx;
        text-align: center;
        margin-bottom: 28rpx;
        display:none;
      }
      .hint_2 {
        height:28rpx;
        font-size:28rpx;
        font-family:PingFangSC-Regular;
        color:rgba(0,208,147,1);
        line-height:28rpx;
        text-align: center;
      }
      .ip_btn {
        width:570rpx;
        height:98rpx;
        background:rgba(0,208,147,1);
        border-radius:49rpx;
        font-size:32rpx;
        font-family:PingFangSC-Regular;
        color:rgba(255,255,255,1);
        line-height:98rpx;
        margin-bottom: 37rpx;
      }
      .ipt_blo {
        width:550rpx;
        height:90rpx;
        position: relative;
        margin-bottom: 20rpx;
        input {
          width:550rpx;
          height:90rpx;
          background:rgba(250,251,252,1);
          border-radius:44rpx;
          font-size:32rpx;
          font-family:SFUIDisplay-Regular;
          color:rgba(53,57,67,1);
          line-height:90rpx;
          box-sizing: border-box;
          padding-left: 40rpx;
        }
        .getcode {
          height: 28rpx;
          font-size:28rpx;
          font-family:PingFangSC-Regular;
          color:rgba(0,208,147,1);
          line-height:28rpx;
          position: absolute;
          top: 30rpx;
          right: 40rpx;
          z-index: 10;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 130rpx;
    background: #ffffff;
    width: 100%;
    line-height: 98rpx;
    z-index: 1;
    text-align: center;
    font-size: 32rpx;
    color:rgba(255,255,255,1);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .next {
      margin: 40rpx auto;
      //width: 670rpx;
      flex: 1;
      height: 98rpx;
      background:rgba(0,208,147,0.3);
      border-radius: 49rpx;
      color:rgba(255,255,255,1);
      font-family:PingFangSC-Regular;
      &.toNext {
        background:rgba(0,208,147,1);
      }
      &.type_2 {
        margin-left: 0rpx;
      }
    }
    .before {
      width:196rpx;
      height:98rpx;
      background:rgba(220,227,238,1);
      color:rgba(255,255,255,1);
      border-radius:50rpx;
      margin-right: 24rpx;
      margin-left: 40rpx;
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
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .up_img {
            width:100%;
            height:100%;
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
  .op_blo {
    padding: 0 40rpx;
    padding-top: 37rpx;
    .tit , 
    .tit_small{
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
    &.op_third {
      .table_blo {
        margin-bottom: 56rpx;

      }
    }
    .table_blo {
      margin-bottom: 80rpx;
      position: relative;
      .tit_small {
        font-size:26rpx;
        font-family:PingFangSC-Regular;
        color:rgba(53,57,67,1);
        line-height:26rpx;
      }
      .one_ipt {
        border-bottom:1rpx solid #cccccc;
      }
      .list_selct {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .blo {
          //width:136rpx;
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
          &.cur {
            background:rgba(0,208,147,0.05);
            border:1px solid rgba(0,208,147,1);
            font-family:SFUIDisplay-Regular;
            color:rgba(0,208,147,1);
          }
        }
      }
      .area {
        //border: 1rpx solid #cccccc;
        width: 100%;
        height: 140rpx;
        font-size:28rpx;
        font-family:PingFangSC-Regular;
        color:rgba(53,57,67,1);
        line-height:28rpx;
      }
      .astrict {
        position: absolute;
        right: 0rpx;
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
