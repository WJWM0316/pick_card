<script>
import {getSessionKeyApi, saveBaseUserInfo} from '@/api/pages/login'
import {setUserGroup} from '@/api/pages/cardcase'
import {getUserInfoApi,isJoinUserGroup} from '@/api/pages/user'
import {sendFromIdApi} from '@/api/common'
import Vue from 'vue'
export default {
  globalData : {
    userInfo: null,
  },
  data () {
    return {
      test: false,   //获取群信息
      testData: {},
      enterRouteInfo: {}
    }
  },
  
  methods:{
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
                  wx.setStorageSync('key', res.data.key)
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
      let that = this
      wx.showShareMenu({
        withShareTicket: true
      })
       wx.getShareInfo({
        shareTicket: that.test,
        success: (res) => {
          console.log('========已成功获取到加密信息',res)
          let data = {
            key: key,
            iv: res.iv,
            encryptedData: res.encryptedData
          }
          setUserGroup(data).then((res)=>{
            
            let path = `pages/flock/main?id=${res.data.openGId}&vkey=${res.data.userGroupId}`
            that.enterRouteInfo.path = path
            console.log('============成功，跳转群详情', that.enterRouteInfo)
            wx.setStorageSync('enterRouteInfo', that.enterRouteInfo)
            wx.reLaunch({
              url: `/${path}`
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

    sendFormId ({fromId,fromAddress}) {
      let fromIdArr = wx.getStorageSync('fromIdArr')
      if(fromIdArr.length>0){
        fromIdArr = fromIdArr.split('-')
      }else {
        fromIdArr = []
      }

      console.log(`发送formId: ${fromId} 来源: ${fromAddress}->个数:${fromIdArr.length}`)
      if(fromIdArr.length>0 && fromIdArr[fromIdArr.length-1] == fromId ){
        //console.log('fromid 重复')
        return
      }
      
      fromIdArr.push(fromId)
      if (fromIdArr.length >= 3) {
        sendFromIdApi({'formId': fromIdArr})
        console.log('fromid 发送',fromIdArr)
        fromIdArr = []
      }

      fromIdArr = fromIdArr.join('-')
      wx.setStorageSync('fromIdArr', fromIdArr)
    },

    /**
     * 获取二维码参数对象
     */
    getSceneParams (scene) {
      scene = scene.indexOf('?') === 0 ? scene.substr(1) : scene
      const params = scene.split('&')
      const obj = {}
      params.forEach(item => {
        if (item) {
          const param = item.split('=')
          obj[param[0]] = param[1]
        }
      })
      return obj
    }
  },

  // 只有 app 才会有 onLaunch 的生命周期
  onLaunch (res) {
    //this.checkLogin()
    let that = this
    /*wx.getSystemInfo({
      success: function(res) {
        that.globalData.systemInfo = res
        console.log(res)
      }
    })*/
    wx.removeStorageSync('enterRouteInfo')
  },
  onShow (option) {
    this.enterRouteInfo = option
    if (!wx.getStorageSync('enterRouteInfo')) {
      wx.setStorageSync('enterRouteInfo', option)
    }
    
    wx.showShareMenu({
      withShareTicket: true
    })
    
    if(option &&option.query.type&&option.query.type=='flock'){
      if( option.shareTicket ){
        this.test = option.shareTicket
        this.checkLogin()
      }else {
        wx.reLaunch({
          url: `/pages/index/main`
        })
      }
    }else {
      this.test = false
    }


    // if (!wx.getStorageSync('token') && (option.path !== 'pages/index/main' || option.path !== 'pages/detail/main' || option.path !== 'pages/flock/main')) {
    //   this.checkLogin()
    // }
  },
   // 捕获 app error
  onError (err) {
    console.log(err)
  },
}
</script>
<style lang="less" type="text/less">
page {
  font-size: 28rpx;
  color: #353943;
  height: 100%;
  font-family: PingFangSC-light;
  font-weight: light;
  line-height: 1.4;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
* {
  -webkit-tap-highlight-color: rgba(200,200,200,0);
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
.from-box {
  width: 0;
  height: 0;
  font-size: 0;
  line-height: 0;
  .from-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    -webkit-appearance: none; /* 针对ios中会出现的阴影 */
    &:after {
      border: none;
    }
  }
}
</style>
