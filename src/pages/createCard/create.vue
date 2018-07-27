
<template>
  <div class="container " :class="{'small': adaptive == 'small'}">
    <view class="hintJoined " v-if="relevance && nowNum == 0">
     <image class="hint_img" src="/static/images/new_pic_alert@3x.png"></image>
      <view class="hint_txt">系统检测到你在自客或小灯塔旗下相关产品有对应账号，已自动加载相关信息</view>
    </view>
    <view class="op_one" v-if="nowNum === 0">
      <view class="one_txt">
        <view class="tit1">创建名片，开启有趣的职场社交</view>
        <view class="tit2">真实可靠的职场形象总能碰到机遇</view>
      </view>

      <view class="one_pic">
        <view class="img_wrap" @tap="chooseImg">
          <view class="up_wrap">
            <image class="up_img" src="/static/images/as.png"></image>
          </view>
          <image class="pic" :src="filePath  || '/static/images/new_pic_defaulhead.jpg'"></image>
        </view>
      </view>
      <!-- //focus="{{focus}}" -->
      <input class="one_name" @blur="inputText" v-model.lazy="firstData.nickname" placeholder-style="text-align:center;font-size:32rpx;color:rgba(195,201,212,1);" placeholder="请输入姓名" maxlength="100" cursor-spacing="100"/>

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
        <input class="one_ipt" v-model.lazy="secondData.company" placeholder-style="font-size:32rpx;color:rgba(195,201,212,1);line-height:60rpx;" placeholder="请填写你当前任职的公司名，简称亦可" maxlength="100" />
      </view>
      <view class="table_blo row_style_one">
        <view class="tit">职位</view>
        <input class="one_ipt"  v-model.lazy="secondData.occupation"  placeholder-style="font-size:32rpx;color:rgba(195,201,212,1);line-height:60rpx;" placeholder="请填写你的职业"  maxlength="40" />
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
      <view class="table_blo row_style_three" >
        <view class="tit">个性签名</view>
        <!--  -->
        <input maxlength="25" class="area" v-model.lazy="thirdData.sign" placeholder="用一句话介绍你自己吧～" placeholder-style="font-size:32rpx;color:rgba(195,201,212,1);"
        v-if="!bindPhone.isPh" @input="changeTxt"/>
        <text class="astrict"><text class="ast" :class="{'ts': thirdData.sign.length == 25}">{{thirdData.sign.length}}</text>/25</text>
      </view>
    </view>

    <view class="pop_warp"  :class="{'hidden':!bindPhone.isPh}">
      <view class="sign_iphone" >
        <view class="ip_top">绑定手机号完善联系方式
          <view class="clo_warp" @tap.stop="clo">
            <image src="/static/images/popup_btn_close_nor@3x.png" ></image>
          </view>
        </view>
        <view class="ip_cont">
          <view class="ipt_blo">
            <button class="getcode" @tap.stop="sms" v-if="bindPhone.smsCli">获取验证码</button>
            <button class="getcode type2" v-else >重新获取{{codeTime}}s</button>
            <input class="input_1" placeholder="请输入手机号"  @input="inputText2"  type="number" name=""  maxlength="11" />
          </view>
          <view class="ipt_blo">
            <input placeholder="请输入验证码" maxlength="6" @input="inputText"  type="number" name="" />
          </view>
          <view class="hint_1">该手机号已经在“自客”注册，请更换手机号</view>
          <button class="ip_btn" @click.stop="toCode">完成绑定</button>
          <button class="hint_2 " open-type="getPhoneNumber" @getphonenumber="getPhone">点击快速绑定手机号码 > ></button>
        </view>
      </view>
    </view>
    
    <view class="footer" :class="{'type2':nowNum>0}">
      <block v-if="nowNum === 0">
        <button class="next toNext" @click.stop="toNext(nowNum)">
        下一步
        </button>
      </block>

      <block v-if="nowNum === 1">
        <button class="before" @click="before(0)">上一步</button>
        <button class="next toNext type_2" @click.stop="toNext(nowNum)" v-if="secondData.company.length>1&&secondData.company.length<51&& secondData.occupation.length>1&&secondData.occupation.length<21&&secondRule.rli.length>0 && secondRule.oli.length>0 ">下一步</button>
        <button class="next type_2" v-else >下一步</button>
      </block>

      <block v-if="nowNum === 2">
        <button class="before" @click="before(1)">上一步</button>
        <block v-if="userInfo.mobile.length>1">
          <button class="next toNext type_2"  v-if="thirdData.sign.length<=25&& thirdData.sign.length>1&&thirdRule.job.length>0 && thirdRule.live.length>0 " @click="toNext(nowNum)">完成创建</button>
          <button class="next type_2" v-else >完成创建</button>
        </block>
        <block v-else>
          <button class="next toNext type_2"  v-if="thirdData.sign.length <=25 && thirdData.sign.length>0 && thirdRule.job.length>0 && thirdRule.live.length>0 " open-type="getPhoneNumber" @getphonenumber="getPhone">完成创建</button>
          <button class="next type_2" v-else >完成创建</button>
        </block>
      </block>
    </view>
    <mptoast />
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  import App from '@/App'
  import { firstSignApi, secondSignApi, thirdSignApi, smsApi,postGetLabelByIds,postGetCreatedThreeLable } from '@/api/pages/login'
  import { getUserInfoApi } from '@/api/pages/user'
  import { uploadImage } from '@/mixins/uploader'
  export default {
    components: {
      mptoast,
    },
    data () {
      return {
        customText:'',  
        interval: null,
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
          code: '',
          smsCli: true,
        },
        codeTime: 60,
        nowNum : 0,
        isIp: false,
        filePath: '',
        isShow: false,
        userInfo: {},
        relevance: false,  //是否有关联
        adaptive: null,
        isPos: false
      }
    },
    computed: {
    },
    methods: {
      inputText(e){
        this.bindPhone.code = e.mp.detail.value
      },
      inputText2(e){
        this.bindPhone.number = e.mp.detail.value
      },
      isPoneAvailable(str) {
        console.log(str)
        let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
      },
      clo (){
        this.bindPhone.isPh = false
      },
      before(type){
        let that = this
        that.nowNum = type
      },
      getPhone(e){
        //bindgetphonenumber 从1.2.0 开始支持，但是在1.5.3以下版本中无法使用wx.canIUse进行检测，建议使用基础库版本进行判断。

        let that = this
        that.bindPhone.isPh = false

        if(!e.mp.detail.iv){
          that.bindPhone.isPh = true
        }else {
          let key = wx.getStorageSync('key')
          console.log(key)
          that.thirdData.iv = e.mp.detail.iv
          that.thirdData.encryptedData = e.mp.detail.encryptedData

          App.methods.checkLogin().then((res)=>{
            console.log('===checkLogin===',res)
            if(res.http_status == 200){
              that.thirdData.key = res.data.key
              that.thirdPost(1)
            }
          })
          
          /*if(key.length<1){
            App.methods.checkLogin().then((res)=>{
              console.log('===checkLogin===',res)
              if(res.http_status == 200){
                that.thirdData.key = res.data.key
                that.thirdPost(1)
              }
            })
            return
          }
          wx.checkSession({
            success: function(res){
              console.log(res)

              that.thirdData.key = key
              that.thirdPost(1)
            },
            fail: function(res){
              console.log(res)

              App.methods.checkLogin().then((res)=>{
                console.log('===checkLogin===',res)
                if(res.http_status == 200){
                  that.thirdData.key = res.data.key
                  that.thirdPost(1)
                }
              })
            }
          })*/
        }
      },
      thirdPost(type){
        let job = [],
            live = [],
            that = this;

        that.thirdData['build_label_id'] = []
        that.thirdRule.job.forEach((value,index)=>{
          console.log(value)
          that.thirdData['build_label_id'].push(that.thirdRule.jobData[value])
      　 });
        that.thirdRule.live.forEach((value,index)=>{
          console.log(value)
          that.thirdData['build_label_id'].push(that.thirdRule.liveData[value])
      　 });
        if(type==1){
        }else {
          that.thirdData['mobile'] = that.bindPhone.number
          that.thirdData['smsCode'] = that.bindPhone.code
        }

        that.thirdData.sign.trim()
        thirdSignApi(that.thirdData).then((res)=>{
          if(res.http_status==200){
            that.$mptoast('创建成功')
            that.bindPhone.isPh = false
            getUserInfoApi().then(res0 => {     
              that.$store.dispatch('userInfo', res0.data)
              wx.removeStorageSync('cutImgInfo')
              console.log('已更新个人信息', that.$store.getters.userInfo)
              setTimeout(function () {
                that.nowNum = 0
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            })
          }else {
            that.$mptoast(res.msg)
            if(res.code == 210){
              that.bindPhone.isPh = true
            }
          }
          //that.nowNum = 3;
        },(res)=>{
          that.$mptoast(res.msg)
        })
      },
      secondOne (index) {
        console.log(index)
        let that = this
        if(that.secondRule.oli.length>0){
          let oldIndex = that.secondRule.oli[0]

          that.listData[2].son[oldIndex].isCur = false
          if(index == oldIndex){ 
            that.secondRule.oli = []
            return 
          }
        }
        that.secondRule.oli[0] = index 
        that.listData[2].son[index].isCur = true
      },
      secondTwo (index) {
        let that = this
        if(that.secondRule.rli.length>0){
          let firIndex = that.secondRule.rli[0]

          if(that.secondRule.rli.indexOf(index) != -1){
            that.listData[0].son[index].isCur = false
            that.secondRule.rli.splice(that.secondRule.rli.indexOf(index), 1)
            return
          }
          if(that.secondRule.rli.length>=3){
            that.listData[0].son[firIndex].isCur = false
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
            that.thirdRule[str][index].isCur = false
            that.thirdRule[str2].splice(that.thirdRule[str2].indexOf(index), 1)
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
      changeTxt (e) {
        this.thirdData.sign = e.target.value
      },
      toNext (num) {
        
        console.log('toNext',num)
        let that = this,
            listData = that.listData,
            data = {};
        if (!this.filePath) {
          this.$mptoast('请上传您的图片')
          return
        }
        if (!this.firstData.nickname) {
          this.$mptoast('请输入您的姓名')
          return
        }
        if (this.firstData.gender === 0) {
          this.$mptoast('请选择您的性别')
          return
        }
        console.log(that.nowNum == 0)
        console.log(wx.getStorageSync('cutImgInfo'))

        if(that.nowNum == 0 && wx.getStorageSync('cutImgInfo')){
          const info = wx.getStorageSync('cutImgInfo')
          const parmas = {
            path: info.path,
            size: info.size,
            type: 'avatar'
          }
          wx.showLoading({
            title: '正在提交',
            mask: true
          })
          uploadImage(parmas, {
            onItemSuccess: (resp, file, index) => {
              console.log(resp)
            }
          }).then(res0 => {
            console.log(res0, 1111111)
            that.firstData.avatar_id = res0.file.fileId
            data = that.firstData
            data.nickname = data.nickname.trim()
            wx.hideLoading()
            firstSignApi(data).then((res)=>{
              if(res.http_status == 200){
                that.nowNum = 1;
                //this.bindPhone.isPh = true
              }
            },(res)=>{
              this.$mptoast(res.msg)
            })
          }).catch((e, index) => {
            console.log(e, '上传异常')
            this.userInfo.avatar_id = ''
            this.filePath = ''
            wx.hideLoading()
            if (e.statusCode === 405) {
              wx.showToast({
                title: e.message,
                icon: 'none',
                duration: 2000
              })
              return
            } else if (e.statusCode === 400) {
              wx.showToast({
                title: e.message,
                icon: 'none',
                duration: 2000
              })
              return
            }
          })
        }else if(that.nowNum == 1){
          let rli = this.secondRule.rli,
              oliData = listData[2].son,
              rliData = listData[0].son,
              msg = [];

          data = that.secondData
          rli.forEach((value,index)=>{
            msg.push(rliData[value].id)
        　 });

          data.realm_label_id = msg.join(",")
          data.occupation_label_id = oliData[this.secondRule.oli[0]].id.toString()
          data.company = data.company.trim()
          data.occupation = data.occupation.trim()
          secondSignApi(data).then((res)=>{
            if(res.http_status == 200){
              that.nowNum = 2;
              postGetCreatedThreeLable({
                id : data.occupation_label_id 
              }).then((res)=>{
                that.nowNum = 2;
                res.data.forEach((value,index)=>{
                  value.forEach((item,idx)=>{
                    item['isCur'] = false
              　   });
              　 });

                that.thirdRule = {
                  jobData: res.data[0],
                  liveData: res.data[1],
                  job:[],
                  live: [],
                }
              },(res)=>{
                this.$mptoast(res.msg)
              })
            }else {
              this.$mptoast(res.msg)
            }
          },(res)=>{
            this.$mptoast(res.msg)
          })
        }
        else if(that.nowNum == 2){
          if(that.userInfo.mobile.length>1){
            that.bindPhone.number = that.userInfo.mobile
            that.thirdPost(2)

            this.bindPhone = {
              isPh: false,
              number: '',
              code: '',
              smsCli: true,
            }
            this.codeTime = 60
          }
        }
      }, 
      toCode () {
        let that = this,
            next = '';
        if(this.bindPhone.number.length<1){
          that.$mptoast('请输入手机号码')
          return
        }
        next = that.isPoneAvailable(this.bindPhone.number);
        if(!next){
          that.$mptoast('手机格式不对')
          return
        }
        if(that.bindPhone.code.length<1){
          that.$mptoast('验证码不能为空')
          return
        }
        this.thirdPost(2)
      },
      //  
      phoneCountDown(){
        let that = this;

        that.interval = setInterval(()=>{
          if(that.codeTime==0){
            clearInterval(that.interval)
            that.bindPhone.smsCli = true
          }
          that.codeTime -= 1 
        },1000)
      },
      sms() {
        console.log('获取验证码')
        let that = this,
            data = {
              mobile : that.bindPhone.number
            },
            next = that.isPoneAvailable(data.mobile);

        if(next){
          smsApi(data).then((res)=>{
            that.bindPhone.smsCli = false
            that.codeTime = 60
            that.phoneCountDown();
          },(res)=>{
            that.$mptoast(res.msg)
          })
        }else {
          that.$mptoast('手机格式不对')
        }
        
      },
      isNull( str ){
        if (str.indexOf(" ") == -1) {
            return false
        } else {
            return true
        }
      },
    },
    onLoad (){
      let that = this
      let data = {
        labelType: '1,2,3,4' //标签类型。1擅长领域,2生活标签,3职业方向,4职业素养
      } 
      that.adaptive = wx.getStorageSync('adaptive')
      if(this.$store.getters.userInfo){
        let userInfo = this.$store.getters.userInfo
        if(userInfo.is_zike){
          this.relevance = true
        }
        this.firstData = {
          gender: userInfo.gender,
          nickname: userInfo.nickname,
          avatar_id: userInfo.avatar_id,
        }

        if(userInfo.avatar_info && userInfo.avatar_info.middleImgUrl){
          this.filePath = userInfo.avatar_info.middleImgUrl
        }
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

        this.bindPhone.number = userInfo.mobile
        that.userInfo = userInfo
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
      const info = wx.getStorageSync('cutImgInfo')
      if (info.path) {
        this.filePath = info.path
      }
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
.test {
  text-align: center;
  font-size: 32rpx;
  color: #333333;
  z-index: -1;
  position: fixed;
  bottom: 250rpx;
  width: 500rpx;
}
  .container {
    &.small {
      .one_txt {
        margin: 30rpx 0 50rpx 0;
      }
      .img_wrap {
        width: 300rpx;
        height: 300rpx;
      }
      .one_name {
        margin:30rpx auto 40rpx auto;

      }
      .one_gender {
        .gender{
          width: 110rpx;
          height: 110rpx;
        }
      }
    }
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
    //height:670rpx;
    background:rgba(255,255,255,1);
    border-radius:18rpx;
    position: absolute;
    left: 50%;
    top: 204rpx;
    transform: translate(-50%, 0);
    .ip_top {
      width: 670rpx;
      height: 92rpx;
      box-shadow: 0rpx 1rpx 0rpx 0rpx rgba(53,57,67,0.1);
      border-radius:18rpx 18rpx 0rpx 0rpx;
      line-height: 92rpx;
      font-size: 32rpx;
      color: rgba(53,57,67,1);
      border-bottom: 1rpx solid #ededed;
      text-align: center;
      position: relative;
      .clo_warp {
        width: 92rpx;
        height: 92rpx;
        position: absolute;
        right: 0rpx;
        top: 0rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      image {
        width:28rpx;
        height:28rpx;
      }
    }
    .ip_cont {
        padding: 80rpx 60rpx 45rpx;

      .hint_1 {
        height:24rpx;
        font-size:24rpx;
        color:rgba(255,102,102,1);
        line-height:24rpx;
        text-align: center;
        margin-bottom: 28rpx;
        display: none;
        font-weight: 300;
      }
      .hint_2 {
        height:28rpx;
        font-size:28rpx;
        color:rgba(0,208,147,1);
        line-height:28rpx;
        text-align: center;
        margin-top: 45rpx;
      }
      .ip_btn {
        width:570rpx;
        height:98rpx;
        background:rgba(0,208,147,1);
        border-radius:49rpx;
        font-size:32rpx;
        color:rgba(255,255,255,1);
        line-height:98rpx;
        margin-top: 60rpx;
      }
      .ipt_blo {
        width:550rpx;
        height:90rpx;
        position: relative;
        margin-bottom: 20rpx;
        background:rgba(250,251,252,1);
        border-radius:44rpx;
        input {
          width:550rpx;
          height:90rpx;
          border-radius:44rpx;
          font-size:32rpx;
          color:rgba(53,57,67,1);
          line-height:90rpx;
          box-sizing: border-box;
          padding-left: 40rpx;
          &.input_1 {
            width:350rpx;
          }
        }
        .getcode {
          height: 94rpx;
          width: 160rpx;
          font-size:28rpx;
          color:rgba(0,208,147,1);
          line-height:94rpx;
          position: absolute;
          top: 2rpx;
          right: 40rpx;
          z-index: 10;
          &.type2 {
            color: #B2F0DE;
          }
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    //height: 130rpx;
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
      margin: auto  40rpx;
      margin-bottom: 30rpx;
      //width: 670rpx;
      flex: 1;
      line-height: 98rpx;
      height: 98rpx;
      background:rgba(0,208,147,0.3);
      border-radius: 49rpx;
      color:rgba(255,255,255,1);
      font-size: 32rpx;
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
      line-height: 98rpx;
      font-size: 32rpx;
      margin-bottom: 30rpx;
    }
    &.type2 {
      position: relative;
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
        font-weight: 700;

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
        border-radius:18rpx;
        overflow: hidden;
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
      font-size: 32rpx;
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
          width:100%;
          height:100%;
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
    box-sizing: border-box;
    .hint_img {
      width:78rpx;
      height:78rpx;
      background:rgba(255,233,143,1);
      border-radius:37rpx;
      opacity:0.5;
      margin-right: 28rpx;
    }
    .hint_txt {
      font-size:26rpx;
      color:rgba(154,161,171,1);
      line-height:30rpx;
      //margin-left: 28rpx;
      flex: 1;
      font-weight: 300;

    }
  }
  .op_blo {
    padding: 0 40rpx;
    padding-top: 37rpx;
    .tit , 
    .tit_small{
      height:34rpx;
      font-size:34rpx;
      color:rgba(53,57,67,1);
      line-height:34rpx;
      position: relative;
      margin-bottom: 32rpx;
      text {
        font-size:26rpx;
        color:rgba(178,182,194,1);
        margin-left: 30rpx;
        font-weight: 300;

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
      &.signBox {
        width: 100%;
        height: 100%;
        padding: 0 40rpx;
        box-sizing: border-box;
        background: #fff;
        position: fixed !important;
        left: 0;
        top: 0;
        z-index: 10;
      }
      .tit_small {
        font-size:26rpx;
        color:rgba(53,57,67,1);
        line-height:26rpx;
        font-weight: 700;
      }
      .one_ipt {
        border-bottom:1rpx solid #cccccc;
        padding-bottom: 10rpx;
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
          color:rgba(154,161,171,1);
          line-height:60rpx;
          text-align: center;
          box-sizing: border-box;
          font-weight: 300;

          &.cur {
            background:rgba(0,208,147,0.05);
            border:1px solid rgba(0,208,147,1);
            color:rgba(0,208,147,1);
            font-weight: 500;
          }
        }
      }
      .area {
        //border: 1rpx solid #cccccc;
        width: 100%;
        height: 40rpx;
        font-size:28rpx;
        color:rgba(53,57,67,1);
        line-height:40rpx;
        margin-bottom: 20rpx;
      }
      .astrict {
        float: right;
        color: #B2B6C2;
        font-size:28rpx;
        font-weight: 300;
        display: flex;
        flex-direction: row;
        margin-bottom: 70rpx;
        .ast {
          color: #B2B6C2;
          &.ts {
            color: #FFBC47;
          }
        }
        
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
