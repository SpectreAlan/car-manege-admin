<template>
  <div class="dic">
    <el-dialog :title="form.id ? '编辑': '添加'" :visible.sync="dialogVisible" :before-close="close">
      <el-form ref="form" :model="form" label-width="100px" size="mini" :rules="rules">
        <el-form-item label="名称" prop="dic_title">
          <el-input v-model.trim="form.dic_title" />
        </el-form-item>
        <el-form-item label="类别" prop="dic_type">
          <el-input v-model.trim="form.dic_type" />
        </el-form-item>
        <el-form-item label="标识" prop="dic_key">
          <el-input v-model.trim="form.dic_key" placeholder="长度4至8位，以字母开头，字母，数字，减号，下划线" />
        </el-form-item>
        <el-form-item label="内容" prop="dic_val">
          <keys ref="keys" :keys="form.dic_val" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="form.remark" />
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary" :loading="reqLoading" size="medium " @click="onSubmit">立即提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { edit, add } from '@/api/settings'
import Keys from './keys'
export default {
  components: { Keys },
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
    const key = (rule, value, callback) => {
      if (!(/^[0-9a-zA-Z]{3,16}$/.test(value))) {
        callback(new Error('key应为4-16个字符,可使用字母、数字(不包含空格)'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        dic_title: [
          { required: true, message: '请输入字典名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        dic_key: [
          { required: true, message: '请输入key', trigger: 'blur' },
          { validator: key, trigger: 'blur' }
        ]
      },
      reqLoading: false,
      keys: [],
      form: {
        remark: '',
        dic_key: '',
        dic_val: '',
        dic_title: ''
      }
    }
  },
  created() {
    console.log(this.info)
    if (this.info) {
      this.form = { ...this.info }
    }
  },
  methods: {
    close(data) {
      this.$emit('close', data === 1)
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const list = this.$refs.keys.list
          const o = {}
          let count = 0
          for (let i = 0; i < list.length; i++) {
            count++
            if (list[i].key && list[i].val) {
              o[list[i].key] = list[i].val
            }
          }
          if (!count) {
            this.$message.error('请添加字典字段')
            return
          }
          this.form.dic_val = JSON.stringify(o)
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
