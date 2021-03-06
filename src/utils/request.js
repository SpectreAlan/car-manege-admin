import axios from 'axios'
import router from '@/router'
import defaultSetting from '@/settings'
import { Message } from 'element-ui'
class Request {
  constructor() {
    this.instance = axios.create({
      baseURL: defaultSetting.proxy.name,
      timeout: 5000
    })
    this.instance.interceptors.request.use(
      config => {
        if (sessionStorage.getItem('req_' + config.baseURL + config.url)) {
          const msg = '请求已发出，请勿重复点击'
          return Promise.reject(msg)
        }
        sessionStorage.setItem('req_' + config.baseURL + config.url, 'stop')
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      response => {
        sessionStorage.removeItem('req_' + response.config.url)
        const res = response.data
        res.msg && Message({
          message: res.msg,
          type: res.code ? 'success' : 'error',
          duration: 5 * 1000
        })
        if (res.code) {
          return res
        } else {
          return Promise.reject(res.msg)
        }
      },
      (error) => {
        if (typeof error === 'string') { return Promise.reject(error) }
        if (error.response.status === 401) {
          router.push('/login')
        }
        sessionStorage.removeItem('req_' + error.config.url)
        const res = error.response.data.message
        Message({
          message: res,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(res)
      }
    )
  }
  post(url, params = {}, config) {
    return new Promise((resolve, reject) => {
      config = config || { headers: {
        'Content-Type': 'application/json;charset=utf-8' }
      }
      this.instance
        .post(url, params, config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  get(url) {
    return new Promise((resolve, reject) => {
      this.instance
        .get(url)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default new Request()
