import Request from '@/utils/request'

export function list(data) {
  return Request.post('/dictionary/search', data)
}
export function edit(data) {
  return Request.post('/dictionary/edit', data)
}
export function add(data) {
  return Request.post('/dictionary/add', data)
}
export function del(data) {
  return Request.post('/dictionary/del', data)
}

export function types(data) {
  return Request.post('/dictionary/types', data)
}
