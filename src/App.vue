<script>
import {request} from './api/require.js'
export default {
  globalData = {
    userInfo: null
  }
  // 只有 app 才会有 onLaunch 的生命周期
  onLaunch () {
    this.checkLogin()
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
        wx.login({
          success: function (res) {
            // console.log('rquire login')
            // 请求接口获取服务器session_key
            const getSessionKeyParams = {
              url: '/auth/getSessionKey',
              data: {
                code: res.code
              },
              needKey: false
            }
            request(getSessionKeyParams).then(res => {
              // console.log('require:获取sessionkey成功并存入本地缓存', res.key)
              wx.setStorageSync('session_key', res.key)
              console.log(1111)
              resolve(res)
            }).catch(e => {
              console.log(e)
              if (e.data.code == 202) {
                console.log(e.data.msg)
              }
              // console.log('rquire: 严重错误：code换session失败，错误码400', e.message)
              reject(e)
            })
          }
        })
      })
    }
  },
  created () {
    let that = this
    // wx.getStorage({
    //   key: 'wxInfo',
    //   success (res) {
    //     console.log('您已授权过了')
    //   },
    //   fail(err) {
    //     //获取微信code,然后用code获取后端openid,session_key等信息
    //     wx.login({
    //       success: async (res) => {
    //         // 这个url就是我们后端的接口地址,省略了前面的服务器名称,服务器名称配置看 /src/main.js里面的配置
    //         let url = 'mobileWechatApplets/jscode2session'
    //         let body={jsCode:res.code}
    //         let loginRes = await that.$post(url,body)
    //         if(loginRes.code == 1) {
    //           wx.setStorage({key:"wxInfo", data:loginRes.data})
    //           console.log('登录成功!:', loginRes)
    //         }
    //         // console.log('code!:', res)
    //       }
    //     })
    //   }
    // })
  }
}
</script>

<style>
page {
  font-size: 28rpx;
  color: #353943;
  height: 100%;
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
