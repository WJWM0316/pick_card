<script>
import {getSessionKeyApi, saveBaseUserInfo} from '@/api/pages/login'
import {setUserGroup} from '@/api/pages/cardcase'
import {getUserInfoApi,isJoinUserGroup} from '@/api/pages/user'
export default {
  globalData : {
    userInfo: null
  },
  data () {
    return {
      test: false,   //获取群信息
      testData: {}
    }
  },
  // 只有 app 才会有 onLaunch 的生命周期
  onLaunch (res) {
    console.log('test===>', res)

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
       wx.getShareInfo({
        shareTicket: this.test,
        success: (res) => {
          console.log('========已成功获取到加密信息',res)
          let data = {
            key: key,
            iv: res.iv,
            encryptedData: res.encryptedData
          }
          setUserGroup(data).then((res)=>{
            console.log('============成功，跳转群详情',res)

            wx.navigateTo({
              url: `/pages/flock/main?id=${res.data.openGId}&vkey=${res.data.userGroupId}`
            })
          },(res)=>{
            console.log('============',res)
          }).catch(function(err) {
            console.log('出错：' + err); 
          });
        },fail: (res)=> {
          console.log('shibai',res)
        }
      })
    },
  },
  onShow (res){
    wx.showShareMenu({
      withShareTicket: true
    })
    console.log('test===>onShow', res)
    if(res&&res.shareTicket){
      this.test = res.shareTicket
    } 
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
