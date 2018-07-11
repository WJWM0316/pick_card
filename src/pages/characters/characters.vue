<template>
	<view class="characters" v-if="list.length>0">
		<view class='occupation' v-if="pageIndex === 0">
			<view class="title">
				<view class="titlecon">
					已选择标签
					<text class="num">{{pageOneNum}}</text>
					<text>/5</text>
				</view>
				<view class="label-con">
					<labelBox class="labelBox check">
						<label  v-for="(item, index) in selectList" :key="item.id || index" v-if="item.first_level !== 2">
							<text class="label check" @tap="remove(item, index)">{{item.name}}</text>
						</label>
					</labelBox>
				</view>
			</view>
			<view class="label-box">
				<view class="label-title">
					职业技能
					<view class="select">
						<picker mode='selector' v-if="careerList.length > 0" :range="careerList" @change="careerChange" :value="career">
							<text class="picker">
					     {{careerList[career]}}
					    </text>
					    <image class="icon" src="/static/images/edit_icon_label_select@3x.png"></image>
						</picker>

					</view>
				</view>
				<view class="label-con">
					<view class="labelBox">
						<label  v-for="(item, index) in jobList" :key="item.id">
							<text class="label" :class="{'check' : item.check}" @tap="select(jobList, index, list[2].id, list[2].son[career].id, item.id)">{{item.name}}</text>
						</label>
					</view>
				</view>
			</view>
			<view class="label-box">
				<view class="label-title">
					职业素养
				</view>
				<view class="label-con">
					<labelBox class="labelBox">
						<label  v-for="(item, index) in quality" :key="item.id">
							<text class="label" :class="{'check' : item.check}" @tap="select(quality, index, list[3].id, list[3].id, item.id)">{{item.name}}</text>
						</label>
					</labelBox>
				</view>
			</view>
			<view class="other">
				<view class="other-title">找不到想要的标签？</view>
				<button class="addLabel" @tap="addLabel(list[2].id)"><text class="add">+</text>添加自定义职业标签</button>
			</view>
		</view>
		<view class='occupation' v-if="pageIndex === 1">
			<view class="title">
				<view class="titlecon">
					已选择标签
					<text class="num">{{pageTwoNum}}</text>
					<text>/5</text>
				</view>
				<view class="label-con">
					<labelBox class="labelBox">
						<label  v-for="(item, index) in selectList" :key="item.id || index" v-if="item.first_level === 2">
							<text class="label check" @tap="remove(item, index)">{{item.name}}</text>
						</label>
					</labelBox>
				</view>
			</view>
			<view class="label-box">
				<view class="label-title">
					性格
				</view>
				<view class="label-con">
					<view class="labelBox">
						<label  v-for="(item, index) in character" :key="item.id">
							<text class="label" :class="{'check' : item.check}" @tap="select(character, index, list[1].id, list[1].son[0].id, item.id)">{{item.name}}</text>
						</label>
					</view>
				</view>
			</view>
			<view class="label-box">
				<view class="label-title">
					兴趣
				</view>
				<view class="label-con">
					<labelBox class="labelBox">
						<label  v-for="(item, index) in likeList" :key="item.id">
							<text class="label" :class="{'check' : item.check}" @tap="select(likeList, index, list[1].id, list[1].son[1].id, item.id)">{{item.name}}</text>
						</label>
					</labelBox>
				</view>
			</view>
			<view class="other">
				<view class="other-title">找不到想要的标签？</view>
				<button class="addLabel" @tap="addLabel(list[1].id)"><text class="add">+</text>添加自定义职业标签</button>
			</view>
		</view>
		<view class="btn">
			<button class="next" @tap="next" v-show="pageIndex === 0">下一步</button>
			<button class="next" @tap="save" v-show="pageIndex === 1">保存</button>
		</view>
		<label-pop 
			:isShow="showLablePop"
			:type="'custom'"
			@close="close"
			@addLable="getCustom"
		></label-pop>
	</view>
</template>
<script>
	import labelPop from '@/components/labelPop'
	import {postGetLabelByIds, checkLable, saveLable, postUserLabel} from '@/api/pages/login'
	export default {
		components: {
			labelPop
	  },
		data () {
			return {
				list: [],
				careerList: [],
				selectList: [],
				jobList: [],
				quality: [],
				character: [],
				likeList: [],
				skill: [],
				showLablePop: false,
				career: 0,
				pageIndex: 0,
				pageOneNum: 0,
				pageTwoNum: 0,
				curId: ''
			}
		},
		onLoad (option) {
			this.vkey = option.vkey
		},
		onShow () {
			this.pageIndex = 0
			this.pageOneNum = 0
			this.pageTwoNum = 0
			this.selectList = []
			this.jobList = []
			this.getList()
		},
		watch: {
		},
		methods: {
			next () {
				if (this.pageOneNum === 0) {
					wx.showToast({
					  title: '请至少选择一个标签',
					  icon: 'none',
					  duration: 2000
					})
					return
				}
				this.pageIndex = 1
				wx.pageScrollTo({
				  scrollTop: 0,
				  duration: 0
				})
			},
			save () {
				if (this.pageTwoNum === 0) {
					wx.showToast({
					  title: '请至少选择一个标签',
					  icon: 'none',
					  duration: 2000
					})
					return
				}
				const data = {
					uid: this.$store.getters.userInfo.id,
					idArr: this.selectList
				}
				saveLable(data).then(res => {
					wx.showToast({
					  title: '保存成功',
					  icon: 'success',
					  duration: 1000
					})
					wx.navigateBack({
					  delta: 1
					})
				}).catch(e => {
					wx.showToast({
					  title: e.msg,
					  icon: 'none',
					  duration: 2000
					})
				})
			},
			careerChange (e) {
				console.log('picker发送选择改变，携带值为', e.mp.detail.value)
				this.career = e.mp.detail.value
				this.jobList = this.list[2].son[this.career].son
				console.log('已经选择的标签', this.selectList)
			},
			getList () {
				const data = {
					labelType: '1,2,3,4'
				}
				postGetLabelByIds(data).then(res => {
					this.list = res.data
					this.careerList = this.list[2].son
					let array = []
					this.careerList.forEach((item,index) => {
						array.push(item.name)
						if (this.$store.getters.userInfo !== {} && item.id === this.$store.getters.userInfo.other_info.occupation_info.id) {
							this.career = index
						}
					})
					this.careerList = array
					this.jobList = this.list[2].son[this.career].son
					this.quality = this.list[3].son
					this.character = this.list[1].son[0].son
					this.likeList = this.list[1].son[1].son

					const mydata = {
						uid: this.$store.getters.userInfo.id || 3,
						ids: '3,4,2'
					}
					postUserLabel(mydata).then(res => {
						this.selectList = res.data
						for (var i = 0; i < this.selectList.length; i++) {
							if (this.selectList[i].first_level === 3) {
								for (var j = 0; j<this.list[2].son.length; j++) {
									if (this.list[2].son[j].id === this.selectList[i].two_level) {
										this.list[2].son[j].son[this.selectList[i].index].check = true
										this.pageOneNum += 1
									}
								}
								// 自定义标签
								if (this.selectList[i].index === 998) {
									console.log(111, this.selectList[i].index, 111111)
									this.pageOneNum += 1
								}
							} 
							else if (this.selectList[i].first_level === 4) {
								this.list[3].son[this.selectList[i].index].check = true
								this.pageOneNum += 1
							} 
							else if (this.selectList[i].first_level === 2) {
								for (var j = 0; j<this.list[1].son.length; j++) {
									if (this.list[1].son[j].id === this.selectList[i].two_level) {
										this.list[1].son[j].son[this.selectList[i].index].check = true
										this.pageTwoNum += 1
									}
								}
								// 自定义标签
								if (this.selectList[i].index === 998) {
									this.pageTwoNum += 1
								}
							}
						}
					})
				})
			},
			getCustom (e) {
				let testing = false
				this.selectList.forEach(item => {
					if (item.name === e) {
						wx.showToast({
						  title: '该自定义标签已存在，请重新编辑',
						  icon: 'none',
						  duration: 2000
						})
						testing = true
					}
				})
				if (!testing) {
					checkLable({name: e}).then(res => {
						wx.showToast({
						  title: res.msg,
						  icon: 'success',
						  duration: 1000
						})
						const data = {
							id: '',
							name: e,
							first_level: this.curId,
							two_level: this.curId,
							index: 998
						}
						if (this.pageIndex === 0) {
							if (this.pageOneNum < 5) {
								this.pageOneNum ++
							} else {
								this.selectList.splice(0, 1)
							}
							this.selectList.splice(this.pageOneNum-1, 0, data)
						} else if (this.pageIndex === 1) {
							if (this.pageTwoNum < 5) {
								this.pageTwoNum ++
							} else {
								this.selectList.splice(this.pageOneNum, 1)
							}
							this.selectList.push(data)
						}
						console.log(this.selectList)
					}).catch(e => {
						wx.showToast({
						  title: e.msg,
						  icon: 'none',
						  duration: 2000
						})
					})
				}
			},
			close () {
				this.showLablePop = false
			},
			remove (item, index) {
				if (item.id === '') {
					this.selectList.splice(index, 1)
					switch (item.first_level) {
						case 2:
							this.pageTwoNum --
							break
						case 3:
							this.pageOneNum --
							break
						case 4:
							this.pageOneNum --
							break
					}
				} else {
					switch (item.first_level) {
						case 2:
								this.list[1].son.forEach(e => {
									if (e.id=== item.two_level) {
										e.son[item.index].check = false
									}
								})
								this.pageTwoNum --
								break
						case 3:
							this.list[2].son.forEach(e => {
								if (e.id=== item.two_level) {
									e.son[item.index].check = false
								}
							})
							this.pageOneNum --
							break
						case 4:
							this.list[3].son[item.index].check = false
							this.pageOneNum --
							break
					}
					this.selectList.splice(index, 1)
				}
			},
			addLabel (e) {
				this.curId = e
				this.showLablePop = true
			},
			select (list, index, firstId, secondId, id) {
				console.log(list[index], 11111)
				if (list[index].check) {
					if (firstId !== 2) {
						this.pageOneNum --
					} else {
						this.pageTwoNum --
					}
					list[index].check = false
					console.log(list[index], 333)
					const item = list[index]
					list.splice(index, 1, item)
					this.selectList.forEach((e, removeIndex) => {
						if (id === e.id) {
							this.selectList.splice(removeIndex, 1)
						}
					})
				} else {
					if (firstId !== 2) {
						this.pageOneNum ++
					} else {
						this.pageTwoNum ++
					}
					list[index].check = true
					const item = list[index]
					list.splice(index, 1, item)
					const data = {
						id: list[index].id,
						name: list[index].name,
						first_level: firstId,
						two_level: secondId,
						index: index
					}
					
					console.log(firstId, this.pageOneNum, this.selectList)
					// 超过五个删除
					if (firstId !== 2) {
						if (this.pageOneNum > 5) {
							// 不是自定义标签
							if (this.selectList[0].index !== 998) {
								console.log(1111, this.selectList, this.selectList[0])
								switch (this.selectList[0].first_level) {
									case 3:
										this.list[2].son.forEach((e,index) => {
											if (e.id === this.selectList[0].two_level) {
												console.log(e, 2222222222)
												e.son[this.selectList[0].index].check = false
												this.list.splice(2, 1, this.list[2])
											}
										})
										break
									case 4:
										this.quality[this.selectList[0].index].check = false
										break
								}
							}
							this.pageOneNum -= 1
							this.selectList.splice(0, 1)
						}
						console.log(this.pageOneNum,this.selectList, 111111111)
						this.selectList.splice(this.pageOneNum-1, 0, data)
					} else {
						if (this.pageTwoNum > 5) {
							// 不是自定义标签
							if (this.selectList[this.pageOneNum].index !== 998) {
								console.log(1111, this.selectList, this.selectList[this.pageOneNum])
								switch (this.selectList[this.pageOneNum].two_level) {
									case 35:
										this.character[this.selectList[this.pageOneNum].index].check = false
										break
									case 36:
										this.likeList[this.selectList[this.pageOneNum].index].check = false
										break
								}
							}
							this.pageTwoNum -= 1
							this.selectList.splice(this.pageOneNum, 1)
						}
						this.selectList.push(data)
					}
				}
				console.log('选择的标签,', this.selectList)
			}
		}
			
	}
</script>
<style lang="less" type="text/less" scoped>
	.characters {
		padding: 0 40rpx 158rpx;
		.title {
			margin-bottom: 30rpx;
			border-bottom:1rpx solid rgba(53,57,67,0.1);
			.titlecon {
				font-size:30rpx;
				color:#353943;
				line-height:42rpx;
				height: 42rpx;
				padding: 30rpx 0 8rpx 0;
				text {
					font-size: 28rpx;
					color: #B2B6C2;
					&.num {
						color: #FFBC47;
					}
				}
			}
			.label-con {
				padding-bottom: 40rpx;
				.labelBox {
					overflow: hidden;
					.label {	
						font-size: 28rpx;
						line-height: 54rpx;
						color: #DCE3EE;
						border-radius:35px;
						padding: 0 30rpx;
						border: 1rpx solid rgba(178,182,194,0.4);
						display:inline-block;
						box-sizing: border-box;
						margin-right: 20rpx;
						margin-top: 20rpx;
						&.check {
							border-color: rgba(0,208,147,1);
							color: #00D093;
						}
					}
				}
			}
		}
		.label-box {
			margin-top: 40rpx;
			.label-title {
				font-size:30rpx;
				color:#353943;
				line-height:54rpx;
				.select {
					font-size: 28rpx;
					line-height: 54rpx;
					color: #353943;
					border-radius:35px;
					padding: 0 30rpx;
					border: 1rpx solid rgba(178,182,194,0.4);
					margin-left: 48rpx;
					display:inline-block;
					box-sizing: border-box;
					.icon {
						width: 18rpx;
						height: 12rpx;
						vertical-align:middle;
					}
				}
			}
			.label-con {
				padding: 40rpx 0 20rpx;
				border-bottom:1rpx solid rgba(220,227,238,1);
				.labelBox {
					overflow: hidden;
					.label {	
						font-size: 28rpx;
						line-height: 54rpx;
						color: #DCE3EE;
						border-radius:35px;
						padding: 0 30rpx;
						border: 1rpx solid rgba(178,182,194,0.4);
						display:inline-block;
						box-sizing: border-box;
						margin-right: 20rpx;
						margin-bottom: 20rpx;
						&.check {
							border-color: rgba(0,208,147,1);
							background: rgba(0,208,147,0.1);
							color: #00D093;
						}
					}
				}
			}
		}
		.other {
			margin-top: 176rpx;
			margin-bottom: 80rpx;
			.other-title {
				text-align: center;
				font-size:28rpx;
				color:#353943;
				line-height:28rpx;
			}
			.addLabel {
				margin: 26rpx auto 0;
				width:338rpx;
				height:68rpx;
				font-size: 28rpx;
				line-height: 68rpx;
				border-radius:34rpx;
				border:1rpx solid rgba(0,208,147,1);
				color: #00D093;
			}
		}
		.btn {
			background: #fff;
			margin-top: 80rpx;
			padding: 30rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			.next {
				height:98rpx;
				background:#00D093;
				line-height: 98rpx;
				border-radius:49rpx;
				font-size: 32rpx;
				color: #fff;
			}
		}
	}
</style>