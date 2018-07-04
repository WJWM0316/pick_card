<template>
  <div>
    <mpvue-cropper 
      ref="cropper"
      :option="cropperOpt"
      @ready="cropperReady"
      @beforeDraw="cropperBeforeDraw"
      @beforeImageLoad="cropperBeforeImageLoad"
      @beforeLoad="cropperLoad"
      ></mpvue-cropper>
    <div class="cropper-buttons">
      <div
        class="upload"
        @tap="uploadTap">
        上传图片
      </div>
      <div
        class="getCropperImage"
        @tap="getCropperImage">
        裁剪图片
      </div>
    </div>
  </div>
</template>

<script>
import MpvueCropper from 'mpvue-cropper'
let wecropper
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

export default {
  data () {
    return {
      size: 0,
      cropperOpt: {
        id: 'cropper',
        width,
        height,
        scale: 2.5,
        zoom: 8,
        cut: {
          x: (width - 330) / 2,
          y: (height - 330) / 2,
          width: 330,
          height: 330
        }
      }
    }
  },
  onShow () {
    this.size = 0
  },
  components: {
    MpvueCropper
  },

  methods: {
    cropperReady (...args) {
      console.log('cropper ready!')
    },
    cropperBeforeImageLoad (...args) {
      console.log('before image load')
    },
    cropperLoad (...args) {
      console.log('image loaded')
    },
    cropperBeforeDraw (...args) {
      // Todo: 绘制水印等等
    },
    uploadTap () {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          const src = res.tempFilePaths[0]
          //  获取裁剪图片资源后，给data添加src属性及其值
          this.size = res.tempFiles[0].size
          wecropper.pushOrigin(src)
        }
      })
    },
    getCropperImage () {
      if (this.size === 0) {
        wx.showToast({
          title: '请先上传图片',
          icon: 'none',
          duration: 2000
        })
        return
      }
      wecropper.getCropperImage()
        .then((src) => {
          // wx.previewImage({
          //   current: '', // 当前显示图片的http链接
          //   urls: [src] // 需要预览的图片http链接列表
          // })
          const cutImgInfo = {
            path: src,
            size: this.size
          }
          wx.setStorageSync('cutImgInfo', cutImgInfo)
          wx.showToast({
            title: '裁剪成功',
            icon: 'success',
            duration: 1000
          })
          wx.navigateBack({
            delta: 1
          })
        })
        .catch(e => {
          console.error('获取图片失败')
        })
      }
  },

  mounted () {
    wecropper = this.$refs.cropper
  }
}
</script>

<style>
.cropper-wrapper{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #e5e5e5;
}

.cropper-buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
}

.cropper-buttons .upload, .cropper-buttons .getCropperImage{
    width: 50%;
    text-align: center;
}

.cropper{
    position: absolute;
    top: 0;
    left: 0;
}

.cropper-buttons{
    background-color: rgba(0, 0, 0, 0.95);
    color: #04b00f;
}
</style>