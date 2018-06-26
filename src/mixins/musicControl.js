import wepy from 'wepy'

export default class musicStore extends wepy.mixin {
	data = {}

  methods = {}
  
   int(){
   	console.log("我是在mixin里的。。。。。。。。。。。")
	  audio.onWaiting(()=>{
		console.log("音频数据不足。。。。。。。。。。。。。。。。。。。。。。。。。。。")
	  })
   }
}