import Vue from 'vue';
import App from './cardHolder';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '名片夹',
    enablePullDownRefresh: true,
  },
};
