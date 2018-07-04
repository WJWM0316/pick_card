import config from '../config.js'
/* eslint-disable no-undef */
const util = {
  loading: (isLoading, content) => {
    if (isLoading) {
      wx.showLoading({
        title: content || '加载中...',
        mask: true
      })
    }
  },
  unloading: (isLoading) => {
    if (isLoading) {
      wx.hideLoading()
    }
  }
}

export const request = ({ method = 'post', url, data = {}, needKey = true, isLoading = true, needUserInfo = true } = {}) => {
  isLoading = data.isLoading || isLoading
  if (data.isLoading !== undefined) {
    delete data.isLoading
  }
  const promise = new Promise((resolve, reject) => {
    const error = {
      code: 500,
      message: '网络不可用，请检查网络设置。'
    }
    util.loading(isLoading)
    // if (wx.getStorageSync('token')) {
    //   if (method === 'get') {
    //     url = url + '?token=' + wx.getStorageSync('token') || ''
    //   } else {
    //     data.token = wx.getStorageSync('token') || ''
    //   } 
    // }
    const addHttpHead = {
      token: wx.getStorageSync('token') || ''
    }
    wx.request({
      url: config.baseHost+url,
      header: addHttpHead,
      // data: {
      //   user_id: wx.getStorageSync('user_id'),
      //   sign: that.utilMd5.hexMD5(
      //     `${url}?token=${wx.getStorageSync('token')}`
      //   ),
      //   ...data,
      // },
      data: data,
      method: method,
      success(res) {
        util.unloading(isLoading)
        //console.log('请求成功后 response', res)
        if (typeof res.data === 'string') { // 转换返回json
          res.data = JSON.parse(res.data)
        }
        if (res) {
          let msg = res.data
          //console.log('res.code', msg.http_status)
          //有字符串的情况下 转数字
          msg.http_status = parseInt(msg.http_status)
          switch (msg.http_status) {
            case 200:
              // 接口请求成功
              util.unloading(isLoading)
              resolve(msg)
              break
            default:
              util.unloading(isLoading)
              reject(msg)
          }
        }
      },
      fail(res) {
        console.error(url, res);
        util.unloading(isLoading)
        reject(res);
      },
    });
  })
  return promise
}

export const request2 = ({ method = 'post', url, data = {}, needKey = true, isLoading = true, needUserInfo = true } = {}) => {
  isLoading = data.isLoading || isLoading
  if (data.isLoading !== undefined) {
    delete data.isLoading
  }
  const promise = new Promise((resolve, reject) => {
    util.loading(isLoading)

    if (url.indexOf('http') === -1) {
      url = config.baseHost + url
    }

    let continueRequest = true
    if (needKey) { // 需要登录权限的，需要带上从缓存中取的session_key再请求
      const value = wx.getStorageSync('session_key') || ''
      if (value) {
        // 如果有session_key
        data['key'] = value
      } else {
        // 如果没有session_key
        continueRequest = false
        getSessionKey().then(res => {
          // 获取session_key成功，判断是否需要授权
          if (needUserInfo) {
            // console.log(res)
            return getUserInfo({ key: res.key })
          }
        }).then(res => {
          // 获取session_key和走完授权成功，重新发起原请求
          // console.log('重新发起请求的参数', data)
          return request({ method, url, data, needKey, isLoading: false }).then(res => {
            util.unloading(isLoading)
            resolve(res)
          })
        }).catch(e => {
          util.unloading(isLoading)
          reject(e)
        })
      }
    }
    if (continueRequest) {
      wx.request({ url, method, data }).catch(response => {
        const error = {
          code: 500,
          message: '网络不可用，请检查网络设置。'
        }
        util.unloading(isLoading)
        reject(error)
      }).then(response => {
        console.log('请求成功后 response', response)
        let resData = response.data
        if (typeof resData === 'string') { // 转换返回json
          resData = JSON.parse(resData)
        }
        console.log(resData)
        if (resData) {
          console.log('resData.statusCode', resData.statusCode)
          
          //有字符串的情况下 转数字
          resData.statusCode = parseInt(resData.statusCode)
          switch (resData.statusCode) {
            case 200:
              // 接口请求成功
              util.unloading(isLoading)
              resolve(resData.data === undefined ? {} : resData.data)
              break
            case 264:
              // 内容已被删除，跳转删除页面
              wx.redirectTo({
                url: '/pages/emptyPage/index'
              })
              break
            case 425:
              // 当没有授权用户信息 跳转到登录页
              getSessionKey().then(res => {
                // 获取session_key成功，判断是否需要授权
                getUserInfo({ key: res.key }).then(() => {
                  wx.navigateTo({
                    url: '/pages/login/index'
                  })
                }).catch(() => {
                  wx.navigateTo({
                    url: '/pages/login/index'
                  })
                })
              })
              break
            case 426:
              // 当没有授权用户手机 直接跳转手机号登录
              wx.navigateTo({
                url: '/pages/login/index'
              })
              break
            case 429:
              // 找不到集call人
              wx.switchTab({
                url: '/pages/home/index'
              })
              break
            case 430:
              // 检测是否已完善信息，跳转去完善信息后再返回来源页
              wx.redirectTo({
                url: '/pages/center/editinfo'
              })
              break
            case 400:
              // 用户没有绑定手机号
              util.unloading(isLoading)
              reject(resData)
              break
            case 427:
              // 当session_key失效 code无效 重新获取code，拿code换session_key
              // console.log('require: 当后端取不到code或者code失效')
              // console.log('427 data', data, resData)
              getSessionKey().then(res => {
                // 获取session_key成功，判断是否需要授权
                if (needUserInfo) {
                  return getUserInfo({ key: res.key })
                }
              }).then(res => {
                // 获取session_key成功，重新发起原请求
                return request({ method, url, data, needKey, isLoading: false }).then(res => {
                  util.unloading(isLoading)
                  resolve(res)
                })
              }).catch(e => {
                util.unloading(isLoading)
                reject(e)
              })
              break
            default:
              util.unloading(isLoading)
              reject(resData)
          }
        }
      }).catch(response => {
        util.unloading(isLoading)
        reject(response)
      })
    }
  })

  return promise
}

// 上传微信文件到服务器
export const upload = ({ url, filePath, data = {}, setting = {}, isLoading = false } = {}) => {
  return new Promise((resolve, reject) => {
    if (url.indexOf('http') === -1) {
      url = config.baseHost + url
    }
    util.loading(isLoading, '上传中...')
    const uploadTask = wx.uploadFile({
      url: url,
      filePath: filePath,
      name: setting.name || 'file',
      formData: data,
      header: setting.header || {},
      success: res => {
        console.log('上传文件接口返回：', res)
        try {
          let resData = res.data

          if (typeof resData === 'string') { // 转换返回json
            resData = JSON.parse(resData || '{}')
          }

          if (resData) {
            switch (resData.statusCode) {
              case 200:
                // 接口请求成功
                resolve(resData.data === undefined ? {} : resData.data)
                break
              default:
                reject(resData)
            }
          }
        } catch (error) {
          console.log('服务器错误：', res)
          console.log('catch到的错误信息', error)
          const e = { message: '网络连接异常，请重试' }
          reject(e)
        }
      },
      fail: res => {
        reject(res)
      },
      complete: res => {
        util.unloading(isLoading)
      }
    })

    if (setting.onTaskInit && setting.onTaskInit instanceof Function) {
      setting.onTaskInit(uploadTask)
    }

    if (setting.onProgress && setting.onProgress instanceof Function) {
      uploadTask.onProgressUpdate((res) => {
        setting.onProgress(res)
        // // console.log('上传进度', res.progress)
        // // console.log('已经上传的数据长度', res.totalBytesSent)
        // // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      })
    }
  })
}

/**
 * 获取session_key
 */
export function getSessionKey ({ isLoading = false } = {}) {
  return new Promise((resolve, reject) => {
    // 调用微信登录获取本地session_key
    wx.login({
      success: function (res) {
        // console.log('rquire login')
        // 请求接口获取服务器session_key
        const getSessionKeyParams = {
          url: '/wx/my/getSessionKey',
          data: {
            code: res.code
          },
          needKey: false,
          isLoading: isLoading
        }
        request(getSessionKeyParams).then(res => {
          // console.log('require:获取sessionkey成功并存入本地缓存', res.key)
          wx.setStorageSync('session_key', res.key)
          resolve(res)
        }).catch(e => {
          // console.log('rquire: 严重错误：code换session失败，错误码400', e.message)
          reject(e)
        })
      }
    })
  })
}

/**
 * 获取用户信息
 * @param {*} key
 */
export function getUserInfo ({ key, isLoading = false } = {}) {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      withCredentials: true, // 是否带上登录态信息，true时必须已经wx.login后
      success: function (res) {
        console.log('用户同意微信授权', res)
        // 这里不取微信返回的用户信息，而是将加密后的用户信息请求后端，后端将用户信息入库，再返回的整理后的给前端。
        // console.log('微信userInfo换自己服务的userInfo,', res)
        const data = {
          encryptedData: res.encryptedData,
          iv: res.iv
        }
        // 如果有key
        if (key) {
          data.key = key
        }
        const grantInformationParams = {
          url: '/wx/my/grantInformation',
          data: data,
          isLoading: isLoading,
          needUserInfo: false
        }
        request(grantInformationParams).then(resp => {
          console.log('获取用户授权成功并交换userinfo成功', resp)
          resolve(resp)
        }).catch(e => {
          // 捕获 grantInformationApi 异常
          // console.log('捕获 grantInformationApi', e)
          reject(e)
        })
      },
      fail: function (res) {
        console.log('用户拒绝微信授权 微信getUserInfo 失败', res)
        reject(res)
      }
    })
  })
}
