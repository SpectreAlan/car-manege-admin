import Request from '@/utils/request'

export function list(data) {
  return Request.post('/delivery/search', data)
}
export function edit(data) {
  return Request.post('/delivery/edit', data)
}
export function add(data) {
  return Request.post('/delivery/add', data)
}
export function del(data) {
  return Request.post('/delivery/del', data)
}
