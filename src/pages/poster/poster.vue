<template>
	<view class="poster" v-if="imgUrl">
		<view class="wrap">
			<canvas canvas-id="shareCanvas" id="myCanvas" :class="{'hidden' : showImg !== ''}" width="320" height="580">
			</canvas>
			<canvas canvas-id="endCanvas" id="endCanvas" :class="{'hidden' : showImg !== ''}" width="320" height="580">
			</canvas>
			<image class="showImg" :src="showImg"></image>
		</view>
		<button class="save" open-type="openSetting" v-if="openSet"><image class="icon" src="/static/images/share_btn_savepic@3x.png"></image>保存图片</button>
		<button @tap.stop="save" class="save" v-else><image class="icon" src="/static/images/share_btn_savepic@3x.png"></image>保存图片</button>
	</view>
</template>
<script>
	import {getShareCode} from '@/api/pages/cardcase'
	export default {
		data () {
			return {
				imgH: 0,
				imgW: 0,
				showImg: '',
				openSet: false,
				width: 0,
				height: 0,
				pixelRatio: 0,
				info: {
					nickname: '',
					job: '',
					sign: '',
					label: []
				},
				imgUrl: ''
			}
		},
		onShow (option) {
			this.imgUrl = ''
			let that = this
			wx.getSetting({
        success(res) {
          console.log(res, res.authSetting['scope.writePhotosAlbum'])
          if (res.authSetting['scope.writePhotosAlbum']) {
          	that.openSet = false
        	}
        }
      })
			if (that.openSet) { return }
			let userInfo = this.$store.getters.userInfo
			this.info.nickname = userInfo.nickname
			console.log(userInfo, 1111111)
			this.info.job = userInfo.occupation + ' | ' + userInfo.company
			this.info.sign = userInfo.sign
			this.info.label = userInfo.other_info.label_info
			this.imgUrl = userInfo.avatar_info.bigImgUrl
			
			wx.showLoading({
        title: '正在生成图片',
        mask: true
      })
			// wx.getSystemInfo({
			// 	success： function(res) {
			// 		that.width = res.windowWidth()
			//     that.height = res.windowHeight()
			//     that.pixelRatio = res.pixelRatio()
			// 	}
			// })
			let data = {
				page: 'pages/detail/main',
				length: 150,
				scene: `vkey=${userInfo.vkey}`,
			}
      getShareCode(data).then(res => {
      	wx.downloadFile({
				  url: res.data,
				  success: function(res1) {
				  	that.create(res1.tempFilePath, that)
				  }
				})
      })

		},
		methods: {
			create (path, that) {
				wx.downloadFile({
				  url: that.imgUrl,
				  success: function(res) {
				    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
				    if (res.statusCode === 200) {
				    	console.log(res, '下载成功')
							const ctx = wx.createCanvasContext('shareCanvas')
							ctx.width = 320
							ctx.clearActions()
							ctx.clearRect(0, 0, 320, 580)
							that.showImg = ''

							ctx.setFillStyle('#fff')
							ctx.fillRect(0, 0, 320, 580)
							// 画布圆角
							// roundRect (0,0,320,580,9)
							// function roundRect (x, y, w, h, r) {
							// 	ctx.beginPath();
							// 	ctx.arc(x + r, y + r, r, Math.PI, Math.PI *  1.5)
							// 	ctx.moveTo(x + r, y)
							// 	ctx.lineTo(x + w - r, y)
							// 	ctx.lineTo(x + w, y + r)
							// 	ctx.arc(x + w - r, y + r, r, Math.PI *  1.5  , Math.PI *  2  )
							// 	ctx.lineTo(x + w, y + h - r)
							// 	ctx.lineTo(x + w - r, y + h)
							// 	ctx.arc(x + w - r, y + h - r, r,  0  , Math.PI *  0.5  )
							// 	ctx.lineTo(x + r, y + h)
							// 	ctx.lineTo(x, y + h - r)
							// 	ctx.arc(x + r, y + h - r, r, Math.PI *  0.5  , Math.PI)
							// 	ctx.lineTo(x, y + r)
							// 	ctx.lineTo(x + r, y)
							// 	ctx.setFillStyle('#ffffff')
							// 	ctx.fill()
							// 	ctx.closePath()
							// 	// ctx.clip()
							// }

							that.imgUrl = res.tempFilePath
							// 画头像
					    ctx.drawImage(that.imgUrl, 0, 0, 320, 320)

					    // 画文案
					    ctx.setTextAlign('left')
					    ctx.setFillStyle('#ffffff')
					    ctx.setFontSize(24)
					    if (that.info.nickname.length > 20) {
					    	that.info.nickname = that.info.nickname.slice(0, 17) + '...'
					    }
					    ctx.fillText(that.info.nickname, 17, 280)

					    ctx.setFontSize(16)
					    if (that.info.job.length > 20) {
					    	that.info.job = that.info.job.slice(0, 17) + '...'
					    }
					    ctx.fillText(that.info.job, 17, 300)
					    let staticY = 349
					    ctx.setFontSize(14)
					    ctx.setFillStyle('#9AA1AB')
					    if (that.info.sign.length > 20) {
					    	ctx.fillText(that.info.sign.slice(0, 19), 17, staticY)
					    	staticY = staticY + 20
					    	ctx.fillText(that.info.sign.slice(20, that.info.sign.length-1), 17, staticY)
					    } else {
					    	ctx.fillText(that.info.sign.slice(0, 19), 17, staticY)
					    }
					    ctx.setFontSize(12)
					    ctx.setFillStyle('#00D093')
					    staticY = staticY + 16
					    let position = {
					    	x: 17,
					    	y: staticY
					    }
					    ctx.setStrokeStyle('#00D093')
							ctx.setLineWidth(1)
					    let r = 12
					    let lineNun = 1
					    let nextLabel = true
					    that.info.label.forEach((item, index) => {
					    	addLabel(item.name, index)
					    })


					    // 画标签
					    let last = false
					    function addLabel (item, index) {
					    	if (lineNun > 2 || last) {
					    		return
					    	}
					    	ctx.setLineDash([1000]);
					    	// 下个标签的宽度
					    	let newLabelWidth = 0
					    	if (index < that.info.label.length-1) {
					    		newLabelWidth = ctx.measureText(that.info.label[index+1].name).width + 2*r
					    	}
								
								let metrics = ctx.measureText(item).width // 文本宽度
					    	// 判断是否超过两行切需要打点
					    	if (lineNun === 2 && (newLabelWidth + position.x + metrics + 5) > (320-20)) {
					    		metrics = ctx.measureText('····').width
									ctx.fillText('····', position.x + r, position.y + r + 4)
									last = true
					    	} else {
					    		metrics = ctx.measureText(item).width
									ctx.fillText(item, position.x + r, position.y + r + 5)
					    	}
				    	
								ctx.beginPath()
								ctx.moveTo(position.x + r, position.y)
								ctx.lineTo(position.x + r + metrics, position.y)
								ctx.stroke()
								ctx.beginPath()
								ctx.arc(position.x + r, position.y + r, r, 0.5*Math.PI, 1.5*Math.PI)
								ctx.stroke()
								ctx.beginPath()
								ctx.moveTo(position.x + r + metrics, position.y + 2*r)
								ctx.lineTo(position.x + r, position.y + 2*r)
								ctx.stroke()
								ctx.beginPath()
								ctx.arc(position.x + r + metrics, position.y + r, r, 1.5*Math.PI, 0.5*Math.PI)
								ctx.stroke()

								// 下一个标签的横坐标
								position.x = position.x + 2*r + metrics + 5
								// 判断是否需要换行
								if ((newLabelWidth + position.x) > (320-20) && lineNun !== 2) {
									position.x = 17
									staticY = staticY + 2*r + 7
									position.y = position.y + 2*r + 7
									lineNun ++
									console.log(staticY, 2121212)
								}
					    }			    


					    // 画虚线
					    ctx.setStrokeStyle('#DCE3EE')
					    ctx.setLineDash([4, 6], 0)
							ctx.beginPath()
							staticY = staticY + 48
							ctx.moveTo(17, staticY)
							ctx.lineTo(303, staticY)
							ctx.stroke()

							// 清除圆镂空部分
							function clearArc(x,y,radius){ //圆心(x,y)，半径radius
								var calcWidth = radius - stepClear;
								var calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth)
								
								var posX = x - calcWidth
								var posY = y - calcHeight
								
								var widthX = 2 * calcWidth
								var heightY = 2 * calcHeight
								
								if(stepClear <= radius){
									ctx.clearRect(posX, posY, widthX, heightY)
									stepClear += 1
									clearArc(x, y, radius)
								}
							}
							let stepClear = 1;//别忘记这一步
							ctx.beginPath();
							clearArc(0, staticY, 10)
							ctx.save() 
							stepClear = 1
							clearArc(320, staticY, 10)



					    // 画二维码
					    staticY = staticY + 10
					    ctx.drawImage(path, 200, staticY, 100, 100)

					    // 画指引文案
							ctx.setTextAlign('left')
					    ctx.setFillStyle('#B2B6C2')
					    ctx.setFontSize(14)
					    staticY = staticY + 50
					    ctx.fillText('长按添加TA的趣名片', 30, staticY)
					    ctx.draw(true, () => {
					    	console.log('画图成功')
					    	wx.hideLoading()
					    	wx.canvasToTempFilePath({
								  x: 0,
								  y: 0,
								  width: 320,
								  height: staticY + 60,
								  destWidth: 320*2,
								  destHeight: (staticY + 60)*2,
								  canvasId: 'shareCanvas',
								  success: function(res) {
								  	// console.log('导出图片成功')
								  	that.showImg = res.tempFilePath
								  } 
								})
					    })
					  }
					}
				})
			},
			save () {
				let that = this
				wx.getSetting({
	        success(res) {
	          console.log(res, res.authSetting['scope.writePhotosAlbum'])
	          if (!res.authSetting['scope.writePhotosAlbum']) {
	            wx.authorize({
	              scope: 'scope.writePhotosAlbum',
	              success() {
	                that.openSet = false
	                svae()
	              },
	              fail (res) {
	                if (res.errMsg === 'authorize:fail auth deny') {
	                  that.openSet = true
	                } 
	              }
	            })
	          } else {
	          	svae()
	          }
	         }
	      })
	      function svae () {
	      	wx.saveImageToPhotosAlbum({
	          filePath: that.showImg,
	          success: function (e) {
	            console.log('保存成功', e)
	            wx.showToast({
	              title: '已保存至相册',
	              icon: 'success'
	            })
	          },
	          fail: function (e) {
	            console.log('保存失败', e)
	          }
	        })
	      }
				
			}
		},
		onShareAppMessage: function (res) {
		  console.log(res)
		  let path = '/pages/index/main?';
		  let shareInfo = this.$store.getters.shareInfo
		  let that = this
		  let title = shareInfo.index.content
		  let imageUrl = shareInfo.index.path

		  return {
		    title: title,
		    path: path,
		    imageUrl: imageUrl,
		  }
		},

	}
</script>
<style lang="less" type="text/less" scoped>
	.poster {
		width: 100%;
		height: 100%;
		background: #FAFBFC;
		box-sizing: border-box;
		padding: 20rpx 0 100rpx;
		box-shadow:0px 17px 28px 0px rgba(52,62,59,0.03);
		overflow-y:auto;
		.wrap {
			width: 320px;
			height: 580px;
			margin: 0 auto;
			#myCanvas {
				width: 320px;
				height: 580px;
				&.hidden {
					width: 0;
					height: 0;
				}
			}
			.showImg {
				width: 320px;
				height: 580px;
			}
		}
		.save {
			width: 100%;
			height: 96rpx;
			text-align: center;
			line-height: 96rpx;
			background: #00D093;
			position: fixed;
			bottom: 0; 
			left: 0;
			color: #fff;
			display:flex;
			justify-content:center;
			align-items:center;
			.open {
				width: 100%;
				height: 96rpx;
				line-height: 96rpx;
			}
		}
		.icon {
			width: 33rpx;
			height: 28rpx;
			margin-right: 24rpx;
			vertical-align: -6rpx;
		}
}
</style>
