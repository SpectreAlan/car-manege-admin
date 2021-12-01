import Request from '@/utils/request'

export function list(data) {
  return Request.post('/maintenance/search', data)
}
export function edit(data) {
  return Request.post('/maintenance/edit', data)
}
export function add(data) {
  return Request.post('/maintenance/add', data)
}
export function del(data) {
  return Request.post('/maintenance/del', data)
}
