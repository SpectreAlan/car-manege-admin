import Request from '@/utils/request'

export function list(data) {
  return Request.post('/cars/search', data)
}
export function edit(data) {
  return Request.post('/cars/edit', data)
}
export function add(data) {
  return Request.post('/cars/add', data)
}
export function del(data) {
  return Request.post('/cars/del', data)
}

export function cars() {
  return Request.post('/cars/all')
}
