<template>
	<view class="more">
		<view class="txt">
			<textarea placeholder="在这里，可以通过文字介绍你自己你也可以上 传一些作品，更好的介绍你自己。" placeholder-style="color:#B2B6C2;font-size:32rpx;line-height:1.4;"
			maxlength=250 v-model="info.content" @input="disableFun"></textarea>
			<text class="num">{{info.content.length}}/250</text>
		</view>
		<view class="imgBox">
			<view class="item" v-for="(i, index) in files" :key="index">
				<image :src="i.path" mode=aspectFill @tap.stop="previewImage(index)"></image>
				<view class="bg" :style="{'height': i.progress}" v-if="i.progress !== '0%'"></view>
				<image @tap.stop="remove(i, index)" class="remove" v-if="i.progress === '0%'" src="/static/images/edit_btn_deletephoto@2x.png"></image>
			</view>
			<view class="item">
				<image mode=aspectFill @tap="chooseImage" v-if="files.length < 20" src="/static/images/edit_btn_addphoto@2x.png"></image>
			</view>
		</view>
		<view class="btnBox">
			<button :class="{'disable': disable}" @tap="save" :disabled='disable'>保存</button>
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
				count: 20,
				disable: true
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.global.userInfo
			})
		},
		onLoad (option) {
			this.files = []
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
				console.log(this.files, 111111111111111111111111111)
				this.count = this.userInfo.other_info.more_info.img_info.length
			}
			this.disableFun()
		},
		onShow () {
			
			
		},
		methods: {
			disableFun () {
				if (this.info.content !== '' || this.files.length !== 0) {
					this.disable = false
				} else {
					this.disable = true
				}
			},
			chooseImage(e) {
	      const _this = this;
	      wx.chooseImage({
	      	count: 20 - this.count, // 默认9
	        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	        success: function (res) {
	          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
	          const curIndex = _this.files.length
	          _this.files = _this.files.concat(res.tempFiles || [])
	          console.log(_this.files, 11111, res.tempFiles)
	          _this.disableFun()
	          uploadImages(res.tempFiles, {
			        onItemSuccess: (resp, file, index) => {
			        },
			        onItemProgress: (resp, file, index) => {
			        	_this.$set(_this.files[curIndex+index], 'progress', (100 - resp.progress) + '%')
			        }
			      }).then(res => {
			      	_this.filesId = _this.filesId.concat(res || [])

			        console.log('全部上传成功',_this.filesId, res)
			      }).catch((e, index) => {
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
	    	let array = []
	    	this.filesId.forEach(item => {
	    		array.push(item.file.fileId)
	    	})
	    	console.log(this.info.img_id, 1111, array.join(','), 2222222)
	    	this.info.img_id = this.info.img_id + ',' + array.join(',')
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
	    	this.files.splice(index, 1)
	    	console.log(this.info.img_id)
	    	if (item.oldImg) {
	    		var a = this.info.img_id.split(',').splice(index, 1).join(',')
	    		console.log(a)
	    	} else {
	    		this.filesId.splice(index, 1)
	    	}
	    	this.disableFun()
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
				min-height: 178rpx;
			}
		}
		.num {
			margin-top: 20rpx;
			float: right;
			color: #C3C9D4;
			font-size: 28rpx;
			line-height: 40rpx;
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