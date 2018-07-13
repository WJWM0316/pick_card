<template>
	<view class="more">
		<view class="txt">
			<textarea placeholder="留下些文字或作品吧，让别人更加了解你～" placeholder-style="color:#B2B6C2;font-size:32rpx;line-height:1.4;"
			maxlength=250 :value="info.content" @input="disableFun"></textarea>
			<view class="num"><text :class="{'numText' : info.content && info.content.length > 0}">{{info.content.length}}</text>/250</view>
		</view>
		<view class="imgBox">
			<view class="item">
				<image mode=aspectFill @tap="chooseImage" v-if="files.length < 20" src="/static/images/edit_btn_addphoto@2x.png"></image>
			</view>
			<view class="item" v-for="(i, index) in files" :key="index" v-if="index < 20">
				<image :src="i.path" mode=aspectFill @tap.stop="previewImage(index)"></image>
				<view class="bg" :style="{'height': i.progress}" v-if="i.progress !== '0%'"></view>
				<image @tap.stop="remove(i, index)" class="remove" src="/static/images/edit_btn_deletephoto@2x.png"></image>
			</view>
		</view>
		<view class="btnBox">
			<button  @tap="save" >保存</button>
		</view>
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	import {uploadImages} from '@/mixins/uploader'
	import {putMoreApi} from '@/api/pages/user'
	export default {
		data () {
			return {
				info: {
					content: '',
					img_id: '',
					img_info: []
				},
				files: [],	// 图片数组
				filesId: [], // 上传成功返回的id
				count: 0,
				oldNum: 0,
				loading: false,
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.global.userInfo
			})
		},
		onLoad (option) {
			this.files = []
			this.filesId = []
			this.vkey = option.vkey
			if (this.userInfo && this.userInfo.other_info.more_info) {
				this.info = this.userInfo.other_info.more_info
				this.info.img_info.forEach(e => {
					let data = {
						progress: '0%',
						path: e.smallImgUrl,
						oldImg: true
					}
					this.files.push(data)
				})
				this.count = this.userInfo.other_info.more_info.img_info.length
				this.oldNum = this.count
			}
		},
		onShow () {
		},
		methods: {
			disableFun (e) {
				console.log(e)
				this.info.content = e.target.value
			},
			chooseImage(e) {
	      const _this = this;
	      let imgNum = 9
	      if (20-this.count < 9) {
	      	imgNum = this.count
	      }
	      wx.chooseImage({
	      	count: imgNum, // 默认9
	        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	        success: function (res) {
	          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
	          const curIndex = _this.files.length
	          _this.files = _this.files.concat(res.tempFiles || [])
	          _this.loading = true
	          _this.count =+ res.tempFiles.length
	          uploadImages(res.tempFiles, {
			        onItemSuccess: (resp, file, index) => {
			        },
			        onItemProgress: (resp, file, index) => {
			        	_this.$set(_this.files[curIndex+index], 'progress', (100 - resp.progress) + '%')
			        }
			      }).then(res => {
			      	_this.filesId = _this.filesId.concat(res || [])
			      	 _this.loading = false
			      	 console.log(_this.loading, 11111)
			         console.log('全部上传成功',_this.filesId, res)
			      }).catch((e, index) => {
			      	wx.showToast({
						  title: '图片上传失败，请重新上传',
						  icon: 'none',
						  duration: 1000
						})
			        console.log(`第${index}张上传失败`, e)
			      })
	        },
	        fail: function () {
	          console.log('上传fail');
	        }
	      })
	    },
	    previewImage (index) {
	    	const _this = this
	    	let list = []
	    	this.files.forEach(item => {
	    		list.push(item.path)
	    	})
	    	wx.previewImage({
				  current: list[index], // 当前显示图片的http链接
				  urls:  list// 需要预览的图片http链接列表
				})
	    },
	    save () {
	    	if (this.loading) {
	    		wx.showToast({
					  title: '图片正在上传，请稍等',
					  icon: 'none',
					  duration: 1000
					})
					return
	    	}
	    	let array = []
	    	this.filesId.forEach((item,index) => {
	    		if (20 - this.oldNum > index) {
	    			array.push(item.file.fileId)
	    		}
	    	})

	    	this.info.img_id = this.info.img_id + ',' + array.join(',')
	    	
	    	if (this.info.img_id === ',') {
	    		this.info.img_id = ''
	    	}
	    	const data = {
	    		content: this.info.content,
	    		img_id: this.info.img_id
	    	}
	    	putMoreApi(data).then(res => {
	    		wx.navigateBack({
						delta: 1
					})
	    	})
	    },
	    remove (item, index) {
	    	let that = this
	    	wx.showModal({
				  content: '是否确定删除图片',
				  success: function(res) {
				    if (res.confirm) {
				      that.files.splice(index, 1)
					    	that.count --
					    	if (item.oldImg) {
					    		var array = that.info.img_id.split(',')
					    		array.splice(index, 1)
					    		var string = array.join(',')
					    		that.info.img_id = string
					    	} else {
					    		that.filesId.splice(index-that.oldNum, 1)
					    	}
						} else if (res.cancel) {
				    }
				  }
				})
	    	
	    }
	  }
	}
</script>
<style lang="less" type="text/less" scoped>
	.more {
		padding-bottom: 158rpx;
		.txt {
			padding: 38rpx 40rpx 80rpx;
			textarea {
				width: 100%;
				height: auto;
				font-size: 32rpx;
				min-height: 178rpx;
				font-weight: light;
			}
		}
		.num {
			margin-top: 20rpx;
			float: right;
			color: #C3C9D4;
			font-size: 32rpx;
			line-height: 1.4;
			.numText {
				color: #FFBC47;
			}
		}
		.imgBox {
			padding: 24rpx 40rpx;
			overflow: hidden;
			.item {
				width: 216rpx;
				height: 216rpx;
				margin: 0 11rpx 10rpx 0;
				float: left;
				border-radius:4px;
				overflow: hidden;
				position: relative;
				&:nth-child(3n) {
					margin-right: 0;
				}
				.bg {
					width: 100%;
					height: 100%;
					background: rgba(0,0,0,0.6);
					position: absolute;
					bottom: 0;
					left: 0;
					z-index: 2;
				}
				.remove {
					width: 48rpx;
					height: 48rpx;
					position: absolute;
					top: 0;
					right: 0;
					z-index: 1;
				}
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.btnBox {
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 40rpx;
			background: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 2;
			
			button {
				background: #00D093;
				height: 98rpx;
				border-radius: 49rpx;
				line-height: 98rpx;
				color: #fff;
				font-size: 32rpx;
				&.disable {
					opacity: 0.5;
				}
			}
		}
	}
</style>