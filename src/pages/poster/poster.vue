<template>
	<view class="poster">
		<canvas canvas-id="shareCanvas" id="wrap">
		</canvas>
		<image src="https://cdnstatic-test.card.ziwork.com/dev/avatar/2018-07-10/b50b839743036634896831030d3d3fb6.png" style="width:0;height: 0"></image>
		<button @tap.stop="save">按我</button>
		<image :src="showImg"></image>
	</view>
</template>
<script>
	export default {
		data () {
			return {
				imgH: 0,
				imgW: 0,
				showImg: '',
				info: {
					nickname: '你大爷',
					job: '你大爷大叔大婶阿萨德',
					sign: '这个人很懒，不想写个性签名~这个人很懒， 不想写个性签名~',
					label: [
						'你达特',
						'你达特阿萨德',
						'你达特阿萨德手动',
						'你达特阿萨德手动',
						'你达特',
						'你达特阿萨德',
						'你达特阿萨德手动'
					]
				},
				imgUrl: 'https://cdnstatic-test.card.ziwork.com/dev/avatar/2018-07-10/b50b839743036634896831030d3d3fb6.png'
			}
		},
		onShow () {
			this.create()
		},
		methods: {
			create () {
				const that = this
				wx.downloadFile({
				  url: that.imgUrl,
				  success: function(res) {
				    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
				    if (res.statusCode === 200) {
				    	console.log(res, '下载成功')
							const ctx = wx.createCanvasContext('shareCanvas')
							roundRect (0,0,335,550,9)

							function roundRect (x, y, w, h, r) {
								ctx.beginPath();
								ctx.arc(x + r, y + r, r, Math.PI, Math.PI *  1.5  )
								ctx.moveTo(x + r, y)
								ctx.lineTo(x + w - r, y)
								ctx.lineTo(x + w, y + r)
								ctx.arc(x + w - r, y + r, r, Math.PI *  1.5  , Math.PI *  2  )
								ctx.lineTo(x + w, y + h - r)
								ctx.lineTo(x + w - r, y + h)
								ctx.arc(x + w - r, y + h - r, r,  0  , Math.PI *  0.5  )
								ctx.lineTo(x + r, y + h)
								ctx.lineTo(x, y + h - r)
								ctx.arc(x + r, y + h - r, r, Math.PI *  0.5  , Math.PI)
								ctx.lineTo(x, y + r)
								ctx.lineTo(x + r, y)
								ctx.setFillStyle('#ffffff')
								ctx.fill()
								ctx.closePath()
								ctx.clip()
							}
							that.imgUrl = res.tempFilePath
							// 画头像
					    ctx.drawImage(that.imgUrl, 0, 0, 335, 335)

					    // 画文案
					    ctx.setTextAlign('left')
					    ctx.setFillStyle('#ffffff')
					    ctx.setFontSize(24)
					    ctx.fillText(that.info.nickname, 17, 290)

					    ctx.setFontSize(16)
					    ctx.fillText(that.info.job, 17, 315)

					    ctx.setFontSize(14)
					    ctx.setFillStyle('#9AA1AB')
					    if (that.info.sign.length > 20) {
					    	ctx.fillText(that.info.sign.slice(0, 19), 17, 360)
					    	ctx.fillText(that.info.sign.slice(20, that.info.sign.length-1), 17, 380)
					    } else {
					    	ctx.fillText(that.info.sign.slice(0, 19), 17, 360)
					    }
					    
					    ctx.setFontSize(12)
					    ctx.setFillStyle('#00D093')
					    let position = {
					    	x: 17,
					    	y: 400
					    }
					    ctx.setStrokeStyle('#00D093')
							ctx.setLineWidth(1)
					    let r = 12
					    let lineNun = 1
					    let nextLabel = true
					    that.info.label.forEach((item, index) => {
					    	addLabel(item, index)
					    })


					    // 画标签
					    function addLabel (item, index) {
					    	if (!nextLabel) {
					    		return
					    	}
					    	// 下个标签的宽度
								let newLabelWidth = ctx.measureText(that.info.label[index+1]).width + 2*r
								let metrics = 0 // 文本宽度
					    	// 判断是否超过两行切需要打点
					    	if (lineNun === 2 && newLabelWidth + position.x > (335-17)) {
					    		metrics = ctx.measureText('....').width
									ctx.fillText('....', position.x + r, position.y + r)
									nextLabel = false
					    	} else {
					    		metrics = ctx.measureText(item).width
									ctx.fillText(item, position.x + r, position.y + r + 4)
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
								if (newLabelWidth + position.x > (335-17)) {
									position.x = 17
									position.y = position.y + 2*r + 7
									lineNun ++
								}
					    }
					    
					    // 画虚线
					    ctx.setStrokeStyle('#DCE3EE')
					    ctx.setLineDash([5, 10], 0)
							ctx.beginPath()
							ctx.moveTo(17 ,position.y + 22)
							ctx.lineTo(316, position.y + 22)
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
							clearArc(0, position.y + 10, 10)
							ctx.save() 
							stepClear = 1
							clearArc(335, position.y + 10, 10)
					    ctx.draw()
					  }
					}
				})
				
			},
			save () {
				const that = this
				wx.canvasToTempFilePath({
				  x: 0,
				  y: 0,

				  canvasId: 'shareCanvas',
				  success: function(res) {
				  	that.showImg = res.tempFilePath
				    console.log(res.tempFilePath)
				  } 
				})
			}
		},

	}
</script>
<style lang="less" type="text/less" scoped>
	.poster {
		position: fixed;
		width: 100%;
		height: 100%;
		background: #FAFBFC;
		top: 0;
		left: 0;
		box-sizing: border-box;
		overflow-y: auto;
		padding: 20rpx 0;
		box-shadow:0px 17px 28px 0px rgba(52,62,59,0.03);
	#wrap {
		width: 335px;
		height: 550px;
		margin: 0 auto;
	}
	.label {
		padding: 10rpx 20rpx;
		border: 1px solid #000;
		border-radius: 50rpx;
	}
}
</style>
