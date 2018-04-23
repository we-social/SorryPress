// utils/request.js
export default function request (opts) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()

    let url = opts.url
    let query = opts.query || ''
    if (query && typeof query === 'object') {
      query = joinQueryStr(query)
    }
    if (query) url += `?${query}`

    xhr.open(opts.method || 'GET', url)
    xhr.onload = () => {
      resolve(xhr.response)
    }
    xhr.onerror = () => {
      let err = new Error(`status: ${xhr.status}: ${xhr.statusText}`)
      err.status = xhr.status
      err.code = 'XHR_ERROR'
      reject(err)
    }
    xhr.onabort = () => {
      // noop
    }
    if (opts.headers) {
      Object.keys(opts.headers).forEach(key => {
        xhr.setRequestHeader(key, opts.headers[key])
      })
    }
    let params = opts.params || ''
    // We'll need to stringify if we've been given an object
    // If we have a string, this is skipped.
    if (params && typeof params === 'object') {
      let contentType = opts.headers && opts.headers['Content-Type'] || ''
      if (contentType.includes('json')) {
        params = JSON.stringify(params)
      } else {
        params = joinQueryStr(params)
      }
    }
    xhr.send(params)
  })
}

function joinQueryStr (params) {
  return Object.keys(params).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  }).join('&')
}
