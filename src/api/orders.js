import Request from '@/utils/request'

export function list(data) {
  return Request.post('/orders/search', data)
}
export function edit(data) {
  return Request.post('/orders/edit', data)
}
export function add(data) {
  return Request.post('/orders/add', data)
}
export function del(data) {
  return Request.post('/orders/del', data)
}
export function types() {
  return Request.post('/orders/types')
}
