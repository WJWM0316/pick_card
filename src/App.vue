<script>
import {getSessionKeyApi, saveBaseUserInfo} from '@/api/pages/login'
import {setUserGroup} from '@/api/pages/cardcase'
import {getUserInfoApi} from '@/api/pages/user'
export default {
  globalData : {
    userInfo: null
  },
  data () {
    return {
      test: false,
      testData: {}
    }
  },
  // 只有 app 才会有 onLaunch 的生命周期
  onLaunch (res) {
    wx.showShareMenu({
      withShareTicket: true
    })
    console.log(res)
    if(res&&res.shareTicket){
      this.test = res.shareTicket
    }
    // this.checkLogin()

  },

   // 捕获 app error
  onError (err) {
    console.log(err)
  },
  methods:{
    getUserInfo () {
      getUserInfoApi().then(res => {
        this.$store.dispatch('userInfo', res.data)
        console.log('已将个人信息存入store', this.$store.getters.userInfo)
      }).catch(e => {
        console.log(e)
      })
    },
    /**
     * 检测是否已登录
     */
    testShare(key){
      wx.showShareMenu({
        withShareTicket: true
      })
      console.log('=-=-=-=-=-==key',key)
       wx.getShareInfo({
        shareTicket: this.test,
        success: (res) => {
          console.log('已成功获取到加密信息',res)
          let data = {
            key: key,
            iv: res.iv,
            encryptedData: res.encryptedData
          }
          setUserGroup(data).then((res)=>{
            console.log('============',res)
          },(res)=>{
            console.log('============',res)
          }).catch(function(err) {
            // 最后的catch()方法可以捕获在这一条Promise链上的异常
            console.log('出错：' + err); // 出错：reject
          });
        },fail: (res)=> {
          console.log('shibai',res)
        }
      })
    },
    
  }
}
</script>

<style>
@import url("~@/styles/app.less");
page {
  font-size: 28rpx;
  color: #353943;
  height: 100%;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

button {
  content: "";  
  border:0; padding: 0; margin: 0;
  line-height:none;
  background: none;
  overflow:visible ;
  box-sizing:inherit;
  border-radius: 0;
  font-size: none;
}
.hidden {
  display: none;
}
button:after {
  border:none;
}
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

</style>
