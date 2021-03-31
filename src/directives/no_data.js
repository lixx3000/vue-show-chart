import echarts from 'echarts';
import echartUpdateDom from '@/directives/echart';

export default {
  install (Vue, opt) {
    const { text } = opt || {};
    // 监听数据指令，如果没有数据替换图表为其他页面
    Vue.directive('show-chart', {
      bind (el) {
        const echartInstance = echarts.getInstanceByDom(el);
        if (echartInstance) {
          const observer = new MutationObserver(() => echartUpdateDom(el, echartInstance, text));
          observer.observe(el, { attributes: true });
        }
      }
    });
  }
};
