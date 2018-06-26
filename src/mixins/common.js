// 公用mixin

import wepy from 'wepy'

export default class commonMixin extends wepy.mixin {
  methods = {
    /**
     * input 双向数据绑定
     * @param {*} field 字段名以`.`号链接，代表子对象 eg: 'model.field'
     * @param {*} $event
     */
    bindKeyInput (field, $event) {
      const fields = field.split('.')
      let obj
      fields.forEach((item, index) => {
        if (index === (fields.length - 1)) {
          // 如果是最后一个，则直接赋值
          obj[item] = $event.detail.value
        } else if (index === 0) {
          // 如果是第一个，并且不是最后一个
          obj = this[item]
        } else {
          obj = obj[item]
        }
      })
    }
  }
}
