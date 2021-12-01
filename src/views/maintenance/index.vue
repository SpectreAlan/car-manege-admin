<template>
  <div class="app-container">
    <div class="filter-container">
      维保项目： <el-select v-model="listQuery.type" placeholder="请选择维保项目" size="mini" clearable>
        <el-option
          v-for="(v,k) in types.type"
          :key="k"
          size="mini"
          :label="v"
          :value="k"
        />
      </el-select>
      车牌号： <el-select v-model="listQuery.car" placeholder="请选车牌号" clearable size="mini">
        <el-option
          v-for="(v,k) in types.car"
          :key="k"
          :label="v"
          :value="k"
        />
      </el-select>
      <el-button size="mini" type="primary" class="filter-item" @click="search">查询</el-button>
      <el-button size="mini" type="default" class="filter-item" @click="reset">重置</el-button>
      <el-button size="mini" type="success" class="filter-item" @click="handleAdd()">添加维保信息</el-button>
    </div>
    <!-- 表格区域 -->
    <nice-table :formatter="formatter" :table-header="tableHeader" :list="list" :toolbar-list="toolbarList" :list-loading="loading" @emitEvent="(args)=>this.$emitEvent(args)" />
    <nice-pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="search" />
    <add-or-edit v-if="dialogVisible" :dialog-visible="dialogVisible" :info="info" :types="types" @close="close" />
  </div>
</template>

<script>
import { list, del } from '@/api/maintenance'
import AddOrEdit from './addOrEdit'
import { cars } from '@/api/cars'
import { type } from './config'
export default {
  name: 'Maintenance',
  components: { AddOrEdit },
  data() {
    return {
      list: [],
      dialogVisible: false,
      info: null,
      loading: false,
      types: {
        car: {},
        type
      },
      listQuery: {
        page: 1,
        type: '',
        car: '',
        limit: 10
      },
      tableHeader: [
        { field: 'car', title: '车牌号', formatter: 'car', sortable: 'custom', width: 100 },
        { field: 'type', sortable: 'custom', title: '维保项目', formatter: 'type', width: 120 },
        { field: 'create_time', sortable: 'custom', title: '日期', width: 100 },
        { field: 'money', title: '金额', width: 90 },
        { field: 'company', title: '所属机构' },
        { field: 'content', title: '描述' },
        { field: 'update_time', sortable: 'custom', title: '更新日期' },
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
    this.getCars()
  },
  methods: {
    formatter(row, key) {
      return this.types[key][row[key]]
    },
    close(refresh) {
      this.dialogVisible = false
      refresh && this.search()
    },
    reset() {
      this.listQuery = this.$options.data().listQuery
    },
    search() {
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
    getCars() {
      cars().then(res => {
        const o = {}
        for (let i = 0; i < res.length; i++) {
          o[res[i].id] = res[i].car_num
        }
        this.types.car = o
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
        }).catch(() => { this.loading = false })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
