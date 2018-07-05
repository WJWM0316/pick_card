<script>
import {getSessionKeyApi, saveBaseUserInfo} from '@/api/pages/login'
import {setUserGroup} from '@/api/pages/cardcase'
import {getUserInfoApi,isJoinUserGroup} from '@/api/pages/user'
import Vue from 'vue'
export default {
  globalData : {
    userInfo: null,
  },
  data () {
    return {
      test: false,   //获取群信息
      testData: {},
    }
  },
  // 只有 app 才会有 onLaunch 的生命周期
  onLaunch (res) {
    // this.checkLogin()
    let that = this
    /*wx.getSystemInfo({
      success: function(res) {
        that.globalData.systemInfo = res
        console.log(res)
      }
    })*/
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
    checkLogin () {
      let that = this
      return new Promise((resolve, reject) => {
        // 调用微信登录获取本地session_key
        wx.login({
          success: function (res) {
            // console.log('rquire login', res)
            // 请求接口获取服务器session_key
            const getSessionKeyParams = {
              code: res.code          
            }
            getSessionKeyApi(getSessionKeyParams).then(res => {
              console.log('require:获取sessionkey成功', res)
              if (res.data.token) {
                wx.setStorageSync('token', res.data.token)
              }
              // 为了获取用户信息
              if (res.data.key) {
                if(that.test){that.testShare(res.data.key)}
              }
              if (res.data.vkey) {
                wx.setStorageSync('vkey', res.data.vkey)
              }
              if (res.code === 0) {
                console.log('用户在其他平台已完成授权，不需要再次授权')
                // 获取用户信息存于store
                getUserInfoApi().then(res => {
                  Vue.prototype.$store.dispatch('userInfo', res.data)
                  console.log('已将个人信息存入store', Vue.prototype.$store.getters.userInfo)
                }).catch(e => {
                  console.log(e)
                })
              }
              if (res.code === 201) {
                Vue.prototype.$store.dispatch('needAuthorize', true) // 需要授权框
              }
              resolve(res)
            }).catch(e => {
              reject(e)
            })
          }
        })
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

      this.checkLogin()

    } 
  }
}
</script>

<style>
/*@import url("~@/styles/app.less");*/
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
