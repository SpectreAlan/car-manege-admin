<template>
  <div class="dic">
    <el-dialog :title="form.id ? '编辑': '添加'" :visible.sync="dialogVisible" :before-close="close" :width="w + 'px'">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="车牌号" prop="car_num">
          <el-input v-model.trim="form.car_num" />
        </el-form-item>
        <el-form-item label="车辆类型" prop="car_type">
          <el-input v-model.trim="form.car_type" />
        </el-form-item>
        <el-form-item label="购车时间" prop="buy_time">
          <el-date-picker
            v-model="form.buy_time"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择购车时间"
          />
        </el-form-item>
        <el-form-item label="保险购买日期" prop="insurance_time">
          <el-date-picker
            v-model="form.insurance_time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择保险购买日期时间"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
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
import { edit, add } from '@/api/cars'
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
        car_num: [
          { required: true, message: '请输入车牌号', trigger: 'blur' },
          { min: 7, max: 7, message: '车牌号格式不正确', trigger: 'blur' }
        ],
        buy_time: [
          { required: true, message: '请选择购车时间', trigger: 'blur' }
        ],
        insurance_time: [
          { required: true, message: '请选择保险购买时间', trigger: 'blur' }
        ]
      },
      reqLoading: false,
      w: '',
      form: {
        car_type: '',
        car_num: '',
        buy_time: '',
        insurance_time: '',
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
