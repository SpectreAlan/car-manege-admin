<template>
  <div class="dic">
    <el-dialog :title="form.id ? '编辑': '添加'" :visible.sync="dialogVisible" :before-close="close" :width="w + 'px'">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="姓名：" prop="driver">
          <el-select v-model="form.driver" placeholder="请选择员工姓名">
            <el-option
              v-for="(v,k) in types.driver"
              :key="k"
              :label="v"
              :value="k"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型：" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="(v,k) in types.type"
              :key="k"
              :label="v"
              :value="k"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="月份：" prop="month">
          <el-date-picker
            v-model="form.month"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择月份"
          />
        </el-form-item>
        <el-form-item label="金额：" prop="paid">
          <el-input v-model.trim="form.paid" />
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
import { edit, add } from '@/api/salary'
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
    },
    types: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rules: {
        paid: [{ required: true, message: '请输入金额', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        month: [{ required: true, message: '请选择月份', trigger: 'blur' }],
        driver: [{ required: true, message: '请选择员工', trigger: 'blur' }]
      },
      reqLoading: false,
      w: '',
      form: {
        driver: '',
        type: '',
        paid: '',
        month: '',
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
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
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
