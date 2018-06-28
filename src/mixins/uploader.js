
import { getUploadFileConfig, uploadFileToOSS } from '@/api/common'
import Vue from 'vue'
  /* ==== 图片相关 ==== */
  /**
   * 选择图片
   * @param {*} options
   */
  export const chooseImage = (options = {}) => {
    return new Promise((resolve, reject) => {
      const chooseOption = {
        count: options.count || 9,
        sizeType: options.sizeType || ['original', 'compressed'],
        sourceType: options.sourceType && options.sourceType instanceof Array && options.sourceType.length > 0 ? options.sourceType : ['album', 'camera'],
        success: res => {
          resolve(res)
        },
        fail: e => {
          reject(e)
        },
        complete: options.complete && typeof options.complete === 'function' ? options.complete : undefined
      }
      wx.chooseImage(chooseOption)
    })
  }

  /**
   * 上传图片
   * @param {*} file
   * @param {*} options
   */
  export const uploadImage = (file, options = {}) => {
    const onTaskInit = options.onTaskInit && typeof options.onTaskInit === 'function' ? options.onTaskInit : uploadTask => {}
    const onProgress = options.onProgress && typeof options.onProgress === 'function' ? options.onProgress : res => {}
    return new Promise((resolve, reject) => {
      const filePath = file.path
      const filePaths = filePath.split('/')
      const fileName = filePaths[filePaths.length - 1] // 文件名
      const fileNames = fileName.split('.')
      const suffix = fileNames[fileNames.length - 1] // 文件后缀

      // 验证文件
      if (/\.(png|jpe?g)$/.test(suffix)) {
        const error = { message: '图片格式不正确' }
        return Promise.reject(error)
      } else if (file.size > 50 * 1024 * 1024) {
        const error = { message: '图片不能大于50M' }
        return Promise.reject(error)
      }

      const params = {
        file: {
          originalName: fileName,
          runningTime: 0
        },
        fileType: 'avatar',
        private: 0
      }
      getUploadFileConfig(params).then(res => {
        console.log(filePath, res, 111)
        res = res.data
        res.systemConfig.suffix = suffix
        file.fileId = res.systemConfig.fileId
        console.log(res)
        return uploadFileToOSS(filePath, res, {
          // 上传任务初始化回调
          onTaskInit: uploadTask => {
            onTaskInit(uploadTask, file)
          },
          // 上传进度变化回调
          onProgress: resp => {
            onProgress(resp, file)
          }
        })
      }).then(res => {
        res.file = file
        resolve(res)
      }).catch(e => {
        reject(e, file)
      })
    })
  }

  /**
   * 上传多张图片
   * @param {*} files
   * @param {*} options
   */
  export const uploadImages = (files, options = {}) => {
    const promises = []
    console.log(files, 3333333333)
    files.forEach((file, index) => {
      const onItemTaskInit = options.onItemTaskInit && typeof options.onItemTaskInit === 'function' ? options.onItemTaskInit : () => {}
      const onItemProgress = options.onItemProgress && typeof options.onItemProgress === 'function' ? options.onItemProgress : () => {}
      const onItemSuccess = options.onItemSuccess && typeof options.onItemSuccess === 'function' ? options.onItemSuccess : () => {}
      const onItemFailed = options.onItemFailed && typeof options.onItemFailed === 'function' ? options.onItemFailed : () => {}

      const itemOptions = {
        onTaskInit: (task, file) => {
          onItemTaskInit(task, file, index)
        },
        onProgress: (res, file) => {
          onItemProgress(res, file, index)
        }
      }
      console.log(file, 2121212121)
      promises.push(uploadImage(file, itemOptions).then(res => {
        onItemSuccess(res, file, index)
        return Promise.resolve(res, file, index)
      }).catch(e => {
        onItemFailed(e, file, index)
        return Promise.reject(e, file, index)
      }))
    })

    return Promise.all(promises)
  }

  /* ==== 视频相关 ==== */
  /**
   * 选择视频
   * @param {*} options
   */
  export const chooseVideo = (options = {}) => {
    return new Promise((resolve, reject) => {
      wx.chooseVideo({
        sourceType: options.sourceType || ['album', 'camera'],
        compressed: options.compressed || true,
        maxDuration: options.maxDuration || 60,
        camera: options.camera || 'back',
        complete: options.complete && typeof options.complete === 'function' ? options.complete : undefined,
        success: res => {
          resolve(res)
        },
        fail: e => {
          reject(e)
        }
      })
    })
  }

  /**
   * 上传单个视频
   * @param {*} file
   * @param {*} options
   */
  export const uploadVideo = (file, options = {}) => {
    const onTaskInit = options.onTaskInit && typeof options.onTaskInit === 'function' ? options.onTaskInit : uploadTask => {}
    const onProgress = options.onProgress && typeof options.onProgress === 'function' ? options.onProgress : res => {}

    return new Promise((resolve, reject) => {
      const filePath = file.path
      const filePaths = filePath.split('/')
      const fileName = filePaths[filePaths.length - 1] // 文件名
      const fileNames = fileName.split('.')
      const suffix = fileNames[fileNames.length - 1] // 文件后缀

      // 验证文件
      if (/\.(mp4)$/.test(suffix)) {
        const error = { message: '视频格式不正确' }
        return Promise.reject(error)
      } else if (file.size > 50 * 1024 * 1024) {
        const error = { message: '视频不能大于50M' }
        return Promise.reject(error)
      }

      const params = {
        file: {
          originalName: fileName,
          runningTime: 0
        },
        fileType: 'video'
      }
      getUploadFileConfig(params).then(res => {
        res.systemConfig.suffix = suffix
        file.fileId = res.systemConfig.fileId
        return uploadFileToOSS(filePath, res, {
          // 上传任务初始化回调
          onTaskInit: uploadTask => {
            onTaskInit(uploadTask, file)
          },
          // 上传进度变化回调
          onProgress: resp => {
            onProgress(resp, file)
          }
        })
      }).then(res => {
        res.file = file
        resolve(res)
      }).catch(e => {
        reject(e, file)
      })
    })
  }

  /**
   * 上传单个视频
   * @param {*} file { path: '', duration: 0 }
   * @param {*} options
   */
  export const uploadAudio = (file, options = {}) => {
    const onTaskInit = options.onTaskInit && typeof options.onTaskInit === 'function' ? options.onTaskInit : uploadTask => {}
    const onProgress = options.onProgress && typeof options.onProgress === 'function' ? options.onProgress : res => {}

    return new Promise((resolve, reject) => {
      const filePath = file.path
      const filePaths = filePath.split('/')
      const fileName = filePaths[filePaths.length - 1] // 文件名
      const fileNames = fileName.split('.')
      const suffix = fileNames[fileNames.length - 1] // 文件后缀

      // 验证文件
      if (/\.(mp3)$/.test(suffix)) {
        const error = { message: '音频格式不正确' }
        return Promise.reject(error)
      } else if (file.size > 10 * 1024 * 1024) {
        const error = { message: '音频不能大于10M' }
        return Promise.reject(error)
      }

      const params = {
        file: {
          originalName: fileName,
          runningTime: parseInt(file.duration / 1000)
        },
        fileType: 'audio'
      }
      getUploadFileConfig(params).then(res => {
        res.systemConfig.suffix = suffix
        file.fileId = res.systemConfig.fileId
        return uploadFileToOSS(filePath, res, {
          // 上传任务初始化回调
          onTaskInit: uploadTask => {
            onTaskInit(uploadTask, file)
          },
          // 上传进度变化回调
          onProgress: resp => {
            onProgress(resp, file)
          }
        })
      }).then(res => {
        console.log('调用上传语音接口成功，接口返回：', res)
        res.file = file
        resolve(res)
      }).catch(e => {
        reject(e, file)
      })
    })
  }

