import echarts from 'echarts';
import echartUpdateDom from '@/directives/echart';
import nextTick from '@/utils/nextTick';

export default {
  install (Vue, opt) {
    const { text } = opt || {};
    // 监听数据指令，如果没有数据替换图表为其他页面
    Vue.directive('show-echart', {
      bind (el) {
          const observer = new MutationObserver(() => {
            const echartInstance = echarts.getInstanceByDom(el);
            if (echartInstance) {
              const setOption = echartInstance.setOption.bind(echartInstance);
              const updateDom = () => echartUpdateDom(el, echartInstance, text);
              Object.defineProperty(echartInstance, 'setOption', {
                value (option, notMerge, lazyUpdate) {
                  // 异步更新可以获取到最新的option
                  nextTick(updateDom);
                  setOption(option, notMerge, lazyUpdate);
                }
              });
            }
          });
          observer.observe(el, { attributes: true });
        }
    });
  }
};
