import echarts from 'echarts';
import echartUpdateDom from './echart';

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
              let hasData = true;
              if (!echartInstance.setOption.didIntercept) {
                const updateDomByOption = (option) => echartUpdateDom(Vue, el, echartInstance, option, text);
                Object.defineProperty(echartInstance, 'setOption', {
                  value (option, notMerge, lazyUpdate) {
                    hasData = updateDomByOption(option);
                    setOption(option, notMerge, lazyUpdate);
                  },
                  configurable: true,
                  writable: true
                });
                const resize = echartInstance.resize.bind(echartInstance);
                Object.defineProperty(echartInstance, 'resize', {
                  value (opt) {
                    if (hasData) {
                      resize(opt);
                    }
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
