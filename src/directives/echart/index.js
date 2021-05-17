import { NormalText as NoData } from '../../components/no_data/index';
import { isArray } from '../../utils/types';

export default function updateDom (Vue, el, option, text) {
  let hasData = false;
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
  }
}
