import { NormalText as NoData } from '../../components/no_data/index';
import { isArray } from '../../utils/types';
import nextTick from '../../utils/nextTick';

export default function updateDom (Vue, el, echartInstance, option, text) {
  let hasData = false;
  if (option.baseOption) {
    option = option.baseOption;
  }
  let series = option.series;
  series = isArray(series) ? series : [series];
  series.forEach(({ data }) => {
    if (data.length) hasData = true;
  });
  const noDataDom = el.getElementsByClassName('echart-no-data')[0];
  if (noDataDom) el.removeChild(noDataDom);
  if (!hasData) {
      // el.removeAttribute('_echarts_instance_');
      el.firstChild.style.display = 'none';
      const instance = new (Vue.extend(NoData))({
        propsData: {
          text
        }
      });
      el.appendChild(instance.$mount().$el);
  } else {
    el.firstChild.style.display = 'block';
    if (noDataDom) {
      nextTick(echartInstance.resize);
    }
  }
  return hasData;
};
