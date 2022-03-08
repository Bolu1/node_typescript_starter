import express from 'express'
const {addUser, signin, getUsers} = require('../../../controllers/user/auth')
const validateResult = require('../../../middleware/validateResource')
const {createUserSchema, signinSchema} = require('../../../schema/user.schema')
const requireUser = require('../../../middleware/requireUser')

const router = express()

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
router.post('/addUser', validateResult(createUserSchema), addUser)
router.post('/signin', validateResult(signinSchema), signin)
router.get('/getUsers', getUsers)

module.exports = router