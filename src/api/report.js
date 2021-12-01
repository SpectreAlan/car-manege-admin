import Request from '@/utils/request'

export function orders(data) {
  return Request.post('/report/orders', data)
}

export function spending(data) {
  return Request.post('/report/spending', data)
}

export function salary(data) {
  return Request.post('/report/salary', data)
}

