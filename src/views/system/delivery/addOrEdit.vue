<template>
  <div class="dic">
    <el-dialog :title="form.id ? '编辑': '添加'" :visible.sync="dialogVisible" :before-close="close" :width="w + 'px'">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="单位名称：" prop="delivery">
          <el-input v-model.trim="form.delivery" />
        </el-form-item>
        <el-form-item label="联系人：" prop="contact">
          <el-input v-model.trim="form.contact" />
        </el-form-item>
        <el-form-item label="电话：" prop="phone">
          <el-input v-model.trim="form.phone" />
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
import { edit, add } from '@/api/delivery'
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
        delivery: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ]
      },
      reqLoading: false,
      w: '',
      form: {
        delivery: '',
        contact: '',
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
