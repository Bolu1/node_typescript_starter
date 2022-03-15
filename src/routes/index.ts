import express from 'express'
const user = require('./user/index')
const product = require('./product/index')

const routes = express()

routes.use('/user', user)
routes.use('/product', product)

module.exports = routes