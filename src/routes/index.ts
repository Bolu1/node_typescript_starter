import express from 'express'
const user = require('./user/index')
const shift = require('./shift/index')

const routes = express()

/** 
 * @openapi
 * /vi/user/auth/addUser:
 * get:
 *  tag:
 *      -AddUser
 *      description: Add user
 *      responses:
*       200:
            description: up and running
*/
routes.use('/user', user)
// routes.use('/shit', shift)

module.exports = routes