<template>
  <view class="upload" v-if="isShow">
    <view class="master"><image src="/static/images/new_pic_tailor@3x.png" @touchstart='canvas_start' @touchmove='canvas_move' @touchend='canvas_end'></image></view>
    <canvas id='cover-preview'  disable-scroll='true' canvas-id='cover-preview'> 
      <cover-view id='croper'></cover-view>  
   </canvas>
   <button id="croper-sure" @tap='cancel_croper'>取消</button>
   <button id="croper-cancel" @tap='upload_bg'>完成</button>
   <button class="open" open-type="openSetting" @tap="change" v-if="openSet">打开授权设置页</button>
   </view>
</template>
<script>
  import { uploadImage } from '@/mixins/uploader'
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      filePath: {
        type: String,
        default: ''
      }
    },
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
        openSet: false
      }
    },
    mounted () {
      this.ctx = wx.createCanvasContext('cover-preview')
      // if (this.bg_url) {
      //   wx.getSetting({
      //     success(res) {
      //       console.log(res, res.authSetting['scope.writePhotosAlbum'])
      //       if (!res.authSetting['scope.writePhotosAlbum']) {
      //         that.openSet = true
      //       } else {
      //         that.openSet = false
      //       }
      //     }
      //   })
      // }
    },
    watch: {
      isShow (val) {
        if (val) {
          this.change_cover()
        } else {
          this.$emit('isHide')
        }
      },
      filePath () {}
    },
    methods: {
    //选择并将图片输出到canvas  
    change_cover:function(){  
      var that = this;  
      wx.getImageInfo({  
        src: that.filePath,  
        success: function (res) {  
          console.log(res, 1111111111) 
          that.tempWidth = res.width;  
          that.tempHeight = res.height;
          that.ctx.drawImage(that.filePath,0, 0, 375,res.height/res.width*375);  
          that.ctx.draw();  
        }  
      }) 
    },  
    //监听手指触摸事件，并判断是移动还是缩放，并记录初始状态  
    canvas_start:function(e){
      var touches = e.touches.length;
      this.isControl(e.touches[0].pageX, e.touches[0].pageX)
      if (!this.isTouch) { return }
      if(touches == 1){  
        this._touches = 1;  
        this.start_position = { x: e.touches[0].pageX, y: e.touches[0].pageY, timeStamp:e.timeStamp}  
      }else if(touches == 2){  
        this._touches = 2;  
        this.start_position = { x: e.touches[0].pageX, y: e.touches[0].pageY, x1: e.touches[1].pageX, y1: e.touches[1].pageY, timeStamp: e.timeStamp }  
      }else{  
        this._touches = 1;  
      }
    },  
    //监听手指移动事件，并做出相应调整  
    canvas_move: function (e) {  
      var touches = e.touches.length
      console.log(e)
      if (!this.isTouch) { return }
      if (this._touches == 1 && e.timeStamp - this.start_position.timeStamp > 150) {
        let x = this.old_x + e.touches[0].pageX - this.start_position.x
        let y = this.old_y + e.touches[0].pageY - this.start_position.y
        console.log(x, y)
        this.ctx.drawImage(this.filePath, x, y, 375 * this.new_scale, this.tempHeight / this.tempWidth * 375 * this.new_scale);  
        this.ctx.draw();  
        this.is_move = true;  
      } else if (this._touches == 2 && e.timeStamp - this.start_position.timeStamp > 150) {
        console.log(e.touches[0].pageX, 222)
        var change_x = Math.abs(Math.abs(e.touches[0].pageX - e.touches[1].pageX) - Math.abs(this.start_position.x - this.start_position.x1));  
        var change_y = Math.abs(Math.abs(e.touches[0].pageY - e.touches[1].pageY) - Math.abs(this.start_position.y - this.start_position.y1));  
        if(change_x - change_y > 10){  
          this.old_scale = Math.abs(e.touches[0].pageX - e.touches[1].pageX) / Math.abs(this.start_position.x - this.start_position.x1);  
        }else{  
          this.old_scale = Math.abs(e.touches[0].pageY - e.touches[1].pageY) / Math.abs(this.start_position.y - this.start_position.y1);  
        }  
        this.ctx.drawImage(this.filePath, this.old_x, this.old_y, 375 * this.old_scale * this.new_scale, this.tempHeight / this.tempWidth * 375 * this.old_scale * this.new_scale);  
        this.ctx.draw();  
        this.is_move = true;  
      }else{  
        this.is_move = false;  
      }  
    },  
    //监听手指离开动作，并保存当前状态数据  
    canvas_end: function (e) {  
      console.log(e, 22)
      if (!this.isTouch) { return }
      if (this._touches == 1 && this.is_move) {
        this.old_x = this.old_x + e.mp.changedTouches[0].pageX - this.start_position.x;  
        this.old_y = this.old_y + e.mp.changedTouches[0].pageY - this.start_position.y;  
      } else if (this._touches == 2 && this.is_move) {  
        this.new_scale = this.old_scale * this.new_scale;  
      }     
    },  
    //确定并上传背景图  
    upload_bg:function(){  
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
          console.log(res)
          uploadImage(data, {
            onItemSuccess: (resp, file, index) => {
            }
          }).then(res => {
            console.log(res, 1)
            that.ctx.clearActions()
            that.$emit('isHide')
            that.$emit('getImgcut', res.file.fileId, that.bg_url)
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
    cancel_croper:function(){
      this.$emit('isHide', false)
      this.ctx.clearActions() 
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
      // wx.canvasGetImageData({
      //   canvasId: 'cover-preview',
      //   x: x,
      //   y: y,
      //   width: 1,
      //   height: 1,
      //   success(res) {
      //     if (res.data[0] !== 0 || res.data[1] !== 0 || res.data[2] !== 0 || res.data[3] !== 0) {
      //       that.isTouch = true
      //     } else {
      //       that.isTouch = false
      //     }
      //   }
      // })
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
    z-index: 2222;
    background: #fff;
  }
  .master {
    width: 100%;  
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    image {
      width: 100%;  
      height: 100%;
    }
  }
  #cover-preview{  
    width: 100%;  
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
  #croper{  
    width: 662rpx;  
    height: 662rpx;  
    position: absolute;  
    top: 208rpx;  
    left: 44rpx;
    border-radius: 18rpx;
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
    z-index: 3;
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
    z-index: 3; 
    text-align: center;
  }  
  .open {
    opacity: 0;
  }
</style>