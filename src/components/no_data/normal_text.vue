<!-- 空数据显示内容 -->
<template>
  <div class="echart-no-data">{{text}}</div>
</template>

<script>
export default {
  name: 'echartNoData',
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  }
};

</script>
<style lang='less' scoped>
.echart-no-data {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
