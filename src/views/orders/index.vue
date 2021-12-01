<template>
  <div class="app-container">
    <div class="filter-container">
      <div>
        车牌号：
        <el-select v-model="listQuery.car" placeholder="请选择车牌号" clearable size="mini">
          <el-option
            v-for="(v,k) in types.car"
            :key="k"
            :label="v"
            :value="k"
          />
        </el-select>
      </div>
      <div>
        发货单位：
        <el-select v-model="listQuery.delivery" placeholder="请选择" clearable size="mini">
          <el-option
            v-for="(v,k) in types.delivery"
            :key="k"
            :label="v"
            :value="k"
          />
        </el-select>
      </div>
      <div>
        运费状态：
        <el-select v-model="listQuery.status" size="mini" placeholder="请选择运费状态" clearable>
          <el-option
            label="已结清"
            :value="1"
          />
          <el-option
            label="未结清"
            :value="0"
          />
        </el-select>
      </div>
      <div>
        发货时间:
        <el-date-picker
          v-model="listQuery.delivery_time"
          size="mini"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
      <div>
        <el-button size="mini" type="success" class="filter-item" @click="handleAdd">添加订单</el-button>
        <el-button size="mini" type="default" class="filter-item" @click="reset">重置</el-button>
        <el-button size="mini" type="primary" class="filter-item" @click="search">搜索</el-button>
      </div>
    </div>
    <!-- 表格区域 -->
    <nice-table
      table-control
      :table-header="tableHeader"
      :list="list"
      :excel-list="excelList"
      :formatter="formatter"
      :excel-table-header="excelTableHeader"
      :toolbar-list="toolbarList"
      :list-loading="loading"
      @emitEvent="(args)=>this.$emitEvent(args)"
    >
      <template slot="status" slot-scope="scope">
        <el-tag v-if="scope.data.status" type="success">已结清</el-tag>
        <el-tag v-else type="danger">未结清</el-tag>
      </template>
    </nice-table>
    <nice-pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="search" />
    <add-or-edit
      v-if="dialogVisible"
      :dialog-visible="dialogVisible"
      :info="info"
      :types="types"
      @close="close"
    />
  </div></template>

<script>
import { list as search, del, edit, types } from '@/api/orders'
import AddOrEdit from './addOrEdit'
import { deepClone } from '@/utils/common'

export default {
  name: 'Orders',
  components: { AddOrEdit },
  data() {
    return {
      listQuery: {
        page: 1,
        delivery: '',
        car: '',
        delivery_time: '',
        limit: 10
      },
      list: [],
      excelTableHeader: [],
      excelList: [],
      dialogVisible: false,
      info: null,
      loading: false,
      types: {
        delivery: {},
        car: {},
        driver_name: {}
      },
      tableHeader: [
        { field: 'car', sortable: 'custom', title: '车牌号', fixed: 'left', width: 100, formatter: 'car' },
        { field: 'delivery', sortable: 'custom', title: '发货单位', width: 200, formatter: 'delivery' },
        { field: 'delivery_time', sortable: 'custom', title: '发货时间', width: 110 },
        { field: 'driver_name', sortable: 'custom', title: '司机', width: 80, formatter: 'driver_name' },
        { field: 'goods', sortable: 'custom', title: '货物类型', width: 110 },
        { field: 'count', sortable: 'custom', title: '发货数量', width: 110 },
        { field: 'price', sortable: 'custom', title: '单价', width: 80 },
        { field: 'upAddress', sortable: 'custom', title: '装货地点', width: 200 },
        { field: 'downAddress', sortable: 'custom', title: '卸货地点', width: 200 },
        { field: 'status', sortable: 'custom', title: '运费状态', width: 110, slot: 'status' },
        { field: 'paid', sortable: 'custom', title: '已结算运费', width: 130 },
        { field: 'update_time', title: '更新时间', width: 100 },
        { field: 'remark', title: '备注' },
        { field: 'toolbar', title: '操作', width: 160 }
      ],
      toolbarList: [
        { title: '编辑', field: 'handleEdit', type: 'primary' },
        { title: '删除', field: 'handleDelete', type: 'danger' }
      ],
      total: 0
    }
  },
  created() {
    this.queryTypes()
  },
  methods: {
    reset() {
      this.listQuery = this.$options.data().listQuery
      this.search()
    },
    formatter(row, key) {
      return this.types[key][row[key]]
    },
    toExcel() {
      const list = deepClone(this.list)
      this.excelTableHeader = deepClone(this.tableHeader)
      for (let i = 0; i < list.length; i++) {
        list[i].car = this.formatter(list[i], 'car')
        list[i].delivery = this.formatter(list[i], 'delivery')
        list[i].driver_name = this.formatter(list[i], 'driver_name')
        list[i].status = list[i].status ? '已结清' : '未结清'
        list[i].total = (list[i].price * list[i].count).toFixed(2)
      }
      this.excelList = list
      this.excelTableHeader.pop()
      this.excelTableHeader.splice(7, 0, { field: 'total', title: '小计' })
    },
    queryTypes() {
      types().then((res) => {
        const { delivery, cars, drivers } = res
        this.types = {
          delivery: this.getObj(delivery, 'delivery'),
          car: this.getObj(cars, 'car_num'),
          driver_name: this.getObj(drivers, 'driver_name')
        }
        this.search()
      })
    },
    getObj(list, key) {
      const o = {}
      for (let i = 0; i < list.length; i++) {
        o[list[i].id] = list[i][key]
      }
      return o
    },
    close(refresh) {
      this.dialogVisible = false
      refresh && this.search()
    },
    search(k) {
      k && (this.listQuery.page = k.page)
      this.loading = true
      search(this.listQuery).then(res => {
        const { list, total } = res
        this.total = total
        this.list = list
        this.loading = false
        this.toExcel()
      }).catch(() => {
        this.loading = false
      })
    },
    handleAdd() {
      this.info = null
      this.dialogVisible = true
    },
    handleEdit(data) {
      this.info = { ...data }
      this.dialogVisible = true
    },
    status(data) {
      this.loading = true
      edit(data).then(() => {
        this.search()
      }).catch(() => {
        this.search()
      })
    },
    handleDelete(data) {
      this.$confirm('确认删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        del({ id: data.id }).then(() => {
          this.search()
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
