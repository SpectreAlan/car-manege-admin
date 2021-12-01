import Request from '@/utils/request'

export function list(data) {
  return Request.post('/drivers/search', data)
}
export function edit(data) {
  return Request.post('/drivers/edit', data)
}
export function add(data) {
  return Request.post('/drivers/add', data)
}
export function del(data) {
  return Request.post('/drivers/del', data)
}

export function drivers() {
  return Request.post('/drivers/all')
}
