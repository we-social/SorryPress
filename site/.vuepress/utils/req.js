// utils/req.js
/* global dispatch */
import request from './request'

let serverBase = process.env.SERVER_ROOT

// 为了满足url书写习惯 serverBase末尾不带`/` 而是传入的url带
serverBase = serverBase.replace(/\/*$/, '')

export { serverBase }

export default async function req (opts) {
  opts = Object.assign({}, opts)

  // 非完整的url 补充serverBase前缀
  const isFullURL = /^(https?)?\/\//i.test(opts.url)
  if (!isFullURL) {
    opts.url = `${serverBase}${opts.url}`
  }

  if (!opts.headers) {
    opts.headers = {}
  }
  if (!opts.headers['Content-Type']) {
    opts.headers['Content-Type'] = 'application/json'
  }

  return request(opts)
    .catch(err => {
      if (err.code === 'XHR_ERROR') {
        err.message = 'Network request failed.'
      }
      throw err
    })
    .then(res => {
      try {
        return JSON.parse(res)
      } catch (err) {
        throw new Error('Service unavailable.')
      }
    })
    .then(res => {
      if (res && res.error) {
        throw new Error(res.error)
      }
      return res
    })
}
