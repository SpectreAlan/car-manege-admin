<template>
  <div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart
            v-show="ordersMoney.legend && ordersMoney.legend.length"
            :chart-data="ordersMoney"
            title="订单金额统计"
          />
          <empty v-show="!ordersMoney.legend || !ordersMoney.legend.length" title="订单金额统计" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart
            v-show="ordersCount.legend && ordersCount.legend.length"
            :chart-data="ordersCount"
            title="车辆订单量分析"
          />
          <empty v-show="!ordersCount.legend || !ordersCount.legend.length" title="车辆订单量分析" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart
            v-show="spendingCarsMoney.legend && spendingCarsMoney.legend.length"
            :chart-data="spendingCarsMoney"
            title="车队支出统计"
          />
          <empty v-show="!spendingCarsMoney.legend || !spendingCarsMoney.legend.length" title="车队支出统计" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart
            v-show="spendingTypesMoney.legend && spendingTypesMoney.legend.length"
            :chart-data="spendingTypesMoney"
            title="支出类型分析"
          />
          <empty v-show="!spendingTypesMoney.legend || !spendingTypesMoney.legend.length" title="支出类型分析" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart
            v-show="salaryMoney.legend && salaryMoney.legend.length"
            :chart-data="salaryMoney"
            title="驾驶员工资统计"
          />
          <empty v-show="!salaryMoney.legend || !salaryMoney.legend.length" title="驾驶员工资统计" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart
            v-show="spendingTypesMoney.legend && spendingTypesMoney.legend.length"
            :chart-data="spendingTypesMoney"
            title="支出占比分析"
          />
          <empty v-show="!spendingTypesMoney.legend || !spendingTypesMoney.legend.length" title="支出占比分析" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './LineChart'
import BarChart from './BarChart'
import PieChart from './PieChart'
import Empty from '@/components/empty'
export default {
  name: 'ChartMode',
  components: {
    Empty,
    LineChart,
    BarChart,
    PieChart
  },
  props: {
    spendingTypesMoney: {
      type: Object,
      required: true
    },
    salaryMoney: {
      type: Object,
      required: true
    },
    spendingCarsMoney: {
      type: Object,
      required: true
    }, ordersCount: {
      type: Object,
      required: true
    },
    ordersMoney: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  border-radius: 8px;
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
