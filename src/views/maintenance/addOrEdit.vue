<template>
  <div class="dic">
    <el-dialog :title="form.id ? '编辑': '添加'" :visible.sync="dialogVisible" :before-close="close" :width="w + 'px'">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="维保类型：" prop="type">
          <el-select v-model="form.type" placeholder="请选择维保类型" @change="onChange">
            <el-option
              v-for="(v,k) in types.type"
              :key="k"
              :label="v"
              :value="k"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号：" prop="car">
          <el-select v-model="form.car" placeholder="请选择车牌号">
            <el-option
              v-for="(v,k) in types.car"
              :key="k"
              :label="v"
              :value="k"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="维保日期：" prop="create_time">
          <el-date-picker
            v-model="form.create_time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择维保日期"
          />
        </el-form-item>
        <el-form-item label="金额：" prop="money">
          <el-input v-model.trim="form.money" />
        </el-form-item>
        <el-form-item :label="(names[form.type] || '机构名称') + '：'" prop="company">
          <el-input v-model.trim="form.company" />
        </el-form-item>
        <el-form-item v-if="form.type === '2'" label="修理项目：" prop="content">
          <el-input v-model.trim="form.content" />
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
import { edit, add } from '@/api/maintenance'
import { names } from './config'
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
      names,
      rules: {
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择维保类型', trigger: 'blur' }
        ],
        car: [
          { required: true, message: '请选择车牌号', trigger: 'blur' }
        ],
        create_time: [
          { required: true, message: '请选择维保日期', trigger: 'blur' }
        ]
      },
      w: '',
      reqLoading: false,
      form: {
        create_time: '',
        car: '',
        type: '',
        content: '',
        money: '',
        company: '',
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
      this.form.company = ''
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
