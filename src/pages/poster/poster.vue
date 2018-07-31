<template>
	<view class="poster" v-if="imgUrl">
<!-- 		<button open-type="share" data-type="myDetail" v-if="showImg && system === 'Android'" class="share"><view class="header">因小程序限制，如图片出错，可点击发名片给好友<image class="icon1" src="/static/images/deta_icon_chevron@3x.png"></image></view></button>
 -->		
 		<image class="showImg" :src="showImg" v-if="showImg"></image>
		<canvas canvas-id="endCanvas" id="endCanvas" v-if="!twoStep">
		</canvas>

		<view class="wrap" v-if="oneStep">
			<canvas canvas-id="shareCanvas" id="myCanvas" v-if="oneStep" width="320" height="580">
			</canvas>
		</view>
		<view style="height: 100rpx"></view>
		<button class="save" open-type="openSetting" v-if="openSet && showImg"><image class="icon" src="/static/images/share_btn_savepic@3x.png"></image>保存图片</button>
		<button @tap.stop="save" class="save" v-if="!openSet && showImg"><image class="icon" src="/static/images/share_btn_savepic@3x.png"></image>保存图片</button>
	</view>
</template>
<script>
	import {getShareCode} from '@/api/pages/cardcase'
	import {getShareImg} from '@/api/pages/login'
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
				oneStep: true,
				twoStep: true,
				info: {
					id: '',
					vkey: '',
					nickname: '',
					job: '',
					sign: '',
					label: [],
					avatar_info: [],
					occupation: '',
					other_info: '',
					company: '',
				},
				imgUrl: '',
				isShareImg: '',
				// system: ''
			}
		},
		onShow (option) {
			this.imgUrl = ''
			this.showImg = ''
			this.oneStep = true
			this.twoStep = true
			let that = this
			wx.getSetting({
        success(res) {
          if (res.authSetting['scope.writePhotosAlbum']) {
          	that.openSet = false
        	}
        }
      })
			// if (that.openSet) { return }
			let userInfo = this.$store.getters.userInfo
			this.info = userInfo
			this.info.nickname = userInfo.nickname.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "")
			this.info.job = userInfo.occupation.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "") + ' | ' + userInfo.company.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "")
			this.info.sign = userInfo.sign.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "")
			this.info.label = userInfo.other_info.label_info
			this.imgUrl = userInfo.avatar_info.bigImgUrl
			
			wx.showLoading({
        title: '正在生成图片',
        mask: true
      })

			wx.getSystemInfo({
				success: function(res) {
					console.log(res, '设备信息')
					that.width = res.windowWidth
			    that.height = res.windowHeight
			    //that.system = res.system
			    that.pixelRatio = res.pixelRatio
				}
			})

			// if (that.system.indexOf('Android') !== -1) {
			// 	that.system = 'Android'
			// }
			
			let params = {
      	uid: this.info.id,
      	name: this.info.nickname,
      	img: this.info.avatar_info.bigImgUrl,
      	occupation: this.info.occupation,
      	company: this.info.company,
      	label: [],
      }
      this.info.other_info.realm_info.forEach(item => {
      	params.label.push(`${item.name} | `)
      })
      params.label = params.label.join('')
      params.label = params.label.slice(0, params.label.length-3)
      getShareImg(params).then(res => {
      	this.isShareImg = res.data
      })

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
		onShareAppMessage: function (res) {
			let path = '/pages/index/main?';
			let shareInfo = this.$store.getters.shareInfo
			let that = this
			let title = shareInfo.index.content
			let imageUrl = shareInfo.index.path

    	if (res.from === 'button') {
			//footer 弹框分享
				if (res.target.dataset.type=='myDetail') {
	      	// 来自页面内转发按钮
		      title = shareInfo.mycard.content,
		      path= `pages/detail/main?vkey=${that.info.vkey}&shareUid=${that.info.id}&shareType=${shareInfo.mycard.type}`,
		      imageUrl= that.isShareImg
	    	}		
    	}
    	return {
    	  title: title,
    	  path: path,
    	  imageUrl: imageUrl,
    	}
 	 	},
		methods: {
			create (path, that) {
				wx.downloadFile({
				  url: that.imgUrl,
				  success: function(res) {
				    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
				    if (res.statusCode === 200) {
							const ctx = wx.createCanvasContext('shareCanvas')
							ctx.width = 320
							
							that.showImg = ''

							ctx.setFillStyle('#fff')
							ctx.fillRect(0, 0, 320, 580)

							that.imgUrl = res.tempFilePath

							// 画头像
					    ctx.drawImage(that.imgUrl, 0, 0, 320, 320)
					    const grd = ctx.createLinearGradient(0, 200, 0, 320)
					    grd.addColorStop(0, 'rgba(255, 255, 255, 0)')
							grd.addColorStop(1, 'rgba(0,0,0, 0.4)')
							ctx.setFillStyle(grd)
					    ctx.fillRect(0, 200, 320, 120)
					    


					    // 计算文字打点
					    function pointOut (string, num) {
					    	let result = string.length
					    	let length = 0
						    for (var i=0; i<string.length-1; i++) {
						    	// 检查双字节
						    	if (string[i].match(/[^\x00-\xff]/)) {
						    		length += 2
						    	} else {
						    		length += 1
						    	}
						    	if (length > num) { // 判断是否超过 是否需要打点
							    	result =  i
							    	return result
							    }
						    }
						    return result
					    }

					    // 画文案
					    ctx.setTextAlign('left')
					    ctx.setFillStyle('#ffffff')
					    ctx.setFontSize(24)
					    let lineNum1 = pointOut(that.info.nickname, 30)
					    if (lineNum1 !== that.info.nickname.length) {
					    	that.info.nickname = that.info.nickname.slice(0, lineNum1) + '...'
					    }
					    ctx.fillText(that.info.nickname, 17, 280)

					    ctx.setFontSize(16)
					    ctx.setFillStyle('#ffffff')
					    let lineNum2 = pointOut(that.info.job, 30)
					    if (lineNum2 !== that.info.job.length) {
					    	that.info.job = that.info.job.slice(0, lineNum2) + '...'
					    }
					    ctx.fillText(that.info.job, 17, 300)
					    let staticY = 349

					    // 画签名
					    ctx.setFontSize(14)
					    ctx.setFillStyle('#9AA1AB')
					    let lineNum3 = pointOut(that.info.sign, 40)
					    if (lineNum3 < that.info.sign.length) {
					    	ctx.fillText(that.info.sign.slice(0, lineNum3), 17, staticY)
					    	staticY = staticY + 20
					    	ctx.fillText(that.info.sign.slice(lineNum3 + 1, that.info.sign.length-1), 17, staticY)
					    } else {
					    	ctx.fillText(that.info.sign.slice(0, lineNum3), 17, staticY)
					    }

					    let r = 12
					    let lineNun = 1
					    let nextLabel = true
					    let position = {}

					    staticY = staticY + 16
					    position = {
					    	x: 17,
					    	y: staticY
					    }
					    that.info.label.forEach((item, index) => {
					    	addLabel(item.name.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, ""), index)

					    })

					    // 画标签
					    let last = false
					    function addLabel (item, index) {
					    	ctx.setFontSize(12)
					    	ctx.setFillStyle('#00D093')
					    	ctx.setStrokeStyle('#00D093')
					    	ctx.setLineWidth(1)
					    	ctx.setLineDash([1000])
					    	if (lineNun > 2 || last) {
					    		return
					    	}
					    	// 下个标签的宽度
					    	let newLabelWidth = 0
					    	if (index < that.info.label.length-1) {
					    		newLabelWidth = ctx.measureText(that.info.label[index+1].name.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "")).width + 2*r
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
								if (newLabelWidth> (320-17-position.x) && lineNun !== 2) {
									position.x = 17
									staticY = staticY + 2*r + 7
									position.y = position.y + 2*r + 7
									lineNun ++
								}
								// ctx.draw(true)
					    }			    

					    // 画虚线
					    ctx.beginPath()
					    ctx.setStrokeStyle('#DCE3EE')
					    ctx.setLineDash([4, 6], 0)
							staticY = staticY + 48
							ctx.moveTo(17, staticY)
							ctx.lineTo(303, staticY)
							ctx.stroke()
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
					    	setTimeout(function (){
						    	wx.canvasToTempFilePath({
									  x: 0,
									  y: 0,
									  width: 320,
									  height: staticY + 60,
									  canvasId: 'shareCanvas',
									  success: function(res) {
									  	that.oneStep = false
									  	that.twoStep = false
									  	
									  	// 定义一个新画布
									  	const new_ctx = wx.createCanvasContext('endCanvas')
									  	new_ctx.width = that.width
									  	new_ctx.height = that.height

									  	// 设置画布宽高
									  	new_ctx.setFillStyle('#F2FCF9')
											new_ctx.fillRect(0, 0, that.width, that.height)
											// 画布圆角
											// 
											wx.getImageInfo({
												src: res.tempFilePath,
												success: function(e) {
													try {
													let img = {
														width: that.width*0.85,
														height: that.width*0.85/(e.width/e.height)
													}
													let new_pos = {
														x: (that.width - img.width) / 2,
														y: (that.height - img.height) / 2,
													}
													function roundRect (x, y, w, h, r) {
														new_ctx.beginPath();
														new_ctx.arc(x + r, y + r, r, Math.PI, Math.PI *  1.5)
														new_ctx.moveTo(x + r, y)
														new_ctx.lineTo(x + w - r, y)
														new_ctx.lineTo(x + w, y + r)
														new_ctx.arc(x + w - r, y + r, r, Math.PI *  1.5  , Math.PI *  2  )
														new_ctx.lineTo(x + w, y + h - r)
														new_ctx.lineTo(x + w - r, y + h)
														new_ctx.arc(x + w - r, y + h - r, r,  0  , Math.PI *  0.5  )
														new_ctx.lineTo(x + r, y + h)
														new_ctx.lineTo(x, y + h - r)
														new_ctx.arc(x + r, y + h - r, r, Math.PI *  0.5  , Math.PI)
														new_ctx.lineTo(x, y + r)
														new_ctx.lineTo(x + r, y)
														new_ctx.setFillStyle('#ffffff')
														new_ctx.fill()
														new_ctx.closePath()
														new_ctx.clip()
														new_ctx.drawImage(res.tempFilePath, x, y, w, h)
													}
													roundRect (new_pos.x, new_pos.y, img.width, img.height, 9)
													//new_ctx.save()
													new_ctx.beginPath()
													new_ctx.arc(new_pos.x, new_pos.y + img.height*0.78, 10, 0, 2 * Math.PI)
													new_ctx.arc(new_pos.x + img.width, new_pos.y + img.height*0.78, 10, 0, 2 * Math.PI)
													new_ctx.setFillStyle('#F2FCF9')
													new_ctx.fill()
													new_ctx.draw(true, () => {
											    	setTimeout(function (){
											    		wx.hideLoading()
												    	wx.canvasToTempFilePath({
															  x: 0,
															  y: 0,
															  width: that.width,
															  height: that.height,
															  canvasId: 'endCanvas',
															  success: function(res) {
															  	console.log('最终画图成功')
															  	that.twoStep = true
															  	that.showImg = res.tempFilePath
															  } 
															})
											    	}, 200)
											    })
											    }
											    catch (err) {
											    	console.log(err, '异常')
											    }
												}
											})
						  			}
						  		})
					  		}, 200)
					  	})
					  }
					},
					fail: function(e) {
						wx.showToast({
              title: '图片加载失败，请刷新页面',
              icon: 'none',
              mask: true
            })
					}
				})
			},
			save () {
				let that = this
				wx.getSetting({
	        success(res) {
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
	}
</script>
<style lang="less" type="text/less" scoped>
.poster {
		width: 100%;
		height: 100%;
		background: #FAFBFC;
		box-sizing: border-box;
		box-shadow:0px 17px 28px 0px rgba(52,62,59,0.03);
		overflow-y:auto;
		.header {
			width: 100%;
			padding: 0 40rpx;
			color: #7a7d83;
			font-size: 28rpx;
			box-sizing:border-box;
			background:rgba(255,252,240,1);
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
			justify-content: space-between;
    	align-items: center;
			.to {
				color:#FFA200;
			}
			.icon1 {
				width: 14rpx;
				height: 24rpx;
				float: right;
				margin: 0 !important;
			}
		}
		.showImg, #endCanvas {
			width: 100%;
			height: 100%;
		}
		#endCanvas {
			opacity: 0;
		}
		.wrap {
			width: 320px;
			height: 580px;
			margin: 0 auto;
			#myCanvas {
				width: 320px;
				height: 580px;
				opacity: 0;
				&.hidden {
					width: 0;
					height: 0;
				}
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
			width: 44rpx;
			height: 38rpx;
			margin-right: 24rpx;
			vertical-align: -6rpx;
		}
}
</style>
