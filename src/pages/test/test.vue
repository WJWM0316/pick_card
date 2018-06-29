<template>
  <view class="upload">
    <cut-img :isShow="isShow"
             :filePath="filePath"
    ></cut-img>
  </view>
</template>
<script>
  import cutImg from '@/components/cutImg'
  export default {
    components: {
      cutImg
    },
    data () {
      return {
        isShow: true,
        filePath: 'https://cdnstatic-test.card.ziwork.com/dev/avatar/2018-06-29/8ff089c17e93cc97ae1b2b64a1bfe53e.png?x-oss-process=image/resize,p_50'
      }
    }
  }

</script>
<style lang="less" type="text/less" scoped>

</style>