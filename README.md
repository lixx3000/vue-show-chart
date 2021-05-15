# vue-show-echart
在Vue中使用echart，如果没有数据，显示暂无数据或自定义组件，而不显示图表

本插件使用MutationObserver进行监听，考虑到兼容性可以npm install mutationobserver-shim -S进行垫片

> npm install -S vue-show-chart

> yarn add vue-show-chart

目前功能较少，主要是通过命令，控制echart图表显示的时机

使用方法，可以在入口main.js进行安装

```javascript
import VueShowChart from 'vue-show-chart'
Vue.use(VueShowChart, { text: '暂无数据' });
```
在echart挂载的那个dom上声明该命令即可

```javascript
<div ref="echart" v-show-chart></div>
```
