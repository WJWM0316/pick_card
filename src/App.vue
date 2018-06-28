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
    }
  },
  // 只有 app 才会有 onLaunch 的生命周期
  onLaunch (res) {
    this.checkLogin()
    if(!res.shareTicket){return}
     wx.getShareInfo({
      shareTicket: res.shareTicket,
      success: (res) => {
        console.log('已成功获取到加密信息',res)
        let data = {
          key: 'openid',
          vi: res.vi,
          encryptedData: res.encryptedData
        }
        setUserGroup().then((res)=>{
          console.log(res)
        })
      },fail: (res)=> {
        console.log('shibai',res)
      }
    })
  },

   // 捕获 app error
  onError (err) {
    console.log(err)
  },
  methods:{
    /**
     * 检测是否已登录
     */
    checkLogin () {
      return new Promise((resolve, reject) => {
        // 调用微信登录获取本地session_key
        const _this = this
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
                wx.setStorageSync('key', res.data.key)
              }
              // 为了获取用户信息
              if (res.data.vkey) {
                wx.setStorageSync('vkey', res.data.vkey)
              } 
              if (res.code === 0) {
                console.log('用户在其他平台已完成授权，不需要再次授权')
                // 获取用户信息存于store
                getUserInfoApi().then(res => {
                  _this.$store.dispatch('userInfo', res.data)
                  console.log('已将个人信息存入store', _this.$store.getters.userInfo)
                })
              }
              if (res.code === 201) {
                _this.$store.dispatch('needAuthorize', true) // 需要授权框
              }
              resolve(res)
            }).catch(e => {
              reject(e)
            })
          }
        })
      })
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
