
<template>
  <div class="container" >
    <view class="hintJoined hidden">
      <image class="hint_img" src=""></image>
      <view class="hint_txt">系统检测到你在自客或小灯塔旗下相关产品有</view>
    </view>
    <view class="op_one " :class="{'hidden': nowNum!=1}">
      <view class="one_txt">
        <view class="tit1">创建名片，开启有趣的职场社交</view>
        <view class="tit2">真实可靠的职场形象总能碰到机遇</view>
      </view>

      <view class="one_pic">
        <view class="img_wrap">
          <view class="up_wrap">
            <image class="up_img" src=""></image>
          </view>
          <image class="pic" src=""></image>
        </view>
      </view>
      <!-- //focus="{{focus}}" -->
      <input class="one_name" @blur="inputText" placeholder-style="text-align:center;font-size:32rpx;font-family:PingFangHK-Light;color:rgba(195,201,212,1);" placeholder="请输入姓名"  />

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


    <view class="op_two " :class="{'hidden': nowNum==1}">
      <view class="table_blo row_style_one">
        <view class="tit">最近任职公司</view>
        <input class="one_ipt" placeholder-style="font-size:32rpx;font-family:PingFangSC-Light;color:rgba(195,201,212,1);line-height:60rpx;" placeholder="例如：老虎科技"  />
      </view>
      <view class="table_blo row_style_one">
        <view class="tit">职位</view>
        <input class="one_ipt" v-model="firstData.realname" placeholder-style="font-size:32rpx;font-family:PingFangSC-Light;color:rgba(195,201,212,1);line-height:60rpx;" placeholder="例如：产品经理"  />
      </view>

      <view class="table_blo row_style_two">
        <view class="tit">职业方向 <text>请选1个职业方向</text></view>
        <view class="list_selct">
          <view class="blo">运营</view>
          <view class="blo">运营</view>
          <view class="blo">运营</view>
          <view class="blo">运营</view>
          <view class="blo">运营</view>
        </view>
      </view>

      <view class="table_blo row_style_two">
        <view class="tit">擅长领域 <text>请选择1~3个领域</text></view>
        <view class="list_selct">
          <view class="blo cur">O2O</view>
          <view class="blo">企业服务</view>
          <view class="blo">金融</view>
          <view class="blo">运营</view>
          <view class="blo">运营</view>
        </view>
      </view>

      <view class="table_blo row_style_three">
        <view class="tit">个人签名</view>
        <textarea class="area" placeholder="这个只有在按钮点击的时候才聚焦" placeholder-style="font-size:32rpx;font-family:PingFangSC-Light;color:rgba(195,201,212,1);line-height:60rpx;" />
        <text class="astrict">1/1</text>
      </view>
    </view>
    <view class="pop_warp hidden" v-if="isIp">
      <view class="sign_iphone" >
        <view class="ip_top">绑定手机号完善联系方式<image src="/static/images/popup_btn_close_nor@3x.png" ></image></view>
        <view class="ip_cont">
          <view class="ipt_blo">
            <text class="getcode" @tap="sms">获取验证码</text>
            <input placeholder="请输入手机号" @blur="codeText" type="" name=""  />
          </view>
          <view class="ipt_blo">
            <input placeholder="请输入验证码" @blur="phText" type="" name="" />
          </view>
          <view class="hint_1">该手机号已经在“自客”注册，请更换手机号</view>
          <button class="ip_btn" @click="toCode">完成绑定</button>
          <view class="hint_2">点击快速绑定手机号码 > ></view>
        </view>
      </view>
    </view>
    <view class="footer">
      <button class="next toNext" @click="toNext(1)"  v-if="nowNum == 1 && firstData.gender !== 0 && firstData.realname.length>0">下一步</button>
      <button class="next" v-else>下一步</button>
      <!-- <button class="next" v-else>完成创建</button> -->
    </view>
    <mptoast />
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  import { firstSignApi, smsApi } from '@/api/pages/login'

  export default {
    
    components: {
      mptoast
    },
    data () {
      return {
        focus: false,
        firstData: {
          gender: 0, //性别 1女 2男
          realname: '',
          avatar_id: '111',
        },
        bindPhone: {
          number: '',
          code: ''
        },
        nowNum : 1,
        isIp: false
      }
    },
    methods: {
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
          this.firstData.realname = val
        }
      },
      phText (e) {
        console.log(e)
        let val = e.target.value
        if(val.length>0){
          this.bindPhone.number = val
        }
      },
      codeText (e) {
        console.log(e)

        let val = e.target.value
        if(val.length>0){
          this.bindPhone.code = val
        }
      },
      toCode () {
        console.log('绑定手机')
      },
      toNext (num) {
        let that = this;

        firstSignApi(that.firstData).then((res)=>{
          console.log(res)
          that.nowNum = 2;

          that.iphoneOp();
        })
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
      }
    },

    created () {}
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
        background:rgba(195,201,212,1);
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
    z-index: 1;
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
    padding-top: 37rpx;
    .table_blo {
      padding: 0 40rpx;
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
          width:136rpx;
          height:60rpx;
          border-radius:34rpx;
          border:1rpx solid rgba(220,227,238,1);
          margin: 0 20rpx 20rpx 0;
          font-size:28rpx;
          font-family:PingFangSC-Light;
          color:rgba(154,161,171,1);
          line-height:60rpx;
          text-align: center;
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
