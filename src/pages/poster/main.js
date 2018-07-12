import Vue from 'vue';
import App from './poster';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '您的名片',
    enablePullDownRefresh: false,
  },
};
