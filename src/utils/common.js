
import { Message } from 'element-ui'

export function copy(text) {
  const middle = document.createElement('input')
  document.body.appendChild(middle)
  middle.value = text
  middle.select()
  document.execCommand('copy')
  document.body.removeChild(middle)
  Message({
    duration: 600,
    message: '复制成功',
    type: 'success'
  })
}
export function deepClone(target) {
  let result
  if (typeof target === 'object') {
    if (Array.isArray(target)) {
      result = []
      for (const i in target) {
        result.push(deepClone(target[i]))
      }
    } else if (target === null) {
      result = null
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      result = {}
      for (const i in target) {
        result[i] = deepClone(target[i])
      }
    }
  } else {
    result = target
  }
  return result
}
