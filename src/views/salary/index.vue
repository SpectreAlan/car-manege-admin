<template>
  <div class="app-container">
    <div class="filter-container">
      员工姓名：
      <el-select v-model="listQuery.driver" placeholder="请选择员工姓名" clearable size="mini">
        <el-option
          v-for="(v,k) in types.driver"
          :key="k"
          :label="v"
          :value="k"
        />
      </el-select>
      类型：
      <el-select v-model="listQuery.type" placeholder="请选类型" clearable size="mini">
        <el-option
          v-for="(v,k) in types.type"
          :key="k"
          :label="v"
          :value="k"
        />
      </el-select>
      月份：
      <el-date-picker
        v-model="listQuery.month"
        size="mini"
        type="month"
        value-format="yyyy-MM"
        placeholder="选择月份"
      />
      <el-button size="mini" type="primary" class="filter-item" @click="search">查询</el-button>
      <el-button size="mini" type="success" class="filter-item" @click="handleAdd()">添加工资条</el-button>
    </div>
    <!-- 表格区域 -->
    <nice-table
      :formatter="formatter"
      :table-header="tableHeader"
      :list="list"
      :toolbar-list="toolbarList"
      :list-loading="loading"
      @emitEvent="(args)=>this.$emitEvent(args)"
    />
    <nice-pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="search" />
    <add-or-edit v-if="dialogVisible" :dialog-visible="dialogVisible" :info="info" :types="types" @close="close" />
  </div>
</template>

<script>
import { list, del } from '@/api/salary'
import { drivers } from '@/api/drivers'
import AddOrEdit from './addOrEdit'
import { types } from '@/views/salary/config'

export default {
  name: 'Salary',
  components: { AddOrEdit },
  data() {
    return {
      types,
      list: [],
      dialogVisible: false,
      info: null,
      loading: false,
      listQuery: {
        page: 1,
        month: '',
        type: '',
        driver: '',
        limit: 10
      },
      tableHeader: [
        { field: 'driver', sortable: 'custom', title: '姓名', formatter: 'driver' },
        { field: 'type', title: '类型', formatter: 'type' },
        { field: 'month', title: '月份' },
        { field: 'paid', title: '金额' },
        { field: 'update_time', title: '更新时间' },
        { field: 'remark', title: '备注' },
        { field: 'toolbar', title: '操作' }
      ],
      toolbarList: [
        { title: '编辑', field: 'handleEdit', type: 'primary' },
        { title: '删除', field: 'handleDelete', type: 'danger' }
      ],
      total: 0
    }
  },
  created() {
    this.queryDrivers()
  },
  methods: {
    formatter(row, key) {
      return this.types[key][row[key]]
    },
    close(refresh) {
      this.dialogVisible = false
      refresh && this.search()
    },
    search(k) {
      k && (this.listQuery.page = k.page)
      this.loading = true
      list(this.listQuery).then(res => {
        const { list, total } = res
        this.list = list
        this.total = total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    queryDrivers() {
      drivers().then((list) => {
        const o = {}
        for (let i = 0; i < list.length; i++) {
          o[list[i].id] = list[i].driver_name
        }
        this.types.driver = o
        this.search()
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
