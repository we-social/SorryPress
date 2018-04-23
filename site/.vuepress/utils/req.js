// utils/req.js
/* global dispatch */
import request from './request'

export default async function req (opts) {
  opts = Object.assign({}, opts)
  if (!opts.headers) {
    opts.headers = {}
  }
  if (!opts.headers['Content-Type']) {
    opts.headers['Content-Type'] = 'application/json'
  }
  let res
  try {
    res = await request(opts)
  } catch (err) {
    if (err.code === 'XHR_ERROR') {
      err.message = 'Network request failed.'
    }
    throw err
  }

  try {
    res = JSON.parse(res)
  } catch (err) {
    throw new Error('Service is unavailable.')
  }

  if (res && res.error) {
    throw new Error(res.error)
  }
  return res
}
