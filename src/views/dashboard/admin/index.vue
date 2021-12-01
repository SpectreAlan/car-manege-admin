<template>
  <div class="dashboard-editor-container">
    <el-radio-group v-model="listQuery.type">
      <el-radio-button :label="1">按年查询</el-radio-button>
      <el-radio-button :label="0">按月查询</el-radio-button>
    </el-radio-group>
    <el-date-picker
      v-if="listQuery.type"
      v-model="listQuery.time"
      type="year"
      value-format="yyyy"
      format="yyyy"
      :view-date="new Date()"
      placeholder="选择年份"
    />
    <el-date-picker
      v-else
      v-model="listQuery.time"
      type="month"
      value-format="yyyy-MM"
      format="yyyy-MM"
      placeholder="选择月份"
    />
    <el-button type="success" icon="el-icon-s-grid" @click="dialogVisible=true">表格展示</el-button>
    <panel-group :info="totalInfo" />
    <chart-mode
      :orders-count="ordersCount"
      :orders-money="ordersMoney"
      :spending-cars-money="spendingCarsMoney"
      :salary-money="salaryMoney"
      :spending-types-money="spendingTypesMoney"
    />
    <table-mode
      v-if="dialogVisible"
      :dialog-visible.sync="dialogVisible"
      :orders-count="ordersCount"
      :orders-money="ordersMoney"
      :spending-cars-money="spendingCarsMoney"
      :salary-money="salaryMoney"
      :spending-types-money="spendingTypesMoney"
    />
  </div>
</template>

<script>

import PanelGroup from './components/PanelGroup'
import ChartMode from './components/chartMode'
import TableMode from './components/tableMode'
import { orders, spending, salary } from '@/api/report'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    TableMode,
    ChartMode
  },
  data() {
    return {
      loading: true,
      dialogVisible: false,
      listQuery: {
        type: 1,
        time: new Date()
      },
      ordersMoney: {},
      ordersCount: {},
      spendingCarsMoney: {},
      spendingTypesMoney: {},
      salaryMoney: {},
      totalInfo: {
        orderMoney: 0,
        totalSpending: 0,
        totalSalary: 0,
        orderCount: 0
      },
      w: ''
    }
  },
  watch: {
    'listQuery.type': {
      deep: true,
      handler() {
        const time = this.getTime()
        this.listQuery.time = this.listQuery.type ? new Date() : new Date(time)
        this.searchOrders(time)
        this.searchSpending(time)
        this.searchSalary(time)
      }
    },
    'listQuery.time': {
      deep: true,
      handler() {
        this.searchOrders()
        this.searchSpending()
        this.searchSalary()
      }
    }
  },
  created() {
    this.show = window.screen.availWidth > 1024
    if (!this.show) {
      this.mode = 0
    }
    const year = new Date().getFullYear()
    this.searchOrders(year)
    this.searchSpending(year)
    this.searchSalary(year)
  },
  methods: {
    getTime() {
      const time = new Date()
      const year = time.getFullYear()
      let res = year
      if (!this.listQuery.type) {
        const month = time.getMonth() + 1
        res = year + '-' + (month < 10 ? '0' + month : month)
      }
      return res
    },
    searchOrders(time) {
      this.loading = true
      const param = { ...this.listQuery }
      if (time) {
        param.time = time
      }
      orders(param).then(res => {
        const { carsCount, carsMoney, xAxis, orderCount, orderMoney } = res
        this.totalInfo.orderCount = orderCount
        this.totalInfo.orderMoney = orderMoney
        this.ordersMoney = this.getChartData(xAxis, carsMoney, 'line')
        this.ordersCount = this.getChartData(xAxis, carsCount, 'line')
        this.loading = false
      })
    },
    searchSalary(time) {
      this.loading = true
      const param = { ...this.listQuery }
      if (time) {
        param.time = time
      }
      salary(param).then(res => {
        const { salaryTypes, totalSalary, xAxis } = res
        this.totalInfo.totalSalary = totalSalary
        this.salaryMoney = this.getChartData(xAxis, salaryTypes, 'line', 'areaStyle')
        this.loading = false
      })
    },
    searchSpending(time) {
      this.loading = true
      const param = { ...this.listQuery }
      if (time) {
        param.time = time
      }
      spending(param).then(res => {
        const { typesMoney, carsMoney, xAxis, totalSpending } = res
        this.totalInfo.carsMoney = carsMoney
        this.totalInfo.typesMoney = typesMoney
        this.totalInfo.totalSpending = totalSpending
        this.spendingCarsMoney = this.getChartData(xAxis, carsMoney, 'bar')
        this.spendingTypesMoney = this.getChartData(xAxis, typesMoney, 'bar')
        this.loading = false
      })
    },
    getChartData(xAxis, data, type, areaStyle) {
      const legend = []
      const series = []
      for (const i in data) {
        legend.push(i)
        const o = {
          name: i,
          type,
          data: data[i]
        }
        if (areaStyle) {
          o.areaStyle = {}
        }
        series.push(o)
      }
      return { xAxis, legend, series }
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;

  .el-switch {
    margin: 10px;
  }
}

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
