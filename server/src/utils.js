const crypto = require('crypto')
const KoaBody = require('koa-body')
const httpError = require('http-errors')
const _ = require('lodash')

const koaBody = KoaBody()

exports.md5 = md5
exports.KoaAPI = KoaAPI
exports.KoaJSON = KoaJSON

function KoaAPI () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      const errObj = err.expose ? {
        status: err.status,
        error: err.message
      } : {
        status: 500,
        error: 'Internal server error.'
      }
      ctx.body = errObj
    }
  }
}

function KoaJSON () {
  return async (ctx, next) => {
    const nx = async () => {
      let { body } = ctx.request
      if (body && _.isString(body)) {
        try {
          body = JSON.parse(body)
        } catch (err) {
          throw httpError(400, 'JSON parse error.')
        }
        if (!_.isObject(body)) {
          throw httpError(400, 'JSON must be an object.')
        }
        ctx.request.body = body
      }
      await next()
    }
    await koaBody(ctx, nx)
  }
}

function md5 (data, digest) {
  return crypto.createHash('md5').update(data).digest(digest)
}
