import Vue from 'vue';
import App from './cutInside';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: "图片裁剪",
  }
}
