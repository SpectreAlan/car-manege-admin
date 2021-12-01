import Request from '@/utils/request'

export function list(data) {
  return Request.post('/salary/search', data)
}
export function edit(data) {
  return Request.post('/salary/edit', data)
}
export function add(data) {
  return Request.post('/salary/add', data)
}
export function del(data) {
  return Request.post('/salary/del', data)
}
