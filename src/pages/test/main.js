import Vue from 'vue';
import App from './test';

const app = new Vue(App);
app.$mount();


export default {
	config: {
	    navigationBarTitleText: '头像编辑',
	    enablePullDownRefresh: false,
	  },
}