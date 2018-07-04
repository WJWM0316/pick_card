<template>
  <view class="upload">
    <cut-img></cut-img>
  </view>
</template>
<script>
  import cutImg from '@/components/cutImg'
  export default {
    components: {
      cutImg
    }
  }

</script>
<style lang="less" type="text/less" scoped>
.upload {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  overflow: hidden;
}
</style>