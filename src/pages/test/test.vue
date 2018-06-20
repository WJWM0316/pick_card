<template>
  <view>
    <button @tap="change_cover">按钮</button>
    <canvas id='cover-preview' @touchstart='canvas_start' @touchmove='canvas_move' @touchend='canvas_end' disable-scroll='true' canvas-id='cover-preview'>  
      <cover-view @tap='upload_bg' id='croper-sure'>确定</cover-view>  
      <cover-view @tap='cancel_croper' id='croper-cancel'>取消</cover-view>  
      <cover-view id='croper'></cover-view>  
   </canvas>
   </view>
</template>
<script>
  export default {
  config: {
      navigationBarTitleText: 'TodoList',
      enablePullDownRefresh: true,
    },
    data () {
      return {
        hide_canvas: true,
        ctx: '',
        start_position: {},//移动图片时手指起始坐标  
        tempFilePath: '',//图片路径  
        tempWidth: 0,//图片初始宽度  
        tempHeight: 0,//图片初始高度  
        old_x: 0,//图片初始x坐标  
        old_y: 0,//图片初始y坐标  
        _touches: 1,//触屏的手指数  
        old_scale: 1,//原始放大倍数  
        new_scale: 1,//新的放大倍数  
        is_move: false,//是否移动  
        bg_url: '',
        isTouch: false
      }
    },
    created () {
      this.ctx = wx.createCanvasContext('cover-preview')
    },
    methods: {
    //选择并将图片输出到canvas  
    change_cover:function(){  
        var that = this;  
        wx.showModal({  
          title: '提示',  
          content: '更改我的封面',  
          confirmColor: '#39bae8',  
          success: function (res) {  
            if (res.confirm) {     
              wx.chooseImage({  
                count: 1, // 默认9  
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
                success: function (res0) {  
                  
                  that.tempFilePath = res0.tempFilePaths[0]
                  console.log(that.tempFilePath, res0.tempFilePaths[0]) 
                  wx.getImageInfo({  
                    src: that.tempFilePath,  
                    success: function (res) {  
                      // console.log(res.width)  
                      // console.log(res.height)  
                      that.tempWidth = res.width;  
                      that.tempHeight = res.height;  
                      that.ctx.drawImage(that.tempFilePath,0, 0, 375,res.height/res.width*375);  
                      that.ctx.draw();  
                    }  
                  })  
                    
                }  
              })  
            } else if (res.cancel) {  
              console.log('用户点击取消')  
            }  
          }  
        })  
    },  
    //监听手指触摸事件，并判断是移动还是缩放，并记录初始状态  
    canvas_start:function(e){
      var touches = e.touches.length;
      this.isControl(e.touches[0].x, e.touches[0].y)
      if (!this.isTouch) { return }
      if(touches == 1){  
        this._touches = 1;  
        this.start_position = { x: e.touches[0].x, y: e.touches[0].y, timeStamp:e.timeStamp}  
      }else if(touches == 2){  
        this._touches = 2;  
        this.start_position = { x: e.touches[0].x, y: e.touches[0].y,x1: e.touches[1].x, y1: e.touches[1].y, timeStamp: e.timeStamp }  
      }else{  
        this._touches = 1;  
      }
    },  
    //监听手指移动事件，并做出相应调整  
    canvas_move: function (e) {  
      var touches = e.touches.length
      if (!this.isTouch) { return }
      if (this._touches == 1 && e.timeStamp - this.start_position.timeStamp > 150) {
        let x = this.old_x + e.touches[0].x - this.start_position.x
        let y = this.old_y + e.touches[0].y - this.start_position.y
        console.log(x, y)
        this.ctx.drawImage(this.tempFilePath, x, y, 375 * this.new_scale, this.tempHeight / this.tempWidth * 375 * this.new_scale);  
        this.ctx.draw();  
        this.is_move = true;  
      } else if (this._touches == 2 && e.timeStamp - this.start_position.timeStamp > 150) {
        console.log(e.touches[0].x, 222)
        var change_x = Math.abs(Math.abs(e.touches[0].x - e.touches[1].x) - Math.abs(this.start_position.x - this.start_position.x1));  
        var change_y = Math.abs(Math.abs(e.touches[0].y - e.touches[1].y) - Math.abs(this.start_position.y - this.start_position.y1));  
        if(change_x - change_y > 10){  
          this.old_scale = Math.abs(e.touches[0].x - e.touches[1].x) / Math.abs(this.start_position.x - this.start_position.x1);  
        }else{  
          this.old_scale = Math.abs(e.touches[0].y - e.touches[1].y) / Math.abs(this.start_position.y - this.start_position.y1);  
        }  
        this.ctx.drawImage(this.tempFilePath, this.old_x, this.old_y, 375 * this.old_scale * this.new_scale, this.tempHeight / this.tempWidth * 375 * this.old_scale * this.new_scale);  
        this.ctx.draw();  
        this.is_move = true;  
      }else{  
        this.is_move = false;  
      }  
    },  
    //监听手指离开动作，并保存当前状态数据  
    canvas_end: function (e) {  
      if (!this.isTouch) { return }
      if (this._touches == 1 && this.is_move) {
        this.old_x = this.old_x + e.mp.changedTouches[0].x - this.start_position.x;  
        this.old_y = this.old_y + e.mp.changedTouches[0].y - this.start_position.y;  
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
        y: screenWidth / 750 * 400,  
        width: screenWidth,  
        height: screenWidth / 750 * 526,  
        destWidth: screenWidth,  
        screenHeight: screenWidth / 750 * 526,  
        quality:1,  
        canvasId: 'cover-preview',  
        success: function (res) {    
          //res.tempFilePath即为生成的图片路径
          that.bg_url = res.tempFilePath
          that.save_img()
          console.log(res.tempFilePath)  
            
        }  
      })  
    },  
    //取消图片预览编辑  
    cancel_croper:function(){  
      this.ctx.clearActions() 
    },
    save_img () {
      var that = this;  
      wx.saveImageToPhotosAlbum({
        filePath: that.bg_url,
        success: function () {
          console.log('保存成功')
        }
      })
    },
    isControl (x, y) {
      const that = this
      wx.canvasGetImageData({
        canvasId: 'cover-preview',
        x: x,
        y: y,
        width: 1,
        height: 1,
        success(res) {
          if (res.data[0] !== 0 || res.data[1] !== 0 || res.data[2] !== 0 || res.data[3] !== 0) {
            that.isTouch = true
          } else {
            that.isTouch = false
          }
        }
      })
    }
  }
}

</script>
<style lang="less" type="text/less" scoped>
  #cover-preview{  
    width: 100%;  
    height: 1000rpx;  
    background-color: black;  
  }
  .scrollBar {
  }
  #croper{  
    width: 750rpx;  
    height: 526rpx;  
    position: absolute;  
    top: 400rpx;  
    left: 0;  
    background-color: rgba(135,206,250,0.5);  
  }  
    
  #croper-sure{  
    width: 120rpx;  
    height: 50rpx;  
    border-radius: 10rpx;  
    color: black;  
    background-color: rgba(135,206,250,0.8);  
    font-size: 40rpx;  
    position: absolute;  
    top: 946rpx;  
    right: 10rpx;  
    text-align: center  
  }  
  #croper-cancel{  
    width: 120rpx;  
    height: 50rpx;  
    border-radius: 10rpx;  
    color: black;  
    background-color: rgba(135,206,250,0.8);  
    font-size: 40rpx;  
    position: absolute;  
    top: 946rpx;  
    right: 150rpx;  
    text-align: center  
  }  
</style>