<template>
  <view class="upload">
    <canvas id='cover-preview' canvas-id='cover-preview' disable-scroll=true> 
      <!-- <cover-view id='croper'></cover-view>   -->
    </canvas>
<!--    <canvas id='masterBg' canvas-id='cover-marster' disable-scroll=true  @touchstart.stop='canvas_start' @touchmove.stop='canvas_move' @touchend.stop='canvas_end'>
      <cover-view id='master'><cover-image class="bg" src="/static/images/new_pic_tailor@3x.png" ></cover-image></cover-view>
   </canvas> -->
   <canvas id='touch' canvas-id='cover-touch' disable-scroll=true @touchstart.stop='canvas_start' @touchmove.stop='canvas_move' @touchend.stop='canvas_end'></canvas>
   <!-- <button id="croper-sure" @tap='cancel_croper'>取消</button>
   <button id="croper-cancel" @tap='upload_bg'>完成</button>
   <button class="open" open-type="openSetting" @tap="change" v-if="openSet">打开授权设置页</button> -->
   <image src='https://card-uploads-test.oss-cn-shenzhen.aliyuncs.com/Uploads/static/new_pic_tailor%403x.png' style="opacity: 0;" ></image>
   </view>
   
</template>
<script>
  import { uploadImage } from '@/mixins/uploader'
  export default {
    data () {
      return {
        hide_canvas: true,
        ctx: '',
        start_position: {},//移动图片时手指起始坐标  
        tempWidth: 0,//图片初始宽度  
        tempHeight: 0,//图片初始高度  
        old_x: 0,//图片初始x坐标  
        old_y: 0,//图片初始y坐标  
        _touches: 1,//触屏的手指数  
        old_scale: 1,//原始放大倍数  
        new_scale: 1,//新的放大倍数  
        is_move: false,//是否移动  
        bg_url: '',
        isTouch: true,
        openSet: false,
        filePath: '',
        size: 0
      }
    },
    onLoad () {
      const that = this
      that.ctx = wx.createCanvasContext('cover-preview')
      
      
      wx.showModal({
        content: '请选择您的封面',
        success: function(res) {
          if (res.confirm) {
            that.chooseImg()
          } else if (res.cancel) {
            that.cancel_croper()
          }
        }
      })
    },
    methods: {
      chooseImg () {
        const that = this
        wx.chooseImage({  
          count: 1, // 默认9  
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
          success: function (res0) {
            console.log(res0, 222)
            that.filePath = res0.tempFilePaths[0]
            that.change_cover()
          }  
        })  
      },
      //选择并将图片输出到canvas  
      change_cover () {  
        var that = this;  
        const ctx = wx.createCanvasContext('cover-touch')
        let url = 'https://card-uploads-test.oss-cn-shenzhen.aliyuncs.com/Uploads/static/new_pic_tailor%403x.png'
        ctx.drawImage(url,0, 0, 375, 603)
        ctx.draw()
        wx.getImageInfo({  
          src: that.filePath,  
          success: function (res) {  
            that.tempWidth = res.width;  
            that.tempHeight = res.height;
            that.ctx.drawImage(that.filePath,0, 0, 375,res.height/res.width*375)
            that.ctx.draw()
          }  
        }) 
      },  
      //监听手指触摸事件，并判断是移动还是缩放，并记录初始状态  
      canvas_start (e) {
        console.log(e)
        var touches = e.touches.length;
        if(touches == 1){  
          this._touches = 1;  
          this.start_position = { x: e.touches[0].clientX, y: e.touches[0].clientY, timeStamp:e.timeStamp}  
        }else if(touches == 2){  
          this._touches = 2;  
          this.start_position = { x: e.touches[0].clientX, y: e.touches[0].clientY, x1: e.touches[1].clientX, y1: e.touches[1].clientY, timeStamp: e.timeStamp }  
        }else{  
          this._touches = 1;  
        }
      },  
      //监听手指移动事件，并做出相应调整  
      canvas_move (e) { 
        console.log(e) 
        var touches = e.touches.length
        // e.preventDefault()
        // e.stopPropagation()
        if (this._touches == 1 && e.timeStamp - this.start_position.timeStamp > 150) {
          let x = this.old_x + e.touches[0].clientX - this.start_position.x
          let y = this.old_y + e.touches[0].clientY - this.start_position.y
          console.log(x, y)
          console.log(this.old_x, e.touches[0].clientX, this.start_position.x)
          this.ctx.drawImage(this.filePath, x, y, 375 * this.new_scale, this.tempHeight / this.tempWidth * 375 * this.new_scale);  
          this.ctx.draw();  
          this.is_move = true;  
        } else if (this._touches == 2 && e.timeStamp - this.start_position.timeStamp > 150) {
          console.log(e.touches[0].clientX, 222)
          var change_x = Math.abs(Math.abs(e.touches[0].clientX - e.touches[1].clientX) - Math.abs(this.start_position.x - this.start_position.x1));  
          var change_y = Math.abs(Math.abs(e.touches[0].clientY - e.touches[1].clientY) - Math.abs(this.start_position.y - this.start_position.y1));  
          if(change_x - change_y > 10){  
            this.old_scale = Math.abs(e.touches[0].clientY - e.touches[1].clientY) / Math.abs(this.start_position.x - this.start_position.x1);  
          }else{  
            this.old_scale = Math.abs(e.touches[0].clientY - e.touches[1].clientY) / Math.abs(this.start_position.y - this.start_position.y1);  
          }  
          this.ctx.drawImage(this.filePath, this.old_x, this.old_y, 375 * this.old_scale * this.new_scale, this.tempHeight / this.tempWidth * 375 * this.old_scale * this.new_scale);  
          this.ctx.draw();  
          this.is_move = true;  
        }else{  
          this.is_move = false;  
        }  
      },  
      //监听手指离开动作，并保存当前状态数据  
      canvas_end (e) {  
        console.log(e)
        if (this._touches == 1 && this.is_move) {
          this.old_x = this.old_x + e.mp.changedTouches[0].clientX - this.start_position.x;  
          this.old_y = this.old_y + e.mp.changedTouches[0].clientY - this.start_position.y;  
        } else if (this._touches == 2 && this.is_move) {  
          this.new_scale = this.old_scale * this.new_scale;  
        }     
      },  
      //确定并上传背景图  
      upload_bg () {  
        var that = this;  
        var screenWidth = wx.getSystemInfoSync().screenWidth;  
        // console.log(screenWidth);  
        wx.canvasToTempFilePath({  
          x: 0,  
          y: screenWidth / 750 * 208,  
          width: screenWidth,  
          height: screenWidth / 750 * 661,  
          destWidth: 1000,  
          destHeight: 1000,  
          quality: 1,  
          canvasId: 'cover-preview',  
          success: function (res) {    
            //res.tempFilePath即为生成的图片路径
            that.bg_url = res.tempFilePath
            const data = {
              path: res.tempFilePath,
              size: 0
            }
            wx.showLoading({
              title: '上传中...',
              mask: true
            })
            uploadImage(data, {
              onItemSuccess: (resp, file, index) => {
              }
            }).then(res => {
              that.ctx.clearActions()
              const cutImgInfo = {
                fileId: res.file.fileId,
                path: res.file.path,
                size: res.file.size
              }
              wx.setStorageSync('cutImgInfo', cutImgInfo)
              wx.hideLoading()
              that.cancel_croper()
              // wx.showModal({
              //   title: '上传成功',
              //   content: '是否需要保存至相册',
              //   success: function (res) {
              //     if (res.confirm) {
              //       that.save_img()
              //     } else {
              //       that.isShow = false
              //     }
              //   }
              // })
            }).catch((e, index) => {
              console.log(e, 2)
            })
                   
          }  
        })  
      },  
      //取消图片预览编辑  
      cancel_croper () {
        wx.navigateBack({
          delta: 1
        })
      },
      save_img () {
        var that = this;
        wx.getSetting({
          success(res) {
            console.log(res, res.authSetting['scope.writePhotosAlbum'])
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                  that.openSet = false
                  wx.saveImageToPhotosAlbum({
                    filePath: that.bg_url,
                    success: function (e) {
                      console.log('保存成功', e)
                      wx.showToast({
                        title: '保存成功',
                        icon: 'success'
                      })
                      that.isShow = false
                      that.$emit('isHide')
                    },
                    fail: function (e) {
                      console.log('保存失败', e)
                    }
                  })
                },
                fail (res) {
                  console.log(111, res)
                  if (res.errMsg === 'authorize:fail auth deny') {
                    that.openSet = true
                  } 
                }
              })
            } else {
              wx.saveImageToPhotosAlbum({
                filePath: that.bg_url,
                success: function (e) {
                  console.log('保存成功', e)
                  that.$emit('isHide')
                  wx.navigateBack({
                    delta: 1
                  })
                },
                fail: function (e) {
                  console.log('保存失败', e)
                }
              })
            }
          },
          fail(res) {
            console.log(res, 1)
          }
        })
      },
      isControl (x, y) {
        const that = this
      }
    }
}
</script>
<style lang="less" type="text/less" scoped>
  .upload {
    width: 100%;  
    height: 100%; 
    position: fixed;  
    top: 0;  
    left: 0;
    overflow: hidden;
  }
  #cover-preview{  
    width: 100%;  
    height: 100%;
    position: absolute;  
    top: 0;  
    left: 0;
  }
  #croper{  
    width: 100%;  
    height: 100%;  
    position: absolute;  
    top: 0;  
    left: 0;
    background: url('https://card-uploads-test.oss-cn-shenzhen.aliyuncs.com/Uploads/static/new_pic_tailor%403x.png') no-repeat;
    background-size: 100% 100%;
    z-index: -1;
  }  
  #btn {
    width: 100%;
    height: 100rpx;
    position: fixed;
    z-index: 999999;
    bottom: 30rpx;
    left: 0;
  }

  #croper-sure{  
    width: 260rpx;  
    height: 98rpx;  
    background:rgba(154,161,171,1);
    border-radius:50px;
    color: #fff;  
    font-size: 32rpx;  
    line-height: 98rpx;
    position: absolute;  
    bottom: 30rpx;
    left: 40rpx;  
    z-index: 999;
    text-align: center;  
  }  
  #croper-cancel, .open{ 
    width:380rpx;
    height:98rpx;
    background:rgba(0,208,147,1);
    border-radius:49rpx;
    line-height: 98rpx;
    color: #fff; 
    font-size: 32rpx;  
    position: absolute;
    bottom: 30rpx;
    left: 330rpx; 
    z-index: 99999; 
    text-align: center;
  }  
  .open {
    opacity: 0;
  }
  #masterBg, #touch {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    #master {
      width: 100%;
      height: 100%;
      .bg {
        width: 100%;
        height: 100%;
      }
    }
  }

</style>