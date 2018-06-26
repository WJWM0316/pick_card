// 分页列表公用mixin
import wepy from 'wepy'

export default class ListMixin extends wepy.mixin {
  data = {
    // 分页信息
    pagination: {
      page: 1,
      pageSize: 20,
      total: 0,
      end: false,
      busy: false
    }
  }

  // 是否是最后一页
  isLastPage () {
    return this.pagination.page >= Math.ceil(this.pagination.total / this.pagination.pageSize)
  }
}
