import Vue from 'vue';
import App from './haoPlay';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '教你如何玩转趣名片',
    enablePullDownRefresh: false
  },
};
