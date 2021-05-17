import echarts from 'echarts';
import echartUpdateDom from './echart';
import nextTick from '../utils/nextTick';

export default {
  install (Vue, opt) {
    const { text } = opt || {};
    Vue.directive('show-echart', {
      bind (el) {
          const observer = new MutationObserver(() => {
            const echartInstance = echarts.getInstanceByDom(el);
            // const _echarts_instance_ = el.getAttribute('_echarts_instance_');
            if (echartInstance) {
              const setOption = echartInstance.setOption.bind(echartInstance);
              if (!echartInstance.setOption.didIntercept) {
                const updateDom = (option) => () => echartUpdateDom(Vue, el, option, text);
                Object.defineProperty(echartInstance, 'setOption', {
                  value (option, notMerge, lazyUpdate) {
                    // el.setAttribute('_echarts_instance_', _echarts_instance_);
                    nextTick(updateDom(option));
                    Promise.resolve().then(() => setOption(option, notMerge, lazyUpdate));
                  },
                  configurable: true,
                  writable: true
                });
                echartInstance.setOption.didIntercept = true;
              }
            }
          });
          observer.observe(el, { attributes: true });
        }
    });
  }
};
