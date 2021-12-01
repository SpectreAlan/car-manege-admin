<template>
  <div class="dic">
    <el-dialog :title="form.id ? '编辑': '添加'" :visible.sync="dialogVisible" :before-close="close" :width="w + 'px'">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="姓名：" prop="driver_name">
          <el-input v-model.trim="form.driver_name" />
        </el-form-item>
        <el-form-item label="电话：" prop="phone">
          <el-input v-model.trim="form.phone" />
        </el-form-item>
        <el-form-item label="薪资：" prop="salary">
          <el-input v-model.trim="form.salary" />
        </el-form-item>
        <el-form-item label="入职日期：" prop="join_time">
          <el-date-picker
            v-model="form.join_time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择入职时间"
          />
        </el-form-item>
        <el-form-item label="员工状态：" prop="status">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            active-text="在职"
            :active-value="1"
            :inactive-value="0"
            inactive-text="离职"
            @change="onChange"
          />
        </el-form-item>
        <el-form-item v-if="!form.status" label="离职日期：" prop="leave_time">
          <el-date-picker
            v-model="form.leave_time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择离职时间"
          />
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input
            v-model.trim="form.remark"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary" :loading="reqLoading" size="medium " @click="onSubmit">立即提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { edit, add } from '@/api/drivers'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      rules: {
        driver_name: [{ required: true, message: '请输入司机名字', trigger: 'blur' }],
        salary: [{ required: true, message: '请输入薪资', trigger: 'blur' }],
        join_time: [{ required: true, message: '请选择入职时间', trigger: 'blur' }]
      },
      reqLoading: false,
      w: '',
      form: {
        driver_name: '',
        leave_time: '',
        salary: '',
        join_time: '',
        status: 1,
        phone: '',
        remark: ''
      }
    }
  },
  created() {
    if (this.info) {
      this.form = { ...this.info }
    }
    const w = window.screen.availWidth
    this.w = w > 600 ? 600 : w
    this.w = w < 600 ? w : this.w
  },
  methods: {
    close(data) {
      this.$emit('close', data === 1)
    },
    onChange() {
      this.form.leave_time = ''
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (!this.form.status && !this.form.leave_time) {
            this.$message.error('请选择离职日期')
            return
          }
          this.form.id
            ? edit(this.form).then(() => {
              this.close(1)
            }) : add(this.form).then(() => {
              this.close(1)
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
