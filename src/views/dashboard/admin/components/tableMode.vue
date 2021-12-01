<template>
  <el-dialog title="数据统计" :visible.sync="dialogVisible" :before-close="close" :width="w + 'px'">
    <div class="table-mode">
      <h3>订单统计:</h3>
      <nice-table
        :table-header="tableHeader0"
        :list="list0"
      />
      <h3>车辆维保:</h3>
      <nice-table
        :table-header="tableHeader1"
        :list="list1"
      />
      <h3>维保类型:</h3>
      <nice-table
        :table-header="tableHeader2"
        :list="list2"
      />
      <h3>工资统计:</h3>
      <nice-table
        :table-header="tableHeader3"
        :list="list3"
      />
    </div>
  </el-dialog>
</template>

<script>
import { tableHeader0, tableHeader1, tableHeader2, tableHeader3 } from './config'

export default {
  name: 'TableMode',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
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
    },
    ordersCount: {
      type: Object,
      required: true
    },
    ordersMoney: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      w: '',
      total: 0,
      list0: [],
      list1: [],
      list2: [],
      list3: [],
      tableHeader0,
      tableHeader1,
      tableHeader2,
      tableHeader3
    }
  },
  created() {
    const w = window.screen.availWidth
    this.w = w > 600 ? 600 : w
    this.w = w < 600 ? w : this.w
    this.getList0()
    this.getList1()
    this.getList2()
    this.getList3()
  },
  methods: {
    close() {
      this.$emit('update:dialogVisible', false)
    },
    getList1() {
      const list = []
      const { series, xAxis } = this.spendingCarsMoney
      for (let i = 0; i < series.length; i++) {
        const { name, data } = series[i]
        for (let j = 0; j < data.length; j++) {
          if (data[j]) {
            this.total += Number(data[j])
            list.push({
              car: name,
              money: data[j],
              time: xAxis[j]
            })
          }
        }
      }
      this.$set(this, 'list1', list)
    },
    getList3() {
      const list = []
      const { series, xAxis } = this.salaryMoney
      for (let i = 0; i < series.length; i++) {
        const { name, data } = series[i]
        for (let j = 0; j < data.length; j++) {
          if (data[j]) {
            this.total += Number(data[j])
            list.push({
              name,
              money: data[j],
              time: xAxis[j]
            })
          }
        }
      }
      this.list3 = list
    },
    getList0() {
      const list = []
      const { series, xAxis } = this.ordersMoney
      for (let i = 0; i < series.length; i++) {
        const { name, data } = series[i]
        for (let j = 0; j < data.length; j++) {
          if (data[j]) {
            list.push({
              car: name,
              money: data[j],
              count: this.ordersCount.series[i].data[j],
              time: xAxis[j]
            })
          }
        }
      }
      this.list0 = list
    },
    getList2() {
      const list = []
      const { series, xAxis } = this.spendingTypesMoney
      for (let i = 0; i < series.length; i++) {
        const { name, data } = series[i]
        for (let j = 0; j < data.length; j++) {
          if (data[j]) {
            list.push({
              type: name,
              ratio: (data[j] / this.total * 100).toFixed(2) + '%',
              money: data[j],
              time: xAxis[j]
            })
          }
        }
      }
      this.list2 = list
    }
  }
}
</script>

<style scoped lang="scss">
.table-mode {
  .border {
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;

    .table {
      margin-top: 0;
    }
  }
}
</style>
