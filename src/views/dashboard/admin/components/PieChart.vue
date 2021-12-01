<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    title: {
      type: String,
      default: ''
    },
    chartData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData() {
      if (Object.keys(this.chartData).length > 0) {
        this.$nextTick(() => {
          this.initChart()
        })
      }
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      const legend = []
      const list = []
      const arr = this.chartData.series
      for (let i = 0; i < arr.length; i++) {
        const { name, data } = arr[i]
        legend.push(name)
        list.push({
          name, value: data.reduce((prev, curr) => prev + curr)
        })
      }
      this.chart.setOption({
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          right: 10,
          data: legend
        },
        series: [
          {
            name: '访问设备占比',
            type: 'pie',
            roseType: 'radius',
            minAngle: 20,
            radius: [40, 95],
            center: ['50%', '50%'],
            data: list,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
      this.$nextTick(() => {
        this.$_resizeHandler()
      })
    }
  }
}
</script>
