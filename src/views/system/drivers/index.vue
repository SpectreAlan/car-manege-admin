<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button size="mini" type="success" class="filter-item" @click="handleAdd()">添加驾驶员</el-button>
    </div>
    <!-- 表格区域 -->
    <nice-table :table-header="tableHeader" :list="list" :toolbar-list="toolbarList" :list-loading="loading" @emitEvent="(args)=>this.$emitEvent(args)">
      <template slot="status" slot-scope="scope">
        <el-tag v-if="scope.data.status" type="success">在职</el-tag>
        <el-tag v-else type="danger">离职</el-tag>
      </template>
    </nice-table>
    <nice-pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="search" />
    <add-or-edit v-if="dialogVisible" :dialog-visible="dialogVisible" :info="info" :types="types" @close="close" />
  </div>
</template>

<script>
import { list, del, edit } from '@/api/drivers'
import AddOrEdit from './addOrEdit'
export default {
  name: 'Product',
  components: { AddOrEdit },
  data() {
    return {
      list: [],
      dialogVisible: false,
      info: null,
      loading: false,
      types: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      tableHeader: [
        { field: 'driver_name', sortable: 'custom', title: '姓名' },
        { field: 'phone', sortable: 'custom', title: '电话' },
        { field: 'join_time', title: '入职时间' },
        { field: 'status', title: '司机状态', slot: 'status' },
        { field: ' size="mini"', title: '薪资' },
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
    this.search()
  },
  methods: {
    close(refresh) {
      this.dialogVisible = false
      refresh && this.search()
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
        }).catch(() => { this.loading = false })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
