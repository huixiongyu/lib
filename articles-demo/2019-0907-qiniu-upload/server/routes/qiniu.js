const Router = require('koa-router')
const qiniuRouter = new Router({ prefix: '/api/qiniu' })
const { getQiniuToken, getQiniuTokenWithName} = require('../utils/qiniu')

qiniuRouter.get('/token', async(ctx, next) => {
    const token = getQiniuToken()
    ctx.body = {
        token
    }
})

qiniuRouter.get('/token/name', async(ctx, next) => {
    const fileName = ctx.query.name
    console.log(fileName)
    const token = getQiniuTokenWithName(fileName)
    ctx.body = {
        token
    }    
})

qiniuRouter.get('/token/list', async(ctx, next) => {
    let keyList = ctx.query.list
    const tokenList = []
    console.log(ctx.query.list)
    if(!(keyList instanceof Array)){
        keyList = []
        keyList.push(ctx.query.list)
    }
    keyList.forEach((item) => {
        tokenList.push(getQiniuTokenWithName(item))
    })  
    ctx.body = {
        tokenList,
        keyList
    }
})

qiniuRouter.get('/token/inlist', async(ctx, next) => {
    const decodeString = decodeURIComponent(ctx.query.list)
    const keyList = decodeString.split(',');
    const tokenList = []
    keyList.forEach((item) => {
        tokenList.push(getQiniuToken())
    })
    ctx.body = {
        tokenList,
        keyList
    }
})

module.exports = qiniuRouter