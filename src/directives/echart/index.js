import Vue from 'vue';
import { NormalText as NoData } from '@/components/no_data/index';
import { isArray } from '@/utils/types';

export default function updateDom (el, echartInstance, text) {
  let hasData = false;
  let series = echartInstance.getOption().series;
  series = isArray(series) ? series : [series];
  series.forEach(({ data }) => {
    if (data.length) hasData = true;
  });
  if (!hasData) {
    // while (el.firstChild) el.removeChild(el.firstChild);
    el.innerHTML = null;
    el.removeAttribute('_echarts_instance_');
    const instance = new (Vue.extend(NoData))({
      propsData: {
        text
      }
    });
    el.appendChild(instance.$mount().$el);
  }
}