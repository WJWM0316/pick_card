import Vue from 'vue';
import App from './experience';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '',
    enablePullDownRefresh: false,
  },
};
