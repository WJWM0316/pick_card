import Vue from 'vue';
import App from './cardHolder';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '名片夹',
    enablePullDownRefresh: true,
    backgroundTextStyle:"dark",//下拉背景字体、loading 图的样式，仅支持 dark/light，默认light不可见
    onReachBottomDistance: 50
  },
};
