<template>
  <div class="dic">
    <el-dialog :title="(form.id ? '编辑': '添加') + '订单'" :visible.sync="dialogVisible" :before-close="close" :width="w + 'px'">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="发货单位：" prop="delivery">
          <el-select v-model="form.delivery" placeholder="请选择">
            <el-option
              v-for="(v,k) in types.delivery"
              :key="k"
              :label="v"
              :value="k"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发货时间" prop="delivery_time">
          <el-date-picker
            v-model="form.delivery_time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择发货时间"
          />
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
        <el-form-item label="司机：" prop="driver_name">
          <el-select v-model="form.driver_name" placeholder="请选择司机">
            <el-option
              v-for="(v,k) in types.driver_name"
              :key="k"
              :label="v"
              :value="k"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="货物类型：" prop="goods">
          <el-input v-model.trim="form.goods" placeholder="请输入货物名称及型号，如：425水泥" />
        </el-form-item>
        <el-form-item label="发货数量：" prop="count">
          <el-input v-model.trim="form.count" style="width: 80%" />
          吨
        </el-form-item>
        <el-form-item label="单价：" prop="price">
          <el-input v-model.trim="form.price" style="width: 80%" />
          元/吨
        </el-form-item>
        <el-form-item label="总计：">
          <el-input v-model.trim="total" readonly style="width: 80%" />
          元
        </el-form-item>
        <el-form-item label="装货地点：" prop="upAddress">
          <el-input v-model.trim="form.upAddress" />
        </el-form-item>
        <el-form-item label="卸货地点：" prop="downAddress">
          <el-input v-model.trim="form.downAddress" />
        </el-form-item>
        <el-form-item label="运费状态：" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="0">未结清</el-radio>
            <el-radio :label="1">已结清</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="!form.status" label="已结算运费：" prop="paid">
          <el-input v-model.trim="form.paid" style="width: 80%" />
          元
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
import { edit, add } from '@/api/orders'

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
        downAddress: [{ required: true, message: '请输入卸货地址', trigger: 'blur' }],
        upAddress: [{ required: true, message: '请输入装货地址', trigger: 'blur' }],
        price: [{ required: true, message: '请输入单价', trigger: 'blur' }],
        count: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        goods: [{ required: true, message: '请输入货物类型', trigger: 'blur' }],
        delivery: [{ required: true, message: '请输选择发货单位', trigger: 'change' }],
        driver_name: [{ required: true, message: '请输选择司机', trigger: 'change' }],
        car: [{ required: true, message: '请输选择车牌', trigger: 'change' }],
        delivery_time: [{ required: true, message: '请输选择发货日期', trigger: 'change' }]
      },
      reqLoading: false,
      w: 600,
      form: {
        downAddress: '',
        paid: 0,
        status: 0,
        price: '',
        count: '',
        goods: '',
        upAddress: '',
        delivery: '',
        car: '',
        driver_name: '',
        delivery_time: '',
        remark: ''
      }
    }
  },
  computed: {
    total() {
      return ((this.form.price || 0) * (this.form.count || 0)).toFixed(2)
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
          if (this.form.status) {
            this.form.paid = this.total
          }
          this.form.price = Number(this.form.price)
          this.form.count = Number(this.form.count)
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
