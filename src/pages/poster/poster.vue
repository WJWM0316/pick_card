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
						'你达特阿萨德手动'
					]
				},
				imgUrl: "https://cdnstatic-test.card.ziwork.com/dev/avatar/2018-07-10/b50b839743036634896831030d3d3fb6.png"
			}
		},
		onShow () {
			this.create()
		},
		methods: {
			create () {
				const that = this
				wx.getImageInfo({
					src: that.imgUrl,
					success: function (res) {
						console.log(res)
						that.imgW = res.width
						that.imgH = res.height
						const ctx = wx.createCanvasContext('shareCanvas')

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

				    // that.label.forEach(res => {

				    // })
				    let position = {
				    	x: 17,
				    	y: 400
				    }
				    ctx.setStrokeStyle('#00D093')
						ctx.setLineWidth(1)
				    let r = 12
				    that.info.label.forEach(item => {
				    	addLabel(item)
				    })
				    function addLabel (item) {
				    	let metrics = ctx.measureText(item).width
							ctx.fillText(item, position.x + r, position.y + r + 4)
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

							position.x = position.x + 2*r + metrics + 5
				    }
				    

				    ctx.draw()
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
	background: #fff;
	top: 0;
	left: 0;
	box-sizing: border-box;
	overflow-y: auto;
	#wrap {
		width: 335px;
		height: 550px;
	}
	.label {
		padding: 10rpx 20rpx;
		border: 1px solid #000;
		border-radius: 50rpx;
	}
}
</style>